import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function SeoTools() {
  const tools = [
    {
      id: "dofollow-checker",
      title: "Dofollow Nofollow Link Checker",
      description: "Check Dofollow and Nofollow Links Anytime, Anywhere!",
      isNew: true,
    },
    {
      id: "domain-age",
      title: "Domain Age Checker",
      description: "Easy, Fast, and Free Domain Age Analysis.",
      isNew: true,
    },
    {
      id: "link-analyzer",
      title: "Link Analyzer",
      description: "Analyzes Your Website's Internal and External Links.",
      isNew: true,
    },
    {
      id: "backlink-checker",
      title: "Backlink Status Checker",
      description: "Track & Ensure Your Website's Links are Active!",
      isNew: true,
    },
    {
      id: "broken-link",
      title: "Broken Link Checker",
      description: "Identify and Fix Any Broken Links",
      isNew: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Extension</h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold mb-2">Website Finder</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find GuestPost Websites Instantly with Chrome Extension
            </p>
          </div>
          <ExternalLink className="text-green-500" size={24} />
        </motion.div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{tool.title}</h3>
              {tool.isNew && (
                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {tool.description}
            </p>
            <div className="flex justify-between items-center">
              <button className="text-green-500 hover:text-orange-600">
                Read more
              </button>
              <ExternalLink className="text-green-500" size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
