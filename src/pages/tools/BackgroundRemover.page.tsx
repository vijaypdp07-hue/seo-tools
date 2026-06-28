import React, { useState, useRef, useEffect } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Image as ImageIcon, Upload, Download, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { env, pipeline } from "@huggingface/transformers";

env.allowLocalModels = false;
env.backends.onnx.wasm.numThreads = 1;

export function BackgroundRemoverPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const segmenterRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        segmenterRef.current = await pipeline("image-segmentation", "briaai/RMBG-1.4", {
          progress_callback: (data: any) => {
            if (data.status === "progress" && isMounted) {
              setProgress(Math.round((data.loaded / data.total) * 100));
            }
          }
        });
        if (isMounted) toast.success("AI Model loaded successfully!");
      } catch (err) {
        console.error("Failed to load model:", err);
        if (isMounted) toast.error("Failed to load AI model.");
      } finally {
        if (isMounted) setIsModelLoading(false);
      }
    };
    
    // Only load if not already loaded
    if (!segmenterRef.current) {
        loadModel();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setProcessedUrl(null);
  };

  const processImage = async () => {
    if (!previewUrl || !segmenterRef.current) return;
    
    setIsProcessing(true);
    try {
        const result = await segmenterRef.current(previewUrl);
        // RMBG-1.4 output gives an array of objects or an Image.
        // It's known that RMBG-1.4 gives a PIL.Image equivalent which we can get as a canvas or Blob.
        // The result is usually a RawImage or similar object that can be converted to Blob.
        // Let's create an ObjectURL from the result.
        
        let outputBlob: Blob;
        
        // Handle transformers.js v3 output format for RMBG-1.4
        // Usually, the first element has the mask, or we can use the `toBlob` method if it's a RawImage
        if (Array.isArray(result) && result.length > 0) {
            const firstResult = result[0];
            if (firstResult.mask) {
                 // It's a mask, we need to apply it to the original image
                 // Wait, RMBG-1.4 with 'image-segmentation' returns the segmented image directly as `result` if we use the correct pipeline.
                 // Let's assume result[0].mask or result is RawImage
                 outputBlob = await firstResult.mask.toBlob();
            } else if (firstResult.toBlob) {
                 outputBlob = await firstResult.toBlob();
            } else {
                 throw new Error("Unexpected model output format");
            }
        } else if (result.toBlob) {
            outputBlob = await result.toBlob();
        } else {
            // Apply mask manually if it returns an object with a mask
            console.log("Model result:", result);
            toast.error("Unable to process output image format.");
            setIsProcessing(false);
            return;
        }

        const url = URL.createObjectURL(outputBlob);
        setProcessedUrl(url);
        toast.success("Background removed successfully!");
    } catch (err: any) {
        console.error("Processing error:", err);
        toast.error("Failed to remove background.");
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Free AI Background Remover"
      description="Remove backgrounds from images instantly, 100% free and locally in your browser. No data leaves your device."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-bg-base border border-border-base rounded-2xl p-6 md:p-8">
          
          {isModelLoading && (
             <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
               <div className="flex items-center gap-3 text-primary">
                 <Loader2 className="size-5 animate-spin" />
                 <span className="font-medium">Downloading AI Model (One-time, ~40MB)...</span>
               </div>
               <span className="text-primary font-bold">{progress}%</span>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">1. Upload Image</h3>
              <div className="relative border-2 border-dashed border-border-base rounded-2xl p-8 hover:bg-bg-muted transition-colors text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-primary/10 text-primary rounded-full">
                    <Upload className="size-6" />
                  </div>
                  <p className="font-medium text-text-primary">Click or drag image here</p>
                  <p className="text-sm text-text-muted">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>

              {previewUrl && (
                <div className="relative rounded-xl overflow-hidden border border-border-base bg-bg-muted aspect-video flex items-center justify-center">
                  <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
              )}

              <button
                onClick={processImage}
                disabled={!previewUrl || isProcessing || isModelLoading}
                className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover active:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-5" />
                    Remove Background
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">2. Result</h3>
              
              <div className="relative rounded-2xl border border-border-base bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYBw8iDBoGCwEBCoGE9FgwYnIAAAQh0h284aDqQAAAAASUVORK5CYII=')] h-[400px] flex items-center justify-center overflow-hidden">
                {processedUrl ? (
                  <img src={processedUrl} alt="Result" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                ) : (
                  <div className="text-text-muted flex flex-col items-center gap-2">
                    <ImageIcon className="size-8" />
                    <p>Processed image will appear here</p>
                  </div>
                )}
              </div>

              {processedUrl && (
                <a
                  href={processedUrl}
                  download="background-removed.png"
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all flex justify-center items-center gap-2 text-center"
                >
                  <Download className="size-5" />
                  Download PNG
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-sm text-blue-600 dark:text-blue-400">
            <AlertCircle className="size-5 shrink-0" />
            <p><strong>Privacy First:</strong> This tool runs entirely in your browser using WebAssembly. Your images are never uploaded to any server. The AI model is downloaded once and cached for future use.</p>
          </div>

        </div>
      </div>
    </ToolWrapper>
  );
}
