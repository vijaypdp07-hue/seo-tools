import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <footer className="border-t border-border-base bg-bg-secondary w-full py-12 mt-12">
      <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-primary rounded-md flex justify-center items-center text-white font-bold text-xl">S</div>
            <span className="font-bold text-xl">SEO Tools</span>
          </div>
          <p className="text-text-secondary text-sm">
            {t('footer.description')}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-text-primary">{t('footer.categories')}</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link to="/tools/text" className="hover:text-primary transition-colors">{t('nav.textTools')}</Link></li>
            <li><Link to="/tools/image" className="hover:text-primary transition-colors">{t('nav.imageTools')}</Link></li>
            <li><Link to="/tools/pdf" className="hover:text-primary transition-colors">{t('nav.pdfTools')}</Link></li>
            <li><Link to="/tools/dev" className="hover:text-primary transition-colors">Dev Tools</Link></li>
          </ul>
        </div>

        <div>
           <h3 className="font-semibold mb-4 text-text-primary">{t('footer.popularTools')}</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link to="/tools/text/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
            <li><Link to="/tools/image/image-compressor" className="hover:text-primary transition-colors">Image Compressor</Link></li>
            <li><Link to="/tools/pdf/merge-pdf" className="hover:text-primary transition-colors">Merge PDF</Link></li>
          </ul>
        </div>

        <div>
           <h3 className="font-semibold mb-4 text-text-primary">{t('footer.legalSupport')}</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link to="/contact" className="hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
            <li><a href="mailto:shomaths.dev@gmail.com" className="hover:text-primary transition-colors">shomaths.dev@gmail.com</a></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border-base text-center text-text-muted text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} SEO Tools. {t('footer.rights')}</p>
        <div className="flex gap-4">
            <span onClick={() => changeLanguage('en')} className={`hover:text-primary cursor-pointer transition-colors ${i18n.language.startsWith('en') ? 'text-primary' : ''}`}>English</span>
            <span onClick={() => changeLanguage('hi')} className={`hover:text-primary cursor-pointer transition-colors ${i18n.language.startsWith('hi') ? 'text-primary' : ''}`}>Hindi</span>
            <span onClick={() => changeLanguage('es')} className={`hover:text-primary cursor-pointer transition-colors ${i18n.language.startsWith('es') ? 'text-primary' : ''}`}>Español</span>
        </div>
      </div>
    </footer>
  );
}
