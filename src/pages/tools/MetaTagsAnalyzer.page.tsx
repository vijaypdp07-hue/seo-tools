import { useState } from "react";
import { Search, Globe, Code, Tag } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function MetaTagsAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/meta-tags-analyzer?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to analyze meta tags");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Meta tags analyzed successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to analyze meta tags");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Meta Tags Analyzer"
      description="Analyze the meta tags of any webpage to check their SEO effectiveness."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Enter Website URL</h3>
                      <p className="text-sm text-text-secondary">Type the URL of the webpage you want to analyze.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                              placeholder="e.g. https://example.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleAnalyze}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Analyze Meta Tags
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <Tag className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">Meta Tags Report</h4>
                      </div>

                      <div className="space-y-6">
                           <div>
                              <p className="text-sm text-text-muted font-bold uppercase tracking-wider mb-2">Title</p>
                              <div className="bg-bg-base border border-border-base rounded-md p-4">
                                  <p className="text-text-primary font-medium text-lg">{result.title || <span className="text-text-muted italic">No Title Found</span>}</p>
                                  <p className="text-xs text-text-muted mt-2">Length: {result.title?.length || 0} characters</p>
                              </div>
                           </div>
                           
                           <div>
                              <p className="text-sm text-text-muted font-bold uppercase tracking-wider mb-2">Description</p>
                              <div className="bg-bg-base border border-border-base rounded-md p-4">
                                  <p className="text-text-primary leading-relaxed">{result.description || <span className="text-text-muted italic">No Meta Description Found</span>}</p>
                                  <p className="text-xs text-text-muted mt-2">Length: {result.description?.length || 0} characters</p>
                              </div>
                           </div>

                           {Object.keys(result.metas || {}).length > 0 && (
                               <div>
                                  <p className="text-sm text-text-muted font-bold uppercase tracking-wider mb-2">Other Meta Tags</p>
                                  <div className="bg-bg-base border border-border-base rounded-md p-4 overflow-x-auto">
                                      <table className="w-full text-sm text-left">
                                          <thead>
                                              <tr className="border-b border-border-base pb-2 font-medium text-text-muted">
                                                  <th className="py-2 px-2 w-1/3">Property / Name</th>
                                                  <th className="py-2 px-2">Content</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                             {Object.entries(result.metas).map(([key, value]) => (
                                                 <tr key={key} className="border-b border-border-base last:border-0 hover:bg-bg-secondary transition-colors">
                                                     <td className="py-3 px-2 font-bold text-text-primary whitespace-nowrap align-top break-all">{key}</td>
                                                     <td className="py-3 px-2 text-text-secondary break-all">{String(value)}</td>
                                                 </tr>
                                             ))}
                                          </tbody>
                                      </table>
                                  </div>
                               </div>
                           )}
                           
                           {Object.keys(result.metas || {}).length === 0 && !result.title && !result.description && (
                               <p className="text-text-muted text-sm text-center py-4 bg-bg-base rounded-md border border-border-base">No meta tags were found on this page.</p>
                           )}
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
