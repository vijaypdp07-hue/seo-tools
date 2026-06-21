import { useState } from "react";
import { Search, Globe, Share2 } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function OpenGraphCheckerPage() {
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
      const response = await fetch(`/api/tools/open-graph-checker?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch Open Graph tags");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Open Graph tags extracted!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to fetch Open Graph details");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Open Graph Checker"
      description="Preview how your webpage looks when shared on Facebook, Twitter, LinkedIn, and more."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Check Open Graph Tags</h3>
                      <p className="text-sm text-text-secondary">Enter a URL to see its Open Graph data.</p>
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
                                Check Tags
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="space-y-6">
                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8">
                          <div className="flex items-center gap-3 border-b border-border-base pb-4 mb-6">
                              <Share2 className="size-6 text-primary" />
                              <h4 className="text-lg font-bold text-text-primary">Social Card Preview</h4>
                          </div>

                          <div className="max-w-[500px] mx-auto border border-border-base rounded-xl overflow-hidden bg-bg-base shadow-sm">
                              {result.ogTags["og:image"] ? (
                                  <div className="w-full h-[260px] bg-bg-secondary border-b border-border-base">
                                      <img src={result.ogTags["og:image"]} alt="OG Preview" className="w-full h-full object-cover" />
                                  </div>
                              ) : (
                                  <div className="w-full h-[260px] bg-bg-secondary border-b border-border-base flex items-center justify-center">
                                      <p className="text-text-muted text-sm border-2 border-dashed border-border-base p-4 rounded-lg">No og:image found</p>
                                  </div>
                              )}
                              <div className="p-4 bg-bg-secondary">
                                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1 truncate">{new URL(url.startsWith('http') ? url : 'https://' + url).hostname}</p>
                                  <h3 className="font-bold text-text-primary text-lg truncate mb-1">{result.ogTags["og:title"] || "No og:title provided"}</h3>
                                  <p className="text-sm text-text-secondary line-clamp-2">{result.ogTags["og:description"] || "No og:description provided"}</p>
                              </div>
                          </div>
                      </div>

                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8">
                          <h4 className="text-lg font-bold text-text-primary border-b border-border-base pb-3 mb-4">All Open Graph Tags</h4>
                          
                          {Object.keys(result.ogTags || {}).length === 0 ? (
                              <p className="text-center text-text-muted bg-bg-base p-6 rounded-lg border border-border-base">No Open Graph tags found on this page.</p>
                          ) : (
                              <div className="bg-bg-base rounded-lg border border-border-base p-4 overflow-x-auto">
                                  <table className="w-full text-sm text-left">
                                      <tbody>
                                         {Object.entries(result.ogTags).map(([key, value]) => (
                                             <tr key={key} className="border-b border-border-base last:border-0 hover:bg-bg-secondary transition-colors">
                                                 <td className="py-3 px-4 font-bold text-text-primary whitespace-nowrap align-top">{key}</td>
                                                 <td className="py-3 px-4 text-text-secondary break-all">{String(value)}</td>
                                             </tr>
                                         ))}
                                      </tbody>
                                  </table>
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
