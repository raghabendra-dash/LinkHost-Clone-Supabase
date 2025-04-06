import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SlidersHorizontal,
  BarChart2,
  Check,
  X,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import MarketplaceFilters from "../components/MarketplaceFilters";
import toast from "react-hot-toast";

interface WebsiteMetrics {
  domainRating: number;
  referringDomains: string;
  totalBacklinks: string;
  totalKeywords: string;
  spamScore: string;
  language: string;
  linkValidity: string;
  trafficByCountry: string;
}

interface Website {
  id: string;
  url: string;
  metrics: WebsiteMetrics;
  price: number;
  category?: string;
}

interface FilterValues {
  mozDa: { min: number; max: number };
  ahrefs: { min: number; max: number };
  semrush: { min: number; max: number };
  priceRange: { min: number; max: number };
  categories: string[];
  countries: string[];
  languages: string[];
  domainRating: { min: number; max: number };
  authorityScore: { min: number; max: number };
  trustFlow: { min: number; max: number };
  citationFlow: { min: number; max: number };
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [compareItems, setCompareItems] = useState<Website[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const { addToCart } = useCart();

  const filters: string[] = ["Top Selling", "Newly Added", "Digital PR"];

  const [filterValues, setFilterValues] = useState<FilterValues>({
    mozDa: { min: 0, max: 100 },
    ahrefs: { min: 0, max: 100 },
    semrush: { min: 0, max: 100 },
    priceRange: { min: 0, max: 1000 },
    categories: [],
    countries: [],
    languages: [],
    domainRating: { min: 0, max: 100 },
    authorityScore: { min: 0, max: 100 },
    trustFlow: { min: 0, max: 100 },
    citationFlow: { min: 0, max: 100 },
  });

  // Sample websites data with more entries
  const websites: Website[] = [
    {
      id: "1",
      url: "example.com",
      metrics: {
        domainRating: 50,
        referringDomains: "5.3K",
        totalBacklinks: "33.1K",
        totalKeywords: "5.4K",
        spamScore: "4%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "India",
      },
      price: 36,
      category: "Technology",
    },
    {
      id: "2",
      url: "techblog.com",
      metrics: {
        domainRating: 65,
        referringDomains: "8.2K",
        totalBacklinks: "45.6K",
        totalKeywords: "12.1K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "USA",
      },
      price: 89,
      category: "Technology",
    },
    {
      id: "3",
      url: "healthnews.org",
      metrics: {
        domainRating: 72,
        referringDomains: "12.7K",
        totalBacklinks: "78.3K",
        totalKeywords: "18.5K",
        spamScore: "1%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "United Kingdom",
      },
      price: 120,
      category: "Health",
    },
    {
      id: "4",
      url: "financetips.net",
      metrics: {
        domainRating: 58,
        referringDomains: "6.9K",
        totalBacklinks: "41.2K",
        totalKeywords: "9.8K",
        spamScore: "3%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Canada",
      },
      price: 75,
      category: "Finance",
    },
    {
      id: "5",
      url: "travelguide.com",
      metrics: {
        domainRating: 68,
        referringDomains: "9.4K",
        totalBacklinks: "52.7K",
        totalKeywords: "14.3K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Australia",
      },
      price: 95,
      category: "Travel",
    },
    {
      id: "6",
      url: "foodrecipes.com",
      metrics: {
        domainRating: 61,
        referringDomains: "7.8K",
        totalBacklinks: "47.5K",
        totalKeywords: "11.2K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "USA",
      },
      price: 82,
      category: "Food",
    },
    {
      id: "7",
      url: "sportsnews.org",
      metrics: {
        domainRating: 63,
        referringDomains: "8.1K",
        totalBacklinks: "49.3K",
        totalKeywords: "12.7K",
        spamScore: "3%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "United Kingdom",
      },
      price: 88,
      category: "Sports",
    },
    {
      id: "8",
      url: "fashiontrends.net",
      metrics: {
        domainRating: 59,
        referringDomains: "7.2K",
        totalBacklinks: "43.8K",
        totalKeywords: "10.5K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "France",
      },
      price: 78,
      category: "Fashion",
    },
    {
      id: "9",
      url: "educationresources.org",
      metrics: {
        domainRating: 70,
        referringDomains: "11.3K",
        totalBacklinks: "67.9K",
        totalKeywords: "16.2K",
        spamScore: "1%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Canada",
      },
      price: 110,
      category: "Education",
    },
    {
      id: "10",
      url: "businessinsider.net",
      metrics: {
        domainRating: 75,
        referringDomains: "14.6K",
        totalBacklinks: "89.2K",
        totalKeywords: "21.7K",
        spamScore: "1%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "USA",
      },
      price: 135,
      category: "Business",
    },
    {
      id: "11",
      url: "marketingstrategies.com",
      metrics: {
        domainRating: 64,
        referringDomains: "8.7K",
        totalBacklinks: "51.4K",
        totalKeywords: "13.8K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Australia",
      },
      price: 92,
      category: "Marketing",
    },
    {
      id: "12",
      url: "realestateinvestment.org",
      metrics: {
        domainRating: 62,
        referringDomains: "8.0K",
        totalBacklinks: "48.6K",
        totalKeywords: "12.3K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Canada",
      },
      price: 85,
      category: "Real Estate",
    },
    {
      id: "13",
      url: "entertainmentnews.com",
      metrics: {
        domainRating: 67,
        referringDomains: "9.1K",
        totalBacklinks: "54.8K",
        totalKeywords: "14.9K",
        spamScore: "2%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "USA",
      },
      price: 98,
      category: "Entertainment",
    },
    {
      id: "14",
      url: "scienceresearch.net",
      metrics: {
        domainRating: 71,
        referringDomains: "11.8K",
        totalBacklinks: "71.2K",
        totalKeywords: "17.3 K",
        spamScore: "1%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Germany",
      },
      price: 115,
      category: "Science",
    },
    {
      id: "15",
      url: "technologynews.org",
      metrics: {
        domainRating: 69,
        referringDomains: "10.5K",
        totalBacklinks: "63.7K",
        totalKeywords: "15.8K",
        spamScore: "1%",
        language: "English",
        linkValidity: "1 Year",
        trafficByCountry: "Japan",
      },
      price: 105,
      category: "Technology",
    },
  ];

  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>(websites);

  useEffect(() => {
    // Apply filters to websites
    let filtered = websites;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((website) =>
        website.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterValues.categories.length > 0) {
      filtered = filtered.filter(
        (website) =>
          website.category && filterValues.categories.includes(website.category)
      );
    }

    // Apply country filter
    if (filterValues.countries.length > 0) {
      filtered = filtered.filter((website) =>
        filterValues.countries.includes(website.metrics.trafficByCountry)
      );
    }

    // Apply language filter
    if (filterValues.languages.length > 0) {
      filtered = filtered.filter((website) =>
        filterValues.languages.includes(website.metrics.language)
      );
    }

    // Apply domain rating filter
    filtered = filtered.filter(
      (website) =>
        website.metrics.domainRating >= filterValues.mozDa.min &&
        website.metrics.domainRating <= filterValues.mozDa.max
    );

    // Apply price filter
    filtered = filtered.filter(
      (website) =>
        website.price >= filterValues.priceRange.min &&
        website.price <= filterValues.priceRange.max
    );

    setFilteredWebsites(filtered);
  }, [searchQuery, filterValues, websites]);

  const handleAddToCart = (website: Website): void => {
    addToCart(website);
  };

  const handleFilterChange = (type: keyof FilterValues, value: any): void => {
    setFilterValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleApplyFilters = (): void => {
    // Filters are applied in the useEffect
    toast.success("Filters applied successfully");
  };

  const toggleCompareItem = (website: Website): void => {
    if (compareItems.some((item) => item.id === website.id)) {
      setCompareItems(compareItems.filter((item) => item.id !== website.id));
    } else {
      if (compareItems.length >= 3) {
        toast.error("You can compare up to 3 websites at a time");
        return;
      }
      setCompareItems([...compareItems, website]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-20 pb-4"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search from 100,000+ websites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex space-x-2 ml-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter.toLowerCase())}
              className={`px-4 py-2 rounded-lg ${
                selectedFilter === filter.toLowerCase()
                  ? "bg-green-500 text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {filter}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          >
            <Filter size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsComparing(!isComparing)}
            className={`p-2 rounded-lg ${
              isComparing
                ? "bg-green-500 text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <BarChart2 size={20} />
          </motion.button>
        </div>
      </div>

      {isComparing && (
        <div className="mb-4 p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              Compare Websites ({compareItems.length}/3)
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCompareItems([])}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                disabled={compareItems.length < 2}
                className={`px-4 py-1 text-sm rounded-lg ${
                  compareItems.length < 2
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-600"
                    : "bg-green-500 text-black hover:bg-green-600"
                }`}
              >
                Compare Now
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            {compareItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-lg"
              >
                <span className="mr-2">{item.url}</span>
                <button
                  onClick={() => toggleCompareItem(item)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {Array.from({ length: 3 - compareItems.length }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg w-32 h-10"
              >
                <span className="text-gray-400 dark:text-gray-500">
                  Empty slot
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-64 flex-shrink-0"
          >
            <MarketplaceFilters
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
            />
          </motion.div>
        )}

        {/* Website List */}
        <div className="flex-1">
          <div className="space-y-4">
            {filteredWebsites.length > 0 ? (
              filteredWebsites.map((website, index) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="col-span-2">
                      <div className="flex items-center">
                        {isComparing && (
                          <div
                            onClick={() => toggleCompareItem(website)}
                            className={`w-5 h-5 mr-3 border rounded flex items-center justify-center cursor-pointer ${
                              compareItems.some(
                                (item) => item.id === website.id
                              )
                                ? "text-green-500 border-orange-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {compareItems.some(
                              (item) => item.id === website.id
                            ) && <Check size={12} />}
                          </div>
                        )}
                        <h3 className="text-lg font-semibold">{website.url}</h3>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">DA</p>
                          <p className="font-semibold">
                            {website.metrics.domainRating}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Traffic</p>
                          <p className="font-semibold">
                            {website.metrics.referringDomains}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Backlinks</p>
                          <p className="font-semibold">
                            {website.metrics.totalBacklinks}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-3 gap-4">
                      {Object.entries(website.metrics)
                        .slice(3)
                        .map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-gray-500">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="font-semibold">{value}</p>
                          </div>
                        ))}
                    </div>

                    <div className="col-span-1 text-right">
                      <p className="text-2xl font-bold text-green-500">
                        ${website.price}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(website)}
                        className="mt-2 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <Info size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">
                  No websites found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search query to find more
                  websites.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Website Comparison</h2>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="px-4 py-3 text-left">Metrics</th>
                    {compareItems.map((item) => (
                      <th key={item.id} className="px-4 py-3 text-left">
                        {item.url}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Domain Rating</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.domainRating}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Referring Domains</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.referringDomains}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Total Backlinks</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.totalBacklinks}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Total Keywords</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.totalKeywords}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Spam Score</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.spamScore}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Language</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.language}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Link Validity</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.linkValidity}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">
                      Traffic By Country
                    </td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        {item.metrics.trafficByCountry}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">Price</td>
                    {compareItems.map((item) => (
                      <td
                        key={item.id}
                        className="px-4 py-3 font-semibold text-green-500"
                      >
                        ${item.price}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="px-4 py-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleAddToCart(item);
                            setShowCompareModal(false);
                          }}
                          className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                        >
                          Add to Cart
                        </motion.button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
