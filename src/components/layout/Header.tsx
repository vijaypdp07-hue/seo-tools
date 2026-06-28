import { Link, useNavigate } from "react-router-dom";
import { Search, Moon, Sun, Globe, Menu, User, ChevronDown, X, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

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

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium h-full">
            <Link to="/tools/pdf/merge-pdf" className="transition-colors hover:text-primary text-text-secondary">Merge PDF</Link>
            <Link to="/tools/pdf/split-pdf" className="transition-colors hover:text-primary text-text-secondary">Split PDF</Link>
            <Link to="/tools/pdf/compress-pdf" className="transition-colors hover:text-primary text-text-secondary">Compress PDF</Link>
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 transition-colors hover:text-primary text-text-secondary py-4 cursor-pointer">
                Convert PDF <ChevronDown className="size-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-16 left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 w-56 bg-bg border border-border-base shadow-xl rounded-b-xl flex flex-col p-4 gap-4">
                <div>
                  <div className="font-bold text-xs uppercase text-text-muted mb-2 tracking-wider">Convert to PDF</div>
                  <div className="space-y-1">
                    <Link to="/tools/pdf/word-to-pdf" className="block py-1.5 px-3 -mx-3 rounded-md text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors">WORD to PDF</Link>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xs uppercase text-text-muted mb-2 tracking-wider">Convert from PDF</div>
                  <div className="space-y-1">
                    <Link to="/tools/pdf/pdf-to-jpg" className="block py-1.5 px-3 -mx-3 rounded-md text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors">PDF to JPG</Link>
                    <Link to="/tools/pdf/pdf-to-word" className="block py-1.5 px-3 -mx-3 rounded-md text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors">PDF to WORD</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <Link to="/tools" className="flex items-center gap-1 transition-colors hover:text-primary text-text-primary font-bold py-4 cursor-pointer">
                All Tools <ChevronDown className="size-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>
              
              <div className="absolute top-16 left-1/2 -translate-x-1/2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 w-[800px] bg-bg border border-border-base shadow-xl rounded-b-xl p-8 cursor-default">
                <div className="grid grid-cols-4 gap-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-3">PDF Tools</div>
                      <div className="space-y-1 text-sm">
                        <Link to="/tools/pdf/merge-pdf" className="block py-1 text-text-secondary hover:text-primary transition-colors">Merge PDF</Link>
                        <Link to="/tools/pdf/split-pdf" className="block py-1 text-text-secondary hover:text-primary transition-colors">Split PDF</Link>
                        <Link to="/tools/pdf/compress-pdf" className="block py-1 text-text-secondary hover:text-primary transition-colors">Compress PDF</Link>
                        <Link to="/tools/pdf/rotate-pdf" className="block py-1 text-text-secondary hover:text-primary transition-colors">Rotate PDF</Link>
                        <Link to="/tools/pdf/lock-pdf" className="block py-1 text-text-secondary hover:text-primary transition-colors">Protect PDF</Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Column 2 */}
                  <div className="space-y-6">
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-3">AI & Text</div>
                      <div className="space-y-1 text-sm">
                        <Link to="/tools/ai/article-rewriter" className="block py-1 text-text-secondary hover:text-primary transition-colors">Article Rewriter</Link>
                        <Link to="/tools/ai/grammar-checker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Grammar Checker</Link>
                        <Link to="/tools/text/word-counter" className="block py-1 text-text-secondary hover:text-primary transition-colors">Word Counter</Link>
                        <Link to="/tools/text/case-converter" className="block py-1 text-text-secondary hover:text-primary transition-colors">Case Converter</Link>
                        <Link to="/tools/ai/summarizer" className="block py-1 text-text-secondary hover:text-primary transition-colors">Text Summarizer</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-6">
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-3">SEO & Domain</div>
                      <div className="space-y-1 text-sm">
                        <Link to="/tools/website/website-page-snooper" className="block py-1 text-text-secondary hover:text-primary transition-colors">Page Snooper</Link>
                        <Link to="/tools/website/page-speed-test" className="block py-1 text-text-secondary hover:text-primary transition-colors">Speed Test</Link>
                        <Link to="/tools/domain/domain-hosting-checker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Hosting Checker</Link>
                        <Link to="/tools/domain/domain-age-checker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Domain Age</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div className="space-y-6">
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-3">Design Tools</div>
                      <div className="space-y-1 text-sm">
                        <Link to="/tools/design/logo-maker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Logo Maker</Link>
                        <Link to="/tools/design/resume-builder" className="block py-1 text-text-secondary hover:text-primary transition-colors">Resume Builder</Link>
                        <Link to="/tools/design/flyer-maker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Flyer Maker</Link>
                        <Link to="/tools/design/business-card-maker" className="block py-1 text-text-secondary hover:text-primary transition-colors">Business Cards</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder={t('nav.searchPlaceholder')}
              className="pl-9 pr-4 py-2 text-sm bg-bg-secondary border border-border-base rounded-md focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>

          <button onClick={() => setIsDark(!isDark)} className="p-2 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-full transition-colors">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          
          <div className="relative hidden md:block">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)} 
              className="p-2 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-full transition-colors flex items-center gap-1"
            >
              <Globe className="size-5" />
              <span className="text-xs font-medium uppercase">{i18n.language}</span>
              <ChevronDown className="size-3 opacity-50" />
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
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                Sign up
              </Link>
            </div>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-text-secondary hover:bg-bg-secondary rounded-md transition-colors z-[60]">
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-50 bg-bg-base overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col p-4 w-full pb-20">
            {/* Search (Mobile) */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-5 w-5 text-text-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 text-base bg-bg-secondary border border-border-base rounded-xl focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-primary transition-all text-text-primary"
              />
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-secondary text-text-primary font-semibold transition-colors border border-border-base/50">
                <span>Browse All Tools</span>
                <ArrowRight className="size-4 opacity-50" />
              </Link>
              
              <div className="mt-4 px-2 tracking-wider text-xs font-bold uppercase text-text-muted">Categories</div>
              <Link to="/tools/pdf" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">PDF Tools</Link>
              <Link to="/tools/text" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">Text Tools</Link>
              <Link to="/tools/image" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">Image Tools</Link>
              <Link to="/tools/ai" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">AI Tools</Link>
              <Link to="/tools/design" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">Design Tools</Link>
              <Link to="/tools/dev" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">Dev Tools</Link>
              <Link to="/tools/website" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">SEO & Meta</Link>
              <Link to="/tools/calculators" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg font-medium transition-colors">Calculators</Link>
              
              <div className="h-px bg-border-base my-2 w-full"></div>
              
              {!user && (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-center text-text-primary border border-border-base hover:bg-bg-secondary rounded-lg font-medium transition-colors mt-2">Login</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-center text-white bg-primary hover:bg-primary-dark rounded-lg font-medium transition-colors">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
