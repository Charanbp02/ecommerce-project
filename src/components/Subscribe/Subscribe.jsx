import React from "react";

const BannerImg = {
  backgroundImage: `url("https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/website/orange-pattern.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlL29yYW5nZS1wYXR0ZXJuLmpwZyIsImlhdCI6MTc0MzgzMDYwOSwiZXhwIjoxNzc1MzY2NjA5fQ.w9dWgLqIFDfzMdxYtkCVXfTyjQOfZ7uZ0RXrWZGmmTI")`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      {/* Overlay & Blur */}
      <div className="w-full h-full bg-black/40 backdrop-blur-sm py-10 px-4 sm:px-0">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto sm:mx-0 sm:max-w-none sm:w-2/3 lg:w-1/2 space-y-6">
            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl font-semibold text-center sm:text-left">
              Get Notified About New Products
            </h1>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-md text-black sm:text-base text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
