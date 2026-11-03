import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CardProvider } from './context/CardContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

import App from './App.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CardProvider>
          <ToastContainer closeButton={false} autoClose={4000} position={'bottom-right'} />
          <App />
        </CardProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
