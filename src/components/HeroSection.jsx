import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 text-center">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold"
      >
        Shorten URLs with Ease!
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-lg md:text-2xl"
      >
        Fast, reliable, and free URL shortening service.
      </motion.p>

      {/* Call-to-Action Button
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-8"
      >
        <a
          href="/signup"
          className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </a>
      </motion.div> */}
    </div>
  );
}
