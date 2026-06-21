import { useHistoryStore, HistoryEntry } from "@/lib/store/useHistoryStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, ChevronDown, ChevronUp, Download, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function HistoryItem({ entry }: { entry: HistoryEntry; key?: string | number }) {
  const [expanded, setExpanded] = useState(false);
  const hasData = entry.data && (entry.data.result || entry.data.inputText);

  return (
    <li className="p-4 sm:p-6 hover:bg-bg transition-colors border-b border-border-base last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer" onClick={() => hasData && setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-text-primary capitalize flex items-center gap-2">
              {entry.toolSlug.replace(/-/g, ' ')}
            </h3>
            <p className="text-sm text-text-secondary">{entry.category}</p>
          </div>
          {hasData && (
             <button className="text-text-muted hover:text-primary transition-colors p-1" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
               {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
             </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">
            {entry.usedAt?.seconds ? formatDistanceToNow(new Date(entry.usedAt.seconds * 1000), { addSuffix: true }) : 'Just now'}
          </span>
          <Link 
            onClick={(e) => e.stopPropagation()}
            to={entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`}
            className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium text-sm"
          >
            Open Tool
          </Link>
        </div>
      </div>
      
      {expanded && hasData && (
        <div className="mt-4 p-4 bg-bg rounded-xl border border-border-base space-y-4 animate-in slide-in-from-top-2 duration-200">
          {entry.data.inputText && (
            <div>
              <p className="text-xs font-bold text-text-muted uppercase mb-1">Input Prompt</p>
              <div className="p-3 bg-bg-secondary rounded-lg text-sm text-text-secondary whitespace-pre-wrap">
                {entry.data.inputText}
              </div>
            </div>
          )}
          {entry.data.result && (
            <div>
              <p className="text-xs font-bold text-text-muted uppercase mb-1">Generated Output</p>
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-sm text-text-primary whitespace-pre-wrap">
                {entry.data.result}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export function HistoryPage() {
  const { user } = useAuthStore();
  const { history, isLoading, fetchHistory, clearHistory } = useHistoryStore();
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock size-8 text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Tool History
          </h1>
          <p className="text-text-secondary">
            Your recent tool usage within the last 30 days. Expand entries to view your generated content.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {history.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full bg-bg border border-border-base rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          {history.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                 onClick={() => {
                   const headers = ["Tool Name", "Category", "Date Used", "Path", "Input Prompt", "Result"];
                   const rows = history.map(entry => {
                       const date = entry.usedAt?.seconds ? new Date(entry.usedAt.seconds * 1000).toLocaleString() : new Date().toLocaleString();
                       return [
                           entry.toolSlug.replace(/-/g, ' '),
                           entry.category,
                           date,
                           entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`,
                           entry.data?.inputText || "",
                           entry.data?.result || ""
                       ];
                   });
                   const csvContent = [
                       headers.join(","),
                       ...rows.map(r => r.map(f => `"${String(f).replace(/"/g, '""')}"`).join(","))
                   ].join("\n");
                   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                   const url = URL.createObjectURL(blob);
                   const link = document.createElement('a');
                   link.href = url;
                   link.setAttribute('download', 'full_tool_history.csv');
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
                 }}
                 className="px-4 py-2 text-text-secondary hover:text-primary transition-colors hover:bg-bg border border-transparent hover:border-border-base rounded-lg font-medium flex items-center gap-2"
              >
                <Download className="size-4" />
                Export
              </button>
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-error hover:bg-error/10 border border-error/20 transition-colors rounded-lg font-medium flex items-center gap-2"
              >
                <Trash2 className="size-4" />
                Clear History
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border-base overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
             <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            <div className="size-16 bg-bg text-text-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock size-8"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-lg font-medium text-text-primary mb-2">No history found</p>
            <p className="mb-6">You haven't used any tools yet.</p>
            <Link to="/tools" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold inline-flex items-center gap-2">
              Browse Tools
            </Link>
          </div>
        ) : (() => {
           const filteredHistory = history.filter(entry => {
             const query = searchQuery.toLowerCase();
             return entry.toolSlug.toLowerCase().replace(/-/g, ' ').includes(query) || 
                    entry.category.toLowerCase().includes(query);
           });

           if (filteredHistory.length === 0) {
             return (
               <div className="p-12 text-center text-text-secondary">
                 <p className="text-lg font-medium text-text-primary mb-2">No matches found</p>
                 <p>Try adjusting your search query.</p>
               </div>
             );
           }

           return (
             <ul className="divide-y divide-border-base flex flex-col">
               {filteredHistory.map((entry) => (
                 <HistoryItem key={entry.id} entry={entry} />
               ))}
             </ul>
           );
        })()}
      </div>
    </div>
  );
}
