import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../store/authStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Navbar />
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={` ${isAuthenticated ? "w-full" : ""} pt-16`}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
