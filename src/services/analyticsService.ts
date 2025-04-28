import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token
mixpanel.init('e8adece1191e583f82c254f783f852c0', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage',
});

export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  mixpanel.identify(userId);
  if (Object.keys(userProperties).length > 0) {
    mixpanel.people.set(userProperties);
  }
};

export const trackPageView = (pageName: string, properties: Record<string, any> = {}) => {
  trackEvent('Page View', {
    page: pageName,
    ...properties,
  });
};

export const resetUser = () => {
  mixpanel.reset();
};
