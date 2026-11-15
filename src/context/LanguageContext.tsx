import React, { createContext, useState, useEffect, useContext } from 'react';
import { getBrowserLanguage, isValidLanguage } from '../utils/language';
import { en } from "../locales/en";
import { fr } from "../locales/fr";

type Language = 'en' | 'fr';
type Translations = typeof en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => undefined,
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const getRouteLanguage = (): Language | null => {
    const segment = window.location.pathname.split('/')[1];
    return isValidLanguage(segment) ? segment : null;
  };

  const [language, setLanguageState] = useState<Language>(getRouteLanguage() ?? getBrowserLanguage());

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;

    const routeMatch = window.location.pathname.match(/^\/(fr|en)(.*)$/);
    if (routeMatch) {
      window.history.replaceState({}, '', `/${nextLanguage}${routeMatch[2] || ''}${window.location.search}${window.location.hash}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    if (!isValidLanguage(language)) {
      setLanguage('en');
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const translations: Record<Language, Translations> = {
    en,
    fr,
  };

  const t = (key: string): string => {
    try {
      const keys = key.split(".");
      let value: unknown = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      
      return typeof value === "string" ? value : key;
    } catch (error) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
