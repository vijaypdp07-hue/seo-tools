import { Link } from "react-router-dom";
import { Search, Moon, Sun, Globe, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setShowLangMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-base bg-bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-bg-base/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-md flex justify-center items-center text-white font-bold text-xl">S</div>
            <span className="font-bold text-xl hidden sm:inline-block">SEO Tools</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/tools/text" className="transition-colors hover:text-primary text-text-secondary">{t('nav.textTools')}</Link>
            <Link to="/tools/image" className="transition-colors hover:text-primary text-text-secondary">{t('nav.imageTools')}</Link>
            <Link to="/tools/pdf" className="transition-colors hover:text-primary text-text-secondary">{t('nav.pdfTools')}</Link>
            <Link to="/tools/website" className="transition-colors hover:text-primary text-text-secondary">{t('nav.seoTools')}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
            <input
              type="search"
              placeholder={t('nav.searchPlaceholder')}
              className="pl-9 pr-4 py-2 text-sm bg-bg-secondary border border-border-base rounded-md focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>

          <button onClick={() => setIsDark(!isDark)} className="p-2 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-full transition-colors">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)} 
              className="p-2 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-full transition-colors flex items-center gap-1"
            >
              <Globe className="size-5" />
              <span className="text-xs font-medium uppercase">{i18n.language}</span>
            </button>

            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-32 bg-bg border border-border-base rounded-lg shadow-lg overflow-hidden z-50">
                  <button onClick={() => changeLanguage('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-secondary hover:text-primary transition-colors ${i18n.language.startsWith('en') ? 'text-primary font-medium' : 'text-text-secondary'}`}>English</button>
                  <button onClick={() => changeLanguage('hi')} className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-secondary hover:text-primary transition-colors ${i18n.language.startsWith('hi') ? 'text-primary font-medium' : 'text-text-secondary'}`}>हिंदी</button>
                  <button onClick={() => changeLanguage('es')} className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-secondary hover:text-primary transition-colors ${i18n.language.startsWith('es') ? 'text-primary font-medium' : 'text-text-secondary'}`}>Español</button>
                </div>
              </>
            )}
          </div>

          {user ? (
            <Link to="/dashboard" title="Dashboard" className="size-8 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors flex shrink-0">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Avatar" className="size-full object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <div className="size-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                   {user.displayName?.[0] || 'U'}
                 </div>
               )}
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
              <User className="size-4" />
              Log In
            </Link>
          )}

          <button className="md:hidden p-2 text-text-secondary hover:bg-bg-secondary rounded-md">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
