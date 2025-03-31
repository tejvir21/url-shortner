import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Main Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to URL Shortener
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Shorten your URLs quickly and easily.
        </p>
        <Link
          to="/login"
          className="btn bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-12 max-w-4xl text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          How to Use This Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p>Create an account or log in to get started.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <p>Enter the long URL you want to shorten.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p>Get your short URL and start sharing!</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12"
      >
        <Link
          to="/signup"
          className="btn bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
        >
          Sign Up Now
        </Link>
      </motion.div>
    </div>
  );
};

export default Intro;