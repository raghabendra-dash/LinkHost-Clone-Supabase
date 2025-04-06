import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  FileText,
  PenTool as Tool,
  User,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/marketplace", icon: Store, label: "Marketplace" },
  { path: "/orders", icon: ShoppingBag, label: "My Orders" },
  { path: "/content-purchase", icon: FileText, label: "Content Purchase" },
  { path: "/seo-tools", icon: Tool, label: "Free SEO Tools" },
  { path: "/profile", icon: User, label: "My Profile" },
  { path: "/billing-and-funds", icon: CreditCard, label: "Billing & Funds" },
];

export default function Sidebar() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen fixed left-0 top-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto hidden"
    >
      <div className="py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center px-6 py-3 cursor-pointer ${
                  isActive
                    ? "text-green-500 bg-orange-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
