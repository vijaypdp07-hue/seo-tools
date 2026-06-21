import { Link } from "react-router-dom";
import { Link2, Code, Share2, SearchCode, ChevronRight, Settings, ExternalLink, Monitor, Globe, Search, Server, MapPin, FileDigit } from "lucide-react";

export function WebsiteToolsPage() {
  const tools = [
    { name: "Meta Tag Generator", icon: Code, path: "/tools/website/meta-tag-generator", desc: "Generate SEO-optimized HTML meta tags for your website." },
    { name: "Open Graph Generator", icon: Share2, path: "/tools/website/open-graph-generator", desc: "Create Open Graph tags for Facebook, Twitter, and LinkedIn." },
    { name: "Twitter Card Generator", icon: Share2, path: "/tools/website/twitter-card-generator", desc: "Generate perfectly formatted Twitter Card meta tags." },
    { name: "Robots.txt Generator", icon: SearchCode, path: "/tools/website/robots-txt-generator", desc: "Instantly create a robots.txt file to guide search engine crawlers." },
    { name: "XML Sitemap Generator", icon: Settings, path: "/tools/website/xml-sitemap-generator", desc: "Generate XML Sitemaps for your website." },
    { name: "HTML Viewer", icon: Code, path: "/tools/website/html-viewer", desc: "Preview HTML code as a rendered webpage safely." },
    { name: "URL Opener", icon: ExternalLink, path: "/tools/website/url-opener", desc: "Open multiple URLs at once." },
    { name: "Adsense Calculator", icon: Settings, path: "/tools/website/adsense-calculator", desc: "Estimate your AdSense earnings from daily page views and CTR." },
    { name: "URL Shortener", icon: Link2, path: "/tools/website/url-shortener", desc: "Create short, memorable links locally." },
    { name: "Check Server Status", icon: Server, path: "/tools/website/check-server-status", desc: "Check if a server or website is online." },
    { name: "Is It Down", icon: Monitor, path: "/tools/website/is-it-down", desc: "Check if a website is down across multiple servers." },
    { name: "What Is My Browser", icon: Monitor, path: "/tools/website/what-is-my-browser", desc: "View your user agent, IP, screen resolution and more." },
    { name: "Website Page Snooper", icon: Search, path: "/tools/website/website-page-snooper", desc: "Inspect HTTP headers of a webpage." },
    { name: "GEO IP Locator", icon: MapPin, path: "/tools/website/geo-ip-locator", desc: "Find the geographical location of any IP address or domain." },
    { name: "Website Page Size Checker", icon: FileDigit, path: "/tools/website/website-page-size-checker", desc: "Find out the total size of a web page." },
    { name: "Meta Tags Analyzer", icon: SearchCode, path: "/tools/website/meta-tags-analyzer", desc: "Analyze the meta tags of any webpage." },
    { name: "Redirect Checker", icon: Link2, path: "/tools/website/redirect-checker", desc: "Trace the redirect path of a URL." },
    { name: "Page Comparison", icon: Globe, path: "/tools/website/page-comparison", desc: "Compare two webpages." },
    { name: "Open Graph Checker", icon: Share2, path: "/tools/website/open-graph-checker", desc: "Preview your Open Graph social card." },
    { name: "Cloaking Checker", icon: SearchCode, path: "/tools/website/cloaking-checker", desc: "Check if a site is cloaking content." },
    { name: "Google Cache Checker", icon: Search, path: "/tools/website/google-cache-checker", desc: "View the cached version of any webpage." },
    { name: "Google Index Checker", icon: Globe, path: "/tools/website/google-index-checker", desc: "Check if Google has indexed a URL." },
    { name: "Page Authority Checker", icon: SearchCode, path: "/tools/website/page-authority-checker", desc: "Check Moz Page Authority for a URL." },
    { name: "Mobile Friendly Test", icon: Monitor, path: "/tools/website/mobile-friendly-test", desc: "Check if a page is optimized for mobile." },
    { name: "Link Tracker", icon: Link2, path: "/tools/website/link-tracker", desc: "Track clicks on your URLs." },
    { name: "Index Pages Checker", icon: Search, path: "/tools/website/index-pages-checker", desc: "Check multiple URLs for indexing." },
    { name: "Spam Score Checker", icon: SearchCode, path: "/tools/website/spam-score-checker", desc: "Check the Moz Spam Score for a domain." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">Website Tools</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <Settings className="size-8 text-primary" />
          Meta & Website Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          A collection of essential tools for webmasters. Generate meta tags, test robots, and optimize your website for search engines inside your browser.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
            >
              <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-secondary flex-1">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
