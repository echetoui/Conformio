import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { sitemapService } from '../services/sitemapService';

interface PageHelmetProps {
  metaKey: 'home' | 'privacy' | 'terms' | 'contact' | 'method';
}

// Mapper les metaKey aux routes
const metaKeyToRoute: Record<string, string> = {
  home: '/fr',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
  method: '/fr/methode-conformite',
};

export const PageHelmet: React.FC<PageHelmetProps> = ({ metaKey }) => {
  const { t } = useLanguage();

  const title = t(`meta.${metaKey}.title`);
  const description = t(`meta.${metaKey}.description`);
  const route = metaKey === 'home'
    ? (window.location.pathname.startsWith('/en') ? '/en' : '/fr')
    : metaKey === 'method'
      ? (window.location.pathname.startsWith('/en/') ? '/en/compliance-method' : '/fr/methode-conformite')
      : metaKeyToRoute[metaKey] || '/fr';
  const canonicalUrl = sitemapService.getCanonicalUrl(route);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
