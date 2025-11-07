"use client";

import { motion } from "framer-motion";
import AuthModal from "../auth/register/page";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-200 via-white to-gray-400 text-transparent bg-clip-text"
        >
          The system for modern product development
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-lg text-gray-400"
        >
          Streamline your workflow across the entire development cycle — from roadmap to release.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button onClick={() => router.push("/auth/")} className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-600 rounded-md text-gray-300 hover:text-white hover:border-gray-400 transition">
            Contact Sales
          </button>
        </motion.div>
      </section>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 text-gray-500 animate-pulse"
      >
        ↓ Scroll to explore
      </motion.div>
    </main>
  );
}
