import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

// import { SmoothScroll } from './theme/SmoothScroll.jsx';
import { PageTransitionWrapper, ThemeProvider } from './theme/ThemeProvider';
import './index.css';


const queryClient = new QueryClient();


const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <PageTransitionWrapper>
        {/* <SmoothScroll>
        </SmoothScroll> */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PageTransitionWrapper>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
