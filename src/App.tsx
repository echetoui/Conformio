import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './services/analyticsService';
import Hero from './components/Hero';
import { Header } from './components/Header';
import CookieConsent from './components/CookieConsent';
import { LanguageProvider } from './context/LanguageContext';
import { PageHelmet } from './components/PageHelmet';

const Benefits = lazy(() => import('./components/Benefits'));
const Features = lazy(() => import('./components/Features'));
const FAQ = lazy(() => import('./components/FAQ'));
const TrialForm = lazy(() => import('./components/TrialForm'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const MethodPage = lazy(() => import('./components/MethodPage'));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse w-8 h-8 bg-indigo-500 rounded-full"></div>
  </div>
);

const HomePage = () => (
  <>
    <PageHelmet metaKey="home" />
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan-300 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950">
      Aller au contenu principal
    </a>
    <Header />
    <main id="main-content" data-site-content="true" className="spatial-shell overflow-hidden">
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

export function App() {
  const location = useLocation();
  const hasMountedLocation = useRef(false);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    if (!hasMountedLocation.current) {
      hasMountedLocation.current = true;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    });
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-slate-950">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fr" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />
          <Route path="/contact" element={
            <Suspense fallback={<SectionLoader />}>
              <ContactPage />
            </Suspense>
          } />
          <Route path="/fr/methode-conformite" element={
            <Suspense fallback={<SectionLoader />}>
              <MethodPage />
            </Suspense>
          } />
          <Route path="/en/compliance-method" element={
            <Suspense fallback={<SectionLoader />}>
              <MethodPage />
            </Suspense>
          } />
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
