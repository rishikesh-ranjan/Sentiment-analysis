import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './header';
import Button from '@mui/material/Button';
import Footer from './footer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <p id="soon">More features coming soon!</p>
    <Footer />
  </React.StrictMode>
);
