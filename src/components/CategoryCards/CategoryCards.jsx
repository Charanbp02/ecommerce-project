import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional icons

const categories = [
  {
    title: "Kid's Fashion",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/pexels-photo-1620826.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvcGV4ZWxzLXBob3RvLTE2MjA4MjYud2VicCIsImlhdCI6MTc0NTMwOTEwMSwiZXhwIjoxNzc2ODQ1MTAxfQ.4l44LzLq-vZAcUjgGKkP-V0gNwISeeMjd01RUEjRlP4",
  },
  {
    title: "Men's Fashion",
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/Men%20shirts.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvTWVuIHNoaXJ0cy53ZWJwIiwiaWF0IjoxNzQ1MzA5Mzg1LCJleHAiOjE3NzY4NDUzODV9.PV_wl-Tf7A_JamvGbtBxbNEJH7pIjeOnACLUCczwZtY",
  },
  {
    title: "New Arrivals",
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/ks8dv_1200.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMva3M4ZHZfMTIwMC5qcGciLCJpYXQiOjE3NDUzMDk1MTUsImV4cCI6MTc3Njg0NTUxNX0.Az3QqHKN6Fddoi6K39DKo0Q-nQgG6Ir-1DgbYnwC3MM",
  },
  {
    title: "Top Sale's",
    image: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/images.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvaW1hZ2VzLmpwZWciLCJpYXQiOjE3NDUzMDk2NjEsImV4cCI6MTc3Njg0NTY2MX0.BL5heLSwhkTSHK9a1bxfdjLttMTuKGb9L33NU7ustxw",
  },
];

export default function CategoryCards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 py-12 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 relative inline-block after:content-[''] after:block after:w-24 after:h-1 after:bg-black after:mx-auto after:mt-2">
        Categories
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:block"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:block"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Category Cards - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-1"
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative min-w-[250px] md:min-w-[300px] h-96 rounded-2xl overflow-hidden group shadow-md flex-shrink-0"
              style={{
                backgroundImage: `url(${cat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300 flex flex-col justify-center items-center text-white text-center px-4">
                <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
                <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
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
