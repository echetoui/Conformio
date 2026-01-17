import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { sitemapService } from '../services/sitemapService';
import { useLocation } from 'react-router-dom';

interface PageHelmetProps {
  metaKey: 'home' | 'privacy' | 'terms';
}

export const PageHelmet: React.FC<PageHelmetProps> = ({ metaKey }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const title = t(`meta.${metaKey}.title`);
  const description = t(`meta.${metaKey}.description`);
  const canonicalUrl = sitemapService.getCanonicalUrl(location.pathname);

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
