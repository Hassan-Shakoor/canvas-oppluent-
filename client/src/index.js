// ** Import React & Dependency
import React from 'react';
import ReactDOM from 'react-dom/client';

// ** Custom Component
import App from './App';

// Style Sheet Import
import './styles/font.css'
import './styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
// FontAwesome Import
import '@fortawesome/fontawesome-free/css/all.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
