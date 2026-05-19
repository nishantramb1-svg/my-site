"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
    <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl" />

<div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-8 py-6 border-b border-white/10"
      >
        <h1 className="text-2xl font-bold">Nexa</h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>

        <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
          Sign Up
        </button>
      </motion.nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition"
          >
            Learn More
          </motion.button>
        </motion.div>

      </section>
      {/* Features Section */}
<section className="px-6 pb-28 relative z-10">

<div className="text-center mb-16">
  <h2 className="text-5xl font-bold mb-4">
    Why Choose Nexa
  </h2>

  <p className="text-gray-400 text-lg">
    Powerful tools to build stunning modern websites faster.
  </p>
</div>

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

  {/* Card 1 */}
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-purple-500/40 transition"
  >
    <div className="text-5xl mb-6">⚡</div>

    <h3 className="text-2xl font-bold mb-4">
      Lightning Fast
    </h3>

    <p className="text-gray-400">
      Build and launch websites rapidly with AI-powered workflows and modern tooling.
    </p>
  </motion.div>

  {/* Card 2 */}
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/40 transition"
  >
    <div className="text-5xl mb-6">🎨</div>

    <h3 className="text-2xl font-bold mb-4">
      Beautiful UI
    </h3>

    <p className="text-gray-400">
      Create elegant interfaces with premium layouts, typography, and animations.
    </p>
  </motion.div>

  {/* Card 3 */}
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-pink-500/40 transition"
  >
    <div className="text-5xl mb-6">🚀</div>

    <h3 className="text-2xl font-bold mb-4">
      AI Powered
    </h3>

    <p className="text-gray-400">
      Use cutting-edge AI tools to accelerate development and creativity.
    </p>
  </motion.div>

</div>

</section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold mb-4">
              Fast Development
            </h3>

            <p className="text-gray-400">
              Build production-ready websites quickly using modern AI workflows.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold mb-4">
              Modern Design
            </h3>

            <p className="text-gray-400">
              Premium UI components, responsive layouts, and smooth animations.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold mb-4">
              AI Powered
            </h3>

            <p className="text-gray-400">
              Use AI tools to accelerate coding, design, and deployment workflows.
            </p>
          </motion.div>

        </div>
      </section>

    </main>
  );
}