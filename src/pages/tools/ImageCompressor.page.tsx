import { useState, useEffect } from "react";
import { Download, File as FileIcon, X, Settings } from "lucide-react";
import imageCompression from "browser-image-compression";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";

export function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Settings
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCompress = async (rawFile: File) => {
      setIsCompressing(true);
      setErrorMsg("");
      try {
        const options = {
            maxSizeMB: 1, // Will try to reach this if possible
            maxWidthOrHeight: maxWidth,
            useWebWorker: true,
            initialQuality: quality / 100,
        };
        const compressed = await imageCompression(rawFile, options);
        setCompressedFile(compressed);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to compress the image. It might be corrupt or unsupported.");
      } finally {
        setIsCompressing(false);
      }
  };

  const onFileSelect = (f: File) => {
      setFile(f);
      setCompressedFile(null);
      handleCompress(f);
  };

  // Re-run compression when settings change if a file exists
  useEffect(() => {
      if (file) {
          // debounce
          const t = setTimeout(() => {
             handleCompress(file);
          }, 500);
          return () => clearTimeout(t);
      }
  }, [quality, maxWidth, file]);

  const handleDownload = () => {
    if (!compressedFile || !file) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="Image Compressor"
      description="Compress JPEG/PNG images instantly in your browser."
      categoryName="Image Tools"
      categoryPath="/tools/image"
      badges={["No Upload required"]}
      seoContent={
        <div>
            <h2>How to use the Image Compressor</h2>
            <ol>
                <li>Drag and drop your image into the drop zone.</li>
                <li>Wait a few moments for the browser to shrink it without sending it over the internet.</li>
                <li>Adjust the quality & width slider if you need further reduction.</li>
                <li>Click Download to save the compressed image.</li>
            </ol>
        </div>
      }
    >
      <div className="flex flex-col border-b border-border-base divide-y divide-border-base">
         
         {!file ? (
             <div className="p-4 bg-bg-secondary">
                 {errorMsg && <p className="text-error mb-2 text-center text-sm font-medium">{errorMsg}</p>}
                 <DropZone 
                     accept="image/jpeg, image/png, image/webp" 
                     maxSizeMB={20} 
                     onFile={onFileSelect} 
                     onError={setErrorMsg} 
                 />
             </div>
         ) : (
             <div className="flex flex-col bg-bg-base">
                 {/* Workspace */}
                 <div className="grid grid-cols-1 md:grid-cols-2">
                     <div className="p-6 border-b md:border-b-0 md:border-r border-border-base space-y-4">
                         <div className="flex justify-between items-center">
                             <h3 className="font-semibold text-text-primary">Original</h3>
                             <button onClick={() => { setFile(null); setCompressedFile(null); }} className="text-sm text-text-muted hover:text-error transition-colors flex items-center gap-1">
                                 <X className="size-4" /> clear
                             </button>
                         </div>
                         <div className="flex bg-bg-secondary p-4 rounded-xl items-center gap-4">
                             <div className="size-16 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
                                 {/* preview */}
                                 <img src={URL.createObjectURL(file)} className="max-w-full max-h-full object-contain rounded" alt="original" />
                             </div>
                             <div>
                                 <p className="font-medium text-sm text-text-primary break-all line-clamp-1">{file.name}</p>
                                 <p className="text-sm text-text-muted">{formatSize(file.size)}</p>
                             </div>
                         </div>
                         
                         <div className="pt-4 border-t border-border-base space-y-4">
                             <div className="flex items-center gap-2 mb-2 font-medium text-sm text-text-primary">
                                 <Settings className="size-4" /> Compression Settings
                             </div>
                             <div className="space-y-1">
                                 <div className="flex justify-between text-sm">
                                     <label className="text-text-secondary">Quality: {quality}%</label>
                                 </div>
                                 <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full accent-primary" />
                             </div>
                             <div className="space-y-1">
                                 <div className="flex justify-between text-sm">
                                     <label className="text-text-secondary">Max Width: {maxWidth}px</label>
                                 </div>
                                 <input type="range" min="500" max="4000" step="100" value={maxWidth} onChange={(e) => setMaxWidth(parseInt(e.target.value))} className="w-full accent-primary" />
                             </div>
                         </div>
                     </div>
                     <div className="p-6 bg-bg-secondary flex flex-col justify-between">
                         <div className="space-y-4">
                             <h3 className="font-semibold text-text-primary">Compressed</h3>
                             {isCompressing || !compressedFile ? (
                                <div className="flex pt-8 items-center justify-center text-text-muted text-sm gap-2">
                                     <div className="size-4 border-2 border-text-muted border-t-primary rounded-full animate-spin" />
                                     Processing...
                                </div>
                             ) : (
                                 <div className="flex bg-success-light/30 border border-success/20 p-4 rounded-xl items-center gap-4">
                                     <div className="size-16 bg-bg-base/50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                        <img src={URL.createObjectURL(compressedFile)} className="max-w-full max-h-full object-contain" alt="compressed output" />
                                     </div>
                                     <div>
                                         <p className="font-medium text-sm text-success">
                                            Saved {(100 - (compressedFile.size / file.size) * 100).toFixed(1)}%
                                         </p>
                                         <p className="text-xl font-bold text-text-primary">{formatSize(compressedFile.size)}</p>
                                     </div>
                                 </div>
                             )}
                         </div>

                         <div className="pt-8">
                             <button 
                                onClick={handleDownload}
                                disabled={isCompressing || !compressedFile}
                                className="w-full flex items-center justify-center py-3 gap-2 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 <Download className="size-5" />
                                 Download Image
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
         )}
      </div>
    </ToolWrapper>
  );
}
