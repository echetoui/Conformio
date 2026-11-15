# Conformio — Rapport Phase A : stabilisation

Date : 2026-10-27
Branche : `codex/phase-a-stabilization`
Hébergement retenu : Vercel, confirmé par le propriétaire du projet.

## Corrections réalisées

### Déploiement

- Suppression des trois workflows GitHub Pages concurrents.
- Suppression de l’ancien `CNAME` GitHub Pages.
- Conservation de CodeQL, qui n’est pas un pipeline de déploiement.
- Ajout de rewrites SPA et d’en-têtes de sécurité dans `vercel.json`.
- Publication prévue uniquement depuis le build `dist` via Vercel.
- Aucun déploiement de production effectué.

### Consentement Analytics

- Suppression du chargement automatique de Google Analytics dans `index.html`.
- Chargement du traceur uniquement après acceptation explicite.
- Refus sans chargement de traceur.
- Réouverture des réglages via l’événement `open-cookie-settings`.
- Retrait du script lorsque le consentement accepté est retiré.
- Ajout de `aria-modal` au dialogue.

### TypeScript et ESLint

- Retrait des anciens fichiers Next/Airtable/SMTP non raccordés à la stack Vite.
- Retrait des dépendances serveur inutilisées.
- Correction des erreurs ESLint et des imports inutilisés.
- Ajout de scripts `test` et `test:watch`.

### SEO et routing

- Passage de `HashRouter` à `BrowserRouter`.
- Canoniques et sitemap sur des URLs normales sous `https://www.conformio.ca`.
- Correction de `homepage`, robots.txt, JSON-LD et logo structuré.
- Suppression des informations structurées fictives.
- Rewrites Vercel pour les routes `/`, `/privacy`, `/terms` et `/contact`.

### Source maps et sécurité HTTP

- Désactivation des source maps publiques de production.
- Ajout de CSP, `X-Content-Type-Options`, `Referrer-Policy` et `Permissions-Policy`.
- CSP limitée aux ressources utilisées : application, Google Analytics après consentement et Formspree.

## Fichiers modifiés

- `index.html`
- `package.json`, `package-lock.json`
- `public/robots.txt`, `public/sitemap.xml`
- `scripts/generate-sitemap.js`, `scripts/generate-sitemap.ts`
- `src/index.tsx`
- `src/components/CookieConsent.tsx`, `Footer.tsx`, `Hero.tsx`
- `src/context/LanguageContext.tsx`, `src/env.d.ts`
- `src/services/analyticsService.ts`, `sitemapService.ts`
- `vercel.json`, `vite.config.ts`
- `vitest.config.ts`, `tests/setup.ts`

Fichiers retirés après vérification de non-utilisation : anciens workflows Pages, `CNAME`, endpoints Next/Airtable dépréciés et service SMTP orphelin.

## Tests ajoutés

- `src/App.test.tsx` : routes d’accueil et de confidentialité.
- `src/components/CookieConsent.test.tsx` : acceptation, refus, réouverture et retrait du consentement.
- `src/services/analyticsService.test.ts` : absence de chargement implicite et chargement explicite.
- `src/services/sitemapService.test.ts` : canoniques sans fragments hash.

## Résultats de validation

- `npm run test` : **10 tests réussis**.
- `node node_modules/typescript/bin/tsc --noEmit` : **réussi**.
- `npm run lint` : **réussi** sans erreur ni avertissement.
- `npm run build` : **réussi**; build Vite et génération du sitemap terminés.
- `npm ci --dry-run --ignore-scripts --no-audit --no-fund` : **à jour**.
- `git diff --check` : **réussi**.
- Aucun déploiement automatique ou manuel effectué.

## Risques résiduels

1. Les modifications ne sont pas encore visibles en production tant qu’un déploiement Vercel n’a pas été déclenché séparément.
2. La résolution DNS et le domaine canonique `www.conformio.ca` doivent être confirmés dans le projet Vercel.
3. La CSP doit être vérifiée sur une preview Vercel réelle, notamment pour Formspree et Analytics.
4. L’audit npm complet reste à exécuter depuis un environnement pouvant joindre le registre npm.
5. Le formulaire dépend toujours de la configuration externe `VITE_FORMSPREE_ID`.

## Procédure de retour arrière

Avant intégration, conserver le diff de la branche. Après création d’un commit de stabilisation, revenir en arrière avec `git revert <commit-de-stabilisation>` puis vérifier `npm run test`, `npm run lint` et `npm run build`. Ne pas réactiver les anciens workflows Pages sans revoir la décision d’hébergement.
