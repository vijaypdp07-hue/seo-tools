import { useState, useRef } from "react";
import { Copy, Wand2, Download, Trash2, FileText, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";
import Tesseract from "tesseract.js";

type OcrPageProps = {
    title: string;
    categoryPath: string;
    categoryName: string;
};

export function OcrPage({ title, categoryPath, categoryName }: OcrPageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
        setText("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExtract = async () => {
    if (!imageSrc) return;
    setIsProcessing(true);
    setProgress(0);
    setText("");
    setStatusText("Initializing engine...");

    try {
      const result = await Tesseract.recognize(
        imageSrc,
        'eng',
        {
          logger: (m) => {
             if (m.status === "recognizing text") {
                 setProgress(Math.round(m.progress * 100));
                 setStatusText(`Recognizing text... ${Math.round(m.progress * 100)}%`);
             } else {
                 setStatusText(m.status);
             }
          }
        }
      );
      
      setText(result.data.text);
      toast.success("Text extracted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during text extraction.");
    } finally {
      setIsProcessing(false);
      setProgress(100);
      setStatusText("Complete");
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setImageSrc(null);
    setText("");
    setProgress(0);
    setStatusText("");
  };

  return (
    <ToolWrapper
      title={title}
      description="Extract text from images automatically using Optical Character Recognition (OCR)."
      categoryName={categoryName}
      categoryPath={categoryPath}
      seoContent={
          <div>
            <h2>How to Extract Text from an Image</h2>
            <ol>
              <li>Upload your image (JPG, PNG, WebP) into the drop zone.</li>
              <li>Click the "Extract Text" button to start securely analyzing the image.</li>
              <li>Once processing is done, your extracted text will appear in the result box.</li>
              <li>Copy your text to use elsewhere.</li>
            </ol>
            <p>Our Optical Character Recognition engine runs completely in your web browser. This means your images are never sent to external servers, providing 100% data privacy.</p>
          </div>
      }
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-base bg-bg-base border-b border-border-base min-h-[500px]">
        {/* Input Phase */}
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-6 bg-bg-secondary">
          {!imageSrc ? (
              <div className="h-full flex flex-col justify-center">
                 <DropZone 
                     onFile={handleFile}
                     accept={{'image/*': ['.png', '.jpg', '.jpeg', '.webp']}}
                     maxSizeMB={10}
                     onError={(err) => toast.error(err)}
                 />
              </div>
          ) : (
              <div className="space-y-6 flex flex-col h-full">
                  <div className="flex justify-between items-center pb-4 border-b border-border-base">
                      <h3 className="font-semibold text-text-primary flex items-center gap-2"><FileText className="size-4" /> Image Preview</h3>
                      <button onClick={handleClear} disabled={isProcessing} className="text-sm text-error hover:underline flex items-center gap-1 disabled:opacity-50">
                          <Trash2 className="size-3" /> Start Over
                      </button>
                  </div>
                  
                  <div className="flex-1 flex justify-center items-center overflow-hidden bg-[url('/checkers.svg')] bg-repeat bg-[length:20px_20px] rounded border border-border-base">
                      <img src={imageSrc} alt="Preview" className="max-h-[300px] object-contain" />
                  </div>

                  {!text && (
                      <button 
                          onClick={handleExtract}
                          disabled={isProcessing}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                          {isProcessing ? (
                              <div className="flex items-center gap-3">
                                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>{statusText || "Processing..."}</span>
                              </div>
                          ) : (
                              <>
                                 <Wand2 className="size-5" /> Extract Text
                              </>
                          )}
                      </button>
                  )}
              </div>
          )}
        </div>

        {/* Output Phase */}
        <div className="w-full md:w-1/2 flex flex-col bg-bg-base">
            <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
                <span className="text-sm font-medium text-text-primary px-2">Extracted Text</span>
                <button 
                    onClick={handleCopy}
                    disabled={!text}
                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />} Copy Text
                </button>
            </div>
            {text ? (
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 w-full p-6 bg-transparent text-text-primary resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20"
                />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-text-muted space-y-3">
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-[200px]">
                            <div className="h-2 w-full bg-border-base rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-sm text-text-secondary">{statusText}</span>
                        </div>
                    ) : (
                        <>
                           <div className="p-3 rounded-full bg-bg-tertiary">
                               <FileText className="size-6" />
                           </div>
                           <p className="text-sm">Click "Extract Text" and your result will appear here.</p>
                        </>
                    )}
                </div>
            )}
        </div>
      </div>
    </ToolWrapper>
  );
}
