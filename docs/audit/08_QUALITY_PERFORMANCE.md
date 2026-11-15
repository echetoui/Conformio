# Audit qualité, performance et maintenabilité

## Vérifications exécutées

| Vérification | Résultat |
|---|---|
| Build Vite direct | Génération de `dist` observée avec 2 196 modules transformés |
| `npm run build` | Échec dans l’environnement car le binaire `.bin/vite` n’était pas disponible; le binaire Vite direct a toutefois produit `dist` |
| TypeScript | Échec : imports `next` et `airtable` introuvables dans `src/pages/api/send-to-airtable.ts` |
| ESLint | Échec : 4 erreurs, 9 avertissements |
| Tests automatisés | Aucun script ou dossier de test identifié |
| Audit npm | Non conclu : résolution du registre npm impossible |
| Preview HTTP local | Non vérifié : permission d’écoute réseau refusée par l’environnement |

## Qualité

Erreurs ESLint importantes : variable `process` non déclarée dans le script sitemap, `try/catch` inutile dans `sendEmail.ts`, méthode vide dans le contexte langue et annotation TypeScript triviale dans `sitemapService.ts`. Des imports inutilisés et des types `any` subsistent.

## Performance observée

Le build produit notamment environ 172 Ko pour React/vendor, 120 Ko pour Framer Motion et 92 Ko pour le formulaire, hors source maps. Les source maps ajoutent plusieurs centaines de Ko et ne devraient pas être publiques en production. Le lazy loading des sections est positif, mais aucun budget Lighthouse ou Core Web Vitals n’est configuré.

## Maintenabilité

- Duplication entre `src/translations`, `src/locales` et `src/i18n`.
- Services historiques non raccordés.
- Configuration de déploiement contradictoire.
- Pas de tests de régression pour routing, formulaire, consentement ou responsive.
- Pas d’observabilité applicative démontrée.

## Tests recommandés

Ajouter d’abord des tests unitaires pour validation et traductions, tests d’intégration pour soumission/erreurs, puis Playwright pour routes, navigation mobile, formulaire, consentement et mode clavier. Les tests de production devront être autorisés séparément et cibler uniquement les endpoints approuvés.
