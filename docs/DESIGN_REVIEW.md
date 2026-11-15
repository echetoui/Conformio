# Conformio — audit visuel et plan de correction

Date de l’audit : 2026-10-27
Serveur : `http://127.0.0.1:3000/fr`
Branche : `codex/phase-b-spatial-intelligence`
Projet : dépôt `echetoui/Conformio`, projet Vercel distant `conformio`

## Périmètre et méthode

Le rendu local a été vérifié dans le navigateur intégré avec l’arbre d’accessibilité, puis capturé avec des viewport de 1440×900, 1024×768 et 390×844. Les captures pleine page sont conservées dans :

- [Desktop](./audit-desktop-full.png)
- [Tablette](./audit-tablet-full.png)
- [Mobile](./audit-mobile-full.png)

Le serveur utilise bien Vite et charge la branche Phase B. Aucun correctif d’interface n’a été appliqué pendant cet audit. Le navigateur intégré n’expose pas de journal console exploitable ; l’absence d’erreur console n’est donc pas déclarée comme prouvée. Le serveur Vite n’a signalé aucune erreur de compilation pendant le chargement.

## 1. Problèmes visuels confirmés

1. Le nouveau hero spatial est réellement affiché : fond navy, grille, globe orbital CSS/DOM, CTA et panneau de régions.
2. Les sections Bénéfices et Fonctionnalités utilisent encore des emojis (`🛡️`, `⚡`, `⏱️`, `📊`, `🔌`, `🧠`, `🗺️`, `📈`). Ils cassent l’identité premium et donnent une impression de contenu provisoire.
3. Les badges SOC 2, ISO 27001, Loi 25 et TGV utilisent des assets raster hérités. Le badge TGV réutilise le logo du Québec, ce qui ne représente pas nécessairement la norme TGV.
4. La capture pleine page laisse un grand espace vide à l’emplacement de la FAQ. La FAQ existe dans l’arbre d’accessibilité après chargement normal, mais son contenu démarre avec une opacité nulle et dépend d’un `IntersectionObserver`; une capture pleine page qui ne scrolle pas ne déclenche pas son apparition.
5. Le bandeau de consentement est blanc et très contrasté par rapport au nouveau système spatial. Sur tablette et mobile il recouvre une partie importante du premier écran.
6. La route `/fr` ne force pas le français. `LanguageProvider` utilise `navigator.language`; le même URL produit donc du français dans le navigateur intégré et de l’anglais dans la capture Playwright anglaise.
7. La navigation, certains CTA et la FAQ contiennent encore des textes hérités ou génériques (`SaaS`, `TGV`, “70%”, “Start free trial”, “beta”) qui ne forment pas encore une proposition internationale cohérente.
8. Les captures tablette et mobile montrent une forte réduction de taille typographique et beaucoup d’espace vertical. La hiérarchie reste lisible, mais le formulaire arrive très tard et le cookie banner consomme une zone importante sur mobile.

## 2. Cause technique de la refonte partiellement visible

| Vérification | Résultat |
| --- | --- |
| Projet local | `/Users/echetoui/Documents/ChatGPT/conformio` |
| Branche Git | `codex/phase-b-spatial-intelligence` |
| Serveur | Vite actif sur `127.0.0.1:3000` |
| Routes | `/`, `/fr`, `/en`, `/privacy`, `/terms`, `/contact` |
| Hero importé | `src/App.tsx` → `src/components/Hero.tsx` |
| Globe importé | `Hero.tsx` → `InternationalGlobePrototype.tsx` |
| Tokens chargés | `src/index.css` importe `src/styles/design-tokens.css` |
| Vercel | `vercel.json` présent; projet distant `conformio` confirmé; pas de dossier `.vercel` local |
| Assets | Les anciens PNG/WebP sont toujours référencés par `Hero.tsx` |
| Composants hérités | Emojis conservés dans `Benefits.tsx`, `Features.tsx` et plusieurs CTA |
| Animations | FAQ dépend d’un IntersectionObserver et de Framer Motion |

La refonte n’est donc pas absente : elle est partiellement intégrée. Les anciens assets et tokens de contenu restent dans les composants actifs, tandis que les styles spatiaux ont déjà remplacé la structure de surface.

## 3. Audit des icônes

