---
title: Getting Started | Guide
---

# Getting Started

Welcome to **IAS Schule** - a comprehensive data visualization library built with Observable Plot, D3.js, and modern web technologies. This documentation showcases a wide range of interactive, accessible, and beautiful charts for your data visualization needs.

## What is IAS Schule?

IAS Schule is a collection of reusable, modular chart components that make it easy to create stunning visualizations in your Vue.js or VitePress applications. All charts are:

- **Interactive** - Hover tooltips, responsive interactions
- **Accessible** - Color-blind friendly, screen reader support
- **Responsive** - Adapts to any screen size
- **Theme-aware** - Supports light and dark modes
- **Composable** - Easy to integrate and customize

## Available Chart Types

### Bar Charts
- **[Grouped Bar Charts](/guide/grouped-bar-charts)** - Compare values across multiple groups
- **[Stacked Bar Charts](/guide/grouped-bar-charts)** - Show total and composition
- **[Faceted Bar Charts](/guide/grouped-bar-charts)** - Multiple charts side-by-side
- **[Gradient Bar Charts](/guide/gradient-charts)** - Custom SVG gradient fills
- **[Time-Series Bars](/guide/grouped-bar-charts)** - Florence Nightingale's Crimean War example

### Distribution Charts
- **[Area Charts](/guide/area-charts)** - Visualize trends over time
- **[Stacked Area Charts](/guide/area-charts)** - Part-to-whole relationships
- **[Percentogram](/guide/percentogram)** - Histogram binned by percentiles

### Relationship Charts
- **[Scatter Plots](/guide/scatter-plots)** - Show correlations and patterns
- **[Accessible Scatter Plots](/guide/scatter-plots)** - Color + shape encoding
- **[Bubble Charts](/guide/scatter-plots)** - Size-encoded scatter plots

### Circular Charts
- **[Pie Charts](/guide/pie-charts)** - Proportions and percentages
- **[Donut Charts](/guide/pie-charts)** - Pie charts with center space

### Diagrams
- **[Mermaid Diagrams](/guide/mermaid-diagrams)** - Flowcharts, sequences, and more

## Quick Start

### Using in VitePress

All charts are built as Vue composables and components. Here's a simple example:

```vue
<script setup>
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const data = [
  { region: 'North', product: 'Laptops', sales: 450 },
  { region: 'North', product: 'Phones', sales: 320 },
  { region: 'South', product: 'Laptops', sales: 380 },
  { region: 'South', product: 'Phones', sales: 420 },
]

const chart = useGroupedBarChart({
  data,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
  title: 'Product Sales by Region',
})
</script>

<template>
  <PlotChart :options="chart" />
</template>
```

### Technologies Used

- **[Observable Plot](https://observablehq.com/plot/)** - Declarative charting library
- **[D3.js](https://d3js.org/)** - Low-level visualization primitives
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[VitePress](https://vitepress.dev/)** - Static site generator
- **[UnoCSS](https://unocss.dev/)** - Instant on-demand atomic CSS

## Features

### 🎨 Beautiful by Default
Every chart is designed with aesthetics in mind, using carefully chosen color schemes and layouts.

### ♿ Accessibility First
- Symbol + color encoding for color-blind users
- Proper ARIA labels
- Keyboard navigation support
- High contrast support

### 📱 Responsive Design
Charts automatically adapt to container size, from mobile to desktop.

### 🌙 Dark Mode Support
All visualizations seamlessly support both light and dark themes.

### ⚡ Performance Optimized
- Lazy loading
- Efficient rendering
- Tree-shakeable imports

### 🧩 Composable Architecture
Easy-to-use Vue composables make integration a breeze.

## Example Use Cases

- **Business Dashboards** - Sales, revenue, and KPI tracking
- **Scientific Research** - Data distribution and correlation analysis
- **Education** - Teaching statistics and data science
- **Analytics** - Website traffic, user behavior analysis
- **Finance** - Stock market, portfolio performance
- **Healthcare** - Patient data, treatment outcomes

## Next Steps

1. **Explore the Charts** - Browse our [chart gallery](/guide/d3-charts)
2. **Try Examples** - Each chart page includes live, editable examples
3. **Read Documentation** - Detailed configuration options for each chart type
4. **Customize** - Learn how to adapt charts to your needs

## Need Help?

- Check out specific chart documentation in the sidebar
- All charts include complete configuration tables
- Examples show common use cases and patterns

Ready to create beautiful visualizations? Start with our [Grouped Bar Charts guide](/guide/grouped-bar-charts)!
