import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuLnBuZyIsImlhdCI6MTc0MzgyNTg3NCwiZXhwIjoxNzc1MzYxODc0fQ.HL9Jb02zSMqw3M_cCA9jWumWCpw-IhSclU7qkPv20Fw",
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuMi5qcGciLCJpYXQiOjE3NDM4MjU4OTMsImV4cCI6MTc3NTM2MTg5M30.huxIIOkCHAMBjUVdhYRtfH-g_tt4pVrrAbFGyjwjDdc",
    title: "Women western",
    rating: 4.5,
    color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuMy5qcGciLCJpYXQiOjE3NDM4MjU5MTAsImV4cCI6MTc3NTM2MTkxMH0.ROaGvnjmI7ls2hj5BJD16PjCXUF7R6WxU4_Q-_yhcCU",
    title: "Goggles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women4.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuNC5qcGciLCJpYXQiOjE3NDM4MjU5MjksImV4cCI6MTc3NTM2MTkyOX0.st470ycit86kV_urnXgdyzF7PzdJhS4x_E08fy3DnDw",
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
    aosDelay: "600",
  },
  {
    id: 5,
    img: "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/shopping.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3Nob3BwaW5nLnBuZyIsImlhdCI6MTc0MzgyNjAwMSwiZXhwIjoxNzc1MzYyMDAxfQ.4rv0wwXDDThBFu1pSfuX4cuC-Vht2zbHW8-uhum0_8c",
    title: "Fashin T-Shirt",
    rating: 4.5,
    color: "Pink",
    aosDelay: "800",
  },
];

const Products = () => {
  return (
    <div className="mt-10 mb-10 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-2xl sm:text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-500 mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>

        {/* Body section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {ProductsData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.id}
              className="space-y-2 bg-white rounded-lg shadow-md p-3 text-center"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-[160px] w-full object-cover rounded-md mx-auto"
              />
              <div>
                <h3 className="font-semibold text-base">{data.title}</h3>
                <p className="text-sm text-gray-600">{data.color}</p>
                <div className="flex justify-center items-center gap-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm">{data.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* view all button */}
        <div className="flex justify-center">
          <button className="mt-10 bg-primary text-white py-2 px-6 rounded-full text-sm hover:scale-105 transition">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;