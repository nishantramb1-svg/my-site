'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, Loader2, ArrowLeft, Minimize2, CheckCircle, Info } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

type Level = 'low' | 'medium' | 'high';

const levels: { value: Level; label: string; desc: string; quality: number }[] = [
  { value: 'low',    label: 'Low',    desc: 'Best quality, smaller reduction',  quality: 0.85 },
  { value: 'medium', label: 'Medium', desc: 'Balanced quality and file size',    quality: 0.60 },
  { value: 'high',   label: 'High',   desc: 'Smallest size, some quality loss',  quality: 0.30 },
];

function fmt(size: number) {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function savingsLabel(original: number, compressed: number) {
  const pct = ((1 - compressed / original) * 100).toFixed(0);
  return `${pct}% smaller`;
}

export default function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<Level>('medium');
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setResult(null);
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
    setResult(null);

    try {
      // Strategy: render each PDF page to canvas via PDF.js (loaded from CDN),
      // re-encode as JPEG at the chosen quality, then rebuild a new PDF with jsPDF.
      // This gives real file-size reduction for image-heavy PDFs.

      // Dynamically load PDF.js from CDN (no install needed)
      const pdfjsLib = await loadPdfJs();
      const { jsPDF } = await import('jspdf');

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const numPages = pdfDoc.numPages;

      const selectedLevel = levels.find(l => l.value === level)!;
      const quality = selectedLevel.quality;

      // Use first page to determine landscape vs portrait for output
      const firstPage = await pdfDoc.getPage(1);
      const firstVp = firstPage.getViewport({ scale: 1 });
      const isLandscape = firstVp.width > firstVp.height;

      const outPdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [firstVp.width, firstVp.height],
        compress: true,
      });

      // Scale factor — lower quality levels use a coarser render scale
      const renderScale = level === 'high' ? 1.0 : level === 'medium' ? 1.5 : 2.0;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: renderScale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imgData = canvas.toDataURL('image/jpeg', quality);
        const pageWidth = page.getViewport({ scale: 1 }).width;
        const pageHeight = page.getViewport({ scale: 1 }).height;

        if (i > 1) {
          outPdf.addPage([pageWidth, pageHeight], pageWidth > pageHeight ? 'landscape' : 'portrait');
        }

        outPdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      }

      const blob = outPdf.output('blob');
      const outName = file.name.replace(/\.pdf$/i, `-compressed.pdf`);
      setResult({ blob, name: outName });
      toast.success('Compressed successfully!');
    } catch (e) {
      console.error(e);
      toast.error('Compression failed — see console for details');
    } finally {
      setIsCompressing(false);
    }
  };

  const download = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
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

        {/* Info banner */}
        <div className="flex items-start gap-3 rounded-xl px-4 py-3 mb-6 text-sm"
          style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', color: 'var(--muted)' }}>
          <Info size={16} className="shrink-0 mt-0.5" style={{ color: '#06b6d4' }} />
          <p>Pages are rendered to images and re-encoded at the chosen quality. Works best on image-heavy PDFs. Text sharpness may reduce at High compression.</p>
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
                <button onClick={() => { setFile(null); setResult(null); }}
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
                      id={`compress-level-${l.value}`}
                      onClick={() => { setLevel(l.value); setResult(null); }}
                      className="card p-4 text-left transition-all"
                      style={{
                        borderColor: level === l.value ? '#06b6d4' : 'var(--border)',
                        boxShadow: level === l.value ? '0 0 16px rgba(6,182,212,0.2)' : 'none',
                      }}>
                      <p className="font-bold text-sm mb-0.5">{l.label}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Result or CTA */}
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card p-5 flex items-center gap-4"
                    style={{ borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.06)' }}>
                    <CheckCircle size={24} style={{ color: '#10b981', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">
                        Done! {fmt(result.blob.size)} &nbsp;
                        <span style={{ color: '#10b981' }}>
                          ({savingsLabel(file.size, result.blob.size)})
                        </span>
                      </p>
                      <button onClick={() => { setFile(null); setResult(null); }}
                        className="text-xs mt-1 transition"
                        style={{ color: 'var(--muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                        Compress another file →
                      </button>
                    </div>
                    <motion.button
                      id="compress-download-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={download}
                      className="btn-primary flex items-center gap-2 text-sm px-4 py-2 shrink-0"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                      <Download size={16} /> Download
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="cta"
                    id="compress-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={compress}
                    disabled={isCompressing}
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base">
                    {isCompressing
                      ? <><Loader2 size={18} className="animate-spin" /> Compressing…</>
                      : <><Download size={18} /> Compress PDF</>}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Load PDF.js from cdnjs at runtime (no install required)
// ---------------------------------------------------------------------------
let _pdfjsCache: any = null;

async function loadPdfJs(): Promise<any> {
  if (_pdfjsCache) return _pdfjsCache;

  // Dynamic import of the ESM build from CDN
  const mod = await import(
    /* webpackIgnore: true */
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs' as string
  );
  const lib = (mod as any).default ?? mod;
  lib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
  _pdfjsCache = lib;
  return lib;
}