| Zone | Source | Bibliothèque / type | Cohérence | Recommandation |
| --- | --- | --- | --- | --- |
| Hero badges | `Hero.tsx` | Lucide (`ShieldIcon`, `FileTextIcon`, `BoxIcon`) en fallback | Correcte mais trop générique | Remplacer `BoxIcon` par `BadgeCheck` ou `ScanLine`; utiliser une icône par standard, sans emoji |
| Bénéfices | `Benefits.tsx` | Emojis Unicode | Non cohérent, rendu variable selon OS | Utiliser Lucide `ShieldCheck`, `Zap`, `Timer`, `ChartNoAxesCombined` dans des conteneurs cyan/iris |
| Fonctionnalités | `Features.tsx` | Emojis Unicode | Non cohérent, visuellement ancien | Utiliser `PlugZap`, `BrainCircuit`, `Map`, `Activity` ou `Radar` |
| FAQ | `FAQItem.tsx` | Lucide `ChevronDown` | Cohérente | Conserver; ajouter un état actif plus net et respecter le reduced-motion |
| Header mobile | `Header.tsx` | Lucide `Menu`, `X` | Cohérente | Conserver; vérifier la zone tactile 44px et le contraste |
| Footer social | `Footer.tsx` | Lucide `LinkedinIcon`, `X` | Cohérente | Conserver; vérifier les URLs sociales avant publication |
| CTA | `Hero.tsx`, `Header.tsx`, `TrialForm.tsx` | Emojis dans le texte | Non premium et bruit visuel | Retirer `🚀`/`🎁`; ajouter une icône Lucide optionnelle, séparée du libellé |

## 4. Audit des images

| Asset | Usage actuel | État | Recommandation |
| --- | --- | --- | --- |
| `public/soc2-logo.webp` | Badge SOC 2 dans le hero | Raster petit, dépendance héritée | Recréer un badge vectoriel interne validé ou conserver uniquement comme marque officielle avec dimensions explicites |
| `public/iso27001-logo.png` | Badge ISO 27001 dans le hero | Raster 238×217, disproportionné dans une carte | Utiliser un badge vectoriel local ou un traitement uniforme avec ratio contrôlé |
| `public/quebec-logo.png` | Loi 25 et TGV | Asset réutilisé pour deux concepts différents | Retirer pour TGV; créer deux visuels locaux distincts et factuellement justes |
| `public/logo.svg` | Favicon / métadonnées | Scalable et adapté | Conserver; vérifier que l’identité correspond au nouveau wordmark |
| Globe CSS/DOM | Hero | Nouveau, léger, visible, sans WebGL | Conserver comme fallback; isoler une éventuelle 3D lazy-loaded dans une phase ultérieure |

Direction visuelle recommandée : cartographie orbitale locale, nœuds de conformité, signaux de risque, couches réglementaires et expansion Canada → États-Unis → Europe. Les nouveaux visuels doivent être des fichiers locaux versionnés ou des composants SVG/CSS contrôlés, pas des liens externes fragiles ni des placeholders permanents.

## 5. Audit des textes

### Textes à conserver ou affiner

- Hero FR actuel : « La conformité au service de votre croissance » — bon axe, mais trop général.
- Hero FR proposé : « Donnez une portée internationale à votre conformité. »
- Sous-titre proposé : « Structurez vos exigences SOC 2, ISO 27001, Loi 25 et TGV depuis le Québec, avec une feuille de route claire pour vos marchés canadiens et internationaux. »
- CTA principal FR : « Évaluer mon parcours de conformité ».
- CTA secondaire FR : « Voir notre méthode ».
- Hero EN proposé : « Turn compliance into international momentum. »
- Sous-titre EN proposé : « Build a clear path across SOC 2, ISO 27001, Quebec privacy requirements and TGV — from Canada to your next market. »

Ces formulations décrivent une capacité d’accompagnement et de structuration; elles ne prétendent pas que Conformio possède déjà une couverture réglementaire mondiale ou une intégration non implémentée.

### Textes à revoir

- `src/locales/fr.ts` et `src/locales/en.ts` contiennent encore « beta », « SaaS », « 70% » et des descriptions génériques.
- La navigation « À propos » pointe vers la FAQ (`#about`) : renommer en « Questions » ou créer une vraie section À propos.
- Les CTA doivent utiliser un seul vocabulaire FR/EN et supprimer les emojis.
- Les métadonnées `PageHelmet` positionnent encore Conformio comme plateforme pour SaaS; elles doivent refléter les entreprises québécoises/canadiennes et l’ambition internationale.
- La FAQ doit distinguer les obligations et standards sans présenter une certification comme acquise.

## 6. Plan de correction — à approuver avant exécution

