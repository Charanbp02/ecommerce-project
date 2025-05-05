import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=Image+Not+Found";

export default function CategeriesItems() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.category || "All Items";
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // default, priceAsc, priceDesc, titleAsc, titleDesc
  const [priceRange, setPriceRange] = useState([0, 2000]); // [min, max]
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [visibleItems, setVisibleItems] = useState(8); // Initial number of items to show
  const [isLoading, setIsLoading] = useState(true);

  const allItems = [
    {
      title: "Kids T-Shirt",
      image: "https://images.unsplash.com/photo-1618354691261-58f98969d3d3?auto=format&fit=crop&w=600&q=60",
      category: "Kid's Fashion",
      price: 399,
    },
    {
      title: "Kids Dress",
      image: "https://images.unsplash.com/photo-1520975911115-8bc3f1bdfcdc?auto=format&fit=crop&w=600&q=60",
      category: "Kid's Fashion",
      price: 599,
    },
    {
      title: "Boys Jacket",
      image: "https://images.unsplash.com/photo-1602810316521-3e4f8ae13577?auto=format&fit=crop&w=600&q=60",
      category: "Kid's Fashion",
      price: 749,
    },
    {
      title: "Girls Skirt",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=60",
      category: "Kid's Fashion",
      price: 299,
    },
    {
      title: "Women's Handbag",
      image: "https://images.unsplash.com/photo-1600180758890-6be201edc1d4?auto=format&fit=crop&w=600&q=60",
      category: "Accessories",
      price: 899,
    },
    {
      title: "Men's Shoes",
      image: "https://images.unsplash.com/photo-1606811842647-47e4683caa4d?auto=format&fit=crop&w=600&q=60",
      category: "Footwear",
      price: 1299,
    },
  ];

  // Simulate loading (replace with API call in the future)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate API delay
    return () => clearTimeout(timer);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filter and sort items
  const filteredItems = allItems
    .filter(
      (item) =>
        (selectedCategory === "All Items" || item.category === selectedCategory) &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOrder === "priceAsc") return a.price - b.price;
      if (sortOrder === "priceDesc") return b.price - a.price;
      if (sortOrder === "titleAsc") return a.title.localeCompare(b.title);
      if (sortOrder === "titleDesc") return b.title.localeCompare(a.title);
      return 0; // default
    });

  // Add to cart with duplicate check
  const addToCart = useCallback(
    (item) => {
      if (cart.some((cartItem) => cartItem.title === item.title)) {
        alert(`${item.title} is already in the cart!`);
        return;
      }
      setCart((prev) => [...prev, item]);
      alert(`${item.title} added to cart!`);
      trackItemClick(item.title);
    },
    [cart]
  );

  // Load more items
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  // Analytics tracking (placeholder)
  const trackItemClick = useCallback((itemTitle) => {
    console.log(`Item added to cart: ${itemTitle}`);
    // Replace with actual analytics service (e.g., Google Analytics)
    // window.gtag('event', 'add_to_cart', { item: itemTitle });
  }, []);

  return (
    <div className="px-4 sm:px-6 py-12 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header and Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/categoriespage")}
            className="flex items-center text-primary hover:underline font-medium"
            aria-label="Back to categories"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Categories
          </button>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            {selectedCategory}
          </h2>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <span className="text-gray-600 dark:text-gray-300">
            Cart: {cart.length} items
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search items"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-1/4 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sort items"
        >
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="titleAsc">Title: A-Z</option>
          <option value="titleDesc">Title: Z-A</option>
        </select>
        <div className="w-full sm:w-1/3">
          <label className="text-gray-600 dark:text-gray-300 block mb-2">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-1/2"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-1/2"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 text-center">
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-1 mx-auto" />
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-3 mx-auto" />
                  <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
                </div>
              </div>
            ))
          : filteredItems.slice(0, visibleItems).map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    addToCart(item);
                  }
                }}
                aria-label={`Add ${item.title} to cart`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    ₹{item.price}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* No Results Message */}
      {!isLoading && filteredItems.length === 0 && (
        <div className="col-span-full text-center text-gray-500 dark:text-gray-300 mt-8">
          No items found.
        </div>
      )}

      {/* Load More Button */}
      {visibleItems < filteredItems.length && !isLoading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition"
            aria-label="Load more items"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}