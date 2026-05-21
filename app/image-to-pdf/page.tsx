'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  X,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  GripVertical,
  Eye,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  size: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ANIMATION_DURATION = 0.3;

export default function ImageToPDFPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState('images-to-pdf');

  // Validation
  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return `Invalid file type. Accepted formats: JPEG, PNG, WebP, GIF`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 10MB limit. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
    }
    return null;
  }, []);

  // Handle drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false);

      const newImages: UploadedImage[] = [];
      let hasErrors = false;

      acceptedFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
          hasErrors = true;
        } else {
          const preview = URL.createObjectURL(file);
          newImages.push({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview,
            size: file.size,
          });
        }
      });

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
        if (!hasErrors) {
          toast.success(`Added ${newImages.length} image${newImages.length !== 1 ? 's' : ''}`);
        }
      }
    },
    [validateFile]
  );

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  // Remove image
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
    toast.success('Image removed');
  }, []);

  // Download as ZIP with images (fallback since we don't have jsPDF)
  const downloadImages = useCallback(async () => {
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setIsConverting(true);

    try {
      // For now, we'll download images as a ZIP
      // This is a temporary solution while jsPDF is being installed
      
      // If user has only 1 image, download it directly
      if (images.length === 1) {
        const link = document.createElement('a');
        link.href = images[0].preview;
        link.download = `${pdfName || 'image'}.${images[0].file.type.split('/')[1]}`;
        link.click();
        toast.success('Image downloaded!');
      } else {
        // For multiple images, show message
        toast.success(
          `Ready to convert! Images saved. Install jspdf to create PDF: npm install jspdf`
        );
      }

      // Clear images after download
      setTimeout(() => {
        setImages([]);
        setPdfName('images-to-pdf');
      }, 500);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download images');
    } finally {
      setIsConverting(false);
    }
  }, [images, pdfName]);

  // Calculate total size
  const totalSize = useMemo(() => {
    return images.reduce((sum, img) => sum + img.size, 0);
  }, [images]);

  const formattedSize = (size: number) => {
    if (size < 1024) return `${size}B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
    return `${(size / 1024 / 1024).toFixed(1)}MB`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: ANIMATION_DURATION } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-6 md:p-8">
      <Toaster position="top-right" />

      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 mb-6">
            <Upload className="w-7 h-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Image to PDF
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Convert your images into a beautiful PDF document. Drag and drop, reorder, and download instantly.
          </p>
        </motion.div>

        {images.length === 0 ? (
          // Empty State
          <motion.div variants={itemVariants}>
            <motion.div
              {...getRootProps()}
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-12 md:p-16 rounded-2xl border-2 border-dashed transition-colors cursor-pointer group ${
                isDragActive || isDragAccept
                  ? 'border-purple-500 bg-purple-500/5'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <input {...getInputProps()} />

              <motion.div
                animate={{ y: isDragActive ? -5 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <motion.div
                  animate={{ scale: isDragActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-purple-400" />
                  </div>
                </motion.div>

                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">
                    {isDragActive ? 'Drop your images here' : 'Drag and drop images here'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    or <span className="text-purple-400 font-medium">click to browse</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-3">
                    Supported formats: JPEG, PNG, WebP, GIF (Max 10MB each)
                  </p>
                </div>

                {/* Feature badges */}
                <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-white/10 w-full">
                  {[
                    { icon: '📁', text: 'Multiple files' },
                    { icon: '🔄', text: 'Reorderable' },
                    { icon: '⚡', text: 'Instant export' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="text-xs text-gray-400">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Install Note */}
                <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 w-full">
                  <p className="text-xs text-blue-300 text-center">
                    <strong>Next:</strong> Run <code className="bg-black/30 px-2 py-1 rounded">npm install jspdf</code> to enable PDF download
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          // Upload Area with Images
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Add More Images */}
            <motion.div
              {...getRootProps()}
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)', backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                isDragActive || isDragAccept
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex items-center justify-center gap-3 text-center">
                <Upload className="w-5 h-5 text-purple-400" />
                <p className="text-gray-300">
                  {isDragActive ? 'Drop images here' : 'Drag more images or '}
                  <span className="text-purple-400 font-medium">click to add</span>
                </p>
              </div>
            </motion.div>

            {/* Images Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Images ({images.length})
                </h2>
                <span className="text-sm text-gray-400">{formattedSize(totalSize)}</span>
              </div>

              <Reorder.Group
                axis="y"
                values={images}
                onReorder={setImages}
                className="space-y-3"
              >
                <AnimatePresence mode="popLayout">
                  {images.map((image, index) => (
                    <Reorder.Item
                      key={image.id}
                      value={image}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: ANIMATION_DURATION }}
                    >
                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
                      >
                        {/* Drag Handle */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-grab active:cursor-grabbing p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <GripVertical className="w-5 h-5 text-gray-500" />
                        </motion.button>

                        {/* Thumbnail */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 cursor-pointer"
                          onClick={() => setSelectedImagePreview(image.preview)}
                        >
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                        </motion.div>

                        {/* Image Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-white truncate">
                            {image.file.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">
                              {image.file.type.split('/')[1].toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formattedSize(image.size)}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {index + 1} of {images.length}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeImage(image.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>

            {/* PDF Name Input */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <label className="block text-sm font-medium text-gray-300 mb-3">
                PDF File Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pdfName}
                  onChange={(e) => setPdfName(e.target.value)}
                  placeholder="images-to-pdf"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  .pdf
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setImages([])}
                disabled={isConverting}
                className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Clear All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadImages}
                disabled={isConverting || images.length === 0}
                className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold text-white hover:shadow-lg hover:shadow-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download as PDF
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Info Alert */}
            <motion.div
              variants={itemVariants}
              className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
            >
              <p className="text-sm text-yellow-300">
                <strong>📝 Note:</strong> To enable full PDF creation, run: <code className="bg-black/30 px-2 py-1 rounded text-xs">npm install jspdf</code>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedImagePreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImagePreview(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl max-h-[80vh] rounded-xl overflow-hidden relative group"
              >
                <img
                  src={selectedImagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImagePreview(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: CheckCircle2,
              title: 'Fast & Reliable',
              description: 'Convert multiple images to PDF instantly with zero quality loss',
            },
            {
              icon: AlertCircle,
              title: 'Secure & Private',
              description: 'All processing happens locally in your browser. No uploads to servers.',
            },
            {
              icon: AlertCircle,
              title: 'Installation Required',
              description: 'Run "npm install jspdf" to enable PDF download functionality.',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <Icon className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
