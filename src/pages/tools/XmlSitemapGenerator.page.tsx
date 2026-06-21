import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Code, Share2, Search, Link as LinkIcon, Settings2, Trash2, Plus } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

export function XmlSitemapGeneratorPage() {
  const [urls, setUrls] = useState<string>("https://yourdomain.com/\nhttps://yourdomain.com/about\nhttps://yourdomain.com/contact");
  const [priority, setPriority] = useState<string>("default");
  const [frequency, setFrequency] = useState<string>("default");

  const generateSitemap = () => {
    const list = urls.split('\n').map(url => url.trim()).filter(url => url !== '' && url.startsWith('http'));
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    list.forEach(url => {
      xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`;
      
      if (frequency !== "default") {
          xml += `\n    <changefreq>${frequency}</changefreq>`;
      }
      
      if (priority !== "default") {
          let prio = priority;
          if (prio === "auto") {
              // Root gets 1.0, subpages get 0.8
              const parts = url.replace('https://', '').replace('http://', '').split('/').filter(Boolean);
              prio = parts.length > 1 ? "0.8" : "1.0";
          }
          xml += `\n    <priority>${prio}</priority>`;
      }
      
      xml += `\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const handleDownload = () => {
    const xml = generateSitemap();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="XML Sitemap Generator"
      description="Create an XML sitemap manually for small sites to help search engines crawl your pages better."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Input */}
        <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border-base pb-4">
            <LinkIcon className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-text-primary">Full URLs List</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary flex justify-between">
                  <span>Enter URLs (one per line)</span>
                  <span className="text-xs">{urls.split('\n').filter(u=>u.trim().length > 0).length} URLs</span>
              </label>
              <textarea
                 value={urls}
                 onChange={(e) => setUrls(e.target.value)}
                 rows={10}
                 className="font-mono w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm resize-none"
                 placeholder="https://example.com/&#10;https://example.com/about"
              />
              <p className="text-xs text-text-muted mt-1">Must start with http:// or https://</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Change Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                >
                  <option value="default">Do not specify</option>
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                >
                  <option value="default">Do not specify</option>
                  <option value="auto">Auto (Root=1.0, Pages=0.8)</option>
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.8">0.8</option>
                  <option value="0.5">0.5</option>
                  <option value="0.3">0.3</option>
                </select>
              </div>
            </div>
            
            <button
               onClick={() => setUrls("")}
               className="text-xs text-error hover:underline"
            >
               Clear all URLs
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-6">
           <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-sm border border-border-base relative flex flex-col h-full">
             <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10 shrink-0">
                <span className="text-xs font-medium text-white/70 font-mono">sitemap.xml</span>
                <div className="flex gap-2">
                   <CopyButton text={generateSitemap()} />
                   <button 
                       onClick={handleDownload}
                       className="px-3 py-1.5 text-xs font-medium bg-primary hover:bg-primary-dark text-white rounded transition-colors"
                   >
                       Download
                   </button>
                </div>
             </div>
             <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap flex-1 min-h-[300px]">
               {generateSitemap()}
             </pre>
           </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
