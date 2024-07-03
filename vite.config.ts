import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(), 
    reactRefresh(),
    VitePWA()
  ],
  // optimizeDeps: {
  //   exclude: ['js-big-decimal']
  // }
  // build: {
  //   commonjsOptions: { transformMixedEsModules: true }
  // }
})
