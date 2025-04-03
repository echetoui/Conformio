import React, { useCallback, useState, lazy } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRightIcon, CheckIcon, ShieldIcon, ClockIcon, FileTextIcon, BoxIcon } from 'lucide-react';
const StandardBadge = ({
  name,
  icon: Icon,
  description,
  imageSrc,
  loading = 'lazy'
}: {
  name: string;
  icon: typeof ShieldIcon;
  description: string;
  imageSrc?: string;
}) => <button onClick={() => document.getElementById('benefits')?.scrollIntoView({
  behavior: 'smooth'
})} className="relative group w-full">
    <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-300" />
    <div className="relative bg-bg/80 backdrop-blur-sm border border-primary/10 rounded-xl p-4 flex flex-col items-center gap-2 group-hover:border-primary/20 group-hover:scale-105 transition-all">
      {imageSrc ? <img src={imageSrc} alt={name} loading={loading} className="w-12 h-12 object-contain" /> : <Icon className="w-6 h-6 text-secondary" />}
      <span className="text-sm font-semibold text-text">{name}</span>
      <span className="text-xs text-text-soft hidden md:block">
        {description}
      </span>
    </div>
  </button>;
const WhyUsCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: typeof ShieldIcon;
  title: string;
  description: string;
}) => <div className="flex flex-col items-center p-6 rounded-xl bg-bg/80 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300">
    <div className="p-3 rounded-full bg-primary/5 mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
    <p className="text-text-soft text-center">{description}</p>
  </div>;
export function Hero() {
  const {
    t
  } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);
  const standards = [{
    name: 'SOC 2',
    icon: BoxIcon,
    description: 'Sécurité & confidentialité',
    imageSrc: "/soc-2-logo_%281%29.webp",
    loading: 'lazy'
  }, {
    name: 'ISO 27001',
    icon: BoxIcon,
    description: 'Standard international',
    imageSrc: "/Capture_d%E2%80%99ecran%2C_le_2025-04-03_a_19.26.36.png",
    loading: 'lazy'
  }, {
    name: 'Loi 25',
    icon: FileTextIcon,
    description: 'Protection des données QC',
    imageSrc: "/QUEBEC_w1_couleur.png",
    loading: 'lazy'
  }, {
    name: 'TGV',
    icon: ShieldIcon,
    description: 'Norme gouvernementale',
    imageSrc: "/QUEBEC_w1_couleur.png",
    loading: 'lazy'
  }];
  const whyUs = [{
    icon: ShieldIcon,
    title: 'Sécurité continue',
    description: 'Surveillance et mise à jour automatique de vos contrôles'
  }, {
    icon: ClockIcon,
    title: 'Mise en place rapide',
    description: 'Démarrez votre conformité en quelques jours, pas en mois'
  }, {
    icon: BoxIcon,
    title: 'Coût maîtrisé',
    description: 'Tarification transparente adaptée aux startups'
  }];
  return <>
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden bg-gradient-to-br from-bg-soft via-bg to-bg-soft">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="mb-12 animate-fade-in">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-6">
              Automatisez votre conformité
            </span>
            <span className="block text-lg sm:text-xl lg:text-2xl text-text-soft font-normal max-w-2xl mx-auto">
              La plateforme canadienne pour automatiser votre conformité. Conçue
              pour répondre aux exigences du Québec et du Canada.
            </span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 animate-fade-in animation-delay-150">
            {standards.map((standard, index) => <StandardBadge key={index} {...standard} />)}
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            {isSubmitted ? <div className="flex items-center justify-center space-x-2 p-4 bg-primary/5 text-primary rounded-lg border border-primary/10">
                <CheckIcon className="w-5 h-5" />
                <span>Thank you for joining the waitlist!</span>
              </div> : <>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" aria-label={t('heroEmailPlaceholder')} className="w-full px-4 py-3 mb-4 border border-primary/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-bg/80 backdrop-blur-sm transition-colors hover:border-primary/30" required disabled={isSubmitting} />
                <button type="submit" disabled={isSubmitting} className={`
                    w-full px-6 py-3 bg-primary hover:bg-primary-dark
                    text-white rounded-md shadow-lg shadow-primary/20 
                    hover:shadow-primary/30
                    transition-colors flex items-center justify-center group
                    disabled:opacity-70 disabled:cursor-not-allowed
                  `}>
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>
                      {t('heroButton')}
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </>}
                </button>
              </>}
          </form>
        </div>
      </section>
      <section className="relative py-16 px-6 bg-gradient-to-b from-bg-soft to-bg">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Pourquoi choisir Conformio ?
            </h2>
            <p className="text-lg text-text-soft max-w-2xl mx-auto">
              Une approche moderne de la conformité, adaptée aux besoins des
              entreprises d'aujourd'hui
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, index) => <WhyUsCard key={index} {...item} />)}
          </div>
        </div>
      </section>
    </>;
}