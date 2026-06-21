import { useAuthStore } from "@/lib/store/useAuthStore";
import { useHistoryStore } from "@/lib/store/useHistoryStore";
import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Clock, Bookmark, Settings, LogOut, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function DashboardPage() {
  const { user, tier, signOut, isLoading } = useAuthStore();
  const { history, fetchHistory, isLoading: isHistoryLoading } = useHistoryStore();

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
        <div className="p-6 border-b border-border-base flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            Recent Activity
          </h3>
          <Link to="/dashboard/history" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        
        {isHistoryLoading ? (
           <div className="p-8 flex justify-center">
             <div className="size-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
           </div>
        ) : history.length > 0 ? (
           <ul className="divide-y divide-border-base">
             {history.slice(0, 5).map((entry) => (
               <li key={entry.id} className="p-4 px-6 hover:bg-bg transition-colors flex items-center justify-between gap-4">
                 <div>
                   <Link to={entry.toolPath || `/tools/${entry.category.toLowerCase().replace(' ', '-')}/${entry.toolSlug}`} className="font-bold text-text-primary capitalize hover:text-primary transition-colors">
                     {entry.toolSlug.replace(/-/g, ' ')}
                   </Link>
                   <p className="text-sm text-text-secondary">{entry.category}</p>
                 </div>
                 <span className="text-sm text-text-muted">
                    {entry.usedAt?.seconds ? formatDistanceToNow(new Date(entry.usedAt.seconds * 1000), { addSuffix: true }) : 'Just now'}
                 </span>
               </li>
             ))}
           </ul>
        ) : (
          <div className="p-8 text-center text-text-secondary">
            <p>No recent activity found. Start using some tools!</p>
            <Link to="/tools" className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-4">
              <Search className="size-4" />
              Browse Tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
