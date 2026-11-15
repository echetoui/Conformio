import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SpatialIllustrationVariant, SpatialInterfacePreview } from './SpatialIllustration';

const Features = () => {
  const { t } = useLanguage();

  const steps = [
    {
      variant: 'connect' as SpatialIllustrationVariant,
      eyebrow: 'Map',
      imageSrc: '/images/workflow/map-workflow.webp',
      imageAlt: 'Cartographie holographique des obligations, normes et contrôles interconnectés',
      title: t('features.step1.title'),
      description: t('features.step1.description'),
    },
    {
      variant: 'intelligence' as SpatialIllustrationVariant,
      eyebrow: 'Read',
      imageSrc: '/images/workflow/read-workflow.webp',
      imageAlt: 'Scanner intelligent révélant les écarts prioritaires dans les documents de conformité',
      title: t('features.step2.title'),
      description: t('features.step2.description'),
    },
    {
      variant: 'roadmap' as SpatialIllustrationVariant,
      eyebrow: 'Sequence',
      imageSrc: '/images/workflow/sequence-workflow.webp',
      imageAlt: 'Feuille de route tridimensionnelle avec étapes, jalons et connexions lumineuses',
      title: t('features.step3.title'),
      description: t('features.step3.description'),
    },
    {
      variant: 'monitoring' as SpatialIllustrationVariant,
      eyebrow: 'Review',
      imageSrc: '/images/workflow/review-workflow.webp',
      imageAlt: 'Coffre documentaire numérique présentant les validations et l’historique des preuves',
      title: t('features.step4.title'),
      description: t('features.step4.description'),
    },
  ];

  return (
    <section id="features" className="spatial-section border-y border-white/5 bg-slate-950/30" aria-labelledby="features-title">
      <div className="spatial-container">
        <div className="spatial-section-header mx-auto max-w-4xl text-center">
          <h2 id="features-title" className="spatial-heading">
            {t('features.title')}
          </h2>
          <p className="spatial-copy mx-auto mt-4 max-w-2xl text-xl">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="spatial-workflow-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="spatial-editorial-card spatial-workflow-card spatial-card"
              role="article"
              aria-labelledby={`step-title-${index}`}
            >
              <div className="text-left">
                <SpatialInterfacePreview
                  variant={step.variant}
                  imageSrc={step.imageSrc}
                  imageAlt={step.imageAlt}
                />
                <div className="spatial-step-meta mt-5">
                  <span className="spatial-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p className="spatial-eyebrow">{step.eyebrow}</p>
                </div>
                <h3 id={`step-title-${index}`} className="mb-2 mt-2 text-xl font-semibold text-slate-100">
                  {step.title}
                </h3>
                <p className="text-slate-300/85">
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
