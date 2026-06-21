import { useState } from "react";
import { Search, Globe, FileImage, ExternalLink, Info } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function ReverseImageSearchPage() {
  const [url, setUrl] = useState("");

  const handleCheck = () => {
    if (!url.trim()) {
      toast.error("Please enter an image URL.");
      return;
    }

    try {
      const targetUrl = url.startsWith("http") ? url : "https://" + url;
      new URL(targetUrl); // validate URL
      
      const lensUrl = `https://lens.google.com/uploadbyurl?url=\${encodeURIComponent(targetUrl)}`;
      
      window.open(lensUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening Google Lens in a new tab");
    } catch (error) {
      toast.error("Please enter a valid image URL.");
    }
  };

  return (
    <ToolWrapper
      title="Reverse Image Search"
      description="Find visually similar images across the web using Google Lens."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[400px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Search by Image URL</h3>
                      <p className="text-sm text-text-secondary">Enter a direct link to an image to search the web for its origins or similar images.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <FileImage className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. https://example.com/image.jpg"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleCheck}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool flex items-center gap-2 justify-center"
                      >
                          <Search className="size-4" />
                          Search Image
                      </button>
                  </div>
              </div>

              <div className="bg-info-light border border-info/30 p-6 rounded-xl flex gap-4 text-info">
                  <Info className="size-6 shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
                      <h4 className="font-bold text-info">How it works</h4>
                      <p>
                          This tool redirects your image link directly into Google Lens. 
                          Google will analyze the image and return visually related products, original sources, and similar images.
                      </p>
                  </div>
              </div>

          </div>
      </div>
    </ToolWrapper>
  );
}