| Page / section | Problème observé | Fichier concerné | Modification recommandée | Priorité | Critère d’acceptation |
| --- | --- | --- | --- | --- | --- |
| Accueil / langue | `/fr` dépend du navigateur | `App.tsx`, `LanguageContext.tsx`, `utils/language.ts` | Déduire la langue de la route, synchroniser le bouton et prévoir un fallback | P0 | `/fr` est toujours en français et `/en` toujours en anglais |
| Hero / CTA | Emojis et labels hérités | `Hero.tsx`, `Header.tsx`, `TrialForm.tsx`, locales | Retirer les emojis, harmoniser les CTA et les textes Global 2026 | P0 | Aucun emoji CTA; libellés FR/EN cohérents |
| Hero / badges | Logos raster et TGV incorrect | `Hero.tsx`, `public/*` | Remplacer par badges locaux cohérents et ne pas réutiliser le logo Québec pour TGV | P0 | Chaque badge représente précisément son standard |
| Bénéfices | Emojis Unicode | `Benefits.tsx` | Remplacer par composants Lucide stylés selon les tokens spatiaux | P0 | Aucun emoji dans la section; rendu identique Chrome/Safari |
| Fonctionnalités | Emojis Unicode | `Features.tsx` | Remplacer par Lucide et réviser les quatre intitulés | P0 | Quatre cartes utilisent la même grammaire d’icônes |
| FAQ | Contenu invisible en capture pleine page | `FAQ.tsx` | Rendre le contenu visible par défaut; utiliser l’observer uniquement pour un effet non bloquant | P0 | La FAQ est visible sans scroll programmatique ni JS d’observation |
| Cookie banner | Surface blanche hors système | `CookieConsent.tsx` | Appliquer un panneau spatial accessible, compact et responsive | P1 | Le bandeau ne masque pas le hero mobile et conserve ses contrôles |
| Navigation | « À propos » renvoie à la FAQ | `Header.tsx`, `App.tsx` | Renommer ou ajouter une section dédiée | P1 | Chaque item de navigation décrit sa destination |
| Images | Résolution et pertinence variables | `public/*`, `Hero.tsx` | Rationaliser les assets, dimensions, alt text et usages | P1 | Aucun asset réutilisé pour deux standards différents |
| Mobile | Formulaire trop bas et densité faible | `Hero.tsx`, `TrialForm.tsx`, design tokens | Réduire les espaces verticaux et tester 390/768 px | P1 | Hero, CTA et premier formulaire utilisables dans le premier écran prolongé |
| SEO | Meta SaaS / routes non localisées | `locales/*.ts`, `PageHelmet.tsx`, `sitemap.xml` | Mettre à jour titres, descriptions, canonical et alternates | P1 | FR/EN ont des métadonnées distinctes et exactes |
| Validation | Console non exportable dans le navigateur intégré | outillage de test | Ajouter un test Playwright/CI pour console et requêtes échouées | P2 | Le test échoue sur erreur console ou ressource critique non chargée |

## 7. Tests à effectuer après approbation

- Desktop : 1440×900 et capture pleine page; vérifier hero, FAQ, formulaire, cookie banner et navigation.
- Tablette : 1024×768; vérifier que le hero ne compresse pas le globe et que les cartes restent lisibles.
- Mobile : 390×844; vérifier menu, CTA, badges, globe, bandeau de consentement et formulaire.
- Clavier : skip link, menu mobile, langue, FAQ, boutons de région, champs et erreurs.
- Reduced motion : `prefers-reduced-motion: reduce`; aucune animation bloquante ni contenu invisible.
- Console/réseau : zéro erreur JavaScript, zéro ressource critique 404, images avec dimensions et alt text.
- Routes : `/`, `/fr`, `/en`, `/privacy`, `/terms`, `/contact`; aucun écran vide.
- Performance : build Vite, poids des nouveaux assets, absence de dépendance 3D globale.

## 8. Corrections P0/P1 appliquées

Après approbation du plan P0/P1, les corrections suivantes ont été intégrées :

- La langue est maintenant déterminée par `/fr` ou `/en`, puis synchronisée avec le bouton de langue.
- Les emojis des bénéfices, fonctionnalités et CTA ont été remplacés par des icônes Lucide cohérentes.
- Les logos raster hérités du hero ont été remplacés par des badges locaux typographiques et iconographiques; le logo Québec n’est plus réutilisé pour TGV.
- La FAQ est rendue visible immédiatement; l’observation du viewport ne bloque plus son contenu.
- Le bandeau de consentement utilise désormais les surfaces spatiales et reste contenu sur desktop/mobile.
- Les textes FR/EN, les métadonnées home et la navigation ont été réorientés vers une plateforme de conformité depuis le Québec vers les marchés canadiens et internationaux.
- Les captures post-correction sont disponibles dans `docs/correction-desktop-full.png` et `docs/correction-mobile-full.png`.
- Les sections Bénéfices et Fonctionnalités utilisent maintenant `SpatialIllustration`, `SpatialInterfacePreview` et une grille éditoriale responsive; les captures finales sont `docs/refonte-desktop-full.png` et `docs/refonte-mobile-full.png`.

## Validation post-correction

- Tests Vitest : 11 tests passés.
- ESLint : passé.
- TypeScript : passé.
- Build Vite : passé.
- `git diff --check` : passé.
- Capture desktop pleine page : hero, bénéfices, fonctionnalités, FAQ et formulaire visibles.
- Capture mobile pleine page : menu compact, globe, cartes, FAQ et formulaire visibles.
- Recherche des anciens emojis et libellés `beta`/`SaaS` dans les composants actifs : aucun résultat.
- Test console Playwright headless : non exécutable dans cet environnement, Chromium échoue avant lancement à cause d’une restriction macOS de permissions; ce point reste à valider en CI ou dans un navigateur de développement non restreint.

## Décision demandée

Le présent document est un audit et un plan, pas une autorisation de modification. La prochaine étape nécessite l’approbation du plan de correction, en particulier le choix entre :

1. correction prioritaire P0 des contenus/icônes/langues/FAQ, puis validation visuelle;
2. remplacement simultané des badges de certification par de nouveaux assets locaux validés.
