import { useState } from "react";
import { Search, Globe, Gauge, AlertTriangle, Monitor, Smartphone } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import { clsx } from "clsx";

export function PageSpeedTestPage() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"desktop" | "mobile">("desktop");
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
      const response = await fetch(`/api/tools/page-speed?url=${encodeURIComponent(url)}&strategy=${strategy}`);
      
      if (!response.ok) {
         const errData = await response.json().catch(() => ({}));
         throw new Error(errData.error || "Failed to test page speed");
      }
      
      const data = await response.json();
      setResult(data);
      toast.success("Speed test completed!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getScoreColor = (score: number) => {
      if (score >= 90) return "text-success border-success bg-success-light/10";
      if (score >= 50) return "text-warning border-warning bg-warning-light/10";
      return "text-error border-error bg-error-light/10";
  };

  return (
    <ToolWrapper
      title="Page Speed Test"
      description="Analyze a web page's load speed and performance metrics utilizing Google PageSpeed Insights."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Website URL</h3>
                      <p className="text-sm text-text-secondary">Enter the URL to analyze its performance.</p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
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
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-2">
                              <button
                                 onClick={() => setStrategy("desktop")}
                                 className={clsx(
                                     "px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 border transition-colors",
                                     strategy === "desktop" ? "bg-primary/10 border-primary text-primary" : "bg-bg-base border-border-base text-text-secondary hover:bg-bg-tertiary"
                                 )}
                              >
                                  <Monitor className="size-4" /> Desktop
                              </button>
                              <button
                                 onClick={() => setStrategy("mobile")}
                                 className={clsx(
                                     "px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 border transition-colors",
                                     strategy === "mobile" ? "bg-primary/10 border-primary text-primary" : "bg-bg-base border-border-base text-text-secondary hover:bg-bg-tertiary"
                                 )}
                              >
                                  <Smartphone className="size-4" /> Mobile
                              </button>
                          </div>
                          
                          <button
                              onClick={handleCheck}
                              disabled={isProcessing}
                              className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                              {isProcessing ? (
                                 <>
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing...
                                 </>
                              ) : (
                                 <>
                                    <Gauge className="size-4" />
                                    Analyze Speed
                                 </>
                              )}
                          </button>
                      </div>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary p-8 rounded-xl border border-border-base space-y-8">
                      {result.mocked && (
                          <div className="bg-warning-light border border-warning/30 text-warning px-4 py-3 rounded-md text-sm flex items-center justify-center gap-2 w-full mx-auto font-bold mb-4">
                              <AlertTriangle className="size-5" />
                              <span>Showing demo data (Google PageSpeed API key not configured)</span>
                          </div>
                      )}
                      
                      <div className="flex flex-col items-center justify-center text-center space-y-2">
                          <h4 className="text-2xl font-bold text-text-primary">Performance Results</h4>
                          <p className="text-text-secondary text-sm">
                              Analyzed {result.url} using {result.strategy} strategy
                          </p>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                           {[
                               { label: "Performance", score: result.performanceScore },
                               { label: "Accessibility", score: result.accessibilityScore },
                               { label: "Best Practices", score: result.bestPracticesScore },
                               { label: "SEO", score: result.seoScore }
                           ].map((item, idx) => (
                               <div key={idx} className={clsx("border rounded-xl p-6 flex flex-col items-center justify-center shadow-sm", getScoreColor(item.score))}>
                                   <div className="text-4xl font-black mb-2">{item.score}</div>
                                   <div className="text-xs uppercase tracking-wider font-bold opacity-80 text-center">{item.label}</div>
                               </div>
                           ))}
                      </div>

                      <div className="bg-bg-base border border-border-base rounded-xl p-6">
                           <h5 className="font-bold text-lg text-text-primary mb-4">Core Lab Metrics</h5>
                           <div className="grid sm:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-sm text-text-muted mb-1">First Contentful Paint</div>
                                    <div className="text-xl font-bold text-text-primary">{result.firstContentfulPaint}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-text-muted mb-1">Largest Contentful Paint</div>
                                    <div className="text-xl font-bold text-text-primary">{result.largestContentfulPaint}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-text-muted mb-1">Speed Index</div>
                                    <div className="text-xl font-bold text-text-primary">{result.speedIndex}</div>
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
