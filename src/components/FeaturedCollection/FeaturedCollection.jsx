import { Eye, Share2, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Cargo Shorts for Active Boys',
    image: 'https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/dp11176921.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvZHAxMTE3NjkyMS5hdmlmIiwiaWF0IjoxNzQ1MzEzMDUxLCJleHAiOjE3NzY4NDkwNTF9.xxBHPS27gau7XabEu_WuzR0PgleeRTQ1pMqmEXufo-o',
    discount: '-23%',
    oldPrice: 78,
    newPrice: 75,
  },
  {
    id: 2,
    name: 'Classic Black Denim Jacket',
    image: 'https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuLnBuZyIsImlhdCI6MTc0NTMxNzcwNSwiZXhwIjoxNzc2ODUzNzA1fQ.816Jqav2CYL7g6fVsB20shaBZPZnovCwnzz5Hunh3Zc',
    discount: '-20%',
    oldPrice: 100,
    newPrice: 80,
  },
  {
    id: 3,
    name: 'Classic Button-Down Shirt',
    image: 'https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/trendingproduct/Shajar_Dress_-_Baise_Gaba-7491311.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJ0cmVuZGluZ3Byb2R1Y3QvU2hhamFyX0RyZXNzXy1fQmFpc2VfR2FiYS03NDkxMzExLndlYnAiLCJpYXQiOjE3NDUzMTMxMTAsImV4cCI6MTc3Njg0OTExMH0.aPsfu8fLwBulnCEW-odwLCvr7TKtaqtIuR2KwaBG01c',
    discount: '-17%',
    oldPrice: 120,
    newPrice: 100,
  },
];

export default function FeaturedCollection() {
  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Featured collection</h2>
        <p className="text-gray-600 mt-2">
          Follow the most popular trends and get exclusive items from Foesta shop.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative bg-gray-100 p-4 rounded-2xl group">
            {/* Discount Badge */}
            <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs rounded-full">
              {product.discount} sale
            </span>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">
              {[Eye, Share2, Heart].map((Icon, index) => (
                <button key={index} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain"
            />

            {/* Add to Cart */}
            <button
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition"
            >
              🛒 Add To Cart
            </button>

            {/* Description */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-500 line-through">Tk {product.oldPrice}.00 BDT</p>
              <p className="text-black font-semibold">Tk {product.newPrice}.00 BDT</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}