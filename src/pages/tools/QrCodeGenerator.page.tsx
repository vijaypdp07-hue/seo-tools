import { useState, useEffect } from "react";
import { Download, Link2, DownloadCloud } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import QRCode from "qrcode";
import { toast } from "sonner";

export function QrCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!text) {
      setQrDataUrl(null);
      return;
    }

    QRCode.toDataURL(text, { width: size, margin: 2 }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrDataUrl(url);
    });
  }, [text, size]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("QR Code downloaded!");
  };

  return (
    <ToolWrapper
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, Wi-Fi passwords, and more instantly."
      categoryName="Other Tools"
      categoryPath="/tools/other"
      seoContent={
        <div>
          <h2>How to Create a QR Code</h2>
          <ol>
            <li>Enter your URL or text into the input field.</li>
            <li>Select the desired size output using the slider.</li>
            <li>Your QR Code is generated instantly as you type.</li>
            <li>Click download to save it as a high-quality PNG image.</li>
          </ol>
          <p>The entire encoding process runs entirely inside your browser, ensuring no data exists on our servers.</p>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-base bg-bg-base border-b border-border-base">
        {/* Input Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="font-medium text-text-primary text-sm flex items-center gap-2">
              <Link2 className="size-4" /> Enter your Website or Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. https://www.example.com"
              className="w-full h-32 p-3 bg-bg-secondary border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center text-sm font-medium text-text-primary">
              <label>QR Code Size</label>
              <span className="text-primary">{size} x {size} px</span>
            </div>
            <input
              type="range"
              min="128"
              max="1024"
              step="1"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* Result Area */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center space-y-6 bg-bg-secondary min-h-[400px]">
          {qrDataUrl ? (
             <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="p-4 bg-white rounded-xl shadow-md border border-border-base">
                  <img src={qrDataUrl} alt="Generated QR Code" width={200} height={200} className="rounded-md" />
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg w-full justify-center"
                >
                  <DownloadCloud className="size-5" /> Download PNG
                </button>
             </div>
          ) : (
             <div className="flex flex-col items-center text-center text-text-muted max-w-xs space-y-3">
               <div className="p-4 rounded-full bg-bg-tertiary">
                 <Link2 className="size-8" />
               </div>
               <p className="text-sm">Type something in the input box to instantly generate a QR code here.</p>
             </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
