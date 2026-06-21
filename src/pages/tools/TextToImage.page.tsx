import { useState, useRef, useEffect } from "react";
import { Download, Camera } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

export function TextToImagePage() {
  const [text, setText] = useState("Your text here...");
  const [bgColor, setBgColor] = useState("#2563EB");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(48);
  const [padding, setPadding] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    drawTextOnCanvas();
  }, [text, bgColor, textColor, fontSize, padding]);

  const drawTextOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We don't know the exact dimensions beforehand if we want it to fit the text
    // Let's use a fixed target or dynamically size it
    // For social media posts, a 16:9 or 1:1 format is common
    // Let's dynamically size based on text width with multi-line support
    
    // Setup initial context to calculate text width
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    
    const lines = text.split('\n');
    let maxWidth = 0;
    
    lines.forEach(line => {
        const metrics = ctx.measureText(line);
        if (metrics.width > maxWidth) {
            maxWidth = metrics.width;
        }
    });

    const canvasWidth = maxWidth + padding * 2;
    const lineHeight = fontSize * 1.3;
    const canvasHeight = (lines.length * lineHeight) + padding * 2;

    // Minimum size to make it look good
    canvas.width = Math.max(canvasWidth, 400);
    canvas.height = Math.max(canvasHeight, 200);

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const startY = (canvas.height - (lines.length * lineHeight)) / 2 + (fontSize / 2);
    
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
    });

    setImgUrl(canvas.toDataURL("image/png"));
  };

  const handleDownload = () => {
    if (!imgUrl) return;
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "text-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolWrapper
      title="Text to Image"
      description="Convert text or quotes into beautiful, downloadable images."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use Text to Image Converter</h2>
            <ol>
                <li>Type your quote, announcement, or text in the text area.</li>
                <li>Adjust the background color and text color using the color pickers.</li>
                <li>Modify the font size and padding to fit your needs.</li>
                <li>Click the Download button to save your image as a PNG file.</li>
            </ol>
            <p>This tool runs entirely on your device using the HTML5 Canvas API. It instantly converts your text into image format without any uploads.</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-base border-b border-border-base">
         <div className="p-6 md:col-span-1 bg-bg-base space-y-6">
             <div className="space-y-2">
                 <label className="text-sm font-medium text-text-primary focus-within:text-primary">Text Content</label>
                 <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-32 p-3 bg-bg-secondary text-text-primary border border-border-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                 />
             </div>
             
             <div className="space-y-4 pt-2">
                 <div className="flex items-center justify-between gap-4">
                     <label className="text-sm font-medium text-text-primary">Background</label>
                     <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-border-base p-1" />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                     <label className="text-sm font-medium text-text-primary">Text Color</label>
                     <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-border-base p-1" />
                 </div>
                 <div className="space-y-2 pt-2 border-t border-border-base">
                     <div className="flex justify-between items-center text-sm font-medium text-text-primary">
                         <label>Font Size</label>
                         <span className="text-text-muted">{fontSize}px</span>
                     </div>
                     <input type="range" min="16" max="120" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full accent-primary" />
                 </div>
                 <div className="space-y-2">
                     <div className="flex justify-between items-center text-sm font-medium text-text-primary">
                         <label>Padding</label>
                         <span className="text-text-muted">{padding}px</span>
                     </div>
                     <input type="range" min="20" max="200" value={padding} onChange={e => setPadding(parseInt(e.target.value))} className="w-full accent-primary" />
                 </div>
             </div>
         </div>
         
         <div className="p-6 md:col-span-2 bg-bg-secondary flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold text-text-primary">Preview</h3>
                 <button 
                     onClick={handleDownload}
                     className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
                 >
                     <Download className="size-4" /> Download PNG
                 </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center border border-border-base border-dashed rounded-xl bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZkA1g/E/IQgGww0gBmAQQIMeK4w2gCgAhmZ8BpsnAwB3GSE0/pS7mAAAAABJRU5ErkJggg==')] bg-repeat p-4 min-h-[300px] overflow-hidden">
                  <div className="shadow-lg max-w-full overflow-auto rounded-lg">
                      <canvas ref={canvasRef} className="hidden" />
                      {imgUrl && <img src={imgUrl} alt="Text Output" className="max-w-full max-h-[500px] object-contain rounded-lg" />}
                  </div>
              </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
