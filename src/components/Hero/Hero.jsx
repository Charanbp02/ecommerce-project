import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Women Summer Trend Style",
    subtitle: "Introducing the Ambuz women’s autumn / summer Fashion",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/women.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3dvbWVuLnBuZyIsImlhdCI6MTc0Mzc2NTI1MSwiZXhwIjoxNzc1MzAxMjUxfQ.frrCVfGi2TRwAiWPW70Far-Bfgy6dKAegR3uzsgx0rk",
  },
  {
    title: "Fresh Looks for Every Season",
    subtitle: "Discover styles that match your vibe and your wardrobe.",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/shopping.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3Nob3BwaW5nLnBuZyIsImlhdCI6MTc0Mzc2NTk0NSwiZXhwIjoxNzc1MzAxOTQ1fQ._EnPMFECfBjd65hux_MIjwoSrQOcr2ejXwBONU0vUxk",
  },
  {
    title: "Elegant & Cool",
    subtitle: "Chic styles, perfect for sunny days and warm nights.",
    image:
      "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/sale.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL3NhbGUucG5nIiwiaWF0IjoxNzQzNzY1ODMzLCJleHAiOjE3NzUzMDE4MzN9.y_wwG-Iw6cVutq7kOEeYJ7eEOkgQBvN-6IqWq7fuqa4",
  },
];

// Animation variants for images
const imageVariants = {
  initial: { opacity: 0, scale: 2.0 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } },
};

// Animation variants for descriptions
const textVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.9, ease: "easeIn" } },
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] bg-white overflow-hidden flex items-center justify-center">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center px-4 sm:px-6 md:px-10"
          >
            <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 items-center gap-6 text-center md:text-left">
              {/* Image with Animation */}
              <div className="flex justify-center">
                <AnimatePresence mode="wait">
                  {index === current && (
                    <motion.img
                      key={slide.image}
                      src={slide.image}
                      alt={slide.title}
                      className="w-[90%] max-h-[200px] sm:max-h-[250px] md:max-h-[350px] object-contain"
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Description with Animation */}
              <motion.div
                variants={textVariants}
                initial="initial"
                animate={index === current ? "animate" : "initial"}
                exit="exit"
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {slide.title.split(" ").slice(0, 2).join(" ")} <br />
                  <span className="block">{slide.title.split(" ").slice(2).join(" ")}</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-3">{slide.subtitle}</p>
                <button className="mt-5 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-gray-800 transition">
                  Shop Collection →
                </button>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 sm:p-3 rounded-full hover:bg-gray-800 transition"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 sm:p-3 rounded-full hover:bg-gray-800 transition"
      >
        &gt;
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 flex gap-2 justify-center w-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-black scale-110" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;