import { Link } from "react-router-dom";
import { ArrowRight, LinkIcon } from "lucide-react";

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
  count?: number;
}

export function RelatedTools({ currentSlug, category, count = 4 }: RelatedToolsProps) {
  // In a real app, this would fetch from a defined list of tools
  // Here we just render mock placeholders based on the provided params
  return (
    <section className="mt-12 pt-8 border-t border-border-base">
      <div className="flex items-center gap-2 mb-6">
        <LinkIcon className="text-primary size-5" />
        <h2 className="text-xl font-bold text-text-primary">Related Tools</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
        {Array.from({ length: count }).map((_, i) => (
          <Link
            key={i}
            to={`/tools/${category}`}
            className="min-w-[280px] max-w-[280px] p-5 bg-bg-base border border-border-base rounded-xl hover:shadow-tool hover:border-border-focus transition-all group shrink-0 snap-start flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="size-8 bg-primary-light/50 rounded flex items-center justify-center text-primary">
                <LinkIcon className="size-4" />
              </div>
              <h4 className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors">
                Related {category} Tool {i + 1}
              </h4>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2 mt-1 mb-4 flex-1">
              Explore more tools in the {category} category to boost your productivity.
            </p>
            <div className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Tool</span>
              <ArrowRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
