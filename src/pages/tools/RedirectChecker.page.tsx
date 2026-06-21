import { useState } from "react";
import { Search, Globe, Link2, Download, AlertTriangle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function RedirectCheckerPage() {
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
      const response = await fetch(`/api/tools/redirect-checker?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to check redirects");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Redirect chain generated!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to check redirects");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Redirect Checker"
      description="Trace the path a URL takes, identifying 301, 302 redirects and the final destination."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">URL to check</h3>
                      <p className="text-sm text-text-secondary">Enter the starting URL to trace its redirect chain.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. https://bit.ly/example"
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
                                Tracing...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Trace URL
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <Link2 className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">Redirect Chain</h4>
                      </div>

                      <div className="space-y-4">
                          {result.chain && result.chain.length > 0 ? (
                              <div className="flex flex-col relative w-full pt-4 pb-4">
                                  <div className="absolute top-[28px] bottom-[28px] left-[27px] w-0.5 bg-border-base z-0"></div>
                                  
                                  {result.chain.map((step: any, index: number) => {
                                      const isLast = index === result.chain.length - 1;
                                      const isError = step.status >= 400;
                                      
                                      return (
                                          <div key={index} className="flex gap-4 relative z-10 mb-6 last:mb-0">
                                              <div className={`mt-0.5 w-14 h-14 rounded-full border-4 border-bg-secondary flex items-center justify-center shrink-0 ${
                                                  isLast && !isError ? 'bg-success text-white' : 
                                                  isError ? 'bg-error text-white' : 
                                                  'bg-primary text-white'
                                              }`}>
                                                  <span className="font-bold text-sm tracking-tight">{step.status}</span>
                                              </div>
                                              <div className="bg-bg-base border border-border-base rounded-lg p-4 flex-1 shadow-sm overflow-hidden break-words">
                                                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                                                      {index === 0 ? "Initial Request" : (isLast ? "Final Destination" : `Redirect \${index}`)}
                                                  </p>
                                                  <div className="flex justify-between items-start">
                                                      <a href={step.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium text-sm break-all pr-4">
                                                          {step.url}
                                                      </a>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          ) : (
                              <div className="bg-warning-light text-warning border border-warning/30 p-6 rounded-lg flex items-center gap-3">
                                  <AlertTriangle className="size-6" />
                                  <p className="font-medium">No redirects detected or unable to trace this URL.</p>
                              </div>
                          )}
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
