'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { SignInButton, SignOutButton, UserButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const links = [
    { label: 'Merge PDF', href: '/merge-pdf' },
    { label: 'Compress PDF', href: '/compress-pdf' },
    { label: 'Image to PDF', href: '/image-to-pdf' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl"
        style={{ background: 'rgba(7, 8, 15, 0.85)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
              <FileText size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight"
              style={{ fontFamily: 'var(--font-syne), Syne, sans-serif' }}>
              PDF<span style={{ color: '#a78bfa' }}>Tools</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5"
                style={{ color: 'var(--muted)' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary hidden sm:block text-sm px-5 py-2">
                  Sign In
                </motion.button>
              </SignInButton>
            )}

            {/* Mobile hamburger */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg transition"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 z-50 md:hidden flex flex-col p-6 gap-4"
              style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border)' }}>

              <div className="flex items-center justify-between mb-4">
                <span className="font-bold" style={{ color: '#a78bfa', fontFamily: 'var(--font-syne), sans-serif' }}>
                  PDFTools
                </span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
                  <X size={18} />
                </button>
              </div>

              {links.map((link) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition"
                  style={{ background: 'var(--bg-hover)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                  {link.label}
                </Link>
              ))}

              <div className="mt-auto">
                {isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <UserButton />
                    <SignOutButton>
                      <button className="text-sm" style={{ color: 'var(--muted)' }}>Sign out</button>
                    </SignOutButton>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="btn-primary w-full text-sm">Sign In</button>
                  </SignInButton>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
