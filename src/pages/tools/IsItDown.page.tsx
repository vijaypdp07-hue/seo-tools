import { useState } from "react";
import { Search, Globe, Activity, CheckCircle, XCircle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import { clsx } from "clsx";

export function IsItDownPage() {
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
      const response = await fetch(`/api/tools/server-status?url=${encodeURIComponent(url)}`);
      
      const data = await response.json();
      if (!response.ok && !data.status) {
         setResult({ isUp: false, url });
      } else {
         const isUp = data.status >= 200 && data.status < 400;
         setResult({ ...data, isUp });
      }
      toast.success("Status checked!");
    } catch (error: any) {
      console.error(error);
      setResult({ isUp: false, url });
      toast.error("Website appears to be down.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Is It Down Right Now?"
      description="Check if a website is down for everyone or just you."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Website URL</h3>
                      <p className="text-sm text-text-secondary">Enter the URL to check its status.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. google.com"
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
                                <Activity className="size-4" />
                                Check Status
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className={clsx(
                    "p-8 rounded-xl border text-center space-y-4 flex flex-col items-center",
                    result.isUp ? "border-success bg-success-light/20" : "border-error bg-error-light/20"
                  )}>
                      {result.isUp ? (
                          <div className="size-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
                             <CheckCircle className="size-8" />
                          </div>
                      ) : (
                          <div className="size-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
                             <XCircle className="size-8" />
                          </div>
                      )}
                      
                      <h4 className="text-2xl font-bold text-text-primary">
                          {result.url} is {result.isUp ? "UP" : "DOWN"}
                      </h4>
                      
                      <p className="text-text-secondary max-w-lg mx-auto">
                          {result.isUp 
                            ? "It's just you. The website is responding properly."
                            : "The website is not responding properly. It may be down for everyone."}
                      </p>
                      
                      {result.isUp && (
                          <div className="flex gap-4 mt-4 text-sm font-mono text-text-muted">
                              <span>Status: {result.status} {result.statusText}</span>
                              <span>•</span>
                              <span>Response Time: {result.latencyMs}ms</span>
                          </div>
                      )}
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
