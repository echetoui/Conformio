import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Benefits = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: '🛡️',
      title: t('benefits.security.title'),
      description: t('benefits.security.description'),
    },
    {
      icon: '⚡',
      title: t('benefits.speed.title'),
      description: t('benefits.speed.description'),
    },
    {
      icon: '⏱️',
      title: t('benefits.time.title'),
      description: t('benefits.time.description'),
    },
    {
      icon: '📊',
      title: t('benefits.analytics.title'),
      description: t('benefits.analytics.description'),
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-32 bg-white" aria-labelledby="benefits-title">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 id="benefits-title" className="text-3xl md:text-4xl font-bold text-text mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-text/80">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-bg/50 hover:bg-bg/80 transition-colors"
              role="article"
              aria-labelledby={`benefit-title-${index}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl" aria-hidden="true">
                  {benefit.icon}
                </div>
                <div>
                  <h3 id={`benefit-title-${index}`} className="text-xl font-semibold text-text mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-text/80">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;