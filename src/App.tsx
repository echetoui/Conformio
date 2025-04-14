import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import { Header } from './components/Header';
import CookieConsent from './components/CookieConsent';
import { LanguageProvider } from './context/LanguageContext';

const Benefits = lazy(() => import('./components/Benefits'));
const Features = lazy(() => import('./components/Features'));
const FAQ = lazy(() => import('./components/FAQ'));
const TrialForm = lazy(() => import('./components/TrialForm'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse w-8 h-8 bg-indigo-500 rounded-full"></div>
  </div>
);

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TrialForm />
      </Suspense>
    </main>
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
    <CookieConsent />
  </>
);

const ContactRedirect = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://cal.com/elyes-chetoui-tf93vx/30min';
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirection vers le calendrier...</h1>
        <p className="text-gray-600">
          Si vous n'êtes pas redirigé automatiquement,{' '}
          <a 
            href="https://cal.com/elyes-chetoui-tf93vx/30min"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            cliquez ici
          </a>
        </p>
      </div>
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactRedirect />} />
          <Route path="/privacy" element={
            <Suspense fallback={<SectionLoader />}>
              <PrivacyPolicy />
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<SectionLoader />}>
              <TermsOfService />
            </Suspense>
          } />
        </Routes>
      </div>
    </LanguageProvider>
  );
}