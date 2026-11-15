import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';

const ContactPage = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <>
      <PageHelmet metaKey="contact" />
      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-12 flex flex-wrap gap-4 text-sm" aria-label={isFrench ? 'Navigation interne' : 'Internal navigation'}>
            <Link to={isFrench ? '/fr' : '/en'} className="text-cyan-200 hover:text-cyan-100">
              {isFrench ? 'Accueil' : 'Home'}
            </Link>
            <Link to="/privacy" className="text-cyan-200 hover:text-cyan-100">
              {isFrench ? 'Confidentialité' : 'Privacy'}
            </Link>
            <Link to="/terms" className="text-cyan-200 hover:text-cyan-100">
              {isFrench ? 'Conditions' : 'Terms'}
            </Link>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {isFrench ? 'Parlons de votre prochaine étape' : 'Let’s discuss your next step'}
            </p>
            <h1 tabIndex={-1} className="text-4xl font-semibold tracking-tight text-white focus:outline-none sm:text-5xl">
              {isFrench ? 'Construisez un parcours de conformité lisible et actionnable.' : 'Build a compliance path your team can understand and act on.'}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {isFrench
                ? 'Conformio aide les entreprises québécoises et canadiennes à structurer leur conformité. Une première conversation permet de clarifier votre contexte, vos marchés cibles et vos priorités.'
                : 'Conformio helps Quebec and Canadian companies structure compliance. An initial conversation clarifies your context, target markets, and priorities.'}
            </p>
          </div>

          <section className="mt-12 grid gap-6 border-y border-white/10 py-10 sm:grid-cols-3" aria-labelledby="contact-process-title">
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
              <div key={number}>
                <p className="text-sm font-semibold text-cyan-200">{number}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </section>

          <section className="mt-12 rounded-2xl border border-cyan-300/20 bg-white/5 p-6 sm:p-8" aria-labelledby="contact-cta-title">
            <h2 id="contact-cta-title" className="text-2xl font-semibold text-white">
              {isFrench ? 'Réservez une première discussion' : 'Book an initial conversation'}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              {isFrench
                ? 'Choisissez un moment avec notre équipe pour présenter votre situation. Cette discussion exploratoire sert à cadrer le parcours; elle ne suppose pas qu’une certification ou qu’une couverture internationale soit déjà disponible.'
                : 'Choose a time with our team to share your situation. This first discussion helps set the path. It does not assume that certification or international coverage is already available.'}
            </p>
            <a
              href="https://cal.com/conformio"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-200 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isFrench ? 'Planifier avec l’équipe' : 'Schedule with the team'}
            </a>
          </section>

          <section className="mt-12" aria-labelledby="contact-prepare-title">
            <h2 id="contact-prepare-title" className="text-2xl font-semibold text-white">
              {isFrench ? 'Comment préparer la discussion' : 'How to prepare for the conversation'}
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              {isFrench
                ? 'Pour rendre l’échange concret, rassemblez si possible les standards ou exigences qui vous concernent, les échéances commerciales ou contractuelles à venir, ainsi que les outils déjà utilisés par vos équipes. Il n’est pas nécessaire d’avoir une documentation parfaite : connaître vos priorités et vos contraintes suffit pour commencer.'
                : 'To make the conversation useful, gather the standards that apply to you, your next deadlines, and the tools your team already uses. You do not need perfect documentation. Your priorities and constraints are enough to begin.'}
            </p>
            <p className="mt-4 leading-7 text-slate-400">
              {isFrench
                ? 'Nous pouvons ensuite distinguer les actions immédiates des travaux de fond, clarifier les responsabilités et définir un ordre de progression adapté à la taille de votre entreprise. Conformio fournit un cadre de décision; les engagements, certifications et couvertures effectivement retenus dépendent de votre contexte et de vos choix.'
                : 'We can separate quick wins from deeper work. We can clarify ownership and set a sequence that fits your company. Conformio provides a framework. Your commitments and certifications depend on your context.'}
            </p>
          </section>

          <p className="mt-8 text-sm leading-6 text-slate-400">
            {isFrench
              ? 'Pour une question générale, vous pouvez aussi écrire à info@conformio.ca. Consultez notre politique de confidentialité pour comprendre comment vos informations sont traitées, ainsi que nos conditions d’utilisation.'
              : 'For a general question, you can also email info@conformio.ca. Read our privacy policy to understand how your information is handled, along with our terms of service.'}
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
