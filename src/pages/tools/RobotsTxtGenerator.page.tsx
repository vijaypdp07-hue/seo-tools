import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check, Plus, X, ShieldAlert } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

interface BotRule {
  botName: string;
  allowed: boolean;
}

export function RobotsTxtGeneratorPage() {
  const [sitemap, setSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("none");
  const [disallowedPaths, setDisallowedPaths] = useState<string[]>(["/cgi-bin/", "/admin/"]);
  const [allowedPaths, setAllowedPaths] = useState<string[]>([]);
  const [newDisallow, setNewDisallow] = useState("");
  const [newAllow, setNewAllow] = useState("");

  const [bots, setBots] = useState<BotRule[]>([
    { botName: "* (All)", allowed: true },
    { botName: "Googlebot", allowed: true },
    { botName: "Googlebot-Image", allowed: true },
    { botName: "Bingbot", allowed: true },
    { botName: "Slurp (Yahoo)", allowed: true },
    { botName: "Baiduspider", allowed: true },
    { botName: "Yandex", allowed: true },
    { botName: "Applebot", allowed: true },
  ]);

  const [copied, setCopied] = useState(false);

  const generateRobotsTxt = () => {
    let output = `# Created via Robots.txt Generator - Free SEO Web Tools\n\n`;

    if (sitemap) {
      output += `Sitemap: ${sitemap}\n\n`;
    }

    bots.forEach((bot) => {
      output += `User-agent: ${bot.botName.split(" ")[0]}\n`;
      if (!bot.allowed) {
        output += `Disallow: /\n`;
      } else {
        if (crawlDelay !== "none") {
          output += `Crawl-delay: ${crawlDelay}\n`;
        }
        disallowedPaths.forEach((path) => {
          if (path.trim()) {
            output += `Disallow: ${path.trim()}\n`;
          }
        });
        allowedPaths.forEach((path) => {
          if (path.trim()) {
            output += `Allow: ${path.trim()}\n`;
          }
        });
      }
      output += `\n`;
    });

    return output.trim();
  };

  const outputContent = generateRobotsTxt();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleBot = (index: number) => {
    const updated = [...bots];
    updated[index].allowed = !updated[index].allowed;
    setBots(updated);
  };

  const addDisallowPath = () => {
    if (newDisallow && !disallowedPaths.includes(newDisallow)) {
      setDisallowedPaths([...disallowedPaths, newDisallow]);
      setNewDisallow("");
    }
  };

  const addAllowPath = () => {
    if (newAllow && !allowedPaths.includes(newAllow)) {
      setAllowedPaths([...allowedPaths, newAllow]);
      setNewAllow("");
    }
  };

  const removeDisallowPath = (path: string) => {
    setDisallowedPaths(disallowedPaths.filter((p) => p !== path));
  };

  const removeAllowPath = (path: string) => {
    setAllowedPaths(allowedPaths.filter((p) => p !== path));
  };

  const handleSample = () => {
    setSitemap("https://samplewebsite.com/sitemap.xml");
    setCrawlDelay("5");
    setDisallowedPaths(["/admin/", "/tmp/", "/config/", "/private/"]);
    setAllowedPaths(["/wp-admin/admin-ajax.php", "/public/"]);
    const resetBots = bots.map((b) => ({ ...b, allowed: true }));
    setBots(resetBots);
  };

  const handleClear = () => {
    setSitemap("");
    setCrawlDelay("none");
    setDisallowedPaths([]);
    setAllowedPaths([]);
    const resetBots = bots.map((b) => ({ ...b, allowed: true }));
    setBots(resetBots);
  };

  return (
    <ToolWrapper
      title="Robots.txt Generator"
      description="Create a custom robots.txt file to instruct crawlers (like Googlebot and Bingbot) which pages they can and cannot scan on your web application."
      categoryName="Website Tools"
      categoryPath="/tools/website"
      seoContent={
        <div className="space-y-4">
          <h2 className="text-xl font-bold">What is a robots.txt file?</h2>
          <p>
            A robots.txt file is placed in the root directory of your website (e.g., <code>yoursite.com/robots.txt</code>) to instruct automated bots and web spiders on paths they are allowed to index.
          </p>
          <p className="flex items-start gap-2 bg-warning-light/30 border border-warning/20 p-3 rounded text-sm text-text-primary">
            <ShieldAlert className="size-5 text-warning shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Warning:</strong> While robots.txt is highly respected by reputable crawlers, malicious crawlers might ignore it. Never use robots.txt to hide sensitive personal information or proprietary code.
            </span>
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-base border-b border-border-base">
        {/* Settings Area */}
        <div className="p-6 bg-bg-base space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-border-base">
            <h3 className="font-semibold text-text-primary">Robots Directives</h3>
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
            {/* Sitemap Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Sitemap URL</label>
              <input
                type="text"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
                placeholder="e.g. https://yourwebsite.com/sitemap.xml"
                className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
              />
            </div>

            {/* Delay Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Crawl Delay Directive</label>
              <select
                value={crawlDelay}
                onChange={(e) => setCrawlDelay(e.target.value)}
                className="w-full p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
              >
                <option value="none">No Delay (Default)</option>
                <option value="5">5 Seconds Delay</option>
                <option value="10">10 Seconds Delay</option>
                <option value="20">20 Seconds Delay</option>
              </select>
            </div>

            {/* Crawler Permissions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Crawler Permissions</label>
              <div className="grid grid-cols-2 gap-2 bg-bg-secondary p-3 rounded-lg border border-border-base h-40 overflow-y-auto">
                {bots.map((bot, index) => (
                  <label key={bot.botName} className="flex items-center gap-2 text-xs text-text-primary">
                    <input
                      type="checkbox"
                      checked={bot.allowed}
                      onChange={() => toggleBot(index)}
                      className="accent-primary"
                    />
                    <span>{bot.botName}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Disallowed Paths */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Disallowed Paths (Blocked)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDisallow}
                  onChange={(e) => setNewDisallow(e.target.value)}
                  placeholder="e.g. /wp-admin/"
                  className="flex-1 p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && addDisallowPath()}
                />
                <button
                  type="button"
                  onClick={addDisallowPath}
                  className="px-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {disallowedPaths.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded bg-error-light/30 text-error text-xs font-semibold border border-error/10"
                  >
                    <span>{p}</span>
                    <button type="button" onClick={() => removeDisallowPath(p)} className="hover:text-error-dark">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Allowed Paths */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Allowed Paths (Explicit White-list)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllow}
                  onChange={(e) => setNewAllow(e.target.value)}
                  placeholder="e.g. /wp-admin/admin-ajax.php"
                  className="flex-1 p-2 text-sm bg-bg-secondary border border-border-base rounded focus:outline-none focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && addAllowPath()}
                />
                <button
                  type="button"
                  onClick={addAllowPath}
                  className="px-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {allowedPaths.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded bg-success-light/30 text-success text-xs font-semibold border border-success/10"
                  >
                    <span>{p}</span>
                    <button type="button" onClick={() => removeAllowPath(p)} className="hover:text-success-dark">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="p-6 bg-bg-secondary flex flex-col">
          <h3 className="font-semibold text-text-primary pb-3 border-b border-border-base mb-4">
            robots.txt Content Preview
          </h3>
          <textarea
            readOnly
            value={outputContent}
            className="w-full flex-1 min-h-[300px] p-4 bg-bg-base text-text-primary font-mono text-sm border border-border-base rounded-md focus:outline-none"
          />
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy Directives
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md transition-colors"
            >
              <Download className="size-4" /> Save robots.txt
            </button>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
