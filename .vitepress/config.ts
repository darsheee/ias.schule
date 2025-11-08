import type { DefaultTheme } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { pwa } from './scripts/pwa'
import { transformHead } from './scripts/transformHead'

const Guide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/guide/',
  },
  {
    text: 'Mermaid Diagrams',
    link: '/guide/mermaid-diagrams',
  },
  {
    text: 'D3 Charts',
    link: '/guide/d3-charts',
  },
  {
    text: 'Grouped Bar Charts',
    link: '/guide/grouped-bar-charts',
  },
  {
    text: 'Gradient Charts',
    link: '/guide/gradient-charts',
  },
  {
    text: 'Area Charts',
    link: '/guide/area-charts',
  },
  {
    text: 'Scatter Plots',
    link: '/guide/scatter-plots',
  },
  {
    text: 'Percentogram',
    link: '/guide/percentogram',
  },
  {
    text: 'Pie & Donut Charts',
    link: '/guide/pie-charts',
  },
]

function prepareSidebar() {
  return [
    {
      text: 'Guide',
      collapsible: true,
      collapsed: false,
      items: Guide,
    },
  ]
}

const ogUrl = 'https://vite-pwa-org.netlify.app/'
const ogImage = `${ogUrl}og-image.png`

export default withPwa(defineConfig({
  lang: 'en-US',
  title: 'Vite PWA',
  description: 'Zero-config PWA Framework-agnostic for Vite and Integrations',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, React, Vue, VitePress, Preact, Svelte, SvelteKit, workbox, SolidJS, Vite, vite-plugin, íles, Astro, Nuxt 3, Nuxt module, Remix',
    }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vite Plugin PWA' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:description', content: 'Zero-config PWA Framework-agnostic Plugin for Vite and Integrations' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { name: 'twitter:description', content: 'Zero-config PWA Framework-agnostic Plugin for Vite and Integrations' }],
    ['meta', { name: 'twitter:title', content: 'Vite PWA' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
  ],
  srcExclude: ['README.md', 'CONTRIBUTING.md'],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', link: 'https://vite-pwa-org-zh.netlify.app/' },
  },
  themeConfig: {
    // logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/vite-pwa/docs/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1,
            },
          },
        },
        _render(src, env, md) {
          // Exclude specific files from search to reduce index size
          const excludePatterns = [
            'MERMAID_IMPLEMENTATION',
            'MERMAID_README',
            'CONTRIBUTING',
          ]
          
          if (env.relativePath && excludePatterns.some(pattern => env.relativePath.includes(pattern))) {
            return ''
          }
          
          // Exclude pages with search: false in frontmatter
          if (env.frontmatter?.search === false) {
            return ''
          }
          
          return md.render(src, env)
        },
      },
    },
    // socialLinks: [
    //   { icon: 'discord', link: 'https://discord.gg/uccDuWkScq' },
    //   { icon: 'github', link: 'https://github.com/vite-pwa/vite-plugin-pwa' },
    // ],
    footer: {
      copyright: 'Copyright © 2021-PRESENT Ias.schule',
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '^/guide/',
      },
      {
        text: 'Charts',
        items: [
          {
            text: 'D3 Charts',
            link: '/guide/d3-charts',
          },
          {
            text: 'Grouped Bar Charts',
            link: '/guide/grouped-bar-charts',
          },
          {
            text: 'Gradient Charts',
            link: '/guide/gradient-charts',
          },
          {
            text: 'Area Charts',
            link: '/guide/area-charts',
          },
          {
            text: 'Scatter Plots',
            link: '/guide/scatter-plots',
          },
          {
            text: 'Percentogram',
            link: '/guide/percentogram',
          },
          {
            text: 'Pie & Donut Charts',
            link: '/guide/pie-charts',
          },
        ],
      },
      {
        text: 'Diagrams',
        items: [
          {
            text: 'Mermaid Diagrams',
            link: '/guide/mermaid-diagrams',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': prepareSidebar(),
    },
  },
  vite: {
    logLevel: 'info',
    plugins: [groupIconVitePlugin()],
  },
  pwa,
  transformHead,
}))
