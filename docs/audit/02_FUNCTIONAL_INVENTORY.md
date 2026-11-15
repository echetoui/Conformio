# Inventaire fonctionnel

## Classification

| Module | État observé | Preuve / limite |
|---|---|---|
| Landing page | Implémentée, non testée | `App.tsx`, `Hero`, `Benefits`, `Features`, `FAQ` |
| Navigation | Implémentée, non testée | Hash scrolling et routes React Router |
| Français / anglais | Partiellement implémentée | `LanguageContext`; textes codés en dur subsistent |
| Formulaire de lead | Implémenté côté client, non vérifié en production | `TrialForm.tsx`, Formspree |
| Validation formulaire | Implémentée côté navigateur | Zod + React Hook Form; pas de validation serveur Conformio |
| Contact | Redirection externe | Cal.com, pas de gestion interne |
| Pages légales | Présentes mais minimales | Privacy et Terms statiques |
| Consentement | Interface présente, contrôle incomplet | Analytics chargé avant choix |
| Analytics | Partiellement implémenté | Google tag actif; service applicatif désactivé |
| Email SMTP | Présent uniquement en code mort | `emailService.ts` non appelé |
| Airtable | Présent uniquement en code incompatible | `src/pages/api/send-to-airtable.ts` |
| Authentification | Absente | Aucun provider, session ou route protégée |
| Organisations / utilisateurs | Absents | Aucun modèle ou composant |
| Référentiels / obligations | Absents | Aucun catalogue ou import |
| Contrôles / évaluations | Absents | Aucun modèle ou workflow |
| Documents / preuves | Absents | Aucun stockage ou upload |
| Dashboard / rapports | Absents | Aucune page métier |
| Notifications | Non opérationnelles dans la stack actuelle | Service SMTP non raccordé |
| Administration | Absente | Aucun rôle ni écran |
| Facturation | Absente | Aucun fournisseur ou modèle |
| IA | Absente | Aucun modèle, pipeline ou citation |

## Parcours actuel

Le parcours est celui d’un site d’acquisition : visite → découverte → choix de langue → formulaire → soumission Formspree ou prise de rendez-vous Cal.com. Il n’existe pas de parcours d’onboarding, création d’organisation, configuration de contrôles, collecte de preuves ou suivi d’écarts.

## Permissions et données

Il n’y a actuellement ni permission ni rôle applicatif. Les données de formulaire vont à un service externe; le dépôt ne démontre ni contrôle de conservation, ni suppression, ni export, ni propriété des données.

## Maturité

Maturité estimée : **prototype marketing / pré-MVP**, pas produit SaaS. La présence d’un composant ou d’un texte réglementaire n’est pas une preuve de fonctionnalité de conformité.
