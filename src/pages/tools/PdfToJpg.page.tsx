import { useState, useRef } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileImage, Settings, Image as ImageIcon } from "lucide-react";
import JSZip from "jszip";

import * as pdfjsLib from "pdfjs-dist";
// Setup the worker to load dynamically
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export function PdfToJpgPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    setZipBlob(null);
    setProgress(0);
    
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File exceeds the 50MB limit. Please choose a smaller file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setZipBlob(null);
    setProgress(0);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const totalPages = pdfDoc.numPages;
      
      const zip = new JSZip();
      const baseName = selectedFile.name.replace('.pdf', '');

      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Could not initialize 2D canvas.");

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2.0 scale for high res images
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Fill white background (PDFs by default are transparent if no bg is drawn)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        } as any;
        
        await page.render(renderContext).promise;

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95));
        
        if (blob) {
            const pageNum = String(i).padStart(String(totalPages).length, '0');
            zip.file(`${baseName}_page_${pageNum}.jpg`, blob);
        }
        
        setProgress(Math.round((i / totalPages) * 70));
      }

      setProgress(80);

      const finalZip = await zip.generateAsync({ type: "blob" }, (metadata) => {
         setProgress(80 + Math.round(metadata.percent * 0.2));
      });
      
      setZipBlob(finalZip);
      setProgress(100);
    } catch (err) {
      setError("An error occurred extracting images. The file may be password protected or severely corrupted.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!zipBlob || !selectedFile) return;
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    
    const baseName = selectedFile.name.replace('.pdf', '');
    a.download = `${baseName}-jpgs.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "How does PDF to JPG work?",
      content: "This tool uses a powerful Javascript PDF rendering engine to draw every single page of your PDF file onto a hidden digital canvas, one by one. It then snaps a high-resolution JPEG picture of that canvas and saves it to a zip for you."
    },
    {
      title: "Is my data converted on the cloud?",
      content: "No. Everything occurs inside your web browser. This means conversion speed depends heavily on your own device's CPU rather than server connection speeds, and absolute privacy is guaranteed."
    }
  ];

  return (
    <ToolWrapper
      title="PDF to JPG"
      description="Convert multi-page PDF documents into high-quality JPEG image files instantly in your browser."
      categoryName="PDF Tools"
      categoryPath="/tools/pdf"
    >
      <div className="flex flex-col gap-6 p-6 bg-bg-base border-b border-border-base">
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {!selectedFile ? (
                <div className="space-y-4">
                  <DropZone 
                    onFile={handleFile}
                    onError={(err) => setError(err)}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxSizeMB={50}
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
                            setZipBlob(null);
                            setError(null);
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
                        </div>
                        
                        {zipBlob ? (
                            <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in zoom-in-95 border-2 border-primary/20 rounded-lg bg-primary-light/10 w-full max-w-xs">
                               <ImageIcon className="size-8 text-primary" />
                               <span className="font-medium text-primary truncate w-full text-center">Converted</span>
                               <span className="text-sm text-text-secondary text-center">Ready in .ZIP format</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 p-6 border border-dashed border-border-focus rounded-lg bg-bg-base w-full max-w-xs justify-center min-h-[140px]">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <div className="h-2 w-full bg-border-base rounded-full overflow-hidden">
                                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                                        </div>
                                        <span className="text-sm font-medium text-text-secondary">Rendering images... {progress}%</span>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-col gap-2">
                                        <button
                                            onClick={handleConvert}
                                            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors"
                                        >
                                            <Settings className="size-4" /> Convert to JPG
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                   
                    {zipBlob && (
                        <div className="pt-4 border-t border-border-base w-full flex justify-center">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                            >
                                <Download className="size-5" />
                                Download Images Zip
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
            <h2 className="text-xl font-bold text-text-primary">How to convert PDF to JPG</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Drop your multi-page PDF into the processor.</li>
                 <li><strong>Convert:</strong> Hit the button. Your system's graphical resources will load the document visually and snap High-Definition JPEG shots sequentially.</li>
                 <li><strong>Save Zip:</strong> Click download to get a compressed ZIP folder holding a numbered JPG image variant for every page in the source document.</li>
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

        <RelatedTools currentSlug="pdf-to-jpg" category="pdf" />
      </div>
    </ToolWrapper>
  );
}
