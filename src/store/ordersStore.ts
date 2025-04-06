import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "../contexts/CartContext";

export type OrderStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "delayed"
  | "approval"
  | "rejected";

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  paymentMethod: string;
  deliveryTime: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  createOrder: (items: CartItem[], userId: string) => Promise<Order>;
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrdersStore = create(
  persist<OrdersState>(
    (set, get) => ({
      orders: [],
      isLoading: false,
      error: null,

      createOrder: async (items: CartItem[], userId: string) => {
        const order: Order = {
          id: uuidv4(),
          items,
          status: "pending",
          total: items.reduce((sum, item) => sum + item.price, 0),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId,
          paymentMethod: "credit_card",
          deliveryTime: "5-7 days",
        };

        set((state) => ({
          orders: [...state.orders, order],
        }));

        return order;
      },

      getOrders: () => {
        return get().orders;
      },

      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }));
      },

      cancelOrder: (orderId: string) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: "cancelled",
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }));
      },

      getOrderById: (orderId: string) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: "orders-storage",
      skipHydration: false,
    }
  )
);
