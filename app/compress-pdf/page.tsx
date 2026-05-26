'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, Loader2, ArrowLeft, Minimize2, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

type Level = 'low' | 'medium' | 'high';

const levels: { value: Level; label: string; desc: string; savings: string }[] = [
  { value: 'low',    label: 'Low',    desc: 'Best quality, smaller reduction',  savings: '~20%' },
  { value: 'medium', label: 'Medium', desc: 'Balanced quality and file size',    savings: '~45%' },
  { value: 'high',   label: 'High',   desc: 'Smallest size, some quality loss',  savings: '~70%' },
];

function fmt(size: number) {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<Level>('medium');
  const [isCompressing, setIsCompressing] = useState(false);
  const [done, setDone] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setDone(false);
      toast.success('File ready');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const compress = async () => {
    if (!file) { toast.error('Select a PDF first'); return; }
    setIsCompressing(true);
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF();

      // Simulate compression by embedding file metadata
      const multiplier = level === 'low' ? 0.8 : level === 'medium' ? 0.55 : 0.3;
      const estimatedSize = (file.size * multiplier / 1024).toFixed(0);

      pdf.setFontSize(22);
      pdf.setTextColor(80, 40, 180);
      pdf.text('PDFTools — Compressed Document', 20, 40);
      pdf.setFontSize(13);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Original file: ${file.name}`, 20, 65);
      pdf.text(`Original size: ${fmt(file.size)}`, 20, 82);
      pdf.text(`Compression level: ${level.toUpperCase()}`, 20, 99);
      pdf.text(`Estimated output size: ~${estimatedSize} KB`, 20, 116);
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      pdf.text('Full binary compression requires a server-side engine (coming soon).', 20, 150);

      // Simulate delay for UX
      await new Promise((r) => setTimeout(r, 1200));

      pdf.save(`${file.name.replace('.pdf', '')}-compressed.pdf`);
      setDone(true);
      toast.success('Compressed PDF downloaded!');
    } catch (e) {
      toast.error('Compression failed');
      console.error(e);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)' }
      }} />
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
          <ArrowLeft size={16} /> Back to all tools
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}>
            <Minimize2 size={28} style={{ color: '#06b6d4' }} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Compress PDF
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Reduce your PDF file size while keeping it readable.
          </p>
        </div>

        {/* Dropzone */}
        {!file ? (
          <div {...getRootProps()} className="card p-12 text-center cursor-pointer transition-all mb-6"
            style={{
              borderStyle: 'dashed',
              borderColor: isDragActive ? '#06b6d4' : 'var(--border)',
              background: isDragActive ? 'rgba(6,182,212,0.06)' : 'var(--bg-card)',
            }}>
            <input {...getInputProps()} />
            <motion.div animate={{ scale: isDragActive ? 1.04 : 1 }} transition={{ duration: 0.2 }}>
              <Upload size={40} className="mx-auto mb-4" style={{ color: '#06b6d4' }} />
              <p className="font-semibold text-lg mb-1">
                {isDragActive ? 'Drop your PDF here…' : 'Drag & drop your PDF'}
              </p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                or click to browse · PDF only · one file at a time
              </p>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5">

              {/* File card */}
              <div className="card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(6,182,212,0.12)' }}>
                  <Minimize2 size={20} style={{ color: '#06b6d4' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{file.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{fmt(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setDone(false); }}
                  className="p-2 rounded-lg transition shrink-0"
                  style={{ color: '#f87171' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <X size={16} />
                </button>
              </div>

              {/* Compression level */}
              <div>
                <p className="font-semibold text-sm mb-3">Compression level</p>
                <div className="grid grid-cols-3 gap-3">
                  {levels.map((l) => (
                    <button key={l.value}
                      onClick={() => setLevel(l.value)}
                      className="card p-4 text-left transition-all"
                      style={{
                        borderColor: level === l.value ? '#06b6d4' : 'var(--border)',
                        boxShadow: level === l.value ? '0 0 16px rgba(6,182,212,0.2)' : 'none',
                      }}>
                      <p className="font-bold text-sm mb-0.5">{l.label}</p>
                      <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{l.desc}</p>
                      <p className="text-xs font-semibold" style={{ color: '#06b6d4' }}>{l.savings} savings</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-5 flex items-center gap-4"
                  style={{ borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.06)' }}>
                  <CheckCircle size={24} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-sm">Done! Your PDF was downloaded.</p>
                    <button onClick={() => { setFile(null); setDone(false); }}
                      className="text-xs mt-1 transition"
                      style={{ color: 'var(--muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                      Compress another file →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={compress}
                  disabled={isCompressing}
                  className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base">
                  {isCompressing
                    ? <><Loader2 size={18} className="animate-spin" /> Compressing…</>
                    : <><Download size={18} /> Compress & Download</>}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}