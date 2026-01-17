# Sitemap et URLs Canoniques - Guide Complet

## 📋 Vue d'ensemble

Ce projet inclut une implémentation complète de SEO avec :
- ✅ Sitemap XML conforme aux standards
- ✅ URLs canoniques dynamiques
- ✅ Robots.txt optimisé
- ✅ Métadonnées Open Graph

## 🗺️ Sitemap XML

### Fichier généré
- **Localisation** : `public/sitemap.xml`
- **Format** : XML conforme au standard Sitemaps.org
- **Génération** : Automatique lors de chaque build

### URLs incluses
Le sitemap inclut les 4 pages principales :

```
https://conformio.ca/#/              (Accueil)      - Priority: 1.0, Weekly
https://conformio.ca/#/privacy       (Confidentialité) - Priority: 0.5, Monthly
https://conformio.ca/#/terms         (Conditions)    - Priority: 0.5, Monthly
https://conformio.ca/#/contact       (Contact)       - Priority: 0.7, Monthly
```

### Attributs du sitemap

Chaque URL contient :
- **loc** : URL complète de la page
- **lastmod** : Date de dernière modification (mise à jour automatiquement)
- **changefreq** : Fréquence de changement suggérée
- **priority** : Priorité relative (0.0 à 1.0)

## 🔗 URLs Canoniques

### Implémentation

Les URLs canoniques sont automatiquement injectées dans la balise `<head>` de chaque page via le composant `PageHelmet`.

```html
<link rel="canonical" href="https://conformio.ca/#/privacy" />
```

### Service de gestion

**Fichier** : `src/services/sitemapService.ts`

Fournit des méthodes pour :
- Générer les URLs canoniques
- Récupérer les métadonnées du sitemap
- Échapper les caractères XML spéciaux

**Exemple d'utilisation** :
```typescript
import { sitemapService } from '@/services/sitemapService';

const canonicalUrl = sitemapService.getCanonicalUrl('/privacy');
// Retourne: https://conformio.ca/#/privacy
```

## 🤖 Robots.txt

### Fichier
- **Localisation** : `public/robots.txt`
- **Référence du sitemap** : ✅ Inclus
- **Crawl Delay** : 0.5 secondes

### Règles principales

```
Allow: /                           # Autoriser tous les chemins
Disallow: /.git/, /node_modules/   # Bloquer les dossiers sensibles
Disallow: /*.map                   # Bloquer les source maps
Sitemap: https://conformio.ca/sitemap.xml
```

### Bots bloqués
Les bots malveillants connus sont explicitement bloqués :
- AhrefsBot
- SemrushBot
- DotBot

## 📝 Composants et Services

### 1. PageHelmet Component
**Fichier** : `src/components/PageHelmet.tsx`

Composant qui gère automatiquement :
- Titre de la page
- Description meta
- URL canonique
- Métadonnées Open Graph

```typescript
<PageHelmet metaKey="privacy" />
```

### 2. SitemapService
**Fichier** : `src/services/sitemapService.ts`

Service TypeScript qui :
- Génère le XML du sitemap
- Fournit les URLs canoniques
- Échappe les caractères XML spéciaux

### 3. Script de génération
**Fichier** : `scripts/generate-sitemap.js`

Script Node.js qui :
- Génère le sitemap.xml
- Utilise la date actuelle comme `lastmod`
- Peut être exécuté indépendamment ou lors du build

## 🚀 Utilisation

### Générer le sitemap manuellement
```bash
npm run generate:sitemap
```

### Générer le sitemap lors du build
```bash
npm run build
```

Le sitemap est automatiquement généré après la build Vite.

## 🔄 Flux de mise à jour

1. **Ajout d'une nouvelle page** :
   - Ajouter la route dans `src/App.tsx`
   - Ajouter les métadonnées dans `src/locales/`
   - Ajouter le composant `<PageHelmet>` à la page
   - Ajouter l'URL dans `scripts/generate-sitemap.js`

2. **Génération du sitemap** :
   - Exécuter `npm run generate:sitemap`
   - Ou la génération automatique lors du `npm run build`

3. **Vérification** :
   - Vérifier que le sitemap.xml est mis à jour
   - Valider avec un outil comme [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## ✅ Checklist SEO

- [x] Sitemap XML généré
- [x] Robots.txt configuré
- [x] URLs canoniques implémentées
- [x] Métadonnées dynamiques (titre, description)
- [x] Open Graph pour réseaux sociaux
- [x] Dates de modification à jour
- [x] Priorités et fréquences configurées

## 📊 Performance et SEO

### Bénéfices

1. **Meilleur indexation** : Les moteurs de recherche trouvent plus facilement vos pages
2. **Évite le contenu dupliqué** : Les URLs canoniques indiquent la version officielle
3. **Crawl efficace** : Robots.txt guide les bots correctement
4. **Métadonnées dynamiques** : Chaque page a un titre et description unique

### Outils de vérification

- [Google Search Console](https://search.google.com/search-console) - Soumettre le sitemap
- [Bing Webmaster Tools](https://www.bing.com/webmasters) - Vérifier l'indexation
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) - Valider le format

## 📖 Ressources

- [Sitemaps.org Standard](https://www.sitemaps.org/)
- [Google Search Central - Sitemaps](https://developers.google.com/search/docs/beginner/sitemaps)
- [Google Search Central - Canonical URLs](https://developers.google.com/search/docs/beginner/canonicalization)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)

## 🔧 Maintenance

### Mettre à jour les dates de modification

Le script met automatiquement à jour les dates au format `YYYY-MM-DD`.

### Ajouter de nouvelles pages

1. Mise à jour du script `scripts/generate-sitemap.js` :

```javascript
{
  loc: `${baseUrl}/#/new-page`,
  lastmod: today,
  changefreq: 'weekly',
  priority: 0.8,
}
```

2. Puis exécuter :
```bash
npm run generate:sitemap
```

## Fichiers modifiés/créés

- ✅ `public/sitemap.xml` - Sitemap généré
- ✅ `public/robots.txt` - Configuration robots
- ✅ `src/services/sitemapService.ts` - Service de gestion
- ✅ `scripts/generate-sitemap.js` - Script de génération
- ✅ `src/components/PageHelmet.tsx` - Composant avec canonical URL
- ✅ `package.json` - Script `generate:sitemap` ajouté
