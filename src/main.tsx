import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { initSentry } from './config/sentry';
import { initAnalytics } from './config/analytics';

// Inicializar Sentry (debe ser lo primero)
initSentry();

// Inicializar Google Analytics
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
