import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@components/custom/Providers/Providers';
import AppRouter from '@components/custom/routes/Router';
import '@theme/index.css';


createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Providers>
        <AppRouter />
      </Providers>
    </StrictMode>,
  );
