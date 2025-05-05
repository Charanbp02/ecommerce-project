import React, { useState } from "react";

const wishlistItems = [
  {
    title: "Kid's Fashion",
    price: "₹6,200",
    originalPrice: "₹25,000",
    discount: "75%",
    rating: 3.5,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/pexels-photo-1620826.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvcGV4ZWxzLXBob3RvLTE2MjA4MjYud2VicCIsImlhdCI6MTc0NTMwOTEwMSwiZXhwIjoxNzc2ODQ1MTAxfQ.4l44LzLq-vZAcUjgGKkP-V0gNwISeeMjd01RUEjRlP4",
  },
  {
    title: "Men's Fashion",
    price: "₹6,799",
    originalPrice: "₹36,899",
    discount: "81%",
    rating: 4,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/Men%20shirts.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvTWVuIHNoaXJ0cy53ZWJwIiwiaWF0IjoxNzQ1MzA5Mzg1LCJleHAiOjE3NzY4NDUzODV9.PV_wl-Tf7A_JamvGbtBxbNEJH7pIjeOnACLUCczwZtY",
  },
  {
    title: "New Arrivals",
    price: "₹8,499",
    originalPrice: "₹35,999",
    discount: "76%",
    rating: 4.5,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/ks8dv_1200.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMva3M4ZHZfMTIwMC5qcGciLCJpYXQiOjE3NDUzMDk1MTUsImV4cCI6MTc3Njg0NTUxNX0.Az3QqHKN6Fddoi6K39DKo0Q-nQgG6Ir-1DgbYnwC3MM",
  },
  {
    title: "Top Sale's",
    price: "₹1,478",
    originalPrice: "₹2,390",
    discount: "38%",
    rating: 4,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/images.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvaW1hZ2VzLmpwZWciLCJpYXQiOjE3NDUzMDk2NjEsImV4cCI6MTc3Njg0NTY2MX0.BL5heLSwhkTSHK9a1bxfdjLttMTuKGb9L33NU7ustxw",
  },
  {
    title: "Kid's Fashion",
    price: "₹6,200",
    originalPrice: "₹25,000",
    discount: "75%",
    rating: 3.5,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/pexels-photo-1620826.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvcGV4ZWxzLXBob3RvLTE2MjA4MjYud2VicCIsImlhdCI6MTc0NTMwOTEwMSwiZXhwIjoxNzc2ODQ1MTAxfQ.4l44LzLq-vZAcUjgGKkP-V0gNwISeeMjd01RUEjRlP4",
  },
  {
    title: "Men's Fashion",
    price: "₹6,799",
    originalPrice: "₹36,899",
    discount: "81%",
    rating: 4,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/Men%20shirts.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvTWVuIHNoaXJ0cy53ZWJwIiwiaWF0IjoxNzQ1MzA5Mzg1LCJleHAiOjE3NzY4NDUzODV9.PV_wl-Tf7A_JamvGbtBxbNEJH7pIjeOnACLUCczwZtY",
  },
  {
    title: "New Arrivals",
    price: "₹8,499",
    originalPrice: "₹35,999",
    discount: "76%",
    rating: 4.5,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/ks8dv_1200.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMva3M4ZHZfMTIwMC5qcGciLCJpYXQiOjE3NDUzMDk1MTUsImV4cCI6MTc3Njg0NTUxNX0.Az3QqHKN6Fddoi6K39DKo0Q-nQgG6Ir-1DgbYnwC3MM",
  },
  {
    title: "Top Sale's",
    price: "₹1,478",
    originalPrice: "₹2,390",
    discount: "38%",
    rating: 4,
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/images.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvaW1hZ2VzLmpwZWciLCJpYXQiOjE3NDUzMDk2NjEsImV4cCI6MTc3Njg0NTY2MX0.BL5heLSwhkTSHK9a1bxfdjLttMTuKGb9L33NU7ustxw",
  },
];

const Wishlist = () => {
  const [cartCount, setCartCount] = useState(1);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addedItem, setAddedItem] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartCount(cartCount + 1);
    setAddedItem(item.title);
    setTimeout(() => setAddedItem(null), 2000); // Clear "Added" message after 2 seconds
  };

  const toggleCartPreview = () => {
    setShowCartPreview(!showCartPreview);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-3 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">My Wishlist</h1>
        </div>
        <div className="relative">
          <button
            onClick={toggleCartPreview}
            className="focus:outline-none bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10z"/>
              <path d="M12 11l4-4m0 0l-4 4m4-4v8"/>
            </svg>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
              {cartCount}
            </span>
          </button>
          {showCartPreview && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-20">
              <h3 className="text-lg font-semibold mb-2">Cart Preview</h3>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="py-1">{item.title} - {item.price}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Wishlist Info */}
      <div className="p-4 flex items-center">
        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.209 0-4 1.791-4 4v1h8v-1c0-2.209-1.791-4-4-4z" />
        </svg>
        <span className="text-gray-600">Private • {wishlistItems.length} items</span>
      </div>

      {/* Wishlist Items */}
      <div className="p-4">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-3 shadow hover:shadow-lg transition bg-white">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-2 rounded" />
                {/* More Options (Three Dots) */}
                <button className="absolute top-2 right-2 focus:outline-none bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v.01M12 12v.01M12 18v.01" />
                  </svg>
                </button>
              </div>
              <h2 className="text-sm font-semibold truncate">{item.title}</h2>
              <div className="flex items-center gap-2 text-sm my-1">
                <span className="text-green-600 font-semibold">↓{item.discount}</span>
                <span className="line-through text-gray-400">{item.originalPrice}</span>
                <span className="font-bold text-black">{item.price}</span>
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(Math.floor(item.rating))}
                {item.rating % 1 ? "½" : ""}
                {"☆".repeat(5 - Math.ceil(item.rating))}
              </div>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
              >
                {addedItem === item.title ? "Added!" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;