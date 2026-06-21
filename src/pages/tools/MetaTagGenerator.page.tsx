import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

export function MetaTagGeneratorPage() {
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDesc, setSiteDesc] = useState("");
  const [siteKeywords, setSiteKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("English");
  const [robotsIndex, setRobotsIndex] = useState("index");
  const [robotsFollow, setRobotsFollow] = useState("follow");
  
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    let tags = `<!-- Generated with SEO Tools -->\n`;
    
    if (siteTitle) {
        tags += `<title>${siteTitle}</title>\n`;
        tags += `<meta name="title" content="${siteTitle}">\n`;
    }
    if (siteDesc) {
        tags += `<meta name="description" content="${siteDesc}">\n`;
    }
    if (siteKeywords) {
        tags += `<meta name="keywords" content="${siteKeywords}">\n`;
    }
    if (robotsIndex && robotsFollow) {
        tags += `<meta name="robots" content="${robotsIndex}, ${robotsFollow}">\n`;
    }
    if (author) {
        tags += `<meta name="author" content="${author}">\n`;
    }
    if (language) {
        tags += `<meta name="language" content="${language}">\n`;
    }
    
    tags += `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n`;

    return tags;
  };

  const outputTags = generateMetaTags();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputTags], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
      setSiteTitle("My Awesome Photography Site");
      setSiteDesc("Portfolios, galleries, and articles about modern nature photography.");
      setSiteKeywords("photography, nature photos, modern art gallery, photography tips");
      setAuthor("Jane Doe");
      setLanguage("English");
      setRobotsIndex("index");
      setRobotsFollow("follow");
  };

  const handleClear = () => {
      setSiteTitle("");
      setSiteDesc("");
      setSiteKeywords("");
      setAuthor("");
  };

  return (
    <ToolWrapper
      title="Meta Tag Generator"
      description="Create basic but essential HTML meta tags to help search engines understand your content."
      categoryName="Website Tools"
      categoryPath="/tools/website"
      seoContent={
         <div>
             <h2>How to use the Meta Tag Generator</h2>
             <ol>
                 <li>Fill out the form fields with information about your website.</li>
                 <li>The tool will automatically generate standard HTML meta tags.</li>
                 <li>Copy the generated tags and paste them inside the <code>&lt;head&gt;</code> section of your HTML document.</li>
             </ol>
         </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-base border-b border-border-base">
         {/* Form Input */}
         <div className="p-6 bg-bg-base space-y-6">
             <div className="flex justify-between items-center pb-2 border-b border-border-base">
                 <h3 className="font-semibold text-text-primary">Website Details</h3>
                 <div className="flex gap-4">
                     <button onClick={handleSample} className="text-xs font-medium text-primary hover:underline flex gap-1 items-center">
                         <Wand2 className="size-3"/> Sample
                     </button>
                     <button onClick={handleClear} className="text-xs font-medium text-error hover:underline flex gap-1 items-center">
                         <Trash2 className="size-3"/> Clear
                     </button>
                 </div>
             </div>

             <div className="space-y-4">
                 <div className="space-y-1">
                     <label className="text-sm font-medium text-text-primary">Site Title (max 60 chars)</label>
                     <input
                        type="text"
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                         placeholder="e.g. SEO Tools - Free online utilities"
                        className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                     />
                 </div>
                 <div className="space-y-1">
                     <label className="text-sm font-medium text-text-primary">Site Description (max 150 chars)</label>
                     <textarea
                        value={siteDesc}
                        onChange={(e) => setSiteDesc(e.target.value)}
                        placeholder="Describe your site in 1-2 sentences..."
                        className="w-full h-20 p-2 text-sm bg-bg-secondary border border-border-base rounded resize-none focus:outline-none focus:border-primary"
                     />
                 </div>
                 <div className="space-y-1">
                     <label className="text-sm font-medium text-text-primary flex justify-between">
                         <span>Keywords (comma separated)</span>
                         <span className="text-text-muted font-normal text-xs">Optional</span>
                     </label>
                     <input
                        type="text"
                        value={siteKeywords}
                        onChange={(e) => setSiteKeywords(e.target.value)}
                        placeholder="e.g. tools, free, online utilities"
                        className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                     />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                         <label className="text-sm font-medium text-text-primary flex justify-between">
                             <span>Author</span>
                             <span className="text-text-muted font-normal text-xs">Optional</span>
                         </label>
                         <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                         />
                     </div>
                     <div className="space-y-1">
                         <label className="text-sm font-medium text-text-primary">Language</label>
                         <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                         >
                             <option value="English">English</option>
                             <option value="Spanish">Spanish</option>
                             <option value="French">French</option>
                             <option value="Hindi">Hindi</option>
                         </select>
                     </div>
                 </div>

                 <div className="space-y-2 pt-2">
                     <label className="text-sm font-medium text-text-primary">Search Engine Robot Rules</label>
                     <div className="flex gap-4">
                         <label className="flex items-center gap-2 text-sm">
                             <input type="checkbox" checked={robotsIndex === "index"} onChange={(e) => setRobotsIndex(e.target.checked ? "index" : "noindex")} className="accent-primary" />
                             Allow indexing
                         </label>
                         <label className="flex items-center gap-2 text-sm">
                             <input type="checkbox" checked={robotsFollow === "follow"} onChange={(e) => setRobotsFollow(e.target.checked ? "follow" : "nofollow")} className="accent-primary" />
                             Follow links
                         </label>
                     </div>
                 </div>
             </div>
         </div>

         {/* Output Area */}
         <div className="p-6 bg-bg-secondary flex flex-col">
              <h3 className="font-semibold text-text-primary pb-3 border-b border-border-base mb-4">Generated HTML</h3>
             <textarea
                readOnly
                value={outputTags}
                className="w-full flex-1 min-h-[300px] p-4 bg-bg-base text-text-primary font-mono text-sm border border-border-base rounded-md focus:outline-none"
             />
             <div className="flex justify-end gap-2 pt-4">
                 <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md transition-colors"
                >
                    {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Tags</>}
                </button>
                <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md transition-colors"
                >
                    <Download className="size-4" /> Save .html
                </button>
             </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
