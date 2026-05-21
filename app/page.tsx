"use client";
 
import { useState, useEffect } from "react";
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
  Check,
} from "lucide-react";
 
export default function Home() {
  const { isSignedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const features = [
    {
      icon: Zap,
      title: "Lightning Performance",
      desc: "Millisecond-fast load times with edge computing and intelligent caching.",
      accent: "from-amber-400 to-orange-500",
    },
    {
      icon: Palette,
      title: "Exquisite Design",
      desc: "Hand-crafted interfaces with meticulous attention to every detail.",
      accent: "from-rose-400 to-pink-500",
    },
    {
      icon: Cpu,
      title: "Intelligent Automation",
      desc: "AI-powered workflows that learn and adapt to your needs.",
      accent: "from-cyan-400 to-blue-500",
    },
  ];
 
  const pricingFeatures = [
    "Up to 5 Projects",
    "Community Support",
    "Basic Analytics",
    "Standard Performance",
  ];
 
  const proFeatures = [
    "Unlimited Projects",
    "Priority Support",
    "Advanced Analytics",
    "99.99% Uptime",
    "Custom Domains",
    "API Access",
  ];
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
 
  return (
    <main className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Cormorant+Garamond:wght@300;400;600;700&display=swap');
        
        :root {
          --accent-primary: #7c3aed;
          --accent-secondary: #06b6d4;
          --accent-tertiary: #f97316;
        }
 
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }
 
        .hero-text {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -2px;
        }
 
        .glow-border {
          position: relative;
          border: 1px solid transparent;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
 
        .gradient-text {
          background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #f43f5e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
 
        .geometric-pattern {
          background-image: 
            linear-gradient(45deg, rgba(124, 58, 237, 0.05) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(124, 58, 237, 0.05) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(124, 58, 237, 0.05) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(124, 58, 237, 0.05) 75%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
        }
 
        .mesh-gradient {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(249, 115, 22, 0.15) 100%);
          filter: blur(80px);
        }
 
        .card-shine {
          position: relative;
          overflow: hidden;
        }
 
        .card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
 
        .card-shine:hover::before {
          left: 100%;
        }
 
        .underline-animated {
          position: relative;
          display: inline-block;
        }
 
        .underline-animated::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
          transition: width 0.3s ease;
        }
 
        .underline-animated:hover::after {
          width: 100%;
        }
 
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
 
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
 
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
 
        .shimmer-load {
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
 
      {/* Premium Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] mesh-gradient rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] mesh-gradient rounded-full" style={{animationDelay: "2s"}} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>
 
      {/* Geometric Overlay */}
      <div className="fixed inset-0 -z-10 geometric-pattern opacity-20" />
 
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            <span className="font-light">nexa</span>
            <span className="gradient-text font-bold">.</span>
          </motion.h1>
 
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm">
            {["Features", "Pricing", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="underline-animated text-gray-400 hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </div>
 
          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <a
                  href="/dashboard"
                  className="text-sm px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  Dashboard
                </a>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm text-gray-400 hover:text-white transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-600/50 font-semibold transition">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
 
          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
 
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-slate-900 px-6 py-6 flex flex-col gap-6"
          >
            {["Features", "Pricing", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
 
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-sm font-medium">
              ✨ Premium AI Platform
            </span>
          </motion.div>
 
          <motion.h1
            variants={itemVariants}
            className="hero-text text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-8"
          >
            Build
            <br />
            <span className="gradient-text font-bold">Extraordinary</span>
          </motion.h1>
 
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Craft intelligent, beautifully designed experiences with our next-generation platform built on modern technologies.
          </motion.p>
 
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-600/50 transition"
            >
              Start Building
              <ArrowRight size={20} />
            </motion.button>
 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition font-semibold"
            >
              View Demo
            </motion.button>
          </motion.div>
 
          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center gap-12 text-center"
          >
            {[
              { value: "10K+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "2ms", label: "Latency" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
 
      {/* Features Section */}
      <section
        id="features"
        className="relative px-6 py-24 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="hero-text text-5xl md:text-6xl font-light mb-6">
              Everything You Need
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools designed for creators and developers
            </p>
          </motion.div>
 
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="card-shine group relative glow-border rounded-2xl p-8 backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.accent} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`text-2xl bg-gradient-to-br ${feature.accent} bg-clip-text text-transparent`} size={32} />
                    </div>
 
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition">
                      {feature.title}
                    </h3>
 
                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
 
      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative px-6 py-24 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="hero-text text-5xl md:text-6xl font-light mb-6">
              Simple Pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Start free, upgrade when you need more
            </p>
          </motion.div>
 
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Starter */}
            <motion.div
              variants={itemVariants}
              className="card-shine glow-border rounded-2xl p-10 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-semibold mb-3">Starter</h3>
              <p className="text-gray-500 text-sm mb-8">Perfect to get started</p>
 
              <div className="mb-8">
                <span className="text-5xl font-bold">$19</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
 
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg border border-white/20 font-semibold hover:bg-white/10 transition mb-8"
              >
                Get Started Free
              </motion.button>
 
              <div className="space-y-4">
                {pricingFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-cyan-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
 
            {/* Pro */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card-shine glow-border rounded-2xl p-10 backdrop-blur-sm border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-3xl font-semibold">Pro</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-xs font-bold">
                  POPULAR
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-8">For professionals</p>
 
              <div className="mb-8">
                <span className="text-5xl font-bold">$49</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
 
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition mb-8"
              >
                Upgrade to Pro
              </motion.button>
 
              <div className="space-y-4">
                {proFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-purple-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* About Section */}
      <section
        id="about"
        className="relative px-6 py-24 border-t border-white/5"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hero-text text-5xl md:text-6xl font-light mb-8"
          >
            About Nexa
          </motion.h2>
 
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Nexa empowers creators and developers to build next-generation AI-powered products with unprecedented speed and elegance. Our platform combines cutting-edge technology with thoughtful design, enabling you to focus on what matters most—creating exceptional experiences.
          </motion.p>
        </div>
      </section>
 
      {/* Contact Section */}
      <section
        id="contact"
        className="relative px-6 py-24 border-t border-white/5"
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="hero-text text-5xl md:text-6xl font-light mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-400">
              Let's collaborate and build something remarkable
            </p>
          </motion.div>
 
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition text-white placeholder-gray-600"
            />
 
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition text-white placeholder-gray-600"
            />
 
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition text-white placeholder-gray-600 resize-none"
            />
 
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© 2026 Nexa. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition underline-animated">Privacy</a>
            <a href="#" className="hover:text-white transition underline-animated">Terms</a>
            <a href="#" className="hover:text-white transition underline-animated">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}