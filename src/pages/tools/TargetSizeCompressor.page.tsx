import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, Settings, FileImage, CheckCircle2 } from "lucide-react";
import imageCompression from "browser-image-compression";

interface TargetSizeCompressorPageProps {
  defaultTargetKB?: number;
  fixedTarget?: boolean;
  title?: string;
  slug?: string;
  description?: string;
}

export function TargetSizeCompressorPage({ 
  defaultTargetKB, 
  fixedTarget = false,
  title = "Photo Resizer In KB",
  slug = "photo-resizer-in-kb",
  description = "Compress any image to an exact custom size in KB instantly."
}: TargetSizeCompressorPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetKB, setTargetKB] = useState<number>(defaultTargetKB || 100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    setCompressedFile(null);
    setCompressedUrl(null);
    
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("File exceeds the 20MB limit. Please choose a smaller file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    
    try {
      const options = {
        maxSizeMB: targetKB / 1024,
        maxWidthOrHeight: 4000, 
        useWebWorker: true,
        onProgress: (p: number) => setProgress(p)
      };

      const compressedBlob = await imageCompression(selectedFile, options);
      
      let finalFile = new File([compressedBlob], `compressed-${targetKB}kb-${selectedFile.name}`, {
        type: compressedBlob.type,
      });

      // Browser image compression won't ALWAYS perfectly hit below if the image complexities are high.
      if (finalFile.size > targetKB * 1024) {
         // Fallback loop if we must really enforce
         let currentBlob = compressedBlob;
         let q = 0.8;
         let w = 2000;
         while(currentBlob.size > targetKB * 1024 && w > 200) {
            currentBlob = await imageCompression(selectedFile, {
               maxSizeMB: (targetKB / 1024) * q,
               maxWidthOrHeight: w,
               useWebWorker: true
            });
            q *= 0.8;
            w *= 0.8;
         }
         finalFile = new File([currentBlob], `compressed-${targetKB}kb-${selectedFile.name}`, {
            type: currentBlob.type,
         });
      }
      
      setCompressedFile(finalFile);
      setCompressedUrl(URL.createObjectURL(finalFile));
    } catch (err) {
      setError("An error occurred during compression. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl || !compressedFile) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = compressedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isActuallySmaller = compressedFile && compressedFile.size < selectedFile!.size;

  const faqItems = [
    {
      title: "How does the size reducer work?",
      content: "This tool mathematically determines the best balance of visual quality and resolution to match your exact requested file weight entirely in your web browser."
    },
    {
      title: "Are my photos kept private?",
      content: "Yes, we prioritize privacy. The image files are compressed on your actual device utilizing its standard CPU. No data is sent over the internet or saved to external servers."
    },
    {
      title: "Why didn't my photo reach the exact target KB?",
      content: "Sometimes highly complex layouts cannot compress to extreme sizes (like 10KB) without reducing the dimension pixel scale so severely that the photo is unreadable. We drop quality and dimensions aggressively if needed, but extreme reduction may alter pixel dimensions."
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
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
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
                            setCompressedFile(null);
                            setCompressedUrl(null);
                            setProgress(0);
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                    >
                        ✕ Start over
                    </button>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
                        <div className="flex flex-col items-center gap-2 p-4 border border-border-base rounded-lg bg-bg-base w-full max-w-xs">
                           <FileImage className="size-8 text-text-muted" />
                           <span className="font-medium text-text-primary truncate w-full text-center">{selectedFile.name}</span>
                           <span className="text-xl font-bold">{formatSize(selectedFile.size)}</span>
                           <span className="text-xs text-text-muted uppercase tracking-wider">Original Size</span>
                        </div>
                        
                        {compressedFile && compressedUrl ? (
                            <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in zoom-in-95 border-2 border-primary/20 rounded-lg bg-primary-light/10 w-full max-w-xs">
                               <FileImage className="size-8 text-primary" />
                               <span className="font-medium text-primary truncate w-full text-center">Ready</span>
                               <span className="text-xl font-bold text-primary">{formatSize(compressedFile.size)}</span>
                               {isActuallySmaller ? (
                                   <span className="text-xs text-success uppercase tracking-wider font-bold">
                                       ↓ `${Math.round((1 - compressedFile.size / selectedFile.size) * 100)}%` reduction
                                   </span>
                               ) : (
                                   <span className="text-xs text-warning uppercase tracking-wider">
                                       No reduction needed
                                   </span>
                               )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 p-6 border border-dashed border-border-focus rounded-lg bg-bg-base w-full max-w-xs justify-center min-h-[140px]">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <div className="h-2 w-full bg-border-base rounded-full overflow-hidden">
                                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                                        </div>
                                        <span className="text-sm font-medium text-text-secondary">Compressing... {progress}%</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <label className="text-sm font-semibold text-text-primary">Target Size (KB)</label>
                                        <input 
                                            type="number"
                                            value={targetKB}
                                            disabled={fixedTarget}
                                            onChange={(e) => setTargetKB(Math.max(1, Number(e.target.value)))}
                                            className="w-full px-4 py-2 border border-border-base rounded text-center focus:ring-2 focus:ring-primary focus:border-primary bg-bg-base disabled:opacity-50"
                                        />
                                        <button
                                            onClick={handleCompress}
                                            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors mt-2"
                                        >
                                            <Settings className="size-4" /> Compress
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                   
                    {compressedFile && compressedUrl && (
                        <div className="pt-4 border-t border-border-base w-full flex justify-center">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                            >
                                <Download className="size-5" />
                                Download Resized Image
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

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Reduce an Image to Exactly {targetKB}KB</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Start by uploading the JPEG/PNG photograph you need to make smaller.</li>
                 <li><strong>Target Parameter:</strong> Input your target KB maximum size limit. (Certain tools have this locked specifically to match exact form-upload restrictions.)</li>
                 <li><strong>Compress:</strong> Allow the offline Javascript module mathematically scale quality levels downward until the byte-size passes beneath the target filter.</li>
                 <li><strong>Save:</strong> Secure your file instantly locally to your own hard-drive device!</li>
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
