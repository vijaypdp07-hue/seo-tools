import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileImage, Settings, CheckCircle2 } from "lucide-react";
import heic2any from "heic2any";

interface HeicConverterPageProps {
  title: string;
  description: string;
  slug: string;
  targetFormat: 'image/jpeg' | 'image/png';
  targetExtension: string;
}

export function HeicConverterPage({ 
  title,
  description,
  slug,
  targetFormat,
  targetExtension
}: HeicConverterPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    setConvertedBlob(null);
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (file.type !== "image/heic" && file.type !== "image/heif" && fileExtension !== "heic" && fileExtension !== "heif") {
      setError("Please upload a valid HEIC or HEIF image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("File exceeds the 20MB limit. Please choose a smaller file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setConvertedBlob(null);

    try {
      const conversionResult = await heic2any({
        blob: selectedFile,
        toType: targetFormat,
        quality: 0.92,
      });
      
      const resultBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
      setConvertedBlob(resultBlob);
    } catch (err) {
      setError("An error occurred during HEIC conversion. The file may be corrupted or unsupported.");
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
      title: "What is a HEIC file?",
      content: "HEIC (High-Efficiency Image Container) is the default photo format used by Apple on modern iPhones and iPads. It offers high quality at smaller sizes but is not universally supported on all devices or websites."
    },
    {
      title: "How does this conversion work?",
      content: "This tool leverages a WebAssembly engine natively within your web browser to decode the HEIC compression algorithm and transcribe the pixels into standard formats like JPEG or PNG."
    },
    {
      title: "Are my photos kept private?",
      content: "Yes. Your photos never leave your device. All calculations, parsing, and extractions occur strictly using your machine's local CPU inside your web browser."
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
                    accept={{ 'image/heic': ['.heic'], 'image/heif': ['.heif'] }}
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
                           <span className="text-xl font-bold">Original HEIC</span>
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
                                        <span className="text-sm font-medium text-text-secondary">Extracting data...</span>
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

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Convert iPhone HEIC Photos</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Transfer your Apple HEIC photo onto your device and drop it into the upload zone above.</li>
                 <li><strong>Extract:</strong> Click convert. A WebAssembly protocol will decipher the heavily-compressed Apple structure securely offline.</li>
                 <li><strong>Save:</strong> Click download to save your new universally readable file (like JPEG) to your drive.</li>
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
