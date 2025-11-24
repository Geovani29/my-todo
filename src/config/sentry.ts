import * as Sentry from '@sentry/react';

export const initSentry = () => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development';

    // Solo inicializar si hay DSN configurado
    if (!dsn) {
        console.warn('⚠️ Sentry DSN no configurado. Error tracking deshabilitado.');
        return;
    }

    Sentry.init({
        dsn,
        environment,

        // Configuración de integración con React
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],

        // Performance Monitoring
        tracesSampleRate: environment === 'production' ? 0.1 : 1.0,

        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,

        // Release tracking
        release: import.meta.env.VITE_SENTRY_RELEASE,

        // Filtrar errores conocidos
        beforeSend(event, hint) {
            // Filtrar errores de extensiones del navegador
            if (event.exception) {
                const error = hint.originalException as Error;
                if (error && error.message && error.message.includes('chrome-extension://')) {
                    return null;
                }
            }
            return event;
        },
    });
};

// Helper para capturar errores con contexto
export const captureError = (error: Error, context?: Record<string, any>) => {
    Sentry.captureException(error, {
        extra: context,
    });
};

// Helper para agregar breadcrumbs
export const addBreadcrumb = (message: string, data?: Record<string, any>) => {
    Sentry.addBreadcrumb({
        message,
        data,
        level: 'info',
    });
};

// Helper para setear contexto de usuario
export const setUserContext = (user: { id: string; email?: string; name?: string }) => {
    Sentry.setUser(user);
};

// Helper para limpiar contexto de usuario
export const clearUserContext = () => {
    Sentry.setUser(null);
};
