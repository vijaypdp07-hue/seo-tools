import { useState } from "react";
import { Search, Globe, ShieldAlert, AlertTriangle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import { clsx } from "clsx";

export function SpamScoreCheckerPage() {
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
      const response = await fetch(`/api/tools/spam-score?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
         const errData = await response.json().catch(() => ({}));
         throw new Error(errData.error || "Failed to check spam score");
      }
      
      const data = await response.json();
      setResult(data);
      toast.success("Spam Score retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Spam Score Checker"
      description="Check the Moz Spam Score of a webpage to identify potential bad links."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Website URL</h3>
                      <p className="text-sm text-text-secondary">Enter the URL to check its spam risk.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. example.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleCheck}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-error text-white font-bold rounded-lg hover:bg-error/90 transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Check Spam
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className={clsx(
                      "p-8 rounded-xl border text-center space-y-6 flex flex-col items-center",
                      result.spamScore > 60 ? "border-error bg-error-light/10" : result.spamScore > 30 ? "border-warning bg-warning-light/10" : "border-success bg-success-light/10"
                  )}>
                      {result.mocked && (
                          <div className="bg-warning-light border border-warning/30 text-warning px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-full max-w-sm mb-4">
                              <AlertTriangle className="size-4" />
                              <span>Showing demo data (API keys not configured)</span>
                          </div>
                      )}
                      
                      <div className="flex items-center justify-center gap-3">
                          <ShieldAlert className="size-10 text-text-primary" />
                          <h4 className="text-2xl font-bold text-text-primary">Spam Score Analysis</h4>
                      </div>
                      
                      <div className="bg-bg-base border border-border-base rounded-full size-40 flex flex-col items-center justify-center shadow-md">
                           <div className={clsx(
                               "text-6xl font-black",
                               result.spamScore > 60 ? "text-error" : result.spamScore > 30 ? "text-warning" : "text-success"
                           )}>
                               {result.spamScore ?? 0}%
                           </div>
                      </div>
                      
                      <div className="max-w-md mx-auto space-y-2">
                           <h5 className="font-bold text-lg text-text-primary">
                               {result.spamScore > 60 ? "High Risk" : result.spamScore > 30 ? "Medium Risk" : "Low Risk"}
                           </h5>
                           <p className="text-text-secondary text-sm leading-relaxed">
                               A score of 1-30% is considered a low spam score. 
                               A score of 31-60% is considered a medium spam score. 
                               A score of 61-100% is considered a high spam score.
                           </p>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
