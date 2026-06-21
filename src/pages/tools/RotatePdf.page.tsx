import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileText, Settings, RotateCw, RotateCcw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

export function RotatePdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    setRotatedBlob(null);
    setRotationDegrees(90);
    
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

  const handleRotate = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setRotatedBlob(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotationDegrees));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setRotatedBlob(blob);
    } catch (err) {
      setError("An error occurred rotating the PDF. The file may be corrupted or password-protected.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedBlob || !selectedFile) return;
    const url = URL.createObjectURL(rotatedBlob);
    const a = document.createElement("a");
    a.href = url;
    
    let baseName = selectedFile.name;
    const lastDotIndex = baseName.lastIndexOf('.');
    if (lastDotIndex > 0) {
      baseName = baseName.substring(0, lastDotIndex);
    }
    
    a.download = `${baseName}-rotated.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "Is my PDF uploaded to a server?",
      content: "No, this tool uses your browser's local memory to manipulate the PDF structure. The file never leaves your computer, ensuring absolute privacy."
    },
    {
      title: "Can I rotate specific pages?",
      content: "Currently, this utility rotates **every page** in the document simultaneously to save you time. Advanced single-page selection will be available in robust future updates."
    }
  ];

  return (
    <ToolWrapper
      title="Rotate PDF"
      description="Rotate your PDF pages clockwise or counter-clockwise permanently directly within your browser."
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
                            setRotatedBlob(null);
                            setRotationDegrees(90);
                        }}
                        className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                    >
                        ✕ Start over
                    </button>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
                        <div className="flex flex-col items-center gap-2 p-4 border border-border-base rounded-lg bg-bg-base w-full max-w-xs">
                           <FileText className="size-8 text-text-muted" />
                           <span className="font-medium text-text-primary truncate w-full text-center">{selectedFile.name}</span>
                           <span className="text-xl font-bold">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                        
                        {rotatedBlob ? (
                            <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in zoom-in-95 border-2 border-primary/20 rounded-lg bg-primary-light/10 w-full max-w-xs">
                               <FileText className="size-8 text-primary" />
                               <span className="font-medium text-primary truncate w-full text-center">Rotated</span>
                               <span className="text-xl font-bold text-primary">Ready</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 p-6 border border-dashed border-border-focus rounded-lg bg-bg-base w-full max-w-xs justify-center min-h-[140px]">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <div className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium text-text-secondary">Rotating...</span>
                                    </div>
                                ) : (
                                    <div className="w-full flex justify-center gap-2 mb-4">
                                        <button
                                            onClick={() => setRotationDegrees((prev) => (prev - 90) % 360)}
                                            className="flex-1 flex flex-col items-center gap-2 p-3 border border-border-base rounded hover:bg-bg-tertiary transition-colors"
                                        >
                                            <RotateCcw className="size-5" /> 
                                            <span className="text-xs font-medium">Left -90°</span>
                                        </button>
                                        <button
                                            onClick={() => setRotationDegrees((prev) => (prev + 90) % 360)}
                                            className="flex-1 flex flex-col items-center gap-2 p-3 border border-border-base rounded hover:bg-bg-tertiary transition-colors"
                                        >
                                            <RotateCw className="size-5" /> 
                                            <span className="text-xs font-medium">Right +90°</span>
                                        </button>
                                    </div>
                                )}
                                
                                {!isProcessing && (
                                     <button
                                        onClick={handleRotate}
                                        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors"
                                     >
                                        <Settings className="size-4" /> Apply {rotationDegrees}°
                                     </button>
                                )}
                            </div>
                        )}
                    </div>
                   
                    {rotatedBlob && (
                        <div className="pt-4 border-t border-border-base w-full flex justify-center">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                            >
                                <Download className="size-5" />
                                Download Rotated PDF
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
            <h2 className="text-xl font-bold text-text-primary">How to adjust PDF orientation</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Start by uploading your PDF document into the designated drop zone.</li>
                 <li><strong>Rotate Angle:</strong> Toggle the Right (+90) or Left (-90) rotation options until the targeted degree offset aligns correctly.</li>
                 <li><strong>Apply & Download:</strong> Process the rotation using your web browser permanently and save the updated file directly to your files.</li>
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

        <RelatedTools currentSlug="rotate-pdf" category="pdf" />
      </div>
    </ToolWrapper>
  );
}
