import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: 'prompt' as const, // Ensure 'prompt' is treated as a literal type
  includeAssets: ['favicon.png',"assets/*  "], // Fix typo here: includeAssets instead of includeAssests
  manifest: {
    name: "Gopher.gg",
    short_name: "Gopher",
    description: "An app about the go programming language",
    icons: [
      {
        src: "/icon1.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any maskable"
      },
      {
        src: "/icon2.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any maskable"

      }
    ],
    theme_color: '#000000',
    background_color: '#ffffff',
    display: "standalone" as "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait' as "portrait"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
