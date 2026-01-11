# Forcer un Redeploy sur Vercel

Le build Vercel peut être mis en cache. Après nos corrections, vous devez forcer un redeploy complet.

## Option 1: Via le Dashboard Vercel (Recommandé)

1. Allez à https://vercel.com/dashboard
2. Sélectionnez votre projet "Conformio"
3. Cliquez sur l'onglet "Deployments"
4. Trouvez le dernier déploiement
5. Cliquez sur le bouton "..." (trois points)
6. Sélectionnez "Redeploy"
7. Choisissez "Redeploy without cache"
8. Attendez que le build se termine (~2 min)

## Option 2: Via Git (Automatique)

Vercel redéploie automatiquement quand vous poussez vers main:

```bash
# Le commit a déjà été créé, juste vérifier qu'il est bien sur GitHub
git log --oneline -1
# Devrait montrer: fbe0a1b fix(vercel): Simplify configuration...

# Si pas encore poussé:
git push origin main

# Attendre le redeploy automatique (environ 2 minutes)
```

## Option 3: Redéploiement Force (CLI Vercel)

```bash
npm install -g vercel
vercel deploy --prod --force
```

## Ce qui a été Corrigé

### ✅ Fix 1: Configuration vercel.json simplifiée
**Commit:** `fbe0a1b`

- Avant: Routing complexe avec regex et headers explicites
- Après: Configuration standard recommandée par Vercel

**Pourquoi:** Vercel gère mieux les MIME types automatiquement

### ✅ Fix 2: Script path corrigé (Commit précédent: `65b6136`)

`index.html`:
```html
<!-- Avant ❌ -->
<script type="module" src="/src/index.tsx"></script>

<!-- Après ✅ -->
<script type="module" src="./src/index.tsx"></script>
```

## Vérification Après Redeploy

1. **Attendre la fin du build** (status ✓ en vert)
2. **Ouvrir votre site** sur le domaine Vercel
3. **Ouvrir DevTools** (F12)
4. **Vérifier la Console**

### ✅ Bon signe (ce que vous verrez):
```
✅ Google Analytics loaded
✅ Page loads normally
✅ No red error messages
✅ Forms appear
```

### ❌ Mauvais signe (ce qui indiquerait encore un problème):
```
❌ "Failed to load module script"
❌ 404 errors for .js files
❌ MIME type errors
```

## Dépannage

### Problème: Redeploy terminé mais erreur persiste

**Solution:**
1. Vider le cache du navigateur (Ctrl+Shift+Del)
2. Faire un hard refresh (Ctrl+F5)
3. Attendre 5 minutes (cache CDN)
4. Tester dans une fenêtre incognito

### Problème: Erreur "MIME type application/octet-stream"

**Signification:** Le fichier JavaScript est servi comme fichier binaire

**Solutions dans l'ordre:**
1. ✅ Refaire le redeploy (vous êtes ici)
2. Vider cache Vercel depuis Dashboard
3. Contacter support Vercel

### Problème: Vercel dit "Failed to build"

**Vérifier:**
1. `npm run build` fonctionne localement?
   ```bash
   npm run build
   # Doit afficher ✓ built in X.XXs
   ```

2. Tous les fichiers sont pushés?
   ```bash
   git status
   # Devrait être "working tree clean"
   ```

3. `.gitignore` n'exclut pas de fichiers importants?
   ```bash
   cat .gitignore
   # Ne doit pas contenir "dist" ou "package-lock.json"
   ```

## Timeline de Redeploy

```
1. Cliquez "Redeploy" ou git push
   ↓ (1-2 minutes)
2. Build en cours
   ↓ (5-30 secondes)
3. Build terminé
   ↓ (Instantané)
4. Site en ligne
   ↓ (Jusqu'à 5 min pour CDN global)
5. Partout dans le monde
```

## Après le Redeploy

### Actions Recommandées:

1. **Tester les formulaires**
   - Aller à la page
   - Remplir le formulaire "Essai gratuit"
   - Soumettre
   - Vérifier le message de succès
   - Vérifier votre email pour Formspree confirmation

2. **Vérifier la console**
   - Ouvrir DevTools (F12)
   - Console tab
   - Pas d'erreurs rouges?
   - Bon!

3. **Tester sur mobile**
   - Ouvrir sur téléphone/tablette
   - Tester formulaire
   - Navigation fonctionne?

4. **Vérifier les assets**
   - Network tab (F12)
   - Aucun 404?
   - Aucun MIME type error?

## Bon à Savoir

- **Vercel cache les assets pendant 1 an** - c'est normal, les fichiers hachés garantissent les mises à jour
- **HTML n'est jamais mis en cache** - toujours frais
- **Redeploy prend 2-3 minutes** - pas de raccourci
- **CDN global prend ~5 minutes** - patience

## Support

Si le problème persiste après redeploy:

1. Vérifiez que `fbe0a1b` est bien sur GitHub
2. Allez sur Vercel et confirmez que ce commit a été déployé
3. Attendez 5-10 minutes pour le propagation CDN
4. Essayez en incognito (aucun cache navigateur)
5. Contactez Vercel support si ça ne fonctionne pas

## Commandes Rapides

```bash
# Vérifier le commit
git log --oneline -1

# Vérifier le statut
git status

# Pousser si nécessaire
git push origin main

# Build local pour vérifier
npm run build

# Déployer manuellement (si vous avez Vercel CLI)
npm install -g vercel
vercel deploy --prod
```

---

**Status:** Les fixes sont prêtes, le redeploy est nécessaire
**Commit:** `fbe0a1b`
**Actions:** Redeploy via Dashboard ou git push
