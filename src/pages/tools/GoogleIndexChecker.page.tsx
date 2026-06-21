import { useState } from "react";
import { Search, Globe, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import { clsx } from "clsx";

export function GoogleIndexCheckerPage() {
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
      const response = await fetch(`/api/tools/google-index?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
         const errData = await response.json().catch(() => ({}));
         throw new Error(errData.error || "Failed to check Google index");
      }
      
      const data = await response.json();
      setResult(data);
      toast.success("Index status retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Google Index Checker"
      description="Check if a specific URL is indexed by Google."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Page URL</h3>
                      <p className="text-sm text-text-secondary">Enter the URL to check its index status in Google.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. google.com/about"
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
                                Check Index
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className={clsx(
                    "p-8 rounded-xl border text-center space-y-4 flex flex-col items-center",
                    result.isIndexed ? "border-success bg-success-light/20" : "border-error bg-error-light/20"
                  )}>
                      {result.mocked && (
                          <div className="bg-warning-light border border-warning/30 text-warning px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-full max-w-sm mb-4">
                              <AlertTriangle className="size-4" />
                              <span>Showing demo data (API keys not configured)</span>
                          </div>
                      )}

                      {result.isIndexed ? (
                          <div className="size-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
                             <CheckCircle className="size-8" />
                          </div>
                      ) : (
                          <div className="size-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
                             <XCircle className="size-8" />
                          </div>
                      )}
                      
                      <h4 className="text-2xl font-bold text-text-primary">
                          {result.isIndexed ? "URL is Indexed" : "URL is Not Indexed"}
                      </h4>
                      
                      <p className="text-text-secondary max-w-lg mx-auto">
                          {result.isIndexed 
                            ? "This URL appears in Google Search results and is fully indexed."
                            : "This URL does not currently appear in Google Search results."}
                      </p>
                      
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
