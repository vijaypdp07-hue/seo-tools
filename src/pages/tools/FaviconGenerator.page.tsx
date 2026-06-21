import { useState, useRef } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileImage, Settings, CheckCircle2 } from "lucide-react";
import JSZip from "jszip";

const FAVICON_SIZES = [
  { size: 16, name: "favicon-16x16.png", purpose: "Standard browser tab icon" },
  { size: 32, name: "favicon-32x32.png", purpose: "Standard browser tab icon (High Res)" },
  { size: 180, name: "apple-touch-icon.png", purpose: "iOS home screen" },
  { size: 192, name: "android-chrome-192x192.png", purpose: "Android Chrome" },
  { size: 512, name: "android-chrome-512x512.png", purpose: "Android Chrome (High Res)" },
];

export function FaviconGeneratorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedZip, setGeneratedZip] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    setGeneratedZip(null);
    
    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("File exceeds the 20MB limit. Please choose a smaller file.");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleError = (err: string) => {
    setError(err);
  };

  const generateFavicons = async () => {
    if (!imageUrl) return;
    
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setGeneratedZip(null);

    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const zip = new JSZip();
      
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: true });
      
      if (!ctx) throw new Error("Failed to get canvas context");

      // We make the favicons square by cropping the image to its center
      const size = Math.min(img.width, img.height);
      const startX = (img.width - size) / 2;
      const startY = (img.height - size) / 2;

      for (let i = 0; i < FAVICON_SIZES.length; i++) {
        const item = FAVICON_SIZES[i];
        
        canvas.width = item.size;
        canvas.height = item.size;
        
        // Clear canvas (to transparent)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw cropped image scaled to item.size
        ctx.drawImage(img, startX, startY, size, size, 0, 0, item.size, item.size);

        // Get blob
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        
        if (blob) {
          zip.file(item.name, blob);
        }

        setProgress(Math.round(((i + 1) / FAVICON_SIZES.length) * 50));
      }

      // Add HTML implementation guide
      const htmlCode = `<!-- Paste this inside your completely <head> tag -->\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n`;
      zip.file("instructions.html", htmlCode);

      setProgress(80);

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" }, (metadata) => {
         setProgress(80 + Math.round(metadata.percent * 0.2));
      });
      
      setGeneratedZip(zipBlob);
      setProgress(100);
    } catch (err) {
      setError("An error occurred during generation. Please try another image.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!generatedZip) return;
    const url = URL.createObjectURL(generatedZip);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicons.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "What sizes are included in the generated ZIP?",
      content: "The package includes all standard, modern recommended sizes: 16x16 and 32x32 (standard desktop browser cursors), 180x180 (Apple Touch Icon), and 192x192 & 512x512 (Android Chrome standards)."
    },
    {
      title: "Do I need to crop my image to a square first?",
      content: "No. The tool automatically detects your image's dimensions and will perfectly crop it from the center as a square before generating the different sizing scales."
    },
    {
      title: "Is my image uploaded to a server?",
      content: "No, all rendering, cropping, scaling, and zipping happens directly in your browser. Nothing is uploaded to our servers, keeping your graphics completely private."
    }
  ];

  return (
    <ToolWrapper
      title="Favicon Generator"
      description="Create perfect favicons for your website. Upload an image to generate a zip file with 16x16, 32x32, Apple touch, and Android icon sizes."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col gap-6 p-6 bg-bg-base border-b border-border-base">
        {/* Input area */}
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {!selectedFile ? (
                <div className="space-y-4">
                  <DropZone 
                    onFile={handleFile}
                    onError={handleError}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'] }}
                    maxSizeMB={20}
                  />
                  {error && (
                    <div className="p-4 bg-error-light/50 border border-error/20 rounded-md text-error text-sm">
                      {error}
                    </div>
                  )}
                </div>
            ) : (
                <div className="bg-bg-secondary border border-border-base rounded-xl p-6 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
                    <button 
                        onClick={() => {
                            setSelectedFile(null);
                            setImageUrl(null);
                            setGeneratedZip(null);
                            setProgress(0);
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                    >
                        ✕ Remove image
                    </button>
                    
                    {imageUrl && (
                        <div className="size-32 rounded-lg border border-border-focus overflow-hidden shadow-sm bg-white flex items-center justify-center p-2">
                             <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                        </div>
                    )}
                    
                    <div className="text-center">
                        <h3 className="font-medium text-text-primary mb-1">{selectedFile.name}</h3>
                        <p className="text-sm text-text-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    {!generatedZip && !isProcessing && (
                        <button
                            onClick={generateFavicons}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                        >
                            <Settings className="size-5" />
                            Generate Favicons
                        </button>
                    )}

                    {isProcessing && (
                         <div className="w-full max-w-md space-y-2">
                            <div className="flex justify-between text-sm font-medium text-text-secondary">
                                <span>Processing...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-border-base rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-300 ease-out" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                         </div>
                    )}

                    {generatedZip && (
                         <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                             <div className="flex items-center gap-2 text-success font-bold">
                                 <CheckCircle2 className="size-5" />
                                 Success!
                             </div>
                             <button
                                 onClick={handleDownload}
                                 className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool"
                             >
                                 <Download className="size-5" />
                                 Download .ZIP Bundle
                             </button>
                         </div>
                    )}

                    {error && (
                        <div className="w-full p-4 bg-error-light/50 border border-error/20 rounded-md text-error text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
      
      {/* Hidden canvas used for resizing */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Generate Favicons</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our tool runs completely locally to parse your image, crop it into a perfect square, and save multiple required browser size formats into one easy-to-download ZIP file.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload an Image:</strong> Drag and drop your company logo or icon file. Square images work perfectly. High-resolution PNGs are best.</li>
                 <li><strong>Generate:</strong> Hit the generate button. Wait just a moment as your browser maps the icon into new resized arrays.</li>
                 <li><strong>Download ZIP:</strong> Your downloaded package will include instructions.html on exactly how to implement the files into your web headers!</li>
             </ol>
          </div>
        </section>

        <section className="space-y-4">
           <div className="flex items-center gap-2">
             <HelpCircle className="size-5 text-primary" />
             <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
           </div>
           <Accordion items={faqItems} />
        </section>

        <RelatedTools currentSlug="favicon-generator" category="image" />
      </div>
    </ToolWrapper>
  );
}
