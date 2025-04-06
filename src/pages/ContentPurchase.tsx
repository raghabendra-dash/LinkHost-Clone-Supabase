import { motion } from "framer-motion";
import { useState } from "react";

export default function ContentPurchase() {
  const [activeTab, setActiveTab] = useState("order");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("order")}
            className={`px-6 py-2 rounded-lg ${
              activeTab === "order"
                ? "bg-green-500 text-black"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            Order Placement
          </button>
          <button
            onClick={() => setActiveTab("tracking")}
            className={`px-6 py-2 rounded-lg ${
              activeTab === "tracking"
                ? "bg-green-500 text-black"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            Order Tracking
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Order Content Writing</h2>
            <button className="text-green-500 hover:text-orange-600">
              Download Samples ↓
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700">
                <option>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Word Count
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700">
                <option>500 Words</option>
                <option>1000 Words</option>
                <option>1500 Words</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700">
                <option>Select Category</option>
                <option>Technology</option>
                <option>Health</option>
                <option>Business</option>
              </select>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Brief Note
              </label>
              <textarea
                rows={4}
                placeholder="Enter your requirements"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <div>
              <span className="text-sm text-gray-500">Total Price:</span>
              <span className="text-2xl font-bold text-green-500 ml-2">
                $20
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
            >
              Place Order
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
