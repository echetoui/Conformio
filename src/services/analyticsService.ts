const GOOGLE_ANALYTICS_ID = 'G-YSYYZF227G';
const SCRIPT_ID = 'conformio-google-analytics';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function loadAnalytics(): void {
  if (typeof window === 'undefined' || document.getElementById(SCRIPT_ID)) return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  };
  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', GOOGLE_ANALYTICS_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);
}

export function disableAnalytics(): void {
  if (typeof document === 'undefined') return;
  document.getElementById(SCRIPT_ID)?.remove();
}

export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  (window as AnalyticsWindow).gtag?.('event', eventName, properties);
};

export const identifyUser = (userId: string, userProperties: Record<string, unknown> = {}) => {
  void userId;
  void userProperties;
};

export const trackPageView = (pageName: string, properties: Record<string, unknown> = {}) => {
  (window as AnalyticsWindow).gtag?.('event', 'page_view', { page_path: pageName, ...properties });
};

export const resetUser = () => {
  void 0;
};
