import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useOrdersStore, OrderStatus } from "../store/ordersStore";
import { useAuthStore } from "../store/authStore";
import {
  ShoppingBag,
  Search,
  Calendar,
  Download,
  MessageCircle,
  ExternalLink,
  Info,
  X,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Orders() {
  const [selectedTab, setSelectedTab] = useState<OrderStatus | "new">("new");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuthStore();
  const { orders, createOrder, getOrders } = useOrdersStore();
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState<
    "all" | "7days" | "30days" | "90days"
  >("all");

  const tabs = [
    { id: "new" as const, label: "New", count: cartItems.length },
    {
      id: "pending" as const,
      label: "Pending",
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      id: "in-progress" as const,
      label: "In Progress",
      count: orders.filter((o) => o.status === "in-progress").length,
    },
    {
      id: "approval" as const,
      label: "Your Approval",
      count: orders.filter((o) => o.status === "approval").length,
    },
    // {
    //   id: "delayed" as const,
    //   label: "Delayed",
    //   count: orders.filter((o) => o.status === "delayed").length,
    // },
    {
      id: "completed" as const,
      label: "Completed",
      count: orders.filter((o) => o.status === "completed").length,
    },
    {
      id: "cancelled" as const,
      label: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
    {
      id: "rejected" as const,
      label: "Rejected",
      count: orders.filter((o) => o.status === "rejected").length,
    },
  ];

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsLoading(true);

      if (!user) {
        toast.error("Please log in to place an order");
        return;
      }

      const order = await createOrder(cartItems, user.id);
      clearCart();
      toast.success("Order placed successfully!");
      setSelectedTab("pending");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems =
    selectedTab === "new"
      ? cartItems
      : orders.filter((order) => {
          // Apply status filter
          if (selectedTab !== "all" && order.status !== selectedTab) {
            return false;
          }

          // Apply date filter
          if (dateFilter !== "all") {
            const orderDate = new Date(order.createdAt);
            const now = new Date();
            const diffDays = Math.floor(
              (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            switch (dateFilter) {
              case "7days":
                if (diffDays > 7) return false;
                break;
              case "30days":
                if (diffDays > 30) return false;
                break;
              case "90days":
                if (diffDays > 90) return false;
                break;
            }
          }

          // Apply search filter
          if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return order.items.some((item) =>
              item.url.toLowerCase().includes(searchLower)
            );
          }

          return true;
        });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>

        {selectedTab === "new" && cartItems.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            disabled={isLoading}
            className="px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-orange-600 disabled:opacity-70 flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <ShoppingBag size={18} className="mr-2" />
                Checkout ($
                {cartItems.reduce((sum, item) => sum + item.price, 0)})
              </>
            )}
          </motion.button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedTab === tab.id
                  ? "bg-green-500 text-black"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.label} ({tab.count})
            </motion.button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-4 py-3 text-left">Order Date</th>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Website</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Language</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                selectedTab === "new" ? (
                  cartItems.map((item) => (
                    <tr
                      key={item.cartId}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">Cart Item</td>
                      <td className="px-4 py-3">{item.url}</td>
                      <td className="px-4 py-3">${item.price}</td>
                      <td className="px-4 py-3">{item.metrics.language}</td>
                      <td className="px-4 py-3">Guest Post</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                          In Cart
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-600"
                          title="Remove from cart"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredItems.map((order) =>
                    order.items.map((item) => (
                      <tr
                        key={`${order.id}-${item.cartId}`}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="px-4 py-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">#{order.id.slice(0, 8)}</td>
                        <td className="px-4 py-3">{item.url}</td>
                        <td className="px-4 py-3">${item.price}</td>
                        <td className="px-4 py-3">{item.metrics.language}</td>
                        <td className="px-4 py-3">Guest Post</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : order.status === "in-progress"
                                ? "bg-blue-100 text-blue-600"
                                : order.status === "delayed"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-500 hover:text-blue-600"
                              title="Chat with support"
                            >
                              <MessageCircle size={18} />
                            </button>
                            {order.status === "completed" && (
                              <button
                                className="text-green-500 hover:text-green-600"
                                title="Download report"
                              >
                                <Download size={18} />
                              </button>
                            )}
                            <button
                              className="text-green-500 hover:text-orange-600"
                              title="View details"
                            >
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                )
              ) : (
                <tr>
                  <td className="px-4 py-8 text-center" colSpan={8}>
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 mb-4 text-gray-400"
                      >
                        <Info size={64} className="mx-auto" />
                      </motion.div>
                      <p className="text-gray-500 dark:text-gray-400">
                        No orders found!
                      </p>
                      {selectedTab !== "new" && (
                        <button
                          onClick={() => setSelectedTab("new")}
                          className="mt-4 text-green-500 hover:text-orange-600"
                        >
                          Go to cart
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
