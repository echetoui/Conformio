# Audit UX/UI et préparation 3D

## État actuel

L’interface est une landing page responsive à dominante blanche/bleue, avec Tailwind, Framer Motion, cartes de bénéfices, FAQ, formulaire, pages légales et navigation mobile. La hiérarchie est compréhensible pour une acquisition B2B, mais elle ne constitue pas encore une interface produit.

## Points positifs

- Composants séparés et chargement différé de plusieurs sections.
- Navigation mobile avec `aria-expanded` et libellés.
- Labels reliés aux champs et messages d’erreur associés dans le formulaire.
- Animations Framer Motion déjà centralisées par composant.

## Limites UX/accessibilité

- La bannière de consentement a un rôle dialog mais pas de gestion du focus, fermeture clavier ou `aria-modal` ([CookieConsent.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/components/CookieConsent.tsx:31)).
- Les états succès/erreur du formulaire ne sont pas annoncés avec `aria-live`.
- Le contenu FAQ et les sections animées n’ont pas de stratégie explicite `prefers-reduced-motion`.
- Les textes de navigation et attributs ARIA ne sont pas tous traduits.
- Les pages légales sont très minimales pour une entreprise traitant des leads.
- Aucun test responsive, clavier, contraste ou lecteur d’écran n’est présent.

## Compatibilité 3D

La stack React/Vite est compatible avec Three.js, React Three Fiber, Drei, GSAP ou Motion. Aucun de ces outils 3D n’est actuellement installé ou utilisé. Une migration de framework n’est pas justifiée par les preuves disponibles.

### Niveau A — 3D légère

CSS 3D, profondeur de cartes, gradients, lumière simulée, transitions Motion. Effort faible à moyen; risque faible; bon choix mobile. Requiert fallback naturel, réduction de mouvement et budget strict.

### Niveau B — 3D interactive

Un globe ou objet WebGL ciblé dans le hero, lazy-loaded et désactivable. Effort moyen à élevé; risques de poids bundle, GPU, mémoire mobile et accessibilité. Utiliser React Three Fiber/Drei seulement pour la zone qui le justifie.

### Niveau C — expérience immersive

Scène complexe, transitions cinématiques et navigation spatiale. Effort élevé; risques élevés de performance, SEO, accessibilité, maintenance et conversion. À réserver à un prototype validé par métriques.

## Direction recommandée

Adopter le bleu nuit, verre translucide et profondeur uniquement dans le système de design produit. Pour le site public, garder une lisibilité forte, une version 2D complète, des animations réduites et un chargement 3D après le contenu critique.
