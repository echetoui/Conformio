export type Language = 'en' | 'fr';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'fr'];

export function getBrowserLanguage(): Language {
  const browserLang = navigator.language.split('-')[0];
  return isValidLanguage(browserLang) ? browserLang : 'en';
}

export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
} 