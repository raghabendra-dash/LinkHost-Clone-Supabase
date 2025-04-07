import { Sun, Moon, ShoppingCart, Bell, User, Menu } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddFundsModal from "./AddFundsModal";
import { useCart } from "../contexts/CartContext";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems, getCartTotal } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/orders", label: "My Orders" },
    { path: "/content-purchase", label: "Content Purchase" },
    { path: "/seo-tools", label: "Free SEO Tools" },
    { path: "/profile", label: "My Profile" },
    { path: "/billing-and-funds", label: "Billing & Funds" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest("[data-profile-menu]")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link to="/">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl font-bold bg-gradient-to-r from-red-700 via-orange-500 to-orange-400 text-transparent bg-clip-text"
                  >
                    LinkHost
                  </motion.span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                {isAuthenticated && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                    >
                      <Bell size={20} />
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </motion.button>

                    <Link to="/orders" className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <ShoppingCart size={20} />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </motion.button>
                    </Link>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center"
                    >
                      <button
                        onClick={() => setIsAddFundsModalOpen(true)}
                        className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors"
                      >
                        ${getCartTotal() > 0 ? getCartTotal() : 25}
                      </button>
                    </motion.div>
                  </>
                )}

                <div className="relative" data-profile-menu>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User size={20} />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {isAuthenticated ? (
                            <>
                              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-medium">
                                  {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {user?.email}
                                </p>
                              </div>
                              <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                My Profile
                              </Link>
                              <Link
                                to="/billing-and-funds"
                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                Billing & Funds
                              </Link>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-purple-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                  handleLogout();
                                  setIsProfileOpen(false);
                                }}
                              >
                                Logout
                              </button>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/login"
                                className="block px-4 py-2 text-sm hover:bg-yellow-500 dark:hover:bg-gray-700"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                Login
                              </Link>
                              <Link
                                to="/register"
                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                Sign Up
                              </Link>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  className="lg:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* Menu Bar */}
            {isAuthenticated && (
              <div className="hidden lg:block border-t dark:border-gray-700">
                <div className="flex space-x-8 py-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "text-blue-800"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                      }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="underline"
                          className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AddFundsModal
        isOpen={isAddFundsModalOpen}
        onClose={() => setIsAddFundsModalOpen(false)}
      />
    </>
  );
}
