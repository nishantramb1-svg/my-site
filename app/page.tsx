'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GitMerge,
  Minimize2,
  Image,
  Scissors,
  FileType,
  RotateCw,
  Stamp,
  Unlock,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  FileText,
} from 'lucide-react';
import Navbar from './components/Navbar';

const tools = [
  {
    icon: GitMerge,
    label: 'Merge PDF',
    desc: 'Combine multiple PDFs into one file in seconds.',
    href: '/merge-pdf',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
    active: true,
  },
  {
    icon: Minimize2,
    label: 'Compress PDF',
    desc: 'Reduce file size while maintaining quality.',
    href: '/compress-pdf',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.25)',
    active: true,
  },
  {
    icon: Image,
    label: 'Image to PDF',
    desc: 'Convert JPG, PNG, WEBP images to PDF.',
    href: '/image-to-pdf',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    active: true,
  },
  {
    icon: Scissors,
    label: 'Split PDF',
    desc: 'Extract pages or split a PDF into multiple files.',
    href: '#',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    active: false,
  },
  {
    icon: FileType,
    label: 'PDF to Word',
    desc: 'Turn your PDF into an editable Word document.',
    href: '#',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.25)',
    active: false,
  },
  {
    icon: RotateCw,
    label: 'Rotate PDF',
    desc: 'Rotate one or all pages in your PDF.',
    href: '#',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    active: false,
  },
  {
    icon: Stamp,
    label: 'Watermark PDF',
    desc: 'Add a text or image watermark to your PDF.',
    href: '#',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.25)',
    active: false,
  },
  {
    icon: Unlock,
    label: 'Unlock PDF',
    desc: 'Remove password protection from a PDF.',
    href: '#',
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.25)',
    active: false,
  },
];

const features = [
  {
    icon: Shield,
    title: '100% Secure',
    desc: 'Your files are processed in your browser — never uploaded to any server.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Powered by modern browser APIs for instant processing.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    desc: 'Desktop, tablet, or mobile — any device, any browser.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="text-center px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Free · No sign-up required · Works in your browser
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            All the{' '}
            <span className="gradient-text">PDF tools</span>
            <br />you'll ever need.
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--muted)' }}>
            Merge, compress, convert and edit PDFs effortlessly — entirely in your browser. 
            No uploads. No waiting. Just results.
          </p>

          <Link href="#tools">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Explore Tools <ChevronRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── Tools Grid ── */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.active;

            const card = (
              <motion.div
                variants={cardVariants}
                whileHover={isActive ? { y: -6, boxShadow: `0 16px 48px ${tool.glow}` } : {}}
                className="card p-6 flex flex-col gap-4 relative overflow-hidden"
                style={{
                  cursor: isActive ? 'pointer' : 'default',
                  opacity: isActive ? 1 : 0.5,
                }}>

                {/* Coming soon badge */}
                {!isActive && (
                  <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--muted)' }}>
                    Soon
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${tool.color}22` }}>
                  <Icon size={22} style={{ color: tool.color }} />
                </div>

                <div>
                  <h2 className="font-bold text-base mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {tool.label}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {tool.desc}
                  </p>
                </div>

                {isActive && (
                  <div className="flex items-center gap-1 text-sm font-medium mt-auto"
                    style={{ color: tool.color }}>
                    Open tool <ChevronRight size={14} />
                  </div>
                )}
              </motion.div>
            );

            return isActive ? (
              <Link key={tool.label} href={tool.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={tool.label}>{card}</div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Features strip ── */}
      <section className="border-t border-white/5 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <Icon size={22} style={{ color: '#a78bfa' }} />
                </div>
                <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
              <FileText size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              PDF<span style={{ color: '#a78bfa' }}>Tools</span>
            </span>
          </div>

          <p className="text-xs" style={{ color: 'var(--muted-2)' }}>
            © {new Date().getFullYear()} PDFTools. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--muted-2)' }}>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
