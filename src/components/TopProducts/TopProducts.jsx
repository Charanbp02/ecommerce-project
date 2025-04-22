import React from "react";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/shirts/shirt.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaGlydHMvc2hpcnQucG5nIiwiaWF0IjoxNzQzODI5MjQ5LCJleHAiOjE3NzUzNjUyNDl9.juJzX7f4H3edGoBxlK-YNEc7JDDqJJ936Qp2_sg5Ce4",
    title: "Casual Wear",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/shirts/shirt2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaGlydHMvc2hpcnQyLnBuZyIsImlhdCI6MTc0MzgyOTI2NCwiZXhwIjoxNzc1MzY1MjY0fQ.zw1Bn361Ry8QfoT2iFIK7QGEULdG8-TQ0Sq_4kMhx5g",
    title: "Printed shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/shirts/shirt3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaGlydHMvc2hpcnQzLnBuZyIsImlhdCI6MTc0MzgyOTI3OSwiZXhwIjoxNzc1MzY1Mjc5fQ.VI_PnP6x9rPD1MrlFNEvmsFOjsL7IVUa8Rkd58IL4nc",
    title: "Women shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-left mb-10 sm:mb-14">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-2xl sm:text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-500 max-w-md">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi.
          </p>
        </div>

        {/* Products List */}
        <div className="flex flex-col gap-10">
          {ProductsData.map((data, index) => (
            <div
              key={data.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex flex-col sm:flex-row items-center gap-5 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:bg-black/80 dark:hover:bg-primary hover:text-white transition-all group"
            >
              {/* Left - Image */}
              <div className="w-full sm:w-1/3 flex justify-center">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-[120px] sm:w-[150px] h-auto rounded-md group-hover:scale-105 transition duration-300 drop-shadow-md"
                />
              </div>

              {/* Right - Info */}
              <div className="w-full sm:w-2/3 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start items-center gap-1 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-sm" />
                  ))}
                </div>
                <h2 className="text-lg font-semibold">{data.title}</h2>
                <p className="text-gray-600 group-hover:text-white text-sm mt-1 line-clamp-2">
                  {data.description}
                </p>
                <button
                  onClick={handleOrderPopup}
                  className="mt-4 bg-primary text-white py-1 px-5 rounded-full text-sm group-hover:bg-white group-hover:text-primary transition duration-300"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;