'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  X,
  Download,
  Loader2,
  GripVertical,
} from 'lucide-react';

import toast, { Toaster } from 'react-hot-toast';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  size: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ImageToPDFPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] =
    useState<string | null>(null);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File exceeds 10MB');
      return false;
    }

    return true;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(validateFile);

    const mapped = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      size: file.size,
    }));

    setImages((prev) => [...prev, ...mapped]);

    if (mapped.length > 0) {
      toast.success(`${mapped.length} image(s) added`);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const totalSize = useMemo(() => {
    return images.reduce((acc, img) => acc + img.size, 0);
  }, [images]);

  const formattedSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  const downloadPDF = async () => {
    if (images.length === 0) {
      toast.error('Add images first');
      return;
    }

    setIsConverting(true);

    try {
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const data = await new Promise<string>((resolve) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result as string);
          };

          reader.readAsDataURL(image.file);
        });

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(data, 'JPEG', 10, 10, 190, 250);
      }

      pdf.save('images.pdf');

      toast.success('PDF downloaded!');
    } catch (error) {
      toast.error('Failed to generate PDF');
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Image to PDF
          </h1>

          <p className="text-gray-400 text-lg">
            Convert images into beautiful PDFs instantly.
          </p>
        </div>

        {/* Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-14 text-center transition cursor-pointer ${
            isDragActive
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/10 hover:border-white/20 bg-white/5'
          }`}
        >
          <input {...getInputProps()} />

          <motion.div
            animate={{ scale: isDragActive ? 1.05 : 1 }}
          >
            <Upload className="mx-auto w-14 h-14 text-purple-400 mb-5" />

            <h2 className="text-2xl font-bold mb-2">
              Drag & Drop Images
            </h2>

            <p className="text-gray-400">
              or click to browse files
            </p>
          </motion.div>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="mt-10">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Images ({images.length})
              </h2>

              <p className="text-gray-400">
                {formattedSize(totalSize)}
              </p>
            </div>

            <Reorder.Group
              axis="y"
              values={images}
              onReorder={setImages}
              className="space-y-4"
            >
              <AnimatePresence>
                {images.map((image, index) => (
                  <Reorder.Item
                    key={image.id}
                    value={image}
                  >
                    <motion.div
                      layout
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4"
                    >

                      <button className="text-gray-500">
                        <GripVertical />
                      </button>

                      <div
                        className="w-20 h-20 rounded-xl overflow-hidden cursor-pointer"
                        onClick={() =>
                          setSelectedImagePreview(image.preview)
                        }
                      >
                        <img
                          src={image.preview}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">
                          {image.file.name}
                        </p>

                        <p className="text-sm text-gray-400">
                          {formattedSize(image.size)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                      >
                        <X />
                      </button>

                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {/* Download */}
            <button
              onClick={downloadPDF}
              disabled={isConverting}
              className="mt-8 w-full bg-purple-600 hover:bg-purple-500 transition rounded-2xl py-4 font-bold flex items-center justify-center gap-3"
            >
              {isConverting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download />
                  Download PDF
                </>
              )}
            </button>
          </div>
        )}

        {/* Preview Modal */}
        <AnimatePresence>
          {selectedImagePreview && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImagePreview(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-3xl max-h-[85vh]"
              >
                <img
                  src={selectedImagePreview}
                  alt=""
                  className="rounded-2xl max-h-[85vh]"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}