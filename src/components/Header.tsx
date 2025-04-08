import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, FileTextIcon, BoxIcon, ArrowRight, Gift } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const scrollToForm = () => {
    const form = document.querySelector('form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t('nav.features'), href: '#features', title: 'Pourquoi choisir notre solution ?' },
    { label: t('nav.benefits'), href: '#benefits', title: 'Conformité automatisée, en 4 étapes simples' },
    { label: t('nav.about'), href: '#about', title: 'Questions fréquentes' },
    { label: t('nav.contact'), href: '/contact' }
  ];

  const handleNavigation = (href: string, title?: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (title) {
          const titleElement = element.querySelector('h2');
          if (titleElement) {
            titleElement.textContent = title;
          }
        }
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="h-20 px-6 md:px-10 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate('/')}
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-2xl font-bold text-blue-600">Conformio</span>
            <span className="sr-only">Accueil</span>
          </motion.button>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavigation(item.href, item.title)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-4 h-4" />
              {language === 'fr' ? 'Commencer l\'essai gratuit' : 'Start free trial'}
            </motion.button>
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </motion.button>
          </div>

          {/* Menu burger mobile */}
          <motion.button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleNavigation(item.href, item.title)}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={scrollToForm}
                  className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Gift className="w-4 h-4" />
                  {language === 'fr' ? 'Commencer l\'essai gratuit' : 'Start free trial'}
                </motion.button>
                <motion.button
                  onClick={toggleLanguage}
                  className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
};

export default Header;