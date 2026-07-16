import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx'
import { CardProvider } from './context/CardContext.jsx';

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CardProvider>
        <ToastContainer closeButton={false} autoClose={3000} position={'bottom-right'} />
        <App />
      </CardProvider>
    </Router>
  </StrictMode>,
)
