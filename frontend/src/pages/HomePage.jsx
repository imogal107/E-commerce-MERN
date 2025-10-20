import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url("/coverpage-bg.jpg")`,
        
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 sm:px-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
          Discover Your Style
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          Premium Clothing for Every Occasion
        </p>

        {/* Shop Now Button */}
        <button className="bg-amber-300 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg">
        <Link to="/allproducts">
          Shop Now
        </Link>
        </button>

        {/* Stats Section */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-100">
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-300">50+</p>
            <p className="text-sm uppercase tracking-widest">Brands</p>
          </div>

          <div className="hidden sm:block h-10 w-px bg-gray-500"></div>

          <div className="text-center">
            <p className="text-3xl font-bold text-amber-300">1200+</p>
            <p className="text-sm uppercase tracking-widest">Products</p>
          </div>

          <div className="hidden sm:block h-10 w-px bg-gray-500"></div>

          <div className="text-center">
            <p className="text-3xl font-bold text-amber-300">10K+</p>
            <p className="text-sm uppercase tracking-widest">Reviews</p>
          </div>
        </div>
      </motion.div>
      
    </div>
  );
};

export default HomePage;
