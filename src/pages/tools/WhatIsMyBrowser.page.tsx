import { useState, useEffect } from "react";
import { Monitor, RefreshCw, Smartphone, Globe, Cpu } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function WhatIsMyBrowserPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [result, setResult] = useState<any>(null);

  const fetchBrowserInfo = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/tools/what-is-my-browser');
      
      if (!response.ok) {
          throw new Error("Failed to fetch browser info");
      }

      const serverData = await response.json();
      
      // Combine with client-side data
      const data = {
         ...serverData,
         userAgentClient: navigator.userAgent,
         languageClient: navigator.language,
         platform: navigator.platform,
         vendor: navigator.vendor,
         cookieEnabled: navigator.cookieEnabled,
         screenWidth: window.screen.width,
         screenHeight: window.screen.height,
         colorDepth: window.screen.colorDepth,
         windowWidth: window.innerWidth,
         windowHeight: window.innerHeight,
      };

      setResult(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to fetch browser details");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
     fetchBrowserInfo();
  }, []);

  return (
    <ToolWrapper
      title="What Is My Browser"
      description="Detailed information about your web browser, operating system, and display settings."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="flex justify-end">
                  <button
                     onClick={fetchBrowserInfo}
                     disabled={isProcessing}
                     className="flex items-center justify-center gap-2 px-4 py-2 bg-bg-secondary border border-border-base text-text-primary text-sm font-medium rounded-lg hover:bg-border-base transition-colors disabled:opacity-50"
                  >
                     <RefreshCw className={`size-4 ${isProcessing ? 'animate-spin' : ''}`} />
                     Refresh Info
                  </button>
              </div>

              {isProcessing && !result ? (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-12 flex flex-col items-center justify-center gap-4 text-text-muted">
                      <div className="size-8 border-4 border-border-base border-t-primary rounded-full animate-spin"></div>
                      <p>Analyzing browser properties...</p>
                  </div>
              ) : result ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 space-y-4 md:col-span-2">
                          <div className="flex items-center gap-3 border-b border-border-base pb-3">
                              <Globe className="size-5 text-primary" />
                              <h4 className="font-bold text-text-primary">User Agent string</h4>
                          </div>
                          <p className="text-sm font-mono text-text-secondary break-all bg-bg-base p-4 rounded-md border border-border-base">
                              {result.userAgent}
                          </p>
                      </div>

                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 space-y-4">
                          <div className="flex items-center gap-3 border-b border-border-base pb-3">
                              <Monitor className="size-5 text-primary" />
                              <h4 className="font-bold text-text-primary">Display</h4>
                          </div>
                          <ul className="space-y-3 text-sm">
                              <li className="flex justify-between border-b border-border-base pb-2">
                                  <span className="text-text-muted">Screen Resolution</span>
                                  <span className="text-text-primary font-medium">{result.screenWidth} × {result.screenHeight}</span>
                              </li>
                              <li className="flex justify-between border-b border-border-base pb-2">
                                  <span className="text-text-muted">Window Size</span>
                                  <span className="text-text-primary font-medium">{result.windowWidth} × {result.windowHeight}</span>
                              </li>
                              <li className="flex justify-between pb-1">
                                  <span className="text-text-muted">Color Depth</span>
                                  <span className="text-text-primary font-medium">{result.colorDepth}-bit</span>
                              </li>
                          </ul>
                      </div>

                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 space-y-4">
                          <div className="flex items-center gap-3 border-b border-border-base pb-3">
                              <Cpu className="size-5 text-primary" />
                              <h4 className="font-bold text-text-primary">System</h4>
                          </div>
                          <ul className="space-y-3 text-sm">
                              <li className="flex justify-between border-b border-border-base pb-2">
                                  <span className="text-text-muted">Public IP Address</span>
                                  <span className="text-text-primary font-medium">{result.ip}</span>
                              </li>
                              <li className="flex justify-between border-b border-border-base pb-2">
                                  <span className="text-text-muted">Platform</span>
                                  <span className="text-text-primary font-medium">{result.platform}</span>
                              </li>
                              <li className="flex justify-between border-b border-border-base pb-2">
                                  <span className="text-text-muted">Language</span>
                                  <span className="text-text-primary font-medium">{result.language}</span>
                              </li>
                              <li className="flex justify-between pb-1">
                                  <span className="text-text-muted">Cookies Enabled</span>
                                  <span className="text-text-primary font-medium">{result.cookieEnabled ? "Yes" : "No"}</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              ) : null}

          </div>
      </div>
    </ToolWrapper>
  );
}
