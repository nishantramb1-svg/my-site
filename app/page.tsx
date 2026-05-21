"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

function Toast({ message, type }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 px-5 py-3 rounded-2xl text-white z-[9999] shadow-xl ${
        type === "success" ? "bg-emerald-500" : "bg-red-500"
      }`}
    >
      {message}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      setToast({
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setToast({
        message: "Message sent successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const prices = {
    starter: billingAnnual ? 15 : 19,
    pro: billingAnnual ? 39 : 49,
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const navLinks = [
    "features",
    "pricing",
    "about",
    "contact",
  ];

  return (
    <main className="bg-[#050508] text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-black">
            Nexa<span className="text-violet-400">.</span>
          </h1>

          <div className="hidden md:flex gap-8 text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="hover:text-white transition"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            ☰
          </button>

        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-black/90"
            >
              <div className="flex flex-col gap-4 p-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-black leading-tight max-w-5xl mb-6"
        >
          Build Beautiful
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            AI Websites
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-gray-400 text-lg max-w-2xl mb-10"
        >
          Modern landing pages built with Next.js,
          Tailwind CSS, and Framer Motion.
        </motion.p>

        <motion.a
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          href="#pricing"
          className="bg-violet-600 hover:bg-violet-500 px-8 py-4 rounded-full font-bold transition hover:scale-105"
        >
          Get Started →
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
              Everything needed to launch fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: "⚡",
                title: "Fast",
                desc: "Launch production-ready websites quickly.",
              },
              {
                icon: "🎨",
                title: "Modern UI",
                desc: "Beautiful responsive layouts and animations.",
              },
              {
                icon: "🚀",
                title: "AI Powered",
                desc: "Use AI workflows to build faster.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -8 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="text-5xl mb-6">
                  {card.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-400">
                  {card.desc}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="px-6 py-24 border-t border-white/10"
      >
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4">
              Pricing
            </h2>

            <div className="flex items-center justify-center gap-4 mt-6">
              <span>Monthly</span>

              <button
                onClick={() =>
                  setBillingAnnual(!billingAnnual)
                }
                className={`w-14 h-7 rounded-full transition ${
                  billingAnnual
                    ? "bg-violet-600"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    billingAnnual
                      ? "translate-x-7"
                      : "translate-x-1"
                  }`}
                />
              </button>

              <span>Annual</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-4">
                Starter
              </h3>

              <p className="text-6xl font-black mb-6">
                ${prices.starter}
              </p>

              <button className="w-full bg-white text-black py-3 rounded-2xl font-semibold">
                Start Free
              </button>
            </div>

            <div className="bg-violet-600/10 border border-violet-500/40 rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-4">
                Pro
              </h3>

              <p className="text-6xl font-black mb-6">
                ${prices.pro}
              </p>

              <button className="w-full bg-violet-600 py-3 rounded-2xl font-semibold">
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
            Nexa helps creators and developers build
            modern AI-powered websites faster using
            premium UI systems and scalable workflows.
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

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-600 hover:bg-violet-500 py-4 rounded-2xl font-bold transition"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Message →"}
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

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast {...toast} />}
      </AnimatePresence>

    </main>
  );
}