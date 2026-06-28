import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Mail, Lock, Key } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { user, loginWithGoogle, loginWithEmail, isLoading } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please enter email and password");
    
    setIsLoggingIn(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message || "Failed to log in.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleNotImplemented = (provider: string) => {
    toast.info(`${provider} login is coming soon!`);
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-16 animate-in fade-in duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text-primary mt-8">Login to your account</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => handleNotImplemented("Facebook")}
          className="flex-1 py-3 px-4 bg-[#3b5998] text-white rounded-lg hover:bg-[#2d4373] transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
            <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.954 10.124 11.854v-8.385H7.078v-3.469h3.046V9.356c0-3.007 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.988 24 12z" />
          </svg>
          Facebook
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="flex-1 py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
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
          Google
        </button>

        <button
          onClick={() => handleNotImplemented("SSO")}
          className="flex-1 py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Key className="size-5" />
          SSO
        </button>
      </div>

      <form className="space-y-4 mb-8" onSubmit={handleEmailLogin}>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors text-black placeholder:text-gray-400"
            required
            disabled={isLoggingIn}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors text-black placeholder:text-gray-400"
            required
            disabled={isLoggingIn}
          />
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full sm:w-auto sm:mx-auto block mt-8 py-3 px-8 bg-[#E03C32] text-white rounded-lg hover:bg-red-700 transition-colors font-bold text-lg disabled:opacity-50"
        >
          {isLoggingIn ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="text-center text-gray-600">
        <p className="text-lg">
          Not a member? <Link to="/register" className="text-[#E03C32] hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
