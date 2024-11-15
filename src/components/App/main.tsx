import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '../custom/Providers/Providers';
import AppRouter from '@components/custom/routes/Router';
// import App from './App'
import '../../utilities/theme/index.css';


createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Providers>
        <AppRouter />
      </Providers>
    </StrictMode>,
  );
