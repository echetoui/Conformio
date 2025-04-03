import React, { memo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheckIcon, LayersIcon, CheckCircleIcon } from 'lucide-react';
const BenefitCard = memo(({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => <div className="text-center p-8 rounded-xl bg-bg/80 backdrop-blur-sm shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border border-primary/10">
      <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-soft leading-relaxed">{description}</p>
    </div>);
BenefitCard.displayName = 'BenefitCard';
function Benefits() {
  const {
    t
  } = useLanguage();
  const benefits = [{
    icon: <ShieldCheckIcon className="w-12 h-12 text-primary" />,
    title: 'Conformité simplifiée',
    description: 'Gérez votre programme de sécurité, vos contrôles, vos risques et vos fournisseurs depuis une seule plateforme, avec un soutien aux standards comme le TGV.'
  }, {
    icon: <LayersIcon className="w-12 h-12 text-primary" />,
    title: 'Unifiée et évolutive',
    description: "Une seule plateforme pour SOC 2, ISO 27001, TGV — automatisée avec l'IA et des intégrations puissantes."
  }, {
    icon: <CheckCircleIcon className="w-12 h-12 text-primary" />,
    title: 'Collecte de preuves automatisée',
    description: 'Collecte automatique des preuves, détection en temps réel des écarts et préparation fluide des audits.'
  }];
  return <section id="benefits" className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-bg to-bg-soft">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            Une plateforme complète pour votre conformité
          </h2>
          <p className="text-xl text-text-soft max-w-2xl mx-auto">
            Simplifiez votre parcours vers la conformité avec nos outils
            automatisés
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => <BenefitCard key={index} {...benefit} />)}
        </div>
      </div>
    </section>;
}
export default Benefits;