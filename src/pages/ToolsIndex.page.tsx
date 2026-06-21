import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronRight, LayoutGrid, X } from "lucide-react";
import { allTools, getCategories } from "@/lib/data/tools";

export function ToolsIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

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

  return (
    <div className="space-y-12 py-8 animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-text-primary flex items-center justify-center gap-3">
          <LayoutGrid className="size-8 text-primary" />
          All Tools
        </h1>
        <p className="text-text-secondary">
          Browse our complete collection of fast, free, and secure online utilities.
        </p>
        
        {/* Search */}
        <div className="relative max-w-lg mx-auto shadow-sm rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-border-base bg-bg-base flex items-center pr-2">
          <span className="pl-4 text-text-muted">
            <Search className="size-5" />
          </span>
          <input 
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Find a tool..."
            className="w-full px-3 py-3 text-base bg-transparent border-0 outline-none placeholder:text-text-muted text-text-primary"
          />
          {searchQuery && (
            <button 
              onClick={() => handleSearchChange("")}
              className="p-1 rounded-full hover:bg-bg-secondary text-text-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {searchQuery.trim() !== "" ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Search Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.length > 0 ? (
              filteredTools.map((t) => (
                <Link
                  key={t.name}
                  to={t.path}
                  className="p-4 bg-bg-base border border-border-base rounded-xl hover:border-primary hover:shadow-tool transition-all group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {t.name}
                    </h3>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed flex-1">
                    {t.desc}
                  </p>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-text-muted group-hover:text-primary/70">
                    {t.category}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-text-secondary bg-bg-secondary rounded-xl border-dashed border border-border-base">
                No tools found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map((category) => {
            const categoryTools = allTools.filter(t => t.category === category.name);
            const Icon = category.icon;
            if(categoryTools.length === 0) return null;

            return (
              <section key={category.name} className="scroll-mt-24" id={category.name.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-light/40 rounded-lg text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{category.name}</h2>
                    <p className="text-text-secondary text-sm">{category.desc}</p>
                  </div>
                  <Link to={category.path} className="ml-auto text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    View all <ChevronRight className="size-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoryTools.slice(0, 8).map(tool => (
                    <Link
                      key={tool.name}
                      to={tool.path}
                      className="p-4 bg-bg-base border border-border-base rounded-xl hover:border-primary hover:shadow-tool transition-all group flex flex-col h-full"
                    >
                       <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                        {tool.name}
                       </h3>
                       <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {tool.desc}
                       </p>
                    </Link>
                  ))}
                  {categoryTools.length > 8 && (
                     <Link
                      to={category.path}
                      className="p-4 bg-bg-secondary border border-border-base border-dashed rounded-xl flex items-center justify-center flex-col gap-2 hover:bg-bg-tertiary transition-colors text-text-secondary group"
                     >
                        <span className="font-bold group-hover:text-primary">+{categoryTools.length - 8} more</span>
                        <span className="text-xs">Browse {category.name}</span>
                     </Link>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
