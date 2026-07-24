import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { SyncEngine } from './app/SyncEngine';
import './styles/globals.css';

// Initialize token & theme synchronization with the parent Design System Studio
SyncEngine.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
