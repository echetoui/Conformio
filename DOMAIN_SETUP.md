# Configuration du Domaine conformio.ca vers Vercel

## 🎯 Pourquoi conformio.ca n'est pas sur Vercel?

Le domaine `conformio.ca` est actuellement pointé ailleurs (probablement GitHub Pages ou un ancien serveur).

Pour le pointer sur Vercel, il faut mettre à jour les **DNS records** (enregistrements DNS).

---

## 📋 Étapes Complètes

### Étape 1: Ajouter le Domaine dans Vercel

1. **Allez à:** https://vercel.com/dashboard
2. **Sélectionnez:** Le projet "Conformio"
3. **Cliquez:** "Settings" → "Domains"
4. **Entrez:** `conformio.ca`
5. **Cliquez:** "Add"

Vercel affichera un message avec les options DNS.

---

### Étape 2: Choisir la Méthode DNS

#### **Option A: Nameservers Vercel (Recommandé)**

Vercel vous donnera 4 nameservers:
```
ns1.vercel.com
ns2.vercel.com
ns3.vercel.com
ns4.vercel.com
```

**Avantages:**
- ✅ Simple et automatique
- ✅ Vercel gère tout
- ✅ Zéro maintenance

**Inconvénients:**
- ❌ Tous les DNS gérés par Vercel
- ❌ Pas flexible si vous avez d'autres services

#### **Option B: Records CNAME/A (Si vous gardez votre registrar)**

Vercel vous donnera:
```
Type: CNAME
Name: conformio.ca
Value: cname.vercel.com
```

**Avantages:**
- ✅ Garder votre registrar actuel
- ✅ Flexible pour d'autres services DNS

**Inconvénients:**
- ❌ Plus complexe à gérer
- ❌ Peut avoir des problèmes avec root domain

---

### Étape 3: Mettre à Jour chez votre Registrar

**Trouvez votre registrar:**

- **Godaddy** → https://godaddy.com → Mon Compte → Domaines
- **Namecheap** → https://namecheap.com → Account → Domain List
- **OVH** → https://www.ovh.com/manager
- **Autre** → Cherchez "DNS Settings" ou "Nameservers"

**Pour changer les nameservers:**

1. Connectez-vous à votre compte
2. Trouvez "DNS Settings", "Nameservers", ou "DNS Management"
3. Modifiez les nameservers existants
4. Entrez les 4 nameservers de Vercel:
   ```
   ns1.vercel.com
   ns2.vercel.com
   ns3.vercel.com
   ns4.vercel.com
   ```
5. Sauvegardez les modifications

---

### Étape 4: Attendre la Propagation DNS

**Délai normal:** 24-48 heures

**Vérifier le statut:**

```bash
# Dans terminal:
nslookup conformio.ca

# Devrait montrer les nameservers Vercel après propagation
```

Ou utilisez un outil en ligne:
- https://dnschecker.org/
- Entrez: `conformio.ca`
- Attendez que tout le monde affiche Vercel

---

### Étape 5: Vérifier et Tester

Après 24-48 heures:

1. **Allez à:** https://conformio.ca
2. **Vérifiez:** La page charge normalement
3. **Testez:** Formulaire, navigation, tout fonctionne
4. **Console:** F12 → Pas d'erreurs

---

## 🔍 État Actuel

**Actuellement, conformio.ca pointe vers:**
- Probablement GitHub Pages (basé sur package.json)
- Ou un autre serveur/registrar

**Après configuration:**
- ✅ Pointe vers Vercel
- ✅ Charge votre site React

---

## ⚠️ Attention Importante

### **Ne pas faire:**
- ❌ Ne supprimez pas l'ancien DNS immédiatement
- ❌ Ne changez pas les settings Vercel pendant la propagation
- ❌ Ne mélangez pas Nameservers et CNAME

### **À faire:**
- ✅ Notez les anciens nameservers avant de changer (pour rollback)
- ✅ Attendez la propagation complète (24-48h)
- ✅ Testez complètement après propagation

---

## 📊 Comparaison des Méthodes

| Aspect | Nameservers Vercel | CNAME Vercel |
|--------|-------------------|--------------|
| Complexité | Simple | Moyen |
| Configuration | Facile | Moyen |
| Maintenance | Aucune | Un peu |
| Flexibilité | Vercel seulement | Flexible |
| Recommandé | ✅ OUI | Non |

---

## 🆘 Troubleshooting

### **Problème: Après 48h, conformio.ca n'est pas sur Vercel**

**Vérifier:**
1. Les nameservers ont-ils été changés?
   ```bash
   whois conformio.ca | grep -i nameserver
   ```
2. Les nouveaux nameservers sont-ils corrects?
   ```bash
   nslookup conformio.ca
   ```

**Solutions:**
- Double-vérifier chez le registrar
- Attendre 72 heures (parfois plus)
- Contacter support du registrar

### **Problème: Site inaccessible après 24h**

**Causes:**
1. Les nameservers n'ont pas changé chez le registrar
2. Typo dans les nameservers
3. Conflits DNS

**Solutions:**
1. Vérifier chez le registrar
2. Vérifier l'écriture exacte des nameservers
3. Retirer et re-ajouter dans Vercel

### **Problème: Redirection ne fonctionne pas**

**Vérifier:**
- conformio.ca → Vercel? ✓
- www.conformio.ca → Vercel?

**Solutions dans Vercel:**
1. Ajouter aussi `www.conformio.ca`
2. Ajouter redirection de www vers non-www

---

## 📋 Checklist Finale

```
DNS Setup:
- [ ] Domaine conformio.ca acheté et accessible
- [ ] Vercel project créé et déployé
- [ ] Domaine ajouté dans Vercel Settings → Domains
- [ ] Nameservers Vercel notés
- [ ] Nameservers changés chez le registrar
- [ ] Anciens nameservers sauvegardés (pour rollback)

Vérification:
- [ ] 24-48h passées
- [ ] nslookup conformio.ca affiche Vercel
- [ ] https://conformio.ca charge
- [ ] F12 → Console: pas d'erreurs rouges
- [ ] Formulaire fonctionne
- [ ] Navigation fonctionne

Finale:
- [ ] www.conformio.ca fonctionne aussi
- [ ] Test sur mobile
- [ ] Test sur différents navigateurs
```

---

## 🎯 Prochaines Étapes

1. **Identifiez votre registrar** (Godaddy, Namecheap, OVH, etc.)
2. **Allez à Vercel** → Settings → Domains → Add `conformio.ca`
3. **Notez les nameservers** que Vercel vous donne
4. **Allez chez votre registrar** et changez les nameservers
5. **Attendez 24-48 heures**
6. **Testez** que https://conformio.ca fonctionne

---

## 📞 Support

Si vous êtes bloqué:

1. **Quel registrar utilisez-vous?** (Godaddy, Namecheap, OVH, etc.)
2. **Avez-vous accès au registrar?**
3. **Quelle erreur voyez-vous quand vous visitez conformio.ca?**

Dites-moi et je vous aiderai!

---

**Note:** Cela n'affecte pas votre déploiement Vercel. Votre site fonctionne déjà sur `votre-projet.vercel.app`. C'est juste pour connecter votre domaine personnalisé.
