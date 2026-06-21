import { useState } from "react";
import { Search, Globe, ExternalLink, Info } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function GoogleCacheCheckerPage() {
  const [url, setUrl] = useState("");

  const handleCheck = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      const targetUrl = url.startsWith("http") ? url : "https://" + url;
      const parsedUrl = new URL(targetUrl);
      
      const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:\${encodeURIComponent(parsedUrl.hostname + parsedUrl.pathname)}`;
      
      window.open(cacheUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening Google Cache in a new tab");
    } catch (error) {
      toast.error("Please enter a valid URL.");
    }
  };

  return (
    <ToolWrapper
      title="Google Cache Checker"
      description="Instantly view the cached version of any webpage stored by Google."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[400px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Check Google Cache</h3>
                      <p className="text-sm text-text-secondary">Enter a URL to check if Google has a cached version of it.</p>
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
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool flex items-center gap-2 justify-center"
                      >
                          <ExternalLink className="size-4" />
                          View Cached Page
                      </button>
                  </div>
              </div>

              <div className="bg-info-light border border-info/30 p-6 rounded-xl flex gap-4 text-info">
                  <Info className="size-6 shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
                      <h4 className="font-bold text-info">About Google Cache</h4>
                      <p>
                          Google Cache is a snapshot of a webpage taken by Googlebot when it crawls a site.
                          This can be useful to see how Google views a page, or to access content if a website is temporarily down.
                      </p>
                      <p className="pt-2">
                          <strong>Note:</strong> Google has started phasing out the cache link in search results, but the direct webcache URL format often still works.
                      </p>
                  </div>
              </div>

          </div>
      </div>
    </ToolWrapper>
  );
}
