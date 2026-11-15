import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SpatialIllustration, SpatialIllustrationVariant } from './SpatialIllustration';

const Benefits = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      variant: 'shield' as SpatialIllustrationVariant,
      eyebrow: 'Trust layer',
      imageSrc: '/images/features/trust-layer.webp',
      title: t('benefits.security.title'),
      description: t('benefits.security.description'),
    },
    {
      variant: 'automation' as SpatialIllustrationVariant,
      eyebrow: 'Signal layer',
      imageSrc: '/images/features/signal-layer.webp',
      title: t('benefits.speed.title'),
      description: t('benefits.speed.description'),
    },
    {
      variant: 'time' as SpatialIllustrationVariant,
      eyebrow: 'Momentum layer',
      imageSrc: '/images/features/momentum-layer.webp',
      title: t('benefits.time.title'),
      description: t('benefits.time.description'),
    },
    {
      variant: 'analytics' as SpatialIllustrationVariant,
      eyebrow: 'Visibility layer',
      imageSrc: '/images/features/visibility-layer.webp',
      title: t('benefits.analytics.title'),
      description: t('benefits.analytics.description'),
    },
  ];

  return (
    <section id="benefits" className="spatial-section" aria-labelledby="benefits-title">
      <div className="spatial-container">
        <div className="spatial-section-header mx-auto max-w-4xl text-center">
          <h2 id="benefits-title" className="spatial-heading">
            {t('benefits.title')}
          </h2>
          <p className="spatial-copy mx-auto mt-4 max-w-2xl text-xl">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="spatial-editorial-grid spatial-benefits-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`spatial-editorial-card ${index === 0 ? 'spatial-editorial-card-large' : index === 1 ? 'spatial-editorial-card-small' : ''}`}
              role="article"
              aria-labelledby={`benefit-title-${index}`}
            >
              <SpatialIllustration
                variant={benefit.variant}
                label={benefit.eyebrow}
                imageSrc={benefit.imageSrc}
                imageAlt=""
              />
              <div className="spatial-editorial-content">
                <p className="spatial-eyebrow mb-3">{benefit.eyebrow}</p>
                <h3 id={`benefit-title-${index}`} className="mb-2 text-xl font-semibold text-slate-100">
                  {benefit.title}
                </h3>
                <p className="text-slate-300/85">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
