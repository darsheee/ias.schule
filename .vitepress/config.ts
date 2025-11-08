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

const UPSC: DefaultTheme.SidebarItem[] = [
  {
    text: 'UPSC Examination',
    link: '/upsc/',
  },
  {
    text: 'General Studies I',
    link: '/upsc/gs1/',
    collapsed: true,
    items: [
      { text: 'Ancient History', link: '/upsc/gs1/ancient-history/' },
      { text: 'Medieval History', link: '/upsc/gs1/medieval-history/' },
      { text: 'Modern History', link: '/upsc/gs1/modern-history/' },
      { text: 'Freedom Struggle', link: '/upsc/gs1/freedom-struggle/' },
      { text: 'Post-Independence', link: '/upsc/gs1/post-independence/' },
      { text: 'World History', link: '/upsc/gs1/world-history/' },
      { text: 'Indian Society', link: '/upsc/gs1/society/' },
      { text: 'Indian Geography', link: '/upsc/gs1/geography/' },
      { text: 'Culture & Heritage', link: '/upsc/gs1/culture/' },
    ],
  },
  {
    text: 'General Studies II',
    link: '/upsc/gs2/',
    collapsed: true,
    items: [
      { text: 'Constitution', link: '/upsc/gs2/constitution/' },
      { text: 'Polity', link: '/upsc/gs2/polity/' },
      { text: 'Judiciary', link: '/upsc/gs2/judiciary/' },
      { text: 'Constitutional Bodies', link: '/upsc/gs2/bodies/' },
      { text: 'Governance', link: '/upsc/gs2/governance/' },
      { text: 'Government Policies', link: '/upsc/gs2/policies/' },
      { text: 'Welfare Schemes', link: '/upsc/gs2/schemes/' },
      { text: 'International Relations', link: '/upsc/gs2/ir/' },
    ],
  },
  {
    text: 'General Studies III',
    link: '/upsc/gs3/',
    collapsed: true,
    items: [
      { text: 'Economy', link: '/upsc/gs3/economy/' },
      { text: 'Agriculture', link: '/upsc/gs3/agriculture/' },
      { text: 'Infrastructure', link: '/upsc/gs3/infrastructure/' },
      { text: 'Science & Technology', link: '/upsc/gs3/science/' },
      { text: 'IT & Emerging Tech', link: '/upsc/gs3/it/' },
      { text: 'Environment', link: '/upsc/gs3/environment/' },
      { text: 'Disaster Management', link: '/upsc/gs3/disaster/' },
      { text: 'Internal Security', link: '/upsc/gs3/security/' },
    ],
  },
  {
    text: 'General Studies IV',
    link: '/upsc/gs4/',
    collapsed: true,
    items: [
      { text: 'Ethics & Values', link: '/upsc/gs4/ethics/' },
      { text: 'Attitude & Aptitude', link: '/upsc/gs4/attitude/' },
      { text: 'Emotional Intelligence', link: '/upsc/gs4/ei/' },
      { text: 'Moral Thinkers', link: '/upsc/gs4/thinkers/' },
      { text: 'Probity in Governance', link: '/upsc/gs4/probity/' },
      { text: 'Case Studies', link: '/upsc/gs4/case-studies/' },
    ],
  },
  {
    text: 'Essay',
    link: '/upsc/essay/',
  },
  {
    text: 'Prelims',
    link: '/upsc/prelims/',
  },
]

function prepareSidebar() {
  return [
    {
      text: 'Data Visualization',
      collapsible: true,
      collapsed: false,
      items: Guide,
    },
    {
      text: 'UPSC Civil Services',
      collapsible: true,
      collapsed: false,
      items: UPSC,
    },
  ]
}

const ogUrl = 'https://ias.schule/'
const ogImage = `${ogUrl}og-image.png`

export default withPwa(defineConfig({
  lang: 'en-US',
  title: 'IAS Schule',
  description: 'Beautiful, Interactive Data Visualizations with Observable Plot & D3.js',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'author', content: 'IAS Schule' }],
    ['meta', {
      name: 'keywords',
      content: 'data visualization, Observable Plot, D3.js, charts, graphs, Vue, VitePress, bar charts, scatter plots, area charts, pie charts, diagrams',
    }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'IAS Schule - Data Visualization Library' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:description', content: 'Beautiful, Interactive Data Visualizations with Observable Plot & D3.js' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { name: 'twitter:description', content: 'Beautiful, Interactive Data Visualizations with Observable Plot & D3.js' }],
    ['meta', { name: 'twitter:title', content: 'IAS Schule' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
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
  },
  themeConfig: {
    // logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/darsheee/ias.schule/edit/main/:path',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/darsheee/ias.schule' },
    ],
    footer: {
      copyright: 'Copyright © 2021-PRESENT Ias.schule',
    },
    nav: [
      {
        text: 'Visualizations',
        link: '/guide/',
        activeMatch: '^/guide/',
      },
      {
        text: 'UPSC',
        items: [
          {
            text: 'Overview',
            link: '/upsc/',
          },
          {
            text: 'General Studies I',
            link: '/upsc/gs1/',
          },
          {
            text: 'General Studies II',
            link: '/upsc/gs2/',
          },
          {
            text: 'General Studies III',
            link: '/upsc/gs3/',
          },
          {
            text: 'General Studies IV',
            link: '/upsc/gs4/',
          },
          {
            text: 'Essay',
            link: '/upsc/essay/',
          },
          {
            text: 'Prelims',
            link: '/upsc/prelims/',
          },
        ],
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
      '/upsc/': prepareSidebar(),
    },
  },
  vite: {
    logLevel: 'info',
    plugins: [groupIconVitePlugin()],
  },
  pwa,
  transformHead,
}))
