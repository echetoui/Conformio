import React, { memo, Component } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRightIcon, MonitorIcon, ZapIcon, ClipboardCheckIcon, FileCheckIcon } from 'lucide-react';
import { TrustBadges } from './TrustBadges';
const FeatureStep = memo(({
  step,
  title,
  description,
  icon: Icon
}: {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<{
    className?: string;
  }>;
}) => <div className="text-center p-8 rounded-xl bg-bg/80 backdrop-blur-sm shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border border-primary/10">
      <div className="flex justify-center mb-6">
        <Icon className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-soft leading-relaxed">{description}</p>
    </div>);
FeatureStep.displayName = 'FeatureStep';
function Features() {
  const {
    t
  } = useLanguage();
  const steps = [{
    icon: MonitorIcon,
    step: t('step1Title'),
    title: t('step1Title'),
    description: t('step1Desc')
  }, {
    icon: ZapIcon,
    step: t('step2Title'),
    title: t('step2Title'),
    description: t('step2Desc')
  }, {
    icon: ClipboardCheckIcon,
    step: t('step3Title'),
    title: t('step3Title'),
    description: t('step3Desc')
  }, {
    icon: FileCheckIcon,
    step: t('step4Title'),
    title: t('step4Title'),
    description: t('step4Desc')
  }];
  return <>
      <section id="features" className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-bg to-bg-soft">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-xl text-text-soft max-w-2xl mx-auto">
              Découvrez comment notre plateforme simplifie votre parcours vers
              la conformité
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => <FeatureStep key={index} {...step} />)}
          </div>
        </div>
      </section>
      <section id="contact" className="relative py-24 px-6 text-center overflow-hidden bg-gradient-to-br from-bg-soft via-bg to-bg-soft">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-text mb-4">{t('ctaTitle')}</h2>
          <p className="text-xl text-text-soft mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <button className="group px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200">
            {t('ctaButton')}
            <ArrowRightIcon className="inline-block w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </>;
}
export default Features;