# Conformio — Synthèse exécutive de la phase 1

Date de l’audit : 2026-10-27
Périmètre : dépôt Git `echetoui/Conformio`, branche `main`, audit statique non destructif.

## État actuel

Conformio est actuellement une landing page marketing Vite + React + TypeScript, avec un routeur hash, un formulaire d’essai gratuit envoyé à Formspree, des pages de confidentialité et de conditions, une redirection Cal.com, et un sélecteur français/anglais. Le dépôt contient 77 fichiers suivis et environ 2 214 lignes TypeScript/TSX.

Il ne s’agit pas encore d’une plateforme SaaS de conformité : aucune authentification, organisation, gestion d’utilisateurs, base de données, contrôle d’accès, référentiel réglementaire, preuve documentaire, tableau de bord, facturation ou fonctionnalité IA n’est implémenté dans le dépôt.

## Cinq risques majeurs

1. **Déploiements concurrents** : trois workflows GitHub Pages se déclenchent sur `main`; l’un publie tout le dépôt au lieu de `dist` ([.github/workflows/static.yml](/Users/echetoui/Documents/ChatGPT/conformio/.github/workflows/static.yml:1)).
2. **Consentement non respecté** : Google Analytics est chargé avant le choix de consentement ([index.html](/Users/echetoui/Documents/ChatGPT/conformio/index.html:46)).
3. **SEO incohérent** : routes hash, URLs canoniques fragmentées, domaine GitHub Pages dans le JSON-LD et informations structurées fictives ([index.html](/Users/echetoui/Documents/ChatGPT/conformio/index.html:20), [PageHelmet.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/components/PageHelmet.tsx:24)).
4. **Qualité de compilation incomplète** : le type-check échoue sur l’ancien endpoint Airtable qui importe `next` et `airtable` non déclarés ([send-to-airtable.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/pages/api/send-to-airtable.ts:1)).
5. **Absence de fondations SaaS** : aucune isolation tenant, autorisation serveur, journal d’audit ou modèle de données n’existe; il est donc impossible de conclure à une sécurité ou une conformité produit.

## Fonctionnalités réellement implémentées

- Landing page et sections marketing : présentes, non couvertes par des tests automatisés.
- Navigation hash et pages légales : présentes, non testées end-to-end.
- Français/anglais : partiellement présent; des textes et attributs restent codés en dur.
- Formulaire : validation côté navigateur et soumission Formspree; dépend de `VITE_FORMSPREE_ID` et n’a pas de validation serveur maîtrisée par Conformio.
- Analytics : script Google présent; service applicatif Mixpanel désactivé.
- Backend : aucun backend Vite opérationnel; fichiers Next/Airtable et Nodemailer sont orphelins ou non intégrés.

## Ce qui peut être conservé

La stack React/TypeScript/Vite convient à une landing page et à un prototype SaaS. Les composants `Header`, `Footer`, `PageHelmet`, `TrialForm`, le contexte de langue et les styles Tailwind peuvent être réutilisés après séparation claire entre site marketing et application authentifiée.

## Limites pour l’internationalisation

La langue est actuellement confondue avec le contenu applicatif; il n’existe ni modèle de pays, juridiction, version réglementaire, source officielle, applicabilité, entité légale ou fuseau horaire métier. Les textes réglementaires sont statiques et ne peuvent pas être audités comme des données versionnées.

## Architecture cible recommandée

Conserver Vite/React pour le site marketing si souhaité, puis introduire une application SaaS séparée avec API typée, authentification robuste, PostgreSQL, isolation tenant au niveau service et base de données, stockage objet privé pour les preuves, journal d’audit append-only, moteur de règles versionné et workers asynchrones pour les intégrations et l’intelligence réglementaire.

## 3D sans dégrader le produit

Commencer par le niveau A (CSS 3D et motion accessible), tester les performances et l’accessibilité, puis prototyper un seul objet interactif de niveau B. Le niveau C ne doit être envisagé qu’après instrumentation des Core Web Vitals, fallback 2D, mode réduit et budget de performance mobile.

## MVP international réaliste

Un profil d’organisation multi-entité, une sélection de pays/marchés, un catalogue de contrôles internes, une matrice d’applicabilité explicitement versionnée, un suivi des écarts et un plan d’action. Les obligations doivent être introduites comme données sourcées avec validation humaine, pas comme réponses générées non traçables.

## Plan 30 / 60 / 90 jours

- **0–30 jours** : stabiliser le dépôt, supprimer les workflows concurrents, choisir Vercel ou GitHub Pages, corriger TypeScript/lint, retirer les source maps publiques, corriger le consentement Analytics, définir les exigences de confidentialité et le schéma tenant.
- **31–60 jours** : concevoir l’API et le modèle multi-tenant, implémenter authentification/autorisation, catalogue de contrôles et profil d’organisation, ajouter tests unitaires/intégration/e2e et observabilité minimale.
- **61–90 jours** : livrer le MVP readiness multi-marchés, preuves privées, plans d’action, versionnement des règles, audit log, prototype UX 3D niveau A/B avec fallback et mesures de performance.

## Décisions nécessitant l’approbation du propriétaire

1. Choisir l’hébergeur canonique : Vercel ou GitHub Pages.
2. Définir le périmètre juridictionnel initial et les sources réglementaires autorisées.
3. Choisir l’identité utilisateur et le niveau d’assurance requis.
4. Définir la politique de conservation, suppression, résidence et export des données.
5. Décider si Formspree reste acceptable pour les leads ou si un backend contrôlé est requis.
6. Valider le budget performance et le niveau d’immersion 3D.

## Conclusion

La phase 1 montre un prototype marketing exploitable, mais pas une plateforme de conformité. Les travaux prioritaires sont la stabilisation du déploiement, la confidentialité du tracking, la correction de la qualité technique et la définition des fondations produit avant toute extension internationale.
