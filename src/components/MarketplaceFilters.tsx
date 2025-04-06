import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Check } from "lucide-react";
import { useState } from "react";

interface MarketplaceFiltersProps {
  onFilterChange: (filterType: string, value: any) => void;
  onApplyFilters: () => void;
}

export default function MarketplaceFilters({
  onFilterChange,
  onApplyFilters,
}: MarketplaceFiltersProps) {
  const [mozDaRange, setMozDaRange] = useState({ min: 0, max: 100 });
  const [ahrefsRange, setAhrefsRange] = useState({ min: 0, max: 100 });
  const [semrushRange, setSemrushRange] = useState({ min: 0, max: 100 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");

  const categories = [
    "SaaS",
    "Agriculture",
    "Technology",
    "Health",
    "Finance",
    "Education",
    "Entertainment",
    "Food",
    "Travel",
    "Fashion",
    "Sports",
    "News",
    "Business",
    "Marketing",
    "Real Estate",
  ];

  const countries = [
    "United States",
    "India",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Spain",
    "Italy",
    "Netherlands",
    "Russia",
    "China",
    "South Africa",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Hindi",
    "Chinese",
    "Japanese",
    "Portuguese",
    "Russian",
    "Arabic",
    "Italian",
    "Dutch",
    "Korean",
    "Swedish",
    "Turkish",
  ];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const filteredLanguages = languages.filter((language) =>
    language.toLowerCase().includes(searchLanguage.toLowerCase())
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleCountryToggle = (country: string) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country);
      } else {
        return [...prev, country];
      }
    });
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((l) => l !== language);
      } else {
        return [...prev, language];
      }
    });
  };

  const handleApplyFilters = () => {
    onFilterChange("mozDa", mozDaRange);
    onFilterChange("ahrefs", ahrefsRange);
    onFilterChange("semrush", semrushRange);
    onFilterChange("priceRange", priceRange);
    onFilterChange("categories", selectedCategories);
    onFilterChange("countries", selectedCountries);
    onFilterChange("languages", selectedLanguages);
    onApplyFilters();
  };

  const handleResetFilters = () => {
    setMozDaRange({ min: 0, max: 100 });
    setAhrefsRange({ min: 0, max: 100 });
    setSemrushRange({ min: 0, max: 100 });
    setPriceRange({ min: 0, max: 1000 });
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedLanguages([]);
    setSearchCategory("");
    setSearchCountry("");
    setSearchLanguage("");
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-green-500 hover:text-orange-600"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <input
                type="number"
                min="0"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Moz DA Filter */}
        <div>
          <h3 className="font-medium mb-2 flex items-center">
            <img
              src="https://moz.com/favicon.ico"
              alt="Moz"
              className="w-4 h-4 mr-2"
            />
            Moz DA
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <input
                type="number"
                min="0"
                max="100"
                value={mozDaRange.min}
                onChange={(e) =>
                  setMozDaRange({
                    ...mozDaRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={mozDaRange.max}
                onChange={(e) =>
                  setMozDaRange({
                    ...mozDaRange,
                    max: parseInt(e.target.value) || 100,
                  })
                }
                className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mozDaRange.max}
              onChange={(e) =>
                setMozDaRange({ ...mozDaRange, max: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <div className="space-y-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
              {filteredCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <label className="flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 mr-2 flex items-center justify-center border rounded ${
                        selectedCategories.includes(category)
                          ? "text-green-500 border-orange-500 text-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedCategories.includes(category) && (
                        <Check size={12} />
                      )}
                    </span>
                    <span className="text-sm">{category}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic By Country */}
        <div>
          <h3 className="font-medium mb-2">Traffic By Country</h3>
          <div className="space-y-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Country"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
              {filteredCountries.map((country) => (
                <div key={country} className="flex items-center">
                  <label className="flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountryToggle(country)}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 mr-2 flex items-center justify-center border rounded ${
                        selectedCountries.includes(country)
                          ? "text-green-500 border-orange-500 text-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedCountries.includes(country) && (
                        <Check size={12} />
                      )}
                    </span>
                    <span className="text-sm">{country}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Language Filter */}
        <div>
          <h3 className="font-medium mb-2">Language</h3>
          <div className="space-y-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Language"
                value={searchLanguage}
                onChange={(e) => setSearchLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
              {filteredLanguages.map((language) => (
                <div key={language} className="flex items-center">
                  <label className="flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 mr-2 flex items-center justify-center border rounded ${
                        selectedLanguages.includes(language)
                          ? "text-green-500 border-orange-500 text-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedLanguages.includes(language) && (
                        <Check size={12} />
                      )}
                    </span>
                    <span className="text-sm">{language}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More Metrics */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <img
                src="https://ahrefs.com/favicon.ico"
                alt="Ahrefs"
                className="w-4 h-4 mr-2"
              />
              Ahrefs Traffic
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={ahrefsRange.min}
                  onChange={(e) =>
                    setAhrefsRange({
                      ...ahrefsRange,
                      min: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={ahrefsRange.max}
                  onChange={(e) =>
                    setAhrefsRange({
                      ...ahrefsRange,
                      max: parseInt(e.target.value) || 100,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={ahrefsRange.max}
                onChange={(e) =>
                  setAhrefsRange({
                    ...ahrefsRange,
                    max: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <img
                src="https://www.semrush.com/favicon.ico"
                alt="Semrush"
                className="w-4 h-4 mr-2"
              />
              Semrush Traffic
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={semrushRange.min}
                  onChange={(e) =>
                    setSemrushRange({
                      ...semrushRange,
                      min: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={semrushRange.max}
                  onChange={(e) =>
                    setSemrushRange({
                      ...semrushRange,
                      max: parseInt(e.target.value) || 100,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={semrushRange.max}
                onChange={(e) =>
                  setSemrushRange({
                    ...semrushRange,
                    max: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplyFilters}
          className="w-full px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 mt-4"
        >
          Apply Filters
        </motion.button>
      </div>
    </div>
  );
}
