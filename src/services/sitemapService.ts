/**
 * Service pour générer le sitemap.xml avec les URLs canoniques
 * Basé sur la structure des routes de l'application
 */

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://conformio.ca') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Obtient la liste des entrées du sitemap
   */
  private getSitemapEntries(): SitemapEntry[] {
    const today = new Date().toISOString().split('T')[0];

    return [
      {
        loc: `${this.baseUrl}/#/`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: `${this.baseUrl}/#/privacy`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.5,
      },
      {
        loc: `${this.baseUrl}/#/terms`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.5,
      },
      {
        loc: `${this.baseUrl}/#/contact`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7,
      },
    ];
  }

  /**
   * Génère le XML du sitemap
   */
  generateSitemapXml(): string {
    const entries = this.getSitemapEntries();

    const urlElements = entries
      .map(
        (entry) => `  <url>
    <loc>${this.escapeXml(entry.loc)}</loc>
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

  /**
   * Échappe les caractères spéciaux en XML
   */
  private escapeXml(str: string): string {
    const xmlEscapes: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };

    return str.replace(/[&<>"']/g, (char) => xmlEscapes[char]);
  }

  /**
   * Obtient les URLs canoniques pour une route
   */
  getCanonicalUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}/#${normalizedPath}`;
  }
}

// Export une instance singleton
export const sitemapService = new SitemapService();
