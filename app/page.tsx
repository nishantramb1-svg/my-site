"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Zap,
  Palette,
  Cpu,
  Check,
  ArrowRight,
  X,
  Menu,
  LayoutDashboard,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToastState {
  message: string;
  type: "success" | "error";
}

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface Plan {
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  cta: string;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["features", "pricing", "about", "contact"] as const;

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Blazing fast",
    desc: "Edge-deployed by default. Sub-50ms TTFB, optimized asset pipelines, and zero layout shift on load.",
  },
  {
    icon: Palette,
    title: "Pixel-perfect UI",
    desc: "Every token, spacing unit, and animation is designed with intention. Looks great out of the box.",
  },
  {
    icon: Cpu,
    title: "AI native",
    desc: "Streaming LLM responses, image generation, and intelligent workflows integrated in minutes.",
  },
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    desc: "Great for solo projects and side experiments.",
    monthlyPrice: 19,
    annualPrice: 15,
    cta: "Start for free",
    features: [
      "5 active projects",
      "10 000 pageviews / mo",
      "Basic analytics",
      "Community support",
      "1 custom domain",
    ],
  },
  {
    name: "Pro",
    desc: "For teams shipping production products.",
    monthlyPrice: 49,
    annualPrice: 39,
    cta: "Go Pro",
    featured: true,
    features: [
      "Unlimited projects",
      "500 000 pageviews / mo",
      "Advanced analytics",
      "Priority support",
      "Unlimited custom domains",
      "Team collaboration",
      "AI workflow integrations",
    ],
  },
];

