import { useState, useEffect } from "react";
import { Download, FileText, ArrowRight, UploadCloud } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Set worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function PdfToWordPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wordBlobUrl, setWordBlobUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setWordBlobUrl(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Extract items as text segments based on lines
        let lastY, text = "";
        for (let item of textContent.items as any[]) {
            if (lastY !== item.transform[5] && text.length > 0) {
                paragraphs.push(
                    new Paragraph({
                        children: [new TextRun(text)],
                    })
                );
                text = "";
            }
            text += item.str + " ";
            lastY = item.transform[5];
        }
        
        if (text) {
             paragraphs.push(
                new Paragraph({
                    children: [new TextRun(text)],
                })
             );
        }
      }

      // Create DOCX document
      const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }],
      });

      // Generate blob
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      setWordBlobUrl(url);

      toast.success("Conversion completed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to extract text from PDF. The file may be image-based or encrypted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!wordBlobUrl || !selectedFile) return;
    const a = document.createElement("a");
    a.href = wordBlobUrl;
    a.download = `${selectedFile.name.replace(/\.pdf$/i, '')}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolWrapper
      title="PDF to Word Converter"
      description="Extract text from PDF documents and save them as editable Microsoft Word (.docx) files."
      categoryName="PDF Tools"
      categoryPath="/tools/pdf"
    >
      <div className="flex flex-col gap-6 p-6 md:p-8 bg-bg-base border-b border-border-base min-h-[400px]">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {!selectedFile ? (
            <div className="space-y-4">
              <DropZone 
                onFile={handleFile}
                accept={{ 'application/pdf': ['.pdf'] }}
                maxSizeMB={20}
                onError={(err) => toast.error(err)}
              />
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                <button 
                    onClick={() => {
                        setSelectedFile(null);
                        setWordBlobUrl(null);
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                >
                    ✕ Start over
                </button>

                <div className="flex items-center gap-6 justify-center">
                    <div className="flex flex-col items-center gap-2">
                       <FileText className="size-12 text-error" />
                       <span className="font-medium text-text-primary text-center truncate max-w-[200px]">{selectedFile.name}</span>
                    </div>

                    <ArrowRight className="size-6 text-text-muted" />

                    <div className="flex flex-col items-center gap-2">
                       <FileText className={`size-12 ${wordBlobUrl ? 'text-info' : 'text-text-muted'}`} />
                       <span className={`font-medium text-center ${wordBlobUrl ? 'text-info' : 'text-text-secondary'}`}>DOCX Output</span>
                    </div>
                </div>

                {!wordBlobUrl ? (
                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-xs"
                    >
                        {isProcessing ? (
                            <>
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Extracting Text...
                            </>
                        ) : (
                            <>
                                <UploadCloud className="size-5" />
                                Convert to Word
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-info text-white font-bold rounded-lg hover:bg-info/90 transition-colors shadow-tool hover:shadow-lg w-full max-w-xs animate-in zoom-in-95"
                    >
                        <Download className="size-5" />
                        Download .docx
                    </button>
                )}
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
