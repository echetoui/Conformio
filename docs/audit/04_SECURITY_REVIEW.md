# Revue sécurité et confidentialité

Audit statique uniquement. Aucun test d’intrusion ni test actif contre la production n’a été effectué.

## Risques classés

### Élevé — Déploiement pouvant publier le dépôt entier

- **Preuve** : [static.yml](/Users/echetoui/Documents/ChatGPT/conformio/.github/workflows/static.yml:36) téléverse `path: '.'`.
- **Impact** : exposition publique du code source, documentation opérationnelle, fichiers de configuration et éléments futurs ajoutés par erreur.
- **Conditions** : workflow actif et dépôt Pages associé.
- **Correctif** : supprimer ce workflow et ne publier que `dist` après build; vérifier le contenu de l’artefact.
- **Effort** : faible. **Confiance** : élevée.

### Élevé — Tracking avant consentement

- **Preuve** : script Google Analytics exécuté dans [index.html](/Users/echetoui/Documents/ChatGPT/conformio/index.html:46), alors que le choix est géré plus tard dans [CookieConsent.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/components/CookieConsent.tsx:9).
- **Impact** : collecte potentielle avant consentement; risque de non-conformité vie privée selon le contexte de déploiement.
- **Correctif** : bloquer le script jusqu’au consentement explicite, utiliser un mode de consentement documenté et prévoir retrait/réinitialisation.
- **Effort** : moyen. **Confiance** : élevée.

### Moyen — Injection HTML latente dans le service email

- **Preuve** : `clientEmail` est interpolé dans `html` sans échappement ([emailService.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/services/emailService.ts:22)).
- **Impact** : contenu HTML injecté dans les emails si ce service est raccordé à une entrée contrôlée par un utilisateur.
- **Conditions** : service effectivement appelé avec une valeur non fiable.
- **Correctif** : échappement HTML ou contenu texte; validation serveur; ne pas construire du HTML avec une entrée brute.
- **Effort** : faible. **Confiance** : élevée.

### Moyen — Endpoint Airtable sans validation serveur ni limitation

- **Preuve** : désérialisation directe de `req.body` et création Airtable ([send-to-airtable.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/pages/api/send-to-airtable.ts:16)).
- **Impact** : spam, données invalides, coûts/quotas externes et pollution CRM si l’endpoint était déployé.
- **Conditions** : endpoint rendu accessible par une plateforme compatible Next.
- **Correctif** : schéma serveur Zod, taille maximale, rate limit, honeypot/CAPTCHA adapté, logs sans données sensibles et idempotence.
- **Effort** : moyen. **Confiance** : élevée.

### Moyen — Source maps de production publiques

- **Preuve** : `sourcemap: true` dans [vite.config.ts](/Users/echetoui/Documents/ChatGPT/conformio/vite.config.ts:42); le build produit des `.map` contenant `sourcesContent`.
- **Impact** : divulgation du code source et des détails internes; pas une fuite de secret prouvée.
- **Correctif** : désactiver les source maps publiques ou les publier uniquement vers un fournisseur privé d’erreurs.
- **Effort** : faible. **Confiance** : élevée.

### Faible — En-têtes de sécurité insuffisants dans le dépôt

- **Preuve** : [vercel.json](/Users/echetoui/Documents/ChatGPT/conformio/vercel.json:1) ne définit pas CSP, `X-Content-Type-Options`, `Referrer-Policy` ou permissions policy.
- **Impact** : réduction de la défense en profondeur; l’existence d’en-têtes côté plateforme n’est pas vérifiée.
- **Correctif** : définir des en-têtes adaptés et une CSP compatible avec les fournisseurs réellement utilisés.
- **Effort** : moyen. **Confiance** : élevée.

## Contrôles absents

Authentification, sessions, autorisation serveur, isolation tenant, upload, stockage privé, audit log, sauvegarde, rotation de secret et suppression/rétention ne sont pas implémentés dans le dépôt.

## Dépendances

`npm audit` n’a pas pu obtenir le registre depuis cet environnement réseau; aucune conclusion de type « zéro vulnérabilité » n’est donc valide pour cet audit.
