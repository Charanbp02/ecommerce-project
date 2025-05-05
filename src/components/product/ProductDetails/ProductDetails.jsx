import { Heart, ShoppingCart, Share2 } from "lucide-react";

export default function ProductCard() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out">
      
      {/* Image Section */}
      <img
        src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/dp11176921.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvZHAxMTE3NjkyMS5hdmlmIiwiaWF0IjoxNzQ1MzEzMDUxLCJleHAiOjE3NzY4NDkwNTF9.xxBHPS27gau7XabEu_WuzR0PgleeRTQ1pMqmEXufo-o"
        alt="Dark Pink Shirt"
        className="w-full h-auto md:w-1/2 md:h-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Product Info */}
      <div className="p-6 md:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">
          NIVICK NEUVEST Men's Solid Spread Collar Dark Pink Shirt
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-lg">
          <span className="font-bold text-pink-700">₹309</span>
          <span className="line-through text-gray-400 text-sm">₹332</span>
          <span className="text-green-600 text-sm">7% off</span>
        </div>

        <p className="bg-green-100 text-green-800 text-sm p-2 rounded-md">
          ✅ UPI Offer applied for you!!
        </p>

        <div className="text-sm text-gray-700 space-y-1">
          <p>₹317 with COD</p>
          <p>₹15 off | Good Shopper Discount</p>
          <p className="text-green-600 font-medium">Free Delivery</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="bg-green-600 text-white px-2 py-1 rounded">4.2★</span>
          <span className="text-gray-500">(6983)</span>
          <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
            Trusted
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button className="flex-1 border border-pink-700 text-pink-700 py-2 rounded-md transition hover:bg-pink-50">
            <ShoppingCart size={16} className="inline mr-2" />
            Add to Cart
          </button>
          <button className="flex-1 bg-pink-700 text-white py-2 rounded-md transition hover:bg-pink-800">
            Buy Now
          </button>
        </div>

        <div className="flex justify-between mt-4 text-gray-500 text-lg">
          <Heart className="cursor-pointer hover:text-pink-600 transition" />
          <Share2 className="cursor-pointer hover:text-pink-600 transition" />
        </div>

        {/* Size Selection */}
        <div className="pt-6 border-t">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Select Size</h3>
            <button className="text-sm text-pink-600 hover:underline">SIZE CHART</button>
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            {["M", "L", "XL", "XXL"].map((size, i) => (
              <div
                key={i}
                className="border px-3 py-1 rounded-md text-sm text-center hover:bg-gray-100 transition"
              >
                <div className="font-medium">{size}</div>
                <div className="text-xs text-gray-500">₹{317 + i * 10}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Info */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold mb-2">Sold by</h3>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <img src="/shop-icon.svg" alt="Shop Icon" className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">KYNEEV ENTERPRISE</h4>
                <div className="text-gray-500 text-sm flex gap-2 flex-wrap mt-1">
                  <span className="text-green-600 font-semibold">4.1★</span>
                  <span>9,191 ratings</span>
                  <span>90 Followers</span>
                  <span>12 Products</span>
                </div>
              </div>
            </div>
            <button className="mt-2 md:mt-0 border border-pink-600 text-pink-600 px-3 py-1 rounded text-sm transition hover:bg-pink-50">
              View Shop
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="pt-6 border-t">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Product Highlights</h3>
            <button className="text-sm text-pink-600 hover:underline">COPY</button>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2 text-sm text-gray-700">
            <div><span className="font-medium">Occasion:</span> Casual</div>
            <div><span className="font-medium">Color:</span> Pink</div>
            <div><span className="font-medium">Stretchability:</span> No</div>
            <div><span className="font-medium">Fit/Shape:</span> Regular</div>
          </div>
        </div>
        {/* 🔽 You Might Also Like Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">You might also like</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              {
                name: "Comfy Designer Men Shirts",
                price: 275,
                originalPrice: 310,
                discount: "11% off",
                rating: 3.8,
                ratingCount: 28508,
                image:
                  "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/dp11176921.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvZHAxMTE3NjkyMS5hdmlmIiwiaWF0IjoxNzQ1MzEzMDUxLCJleHAiOjE3NzY4NDkwNTF9.xxBHPS27gau7XabEu_WuzR0PgleeRTQ1pMqmEXufo-o",
              },
              {
                name: "Comfy Retro Men Shirts",
                price: 311,
                originalPrice: 334,
                discount: "7% off",
                rating: 4.0,
                ratingCount: 2607,
                image:
                  "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/dp11176921.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvZHAxMTE3NjkyMS5hdmlmIiwiaWF0IjoxNzQ1MzEzMDUxLCJleHAiOjE3NzY4NDkwNTF9.xxBHPS27gau7XabEu_WuzR0PgleeRTQ1pMqmEXufo-o",
              },
            ].map((item, i) => (
              <div key={i} className="min-w-[160px] border rounded-md p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full object-cover rounded"
                />
                <div className="mt-2">
                  <h4 className="text-sm font-medium leading-tight line-clamp-2">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="font-bold text-gray-800">₹{item.price}</span>
                    <span className="line-through text-gray-400 text-xs">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-green-600 text-xs">{item.discount}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    ⭐ {item.rating} ({item.ratingCount})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
