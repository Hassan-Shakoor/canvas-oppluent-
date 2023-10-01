import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactDOM from 'react-dom/client';
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
    <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme='light'/>
  </React.StrictMode>
);
