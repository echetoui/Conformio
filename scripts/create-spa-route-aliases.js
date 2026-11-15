/* global process */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const entryFile = join(distDir, 'index.html')
const entryHtml = readFileSync(entryFile, 'utf8')
const baseUrl = 'https://www.conformio.ca'

const routes = [
  {
    path: 'fr',
    lang: 'fr',
    title: 'Conformio — Plateforme de conformité au Québec et au Canada',
    description: 'Structurez ISO 27001, SOC 2, Loi 25 et TGV avec une plateforme de pilotage adaptée aux entreprises québécoises et canadiennes.',
    h1: 'Pilotez votre conformité avec une feuille de route claire',
    h2: 'Une méthode claire pour piloter votre conformité',
    staticContent: `
      <p>Conformio aide les entreprises québécoises et canadiennes à piloter leur conformité. La plateforme rassemble ISO 27001, SOC 2, Loi 25 et TGV dans une feuille de route claire. Les équipes partagent la même vue.</p>
      <p>Commencez par cartographier vos exigences. Identifiez ensuite vos priorités. Organisez les actions et les responsabilités. Enfin, préparez les preuves nécessaires pour vos clients et vos audits.</p>
      <p>Conformio vous aide à préparer une vente à un grand compte, un appel d’offres, une revue de sécurité ou un nouveau marché. Les normes visées dépendent de votre entreprise. La plateforme vous aide à prendre la bonne direction.</p>
      <p>Découvrez les <a href="#benefits">avantages</a>, parcourez les <a href="#features">quatre étapes</a> ou <a href="/contact">contactez Conformio</a>.</p>
    `,
  },
  {
    path: 'en',
    lang: 'en',
    title: 'Conformio — Compliance platform for Quebec and Canada',
    description: 'Structure ISO 27001, SOC 2, Quebec privacy requirements, and TGV with a compliance platform built for Canadian companies.',
    h1: 'Lead compliance with a clear action plan',
    h2: 'A clear method for leading compliance',
    staticContent: `
      <p>Conformio helps Quebec and Canadian companies manage compliance with less friction. It brings SOC 2, ISO 27001, Quebec privacy rules, and TGV into one clear path. Leaders and teams can use the same view.</p>
      <p>First, map your obligations and priorities. Then find the gaps that need attention. Next, set the order of work. Finally, track the evidence needed for review. This keeps ownership and progress visible.</p>
      <p>Use Conformio when you prepare for an enterprise sale, a procurement process, a security review, or a new market. Your goals and standards depend on your business. The platform helps you assess them and plan the next step.</p>
      <p>Read about the <a href="#benefits">benefits</a>, review the <a href="#features">four steps</a>, or <a href="/contact">contact the Conformio team</a>.</p>
    `,
  },
  {
    path: 'fr/methode-conformite',
    lang: 'fr',
    title: 'Méthode de conformité ISO 27001, SOC 2 et Loi 25 | Conformio',
    description: 'Découvrez la méthode Conformio pour cartographier vos exigences, prioriser les écarts, organiser les actions et préparer vos preuves.',
    h1: 'Une méthode claire pour piloter votre conformité',
    h2: 'Les quatre étapes de la méthode Conformio',
    staticContent: `
      <p>La méthode Conformio transforme des exigences dispersées en actions faciles à suivre. Elle aide les équipes à comprendre ce qui est requis, ce qui manque et ce qui doit être fait ensuite.</p>
      <p>MAP relie vos normes, obligations et objectifs. READ identifie les priorités. SEQUENCE organise les responsables et les échéances. REVIEW prépare les preuves pour vos clients, vos revues et vos audits.</p>
      <p>Chaque étape produit un exemple de livrable : matrice des exigences, registre des écarts, feuille de route et registre de preuves. Ces exemples décrivent la structure de la méthode. Ils ne représentent pas les résultats d’un client et ne promettent pas une certification.</p>
      <p><a href="/contact">Obtenez une première orientation</a> ou retournez à l’<a href="/fr">accueil</a>.</p>
    `,
  },
  {
    path: 'en/compliance-method',
    lang: 'en',
    title: 'ISO 27001, SOC 2 and privacy compliance method | Conformio',
    description: 'Learn how Conformio maps requirements, prioritizes gaps, organizes actions, and prepares evidence for review.',
    h1: 'A clear method for leading compliance',
    h2: 'The four steps in the Conformio method',
    staticContent: `
      <p>The Conformio method turns scattered requirements into actions your team can track. It helps you understand what is required, what is missing, and what should happen next.</p>
      <p>MAP connects standards, obligations, and goals. READ sets priorities. SEQUENCE organizes owners and due dates. REVIEW prepares evidence for customers, reviews, and audits.</p>
      <p>Each step produces an example output: a requirements matrix, a gap register, an action roadmap, and an evidence register. These examples describe the method structure. They are not client results and do not promise certification.</p>
      <p><a href="/contact">Get an initial orientation</a> or return to the <a href="/en">home page</a>.</p>
    `,
  },
  {
    path: 'contact',
    lang: 'fr',
    title: 'Contact Conformio — Parcours de conformité au Québec',
    description: 'Entrez en contact avec l’équipe Conformio pour structurer votre parcours de conformité depuis le Québec.',
    h1: 'Construisez un parcours de conformité lisible et actionnable.',
    h2: 'Ce que nous pouvons clarifier ensemble',
    staticContent: `
      <p>Conformio aide les entreprises québécoises et canadiennes à structurer leur conformité. Une première discussion permet de clarifier votre contexte, vos marchés et vos priorités.</p>
      <p>Nous pouvons relier vos obligations et vos standards. Nous pouvons aussi repérer les écarts urgents. Enfin, nous pouvons organiser les actions et les preuves à suivre.</p>
      <p>Pour préparer l’échange, notez vos échéances, les demandes de vos clients et les outils de votre équipe. Une documentation parfaite n’est pas requise pour commencer.</p>
      <p>Les normes et les marchés visés dépendent de votre situation. Conformio vous aide à prendre de bonnes décisions. <a href="https://cal.com/conformio">Planifiez une discussion</a> ou retournez à l’<a href="/fr">accueil</a>.</p>
    `,
  },
  {
    path: 'privacy',
    lang: 'fr',
    title: 'Politique de Confidentialité - Conformio',
    description: 'Découvrez comment Conformio collecte, utilise et protège vos données.',
    h1: 'Politique de Confidentialité',
    h2: 'Comment Conformio traite vos informations',
    staticContent: `
      <p>Cette politique explique comment Conformio protège vos renseignements personnels. Elle s’applique lorsque vous visitez le site, demandez de l’information ou planifiez un échange.</p>
      <p>Nous pouvons recueillir votre nom, votre courriel, votre entreprise et votre rôle. Nous pouvons aussi recueillir les détails que vous partagez sur vos besoins de conformité.</p>
      <p>Nous utilisons ces données pour répondre à vos demandes, organiser les échanges et améliorer le site. L’accès est limité aux personnes et aux fournisseurs qui en ont besoin. Nous ne vendons pas vos données.</p>
      <p>Nous prenons des mesures raisonnables contre l’accès non autorisé, la perte et la divulgation. Pour poser une question, écrivez à info@conformio.ca. Consultez aussi les <a href="/terms">conditions d’utilisation</a> ou la page d’<a href="/fr">accueil</a>.</p>
    `,
  },
  {
    path: 'terms',
    lang: 'fr',
    title: "Conditions d'Utilisation - Conformio",
    description: "Examinez les conditions d'utilisation de Conformio.",
    h1: "Conditions d'Utilisation",
    h2: 'Utilisation du site et portée des informations',
    staticContent: `
      <p>Ces conditions encadrent l’accès au site Conformio. Elles couvrent les informations, les outils et les prises de contact proposés sur le site. Vous devez utiliser le site de façon légale et respectueuse.</p>
      <p>Conformio présente une méthode pour structurer la conformité et les risques. Le contenu du site est informatif. Il ne remplace pas un avis juridique. Il ne constitue pas une certification ni une garantie de résultat.</p>
      <p>Vous êtes responsable des informations que vous transmettez. Vous êtes aussi responsable de vos décisions et du choix des exigences qui s’appliquent à votre organisation. Un accord distinct peut définir les services et les livrables.</p>
      <p>La marque, le contenu et les visuels du site sont protégés. Pour une question, écrivez à info@conformio.ca. Consultez la <a href="/privacy">politique de confidentialité</a> ou retournez à l’<a href="/fr">accueil</a>.</p>
    `,
  },
]

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function createRouteHtml(route) {
  const canonicalUrl = `${baseUrl}/${route.path}`
  let html = entryHtml

  html = html.replace(/<html lang="[^"]+">/, `<html lang="${route.lang}">`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(route.title)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(route.description)}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeAttribute(route.title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(route.description)}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeAttribute(route.title)}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(route.description)}$2`)
  html = html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`)
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><h1 data-static-seo-heading="true">${escapeAttribute(route.h1)}</h1><h2 data-static-seo-heading="true">${escapeAttribute(route.h2)}</h2><div data-static-seo-content="true">${route.staticContent}</div></div>`
  )

  return html
}

for (const route of routes) {
  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), createRouteHtml(route))
}

console.log('✅ Shells HTML distincts générés pour les routes principales et les pages méthode')
