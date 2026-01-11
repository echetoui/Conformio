# Pointer conformio.ca de GitHub Pages vers Vercel

## 📊 État Actuel

Votre DNS sur **Godaddy**:
```
A records: 185.199.108.153, etc.  ← GitHub Pages
CNAME www: echetoui.github.io     ← GitHub Pages
Nameservers: ns69/ns70.domaincontrol.com  ← Godaddy
```

## ✅ Solution: Remplacer les A Records

**Option 1 (Facile - Recommandé):** Changer juste les A records
**Option 2:** Changer les nameservers entièrement

Je recommande **Option 1** car vous avez déjà email/DNS configurés.

---

## 🔧 Option 1: Remplacer les A Records (FACILE)

### Étape 1: Aller sur Godaddy DNS

1. Connectez-vous à https://godaddy.com
2. Allez à **"My Products"** → **"Domains"**
3. Cliquez sur **"conformio.ca"**
4. Cliquez sur **"Manage DNS"**

### Étape 2: Remplacer les 4 A Records

**Supprimer les anciennes IPs GitHub Pages:**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**Ajouter les nouvelles IPs Vercel:**

```
Type: A
Name: @
Value: 76.76.19.165
TTL: 600

Type: A
Name: @
Value: 76.76.19.166
TTL: 600

Type: A
Name: @
Value: 76.76.20.165
TTL: 600

Type: A
Name: @
Value: 76.76.20.166
TTL: 600
```

**Actions dans Godaddy:**

Pour chaque ancien A record:
1. Cliquez "Edit"
2. Changez la valeur vers une IP Vercel
3. Cliquez "Save"

Ou supprimer/ajouter nouveau.

### Étape 3: Ajouter/Mettre à Jour le CNAME www

**Actuel:**
```
CNAME www: echetoui.github.io
```

**Changez à:**
```
Type: CNAME
Name: www
Value: cname.vercel.com
TTL: 600
```

**Actions:**
1. Cliquez "Edit" sur le CNAME www
2. Changez `echetoui.github.io.` → `cname.vercel.com`
3. Cliquez "Save"

### Étape 4: Attendre la Propagation

- **DNS change:** ~5-30 minutes généralement
- **Global propagation:** 24-48 heures

Vérifier:
```bash
nslookup conformio.ca

# Devrait afficher les nouvelles IPs Vercel
```

### Étape 5: Vérifier dans Vercel

1. Allez à https://vercel.com/dashboard
2. Conformio → Settings → Domains
3. Vérifiez que `conformio.ca` montre **✓ Active**
4. Devrait montrer: `cname: cname.vercel.com`

---

## 🔧 Option 2: Changer les Nameservers (ALTERNATIVE)

Si vous voulez que Vercel gère tout:

### Dans Vercel:
1. Settings → Domains
2. Add: `conformio.ca`
3. Vercel affiche les nameservers

### Dans Godaddy:
1. Allez à DNS settings
2. Changez Nameservers de:
   ```
   ns69.domaincontrol.com
   ns70.domaincontrol.com
   ```
   À:
   ```
   ns1.vercel.com
   ns2.vercel.com
   ns3.vercel.com
   ns4.vercel.com
   ```

**Avantage:** Vercel gère tout
**Inconvénient:** Perte de contrôle sur email/autres services

---

## ✅ Checklist: Option 1 (Recommandée)

```
DNS Godaddy:
- [ ] Connecté à godaddy.com
- [ ] Allez à Domains → conformio.ca → Manage DNS
- [ ] Remplacé le 1er A record (185.199.108.153 → 76.76.19.165)
- [ ] Remplacé le 2e A record (185.199.109.153 → 76.76.19.166)
- [ ] Remplacé le 3e A record (185.199.110.153 → 76.76.20.165)
- [ ] Remplacé le 4e A record (185.199.111.153 → 76.76.20.166)
- [ ] Changé CNAME www: echetoui.github.io → cname.vercel.com
- [ ] Tous les changements sauvegardés

Vercel:
- [ ] Allez à vercel.com/dashboard
- [ ] Settings → Domains
- [ ] Domaine conformio.ca affiche ✓ Active
- [ ] Email de verification reçu (check spam)

Vérification:
- [ ] 5-10 minutes passées
- [ ] nslookup conformio.ca affiche les IPs Vercel
- [ ] https://conformio.ca charge le site Vercel
- [ ] https://www.conformio.ca fonctionne aussi
- [ ] F12 Console: pas d'erreurs
```

---

## 📋 Résumé des Changements DNS

| Type | Name | Avant | Après |
|------|------|-------|-------|
| A | @ | 185.199.108.153 | 76.76.19.165 |
| A | @ | 185.199.109.153 | 76.76.19.166 |
| A | @ | 185.199.110.153 | 76.76.20.165 |
| A | @ | 185.199.111.153 | 76.76.20.166 |
| CNAME | www | echetoui.github.io. | cname.vercel.com |

**Garder intact:**
- MX records (email)
- SPF records
- DMARC records
- DKIM records

---

## ⏱️ Timeline

```
Maintenant:         Faire les changements DNS Godaddy
  ↓ (5-30 min)
DNS Godaddy:        Propage localement
  ↓ (24-48h)
Global DNS:         Partout dans le monde
  ↓
✅ conformio.ca sur Vercel!
```

---

## 🆘 Si Ça Ne Marche Pas

### Vérification:
```bash
# Voir les A records actuels
nslookup conformio.ca

# Voir les CNAME
nslookup www.conformio.ca

# Voir les nameservers
whois conformio.ca | grep -i nameserver
```

### Problèmes Courants:

**Problème:** Site ne charge pas après 1 heure
- Vérifiez que les A records ont changé
- Vérifiez que CNAME www est correct
- Peut-être que Godaddy cache les changements

**Problème:** Vercel montre "Not Added" pour le domaine
- Attendez 5 minutes
- Actualisez Vercel
- Les A records doivent pointer sur Vercel

**Problème:** Email ne marche plus
- Email configure avec MX records
- Vérifiez que MX records sont toujours là
- MX records ne changent pas

---

## 📞 Support

Si vous êtes bloqué:
1. Montrez-moi les DNS records actuels après changement
2. Dites-moi l'erreur exacte que vous voyez
3. Dites-moi le résultat de `nslookup conformio.ca`

---

## 🚀 Prochaines Étapes

1. **Allez sur Godaddy** → Manage DNS pour conformio.ca
2. **Changez les A records** (4 records)
3. **Changez le CNAME www** vers cname.vercel.com
4. **Sauvegardez les changements**
5. **Attendez 5-30 minutes** pour propagation locale
6. **Testez:** https://conformio.ca
7. **Vérifiez dans Vercel** que domaine est ✓ Active

Dites-moi quand c'est fait! 🎉
