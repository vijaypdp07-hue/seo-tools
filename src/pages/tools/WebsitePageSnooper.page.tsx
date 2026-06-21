import { useState } from "react";
import { Search, Globe, Code, ArrowRight } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function WebsitePageSnooperPage() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSnoop = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/page-snooper?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to inspect website");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Website inspected successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to inspect website");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Website Page Snooper"
      description="Inspect HTTP headers and server response information for any website."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Inspect Website Headers</h3>
                      <p className="text-sm text-text-secondary">Enter the URL to view its HTTP response headers.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSnoop()}
                              placeholder="e.g. example.com or https://example.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleSnoop}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Inspecting...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Inspect
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <Code className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">HTTP Headers</h4>
                      </div>

                      {Object.keys(result.headers || {}).length === 0 ? (
                           <p className="text-text-muted text-sm text-center py-6">No headers returned.</p>
                      ) : (
                          <div className="bg-bg-base rounded-lg border border-border-base p-4 overflow-x-auto">
                              <table className="w-full text-sm text-left">
                                  <tbody>
                                     {Object.entries(result.headers).map(([key, value]) => (
                                         <tr key={key} className="border-b border-border-base last:border-0 hover:bg-bg-secondary transition-colors">
                                             <td className="py-3 px-4 font-bold text-text-primary w-1/3 whitespace-nowrap align-top">{key}</td>
                                             <td className="py-3 px-4 font-mono text-text-secondary break-all">{String(value)}</td>
                                         </tr>
                                     ))}
                                  </tbody>
                              </table>
                          </div>
                      )}
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
