import { useState, FormEvent } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { RelatedTools } from "@/components/shared/RelatedTools";

interface ComingSoonProps {
  title: string;
  categoryName: string;
}

export function ComingSoonPage({ title, categoryName }: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleNotify = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API call to /api/notify
      await new Promise(r => setTimeout(r, 1000));
      toast.success("You're on the list! We'll notify you when it's ready.");
      setEmail("");
    } catch (error) {
      toast.error("Failed to sign up for notifications.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
        
        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 flex items-center gap-2">
          <span>⭐ Coming Soon</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
          {title}
        </h1>
        
        <p className="text-lg text-text-secondary max-w-2xl mb-8 leading-relaxed">
          We're working hard to bring you <strong className="text-text-primary">{title}</strong>. 
          This tool requires server processing and will be available very soon.
        </p>

        <form onSubmit={handleNotify} className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-10">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Bell className="size-4" />
            )}
            Notify Me When Ready
          </button>
        </form>

        <Link 
          to="/tools" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium border border-border-base px-6 py-3 rounded-lg hover:bg-bg-secondary"
        >
          <ArrowLeft className="size-4" />
          Back to All Tools
        </Link>
      </div>

      <div className="py-8 border-t border-border-base max-w-5xl mx-auto w-full px-4">
        <h3 className="text-lg font-bold text-text-primary mb-6">In the meantime, try these:</h3>
        <RelatedTools 
          category={categoryName.split(' ')[0].toLowerCase()} 
          currentSlug={location.pathname.split('/').pop() || ''} 
          count={4} 
        />
      </div>
    </div>
  );
}
