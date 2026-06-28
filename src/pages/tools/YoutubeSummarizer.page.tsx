import React, { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Youtube, Wand2, FileText, LayoutTemplate, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function YoutubeSummarizerPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ summary: string; blogPost: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "blog">("summary");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return toast.error("Please enter a YouTube URL");
    
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/youtube-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to process video");
      }

      setResult({
        summary: data.summary,
        blogPost: data.blogPost
      });
      toast.success("Successfully generated content!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolWrapper
      title="YouTube Video Summarizer & Blog Generator"
      description="Turn any YouTube video into a detailed summary and formatted blog post using AI."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-bg-base border border-border-base rounded-2xl p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <Youtube className="size-5 text-red-500" />
              Video URL
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">YouTube Link</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg-muted border border-border-base rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-primary placeholder:text-text-muted transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover active:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Wand2 className="size-5" />
                )}
                {isLoading ? "Generating Content..." : "Generate Summary & Blog"}
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3 text-sm text-yellow-600 dark:text-yellow-500">
              <AlertCircle className="size-5 shrink-0" />
              <p>The video must have captions enabled (auto-generated or manual) for the AI to process it.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4 text-text-muted bg-bg-base border border-border-base rounded-2xl p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <Loader2 className="size-10 text-primary animate-spin relative" />
              </div>
              <p className="font-medium animate-pulse">Reading transcript and writing content...</p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4 text-text-muted bg-bg-base border border-border-base rounded-2xl p-8">
              <div className="p-4 bg-bg-muted rounded-full">
                <Wand2 className="size-8" />
              </div>
              <p>Enter a YouTube URL to generate a summary and blog post.</p>
            </div>
          )}

          {!isLoading && result && (
            <div className="bg-bg-base border border-border-base rounded-2xl overflow-hidden flex flex-col h-full">
              <div className="flex border-b border-border-base overflow-x-auto">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={cn(
                    "flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition-colors whitespace-nowrap",
                    activeTab === "summary"
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-muted"
                  )}
                >
                  <FileText className="size-4" />
                  Key Takeaways
                </button>
                <button
                  onClick={() => setActiveTab("blog")}
                  className={cn(
                    "flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition-colors whitespace-nowrap",
                    activeTab === "blog"
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-muted"
                  )}
                >
                  <LayoutTemplate className="size-4" />
                  Blog Post
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown>
                  {activeTab === "summary" ? result.summary : result.blogPost}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
