# React Helmet Async - Configuration SEO Multilingue

## Vue d'ensemble

Ce projet utilise **react-helmet-async** pour gérer dynamiquement les balises `<title>` et `<meta name="description">` en fonction de la langue sélectionnée. Cela améliore le SEO et offre une meilleure expérience utilisateur pour les navigateurs.

## Architecture

### 1. Structure des Métadonnées

Les métadonnées SEO sont définies dans les fichiers de locales :
- `src/locales/en.ts` - Métadonnées en anglais
- `src/locales/fr.ts` - Métadonnées en français

```typescript
export const en = {
  meta: {
    home: {
      title: 'Conformio - Compliance Management Platform for SaaS',
      description: 'Simplify your compliance...'
    },
    privacy: {
      title: 'Privacy Policy - Conformio',
      description: 'Learn how Conformio...'
    },
    terms: {
      title: 'Terms of Service - Conformio',
      description: 'Review the terms...'
    }
  },
  // ... autres traductions
};
```

### 2. Composants Clés

#### HelmetProvider (src/index.tsx)
Enveloppe l'application pour fournir le contexte Helmet :

```typescript
<HelmetProvider>
  <Router>
    <App />
  </Router>
</HelmetProvider>
```

#### PageHelmet Component (src/components/PageHelmet.tsx)
Composant réutilisable pour mettre à jour les métadonnées SEO :

```typescript
<PageHelmet metaKey="home" />
```

Propriétés acceptées :
- `metaKey`: `'home' | 'privacy' | 'terms'` - La clé pour accéder aux métadonnées

#### usePageMeta Hook (src/hooks/usePageMeta.ts)
Hook personnalisé pour accéder aux métadonnées (alternative programmatique) :

```typescript
const { title, description } = usePageMeta('home');
```

### 3. Utilisation

#### Dans un composant fonctionnel

```typescript
import { PageHelmet } from './PageHelmet';

const HomePage = () => (
  <>
    <PageHelmet metaKey="home" />
    <Header />
    <main>
      {/* contenu de la page */}
    </main>
  </>
);
```

#### Ajouter une nouvelle page

1. Ajouter les métadonnées dans les fichiers de locales :

```typescript
// src/locales/en.ts
export const en = {
  meta: {
    // ... pages existantes
    newPage: {
      title: 'Page Title - Conformio',
      description: 'Page description for SEO'
    }
  }
};

// src/locales/fr.ts
export const fr = {
  meta: {
    // ... pages existantes
    newPage: {
      title: 'Titre de la Page - Conformio',
      description: 'Description de la page pour le SEO'
    }
  }
};
```

2. Utiliser le composant PageHelmet dans votre page :

```typescript
<PageHelmet metaKey="newPage" />
```

### 4. Changement Dynamique de Langue

Le système est entièrement réactif. Quand l'utilisateur change de langue :
1. Le contexte `LanguageContext` est mis à jour
2. Le composant `PageHelmet` détecte le changement
3. Les balises meta sont automatiquement mises à jour

### 5. Balises Meta Générées

Le composant `PageHelmet` génère automatiquement :
- `<title>` - Titre de la page
- `<meta name="description">` - Description de la page
- `<meta name="og:title">` - Titre pour Open Graph (réseaux sociaux)
- `<meta name="og:description">` - Description pour Open Graph

## Fichiers Modifiés

- `src/index.tsx` - Ajout de HelmetProvider
- `src/App.tsx` - Intégration de PageHelmet pour la page d'accueil
- `src/components/PrivacyPolicy.tsx` - Intégration de PageHelmet
- `src/components/TermsOfService.tsx` - Intégration de PageHelmet
- `src/locales/en.ts` - Ajout des métadonnées SEO en anglais
- `src/locales/fr.ts` - Ajout des métadonnées SEO en français

## Fichiers Créés

- `src/components/PageHelmet.tsx` - Composant pour gérer les métadonnées
- `src/hooks/usePageMeta.ts` - Hook personnalisé pour accéder aux métadonnées

## Best Practices

1. **Toujours ajouter les métadonnées en paires** - Ajouter en même temps dans `en.ts` et `fr.ts`

2. **Descriptions de qualité** - Écrire des descriptions claires et concises (150-160 caractères)

3. **Consistance du branding** - Inclure le nom "Conformio" dans tous les titres pour la reconnaissance

4. **Utiliser le composant PageHelmet** - Préférer le composant déclaratif au hook pour la clarté

## Dépendances

- `react-helmet-async` ^2.0.4 - Gestion des balises meta et du titre

## Testing

Pour vérifier que les métadonnées sont correctement mises à jour :

1. Ouvrir l'application dans un navigateur
2. Inspecter l'élément `<head>` (DevTools)
3. Vérifier que `<title>` et `<meta name="description">` changent quand la langue change

## Support

Pour plus d'informations sur react-helmet-async :
- Documentation : https://github.com/stevelacy/react-helmet-async
