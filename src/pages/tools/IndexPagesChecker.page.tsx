import { useState } from "react";
import { Search, Globe, Library, AlertTriangle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function IndexPagesCheckerPage() {
  const [domain, setDomain] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/index-pages?domain=${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
         const errData = await response.json().catch(() => ({}));
         throw new Error(errData.error || "Failed to check indexed pages");
      }
      
      const data = await response.json();
      setResult(data);
      toast.success("Index volume retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Index Pages Checker"
      description="Check how many pages a specific domain has indexed in Google."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Domain Name</h3>
                      <p className="text-sm text-text-secondary">Enter the domain to check its total indexed pages.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value)}
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
                                <Search className="size-4" />
                                Count Pages
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary p-8 rounded-xl border border-border-base text-center space-y-6">
                      {result.mocked && (
                          <div className="bg-warning-light border border-warning/30 text-warning px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                              <AlertTriangle className="size-4" />
                              <span>Showing demo data (API keys not configured)</span>
                          </div>
                      )}
                      
                      <div className="flex items-center justify-center gap-3">
                          <Library className="size-8 text-primary" />
                          <h4 className="text-2xl font-bold text-text-primary">Indexed Pages Result</h4>
                      </div>
                      
                      <div className="bg-bg-base border border-border-base rounded-xl p-8 max-w-sm mx-auto shadow-sm">
                             <div className="text-sm text-text-muted uppercase tracking-wider font-bold mb-2">Approximate Indexed URLs</div>
                             <div className="text-5xl font-black text-text-primary">
                                {result.indexedPages.toLocaleString()}
                             </div>
                             <div className="text-xs text-text-muted mt-2">Pages indexed on Google</div>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
