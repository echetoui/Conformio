import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <>
      <PageHelmet metaKey="privacy" />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-10 flex flex-wrap gap-4 text-sm" aria-label="Navigation interne">
          <Link to={language === 'en' ? '/en' : '/fr'} className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <Link to="/terms" className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Conditions d’utilisation' : 'Terms of service'}
          </Link>
          <Link to="/contact" className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Contact' : 'Contact'}
          </Link>
        </nav>
        <h1 tabIndex={-1} className="text-3xl font-bold text-gray-900 mb-8 focus:outline-none">
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
                ? 'Conformio est une entreprise québécoise. Nous protégeons votre vie privée. Cette politique explique comment nous recueillons et utilisons vos renseignements personnels.'
                : 'Conformio is a Quebec-based company. We protect your privacy. This policy explains how we collect and use your personal information.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '2. Collecte des Informations' : '2. Information Collection'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Nous recueillons les informations que vous nous donnez. Cela peut inclure votre nom, votre courriel, votre entreprise et vos coordonnées professionnelles.'
                : 'We collect information that you give us. This may include your name, email, company, and professional contact details.'}
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
              <li>{language === 'fr' ? 'Répondre à vos demandes' : 'Respond to your requests'}</li>
              <li>{language === 'fr' ? 'Organiser nos échanges' : 'Organize our conversations'}</li>
              <li>{language === 'fr' ? 'Améliorer le site' : 'Improve the site'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '4. Protection des Informations' : '4. Information Protection'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Nous prenons des mesures raisonnables pour protéger vos informations. Elles visent à réduire les risques d’accès, de perte ou de divulgation non autorisés.'
                : 'We take reasonable steps to protect your information. These steps reduce the risk of unauthorized access, loss, or disclosure.'}
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
