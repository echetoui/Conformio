# Audit de l’architecture des données

## État constaté

Aucune base de données, migration, ORM, schéma ou modèle métier n’est présent dans le dépôt. Les seuls flux de données identifiables sont :

- données du formulaire vers Formspree ([src/api/submitTrialForm.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/api/submitTrialForm.ts:23));
- ancien flux Airtable ([src/pages/api/send-to-airtable.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/pages/api/send-to-airtable.ts:22));
- ancien flux email SMTP non appelé ([src/services/emailService.ts](/Users/echetoui/Documents/ChatGPT/conformio/src/services/emailService.ts:15));
- consentement local dans `localStorage` ([CookieConsent.tsx](/Users/echetoui/Documents/ChatGPT/conformio/src/components/CookieConsent.tsx:10)).

## Capacités absentes

Non démontrées ou absentes : organisations, utilisateurs, rôles, relations inter-entités, référentiels, obligations, contrôles, preuves, journal d’audit, historique, rétention, suppression, isolation tenant, index, sauvegarde et restauration.

## Modèle conceptuel cible proposé

```text
Tenant/Organization
  ├─ LegalEntity ── Jurisdiction
  ├─ User ── Membership ── Role/Permission
  ├─ Program ── FrameworkVersion
  │              └─ ApplicabilityRule ── Obligation
  ├─ Control ── ControlMapping ── Obligation
  ├─ Assessment ── Finding ── ActionPlan
  ├─ Evidence ── EvidenceLink ── Control/Obligation/Finding
  ├─ RegulatorySource ── SourceVersion ── Obligation
  └─ AuditEvent
```

## Principes nécessaires

1. Chaque ressource métier doit porter un `tenant_id` et être filtrée côté serveur.
2. Les référentiels, obligations et sources doivent être immuables par version; les corrections produisent une nouvelle version.
3. Une preuve peut être reliée à plusieurs contrôles et obligations sans duplication.
4. Les décisions d’applicabilité doivent conserver la règle, la version de source, la décision humaine et l’horodatage.
5. Les fichiers doivent être stockés en privé avec métadonnées, checksum, propriétaire, durée de rétention et événements d’accès.
6. Les événements sensibles doivent être append-only et corrélables à un acteur et un tenant.

## Internationalisation des données

Séparer `language` et `jurisdiction`. Une organisation peut avoir plusieurs entités et marchés; une obligation doit référencer le pays, la région, l’autorité, le type de source, l’édition, les dates d’effet et de fin, ainsi que les conditions d’applicabilité.

## Performance et intégrité

Prévoir des clés composites tenant + identifiant, index sur statut/dates/juridiction, contraintes d’unicité versionnées, transactions pour les évaluations et idempotence pour les imports. Aucun index ou plan d’exécution n’est actuellement vérifiable car aucune base n’existe.
