import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <>
      <PageHelmet metaKey="privacy" />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
        </h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Dernière mise à jour : 1 Mars 2024'
              : 'Last updated: March 1, 2024'}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '1. Introduction' : '1. Introduction'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Conformio, une entreprise québécoise, s\'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.'
                : 'Conformio, a Quebec-based company, is committed to protecting your privacy. This privacy policy explains how we collect, use, and protect your personal information.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '2. Collecte des Informations' : '2. Information Collection'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Nous collectons les informations que vous nous fournissez directement, notamment votre nom, votre adresse e-mail et vos coordonnées professionnelles.'
                : 'We collect information that you provide directly to us, including your name, email address, and professional contact information.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '3. Utilisation des Informations' : '3. Use of Information'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Nous utilisons vos informations pour :'
                : 'We use your information to:'}
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>{language === 'fr' ? 'Fournir nos services de conformité' : 'Provide our compliance services'}</li>
              <li>{language === 'fr' ? 'Communiquer avec vous concernant nos services' : 'Communicate with you about our services'}</li>
              <li>{language === 'fr' ? 'Améliorer notre plateforme' : 'Improve our platform'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '4. Protection des Informations' : '4. Information Protection'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisés.'
                : 'We implement appropriate security measures to protect your personal information against unauthorized access, modification, disclosure, or destruction.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '5. Contact' : '5. Contact'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à :'
                : 'For any questions about this privacy policy, please contact us at:'}
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

export default PrivacyPolicy; 