import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  X,
  FileText,
  Code,
  Settings,
  Image as ImageIcon
} from "lucide-react";

import { allTools, getCategories } from "@/lib/data/tools";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = useMemo(() => getCategories(), []);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const popularTools = useMemo(() => {
    return [
      { name: "Word Counter", path: "/tools/text/word-counter", icon: FileText, desc: "Quickly assess length and readable index." },
      { name: "JSON Viewer", path: "/tools/dev/json-viewer", icon: Code, desc: "Format, inspect, and beautify your raw responses." },
      { name: "Open Graph Generator", path: "/tools/website/open-graph-generator", icon: Settings, desc: "Maximize CTR on social link shares." },
      { name: "Image Compressor", path: "/tools/image/image-compressor", icon: ImageIcon, desc: "Shrink image weight inside your browser." },
    ];
  }, []);

  return (
    <div className="space-y-16 py-8 md:py-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          Free Online Tools for <span className="text-primary">Everyone</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          A client-side-optimized productivity platform. No signups, no slow servers, and completely private. All tasks are computed locally inside your browser browser.
        </p>

        {/* Dynamic Search Box */}
        <div className="pt-4 max-w-lg mx-auto relative">
          <div className="relative shadow-md rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-border-base bg-bg-base flex items-center pr-2">
            <span className="pl-4 text-text-muted">
              <Search className="size-5" />
            </span>
            <input 
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15+ microtools instantly..."
              className="w-full px-3 py-4 text-base bg-transparent border-0 outline-none placeholder:text-text-muted text-text-primary"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full hover:bg-bg-secondary text-text-muted transition-colors mr-2"
                title="Clear Search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Real-time dropdown search outcomes */}
          {searchQuery.trim() !== "" && (
            <div className="absolute left-0 right-0 mt-2 bg-bg-base border border-border-focus rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto text-left divide-y divide-border-base">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    className="block p-4 hover:bg-primary-light/40 hover:text-primary transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-primary transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-bg-secondary text-text-muted rounded-full border border-border-base">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-1">{tool.desc}</p>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-text-secondary">
                  <p className="font-medium">No tools matches &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-text-muted mt-1">Try searching for keywords like &quot;Word&quot;, &quot;JSON&quot;, &quot;PDF&quot;, or &quot;Tag&quot;.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Popular/Recent Tools */}
      <section className="bg-bg-secondary -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 rounded-3xl border border-border-base/10 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-primary size-5" />
            <h2 className="text-xl font-bold text-text-primary">Popular Utilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((p) => {
              const ToolIcon = p.icon;
              return (
                <Link 
                  key={p.name}
                  to={p.path} 
                  className="p-5 bg-bg-base border border-border-base rounded-xl hover:shadow-tool hover:border-border-focus transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-primary-light/50 rounded text-primary">
                        <ToolIcon className="size-4" />
                      </div>
                      <h4 className="font-bold text-text-primary text-sm sm:text-base group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-primary inline-flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRight className="size-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-primary size-5" />
          <h2 className="text-2xl font-bold text-text-primary">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={category.path}
                className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
              >
                <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-text-primary">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 flex-1 leading-relaxed">
                  {category.desc}
                </p>
                <div className="mt-auto text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary-light/30 rounded-full w-fit">
                  {category.count} {category.count === 1 ? "Tool" : "Tools"} Ready
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
