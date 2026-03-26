import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// קומפוננטה קטנה בשביל להשתמש ב-navigate של React Router
function ClerkWrapper({ children }) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      afterSignInUrl="/home"
      afterSignOutUrl="/login"
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWrapper>
        <App />
      </ClerkWrapper>
    </BrowserRouter>
  </React.StrictMode>
);