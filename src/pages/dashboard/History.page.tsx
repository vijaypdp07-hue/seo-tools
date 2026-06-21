import { useHistoryStore } from "@/lib/store/useHistoryStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Clock, ArrowLeft, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function HistoryPage() {
  const { user } = useAuthStore();
  const { history, isLoading, fetchHistory, clearHistory } = useHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, user]);

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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Clock className="size-8 text-primary" />
            Tool History
          </h1>
          <p className="text-text-secondary">
            Your recent tool usage within the last 30 days.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-error hover:bg-error/10 border border-error/20 transition-colors rounded-lg font-medium flex items-center gap-2"
          >
            <Trash2 className="size-4" />
            Clear History
          </button>
        )}
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border-base overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
             <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            <div className="size-16 bg-bg text-text-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="size-8" />
            </div>
            <p className="text-lg font-medium text-text-primary mb-2">No history found</p>
            <p className="mb-6">You haven't used any tools yet.</p>
            <Link to="/tools" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold inline-flex items-center gap-2">
              Browse Tools
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border-base">
            {history.map((entry) => (
              <li key={entry.id} className="p-4 sm:p-6 hover:bg-bg transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-text-primary capitalize">{entry.toolSlug.replace(/-/g, ' ')}</h3>
                  <p className="text-sm text-text-secondary">{entry.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted">
                    {entry.usedAt?.seconds ? formatDistanceToNow(new Date(entry.usedAt.seconds * 1000), { addSuffix: true }) : 'Just now'}
                  </span>
                  <Link 
                    to={entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`}
                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium text-sm"
                  >
                    Open Tool
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