const STATS = [
  { value: "12K+", label: "Developers" },
  { value: "98%", label: "Uptime SLA" },
  { value: "4.9★", label: "Avg rating" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toast({ message, type }: ToastState) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={[
        "fixed bottom-6 right-6 z-[9999] flex items-center gap-3",
        "px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl",
        type === "success"
          ? "bg-emerald-950 border border-emerald-700/60 text-emerald-300"
          : "bg-red-950 border border-red-700/60 text-red-300",
      ].join(" ")}
    >
      {type === "success" ? <Check size={15} /> : <X size={15} />}
      {message}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-amber-400 mb-4">
      {children}
    </p>
  );
}

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((p) => ({ ...p, [e.target.name]: e.target.value })),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({ message: "Please fill all fields.", type: "error" });
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setToast({ message: "Message sent! We'll be in touch.", type: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setToast({ message: "Something went wrong. Try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#060912] text-[#EDE9E3] overflow-x-hidden font-[family-name:var(--font-outfit)]">

      {/* Ambient blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-240px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-amber-500/[0.05]" />
        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] rounded-full bg-teal-500/[0.05]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060912]/80 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a
            href="/"
            className="font-[family-name:var(--font-syne)] text-xl font-black tracking-tight"
          >
            Nexa<span className="text-amber-400">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-sm text-[#7A8099] hover:text-[#EDE9E3] transition-colors duration-200 capitalize"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop auth controls */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm text-[#7A8099] hover:text-[#EDE9E3] transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-amber-400 hover:bg-amber-300 text-[#1A1200] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200 font-[family-name:var(--font-syne)]">
                  Get started
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-[#7A8099] hover:text-[#EDE9E3] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </a>
              {/* Clerk's pre-built avatar + dropdown menu */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#7A8099] hover:text-white"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.07] bg-[#060912]"
            >
              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#7A8099] hover:text-white capitalize px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link}
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-white/[0.07] flex flex-col gap-2">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full text-center py-3 rounded-xl border border-white/[0.08] text-[#7A8099] hover:text-white transition-colors text-sm">
                        Log in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full bg-amber-400 text-[#1A1200] font-bold text-center py-3 rounded-xl font-[family-name:var(--font-syne)]">
                        Get started
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <a
                      href="/dashboard"
                      className="w-full bg-amber-400 text-[#1A1200] font-bold text-center py-3 rounded-xl font-[family-name:var(--font-syne)]"
                    >
                      Go to Dashboard
                    </a>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-10"
        >
          ✦ Now in public beta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-syne)] font-black text-[clamp(52px,9vw,104px)] leading-[0.93] tracking-[-0.04em] max-w-4xl mb-7"
        >
          Build
          <br />
          <span className="text-amber-400">Remarkable</span>
          <br />
          Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#7A8099] text-lg leading-relaxed max-w-lg mb-12 font-light"
        >
          The modern platform for shipping AI-powered websites.
          Beautiful by default, infinitely extensible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          {/* CTA changes based on auth state */}
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#1A1200] font-[family-name:var(--font-syne)] font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                Start building <ArrowRight size={16} />
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#1A1200] font-[family-name:var(--font-syne)] font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Go to Dashboard <ArrowRight size={16} />
            </a>
          </SignedIn>
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-[#7A8099] hover:text-[#EDE9E3] border border-white/[0.08] hover:border-white/[0.15] px-7 py-4 rounded-xl transition-all duration-200 text-[15px]"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-10 mt-20"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              {i > 0 && <div className="w-px h-8 bg-white/[0.08]" />}
              <div className="text-center">
                <div className="font-[family-name:var(--font-syne)] font-black text-3xl text-[#EDE9E3] leading-none">
                  {s.value}
                </div>
                <div className="text-[#7A8099] text-xs mt-1.5">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="px-6 py-28 bg-[#0D1120] border-y border-white/[0.07]"
      >
        <div className="max-w-6xl mx-auto">
          <RevealSection className="mb-16">
            <SectionLabel>Features</SectionLabel>
            <h2 className="font-[family-name:var(--font-syne)] font-black text-[clamp(36px,4vw,58px)] leading-[1] tracking-[-0.035em] mb-5">
              Everything you need
              <br />
              to ship faster
            </h2>
            <p className="text-[#7A8099] text-lg font-light max-w-md leading-relaxed">
              Stop wrestling with boilerplate. Focus on what makes your product unique.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <RevealSection key={title} delay={i * 80}>
                <div className="bg-[#0D1120] hover:bg-[#131929] transition-colors duration-200 p-10 h-full group">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center text-amber-400 mb-7 group-hover:bg-amber-400/15 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-[#EDE9E3] mb-3">
                    {title}
                  </h3>
                  <p className="text-[#7A8099] text-[15px] leading-relaxed font-light">
                    {desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-12">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-[family-name:var(--font-syne)] font-black text-[clamp(36px,4vw,58px)] leading-[1] tracking-[-0.035em] mb-8">
              Invest in your stack
            </h2>

            <div className="flex items-center gap-4 text-sm text-[#7A8099]">
              <span className={!billingAnnual ? "text-[#EDE9E3]" : ""}>Monthly</span>
              <button
                role="switch"
                aria-checked={billingAnnual}
                onClick={() => setBillingAnnual((v) => !v)}
                className={[
                  "relative w-11 h-6 rounded-full border transition-all duration-200",
                  billingAnnual
                    ? "bg-amber-400 border-amber-400"
                    : "bg-[#131929] border-white/[0.12]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200",
                    billingAnnual ? "translate-x-5" : "translate-x-0.5",
                  ].join(" ")}
                />
              </button>
              <span className={billingAnnual ? "text-[#EDE9E3]" : ""}>Annual</span>
              {billingAnnual && (
                <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan, i) => (
              <RevealSection key={plan.name} delay={i * 100}>
                <div
                  className={[
                    "relative rounded-2xl p-10 h-full flex flex-col",
                    plan.featured
                      ? "bg-[#0D1120] border border-amber-400/40"
                      : "bg-[#0D1120] border border-white/[0.07]",
                  ].join(" ")}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#1A1200] text-xs font-bold tracking-wide uppercase px-4 py-1.5 rounded-full">
                      Most popular
                    </span>
                  )}

                  <div className="mb-8">
                    <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-[#EDE9E3] mb-1.5">
                      {plan.name}
                    </h3>
                    <p className="text-[#7A8099] text-sm">{plan.desc}</p>
                  </div>

                  <div className="mb-2">
                    <span className="font-[family-name:var(--font-syne)] font-black text-6xl text-[#EDE9E3] tracking-[-0.04em]">
                      ${billingAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                  </div>
                  <p className="text-[#7A8099] text-xs mb-8">
                    per month{billingAnnual ? ", billed annually" : ""}
                  </p>

                  <ul className="flex flex-col gap-3.5 mb-10 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-[#7A8099]"
                      >
                        <Check size={14} className="text-teal-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button
                        className={[
                          "w-full py-3.5 rounded-xl font-[family-name:var(--font-syne)] font-bold text-sm transition-all duration-200",
                          plan.featured
                            ? "bg-amber-400 hover:bg-amber-300 text-[#1A1200]"
                            : "bg-transparent border border-white/[0.12] hover:border-white/25 text-[#EDE9E3]",
                        ].join(" ")}
                      >
                        {plan.cta}
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <a
                      href="/dashboard"
                      className={[
                        "w-full py-3.5 rounded-xl font-[family-name:var(--font-syne)] font-bold text-sm transition-all duration-200 text-center",
                        plan.featured
                          ? "bg-amber-400 hover:bg-amber-300 text-[#1A1200]"
                          : "bg-transparent border border-white/[0.12] hover:border-white/25 text-[#EDE9E3]",
                      ].join(" ")}
                    >
                      Go to Dashboard
                    </a>
                  </SignedIn>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="px-6 py-28 bg-[#0D1120] border-y border-white/[0.07] text-center"
      >
        <RevealSection className="max-w-2xl mx-auto">
          <SectionLabel>About</SectionLabel>
          <h2 className="font-[family-name:var(--font-syne)] font-black text-[clamp(36px,4vw,58px)] leading-[1] tracking-[-0.035em] mb-7">
            Built by builders,
            <br />
            for builders
          </h2>
          <p className="text-[#7A8099] text-lg leading-relaxed font-light">
            Nexa was born from frustration with clunky tooling and generic templates.
            We build premium UI systems and scalable AI workflows so you can focus on
            shipping — not setup.
          </p>
        </RevealSection>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <RevealSection>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-[family-name:var(--font-syne)] font-black text-[clamp(36px,4vw,58px)] leading-[1] tracking-[-0.035em] mb-5">
              Let's build
              <br />
              something great
            </h2>
            <p className="text-[#7A8099] text-lg font-light leading-relaxed">
              Have a question, want to partner, or just want to say hi? We read every message.
            </p>
          </RevealSection>

          <RevealSection delay={80}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {(
                [
                  { name: "name", type: "text", placeholder: "Your name" },
                  { name: "email", type: "email", placeholder: "Email address" },
                ] as const
              ).map(({ name, type, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-[#0D1120] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-5 py-4 text-[15px] text-[#EDE9E3] placeholder:text-[#7A8099] outline-none transition-colors duration-200"
                />
              ))}
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project…"
                className="bg-[#0D1120] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-5 py-4 text-[15px] text-[#EDE9E3] placeholder:text-[#7A8099] outline-none transition-colors duration-200 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-[#1A1200] font-[family-name:var(--font-syne)] font-bold text-[15px] py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                {isSubmitting ? "Sending…" : <><span>Send message</span><ArrowRight size={16} /></>}
              </button>
            </form>
          </RevealSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.07] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-syne)] font-black text-lg tracking-tight">
            Nexa<span className="text-amber-400">.</span>
          </span>
          <p className="text-[#7A8099] text-sm">© 2026 Nexa. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Twitter"].map((l) => (
              <a key={l} href="#" className="text-[#7A8099] hover:text-[#EDE9E3] text-sm transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toast && <Toast {...toast} />}
      </AnimatePresence>
    </main>
  );
}
