import { useState } from "react";
import { Download, Wand2, Image as ImageIcon } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";
import potrace from 'potrace';

type ImageToSvgPageProps = {
  title: string;
  slug: string;
  acceptedFormats: Record<string, string[]>;
};

export function ImageToSvgPage({ title, slug, acceptedFormats }: ImageToSvgPageProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setSvgContent(null);
    setIsProcessing(true);

    try {
       // Since the potrace library is primarily a node library, using it in the browser
       // can be tricky. Let's read it into a DataUrl or Buffer-like format.
       const reader = new FileReader();
       
       reader.onload = () => {
           // Basic browser implementation. Notice: true browser-based potrace port
           // might be required if the `potrace` library fails. We use the simplest method:
           potrace.trace(reader.result as string, (err: any, svg: string) => {
               if (err) {
                   setError("Failed to trace image. Try a simpler or smaller image.");
                   setIsProcessing(false);
                   return;
               }
               setSvgContent(svg);
               setIsProcessing(false);
           });
       };
       reader.onerror = () => {
           setError("Failed to read file.");
           setIsProcessing(false);
       };

       reader.readAsDataURL(file);
    } catch (e) {
        console.error(e);
        setError("Error processing image.");
        setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `traced-${slug}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded successfully.");
  };

  return (
    <ToolWrapper
      title={title}
      description="Convert raster images (PNG/JPG) into scalable vector graphics (SVG) using our client-side tracing engine."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-base bg-bg-base border-b border-border-base">
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col gap-6 bg-bg-secondary">
               <DropZone 
                   onFile={handleFile}
                   accept={acceptedFormats}
                   maxSizeMB={5}
                   onError={(err) => setError(err)}
               />
               
               {error && (
                   <div className="p-4 bg-error-light/50 border border-error/20 rounded-md text-error text-sm">
                       {error}
                   </div>
               )}

               {isProcessing && (
                   <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border-focus rounded-lg bg-bg-base py-12">
                       <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                       <span className="text-sm font-medium text-text-secondary">Tracing paths... this may take a moment</span>
                   </div>
               )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 bg-bg-base flex flex-col min-h-[400px]">
                {!svgContent ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-text-muted space-y-4">
                        <div className="p-4 rounded-full bg-bg-tertiary">
                           <Wand2 className="size-8" />
                        </div>
                        <p className="text-sm text-center max-w-[250px]">Your traced vector graphic will appear here once processing is complete.</p>
                    </div>
                ) : (
                    <div className="space-y-6 flex flex-col h-full">
                        <div className="flex-1 flex justify-center items-center overflow-hidden bg-[url('/checkers.svg')] bg-repeat bg-[length:20px_20px] rounded border border-border-base p-4">
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`} className="w-full max-h-[300px] object-contain" alt="Traced SVG" />
                        </div>
                        
                        <button 
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
                        >
                            <Download className="size-5" /> Download SVG
                        </button>
                    </div>
                )}
            </div>
        </div>
    </ToolWrapper>
  );
}
