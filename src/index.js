import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CrypoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';
// import SignInContext from './SignInContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CrypoContext>
      <App />
    </CrypoContext>
  </React.StrictMode>
);
