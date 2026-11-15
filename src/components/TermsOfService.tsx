import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const { language } = useLanguage();

  return (
    <>
      <PageHelmet metaKey="terms" />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-10 flex flex-wrap gap-4 text-sm" aria-label="Navigation interne">
          <Link to={language === 'en' ? '/en' : '/fr'} className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <Link to="/privacy" className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Confidentialité' : 'Privacy policy'}
          </Link>
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </nav>
        <h1 tabIndex={-1} className="text-3xl font-bold text-gray-900 mb-8 focus:outline-none">
          {language === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service'}
        </h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Dernière mise à jour : 1 Mars 2024'
              : 'Last updated: March 1, 2024'}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '1. Acceptation des Conditions' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'En utilisant le site de Conformio, vous acceptez ces conditions. Vous devez utiliser le site de façon légale et respectueuse.'
                : 'By using the Conformio site, you accept these terms. You must use the site in a lawful and respectful way.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '2. Description du Service' : '2. Service Description'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Conformio présente une méthode pour structurer la conformité et les risques. Le contenu du site est informatif. Il ne remplace pas un avis juridique ni une certification.'
                : 'Conformio presents a method for structuring compliance and risk work. Site content is for information. It is not legal advice or a certification.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '3. Responsabilités de l\'Utilisateur' : '3. User Responsibilities'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Vous devez :'
                : 'You must:'}
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>{language === 'fr' ? 'Fournir des informations exactes' : 'Provide accurate information'}</li>
              <li>{language === 'fr' ? 'Protéger vos accès' : 'Protect your access details'}</li>
              <li>{language === 'fr' ? 'Utiliser le site de façon légale' : 'Use the site lawfully'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '4. Propriété Intellectuelle' : '4. Intellectual Property'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'La marque, le contenu et les éléments visuels du site appartiennent à Conformio, sauf indication contraire.'
                : 'The Conformio brand, site content, and visual elements belong to Conformio unless stated otherwise.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '5. Contact' : '5. Contact'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Pour toute question concernant ces conditions d\'utilisation, veuillez nous contacter à :'
                : 'For any questions about these terms of service, please contact us at:'}
            </p>
            <p className="text-gray-600">
              <a href="mailto:info@conformio.ca" className="text-blue-600 hover:text-blue-800">
                info@conformio.ca
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsOfService;
