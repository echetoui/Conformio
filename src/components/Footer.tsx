import React from 'react';
import { LinkedinIcon, TwitterIcon, GlobeIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
function Footer() {
  const {
    t,
    language,
    setLanguage
  } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };
  return <footer className="py-8 border-t border-primary/10 bg-gradient-to-b from-bg to-bg-soft">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="text-2xl font-bold text-primary mb-6">
          <a href="/" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md hover:text-primary-dark transition-colors">
            Conformio
          </a>
        </div>
        <div className="flex items-center space-x-8 mb-6">
          <button onClick={toggleLanguage} className="group flex items-center space-x-2 text-text-soft hover:text-primary transition-all duration-200">
            <GlobeIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">{t('language')}</span>
          </button>
          <a href="https://linkedin.com/company/conformio" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-text-soft hover:text-primary transition-all duration-200" aria-label="LinkedIn">
            <LinkedinIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a href="https://x.com/conformio" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-text-soft hover:text-primary transition-all duration-200" aria-label="X (Twitter)">
            <TwitterIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Twitter</span>
          </a>
        </div>
        <div className="text-sm text-center">
          <div className="mb-2 text-text-soft">{t('footerDescription')}</div>
          <div className="text-text-soft">
            &copy; {new Date().getFullYear()} Conformio. {t('footerRights')}
          </div>
        </div>
      </div>
    </footer>;
}
export default Footer;