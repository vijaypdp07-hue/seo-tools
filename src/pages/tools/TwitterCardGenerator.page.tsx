import React, { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Twitter, Copy, Check, LayoutTemplate, Settings2 } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

export function TwitterCardGeneratorPage() {
  const [formData, setFormData] = useState({
    cardType: "summary_large_image",
    siteUser: "@yourusername",
    creatorUser: "@authorusername",
    title: "The Ultimate Guide to Meta Tags",
    description: "Learn how to optimize your meta tags for better SEO and social media sharing.",
    imageUrl: "https://yourdomain.com/social-image.jpg",
    imageAlt: "A descriptive alt text for the image",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateCode = () => {
    return `<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="${formData.cardType}" />
<meta name="twitter:site" content="${formData.siteUser}" />
<meta name="twitter:creator" content="${formData.creatorUser}" />
<meta name="twitter:title" content="${formData.title}" />
<meta name="twitter:description" content="${formData.description}" />
${formData.cardType.includes('image') ? `<meta name="twitter:image" content="${formData.imageUrl}" />
<meta name="twitter:image:alt" content="${formData.imageAlt}" />` : ''}`;
  };

  return (
    <ToolWrapper
      title="Twitter Card Generator"
      description="Create Twitter Card meta tags to display rich snippets and images when your links are shared on X (Twitter)."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Input Form */}
        <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border-base pb-4">
            <Settings2 className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-text-primary">Card details</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary">Card Type</label>
              <select
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
              >
                <option value="summary">Summary (Small Image)</option>
                <option value="summary_large_image">Summary with Large Image</option>
                <option value="app">App Card</option>
                <option value="player">Player Card</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Twitter @Username (Site)</label>
                <input
                  type="text"
                  name="siteUser"
                  value={formData.siteUser}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Twitter @Username (Creator)</label>
                <input
                  type="text"
                  name="creatorUser"
                  value={formData.creatorUser}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary">Title (max 70 chars)</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={70}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary">Description (max 200 chars)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={200}
                rows={3}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm resize-none"
              />
            </div>

            {formData.cardType.includes('image') && (
               <>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-text-secondary">Image URL</label>
                   <input
                     type="text"
                     name="imageUrl"
                     value={formData.imageUrl}
                     onChange={handleChange}
                     className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-text-secondary">Image Alt Text</label>
                   <input
                     type="text"
                     name="imageAlt"
                     value={formData.imageAlt}
                     onChange={handleChange}
                     className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                   />
                 </div>
               </>
            )}
          </div>
        </div>

        {/* Live Preview & Code */}
        <div className="space-y-6">
           <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-border-base pb-4">
                 <Twitter className="size-5 text-[#1DA1F2]" />
                 <h2 className="text-lg font-bold text-text-primary">Live Preview</h2>
              </div>
              
              <div className="border border-border-base rounded-xl overflow-hidden max-w-sm mx-auto bg-bg-secondary">
                  {(formData.cardType === 'summary_large_image' || formData.cardType === 'player') && formData.imageUrl && (
                      <div className="w-full h-48 bg-border-base/50 flex items-center justify-center overflow-hidden border-b border-border-base">
                          {formData.imageUrl.includes('http') ? (
                              <img src={formData.imageUrl} alt={formData.imageAlt} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          ) : (
                              <span className="text-xs text-text-muted px-4 text-center break-all">{formData.imageUrl || "Image Preview"}</span>
                          )}
                      </div>
                  )}
                  
                  <div className={`p-4 ${formData.cardType === 'summary' ? 'flex items-center gap-4' : ''}`}>
                     {formData.cardType === 'summary' && formData.imageUrl && (
                         <div className="w-24 h-24 shrink-0 bg-border-base/50 rounded-lg overflow-hidden">
                             {formData.imageUrl.includes('http') && <img src={formData.imageUrl} alt={formData.imageAlt} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                         </div>
                     )}
                     <div className="flex-1 w-full overflow-hidden">
                        <p className="text-xs text-text-muted truncate mb-1">from {formData.siteUser}</p>
                        <h3 className="font-bold text-text-primary text-sm leading-tight line-clamp-1 mb-1">{formData.title || 'Your Title Here'}</h3>
                        <p className="text-xs text-text-secondary line-clamp-2">{formData.description || 'A brief description of your content.'}</p>
                     </div>
                  </div>
              </div>
           </div>

           <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-sm border border-border-base relative">
             <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
                <span className="text-xs font-medium text-white/70 font-mono">Generated HTML Tags</span>
                <CopyButton text={generateCode()} alwaysShowText />
             </div>
             <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
               {generateCode()}
             </pre>
           </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
