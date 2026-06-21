import { useState, useRef } from "react";
import { Download, X } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";

export function ConvertToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = (f: File) => {
    setIsProcessing(true);
    setErrorMsg("");
    setJpgUrl(null);

    const img = new Image();
    const objectUrl = URL.createObjectURL(f);
    
    img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fill white background in case image is transparent PNG
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setJpgUrl(dataUrl);
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
        setErrorMsg("Failed to decode the image. Please upload a valid picture.");
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
    }
    
    img.src = objectUrl;
  };

  const onFileSelect = (f: File) => {
      setFile(f);
      processImage(f);
  };

  return (
    <ToolWrapper
      title="Convert To JPG"
      description="Convert PNG, WEBP, or GIF images to standard JPG format."
      categoryName="Image Tools"
      categoryPath="/tools/image"
      seoContent={
          <div>
              <h2>How to Convert to JPG</h2>
              <ol>
                  <li>Upload your image using the file dropper.</li>
                  <li>Our tool instantly paints it onto a virtual canvas and extracts a pristine JPG format.</li>
                  <li>Click download to save the result.</li>
              </ol>
          </div>
      }
    >
      <div className="flex flex-col border-b border-border-base relative">
          {/* Hidden Canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />

          {!file ? (
             <div className="p-4 bg-bg-secondary">
                 {errorMsg && <p className="text-error mb-2 text-center text-sm font-medium">{errorMsg}</p>}
                 <DropZone 
                     accept="image/png, image/webp, image/gif" 
                     maxSizeMB={20} 
                     onFile={onFileSelect} 
                     onError={setErrorMsg} 
                     title="Drop a PNG/WEBP to convert to JPG"
                 />
             </div>
         ) : (
             <div className="flex flex-col bg-bg-base items-center justify-center p-8 text-center space-y-6">
                 {isProcessing ? (
                     <div className="flex flex-col items-center text-text-muted p-12">
                         <div className="size-8 border-4 border-text-muted border-t-primary rounded-full animate-spin mb-4" />
                         <p>Converting to JPG...</p>
                     </div>
                 ) : (
                     <>
                        <div className="bg-success-light text-success font-medium px-4 py-2 rounded-full inline-flex items-center gap-2">
                            ✓ Converted Successfully
                        </div>

                        {jpgUrl && (
                            <img src={jpgUrl} alt="Converted preview" className="max-w-full max-h-[300px] object-contain border border-border-base rounded-md" />
                        )}

                        <div className="flex gap-4">
                            <button 
                                onClick={() => setFile(null)}
                                className="px-6 py-2 bg-bg-secondary border border-border-base font-medium rounded-lg hover:bg-bg-tertiary transition-colors"
                            >
                                Convert Another
                            </button>
                            {jpgUrl && (
                                <a 
                                    href={jpgUrl}
                                    download={`converted-${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
                                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                                >
                                    <Download className="size-4" /> Download JPG
                                </a>
                            )}
                        </div>
                     </>
                 )}
             </div>
         )}
      </div>
    </ToolWrapper>
  );
}
