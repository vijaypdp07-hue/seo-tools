import { useState } from "react";
import { Download, FileText, FileUp, Settings } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";
import mammoth from "mammoth";
// @ts-ignore
import html2pdf from "html2pdf.js";

export function WordToPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setPdfBlobUrl(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // 1. Convert Word (.docx) to HTML using mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value; // The generated HTML

      if (!htmlContent) {
          throw new Error("Could not parse DOCX file structure.");
      }

      // Create a hidden wrapper for conversion
      const wrapper = document.createElement("div");
      wrapper.innerHTML = htmlContent;
      // Basic styling for the PDF rendering
      wrapper.style.padding = "20px";
      wrapper.style.fontFamily = "Arial, sans-serif";
      wrapper.style.fontSize = "16px";
      wrapper.style.color = "#000";
      wrapper.style.background = "#fff";
      wrapper.style.width = "800px";

      // 2. Convert HTML to PDF using html2pdf
      const opt = {
        margin:       1,
        filename:     `${selectedFile.name.replace(/\.docx?$/, '')}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      const pdfBlob = await html2pdf().set(opt).from(wrapper).output('blob');
      
      const url = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(url);
      
      toast.success("Conversion successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert Word file. Make sure it is a valid .docx format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlobUrl || !selectedFile) return;
    const a = document.createElement("a");
    a.href = pdfBlobUrl;
    a.download = `${selectedFile.name.replace(/\.docx?$/, '')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolWrapper
      title="Word to PDF Converter"
      description="Convert Microsoft Word (.docx) documents to PDF format instantly within your browser."
      categoryName="PDF Tools"
      categoryPath="/tools/pdf"
    >
      <div className="flex flex-col gap-6 p-6 md:p-8 bg-bg-base border-b border-border-base min-h-[400px]">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {!selectedFile ? (
            <div className="space-y-4">
              <DropZone 
                onFile={handleFile}
                accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
                maxSizeMB={10}
                onError={(err) => toast.error(err)}
              />
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                <button 
                    onClick={() => {
                        setSelectedFile(null);
                        setPdfBlobUrl(null);
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                >
                    ✕ Start over
                </button>

                <div className="flex items-center gap-6 justify-center">
                    <div className="flex flex-col items-center gap-2">
                       <FileUp className="size-12 text-info" />
                       <span className="font-medium text-text-primary text-center truncate max-w-[200px]">{selectedFile.name}</span>
                    </div>

                    <div className="w-12 h-0.5 bg-border-base" />

                    <div className="flex flex-col items-center gap-2">
                       <FileText className={`size-12 ${pdfBlobUrl ? 'text-error' : 'text-text-muted'}`} />
                       <span className={`font-medium text-center ${pdfBlobUrl ? 'text-error' : 'text-text-secondary'}`}>PDF Output</span>
                    </div>
                </div>

                {!pdfBlobUrl ? (
                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-xs"
                    >
                        {isProcessing ? (
                            <>
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <Settings className="size-5" />
                                Convert to PDF
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-error text-white font-bold rounded-lg hover:bg-error/90 transition-colors shadow-tool hover:shadow-lg w-full max-w-xs animate-in zoom-in-95"
                    >
                        <Download className="size-5" />
                        Download PDF
                    </button>
                )}
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
