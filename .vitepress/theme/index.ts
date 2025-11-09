import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PwaLayout from './PwaLayout.vue'
import Mermaid from './Mermaid.vue'
import MermaidDirect from './MermaidDirect.vue'
import PlotChart from './PlotChart.vue'
import PieChart from './PieChart.vue'
import SimpleChart from './components/SimpleChart.vue'
import ChartBlock from './components/ChartBlock.vue'
import Chart from './components/Chart.vue'

import './styles/main.css'
import './styles/vars.css'
import { botProtection } from './botProtection'

import 'uno.css'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(PwaLayout)
  },
  enhanceApp({ app, router }) {
    // Register Mermaid component globally
    app.component('Mermaid', Mermaid)
    // Register MermaidDirect component globally (accepts plain syntax)
    app.component('MermaidDirect', MermaidDirect)
    // Register PlotChart component globally
    app.component('PlotChart', PlotChart)
    // Register PieChart component globally
    app.component('PieChart', PieChart)
    // Register SimpleChart component (minimal syntax parser)
    app.component('SimpleChart', SimpleChart)
    // Register ChartBlock component (wrapper for simple syntax)
    app.component('ChartBlock', ChartBlock)
    // Register Chart component (data prop based)
    app.component('Chart', Chart)

    // Initialize Bot Protection & Rate Limiting
    if (typeof window !== 'undefined') {
      // Start bot protection immediately
      botProtection.init()
      
      // Detect Reader Mode attempts
      const detectReaderMode = () => {
        // Check if page is displayed in simplified/reader view
        const isReaderMode = 
          window.innerWidth < 800 && 
          !document.querySelector('.VPNav') &&
          !document.querySelector('.VPSidebar')
        
        if (isReaderMode) {
          // Redirect to normal view or show message
          window.location.reload()
        }
      }

      // Re-check bot protection and reader mode on every route change
      router.onAfterRouteChange = () => {
        botProtection.init()
        setTimeout(detectReaderMode, 100)
      }

      // Disable context menu to prevent "Open in Reader View" option
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        return false
      }, { passive: false })

      // Disable keyboard shortcuts for Reader Mode (F9 in some browsers)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F9' || (e.ctrlKey && e.shiftKey && e.key === 'R')) {
          e.preventDefault()
          return false
        }
      }, { passive: false })
    }
  },
} satisfies Theme
