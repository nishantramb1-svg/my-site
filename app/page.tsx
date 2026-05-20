"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ToastProps {
  message: string;
  type: "success" | "error";
}

// ─── Toast Component ──────────────────────────────────────────────────────────
function Toast({ message, type }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-semibold text-sm ${
        type === "success"
          ? "bg-emerald-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      <span>{type === "success" ? "✅" : "❌"}</span>
      {message}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {

  // ── State ──
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);

  // ── Scroll detection for sticky navbar ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Auto-dismiss toast ──
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Close mobile menu on nav click ──
  const handleNavClick = () => setMenuOpen(false);

  // ── Form handlers ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Formspree submit ──
  // ⬇️  Replace the action URL below with your own Formspree endpoint
  const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setToast({ message: "Please enter a valid email.", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setToast({ message: "Message sent! We'll be in touch soon.", type: "success" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Server error");
      }
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Pricing ──
  const prices = {
    starter: billingAnnual ? 15 : 19,
    pro: billingAnnual ? 39 : 49,
  };

  // ── Animation variants ──
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const navLinks = ["Features", "Pricing", "About", "Contact"];

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden relative selection:bg-purple-500/40">

      {/* ── Background Orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="text-2xl font-black tracking-tight">
            Nexa<span className="text-violet-400">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200 relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="text-sm text-gray-300 hover:text-white px-4 py-2 transition"
            >
              Sign In
            </a>
            <a
              href="#contact"
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30"
            >
              Get Started →
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          >
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={handleNavClick}
                    className="text-lg text-gray-300 hover:text-white font-medium transition"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="mt-2 w-full text-center bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-full font-semibold transition"
                >
                  Get Started →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-44 pb-24 min-h-screen">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          Now in Public Beta — Join 2,400+ Builders
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl leading-[1.05] tracking-tight mb-6"
        >
          Build Beautiful
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            Websites With AI
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Create premium, production-ready websites using Next.js, Tailwind, and
          AI-powered workflows — without writing boilerplate ever again.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40"
          >
            Start Building Free →
          </a>
          <a
            href="#features"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold text-base transition-all"
          >
            See Features
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-8 text-xs text-gray-600"
        >
          No credit card required • Free plan available • Cancel anytime
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 px-6 py-28 border-t border-white/5">

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Why Nexa
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Everything you need to ship
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Powerful tools that remove the friction between your idea and a
              live, beautiful product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Build production-ready sites in hours, not weeks. AI handles the boring parts.",
                tag: "10× faster",
              },
              {
                icon: "🎨",
                title: "Beautiful UI",
                desc: "Premium layouts, responsive design, and buttery-smooth animations baked in.",
                tag: "Design-first",
              },
              {
                icon: "🤖",
                title: "AI Powered",
                desc: "Integrated with OpenAI and Claude APIs to automate copy, code, and components.",
                tag: "GPT-4 + Claude",
              },
              {
                icon: "🔐",
                title: "Auth Ready",
                desc: "Clerk, Supabase, or Firebase auth wired in with one command.",
                tag: "Zero config",
              },
              {
                icon: "📦",
                title: "Deploy Anywhere",
                desc: "Vercel, Netlify, or bare metal — deploy in under 60 seconds.",
                tag: "One click",
              },
              {
                icon: "📊",
                title: "Analytics Built-in",
                desc: "Track visitors, conversions, and form submissions out of the box.",
                tag: "Real-time",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-white/[0.03] border border-white/8 hover:border-violet-500/40 rounded-3xl p-8 backdrop-blur-xl cursor-default transition-colors duration-300"
              >
                <div className="text-4xl mb-5">{card.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <span className="text-[10px] font-semibold bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/20">
                    {card.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative z-10 px-6 py-28 border-t border-white/5">

        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              One plan for solo builders, one for serious teams.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span
                className={`text-sm font-medium cursor-pointer transition ${
                  !billingAnnual ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setBillingAnnual(false)}
              >
                Monthly
              </span>
              <button
                onClick={() => setBillingAnnual((v) => !v)}
                className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                  billingAnnual ? "bg-violet-600" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    billingAnnual ? "translate-x-4" : ""
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium cursor-pointer transition ${
                  billingAnnual ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setBillingAnnual(true)}
              >
                Annual
                <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Starter */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-10"
            >
              <h3 className="text-2xl font-bold mb-1">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">
                Perfect for solo projects and freelancers.
              </p>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-6xl font-black">${prices.starter}</span>
                <span className="text-gray-500 mb-2">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                {["3 AI-generated sites", "Basic analytics", "Formspree contact form", "Community support", "Vercel deploy"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  )
                )}
              </ul>
              <a
                href="#contact"
                className="block w-full text-center border border-white/15 hover:border-white/30 text-gray-300 hover:text-white py-3 rounded-2xl font-semibold transition"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="relative bg-violet-600/10 border border-violet-500/40 rounded-3xl p-10 overflow-hidden"
            >
              {/* Popular badge */}
              <div className="absolute top-6 right-6 text-[11px] font-bold bg-violet-500 text-white px-3 py-1 rounded-full">
                MOST POPULAR
              </div>

              <h3 className="text-2xl font-bold mb-1">Pro</h3>
              <p className="text-gray-400 text-sm mb-6">
                For teams and serious builders shipping fast.
              </p>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-6xl font-black">${prices.pro}</span>
                <span className="text-gray-500 mb-2">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                {[
                  "Unlimited sites",
                  "Advanced analytics dashboard",
                  "Real email + DB backend",
                  "Auth (Clerk/Supabase)",
                  "Priority support",
                  "AI chatbot widget",
                  "Custom domain",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-violet-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-2xl font-bold transition hover:shadow-lg hover:shadow-violet-500/30"
              >
                Start Pro Trial →
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="relative z-10 px-6 py-28 border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              About
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Built by devs,
              <br />
              <span className="text-gray-500">for devs.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Nexa was born from frustration — too much time wasted on boilerplate,
              config, and design tweaks. We built the tool we always wanted: one
              that handles the repetitive parts so you can focus on what actually
              matters — building and shipping.
            </p>

            <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto text-center">
              {[
                { num: "2,400+", label: "Builders" },
                { num: "12k+", label: "Sites launched" },
                { num: "4.9★", label: "Avg rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-violet-400">{s.num}</p>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="relative z-10 px-6 py-28 border-t border-white/5"
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Let's build together
            </h2>
            <p className="text-gray-500">
              Send us a message and we'll reply within 24 hours.
            </p>
          </motion.div>

          {/* ── Real Formspree form ── */}
          {/*
            HOW TO ACTIVATE:
            1. Sign up at https://formspree.io
            2. Create a new form called "Nexa Contact"
            3. Copy your endpoint e.g. https://formspree.io/f/xpwldabc
            4. Paste it into the FORMSPREE_URL constant at the top of this file
          */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-2xl px-5 py-4 text-white placeholder-gray-600 transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-2xl px-5 py-4 text-white placeholder-gray-600 transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="bg-white/5 border border-white/10 focus:border-violet-500/60 outline-none rounded-2xl px-5 py-4 text-white placeholder-gray-600 transition resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30"
            >
              {isSubmitting ? "Sending..." : "Send Message →"}
            </button>
          </motion.form>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-1">
              Nexa<span className="text-violet-400">.</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Building modern AI-powered experiences.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-700 text-xs mt-10">
          © 2026 Nexa. All rights reserved.
        </p>
      </footer>

      {/* ── Toast ── */}
      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

    </main>
  );
}
