import { describe, expect, it } from 'vitest';
import { SitemapService } from './sitemapService';

describe('SitemapService', () => {
  it('generates canonical URLs without hash fragments', () => {
    const service = new SitemapService();

    expect(service.getCanonicalUrl('/privacy')).toBe('https://www.conformio.ca/privacy');
    expect(service.getCanonicalUrl('#/terms')).toBe('https://www.conformio.ca/terms');
  });
});
