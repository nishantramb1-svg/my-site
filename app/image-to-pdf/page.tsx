'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, Loader2, GripVertical, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  size: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function fmt(size: number) {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function ImageToPDFPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const valid = accepted.filter((f) => {
      if (f.size > MAX_FILE_SIZE) { toast.error(`${f.name} exceeds 10 MB`); return false; }
      return true;
    });
    const mapped = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      size: file.size,
    }));
    setImages((prev) => [...prev, ...mapped]);
    if (mapped.length > 0) toast.success(`${mapped.length} image(s) added`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
  });

  const removeImage = (id: string) => setImages((prev) => prev.filter((img) => img.id !== id));
  const totalSize = useMemo(() => images.reduce((acc, img) => acc + img.size, 0), [images]);

  const downloadPDF = async () => {
    if (images.length === 0) { toast.error('Add images first'); return; }
    setIsConverting(true);
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      // A4 usable area with 10mm margins
      const PAGE_W = 190; // 210 - 2×10
      const PAGE_H = 277; // 297 - 2×10

      for (let i = 0; i < images.length; i++) {
        const data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(images[i].file);
        });

        // Measure the real pixel dimensions of the image
        const { naturalW, naturalH } = await new Promise<{ naturalW: number; naturalH: number }>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve({ naturalW: img.naturalWidth, naturalH: img.naturalHeight });
          img.src = data;
        });

        // Scale proportionally to fit within the page area
        const imgAspect = naturalW / naturalH;
        const pageAspect = PAGE_W / PAGE_H;

        let drawW: number, drawH: number;
        if (imgAspect > pageAspect) {
          // Wider than page → constrain by width
          drawW = PAGE_W;
          drawH = PAGE_W / imgAspect;
        } else {
          // Taller than page → constrain by height
          drawH = PAGE_H;
          drawW = PAGE_H * imgAspect;
        }

        // Center the image on the page
        const x = 10 + (PAGE_W - drawW) / 2;
        const y = 10 + (PAGE_H - drawH) / 2;

        if (i > 0) pdf.addPage();

        const imgFmt = images[i].file.type === 'image/png' ? 'PNG' : 'JPEG';
        pdf.addImage(data, imgFmt, x, y, drawW, drawH);
      }

      pdf.save('images.pdf');
      toast.success('PDF downloaded!');
    } catch (e) {
      toast.error('Failed to generate PDF');
      console.error(e);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)' }
      }} />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

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
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <ImageIcon size={28} style={{ color: '#10b981' }} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Image to PDF
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Convert JPG, PNG, or WEBP images into a PDF. Drag to reorder.
          </p>
        </div>

        {/* Dropzone */}
        <div {...getRootProps()} className="card p-12 text-center cursor-pointer transition-all mb-6"
          style={{
            borderStyle: 'dashed',
            borderColor: isDragActive ? '#10b981' : 'var(--border)',
            background: isDragActive ? 'rgba(16,185,129,0.06)' : 'var(--bg-card)',
          }}>
          <input {...getInputProps()} />
          <motion.div animate={{ scale: isDragActive ? 1.04 : 1 }} transition={{ duration: 0.2 }}>
            <Upload size={40} className="mx-auto mb-4" style={{ color: '#10b981' }} />
            <p className="font-semibold text-lg mb-1">
              {isDragActive ? 'Drop images here…' : 'Drag & drop images'}
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              or click to browse · PNG, JPG, WEBP · max 10 MB each
            </p>
          </motion.div>
        </div>

        {/* Image list */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}>

              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">{images.length} image{images.length > 1 ? 's' : ''}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{fmt(totalSize)} total</p>
              </div>

              <Reorder.Group axis="y" values={images} onReorder={setImages} className="space-y-3 mb-6">
                {images.map((img) => (
                  <Reorder.Item key={img.id} value={img}>
                    <motion.div layout
                      className="card p-4 flex items-center gap-4"
                      style={{ cursor: 'grab' }}>
                      <GripVertical size={18} style={{ color: 'var(--muted-2)', flexShrink: 0 }} />

                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                        onClick={() => setPreview(img.preview)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.preview} alt={img.file.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{img.file.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{fmt(img.size)}</p>
                      </div>

                      <button onClick={() => removeImage(img.id)}
                        className="p-2 rounded-lg transition shrink-0"
                        style={{ color: '#f87171' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <X size={16} />
                      </button>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadPDF}
                disabled={isConverting}
                className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base">
                {isConverting
                  ? <><Loader2 size={18} className="animate-spin" /> Generating PDF…</>
                  : <><Download size={18} /> Download PDF</>}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={preview} alt="preview"
              className="rounded-2xl max-h-[85vh] max-w-full"
              onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}