import { useState } from "react";
import { Search, Globe, FileDigit, HardDrive } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function WebsitePageSizeCheckerPage() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/page-size?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to calculate page size");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Page size calculated!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to calculate page size");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolWrapper
      title="Website Page Size Checker"
      description="Find out the total size of a web page in bytes, kilobytes, and megabytes."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Enter Website URL</h3>
                      <p className="text-sm text-text-secondary">Type the URL of the webpage you want to measure.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. https://example.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleCheck}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Checking...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Check Size
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <HardDrive className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">Page Size Results</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-bg-base p-6 rounded-lg border border-border-base text-center flex flex-col items-center justify-center">
                              <FileDigit className="size-8 text-text-muted mb-2" />
                              <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Bytes</p>
                              <p className="text-xl font-bold text-text-primary font-mono mt-1">{result.sizeBytes.toLocaleString()} B</p>
                          </div>
                          <div className="bg-bg-base p-6 rounded-lg border border-border-base text-center flex flex-col items-center justify-center border-l-4 border-l-primary/30">
                              <FileDigit className="size-8 text-primary mb-2" />
                              <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Kilobytes</p>
                              <p className="text-2xl font-bold text-primary font-mono mt-1">{(result.sizeBytes / 1024).toFixed(2)} KB</p>
                          </div>
                          <div className="bg-bg-base p-6 rounded-lg border border-border-base text-center flex flex-col items-center justify-center">
                              <FileDigit className="size-8 text-text-muted mb-2" />
                              <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Megabytes</p>
                              <p className="text-xl font-bold text-text-primary font-mono mt-1">{(result.sizeBytes / 1024 / 1024).toFixed(4)} MB</p>
                          </div>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
