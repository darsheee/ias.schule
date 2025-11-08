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
      { 
        text: 'Modern History', 
        link: '/upsc/gs1/modern-history/',
        collapsed: true,
        items: [
          { text: 'Complete Timeline (1599-1947)', link: '/upsc/gs1/modern-history/british-india-timeline' },
          { text: 'British Entry (1599-1765)', link: '/upsc/gs1/modern-history/british-entry' },
          { text: 'Rise of British India (1766-1818)', link: '/upsc/gs1/modern-history/rise-of-british-india' },
          { text: 'Indian Mutiny & Crown Rule (1857-1876)', link: '/upsc/gs1/modern-history/indian-mutiny-crown-rule' },
          { text: 'Imperial India (1877-1905)', link: '/upsc/gs1/modern-history/imperial-india' },
          { text: 'Reform & Reaction (1905-1920)', link: '/upsc/gs1/modern-history/reform-and-reaction' },
          { text: 'Fall of Mughals', link: '/upsc/gs1/modern-history/fall-of-mughals' },
          { text: 'Advent of Europeans', link: '/upsc/gs1/modern-history/advent-of-europeans' },
          { text: 'Company Rule', link: '/upsc/gs1/modern-history/company-rule' },
          { text: 'British Expansion', link: '/upsc/gs1/modern-history/british-expansion' },
          { text: 'Economic Policies', link: '/upsc/gs1/modern-history/economic-policies' },
          { text: 'Reform Movements', link: '/upsc/gs1/modern-history/reform-movements' },
          { text: 'National Movement (1885-1919)', link: '/upsc/gs1/modern-history/national-movement-1' },
        ]
      },
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
      { 
        text: 'Constitution', 
        link: '/upsc/gs2/constitution/',
        collapsed: true,
        items: [
          { text: 'Fundamental Rights', link: '/upsc/gs2/constitution/fundamental-rights' },
          { text: 'Directive Principles', link: '/upsc/gs2/constitution/dpsp' },
          { text: 'Fundamental Duties', link: '/upsc/gs2/constitution/fundamental-duties' },
          { text: 'Minorities & Religious Freedom', link: '/upsc/gs2/constitution/minorities' },
        ]
      },
      { 
        text: 'Polity', 
        link: '/upsc/gs2/polity/',
        collapsed: true,
        items: [
          { text: 'Parliament', link: '/upsc/gs2/polity/parliament' },
          { text: 'Federalism', link: '/upsc/gs2/polity/federalism' },
          { text: 'Local Government', link: '/upsc/gs2/polity/local-government' },
          { text: 'Citizenship', link: '/upsc/gs2/polity/citizenship' },
          { text: 'Pressure Groups & Civil Society', link: '/upsc/gs2/polity/pressure-groups' },
        ]
      },
      { 
        text: 'Judiciary', 
        link: '/upsc/gs2/judiciary/',
        collapsed: true,
        items: [
          { text: 'Supreme Court', link: '/upsc/gs2/judiciary/supreme-court' },
        ]
      },
      { 
        text: 'Constitutional Bodies', 
        link: '/upsc/gs2/bodies/',
        collapsed: true,
        items: [
          { text: 'Election Commission', link: '/upsc/gs2/bodies/election-commission' },
        ]
      },
      { 
        text: 'Governance', 
        link: '/upsc/gs2/governance/',
        collapsed: true,
        items: [
          { text: 'Digital Governance', link: '/upsc/gs2/governance/digital-governance' },
        ]
      },
      { text: 'Government Policies', link: '/upsc/gs2/policies/' },
      { text: 'Welfare Schemes', link: '/upsc/gs2/schemes/' },
      { 
        text: 'International Relations', 
        link: '/upsc/gs2/ir/',
        collapsed: true,
        items: [
          { text: 'Neighbourhood Relations', link: '/upsc/gs2/ir/neighbourhood' },
          { text: 'Regional Organizations', link: '/upsc/gs2/ir/regional-organizations' },
          { text: 'Major Bilateral Relations', link: '/upsc/gs2/ir/bilateral-relations' },
          { text: 'International Institutions', link: '/upsc/gs2/ir/international-institutions' },
        ]
      },
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
      { 
        text: 'Internal Security', 
        link: '/upsc/gs3/internal-security/',
        collapsed: true,
        items: [
          { text: 'Terrorism', link: '/upsc/gs3/internal-security/terrorism' },
          { text: 'Cyber Security', link: '/upsc/gs3/internal-security/cyber-security' },
        ]
      },
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
  description: 'Complete UPSC Civil Services Preparation Platform - GS Papers, Essay, Prelims, Current Affairs',  
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'author', content: 'IAS Schule' }],
    ['meta', {
      name: 'keywords',
      content: 'UPSC, IAS, Civil Services, GS Paper 1, GS Paper 2, GS Paper 3, GS Paper 4, Essay, Prelims, CSAT, Current Affairs, Indian Polity, History, Geography, Economy',
    }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'IAS Schule - UPSC Civil Services Preparation' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:description', content: 'Complete UPSC Civil Services Preparation Platform - GS Papers, Essay, Prelims, Current Affairs' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { name: 'twitter:description', content: 'Complete UPSC Civil Services Preparation Platform - GS Papers, Essay, Prelims, Current Affairs' }],
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
    siteTitle: 'IAS Schule',
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
        text: 'Home',
        link: '/',
      },
      {
        text: 'General Studies',
        items: [
          {
            text: 'GS Paper I',
            link: '/upsc/gs1/',
          },
          {
            text: 'GS Paper II',
            link: '/upsc/gs2/',
          },
          {
            text: 'GS Paper III',
            link: '/upsc/gs3/',
          },
          {
            text: 'GS Paper IV',
            link: '/upsc/gs4/',
          },
        ],
      },
      {
        text: 'Essay & Prelims',
        items: [
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
        text: 'About',
        link: '/upsc/',
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
