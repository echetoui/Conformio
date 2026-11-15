import { beforeEach, describe, expect, it } from 'vitest';
import { loadAnalytics, trackPageView } from './analyticsService';

describe('analyticsService', () => {
  beforeEach(() => {
    document.getElementById('conformio-google-analytics')?.remove();
    delete (window as Window & { gtag?: unknown }).gtag;
    delete (window as Window & { dataLayer?: unknown[] }).dataLayer;
  });

  it('does not load a tracker until explicitly requested', () => {
    expect(document.getElementById('conformio-google-analytics')).toBeNull();
  });

  it('loads Analytics only when consent code calls it', () => {
    loadAnalytics();

    const script = document.getElementById('conformio-google-analytics') as HTMLScriptElement;
    expect(script).not.toBeNull();
    expect(script.src).toContain('googletagmanager.com/gtag/js?id=G-YSYYZF227G');

    trackPageView('/privacy');
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toEqual(expect.arrayContaining([
      expect.arrayContaining(['event', 'page_view']),
    ]));
  });
});
