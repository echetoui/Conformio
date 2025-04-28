import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = 'e8adece1191e583f82c254f783f852c0';

// Initialize Mixpanel with your project token
if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined') {
      mixpanel.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined') {
      mixpanel.identify(userId);
      if (Object.keys(userProperties).length > 0) {
        mixpanel.people.set(userProperties);
      }
    }
  } catch (error) {
    console.error('Error identifying user:', error);
  }
};

export const trackPageView = (pageName: string, properties: Record<string, any> = {}) => {
  trackEvent('Page View', {
    page: pageName,
    ...properties,
  });
};

export const resetUser = () => {
  try {
    if (typeof window !== 'undefined') {
      mixpanel.reset();
    }
  } catch (error) {
    console.error('Error resetting user:', error);
  }
};
