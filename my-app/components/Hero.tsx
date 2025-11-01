"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

export default function Hero() {
  const cards = [
    {
      title: "Purpose-built for product development",
      image:
        "https://cdn.jsdelivr.net/gh/othneildrew/linear-demo@main/assets/card1.png",
    },
    {
      title: "Designed to move fast",
      image:
        "https://cdn.jsdelivr.net/gh/othneildrew/linear-demo@main/assets/card2.png",
    },
    {
      title: "Crafted to perfection",
      image:
        "https://cdn.jsdelivr.net/gh/othneildrew/linear-demo@main/assets/card3.png",
    },
  ];

  return (
    <section className="relative w-full bg-black text-white py-28 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Headline + Description --- */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-end gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Made for modern creators
            </motion.h2>
          </div>
        </div>

        {/* --- Cards --- */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative rounded-3xl bg-gradient-to-b from-neutral-900 to-black p-8 border border-neutral-800 hover:border-neutral-700 shadow-inner"
            >
              {/* Fake image background (replace later) */}
              <div className="h-48 w-full mb-6 rounded-2xl bg-gradient-to-tr from-gray-900 via-neutral-800 to-black flex items-center justify-center overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="opacity-80 group-hover:opacity-100 transition duration-500 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold leading-snug">
                {card.title}
              </h3>
              <div className="absolute bottom-6 right-6 bg-neutral-900 border border-neutral-800 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition">
                <Plus size={18} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
