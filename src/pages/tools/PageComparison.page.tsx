import { useState } from "react";
import { Search, Globe, Link2, Download, AlertTriangle, FileText, ArrowRightLeft } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function PageComparisonPage() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url1.trim() || !url2.trim()) {
      toast.error("Please enter both URLs.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/page-comparison?url1=${encodeURIComponent(url1)}&url2=${encodeURIComponent(url2)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to compare pages");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Pages compared successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to compare pages");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Page Comparison"
      description="Compare two webpages to see their differences in size, similarity, and status."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-6">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Compare Two Webpages</h3>
                      <p className="text-sm text-text-secondary">Enter two URLs to compare their basic HTML properties.</p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                      <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url1}
                              onChange={(e) => setUrl1(e.target.value)}
                              placeholder="URL 1 (e.g. https://example.com/page1)"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                          />
                      </div>
                      <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url2}
                              onChange={(e) => setUrl2(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="URL 2 (e.g. https://example.com/page2)"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                          />
                      </div>
                      <button
                          onClick={handleCheck}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-70 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Comparing...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Compare Pages
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="space-y-6">
                      <div className="bg-bg-secondary border border-border-base rounded-xl overflow-hidden flex flex-col md:flex-row">
                          <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border-base">
                             <div className="size-16 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">
                                <FileText className="size-8" />
                             </div>
                             <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">URL 1 Status</p>
                             <p className={`text-3xl font-bold ${result.status1 >= 400 ? 'text-error' : 'text-success'}`}>{result.status1}</p>
                             <p className="text-sm text-text-secondary mt-1 max-w-[250px] truncate" title={result.url1}>{result.url1}</p>
                          </div>
                          
                          <div className="hidden md:flex flex-col items-center justify-center bg-bg-base px-6">
                             <ArrowRightLeft className="size-6 text-text-muted" />
                          </div>

                          <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center text-center md:border-l border-border-base">
                             <div className="size-16 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">
                                <FileText className="size-8" />
                             </div>
                             <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">URL 2 Status</p>
                             <p className={`text-3xl font-bold ${result.status2 >= 400 ? 'text-error' : 'text-success'}`}>{result.status2}</p>
                             <p className="text-sm text-text-secondary mt-1 max-w-[250px] truncate" title={result.url2}>{result.url2}</p>
                          </div>
                      </div>

                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                          <h4 className="text-lg font-bold text-text-primary border-b border-border-base pb-3">Comparison Stats</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Page Size</p>
                                  <div className="flex justify-between items-center mt-2">
                                     <div className="text-left w-1/2 pr-2">
                                        <p className="text-xs text-text-muted truncate mb-1" title={result.url1}>{result.url1}</p>
                                        <p className="text-text-primary font-mono text-sm">{(result.size1 / 1024).toFixed(2)} KB</p>
                                     </div>
                                     <div className="text-right w-1/2 border-l border-border-base pl-2">
                                        <p className="text-xs text-text-muted truncate mb-1" title={result.url2}>{result.url2}</p>
                                        <p className="text-text-primary font-mono text-sm">{(result.size2 / 1024).toFixed(2)} KB</p>
                                     </div>
                                  </div>
                              </div>
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base flex flex-col justify-center">
                                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">HTML Size Similarity</p>
                                  <div className="flex items-end gap-2 mt-2">
                                      <p className="text-3xl font-bold text-primary">{result.similarityPercentage}%</p>
                                      <p className="text-sm text-text-muted mb-1">similar by byte weight</p>
                                  </div>
                              </div>
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base md:col-span-2">
                                  <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Page Titles</p>
                                  <div className="mt-3 space-y-3">
                                      <div>
                                          <span className="text-xs font-bold text-primary mr-2">URL 1</span>
                                          <span className="text-sm text-text-primary">{result.title1 || <em className="text-text-muted">No title</em>}</span>
                                      </div>
                                      <div>
                                          <span className="text-xs font-bold text-primary mr-2">URL 2</span>
                                          <span className="text-sm text-text-primary">{result.title2 || <em className="text-text-muted">No title</em>}</span>
                                      </div>
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
