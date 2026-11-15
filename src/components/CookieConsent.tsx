import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { disableAnalytics, loadAnalytics } from '../services/analyticsService';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (!consent) {
      setIsVisible(true);
    }

    const openSettings = () => setIsVisible(true);
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const isOpen = dialog.open || dialog.hasAttribute('open');

    if (isVisible && !isOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        // Keep tests and older embedded browsers usable while native dialog support loads.
        dialog.setAttribute('open', '');
      }
      dialog.querySelector<HTMLButtonElement>('button')?.focus();
    } else if (!isVisible && isOpen) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      previousFocusRef.current?.focus({ preventScroll: true });
    }
  }, [isVisible]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadAnalytics();
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    disableAnalytics();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.dialog
          ref={dialogRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="cookie-consent-panel glass-panel fixed bottom-4 z-50 rounded-2xl border border-cyan-200/15 shadow-2xl shadow-slate-950/50 md:bottom-5"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-description"
          onCancel={(event) => {
            event.preventDefault();
            declineCookies();
          }}
        >
          <div className="px-4 py-4 md:px-5 md:py-5">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <h2 id="cookie-title" className="mb-1 text-base font-semibold text-slate-100">
                  {language === 'fr' ? 'Paramètres de confidentialité' : 'Privacy Settings'}
                </h2>
                <p id="cookie-description" className="max-w-2xl text-sm leading-relaxed text-slate-300">
                  {language === 'fr' 
                    ? 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. Conformément à la Loi 25 du Québec, vous pouvez choisir d\'accepter ou de refuser les cookies non essentiels.'
                    : 'We use cookies to enhance your experience on our site. In accordance with Quebec\'s Law 25, you can choose to accept or decline non-essential cookies.'}
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                  onClick={acceptCookies}
                  className="spatial-button min-h-10 px-5 py-2 text-sm"
                >
                  {language === 'fr' ? 'Accepter' : 'Accept'}
                </button>
                <button
                  onClick={declineCookies}
                  className="spatial-button-secondary min-h-10 px-5 py-2 text-sm"
                >
                  {language === 'fr' ? 'Refuser' : 'Decline'}
                </button>
              </div>
            </div>
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
