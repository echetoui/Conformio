import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useForm, ValidationError } from '@formspree/react';
import InternationalGlobePrototype from './InternationalGlobePrototype';
import { SpatialStandardIcon } from './SpatialIllustration';

const StandardBadge = ({
  name,
  description,
  standard,
}: {
  name: string;
  description: string;
  standard: 'soc2' | 'iso' | 'privacy' | 'tgv' | 'other';
}) => {
  return (
    <div className="relative group flex flex-col items-center justify-center h-full">
      <div className="absolute inset-0 rounded-2xl bg-cyan-300/10 blur-xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="glass-panel relative flex h-full w-full flex-col items-center gap-2 rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-1">
        <SpatialStandardIcon variant={standard} />
        <span className="text-sm font-semibold text-slate-100">{name}</span>
        <span className="text-center text-[0.68rem] leading-tight text-slate-400">{description}</span>
      </div>
    </div>
  );
};

export function Hero() {
  const { t, language } = useLanguage();
  const [state, handleSubmit] = useForm("xrbpvpod");

  const standards = [
    {
      name: 'SOC 2',
      standard: 'soc2' as const,
      description: 'Standard de sécurité pour les entreprises technologiques',
    },
    {
      name: 'ISO 27001',
      standard: 'iso' as const,
      description: 'Standard international',
    },
    {
      name: 'Loi 25',
      standard: 'privacy' as const,
      description: 'Loi sur la protection des renseignements personnels',
    },
    {
      name: 'TGV',
      standard: 'tgv' as const,
      description: language === 'fr' ? 'Norme gouvernementale' : 'Government framework',
    },
    {
      name: language === 'fr' ? 'Autre' : 'Other',
      standard: 'other' as const,
      description: language === 'fr' ? 'Autre référentiel ou exigence' : 'Other framework or requirement',
    },
  ];

  return (
    <section className="spatial-hero-section relative isolate overflow-hidden">
      <div className="spatial-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="spatial-container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pt-4 md:pt-10">
          <p className="spatial-kicker mb-5">Conformio Spatial Intelligence</p>
          <h1 tabIndex={-1} className="spatial-heading max-w-3xl focus:outline-none">
            {t('hero.title')}
          </h1>
          <p className="spatial-copy mt-6 max-w-2xl text-lg md:text-xl">
            {t('hero.subtitle')}
          </p>
          
          {state.succeeded ? (
            <div className="glass-panel mt-8 rounded-2xl p-4" aria-live="polite">
              <p className="font-medium text-cyan-200">
                {language === 'fr' 
                  ? "Génial ! Votre message nous est bien parvenu. On vous envoie bientôt des nouvelles !" 
                  : "Great! Your message has been received. We'll be in touch soon!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" aria-label={language === 'fr' ? 'Demande de contact' : 'Contact request'}>
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  {language === 'fr' ? "Votre adresse email" : "Your email address"}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder={language === 'fr' ? 'Votre adresse email…' : 'Your email address…'}
                  className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
                  required
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="mt-1 text-sm text-rose-300"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="spatial-button disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('hero.contact')}
              </button>
            </form>
          )}
          
          <div className="spatial-standard-grid mt-8">
            {standards.map((standard, index) => (
              <StandardBadge
                key={index}
                name={standard.name}
                standard={standard.standard}
                description={standard.description}
              />
            ))}
          </div>
          <a href={language === 'fr' ? '/fr/methode-conformite' : '/en/compliance-method'} className="spatial-button-secondary mt-5 w-fit">
            {language === 'fr' ? 'Découvrir la méthode Conformio' : 'Explore the Conformio method'}
          </a>
        </div>
        <div className="relative lg:pt-8">
          <InternationalGlobePrototype />
        </div>
      </div>
    </section>
  );
}

export default Hero;
