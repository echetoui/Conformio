import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sitemapService } from '../services/sitemapService';

// Mapper les metaKey aux routes
const metaKeyToRoute: Record<string, string> = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
};

export function usePageMeta(metaKey: 'home' | 'privacy' | 'terms' | 'contact') {
  const { t } = useLanguage();

  const title = t(`meta.${metaKey}.title`);
  const description = t(`meta.${metaKey}.description`);
  const route = metaKeyToRoute[metaKey] || '/';
  const canonicalUrl = sitemapService.getCanonicalUrl(route);

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, canonicalUrl]);

  return { title, description, canonicalUrl };
}
