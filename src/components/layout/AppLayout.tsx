import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

export function AppLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-base text-text-primary">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
