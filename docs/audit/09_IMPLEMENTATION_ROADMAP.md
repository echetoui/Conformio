# Roadmap d’implémentation proposée

Cette roadmap est une proposition issue de l’audit; elle ne constitue pas une autorisation de développement.

## Étape A — Stabilisation

**Objectifs** : réduire les risques critiques et obtenir un pipeline reproductible.

**Tâches** : conserver un seul déploiement; publier uniquement `dist`; corriger domaine/base URL; supprimer ou isoler le code Next/Airtable; corriger TypeScript/ESLint; désactiver les source maps publiques; bloquer Analytics avant consentement; définir CSP et en-têtes; ajouter tests de base.

**Modules concernés** : `.github/workflows/*`, `vite.config.ts`, `vercel.json`, `index.html`, `CookieConsent.tsx`, `src/pages/api`, `package.json`.

**Effort** : 1–3 semaines. **Risques** : choix d’hébergement, perte de tracking historique, compatibilité des URLs.

**Acceptation** : un workflow vert unique, artefact limité à `dist`, type-check/lint verts, tests de navigation et consentement verts, aucune donnée avant consentement vérifiée.

## Étape B — UX/UI 3D

**Objectifs** : établir un design system premium et accessible.

**Tâches** : tokens couleur/typographie/profondeur, composants accessibles, mode réduit, fallback 2D, prototype hero niveau A puis un objet niveau B, budget mobile et mesures Core Web Vitals.

**Effort** : 3–6 semaines. **Risques** : surcharge visuelle, poids bundle, conversion et GPU mobile.

**Acceptation** : parcours clavier complet, contraste validé, mobile sans 3D fonctionnel, `prefers-reduced-motion` respecté, budgets performance définis.

## Étape C — Global Compliance MVP

**Objectifs** : créer un premier produit métier traçable.

**Dépendances** : Étape A, fournisseur d’identité, base de données, stockage objet.

**Tâches** : organisations/entités/utilisateurs, rôles, marchés, catalogue de contrôles, assessment, écarts, plans d’action, preuves privées, audit log.

**Effort** : 8–14 semaines. **Risques** : isolation tenant, modèle de permissions, qualité des données et rétention.

**Acceptation** : deux tenants isolés, permissions testées côté serveur, export/suppression documentés, preuves privées, historique des décisions et tests e2e.

## Étape D — Intelligence internationale

**Objectifs** : ajouter les sources réglementaires, versionnement et assistant borné.

**Tâches** : registre de sources, versions, règles d’applicabilité, ingestion contrôlée, revue humaine, recherche avec citations, Copilot limité par permissions.

**Effort** : 12–24 semaines. **Risques** : exactitude réglementaire, droits de réutilisation, hallucinations, fraîcheur et responsabilité.

**Acceptation** : chaque résultat cite une source/version, les décisions sont révisables, l’IA ne contourne pas les permissions, les contenus sensibles requièrent approbation humaine.

## Décisions de gouvernance

Valider avant l’Étape C : pays initiaux, propriétaire des interprétations, politique de rétention, exigences de résidence des données, modèle de support et niveau de certification attendu.
