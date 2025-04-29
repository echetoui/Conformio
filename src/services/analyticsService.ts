// Service d'analytique désactivé pour résoudre le problème de page blanche

// Fonctions vides qui ne font rien pour éviter les erreurs
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  // Désactivé - remplacé par console.log en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }
};

export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  // Désactivé
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Identify User', userId, userProperties);
  }
};

export const trackPageView = (pageName: string, properties: Record<string, any> = {}) => {
  // Désactivé
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page View', pageName, properties);
  }
};

export const resetUser = () => {
  // Désactivé
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Reset User');
  }
};
