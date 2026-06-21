import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './App.tsx';
import './index.css';
import './i18n/config';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.1, // Sample 10% of transactions
  replaysSessionSampleRate: 0.01, // 1% session replay (privacy-conscious)
  replaysOnErrorSampleRate: 1.0, // 100% session replay when an error occurs
  beforeSend(event) {
    if (event.user) delete event.user.email; // Strip PII before sending
    return event;
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
