import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check, Share2 } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

export function OpenGraphGeneratorPage() {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDesc, setOgDesc] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogType, setOgType] = useState("website");
  const [ogImage, setOgImage] = useState("");
  const [ogSiteName, setOgSiteName] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterCreator, setTwitterCreator] = useState("");

  const [copied, setCopied] = useState(false);

  const generateOGTags = () => {
    let tags = `<!-- Open Graph / Facebook -->\n`;
    if (ogType) tags += `<meta property="og:type" content="${ogType}">\n`;
    if (ogUrl) tags += `<meta property="og:url" content="${ogUrl}">\n`;
    if (ogTitle) tags += `<meta property="og:title" content="${ogTitle}">\n`;
    if (ogDesc) tags += `<meta property="og:description" content="${ogDesc}">\n`;
    if (ogImage) tags += `<meta property="og:image" content="${ogImage}">\n`;
    if (ogSiteName) tags += `<meta property="og:site_name" content="${ogSiteName}">\n`;

    tags += `\n<!-- Twitter -->\n`;
    if (twitterCard) tags += `<meta property="twitter:card" content="${twitterCard}">\n`;
    if (ogUrl) tags += `<meta property="twitter:url" content="${ogUrl}">\n`;
    if (ogTitle) tags += `<meta property="twitter:title" content="${ogTitle}">\n`;
    if (ogDesc) tags += `<meta property="twitter:description" content="${ogDesc}">\n`;
    if (ogImage) tags += `<meta property="twitter:image" content="${ogImage}">\n`;
    if (twitterCreator) tags += `<meta property="twitter:creator" content="${twitterCreator}">\n`;

    return tags;
  };

  const outputTags = generateOGTags();

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
    a.download = "open-graph.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setOgTitle("Next-Gen Photo Platform");
    setOgDesc("Discover, catalog, and share high-resolution shots with photo enthusiasts around the world.");
    setOgUrl("https://myphotosite-example.com");
    setOgType("website");
    setOgImage("https://myphotosite-example.com/assets/banner.jpg");
    setOgSiteName("PhotoGen");
    setTwitterCard("summary_large_image");
    setTwitterCreator("@photogen_app");
  };

  const handleClear = () => {
    setOgTitle("");
    setOgDesc("");
    setOgUrl("");
    setOgType("website");
    setOgImage("");
    setOgSiteName("");
    setTwitterCard("summary_large_image");
    setTwitterCreator("");
  };

  return (
    <ToolWrapper
      title="Open Graph Generator"
      description="Create social sharing meta tags for Facebook, Twitter, LinkedIn, and Discord to customize how your site looks when shared."
      categoryName="Website Tools"
      categoryPath="/tools/website"
      seoContent={
        <div className="space-y-4">
          <h2 className="text-xl font-bold">What is Open Graph and Twitter Card Protocol?</h2>
          <p>
            The Open Graph (OG) protocol was originally created by Facebook to standardize the use of metadata on webpages to represent rich card previews when shared on search engines or social streams. Similarly, Twitter Cards allow rich media to be attached to tweets pointing to your content.
          </p>
          <p>
            Filling out these details will attract higher click-through-rates because links look visually inviting instead of displaying plain generic blue links.
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-base border-b border-border-base">
        {/* Input Details */}
        <div className="p-6 bg-bg-base space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-border-base">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <Share2 className="size-4 text-primary" />
              Meta Properties
            </h3>
            <div className="flex gap-4">
              <button
                onClick={handleSample}
                className="text-xs font-medium text-primary hover:underline flex gap-1 items-center"
              >
                <Wand2 className="size-3" /> Sample
              </button>
              <button
                onClick={handleClear}
                className="text-xs font-medium text-error hover:underline flex gap-1 items-center"
              >
                <Trash2 className="size-3" /> Clear
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">URL (og:url)</label>
              <input
                type="text"
                value={ogUrl}
                onChange={(e) => setOgUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Title (og:title)</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Limit under 60-90 characters"
                className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Description (og:description)</label>
              <textarea
                value={ogDesc}
                onChange={(e) => setOgDesc(e.target.value)}
                placeholder="Short summary under 200 characters for optimal rendering size..."
                className="w-full h-20 p-2 text-sm bg-bg-secondary border border-border-base rounded resize-none focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Image URL (og:image)</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://yourwebsite.com/assets/og-image.jpg"
                className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">Type (og:type)</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="book">Book</option>
                  <option value="profile">Profile</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">Site Name</label>
                <input
                  type="text"
                  value={ogSiteName}
                  onChange={(e) => setOgSiteName(e.target.value)}
                  placeholder="e.g. My Website Brand"
                  className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">Twitter Card</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                >
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="summary">Summary Card</option>
                  <option value="app">App Card</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">Twitter Handle</label>
                <input
                  type="text"
                  value={twitterCreator}
                  onChange={(e) => setTwitterCreator(e.target.value)}
                  placeholder="e.g. @your_account"
                  className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Markup and live social mockup */}
        <div className="p-6 bg-bg-secondary flex flex-col space-y-4 justify-between">
          <div>
            <h3 className="font-semibold text-text-primary pb-3 border-b border-border-base mb-4">
              Generated Meta Tags
            </h3>
            <textarea
              readOnly
              value={outputTags}
              className="w-full min-h-[220px] p-4 bg-bg-base text-text-primary font-mono text-xs border border-border-base rounded-md focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary text-white hover:bg-primary-dark rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="size-3" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-3" /> Copy Tags
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary rounded transition-colors"
              >
                <Download className="size-3" /> Download .html
              </button>
            </div>
          </div>

          {/* Social Preview Card */}
          <div className="pt-4 border-t border-border-base">
            <h4 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">
              Facebook / LinkedIn Social Feed Preview
            </h4>
            <div className="border border-border-base rounded bg-white text-gray-800 overflow-hidden shadow-sm">
              <div className="bg-gray-100 h-36 flex items-center justify-center font-mono text-xs text-gray-500 overflow-hidden relative">
                {ogImage ? (
                  <img
                    src={ogImage}
                    alt="Preview banner"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback text if user enters a dead image link or is typing
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : null}
                {!ogImage && <span className="p-4 text-center">No image selected or invalid image URL</span>}
              </div>
              <div className="p-3 bg-white space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                  {ogUrl ? new URL(ogUrl).hostname : "example.com"}
                </span>
                <p className="font-bold text-sm text-gray-900 line-clamp-1">{ogTitle || "Preview Title Placeholder"}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {ogDesc || "No description provided. Facebook will automatically crop text based on length."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
