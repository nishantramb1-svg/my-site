"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent! We'll be in touch soon.");
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[999] bg-white text-black px-5 py-3 rounded-2xl font-semibold text-sm shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 flex flex-col border-b border-white/10 bg-black/70 backdrop-blur-xl z-50"
      >
        <div className="flex items-center justify-between px-8 py-5">
          <h1 className="text-2xl font-bold">Nexa</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-gray-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-block bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Sign Up
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden flex flex-col border-t border-white/10 overflow-hidden"
            >
              {["features", "pricing", "about", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-4 text-gray-300 hover:text-white border-b border-white/10 capitalize transition"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 relative z-10 min-h-[85vh]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6"
        >
          Build Beautiful<br />Websites With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-xl max-w-2xl mb-10"
        >
          Create premium modern websites using Next.js, Tailwind, and AI-powered workflows.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          href="#pricing"
          className="bg-white text-black px-9 py-4 rounded-full font-semibold text-lg"
        >
          Get Started
        </motion.a>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 relative z-10 border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Why Choose Nexa</h2>
          <p className="text-gray-400">Powerful tools to build stunning websites faster.</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Lightning Fast", desc: "Build websites rapidly with AI-powered workflows." },
            { icon: "🎨", title: "Beautiful UI", desc: "Premium layouts, typography, and smooth animations." },
            { icon: "🚀", title: "AI Powered", desc: "Accelerate development using modern AI tools." },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >
              <div className="text-5xl mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 border-t border-white/10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Pricing</h2>
          <p className="text-gray-400">Simple pricing for creators.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Starter */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col">
            <h3 className="text-3xl font-bold mb-2">Starter</h3>
            <p className="text-gray-400 mb-6 text-sm">Perfect for individuals</p>
            <p className="text-5xl font-bold mb-2">$19</p>
            <p className="text-gray-500 text-sm mb-8">per month</p>
            <ul className="text-gray-400 text-sm space-y-3 mb-10 flex-1">
              {["5 websites", "AI-assisted builder", "Basic analytics", "Email support"].map((f) => (
                <li key={f} className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <span className="text-white">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => showToast("Starter plan selected! Redirecting to checkout…")}
              className="w-full bg-white text-black py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Start Now
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white/10 border border-purple-500/40 rounded-3xl p-10 flex flex-col relative overflow-hidden">
            <span className="absolute top-5 right-5 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </span>
            <h3 className="text-3xl font-bold mb-2">Pro</h3>
            <p className="text-gray-400 mb-6 text-sm">For teams & professionals</p>
            <p className="text-5xl font-bold mb-2">$49</p>
            <p className="text-gray-500 text-sm mb-8">per month</p>
            <ul className="text-gray-400 text-sm space-y-3 mb-10 flex-1">
              {["Unlimited websites", "Full AI suite", "Advanced analytics", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <span className="text-purple-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => showToast("Pro plan selected! Redirecting to checkout…")}
              className="w-full bg-purple-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Go Pro
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-32 border-t border-white/10 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">About Nexa</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Nexa helps developers and creators build modern AI-powered websites faster
          with beautiful UI systems, premium animations, and scalable frontend architecture.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-32 border-t border-white/10 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-400 mb-10">Let's build something amazing together.</p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-12"
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-gray-400">We'll get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-gray-500 hover:text-white transition underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 outline-none focus:border-white/30 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 outline-none focus:border-white/30 transition"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 outline-none focus:border-white/30 transition resize-none"
            />
            <button
              type="submit"
              className="bg-white text-black py-4 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Nexa</h3>
            <p className="text-gray-500">Building modern AI-powered experiences.</p>
          </div>
          <div className="flex gap-6 text-gray-400">
            {["features", "pricing", "about", "contact"].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-white transition capitalize">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-600 mt-10 text-sm">
          © 2026 Nexa. All rights reserved.
        </div>
      </footer>

    </main>
  );
}