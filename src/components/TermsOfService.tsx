import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsOfService = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
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
                ? 'En accédant et en utilisant les services de Conformio, vous acceptez d\'être lié par ces conditions d\'utilisation.'
                : 'By accessing and using Conformio\'s services, you agree to be bound by these terms of service.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '2. Description du Service' : '2. Service Description'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Conformio fournit des services de conformité et de gestion des risques pour les entreprises. Nos services incluent l\'évaluation, la documentation et le suivi de la conformité aux normes et réglementations.'
                : 'Conformio provides compliance and risk management services for businesses. Our services include assessment, documentation, and monitoring of compliance with standards and regulations.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '3. Responsabilités de l\'Utilisateur' : '3. User Responsibilities'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'En utilisant nos services, vous vous engagez à :'
                : 'By using our services, you agree to:'}
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>{language === 'fr' ? 'Fournir des informations exactes et à jour' : 'Provide accurate and up-to-date information'}</li>
              <li>{language === 'fr' ? 'Maintenir la confidentialité de votre compte' : 'Maintain the confidentiality of your account'}</li>
              <li>{language === 'fr' ? 'Utiliser les services de manière légale et éthique' : 'Use the services in a legal and ethical manner'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'fr' ? '4. Propriété Intellectuelle' : '4. Intellectual Property'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Tous les droits de propriété intellectuelle liés à nos services sont et restent la propriété de Conformio.'
                : 'All intellectual property rights related to our services are and remain the property of Conformio.'}
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
  );
};

export default TermsOfService; 