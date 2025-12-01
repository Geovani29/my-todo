import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { initSentry } from './config/sentry';
import { initAnalytics } from './config/analytics';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.css';

initSentry();
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
