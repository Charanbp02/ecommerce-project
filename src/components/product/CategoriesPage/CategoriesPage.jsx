import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x400?text=Image+Not+Found";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedCategories = location.state?.categories || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // default, asc, desc
  const [visibleCategories, setVisibleCategories] = useState(8); // Initial number of categories to show
  const [isLoading, setIsLoading] = useState(true);

  // Additional categories
  const extraCategories = [
    {
      title: "Women's Fashion",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "Accessories",
      image:
        "https://images.unsplash.com/photo-1600180758890-6be201edc1d4?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "Footwear",
      image:
        "https://images.unsplash.com/photo-1606811842647-47e4683caa4d?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "Winter Collection",
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1621043823489-366c9bdfc9f3?auto=format&fit=crop&w=600&q=60",
    },
  ];

  // Combine and process categories
  const allCategories = [...receivedCategories, ...extraCategories];

  // Filter and sort categories
  const filteredCategories = allCategories
    .filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      if (sortOrder === "desc") return b.title.localeCompare(a.title);
      return 0; // default
    });

  // Simulate loading (replace with API call in the future)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate API delay
    return () => clearTimeout(timer);
  }, []);

  // Load more categories
  const handleLoadMore = () => {
    setVisibleCategories((prev) => prev + 8);
  };

  // Analytics tracking (placeholder)
  const trackCategoryClick = useCallback((categoryTitle) => {
    console.log(`Category clicked: ${categoryTitle}`);
    // Replace with actual analytics service (e.g., Google Analytics)
    // window.gtag('event', 'category_click', { category: categoryTitle });
  }, []);

  return (
    <div className="px-4 sm:px-6 py-12 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header and Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-primary hover:underline font-medium"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            All Categories
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            aria-label="Search categories"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Sort categories"
          >
            <option value="default">Default</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="relative h-80 rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center px-4">
                  <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
                  <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
              </div>
            ))
          : filteredCategories
              .slice(0, visibleCategories)
              .map((cat, idx) => (
                <div
                  key={idx}
                  className="relative h-80 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    trackCategoryClick(cat.title);
                    navigate("/CategeriesItems", {
                      state: { category: cat.title },
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      trackCategoryClick(cat.title);
                      navigate("/CategeriesItems", {
                        state: { category: cat.title },
                      });
                    }
                  }}
                  aria-label={`View ${cat.title} category`}
                >
                  <img
                    src={cat.image}
                    alt={`${cat.title} category`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300 flex flex-col justify-center items-center text-white text-center px-4">
                    <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent duplicate navigation
                        trackCategoryClick(cat.title);
                        navigate("/CategeriesItems", {
                          state: { category: cat.title },
                        });
                      }}
                      className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
                      aria-label={`Shop ${cat.title} category`}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
      </div>

      {/* Load More Button */}
      {visibleCategories < filteredCategories.length && !isLoading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition"
            aria-label="Load more categories"
          >
            Load More
          </button>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && filteredCategories.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No categories found matching your search.
        </div>
      )}
    </div>
  );
}