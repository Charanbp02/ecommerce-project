import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Kid's Fashion",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/pexels-photo-1620826.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvcGV4ZWxzLXBob3RvLTE2MjA4MjYud2VicCIsImlhdCI6MTc0NTMwOTEwMSwiZXhwIjoxNzc2ODQ1MTAxfQ.4l44LzLq-vZAcUjgGKkP-V0gNwISeeMjd01RUEjRlP4",
  },
  {
    title: "Men's Fashion",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/Men%20shirts.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvTWVuIHNoaXJ0cy53ZWJwIiwiaWF0IjoxNzQ1MzA5Mzg1LCJleHAiOjE3NzY4NDUzODV9.PV_wl-Tf7A_JamvGbtBxbNEJH7pIjeOnACLUCczwZtY",
  },
  {
    title: "New Arrivals",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/ks8dv_1200.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3UnofficialAPI:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1bm9mZmljaWFsIiwibmJmIjoxNzI3NzE2MzkyLCJleHAiOjE3Mjc3NTk1OTIsImlzcyI6InVub2ZmaWNpYWwiLCJzaWQiOiI5YzVhNjFlNC1jODkwLTQ4NzktYjJiOC04NzVhZWE2YzZiOWEifQ.2W3gVIBN_5uTqF8IIsD6Mw3kSmjH4D2Qz2QXH2TKNfo",
  },
  {
    title: "Top Sale's",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/images.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvaW1hZ2VzLmpwZWciLCJpYXQiOjE3NDUzMDk2NjEsImV4cCI6MTc3Njg0NTY2MX0.BL5heLSwhkTSHK9a1bxfdjLttMTuKGb9L33NU7ustxw",
  },
];

const FALLBACK_IMAGE = "https://via.placeholder.com/300x400?text=Image+Not+Found";

export default function CategoryCards() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check scroll boundaries
  const checkScrollBoundaries = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Scroll function
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (direction === "left" && canScrollLeft) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right" && canScrollRight) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      if (canScrollRight) {
        scroll("right");
      } else {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoScrolling, canScrollRight]);

  // Scroll boundary check on scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", checkScrollBoundaries);
    checkScrollBoundaries();
    return () => scrollContainer.removeEventListener("scroll", checkScrollBoundaries);
  }, [checkScrollBoundaries]);

  // Touch/Swipe support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (startX - x) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    checkScrollBoundaries();
  };

  // Analytics tracking (placeholder)
  const trackCategoryClick = (categoryTitle) => {
    console.log(`Category clicked: ${categoryTitle}`);
    // Replace with actual analytics service (e.g., Google Analytics)
    // window.gtag('event', 'category_click', { category: categoryTitle });
  };

  return (
    <div
      className="px-6 py-12 bg-white dark:bg-gray-900"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      {/* Header + View All */}
      <div className="flex items-center justify-between mb-10 px-2 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block after:content-[''] after:block after:w-24 after:h-1 after:bg-black dark:after:bg-white after:mt-2">
          Categories
        </h2>
        <button
          onClick={() => {
            trackCategoryClick("View All");
            navigate("/categoriespage", { state: { categories } });
          }}
          className="text-primary hover:underline font-medium"
          aria-label="View all categories"
        >
          View All
        </button>
      </div>

      {/* Scroll Buttons */}
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md p-2 rounded-full hidden md:block ${
            !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md p-2 rounded-full hidden md:block ${
            !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-6 h-6 text-black dark:text-white" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Category carousel"
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] h-96 rounded-2xl overflow-hidden group shadow-md flex-shrink-0"
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
                  onClick={() => {
                    trackCategoryClick(cat.title);
                    navigate("/CategeriesItems", { state: { category: cat.title } });
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
      </div>
    </div>
  );
}