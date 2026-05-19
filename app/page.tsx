"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-8 py-6 border-b border-white/10 relative z-10"
      >
        <h1 className="text-2xl font-bold">
          Nexa
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>

        <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
          Sign Up
        </button>
      </motion.nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold max-w-5xl leading-tight mb-6"
        >
          Build Beautiful Websites With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-xl max-w-2xl mb-8"
        >
          Create premium modern websites using Next.js, Tailwind, and AI-powered workflows.
        </motion.p>

      </section>

      {/* Features */}
      <section
        id="features"
        className="px-6 py-32 relative z-10 border-t border-white/10"
      >

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Why Choose Nexa
          </h2>

          <p className="text-gray-400">
            Powerful tools to build stunning websites faster.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="text-5xl mb-6">⚡</div>

            <h3 className="text-2xl font-bold mb-4">
              Lightning Fast
            </h3>

            <p className="text-gray-400">
              Build websites rapidly with AI-powered workflows.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="text-5xl mb-6">🎨</div>

            <h3 className="text-2xl font-bold mb-4">
              Beautiful UI
            </h3>

            <p className="text-gray-400">
              Premium layouts, typography, and smooth animations.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="text-5xl mb-6">🚀</div>

            <h3 className="text-2xl font-bold mb-4">
              AI Powered
            </h3>

            <p className="text-gray-400">
              Accelerate development using modern AI tools.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="px-6 py-32 border-t border-white/10 relative z-10"
      >

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Pricing
          </h2>

          <p className="text-gray-400">
            Simple pricing for creators.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-3xl font-bold mb-4">
              Starter
            </h3>

            <p className="text-5xl font-bold mb-6">
              $19
            </p>
          </div>

          <div className="bg-white/10 border border-purple-500/40 rounded-3xl p-10">
            <h3 className="text-3xl font-bold mb-4">
              Pro
            </h3>

            <p className="text-5xl font-bold mb-6">
              $49
            </p>
          </div>

        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="px-6 py-32 border-t border-white/10 text-center relative z-10"
      >
        <h2 className="text-5xl font-bold mb-6">
          About Nexa
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Nexa helps developers build modern AI-powered websites faster.
        </p>
      </section>

    </main>
  );
}