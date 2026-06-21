import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Bookmark } from "lucide-react";
import { useHistoryStore } from "@/lib/store/useHistoryStore";
import { useBookmarkStore } from "@/lib/store/useBookmarkStore";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { ToolErrorBoundary } from "@/components/error/ToolErrorBoundary";

interface ToolWrapperProps {
  title: string;
  description: string;
  categoryName: string;
  categoryPath: string;
  badges?: string[];
  children: ReactNode;
  seoContent?: ReactNode;
}

export function ToolWrapper({
  title,
  description,
  categoryName,
  categoryPath,
  badges = [],
  children,
  seoContent,
}: ToolWrapperProps) {
  const { pathname } = useLocation();
  const toolSlug = pathname.split('/').pop() || '';
  const { user } = useAuthStore();
  const recordUsage = useHistoryStore(state => state.recordUsage);
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(toolSlug));
  }, [isBookmarked, toolSlug, user]);

  useEffect(() => {
    // Record usage when tool is mounted
    if (toolSlug) {
      recordUsage(toolSlug, categoryName, pathname);
    }
  }, [toolSlug, categoryName, pathname, recordUsage]);

  const handleBookmark = async () => {
    if (!user) {
      toast.info("Please log in to bookmark tools.");
      return;
    }
    await toggleBookmark(toolSlug, categoryName, pathname);
    setBookmarked(!bookmarked);
    if (!bookmarked) toast.success("Added to bookmarks!");
    else toast.success("Removed from bookmarks.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <Link to={categoryPath} className="hover:text-primary transition-colors">{categoryName}</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">{title}</span>
      </nav>

      {/* Tool Header */}
      <header className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h1>
                <p className="text-lg text-text-secondary">{description}</p>
            </div>
            <button 
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-lg border transition-all self-start whitespace-nowrap ${bookmarked ? 'text-primary border-primary bg-primary/5' : 'text-text-primary border-border-base hover:border-primary hover:text-primary'}`}
            >
                <Bookmark className={`size-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-light text-success-light opacity-90 border border-success/20 !text-success">
                ● CLIENT SIDE
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-bg-secondary text-text-primary border border-border-base">
                FREE
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-bg-secondary text-text-primary border border-border-base">
                NO LOGIN REQUIRED
            </span>
            {badges.map((badge, idx) => (
                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bg-secondary text-text-secondary border border-border-base">
                    {badge}
                </span>
            ))}
        </div>
      </header>

      {/* Tool Main Interface */}
      <div className="bg-bg-base border border-border-base rounded-2xl shadow-sm overflow-hidden">
         <ToolErrorBoundary>
             {children}
         </ToolErrorBoundary>
      </div>

      {/* SEO Content */}
      {seoContent && (
          <div className="mt-12 pt-8 border-t border-border-base prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary-dark">
              {seoContent}
          </div>
      )}
    </div>
  );
}
