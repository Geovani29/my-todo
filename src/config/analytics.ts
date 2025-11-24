import ReactGA from 'react-ga4';

let isInitialized = false;

export const initAnalytics = () => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (!measurementId) {
        console.warn('⚠️ Google Analytics Measurement ID no configurado. Analytics deshabilitado.');
        return;
    }

    ReactGA.initialize(measurementId, {
        gaOptions: {
            debug_mode: import.meta.env.DEV,
        },
    });

    isInitialized = true;
    console.log('✅ Google Analytics inicializado');
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
    if (!isInitialized) return;

    ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title || document.title,
    });
};

// Track custom events
export const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number
) => {
    if (!isInitialized) return;

    ReactGA.event({
        category,
        action,
        label,
        value,
    });
};

// Eventos específicos de la aplicación
export const analytics = {
    // Auth events
    login: (method: string = 'email') => {
        trackEvent('Auth', 'login', method);
    },

    signup: (method: string = 'email') => {
        trackEvent('Auth', 'signup', method);
    },

    logout: () => {
        trackEvent('Auth', 'logout');
    },

    // Todo events
    todoCreated: () => {
        trackEvent('Todo', 'create');
    },

    todoDeleted: () => {
        trackEvent('Todo', 'delete');
    },

    todoUpdated: (field: string) => {
        trackEvent('Todo', 'update', field);
    },

    // Error events
    error: (errorType: string, errorMessage?: string) => {
        trackEvent('Error', errorType, errorMessage);
    },
};
