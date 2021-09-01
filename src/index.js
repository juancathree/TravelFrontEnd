import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import App from './App';
import 'styles/normalize.css';
import 'styles/_colors.scss';
import 'styles/font-family.scss';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
