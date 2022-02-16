import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';

render(
  <React.StrictMode>
    {/* <CookiesProvider> */}
    <Router>
      <App />
    </Router>
    {/* </CookiesProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
