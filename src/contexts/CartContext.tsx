import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export interface Website {
  id: string;
  url: string;
  metrics: {
    domainRating: number;
    referringDomains: string;
    totalBacklinks: string;
    totalKeywords: string;
    spamScore: string;
    language: string;
    linkValidity: string;
    trafficByCountry: string;
  };
  price: number;
  category?: string;
}

export interface CartItem extends Website {
  cartId: string;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (website: Website) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateCartItemQuantity: (cartId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "backlinkvista_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (website: Website) => {
    if (cartItems.some((item) => item.id === website.id)) {
      toast.error(`${website.url} is already in your cart`);
      return;
    }

    const cartItem: CartItem = {
      ...website,
      cartId: uuidv4(),
      addedAt: new Date().toISOString(),
    };

    setCartItems((prev) => [...prev, cartItem]);
    toast.success(`Added ${website.url} to cart`);
  };

  const removeFromCart = (cartId: string) => {
    const item = cartItems.find((item) => item.cartId === cartId);
    if (!item) return;

    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    toast.success(`Removed ${item.url} from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const updateCartItemQuantity = (cartId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
