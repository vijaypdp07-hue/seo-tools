import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileText, Settings, SplitSquareHorizontal } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export function SplitPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

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

  const handleSplit = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setZipBlob(null);
    setProgress(0);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const totalPages = sourcePdf.getPageCount();
      
      const zip = new JSZip();
      
      const baseName = selectedFile.name.replace('.pdf', '');

      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        
        // Ensure formatting has leading zeros for correct sorting (e.g., page-01, page-02)
        const pageNum = String(i + 1).padStart(String(totalPages).length, '0');
        zip.file(`${baseName}_page_${pageNum}.pdf`, pdfBytes);
        
        setProgress(Math.round(((i + 1) / totalPages) * 70));
      }

      setProgress(80);

      // Generate the ZIP file
      const finalZip = await zip.generateAsync({ type: "blob" }, (metadata) => {
         setProgress(80 + Math.round(metadata.percent * 0.2));
      });
      
      setZipBlob(finalZip);
      setProgress(100);
    } catch (err) {
      setError("An error occurred splitting the PDF. The file may be password protected or corrupted.");
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
    
    a.download = `${baseName}-split-pages.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "How does splitting work?",
      content: "This tool copies the graphical data sequence from every individual page within your original uploaded document, then generates an independent unique 1-page PDF file for each sheet. These are then clustered into a ZIP folder for single-click downloading."
    },
    {
      title: "Is there a limit to how many pages I can split?",
      content: "There's no hard limit on the number of pages, but heavily massive files (over 50MB) may timeout or exhaust your web browser's RAM memory limits since everything runs offline on your own machine."
    }
  ];

  return (
    <ToolWrapper
      title="Split PDF"
      description="Extract every page of your PDF document into individual self-contained PDF files bundled inside a zip."
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
                           <FileText className="size-8 text-text-muted" />
                           <span className="font-medium text-text-primary truncate w-full text-center">{selectedFile.name}</span>
                        </div>
                        
                        {zipBlob ? (
                            <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in zoom-in-95 border-2 border-primary/20 rounded-lg bg-primary-light/10 w-full max-w-xs">
                               <SplitSquareHorizontal className="size-8 text-primary" />
                               <span className="font-medium text-primary truncate w-full text-center">Split Successful</span>
                               <span className="text-sm text-text-secondary text-center">Ready in .ZIP format</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 p-6 border border-dashed border-border-focus rounded-lg bg-bg-base w-full max-w-xs justify-center min-h-[140px]">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <div className="h-2 w-full bg-border-base rounded-full overflow-hidden">
                                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                                        </div>
                                        <span className="text-sm font-medium text-text-secondary">Extracting pages... {progress}%</span>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-col gap-2">
                                        <button
                                            onClick={handleSplit}
                                            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors"
                                        >
                                            <Settings className="size-4" /> Extract All Pages
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
                                Download Zip Bundle
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
            <h2 className="text-xl font-bold text-text-primary">How to Split PDF pages</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Drop your multi-page PDF into the web dropzone.</li>
                 <li><strong>Extract:</strong> Click the extract button. The system scripts will disassemble your single heavy file into an array of isolated single-page documents.</li>
                 <li><strong>Save Zip:</strong> Click download to get a compressed ZIP package containing every unique page named sequentially (like doc_page_01.pdf).</li>
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

        <RelatedTools currentSlug="split-pdf" category="pdf" />
      </div>
    </ToolWrapper>
  );
}
