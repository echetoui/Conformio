import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { sitemapService } from '../services/sitemapService';

interface PageHelmetProps {
  metaKey: 'home' | 'privacy' | 'terms' | 'contact';
}

// Mapper les metaKey aux routes
const metaKeyToRoute: Record<string, string> = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
};

export const PageHelmet: React.FC<PageHelmetProps> = ({ metaKey }) => {
  const { t } = useLanguage();

  const title = t(`meta.${metaKey}.title`);
  const description = t(`meta.${metaKey}.description`);
  const route = metaKeyToRoute[metaKey] || '/';
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
