# Audit technique

## Cartographie

| Élément | Constat vérifié |
|---|---|
| Frontend | React 18, TypeScript, Vite 6, Tailwind 3, Framer Motion |
| Routing | `HashRouter` et routes `/`, `/contact`, `/privacy`, `/terms` ([src/index.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/index.tsx:4), [src/App.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/App.tsx:78)) |
| État | État local React et `LanguageContext`; pas de store serveur |
| API | Formspree côté client; ancien code Next/Airtable et client `/api/send-email` non raccordés |
| Données | Aucune base, migration ou ORM dans le dépôt |
| Authentification | Absente |
| Tests | Aucun dossier ou script de test identifié |
| CI/CD | CodeQL et trois workflows Pages concurrents |
| Hébergement documenté | GitHub Pages, Vercel et domaine `conformio.ca` apparaissent simultanément |

## Organisation

- `src/components` : composants de présentation et formulaire.
- `src/context` : langue.
- `src/api` / `src/services` : clients et anciens services.
- `src/pages/api` : fichiers incompatibles avec la stack Vite statique.
- `public` : logos, robots et sitemap.
- `scripts` : génération du sitemap.

## Dépendances et dette

La configuration mélange dépendances frontend, serveur et historiques (`express`, `cors`, `nodemailer`, `dotenv`, `mixpanel-browser`). `next` et `airtable` ne sont pas déclarés malgré un fichier API qui les importe. Le nom de package reste `magic-patterns-vite-template` ([package.json](/Users/echetoui/Documents/ChatGPT/conformio/package.json:2)).

Le `tsconfig` inclut tout `src`, ce qui fait échouer le type-check sur le code API orphelin. ESLint relève 4 erreurs et 9 avertissements dans l’état audité.

## Réutilisabilité

Réutilisables après durcissement : `LanguageContext`, `Header`, `Footer`, `PageHelmet`, `TrialForm`, les primitives de formulaire et les tokens Tailwind. Non réutilisables tels quels pour un SaaS : les services email, Airtable et les hypothèses de routes hash.

## Risques d’architecture

- Site marketing et future application ne sont pas séparés.
- Aucun contrat API ni modèle de domaine.
- Aucun mécanisme de migration ou de compatibilité.
- Les workflows de déploiement ne partagent pas une source de vérité.
- La configuration `BASE_URL` du workflow n’est pas consommée par `vite.config.ts` ([.github/workflows/deploy.yml](/Users/echetoui/Documents/ChatGPT/conformio/.github/workflows/deploy.yml:37), [vite.config.ts](/Users/echetoui/Documents/ChatGPT/conformio/vite.config.ts:5)).

## Recommandation

Stabiliser d’abord une cible de déploiement unique. Ensuite, créer une frontière explicite `apps/marketing` / `apps/web` ou conserver un monolithe avec modules séparés, API documentée et packages partagés pour types, design system et validation.
