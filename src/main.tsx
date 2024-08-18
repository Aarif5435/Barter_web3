import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MnemonicProvider } from './component/contextMnemonic.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MnemonicProvider>
        <App />
      </MnemonicProvider>
  </StrictMode>,
);