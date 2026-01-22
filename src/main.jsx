import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import favicon so Vite copies it to the build
import './assets/bobak.ico';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
