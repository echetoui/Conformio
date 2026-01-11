import React, { createContext, useState, useEffect, useContext } from 'react';
import { SUPPORTED_LANGUAGES, getBrowserLanguage, isValidLanguage } from '../utils/language';
import { en } from "../locales/en";
import { fr } from "../locales/fr";

type Language = 'en' | 'fr';
type Translations = typeof en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage() as Language);

  useEffect(() => {
    if (!isValidLanguage(language)) {
      setLanguage('en');
    }
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}