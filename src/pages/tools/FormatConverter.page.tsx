import { useState, useRef } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileImage, Settings, CheckCircle2 } from "lucide-react";

interface FormatConverterPageProps {
  title: string;
  description: string;
  slug: string;
  acceptedFormats: Record<string, string[]>;
  targetMimeType: string;
  targetExtension: string;
}

export function FormatConverterPage({ 
  title,
  description,
  slug,
  acceptedFormats,
  targetMimeType,
  targetExtension
}: FormatConverterPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    setConvertedBlob(null);
    
    if (!file.type.startsWith("image/") && !file.type.startsWith("image/svg")) {
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

  const handleConvert = async () => {
    if (!imageUrl) return;
    
    setIsProcessing(true);
    setError(null);
    setConvertedBlob(null);

    try {
      const img = new Image();
      img.src = imageUrl;
      // svg to png needs crossOrigin, but objectURL is fine
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      canvas.width = img.width;
      canvas.height = img.height;
      
      // For converting PNG/SVG (which might have transparency) to JPG: we need a white background.
      if (targetMimeType === 'image/jpeg') {
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, targetMimeType, 0.92));
      
      if (!blob) throw new Error("Conversion failed.");
      
      setConvertedBlob(blob);
    } catch (err) {
      setError("An error occurred during conversion. Please try another image.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !selectedFile) return;
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    
    let baseName = selectedFile.name;
    const lastDotIndex = baseName.lastIndexOf('.');
    if (lastDotIndex > 0) {
      baseName = baseName.substring(0, lastDotIndex);
    }
    
    a.download = `${baseName}${targetExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "Is my image uploaded to a server?",
      content: "No, the image conversion happens completely within your internet browser using standard HTML5 Canvas APIs. This keeps your photos private and secure."
    },
    {
      title: "Does converting affect resolution?",
      content: "No, this tool maintains the exact pixel width and height of the original file, it only transpiles the color encoding data to the new format structural standard."
    }
  ];

  return (
    <ToolWrapper
      title={title}
      description={description}
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col gap-6 p-6 bg-bg-base border-b border-border-base">
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {!selectedFile ? (
                <div className="space-y-4">
                  <DropZone 
                    onFile={handleFile}
                    onError={(err) => setError(err)}
                    accept={acceptedFormats}
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
                            setConvertedBlob(null);
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                    >
                        ✕ Start over
                    </button>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
                        <div className="flex flex-col items-center gap-2 p-4 border border-border-base rounded-lg bg-bg-base w-full max-w-xs">
                           <FileImage className="size-8 text-text-muted" />
                           <span className="font-medium text-text-primary truncate w-full text-center">{selectedFile.name}</span>
                           <span className="text-xl font-bold">Original</span>
                        </div>
                        
                        {convertedBlob ? (
                            <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in zoom-in-95 border-2 border-primary/20 rounded-lg bg-primary-light/10 w-full max-w-xs">
                               <FileImage className="size-8 text-primary" />
                               <span className="font-medium text-primary truncate w-full text-center">Converted {targetExtension.toUpperCase()}</span>
                               <span className="text-xl font-bold text-primary">Ready</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 p-6 border border-dashed border-border-focus rounded-lg bg-bg-base w-full max-w-xs justify-center min-h-[140px]">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <div className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium text-text-secondary">Converting...</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleConvert}
                                        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors"
                                    >
                                        <Settings className="size-4" /> Convert to {targetExtension.toUpperCase()}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                   
                    {convertedBlob && (
                        <div className="pt-4 border-t border-border-base w-full flex justify-center">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                            >
                                <Download className="size-5" />
                                Download {targetExtension.toUpperCase()}
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
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to convert images</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Simply drag and drop your original image into the tool.</li>
                 <li><strong>Convert:</strong> Hit the conversion button and allow the browser's background engine to rewrite the data mapping into the new layout structure.</li>
                 <li><strong>Download:</strong> Your completed file will appear with its new extension intact.</li>
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

        <RelatedTools currentSlug={slug} category="image" />
      </div>
    </ToolWrapper>
  );
}
