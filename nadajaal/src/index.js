// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles.css'; // (optional) if we need minor custom tweaks

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
