"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

import {
  Zap,
  Palette,
  Cpu,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Fast Performance",
      desc: "Optimized modern websites with blazing fast speed.",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      desc: "Premium UI with smooth animations and clean layouts.",
    },
    {
      icon: Cpu,
      title: "AI Powered",
      desc: "Build smarter using AI workflows and automation.",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-black">
            Nexa<span className="text-purple-400">.</span>
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">

            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>

            <a href="#about" className="hover:text-white transition">
              About
            </a>

            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>

          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">

            {isSignedIn ? (
              <>
                <a
                  href="/dashboard"
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
                >
                  Dashboard
                </a>

                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:text-white transition">
                    Login
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-semibold transition">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 flex flex-col gap-4">

            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>

          </div>
        )}

      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-black max-w-5xl leading-tight mb-6"
        >
          Build Modern
          <br />
          <span className="text-purple-400">
            AI Websites
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mb-10"
        >
          Create premium AI-powered websites using Next.js,
          Tailwind CSS, and Framer Motion.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          href="#pricing"
          className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition"
        >
          Start Building
          <ArrowRight size={18} />
        </motion.a>

      </section>

      {/* Features */}
      <section
        id="features"
        className="px-6 py-24 border-t border-white/10"
      >

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black mb-4">
              Features
            </h2>

            <p className="text-gray-500">
              Everything you need to build fast.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8"
                >

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                    <Icon className="text-purple-400" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>

      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="px-6 py-24 border-t border-white/10"
      >

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-4">
            Pricing
          </h2>

          <p className="text-gray-500 mb-16">
            Simple pricing for creators and startups.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Starter */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

              <h3 className="text-3xl font-bold mb-4">
                Starter
              </h3>

              <p className="text-6xl font-black mb-6">
                $19
              </p>

              <button className="w-full bg-white text-black py-4 rounded-2xl font-bold">
                Start Free
              </button>

            </div>

            {/* Pro */}
            <div className="bg-purple-600/10 border border-purple-500/30 rounded-3xl p-10">

              <h3 className="text-3xl font-bold mb-4">
                Pro
              </h3>

              <p className="text-6xl font-black mb-6">
                $49
              </p>

              <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold">
                Go Pro
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* About */}
      <section
        id="about"
        className="px-6 py-24 border-t border-white/10 text-center"
      >

        <div className="max-w-3xl mx-auto">

          <h2 className="text-5xl font-black mb-6">
            About Nexa
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Nexa helps developers and creators build
            modern AI-powered products faster using
            scalable workflows and premium UI systems.
          </p>

        </div>

      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 py-24 border-t border-white/10"
      >

        <div className="max-w-xl mx-auto">

          <div className="text-center mb-10">

            <h2 className="text-5xl font-black mb-4">
              Contact Us
            </h2>

            <p className="text-gray-500">
              Let’s build something amazing together.
            </p>

          </div>

          <form className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-bold transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-gray-600">

        <p>
          © 2026 Nexa. All rights reserved.
        </p>

      </footer>

    </main>
  );
}