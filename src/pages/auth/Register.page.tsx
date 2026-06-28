import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Mail, Lock, User as UserIcon, Key } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function RegisterPage() {
  const { user, loginWithGoogle, registerWithEmail, isLoading } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [name, setName] = useState("");
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

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Please fill all fields");
    
    setIsLoggingIn(true);
    try {
      await registerWithEmail(email, password, name);
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleNotImplemented = (provider: string) => {
    toast.info(`${provider} login is coming soon!`);
  };

  return (
    <div className="max-w-[480px] mx-auto w-full px-4 py-12 md:py-20 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Create new account</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={() => handleNotImplemented("Facebook")}
          className="flex-1 py-2.5 px-4 bg-[#3b5998] text-white rounded-lg hover:bg-[#2d4373] transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
            <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.954 10.124 11.854v-8.385H7.078v-3.469h3.046V9.356c0-3.007 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.988 24 12z" />
          </svg>
          Facebook
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="flex-1 py-2.5 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
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
          className="flex-1 py-2.5 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Key className="size-5 text-gray-500" />
          SSO
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-base"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-bg-base text-text-muted">Or register with email</span>
        </div>
      </div>

      <form className="space-y-4 mb-8" onSubmit={handleEmailRegister}>
        <div className="group relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="peer w-full pl-11 pr-4 py-3 bg-bg-base border border-border-base rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-primary disabled:opacity-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
            required
            minLength={2}
            disabled={isLoggingIn}
          />
          <p className="mt-1 hidden text-xs text-red-500 peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block">
            Please enter your full name.
          </p>
        </div>

        <div className="group relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="peer w-full pl-11 pr-4 py-3 bg-bg-base border border-border-base rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-primary disabled:opacity-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address."
            disabled={isLoggingIn}
          />
          <p className="mt-1 hidden text-xs text-red-500 peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block">
            Please enter a valid email address.
          </p>
        </div>

        <div className="group relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="peer w-full pl-11 pr-4 py-3 bg-bg-base border border-border-base rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-primary disabled:opacity-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
            required
            minLength={6}
            disabled={isLoggingIn}
          />
          <p className="mt-1 hidden text-xs text-red-500 peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block">
            Password must be at least 6 characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full py-3.5 px-8 bg-[#E03C32] text-white rounded-xl hover:bg-red-700 transition-all font-bold text-lg disabled:opacity-70 flex justify-center items-center shadow-md hover:shadow-lg mt-6"
        >
          {isLoggingIn ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="text-center text-text-secondary mt-8">
        <p className="text-base mb-3">
          Already a member? <Link to="/login" className="text-[#E03C32] hover:text-red-700 hover:underline font-semibold transition-colors">Log in</Link>
        </p>
        <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
          By creating an account, you agree to our <a href="#" className="text-text-primary hover:underline hover:text-[#E03C32] transition-colors">Terms of Service</a> and <a href="#" className="text-text-primary hover:underline hover:text-[#E03C32] transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
