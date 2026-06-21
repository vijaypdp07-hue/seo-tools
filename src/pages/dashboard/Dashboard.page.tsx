import { useAuthStore } from "@/lib/store/useAuthStore";
import { useHistoryStore } from "@/lib/store/useHistoryStore";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Clock, Bookmark, Settings, LogOut, Search, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function DashboardPage() {
  const { user, tier, signOut, isLoading } = useAuthStore();
  const { history, fetchHistory, isLoading: isHistoryLoading } = useHistoryStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user, fetchHistory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: "/dashboard" } }} replace />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">
            Welcome back, {user.displayName || "User"}! You are on the <span className="font-semibold text-primary capitalize">{tier}</span> tier.
          </p>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 text-error hover:bg-error/10 transition-colors rounded-lg font-medium flex items-center justify-center gap-2 md:justify-start"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/history" className="bg-bg-secondary p-6 rounded-2xl border border-border-base hover:border-primary/50 transition-colors group">
          <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">History</h2>
          <p className="text-sm text-text-secondary">View your recently used tools and generated outputs.</p>
        </Link>
        
        <Link to="/dashboard/saved" className="bg-bg-secondary p-6 rounded-2xl border border-border-base hover:border-primary/50 transition-colors group">
          <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Bookmark className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Saved Tools</h2>
          <p className="text-sm text-text-secondary">Access your bookmarked tools and saved notations.</p>
        </Link>

        <Link to="/settings" className="bg-bg-secondary p-6 rounded-2xl border border-border-base hover:border-primary/50 transition-colors group">
          <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Settings</h2>
          <p className="text-sm text-text-secondary">Manage your preferences, language, and subscription.</p>
        </Link>
      </div>
      
      <div className="bg-bg-secondary rounded-2xl border border-border-base overflow-hidden">
        <div className="p-6 border-b border-border-base flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            Recent Activity
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-64 bg-bg border border-border-base rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={() => {
                if (history.length === 0) return;
                const headers = ["Tool Name", "Category", "Date Used", "Path"];
                const rows = history.map(entry => {
                    const date = entry.usedAt?.seconds ? new Date(entry.usedAt.seconds * 1000).toLocaleString() : new Date().toLocaleString();
                    return [
                        entry.toolSlug.replace(/-/g, ' '),
                        entry.category,
                        date,
                        entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`
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
                link.setAttribute('download', 'recent_tool_usage.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <Download className="size-4" />
              Export CSV
            </button>
            <Link to="/dashboard/history" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
        </div>
        
        {isHistoryLoading ? (
           <div className="p-8 flex justify-center">
             <div className="size-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
           </div>
        ) : (() => {
           const filteredHistory = history.filter(entry => {
             const query = searchQuery.toLowerCase();
             return entry.toolSlug.toLowerCase().replace(/-/g, ' ').includes(query) || 
                    entry.category.toLowerCase().includes(query);
           });
           
           return filteredHistory.length > 0 ? (
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-bg border-b border-border-base text-text-muted">
                   <tr>
                     <th className="font-semibold py-3 px-6">Tool Name</th>
                     <th className="font-semibold py-3 px-6">Date Used</th>
                     <th className="font-semibold py-3 px-6 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border-base">
                   {filteredHistory.slice(0, 5).map((entry) => (
                     <tr key={entry.id} className="hover:bg-bg transition-colors">
                       <td className="py-4 px-6">
                         <Link to={entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`} className="font-bold text-text-primary capitalize hover:text-primary transition-colors block">
                           {entry.toolSlug.replace(/-/g, ' ')}
                         </Link>
                         <span className="text-xs text-text-secondary">{entry.category}</span>
                       </td>
                       <td className="py-4 px-6 text-text-muted">
                          {entry.usedAt?.seconds ? new Date(entry.usedAt.seconds * 1000).toLocaleDateString() + ' ' + new Date(entry.usedAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                       </td>
                       <td className="py-4 px-6 text-right mt-1">
                         <Link to={entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-md font-medium text-xs">
                           Quick Re-run
                         </Link>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           ) : (
             <div className="p-8 text-center text-text-secondary">
               {searchQuery ? (
                   <p>No tools found matching your search.</p>
               ) : (
                 <>
                   <p>No recent activity found. Start using some tools!</p>
                   <Link to="/tools" className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-4">
                     <Search className="size-4" />
                     Browse Tools
                   </Link>
                 </>
               )}
             </div>
           );
        })()}
      </div>
    </div>
  );
}
