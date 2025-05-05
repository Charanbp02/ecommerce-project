import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>   {/* ✅ Wrap your App */}
      <App />
    </AuthProvider>
  </StrictMode>
);
