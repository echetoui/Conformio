import React, { Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { Header } from './components/Header';
import { LanguageProvider } from './context/LanguageContext';
const Benefits = lazy(() => import('./components/Benefits'));
const Features = lazy(() => import('./components/Features'));
const Footer = lazy(() => import('./components/Footer'));
const SectionLoader = () => <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse w-8 h-8 bg-indigo-500 rounded-full"></div>
  </div>;
export function App() {
  return <LanguageProvider>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <Benefits />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </main>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </LanguageProvider>;
}