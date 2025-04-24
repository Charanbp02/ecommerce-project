import React, { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingBag,
  FaHeart,
  FaEye,
} from "react-icons/fa";

const products = [
  {
    title: "Vintage-Inspired Floral Midi Dress",
    price: 70,
    originalPrice: 90,
    discount: "-22%",
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/dp11176921.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvZHAxMTE3NjkyMS5hdmlmIiwiaWF0IjoxNzQ1MzEzMDUxLCJleHAiOjE3NzY4NDkwNTF9.xxBHPS27gau7XabEu_WuzR0PgleeRTQ1pMqmEXufo-o",
  },
  {
    title: "Trendy Denim Jacket with Patches",
    price: 70,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/Front_68230255-8dde-494d-8b8e-f9b21aba14fd.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvRnJvbnRfNjgyMzAyNTUtOGRkZS00OTRkLThiOGUtZjliMjFhYmExNGZkLndlYnAiLCJpYXQiOjE3NDUzMTMwNzMsImV4cCI6MTc3Njg0OTA3M30._NdUkIUtv4gX3LK_HjUNjKLEil2J1mK80tV-emgiFcE",
  },
  {
    title: "Statement Geometric Print Scarf",
    price: 50,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/Shajar_Dress_-_Baise_Gaba-7491311.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvU2hhamFyX0RyZXNzXy1fQmFpc2VfR2FiYS03NDkxMzExLndlYnAiLCJpYXQiOjE3NDUzMTMxMTAsImV4cCI6MTc3Njg0OTExMH0.aPsfu8fLwBulnCEW-odwLCvr7TKtaqtIuR2KwaBG01c",
    from: true,
  },
  {
    title: "Modern Slim Fit Suit",
    price: 70,
    originalPrice: 90,
    discount: "-22%",
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/shopping.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3Qvc2hvcHBpbmcud2VicCIsImlhdCI6MTc0NTMxMzEyNywiZXhwIjoxNzc2ODQ5MTI3fQ.XG-CvYY_Sc88w4jz7srhbe9oWM1gLZMZLAaISVy5zQo",
  },
];
const TrendingProducts = () => {
  const sliderRef = useRef();

  const scroll = (offset) => {
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="px-6 py-10">
      {/* Title + View All */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:bg-black">
          Trending Products
        </h2>
        <button
          onClick={() => alert("View All clicked")}
          className="text-primary font-medium hover:underline"
        >
          View All
        </button>
      </div>

      {/* Product Slider */}
      <div className="relative">
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3 hidden md:block"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 scroll-smooth pb-4 no-scrollbar"
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white rounded-xl shadow p-4 relative group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="rounded-xl mb-4 h-72 w-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-sm rounded-full">
                  {product.discount} sale
                </div>
              )}

              {/* Hover Icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">
                {[FaEye, FaHeart].map((Icon, index) => (
                  <button
                    key={index}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition">
                <FaShoppingBag /> Add To Cart
              </button>

              <h3 className="text-md font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">
                {product.from ? "From " : ""}
                <span className="text-black font-bold">
                  Tk {product.price}.00 BDT
                </span>
              </p>
              {product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">
                  Tk {product.originalPrice}.00 BDT
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(300)}
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3 hidden md:block"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;