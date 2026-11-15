import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';
import { Header } from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

const ContactPage = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <>
      <PageHelmet metaKey="contact" />
      <Header />
      <main data-site-content="true" className="spatial-shell min-h-screen overflow-hidden">
        <div className="spatial-container px-[var(--spatial-page-gutter)] py-16 sm:py-24">
          <header className="mx-auto max-w-4xl text-center">
            <p className="spatial-kicker mb-5">
              {isFrench ? 'Parlons de votre prochaine étape' : 'Let’s discuss your next step'}
            </p>
            <h1 tabIndex={-1} className="spatial-heading focus:outline-none">
              {isFrench ? 'Construisez un parcours de conformité lisible et actionnable.' : 'Build a compliance path your team can understand and act on.'}
            </h1>
            <p className="spatial-copy mx-auto mt-6 max-w-3xl text-xl">
              {isFrench
                ? 'Conformio aide les entreprises québécoises et canadiennes à structurer leur conformité. Une première conversation permet de clarifier votre contexte, vos marchés cibles et vos priorités.'
                : 'Conformio helps Quebec and Canadian companies structure compliance. An initial conversation clarifies your context, target markets, and priorities.'}
            </p>
          </header>

          <section className="mt-16 grid gap-6 sm:grid-cols-3" aria-labelledby="contact-process-title">
            <h2 id="contact-process-title" className="sr-only">
              {isFrench ? 'Ce que nous pouvons clarifier' : 'What we can clarify'}
            </h2>
            {(isFrench
              ? [
                  ['01', 'Cartographier', 'Relier vos obligations, normes et priorités à une vue commune.'],
                  ['02', 'Prioriser', 'Identifier les écarts qui ralentissent vos ventes, vos appels d’offres ou vos audits.'],
                  ['03', 'Planifier', 'Définir les prochaines actions, les responsables et les preuves attendues.'],
                ]
              : [
                  ['01', 'Map', 'Connect obligations, standards, and priorities in one shared view.'],
                  ['02', 'Prioritize', 'Identify gaps that slow down sales, procurement, or audit readiness.'],
                  ['03', 'Plan', 'Define next actions, owners, and the evidence expected for review.'],
                ]
            ).map(([number, title, description]) => (
              <article key={number} className="spatial-editorial-card spatial-card p-6 sm:p-7">
                <p className="spatial-step-number" aria-hidden="true">{number}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                <p className="spatial-copy mt-2 text-base">{description}</p>
              </article>
            ))}
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" aria-label={isFrench ? 'Prochaine étape et préparation' : 'Next step and preparation'}>
            <article className="spatial-editorial-card spatial-card p-7 sm:p-9" aria-labelledby="contact-cta-title">
              <p className="spatial-kicker mb-4">Conformio Contact</p>
              <h2 id="contact-cta-title" className="text-3xl font-semibold text-white">
                {isFrench ? 'Réservez une première discussion' : 'Book an initial conversation'}
              </h2>
              <p className="spatial-copy mt-4">
                {isFrench
                  ? 'Choisissez un moment avec notre équipe pour présenter votre situation. Cette discussion exploratoire sert à cadrer le parcours; elle ne suppose pas qu’une certification ou qu’une couverture internationale soit déjà disponible.'
                  : 'Choose a time with our team to share your situation. This first discussion helps set the path. It does not assume that certification or international coverage is already available.'}
              </p>
              <a
                href="https://cal.com/conformio"
                className="spatial-button mt-7 inline-flex"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isFrench ? 'Planifier avec l’équipe' : 'Schedule with the team'}
              </a>
            </article>

            <article className="glass-panel spatial-card rounded-2xl p-7 sm:p-9" aria-labelledby="contact-prepare-title">
              <p className="spatial-kicker mb-4">Before we meet</p>
              <h2 id="contact-prepare-title" className="text-2xl font-semibold text-white">
                {isFrench ? 'Comment préparer la discussion' : 'How to prepare for the conversation'}
              </h2>
              <p className="spatial-copy mt-4 text-base">
                {isFrench
                  ? 'Rassemblez si possible les standards qui vous concernent, vos prochaines échéances et les outils déjà utilisés par vos équipes. Une documentation parfaite n’est pas nécessaire pour commencer.'
                  : 'Gather the standards that apply to you, your next deadlines, and the tools your team already uses. Perfect documentation is not required to begin.'}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {isFrench
                  ? 'Nous distinguerons les actions immédiates des travaux de fond et définirons une progression adaptée à votre contexte.'
                  : 'We will separate quick wins from deeper work and define a sequence that fits your context.'}
              </p>
            </article>
          </section>

          <p className="spatial-copy mt-8 text-sm">
            {isFrench
              ? 'Pour une question générale, écrivez à info@conformio.ca. Consultez notre politique de confidentialité et nos conditions d’utilisation pour en savoir plus.'
              : 'For a general question, email info@conformio.ca. Read our privacy policy and terms of service to learn more.'}
          </p>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default ContactPage;
