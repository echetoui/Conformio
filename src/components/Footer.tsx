import React from 'react';
import { LinkedinIcon, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-6 bg-bg border-t border-text/10" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo et copyright */}
          <div className="flex items-center gap-2">
            <motion.a 
              href="/" 
              className="text-lg font-bold text-primary hover:text-primary/90" 
              aria-label="Conformio - Accueil"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Conformio
            </motion.a>
            <span className="text-text/60">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Liens */}
          <nav className="flex items-center gap-6" aria-label="Liens du pied de page">
            <Link to="/privacy" className="text-sm text-text/80 hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-text/80 hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
            <motion.a 
              href="/contact"
              className="text-sm text-text/80 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('nav.contact')}
            </motion.a>
          </nav>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/conformio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/80 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/conformio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/80 hover:text-primary transition-colors"
              aria-label="X (anciennement Twitter)"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            {t('footer.copyright').replace('2024', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;