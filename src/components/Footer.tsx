import React from 'react';
import { LinkedinIcon, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Conformio",
    "url": "https://www.conformio.ca",
    "logo": "https://www.conformio.ca/logo.svg",
    "areaServed": "CA"
  };

  return (
    <footer data-site-content="true" className="border-t border-white/10 bg-slate-950/80 py-8" role="contentinfo">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <div className="spatial-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo et copyright */}
          <div className="flex items-center gap-2">
            <Link to={`/${language}`} aria-label="Conformio - Accueil">
              <motion.span 
                className="inline-block text-lg font-bold text-cyan-200 hover:text-cyan-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Conformio
              </motion.span>
            </Link>
            <span className="text-slate-400">
              © {currentYear}
            </span>
          </div>

          {/* Liens */}
          <nav className="flex items-center gap-6" aria-label="Liens du pied de page">
            <Link to="/privacy" className="text-sm text-slate-300 hover:text-cyan-200">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-slate-300 hover:text-cyan-200">
              {t('footer.terms')}
            </Link>
            <Link to="/contact" className="text-sm text-slate-300 hover:text-cyan-200">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                {t('nav.contact')}
              </motion.span>
            </Link>
            <Link to={language === 'fr' ? '/fr/methode-conformite' : '/en/compliance-method'} className="text-sm text-slate-300 hover:text-cyan-200">
              {t('nav.method')}
            </Link>
            <button
              type="button"
              className="text-sm text-slate-300 hover:text-cyan-200"
              onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
            >
              {language === 'fr' ? 'Confidentialité' : 'Privacy settings'}
            </button>
          </nav>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/conformio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/conformio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-200"
              aria-label="X (anciennement Twitter)"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-slate-500">
            {t('footer.copyright').replace('2024', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
