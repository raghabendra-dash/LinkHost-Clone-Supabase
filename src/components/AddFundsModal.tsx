import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const offers = [
    { amount: 500, bonus: 25 },
    { amount: 1000, bonus: 50 },
    { amount: 5000, bonus: 300 },
    { amount: 10000, bonus: 750 },
    { amount: 15000, bonus: 1100 },
    { amount: 20000, bonus: 1500 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, y: "50%" }}
            className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 z-50 w-full max-w-2xl"
            style={{
              transform: "translate(-50%, -50%) !important",
              top: "50%",
              left: "50%",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Offers</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {offers.map((offer) => (
                <motion.div
                  key={offer.amount}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500 dark:hover:border-orange-500"
                >
                  <div className="text-lg font-semibold">${offer.amount}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    + Get ${offer.bonus} Bonus
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Amount
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700">
                  <option value="25">$25</option>
                  {offers.map((offer) => (
                    <option key={offer.amount} value={offer.amount}>
                      ${offer.amount}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Payment Method
                </label>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500"
                  >
                    <img
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                      alt="PayPal"
                      className="h-6 mx-auto"
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500"
                  >
                    <img
                      src="https://razorpay.com/assets/razorpay-logo.svg"
                      alt="Razorpay"
                      className="h-6 mx-auto"
                    />
                  </motion.button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Amount</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Processing Fee</span>
                  <span>$1.5</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>$26.5</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-pink-500"
              >
                Proceed to Add
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
