import { useState, useRef, useEffect } from "react";
import { Download, Film, Image as ImageIcon, Settings } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";
import { toast } from "sonner";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export function VideoToGifPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());
  const [ready, setReady] = useState(false);
  const [fps, setFps] = useState<number>(10);
  const [scale, setScale] = useState<number>(480);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        setReady(true);
    } catch(err) {
        console.error(err);
        toast.error("Failed to load video processing dependencies.");
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setGifUrl(null);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!selectedFile || !ready) return;

    setIsProcessing(true);
    setProgress(0);
    const ffmpeg = ffmpegRef.current;
    try {
      await ffmpeg.writeFile(selectedFile.name, await fetchFile(selectedFile));
      
      // Basic optimization for GIF conversion: fps and scale
      // filter: fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse
      const filterStr = `fps=${fps},scale=${scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;

      await ffmpeg.exec([
        "-i", selectedFile.name,
        "-vf", filterStr,
        "-loop", "0",
        "output.gif"
      ]);

      const data = await ffmpeg.readFile("output.gif");
      const blob = new Blob([data], { type: "image/gif" });
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      
      toast.success("GIF created successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to convert video.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!gifUrl || !selectedFile) return;
    const a = document.createElement("a");
    a.href = gifUrl;
    a.download = `${selectedFile.name.split('.')[0]}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolWrapper
      title="Video to GIF Converter"
      description="Convert MP4, WebM, and other video files into high-quality animated GIFs directly in your browser."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col gap-6 p-6 md:p-8 bg-bg-base border-b border-border-base min-h-[400px]">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {!ready && (
              <div className="p-4 bg-info-light text-info rounded-md text-sm mb-4 animate-pulse">
                 Loading video processing engine...
              </div>
          )}
          {!selectedFile ? (
            <div className="space-y-4">
              <DropZone 
                onFile={handleFile}
                accept={{ 'video/*': ['.mp4', '.webm', '.mov', '.avi'] }}
                maxSizeMB={50}
                onError={(err) => toast.error(err)}
              />
              <p className="text-sm text-text-muted text-center">Supported formats: MP4, WebM, MOV, AVI (Max 50MB)</p>
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-base rounded-xl p-6 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                <button 
                    onClick={() => {
                        setSelectedFile(null);
                        setGifUrl(null);
                        setProgress(0);
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-error text-sm font-medium transition-colors"
                >
                    ✕ Start over
                </button>

                {!gifUrl ? (
                   <div className="w-full max-w-md space-y-6">
                      <div className="flex flex-col items-center gap-2">
                         <Film className="size-12 text-info" />
                         <span className="font-medium text-text-primary text-center truncate max-w-[300px]">{selectedFile.name}</span>
                         <span className="text-sm text-text-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      
                      <div className="space-y-4 bg-bg-base p-4 rounded-lg border border-border-base">
                         <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">FPS (Frames Per Second)</label>
                            <input 
                                type="range" 
                                min="5" max="24" step="1" 
                                value={fps} 
                                onChange={(e) => setFps(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-right text-xs text-text-muted">{fps} FPS</div>
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Max Width (Resolution)</label>
                            <select 
                               value={scale} 
                               onChange={(e) => setScale(Number(e.target.value))}
                               className="w-full p-2 bg-bg-secondary border border-border-base rounded text-sm text-text-primary"
                            >
                                <option value={240}>240px (Small file size)</option>
                                <option value={320}>320px</option>
                                <option value={480}>480px (Recommended)</option>
                                <option value={640}>640px</option>
                            </select>
                         </div>
                      </div>

                      <button
                          onClick={handleConvert}
                          disabled={isProcessing || !ready}
                          className="flex justify-center items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-70 disabled:cursor-not-allowed w-full"
                      >
                          {isProcessing ? (
                              <div className="flex flex-col items-center">
                                  <div className="flex items-center gap-2">
                                     <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                     Converting...
                                  </div>
                                  <div className="text-xs font-normal mt-1 opacity-80">{progress > 0 ? `${progress}%` : 'Processing...'}</div>
                              </div>
                          ) : (
                              <>
                                  <Settings className="size-5" />
                                  Create GIF
                              </>
                          )}
                      </button>
                   </div>
                ) : (
                   <div className="w-full max-w-lg flex flex-col items-center gap-6">
                      <div className="relative rounded-lg overflow-hidden border border-border-base bg-bg-base/50">
                         <img src={gifUrl} alt="Output GIF" className="max-h-[400px] object-contain" />
                      </div>
                      
                      <button
                          onClick={handleDownload}
                          className="flex items-center justify-center gap-2 px-8 py-3 bg-info text-white font-bold rounded-lg hover:bg-info/90 transition-colors shadow-tool hover:shadow-lg w-full max-w-xs animate-in zoom-in-95"
                      >
                          <Download className="size-5" />
                          Download GIF
                      </button>
                   </div>
                )}
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
