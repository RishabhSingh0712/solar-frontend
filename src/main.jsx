import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the path as needed
import { BrowserRouter as Router,useNavigate } from 'react-router-dom';
import './index.css'; // If you have a CSS file for Tailwind
import {AuthProvider} from '../src/context/AuthContext/AuthContext'
import {PasswordVisibilityProvider} from '../src/context/PasswordVisibilityContext/PasswordVisibilityContext'
import {LoadingProvider} from '../src/context/LoadingContext/LoadingContext'
import { ActiveTabProvider } from '../src/context/ActiveTab/ActiveTab';
import { DialogProvider } from '../src/context/DialogContext/DialogContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <DialogProvider>

    <ActiveTabProvider>
        <AuthProvider>
          <PasswordVisibilityProvider>
            <App />
          </PasswordVisibilityProvider>
        </AuthProvider>
    </ActiveTabProvider>
    </DialogProvider>
  </Router>

);
