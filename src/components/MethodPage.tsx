import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHelmet } from './PageHelmet';
import { Header } from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

type MethodStep = {
  code: string;
  title: string;
  problem: string;
  outcome: string;
  example: string;
  deliverable: string;
};

const MethodPage = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  const steps: MethodStep[] = isFrench
    ? [
        {
          code: 'MAP',
          title: 'Cartographier vos exigences',
          problem: 'Les exigences sont réparties dans plusieurs documents, équipes et outils.',
          outcome: 'Une vue commune de vos normes, obligations et objectifs.',
          example: 'Relier la Loi 25, SOC 2 et ISO 27001 à vos activités et à vos marchés.',
          deliverable: 'Matrice initiale des exigences',
        },
        {
          code: 'READ',
          title: 'Identifier vos priorités',
          problem: 'Les écarts sont connus, mais leur impact et leur urgence restent difficiles à comparer.',
          outcome: 'Une liste de priorités compréhensible par la direction et les équipes.',
          example: 'Repérer une politique manquante, une preuve expirée ou un contrôle sans responsable.',
          deliverable: 'Registre des écarts prioritaires',
        },
        {
          code: 'SEQUENCE',
          title: 'Organiser votre plan d’action',
          problem: 'Les actions sont nombreuses et leur ordre d’exécution n’est pas clair.',
          outcome: 'Un plan avec responsables, échéances et dépendances visibles.',
          example: 'Approuver une politique avant de collecter la preuve de son application.',
          deliverable: 'Feuille de route de conformité',
        },
        {
          code: 'REVIEW',
          title: 'Préparer vos preuves',
          problem: 'Les documents et validations sont dispersés au moment de la revue.',
          outcome: 'Un historique clair des preuves, responsables et changements.',
          example: 'Associer une procédure approuvée à son contrôle et à la personne responsable.',
          deliverable: 'Registre de preuves pour la revue',
        },
      ]
    : [
        {
          code: 'MAP',
          title: 'Map your requirements',
          problem: 'Requirements live across different documents, teams, and tools.',
          outcome: 'One shared view of your standards, obligations, and goals.',
          example: 'Connect Quebec privacy requirements, SOC 2, and ISO 27001 to your markets.',
          deliverable: 'Initial requirements matrix',
        },
        {
          code: 'READ',
          title: 'Set your priorities',
          problem: 'Gaps are known, but impact and urgency are hard to compare.',
          outcome: 'A priority list that leaders and teams can understand.',
          example: 'Find a missing policy, expired evidence, or a control without an owner.',
          deliverable: 'Priority gap register',
        },
        {
          code: 'SEQUENCE',
          title: 'Organize the action plan',
          problem: 'There are many actions, but the order of work is unclear.',
          outcome: 'A plan with visible owners, due dates, and dependencies.',
          example: 'Approve a policy before collecting proof that it is being used.',
          deliverable: 'Compliance action roadmap',
        },
        {
          code: 'REVIEW',
          title: 'Prepare your evidence',
          problem: 'Documents and approvals are scattered when a review begins.',
          outcome: 'A clear history of evidence, owners, and changes.',
          example: 'Link an approved procedure to its control and responsible owner.',
          deliverable: 'Review-ready evidence register',
        },
      ];

  return (
    <>
      <PageHelmet metaKey="method" />
      <Header />
      <main data-site-content="true" className="spatial-shell min-h-screen overflow-hidden">
        <div className="spatial-container px-[var(--spatial-page-gutter)] py-16 sm:py-24">
          <header className="mx-auto max-w-4xl text-center">
            <p className="spatial-kicker mb-5">Conformio Method</p>
            <h1 tabIndex={-1} className="spatial-heading focus:outline-none">{isFrench ? 'Une méthode claire pour piloter votre conformité' : 'A clear method for leading compliance'}</h1>
            <p className="spatial-copy mx-auto mt-6 max-w-3xl text-xl">
              {isFrench
                ? 'Passez d’exigences dispersées à des priorités, des responsables et des preuves faciles à suivre.'
                : 'Turn scattered requirements into clear priorities, owners, and evidence your team can track.'}
            </p>
          </header>

          <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-labelledby="method-steps-title">
            <h2 id="method-steps-title" className="sr-only">{isFrench ? 'Les quatre étapes de la méthode' : 'The four method steps'}</h2>
            {steps.map((step, index) => (
              <article key={step.code} className="spatial-editorial-card spatial-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="spatial-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p className="spatial-eyebrow">{step.code}</p>
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-slate-100">{step.title}</h2>
                <dl className="mt-6 space-y-5 text-slate-300">
                  <div>
                    <dt className="text-sm font-semibold text-cyan-200">{isFrench ? 'Le problème' : 'The problem'}</dt>
                    <dd className="mt-1 leading-7">{step.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-cyan-200">{isFrench ? 'Résultat attendu' : 'Expected outcome'}</dt>
                    <dd className="mt-1 leading-7">{step.outcome}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-cyan-200">{isFrench ? 'Exemple concret' : 'Practical example'}</dt>
                    <dd className="mt-1 leading-7">{step.example}</dd>
                  </div>
                </dl>
                <div className="mt-7 rounded-xl border border-cyan-300/20 bg-cyan-200/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isFrench ? 'Exemple de livrable' : 'Example deliverable'}</p>
                  <p className="mt-2 font-semibold text-cyan-100">{step.deliverable}</p>
                </div>
                <Link to="/contact" className="spatial-button-secondary mt-7 w-fit">
                  {isFrench ? 'Discuter de cette étape' : 'Discuss this step'}
                </Link>
              </article>
            ))}
          </section>

          <section className="mt-20" aria-labelledby="deliverables-title">
            <div className="max-w-3xl">
              <p className="spatial-kicker mb-4">{isFrench ? 'Aperçus de livrables' : 'Deliverable previews'}</p>
              <h2 id="deliverables-title" className="spatial-heading text-4xl sm:text-5xl">{isFrench ? 'Des résultats faciles à partager' : 'Outputs your teams can share'}</h2>
              <p className="spatial-copy mt-5">
                {isFrench
                  ? 'Ces aperçus montrent la structure attendue des livrables. Ils ne représentent pas les résultats d’un client et ne constituent pas une promesse de certification.'
                  : 'These previews show the intended structure of the outputs. They are not client results and do not promise certification.'}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {(isFrench
                ? ['Feuille de route priorisée', 'Registre de preuves', 'Matrice de conformité']
                : ['Prioritized roadmap', 'Evidence register', 'Compliance matrix']
              ).map((label, index) => (
                <div key={label} className="glass-panel rounded-2xl p-5">
                  <div className="mb-5 h-2 w-20 rounded-full bg-cyan-200/60" />
                  <p className="text-sm font-semibold text-slate-100">{label}</p>
                  <div className="mt-5 space-y-2" aria-hidden="true">
                    <div className="h-2 rounded-full bg-white/15" />
                    <div className="h-2 w-4/5 rounded-full bg-white/10" />
                    <div className={`h-2 rounded-full ${index === 1 ? 'w-3/5 bg-iris-300/50' : 'w-2/3 bg-cyan-300/35'}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-3xl border border-cyan-300/20 bg-white/5 p-7 text-center sm:p-10" aria-labelledby="method-cta-title">
            <h2 id="method-cta-title" className="text-3xl font-semibold text-white">{isFrench ? 'Commencez par votre situation' : 'Start with your situation'}</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              {isFrench ? 'Une première discussion permet de clarifier vos exigences et la prochaine étape utile.' : 'An initial conversation helps clarify your requirements and the next useful step.'}
            </p>
            <Link to="/contact" className="spatial-button mt-7 inline-flex">{isFrench ? 'Obtenir une première orientation' : 'Get an initial orientation'}</Link>
          </section>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default MethodPage;
