import './bootstrap';
import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <BrowserRouter>
        <NextApp />
      </BrowserRouter>,
      rootEl
    );
  });
}

registerServiceWorker();
