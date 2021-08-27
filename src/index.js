import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import App from './App';
import 'normalize.css';
import 'colors.css';
import 'react-notifications/lib/notifications.css';
import global_es from 'translations/es/global.json';
import global_en from 'translations/en/global.json';

const options = {
   order: ['navigator'],
};

i18next.use(detector).init({
   detection: options,
   interpolation: { escapeValue: false },
   fallbackLng: 'en',
   resources: {
      es: {
         global: global_es,
      },
      en: {
         global: global_en,
      },
   },
});

ReactDOM.render(
   <React.StrictMode>
      <I18nextProvider i18n={i18next}>
         <App />
      </I18nextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
