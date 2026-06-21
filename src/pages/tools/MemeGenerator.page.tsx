import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Download, UploadCloud, Settings, Trash2 } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";

export function MemeGeneratorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(40);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgRef.current;
    
    // Calculate aspect ratio keeping max width 600px
    const maxWidth = 600;
    const scale = Math.min(1, maxWidth / img.width);
    const width = img.width * scale;
    const height = img.height * scale;

    canvas.width = width;
    canvas.height = height;

    // Draw Image
    ctx.drawImage(img, 0, 0, width, height);

    // Setup Text
    ctx.font = `bold ${fontSize}px Impact, sans-serif`;
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, fontSize / 10);
    ctx.textAlign = "center";
    
    const x = width / 2;
    // Multi-line support could be added, but keeping it simple for MVP
    
    const maxTextWidth = width - 40;
    
    const drawText = (text: string, yPos: number, isBottom: boolean) => {
        let currentFontSize = fontSize;
        ctx.font = `bold ${currentFontSize}px Impact, sans-serif`;
        
        while (ctx.measureText(text).width > maxTextWidth && currentFontSize > 10) {
            currentFontSize -= 2;
            ctx.font = `bold ${currentFontSize}px Impact, sans-serif`;
            ctx.lineWidth = Math.max(1, currentFontSize / 10);
        }
        
        // Add vertical padding
        const finalY = isBottom ? yPos - (fontSize - currentFontSize) : yPos;
        
        ctx.strokeText(text.toUpperCase(), x, finalY);
        ctx.fillText(text.toUpperCase(), x, finalY);
    };

    // Top Text
    if (topText) {
        ctx.textBaseline = "top";
        drawText(topText, 20, false);
    }
    
    // Bottom Text
    if (bottomText) {
        ctx.textBaseline = "bottom";
        drawText(bottomText, height - 20, true);
    }
  };

  useEffect(() => {
    if (imageSrc) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            imgRef.current = img;
            drawMeme();
        };
        img.src = imageSrc;
    }
  }, [imageSrc]);

  useEffect(() => {
      drawMeme();
  }, [topText, bottomText, fontSize, fontColor, strokeColor]);

  const handleFile = (file: File) => {
      if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file.");
          return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
          if (e.target?.result) {
              setImageSrc(e.target.result as string);
          }
      };
      reader.readAsDataURL(file);
  };

  const handleDownload = () => {
      const canvas = canvasRef.current;
      if (!canvas || !imageSrc) return;
      
      const a = document.createElement("a");
      a.download = `meme-${Date.now()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      toast.success("Meme downloaded!");
  };

  return (
    <ToolWrapper
      title="Meme Generator"
      description="Create dark humor or funny memes by adding custom text to your images instantly."
      categoryName="Image Tools"
      categoryPath="/tools/image"
      seoContent={
          <div>
            <h2>How to generate a meme online?</h2>
            <ol>
              <li>Upload your base image or template.</li>
              <li>Input top and bottom text snippets.</li>
              <li>Change font settings like colors and size in real-time.</li>
              <li>Download your completely customized and water-mark free meme image!</li>
            </ol>
            <p>Runs offline entirely within the browser via HTML5 Canvas API without collecting your photos.</p>
          </div>
      }
    >
      <div className="flex flex-col md:flex-row bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base min-h-[500px]">
          <div className="w-full md:w-1/3 p-6 flex flex-col gap-6 bg-bg-secondary">
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
                 <div className="space-y-6">
                     <div className="flex justify-between items-center pb-4 border-b border-border-base">
                         <h3 className="font-semibold text-text-primary flex items-center gap-2"><Settings className="size-4" /> Layout Controls</h3>
                         <button onClick={() => setImageSrc(null)} className="text-sm text-error hover:underline flex items-center gap-1">
                             <Trash2 className="size-3" /> Change Image
                         </button>
                     </div>
                     
                     <div className="space-y-3">
                         <label className="text-sm font-medium text-text-primary">Top Text</label>
                         <textarea 
                             value={topText} 
                             onChange={(e) => setTopText(e.target.value)} 
                             className="w-full p-3 bg-bg-base border border-border-base rounded flex-1 focus:ring-2 focus:ring-primary/20 resize-none h-20"
                         />
                     </div>
                     <div className="space-y-3">
                         <label className="text-sm font-medium text-text-primary">Bottom Text</label>
                         <textarea 
                             value={bottomText} 
                             onChange={(e) => setBottomText(e.target.value)} 
                             className="w-full p-3 bg-bg-base border border-border-base rounded flex-1 focus:ring-2 focus:ring-primary/20 resize-none h-20"
                         />
                     </div>
                     
                     <div className="space-y-3 pt-4 border-t border-border-base">
                         <div className="flex justify-between items-center text-sm font-medium text-text-primary">
                             <label>Font Size</label>
                             <span className="text-primary">{fontSize}px</span>
                         </div>
                         <input 
                             type="range" min="10" max="100" value={fontSize} 
                             onChange={(e) => setFontSize(Number(e.target.value))}
                             className="w-full accent-primary" 
                         />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <label className="text-sm font-medium text-text-primary">Fill Color</label>
                             <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="w-full h-10 cursor-pointer rounded bg-transparent" />
                         </div>
                         <div className="space-y-2">
                             <label className="text-sm font-medium text-text-primary">Stroke Color</label>
                             <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-full h-10 cursor-pointer rounded bg-transparent" />
                         </div>
                     </div>
                 </div>
             )}
          </div>
          <div className="w-full md:w-2/3 p-6 flex items-center justify-center bg-[url('/checkers.svg')] bg-repeat bg-[length:20px_20px]">
              {imageSrc ? (
                  <div className="flex flex-col items-center gap-6">
                      <div className="shadow-xl rounded overflow-hidden max-w-full">
                         <canvas ref={canvasRef} className="max-w-full h-auto object-contain bg-white" />
                      </div>
                      <button 
                         onClick={handleDownload}
                         className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                      >
                         <Download className="size-5" /> Download Meme
                      </button>
                  </div>
              ) : (
                  <div className="flex flex-col items-center text-text-muted space-y-4 max-w-sm text-center">
                      <div className="p-4 rounded-full bg-white shadow-sm border border-border-base">
                          <UploadCloud className="size-8 text-border-focus" />
                      </div>
                      <p>Upload an image template to start creating your meme. Preview and controls will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </ToolWrapper>
  );
}
