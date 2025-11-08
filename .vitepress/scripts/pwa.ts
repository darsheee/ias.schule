import type { PwaOptions } from '@vite-pwa/vitepress'

export const pwa: Partial<PwaOptions> = {
  outDir: '.vitepress/dist',
  registerType: 'autoUpdate',
  includeManifestIcons: false,
  manifest: {
    id: '/',
    name: 'IAS Schule - UPSC Preparation',
    short_name: 'IAS Schule',
    description: 'Complete UPSC Civil Services Preparation Platform',
    theme_color: '#ffffff',
    start_url: '/',
    lang: 'en-US',
    dir: 'ltr',
    orientation: 'natural',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    categories: ['education', 'reference'],  
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [{
      src: 'og-image.png',
      sizes: '1200x630',
      type: 'image/png',
      label: 'IAS Schule - UPSC Civil Services Preparation Platform',
    }],
    shortcuts: [{
      name: 'General Studies I',
      description: 'Indian History, Culture, Geography & Society',
      url: '/upsc/gs1/',
      icons: [{
        src: 'shortcuts/guide.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'General Studies II',
      description: 'Polity, Governance, Constitution & International Relations',
      url: '/upsc/gs2/',
      icons: [{
        src: 'shortcuts/assets.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'General Studies III',
      description: 'Economy, Technology, Environment & Security',
      url: '/upsc/gs3/',
      icons: [{
        src: 'shortcuts/frameworks.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'General Studies IV',
      description: 'Ethics, Integrity & Aptitude',
      url: '/upsc/gs4/',
      icons: [{
        src: 'shortcuts/deploy.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'Essay & Prelims',
      description: 'Essay writing strategies and Prelims preparation',
      url: '/upsc/essay/',
      icons: [{
        src: 'shortcuts/workbox.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }],
    handle_links: 'preferred',
    launch_handler: {
      client_mode: ['navigate-existing', 'auto'],
    },
    edge_side_panel: {
      preferred_width: 480,
    },
  },
  experimental: {
    includeAllowlist: true,
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2,json,excalidraw}'],
    globIgnores: ['shortcuts/*.svg'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'jsdelivr-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
