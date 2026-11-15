import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasMenuOpenRef = useRef(false);

  const startFreeTrial = () => {
    window.open('https://cal.com/conformio', '_blank', 'noopener,noreferrer');
  };

  const navItems = [
    { label: t('nav.features'), href: '#features', title: 'Conformité automatisée, en 4 étapes simples' },
    { label: t('nav.method'), href: language === 'fr' ? '/fr/methode-conformite' : '/en/compliance-method', title: 'La méthode Conformio en quatre étapes' },
    { label: t('nav.benefits'), href: '#benefits', title: 'Pourquoi choisir notre solution ?' },
    { label: t('nav.about'), href: '#about', title: 'Questions fréquentes' },
    { label: t('nav.contact'), href: '#trial', title: 'Commencez votre essai gratuit' }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`${language === 'fr' ? '/fr' : '/en'}${href}`);
      }
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  useEffect(() => {
    const siteContent = Array.from(document.querySelectorAll<HTMLElement>('[data-site-content="true"]'));
    siteContent.forEach((element) => {
      if (isMenuOpen) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
    });

    if (isMenuOpen) {
      requestAnimationFrame(() => {
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
      });
    } else if (wasMenuOpenRef.current) {
      menuButtonRef.current?.focus({ preventScroll: true });
    }

    wasMenuOpenRef.current = isMenuOpen;

    return () => {
      siteContent.forEach((element) => element.removeAttribute('inert'));
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="spatial-header-inner mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate(`/${language}`)}
            className="focus-ring relative flex items-center rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-2xl font-bold tracking-tight text-cyan-200">Conformio</span>
            <span className="sr-only">Accueil</span>
          </motion.button>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Menu principal">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                className="focus-ring rounded-md text-slate-300 hover:text-cyan-200"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              onClick={startFreeTrial}
              className="spatial-button px-4 py-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'fr' ? 'Commencer l\'essai gratuit' : 'Start free trial'}
            </motion.button>
            <motion.button
              onClick={toggleLanguage}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </motion.button>
          </div>

          {/* Menu burger mobile */}
          <motion.button
            ref={menuButtonRef}
            className="focus-ring lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 hover:text-cyan-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">{isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </motion.button>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 right-0 top-16 z-50 border-b border-white/10 bg-slate-950/95 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:hidden"
              id="mobile-menu"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    className="focus-ring block w-full rounded-md px-3 py-2 text-left text-base font-medium text-slate-200 hover:bg-white/10 hover:text-cyan-200"
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={startFreeTrial}
                  className="spatial-button mt-4 w-full px-4 py-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'fr' ? 'Commencer l\'essai gratuit' : 'Start free trial'}
                </motion.button>
                <motion.button
                  onClick={toggleLanguage}
                  className="focus-ring mt-2 inline-flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/15"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'fr' ? 'Switch to English' : 'Passer en français'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
