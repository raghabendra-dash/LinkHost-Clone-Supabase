import { motion } from "framer-motion";
import { CreditCard, DollarSign, History } from "lucide-react";

export default function BillingAndFunds() {
  const transactions = [
    {
      id: 1,
      date: "2024-01-27",
      description: "Added Funds",
      amount: "+$100",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-26",
      description: "Content Purchase",
      amount: "-$25",
      status: "completed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <DollarSign
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700">
                  <option value="">Select Payment Method</option>
                  <option>PayPal</option>
                  <option>RazoPay</option>
                </select>
              </div>

              <div className="col-span-full hidden">
                <label className="block text-sm font-medium mb-2">
                  Card Details
                </label>
                <div className="relative">
                  <CreditCard
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
                    placeholder="Card number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
                  placeholder="CVV"
                />
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
              >
                Add Funds
              </motion.button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <History size={20} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.amount.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
