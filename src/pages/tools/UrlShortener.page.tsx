import { useState, useEffect } from "react";
import { Link, Copy, Trash2, Globe, Link2, Check, ArrowRight } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, deleteDoc, doc, where } from "firebase/firestore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";

import { Turnstile } from '@marsidev/react-turnstile';

type LinkEntry = {
    id: string; // The doc id, which acts as the short code
    original: string;
    short: string;
    clicks: number;
    createdAt: any;
};

export function UrlShortenerPage() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
     if (!user) {
         setLinks([]);
         return;
     }

     const fetchLinks = async () => {
         try {
             // Create a query to read all user's short links
             const q = query(
                 collection(db, "short_links"), 
                 where("uid", "==", user.uid),
                 limit(20)
             );
             // Note: Without a composite index, we can't easily orderBy("createdAt") combined with where("uid"). 
             // We'll sort them on the client.
             const snapshot = await getDocs(q);
             const fetched: LinkEntry[] = [];
             snapshot.forEach((snapDoc) => {
                 const data = snapDoc.data();
                 fetched.push({
                     id: snapDoc.id,
                     original: data.original,
                     // Generate a mock URL base
                     short: `${window.location.origin}/s/${snapDoc.id}`,
                     clicks: data.clicks || 0,
                     createdAt: data.createdAt
                 });
             });
             
             fetched.sort((a, b) => {
                const aTime = a.createdAt?.seconds || 0;
                const bTime = b.createdAt?.seconds || 0;
                return bTime - aTime;
             });

             setLinks(fetched);
         } catch(e) {
             console.error(e);
         }
     }
     fetchLinks();
  }, [user]);

  const handleShorten = async () => {
      if (!user) {
          toast.info("Please log in to create persistent short links.");
          return;
      }
      if (!url) {
          setError("Please enter a URL.");
          return;
      }
      try {
          new URL(url);
          setError(null);
      } catch (e) {
          setError("Invalid URL format. Include http:// or https://");
          return;
      }

      setIsProcessing(true);
      try {
          // Verify URL and token with our backend
          const verifyRes = await fetch("/api/tools/verify-url", {
              method: "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({ url, token })
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) {
              setError(verifyData.error || "Verification failed");
              setIsProcessing(false);
              return;
          }

          const docRef = await addDoc(collection(db, "short_links"), {
              original: url,
              uid: user.uid,
              clicks: 0,
              createdAt: serverTimestamp()
          });

          const newLink: LinkEntry = {
              id: docRef.id,
              original: url,
              short: `${window.location.origin}/s/${docRef.id}`,
              clicks: 0,
              createdAt: { seconds: Date.now() / 1000 }
          };
          
          setLinks([newLink, ...links]);
          setUrl("");
          toast.success("URL successfully shortened!");
      } catch (e) {
          console.error(e);
          toast.error("Failed to create short link.");
      } finally {
          setIsProcessing(false);
      }
  };

  const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id: string) => {
      try {
          await deleteDoc(doc(db, "short_links", id));
          setLinks(links.filter(l => l.id !== id));
          toast.success("Link deleted.");
      } catch(e) {
          toast.error("Failed to delete link");
      }
  };

  return (
    <ToolWrapper
      title="URL Shortener"
      description="Create secure short links and track clicks."
      categoryName="Website Tools"
      categoryPath="/tools/website"
      seoContent={
          <div>
            <h2>How to shorten a URL?</h2>
            <ol>
              <li>Paste your long URL (including https://) into the input field.</li>
              <li>Click the "Shorten" button.</li>
              <li>Your new short link will instantly appear below, saved securely to your account.</li>
              <li>You can copy it, monitor real statistics, or delete it entirely.</li>
            </ol>
            <p className="text-sm border-l-4 border-primary p-4 bg-primary-light">Note: Links created here are permanently stored in the database. You must be logged in to track statistics.</p>
          </div>
      }
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Shorten a long link</h3>
                      <p className="text-sm text-text-secondary">{user ? "Paste your destination URL below to get started." : "Please log in to create and manage short links."}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                           <input 
                              type="url"
                              value={url}
                              onChange={(e) => {
                                  setUrl(e.target.value);
                                  if(error) setError(null);
                              }}
                              placeholder="https://example.com/very/long/path/with/params"
                              disabled={!user}
                              className={`w-full pl-12 pr-4 py-4 bg-bg border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full transition-all ${error ? 'border-error' : 'focus:border-primary'}`}
                           />
                      </div>
                      {user && import.meta.env.VITE_TURNSTILE_SITE_KEY && (
                          <div className="flex-none">
                              <Turnstile 
                                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} 
                                onSuccess={setToken}
                                options={{
                                    theme: 'auto',
                                }}
                              />
                          </div>
                      )}
                      <button 
                         onClick={handleShorten}
                         disabled={!user || isProcessing || (!token && !!import.meta.env.VITE_TURNSTILE_SITE_KEY)}
                         className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                      >
                          {isProcessing ? (
                              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : "Shorten"}
                      </button>
                  </div>
                  {error && <p className="text-sm text-error px-1 flex items-center gap-2"><div className="size-1.5 rounded-full bg-error" />{error}</p>}
              </div>

              {user && links.length > 0 && (
                  <div className="space-y-4 pt-4">
                      <h4 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Your Links ({links.length})</h4>
                      <div className="space-y-3">
                          {links.map(link => (
                              <div key={link.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-bg-base border border-border-base rounded-lg hover:shadow-sm transition-shadow group">
                                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                                      <div className="flex items-center gap-2 text-primary font-medium">
                                          <Link2 className="size-4 shrink-0" />
                                          <a href={link.short} target="_blank" rel="noopener noreferrer" className="hover:underline">{link.short}</a>
                                      </div>
                                      <div className="flex items-center text-sm text-text-muted gap-2 truncate">
                                          <ArrowRight className="size-3 shrink-0" />
                                          <span className="truncate">{link.original}</span>
                                      </div>
                                      <div className="flex items-center gap-4 mt-2 text-xs text-text-muted font-medium">
                                          <span className="flex items-center gap-1.5"><Globe className="size-3.5" />{link.clicks} clicks</span>
                                          <span className="flex items-center gap-1.5">
                                              Created {link.createdAt?.seconds ? formatDistanceToNow(new Date(link.createdAt.seconds * 1000), { addSuffix: true }) : 'Just now'}
                                          </span>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 md:gap-4 justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-base md:border-none">
                                      <div className="text-sm text-text-secondary whitespace-nowrap bg-bg-secondary px-3 py-1 rounded-md">
                                          <span className="font-bold">{link.clicks}</span> Clicks
                                      </div>
                                      
                                      <div className="flex gap-2">
                                          <button 
                                              onClick={() => handleCopy(link.short)}
                                              className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                                              title="Copy Short Link"
                                          >
                                              <Copy className="size-4" />
                                          </button>
                                          <button 
                                              onClick={() => handleDelete(link.id)}
                                              className="p-2 text-text-secondary hover:text-error hover:bg-error-light rounded-md transition-colors"
                                              title="Delete Link Record"
                                          >
                                              <Trash2 className="size-4" />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>
    </ToolWrapper>
  );
}
