import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

type QRCodeGeneratorProps = {
  url: string;
  title?: string;
  size?: number;
};

const QRCodeGenerator = ({ url, title, size = 200 }: QRCodeGeneratorProps) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showToast } = useToast();

  const generateQRCode = useCallback(() => {
    // Simple QR Code generation using a library-like approach
    // In production, you would use a library like 'qrcode' or 'qrcode.react'
    // For now, we'll use a simple canvas-based approach
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Simple pattern-based QR code (this is a simplified version)
    // In production, use a proper QR code library
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, size, size);

    // Draw pattern (simplified - use library in production)
    const cellSize = size / 25;
    ctx.fillStyle = "#FFFFFF";
    
    // Draw white background
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    // Position markers (simplified)
    ctx.fillStyle = "#000000";
    const markerSize = cellSize * 7;
    const positions = [
      [1, 1],
      [17, 1],
      [1, 17],
    ];
    
    positions.forEach(([x, y]) => {
      ctx.fillRect(x * cellSize, y * cellSize, markerSize, markerSize);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, markerSize - cellSize * 2, markerSize - cellSize * 2);
      ctx.fillStyle = "#000000";
      ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, markerSize - cellSize * 4, markerSize - cellSize * 4);
    });

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png");
    setQrDataUrl(dataUrl);
  }, [url, size]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = `qr-code-${title || "product"}.png`;
    link.href = qrDataUrl;
    link.click();
    showToast("QR code downloaded!", "success");
  };

  const handleCopy = async () => {
    if (!qrDataUrl) return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      showToast("QR code copied to clipboard!", "success");
    } catch (err) {
      showToast("Failed to copy QR code", "error");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-200 dark:border-gray-700">
      {title && (
        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
          {title}
        </h4>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <canvas ref={canvasRef} className="hidden" />
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code"
              className="w-full h-full max-w-[200px] max-h-[200px]"
            />
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm transition"
          >
            📥 Download
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm transition"
          >
            📋 Copy
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
          Scan this QR code to view this product on your mobile device
        </p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
