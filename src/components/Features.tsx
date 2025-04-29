import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: '🔌',
      title: t('features.step1.title'),
      description: t('features.step1.description'),
    },
    {
      icon: '🧠',
      title: t('features.step2.title'),
      description: t('features.step2.description'),
    },
    {
      icon: '🗺️',
      title: t('features.step3.title'),
      description: t('features.step3.description'),
    },
    {
      icon: '📈',
      title: t('features.step4.title'),
      description: t('features.step4.description'),
    },
  ];

  return (
    <section id="features" className="py-16 md:py-32 bg-bg/50" aria-labelledby="features-title">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-text mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-text/80">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white hover:bg-bg/80 transition-colors"
              role="article"
              aria-labelledby={`step-title-${index}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-4" aria-hidden="true">
                  {step.icon}
                </div>
                <h3 id={`step-title-${index}`} className="text-xl font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;