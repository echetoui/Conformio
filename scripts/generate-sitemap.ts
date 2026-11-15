/**
 * Script pour générer le sitemap.xml
 * À exécuter après chaque changement majeur des routes
 *
 * Usage: npx ts-node scripts/generate-sitemap.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const baseUrl = 'https://www.conformio.ca';

function getSitemapEntries(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];

  return [
    {
      loc: `${baseUrl}/fr`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/en`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/fr/methode-conformite`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/en/compliance-method`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];
}

function escapeXml(str: string): string {
  const xmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };

  return str.replace(/[&<>"']/g, (char) => xmlEscapes[char]);
}

function generateSitemapXml(): string {
  const entries = getSitemapEntries();

  const urlElements = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

function main() {
  try {
    const xml = generateSitemapXml();
    const outputPaths = [
      path.join(__dirname, '../public/sitemap.xml'),
      path.join(__dirname, '../dist/sitemap.xml'),
    ];

    for (const outputPath of outputPaths) {
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.writeFileSync(outputPath, xml, 'utf-8');
    }

    console.log('✅ Sitemap généré avec succès!');
    console.log(`📍 Fichiers: ${outputPaths.join(', ')}`);
    console.log(`📊 Nombre d'URLs: ${xml.match(/<url>/g)?.length || 0}`);
  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error);
    process.exit(1);
  }
}

main();
