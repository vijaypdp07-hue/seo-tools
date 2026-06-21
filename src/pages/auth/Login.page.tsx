import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { user, loginWithGoogle, isLoading } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message || "Failed to log in.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 py-16 animate-in fade-in duration-300">
      <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-base text-center">
        <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn className="size-6" />
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h1>
        <p className="text-text-secondary mb-8">
          Sign in to access your history, saved tools, and more.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full py-3 px-4 bg-bg text-text-primary border border-border-base rounded-lg hover:bg-bg-secondary transition-colors font-medium flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoggingIn ? (
            <div className="size-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.549L20.0303 3.125C17.9503 1.19 15.2353 0 12.0003 0C7.3103 0 3.2553 2.69 1.2803 6.609L5.2703 9.704C6.2153 6.86 8.8703 4.75 12.0003 4.75Z" fill="#EA4335" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9554 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
            </svg>
          )}
          Continue with Google
        </button>
      </div>
    </div>
  );
}
