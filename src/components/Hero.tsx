import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldIcon, FileTextIcon, BoxIcon } from 'lucide-react';
import { sendEmail } from '../api/sendEmail';

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
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    
    try {
      await sendEmail(email);
      setStatus('success');
      setMessage(language === 'fr' 
        ? 'Merci ! Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.'
        : 'Thank you! We have received your request and will contact you as soon as possible.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(language === 'fr'
        ? 'Une erreur est survenue. Veuillez réessayer plus tard.'
        : 'An error occurred. Please try again later.');
    }
  };

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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="w-full max-w-lg" 
              aria-label="Formulaire d'inscription"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('hero.emailPlaceholder')}
                    className="flex-1 px-6 py-3 rounded-lg bg-bg/80 backdrop-blur-sm border border-primary/10 text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-label={t('hero.emailPlaceholder')}
                    aria-required="true"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                    aria-label="Parlez-Nous"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                      </span>
                    ) : (
                      '🚀 Parlez-Nous'
                    )}
                  </button>
                </div>
              </div>
              {message && (
                <p 
                  className={`mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`} 
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>
          </div>
          
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