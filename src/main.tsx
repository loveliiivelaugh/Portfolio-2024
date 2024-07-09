import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './Providers/Providers';
import App from './components/App/App'
import 'regenerator-runtime'
import './index.css';


createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  );
