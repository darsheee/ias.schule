import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PwaLayout from './PwaLayout.vue'
import Mermaid from './Mermaid.vue'
import PlotChart from './PlotChart.vue'
import PieChart from './PieChart.vue'

import './styles/main.css'
import './styles/vars.css'

import 'uno.css'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(PwaLayout)
  },
  enhanceApp({ app }) {
    // Register Mermaid component globally
    app.component('Mermaid', Mermaid)
    // Register PlotChart component globally
    app.component('PlotChart', PlotChart)
    // Register PieChart component globally
    app.component('PieChart', PieChart)
  },
} satisfies Theme
