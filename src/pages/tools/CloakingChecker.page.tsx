import { useState } from "react";
import { Search, Globe, ShieldAlert, CheckCircle, XCircle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function CloakingCheckerPage() {
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
      const response = await fetch(`/api/tools/cloaking-checker?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to check cloaking");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Cloaking check completed!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to check cloaking");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Cloaking Checker"
      description="Check if a website is showing different content to search engines than to regular users."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Check URL for Cloaking</h3>
                      <p className="text-sm text-text-secondary">Enter a URL to see what Googlebot sees compared to a regular browser.</p>
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
                                Check Cloaking
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="space-y-6">
                      <div className={`border rounded-xl p-8 flex items-start gap-4 ${result.isLikelyCloaking ? 'bg-error-light border-error/30' : 'bg-success-light border-success/30'}`}>
                          {result.isLikelyCloaking ? (
                              <XCircle className="size-10 text-error shrink-0" />
                          ) : (
                              <CheckCircle className="size-10 text-success shrink-0" />
                          )}
                          <div>
                              <h4 className={`text-xl font-bold mb-1 ${result.isLikelyCloaking ? 'text-error' : 'text-success'}`}>
                                  {result.isLikelyCloaking ? "Cloaking Detected!" : "No Cloaking Detected"}
                              </h4>
                              <p className={`text-sm ${result.isLikelyCloaking ? 'text-error/80' : 'text-success/80'}`}>
                                  {result.isLikelyCloaking 
                                      ? "The server responded with significantly different content for Googlebot vs a regular browser." 
                                      : "The server responded similarly to both Googlebot and a regular browser."}
                              </p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-bg-secondary border border-border-base rounded-xl p-6">
                              <div className="flex items-center gap-2 mb-4 border-b border-border-base pb-3">
                                  <Globe className="size-5 text-primary" />
                                  <h4 className="font-bold text-text-primary">Regular Browser</h4>
                              </div>
                              <div className="space-y-4">
                                  <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                      <p className="text-xs text-text-muted font-bold tracking-wider mb-1">Status Code</p>
                                      <p className={`text-xl font-bold ${result.normalStatus >= 400 ? 'text-error' : 'text-success'}`}>{result.normalStatus}</p>
                                  </div>
                                  <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                      <p className="text-xs text-text-muted font-bold tracking-wider mb-1">Response Size</p>
                                      <p className="text-lg font-mono text-text-primary">{(result.normalLength / 1024).toFixed(2)} KB</p>
                                  </div>
                              </div>
                          </div>

                          <div className="bg-bg-secondary border border-border-base rounded-xl p-6">
                              <div className="flex items-center gap-2 mb-4 border-b border-border-base pb-3">
                                  <ShieldAlert className="size-5 text-warning" />
                                  <h4 className="font-bold text-text-primary">Googlebot</h4>
                              </div>
                              <div className="space-y-4">
                                  <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                      <p className="text-xs text-text-muted font-bold tracking-wider mb-1">Status Code</p>
                                      <p className={`text-xl font-bold ${result.botStatus >= 400 ? 'text-error' : 'text-success'}`}>{result.botStatus}</p>
                                  </div>
                                  <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                      <p className="text-xs text-text-muted font-bold tracking-wider mb-1">Response Size</p>
                                      <p className="text-lg font-mono text-text-primary">{(result.botLength / 1024).toFixed(2)} KB</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
