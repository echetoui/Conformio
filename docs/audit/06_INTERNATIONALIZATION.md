# Audit d’internationalisation

## État vérifié

Le produit contient `fr` et `en`, avec détection de `navigator.language` et un dictionnaire local ([src/utils/language.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/utils/language.ts:1), [LanguageContext.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/context/LanguageContext.tsx:26)). La langue n’est pas persistée dans un profil ou une URL dédiée.

## Limites

- Langue et juridiction ne sont pas séparées.
- Certains textes sont codés en dur dans les composants.
- Pas de gestion des formats de date, nombre, devise ou fuseau horaire métier.
- Pas de catalogue de pays, régions, autorités ou marchés.
- Les termes TGV, Loi 25, SOC 2 et ISO 27001 sont présentés comme contenu marketing, sans modèle de terminologie contrôlée.
- Aucun test de complétude des traductions.
- Aucun support de pluriels, variantes régionales ou formatage ICU.

## Architecture recommandée

Introduire une couche i18n structurée avec clés typées, fallback explicite, langue dans l’URL ou le profil, et séparation des domaines `language`, `locale`, `jurisdiction` et `regulatory_edition`. Les contenus réglementaires doivent être des données versionnées, non des chaînes de traduction.

## Priorité de couverture

Commencer par fr-CA et en-CA, puis ajouter en-US/fr-FR selon les marchés. Chaque nouvelle juridiction doit avoir une source officielle, une date d’effet, une terminologie validée et un responsable humain.
