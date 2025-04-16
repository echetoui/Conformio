import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldIcon, FileTextIcon, BoxIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';

// Import des images
import soc2Logo from '/soc2-logo.webp';
import iso27001Logo from '/iso27001-logo.png';
import quebecLogo from '/quebec-logo.png';

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
  loading?: 'lazy' | 'eager';
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group flex flex-col items-center justify-center h-full">
      <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-300" />
      <div className="relative bg-bg/80 backdrop-blur-sm border border-primary/10 rounded-xl p-4 flex flex-col items-center gap-2 group-hover:border-primary/20 group-hover:scale-105 transition-all w-full h-full">
        {imageSrc && !imageError ? (
          <img 
            src={imageSrc} 
            alt={`Logo ${name} - ${description}`}
            loading={loading} 
            className="w-16 h-16 object-contain"
            width={64}
            height={64}
            onError={() => setImageError(true)}
          />
        ) : (
          <Icon className="w-6 h-6 text-secondary" aria-hidden="true" />
        )}
        <span className="text-sm font-semibold text-text">{name}</span>
      </div>
    </div>
  );
};

export function Hero() {
  const { t, language } = useLanguage();
  const [state, handleSubmit] = useForm("xrbpvpod");

  // Debug log
  console.log('Form state:', state);

  const standards = [
    {
      name: 'SOC 2',
      icon: BoxIcon,
      description: 'Standard de sécurité pour les entreprises technologiques',
      imageSrc: soc2Logo,
      loading: 'eager' as const
    },
    {
      name: 'ISO 27001',
      icon: BoxIcon,
      description: 'Standard international',
      imageSrc: iso27001Logo,
      loading: 'eager' as const
    },
    {
      name: 'Loi 25',
      icon: FileTextIcon,
      description: 'Loi sur la protection des renseignements personnels',
      imageSrc: quebecLogo,
      loading: 'eager' as const
    },
    {
      name: 'TGV',
      icon: ShieldIcon,
      description: 'Norme gouvernementale',
      imageSrc: quebecLogo,
      loading: 'eager' as const
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-bg to-bg-soft py-16 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-text/80 mb-12">
            {t('hero.subtitle')}
          </p>
          
          {state.succeeded ? (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 font-medium">
                {language === 'fr' 
                  ? "Génial ! Votre message nous est bien parvenu. On vous envoie bientôt des nouvelles !" 
                  : "Great! Your message has been received. We'll be in touch soon!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="flex-1 min-w-0">
                <label htmlFor="email" className="sr-only">
                  {language === 'fr' ? "Votre adresse email" : "Your email address"}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={language === 'fr' ? "Votre adresse email" : "Your email address"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀 {language === 'fr' ? "Parlez-Nous" : "Talk to Us"}
              </button>
            </form>
          )}
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {standards.map((standard, index) => (
              <StandardBadge
                key={index}
                name={standard.name}
                icon={standard.icon}
                description={standard.description}
                imageSrc={standard.imageSrc}
                loading={standard.loading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;