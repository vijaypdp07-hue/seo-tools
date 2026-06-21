import { useBookmarkStore } from "@/lib/store/useBookmarkStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Bookmark, ArrowLeft } from "lucide-react";

export function SavedPage() {
  const { user } = useAuthStore();
  const { bookmarks, isLoading, fetchBookmarks } = useBookmarkStore();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks, user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 text-text-secondary">
        <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-2 font-medium">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
          <Bookmark className="size-8 text-primary" />
          Saved Tools
        </h1>
        <p className="text-text-secondary">
          Quickly access your favorite and bookmarked tools.
        </p>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border-base overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
             <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            <div className="size-16 bg-bg text-text-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="size-8" />
            </div>
            <p className="text-lg font-medium text-text-primary mb-2">No bookmarks yet</p>
            <p className="mb-6">You haven't bookmarked any tools. Click the Bookmark button while using a tool to save it here.</p>
            <Link to="/tools" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold inline-flex items-center gap-2">
              Browse Tools
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {bookmarks.map((entry) => (
              <Link 
                key={entry.id} 
                to={entry.toolPath || `/tools/${entry.categoryName.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`}
                className="p-6 bg-bg border border-border-base rounded-xl hover:border-primary transition-colors group flex flex-col items-center text-center gap-3"
              >
                <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bookmark className="size-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary capitalize">{entry.toolSlug.replace(/-/g, ' ')}</h3>
                  <p className="text-sm text-text-secondary">{entry.categoryName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
