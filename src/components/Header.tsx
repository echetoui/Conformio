import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const {
    t
  } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    label: t('features'),
    href: '#features'
  }, {
    label: t('about'),
    href: '#benefits'
  }, {
    label: t('contact'),
    href: '#contact'
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="inline-block text-2xl font-bold text-primary hover:text-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
          Conformio
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => <a key={item.href} href={item.href} className="text-text-soft hover:text-primary transition-colors">
              {item.label}
            </a>)}
          <a href="#contact" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            {t('getStarted')}
          </a>
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-text-soft hover:text-primary transition-colors" aria-label="Menu principal" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {isMenuOpen && <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-sm border-b border-primary/10 md:hidden">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-4">
              {navItems.map(item => <a key={item.href} href={item.href} className="text-text-soft hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>)}
              <a href="#contact" className="inline-block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 text-center" onClick={() => setIsMenuOpen(false)}>
                {t('getStarted')}
              </a>
            </nav>
          </div>}
      </div>
    </header>;
}