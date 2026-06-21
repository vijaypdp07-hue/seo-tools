import { useState } from "react";
import { Server, Search, Activity, CheckCircle, XCircle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function CheckServerStatusPage() {
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
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to check server status");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Server status checked successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to check server status");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Check Server Status"
      description="Check if a website or server is online and responding to requests."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Enter Website URL</h3>
                      <p className="text-sm text-text-secondary">Type the domain name or full URL of the server you want to check.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Server className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. example.com or https://example.com"
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
                                Check Status
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <Activity className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">Status Results</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                              <p className="text-sm text-text-muted font-medium mb-1">Target URL</p>
                              <p className="text-text-primary font-mono text-sm break-all">{result.url}</p>
                          </div>
                          <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                              <p className="text-sm text-text-muted font-medium mb-1">Response Time</p>
                              <p className="text-text-primary font-mono">{result.latencyMs} ms</p>
                          </div>
                          <div className="bg-bg-base p-4 rounded-lg border border-border-base md:col-span-2 flex items-center gap-4">
                              {result.status >= 200 && result.status < 400 ? (
                                  <CheckCircle className="size-8 text-success" />
                              ) : (
                                  <XCircle className="size-8 text-error" />
                              )}
                              <div>
                                 <p className="text-sm text-text-muted font-medium mb-1">HTTP Status Code</p>
                                 <p className="text-text-primary font-bold text-xl">{result.status} <span className="text-text-secondary text-base font-normal ml-2">{result.statusText}</span></p>
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
