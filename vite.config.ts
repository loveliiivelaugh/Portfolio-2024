import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9876,
  },
  plugins: [
    react(), 
    reactRefresh(),
    VitePWA()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/utilities/api"),
      "@store": path.resolve(__dirname, "./src/utilities/store"),
      "@scripts": path.resolve(__dirname, "./src/utilities/scripts"),
      "@helpers": path.resolve(__dirname, "./src/utilities/helpers"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/utilities/lib"),
      "@theme": path.resolve(__dirname, "./src/utilities/theme"),
      "@utilities": path.resolve(__dirname, "./src/utilities"),
      "@assets": path.resolve(__dirname, "./src/utilities/assets")
    }
  }
  // optimizeDeps: {
  //   exclude: ['js-big-decimal']
  // }
  // build: {
  //   commonjsOptions: { transformMixedEsModules: true }
  // }
})
