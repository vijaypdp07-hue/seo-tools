import { useState, useRef } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Download, FileImage, Settings, Crop } from "lucide-react";
import ReactCrop, { Crop as CropType, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export function CropImagePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [crop, setCrop] = useState<CropType>({ unit: "%", width: 50, height: 50, x: 25, y: 25 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    setCroppedBlob(null);
    setCroppedUrl(null);
    setCompletedCrop(null);
    
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("File exceeds the 20MB limit. Please choose a smaller file.");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleApplyCrop = async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current || completedCrop.width <= 0 || completedCrop.height <= 0) return;

    try {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      canvas.toBlob((blob) => {
        if (!blob) throw new Error("Canvas is empty");
        setCroppedBlob(blob);
        setCroppedUrl(URL.createObjectURL(blob));
      }, selectedFile?.type || "image/jpeg", 0.95);

    } catch (e) {
      setError("Failed to crop image.");
      console.error(e);
    }
  };

  const handleDownload = () => {
    if (!croppedUrl || !selectedFile) return;
    const a = document.createElement("a");
    a.href = croppedUrl;
    
    let baseName = selectedFile.name;
    const lastDotIndex = baseName.lastIndexOf('.');
    if (lastDotIndex > 0) {
      baseName = baseName.substring(0, lastDotIndex);
    }
    const ext = selectedFile.type === "image/png" ? ".png" : ".jpg";
    
    a.download = `${baseName}-cropped${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(croppedUrl);
  };

  const faqItems = [
    {
      title: "Is my photo uploaded to a server?",
      content: "No. This cropping tool runs entirely on your local device. The picture is loaded into your web browser and modified without ever crossing the internet, ensuring total privacy."
    },
    {
      title: "Does cropping reduce image quality?",
      content: "Cropping technically cuts away pixels from the edges of the image, making the total resolution size smaller, but it retains original clarity and quality of the remaining cropped section."
    }
  ];

  return (
    <ToolWrapper
      title="Crop Image"
      description="Easily crop your photos and images. Free, private, and works directly in your web browser."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col gap-6 p-6 bg-bg-base border-b border-border-base">
        <div className="w-full max-w-5xl mx-auto space-y-6">
            {!selectedFile ? (
                <div className="space-y-4">
                  <DropZone 
                    onFile={handleFile}
                    onError={(err) => setError(err)}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                    maxSizeMB={20}
                  />
                  {error && (
                    <div className="p-4 bg-error-light/50 border border-error/20 rounded-md text-error text-sm">
                      {error}
                    </div>
                  )}
                </div>
            ) : (
                <div className="bg-bg-secondary border border-border-base rounded-xl p-6 flex flex-col space-y-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 border-b border-border-base pb-4">
                        <div className="flex items-center gap-2">
                             <FileImage className="size-5 text-primary" />
                             <span className="font-bold text-text-primary">{selectedFile.name}</span>
                        </div>
                        <button 
                            onClick={() => {
                                setSelectedFile(null);
                                setImageUrl(null);
                                setCroppedBlob(null);
                                setCroppedUrl(null);
                            }}
                            className="text-error hover:underline text-sm font-medium transition-colors"
                        >
                            Start over
                        </button>
                    </div>
                    
                    {!croppedBlob ? (
                        <div className="flex flex-col lg:flex-row gap-6 w-full">
                           <div className="flex-1 bg-white/5 border border-border-base rounded flex items-center justify-center p-4 overflow-auto min-h-[400px]">
                               {imageUrl && (
                                   <ReactCrop
                                      crop={crop}
                                      onChange={(c) => setCrop(c)}
                                      onComplete={(c) => setCompletedCrop(c)}
                                   >
                                      <img 
                                         ref={imgRef}
                                         alt="Crop me" 
                                         src={imageUrl} 
                                         className="max-h-[60vh] object-contain"
                                      />
                                   </ReactCrop>
                               )}
                           </div>
                           
                           <div className="w-full lg:w-72 space-y-6 flex flex-col">
                               <div className="bg-bg-base p-6 border border-border-base rounded-lg space-y-4">
                                  <h3 className="font-bold text-text-primary flex items-center gap-2">
                                     <Crop className="size-5" /> Crop Settings
                                  </h3>
                                  <p className="text-sm text-text-secondary">Drag the edges of the selection box over your image to define the crop area.</p>
                                  
                                  <button
                                      onClick={handleApplyCrop}
                                      disabled={!completedCrop?.width || !completedCrop?.height}
                                      className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                      Apply Crop
                                  </button>
                               </div>
                           </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="p-4 border-2 border-primary/20 bg-white rounded-lg inline-flex justify-center max-w-full">
                                <img src={croppedUrl!} alt="Cropped Result" className="max-h-[50vh] object-contain rounded" />
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setCroppedBlob(null);
                                        setCroppedUrl(null);
                                    }}
                                    className="px-6 py-3 font-semibold text-text-primary border border-border-base rounded-lg hover:bg-bg-base transition-colors"
                                >
                                    Adjust Crop
                                </button>
                                
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool"
                                >
                                    <Download className="size-5" />
                                    Download Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Crop an Image</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Upload:</strong> Start by uploading your picture to the secure sandbox.</li>
                 <li><strong>Drag Select:</strong> Use your mouse or finger to drag a bounding box around the portion of the photo you wish to keep.</li>
                 <li><strong>Apply & Download:</strong> Click apply. The extraneous borders will be deleted instantly, allowing you to download the finalized crop.</li>
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

        <RelatedTools currentSlug="crop-image" category="image" />
      </div>
    </ToolWrapper>
  );
}
