import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function Dashboard() {
  const { theme } = useTheme();

  const stats = [
    { label: "Total Orders", value: "0", completed: "0", pending: "0" },
    { label: "Total Content Writing", value: "0" },
    { label: "Total Fund Added", value: "$0" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20"
    >
      <h1 className="text-2xl font-bold mb-8">Welcome to LinkPublisher</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-green-500">{stat.value}</p>
            {stat.completed !== undefined && (
              <div className="mt-2 text-sm">
                <span className="text-green-500">
                  Completed: {stat.completed}
                </span>
                <span className="mx-2">•</span>
                <span className="text-yellow-500">Pending: {stat.pending}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
