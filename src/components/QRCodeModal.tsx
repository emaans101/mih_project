import { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, QrCode as QrIcon, Smartphone } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine game URL for scanning
  const getPlayUrl = () => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      return `${origin}?mode=play`;
    }
    return 'https://mih-imposter.mdx.ac.ae/play';
  };

  const playUrl = getPlayUrl();

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(playUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#2D264B',
        light: '#FFFFFF'
      }
    })
      .then(url => {
        setQrDataUrl(url);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
  }, [isOpen, playUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(playUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'MIH_Innovation_Imposter_QR.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D264B]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#ECE7FA] text-[#2D264B] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6E6594] hover:text-[#2D264B] hover:bg-[#F3E8FF] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] mb-3">
            <QrIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#2D264B]">
            Event QR Code Access
          </h3>
          <p className="text-sm text-[#6E6594] mt-1 max-w-xs mx-auto">
            Scan at an MIH event or booth to open and play immediately on your mobile phone.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#FAF9FE] rounded-2xl border border-[#E2DCF8] mb-5">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Scan to play MIH Innovation Imposter"
              className="w-56 h-56 rounded-xl shadow-xs"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-[#6E6594]">
              Generating QR Code...
            </div>
          )}

          <div className="flex items-center gap-2 mt-3 text-xs font-medium text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile-optimized • No lobby needed</span>
          </div>
        </div>

        {/* Direct Link & Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2.5 bg-[#F8F7FC] rounded-xl border border-[#ECE7FA] text-xs">
            <span className="truncate flex-1 font-mono text-[#4B416E] select-all">
              {playUrl}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#DDD6FE] text-[#7C3AED] font-medium hover:bg-[#F3E8FF] transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className="w-full py-2.5 px-4 rounded-xl bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#6D28D9] font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res QR for Posters & Slides</span>
          </button>
        </div>
      </div>
    </div>
  );
}
