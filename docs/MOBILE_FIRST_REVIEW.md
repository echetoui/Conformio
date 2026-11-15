# Conformio Global — revue mobile-first

## Résultat

Le système de mise en page utilise désormais des tokens fluides pour les gutters, les espacements de section et les écarts entre cartes. Les cartes de bénéfices restent en une colonne sur petit écran, le workflow devient vertical avec une progression 01–04 et les éléments passent en grille lorsque la largeur le permet.

## Points vérifiés sur `http://127.0.0.1:3000/fr`

| Largeur | Hero | Bénéfices | Workflow | Conversion | Débordement visible |
| --- | --- | --- | --- | --- | --- |
| 320 px | 3–5 lignes, CTA pleine largeur | 2 × 2 référentiels | vertical | champs pleine largeur | non |
| 375 px | lisible et compact | 2 × 2 | vertical | CTA tactile | non |
| 390 px | lisible et compact | 2 × 2 | vertical + connecteurs | CTA tactile | non |
| 430 px | proportions équilibrées | 2 × 2 | vertical + connecteurs | CTA tactile | non |
| 768 px | tablette, menu compact | grille stable | 2 colonnes | formulaire lisible | non |
| 1024 px | composition desktop | grille stable | 4 colonnes | formulaire lisible | non |
| 1440 px | composition immersive | 7/5 puis 6/6 | 4 colonnes | FAQ et formulaire lisibles | non |
| 1920 px | conteneur centré | largeur plafonnée | 4 colonnes | largeur de lecture contrôlée | non |

## Validation technique

- `npm run build` : réussi
- `npm run lint` : réussi
- `npx tsc --noEmit` : réussi
- `npm run test` : 11 tests réussis
- `git diff --check` : réussi

Les captures visuelles ont été inspectées dans le navigateur local aux huit largeurs ci-dessus. Les visuels personnalisés des bénéfices et du workflow restent en ratio `720 × 420 px` et utilisent `object-fit: cover`.
