---
title: Scatter Plots with Symbol Channel
tags:
  - accessible-scatter-plot-(symbol-+-color)
  - why-redundant-encoding-matters
  - product-performance-scatter-plot
  - bubble-chart-(sized-dots)
  - usage-examples
readingTime: 9 min
lastUpdated: '2025-11-09'
---
# Scatter Plots with Symbol Channel

Create accessible scatter plots using both color and shape encoding for better readability, especially for readers with color vision deficiency.

<script setup>
import { useScatterPlot, useAccessibleScatterPlot, useBubbleChart, scatterPlotColorSchemes, symbolSets } from '../.vitepress/theme/composables/useScatterPlot'

// Sample data: Palmer Penguins (similar to Observable example)
const penguinsData = [
  { species: 'Adelie', body_mass_g: 3750, flipper_length_mm: 181, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3800, flipper_length_mm: 186, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3250, flipper_length_mm: 195, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3450, flipper_length_mm: 193, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3650, flipper_length_mm: 190, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3625, flipper_length_mm: 181, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 4675, flipper_length_mm: 195, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3475, flipper_length_mm: 182, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 4250, flipper_length_mm: 191, island: 'Torgersen' },
  { species: 'Adelie', body_mass_g: 3300, flipper_length_mm: 195, island: 'Torgersen' },
  { species: 'Gentoo', body_mass_g: 4750, flipper_length_mm: 217, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5700, flipper_length_mm: 222, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5400, flipper_length_mm: 218, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 4500, flipper_length_mm: 219, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5700, flipper_length_mm: 230, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5500, flipper_length_mm: 221, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5000, flipper_length_mm: 209, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 4400, flipper_length_mm: 210, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5050, flipper_length_mm: 216, island: 'Biscoe' },
  { species: 'Gentoo', body_mass_g: 5000, flipper_length_mm: 215, island: 'Biscoe' },
  { species: 'Chinstrap', body_mass_g: 3500, flipper_length_mm: 196, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3900, flipper_length_mm: 196, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3650, flipper_length_mm: 178, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3525, flipper_length_mm: 197, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3725, flipper_length_mm: 195, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3950, flipper_length_mm: 201, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3250, flipper_length_mm: 184, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3750, flipper_length_mm: 188, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 4150, flipper_length_mm: 199, island: 'Dream' },
  { species: 'Chinstrap', body_mass_g: 3700, flipper_length_mm: 192, island: 'Dream' },
]

// Sample data: Product performance
const productData = [
  { product: 'A', price: 29.99, sales: 450, category: 'Electronics' },
  { product: 'B', price: 39.99, sales: 320, category: 'Electronics' },
  { product: 'C', price: 19.99, sales: 580, category: 'Electronics' },
  { product: 'D', price: 49.99, sales: 280, category: 'Clothing' },
  { product: 'E', price: 24.99, sales: 420, category: 'Clothing' },
  { product: 'F', price: 34.99, sales: 350, category: 'Clothing' },
  { product: 'G', price: 14.99, sales: 620, category: 'Books' },
  { product: 'H', price: 22.99, sales: 480, category: 'Books' },
  { product: 'I', price: 27.99, sales: 390, category: 'Books' },
]

// Sample data: Customer segments (for bubble chart)
const customerData = [
  { segment: 'Enterprise', satisfaction: 8.5, retention: 92, revenue: 450000 },
  { segment: 'Enterprise', satisfaction: 8.2, retention: 89, revenue: 380000 },
  { segment: 'Enterprise', satisfaction: 9.1, retention: 95, revenue: 520000 },
  { segment: 'SMB', satisfaction: 7.8, retention: 82, revenue: 125000 },
  { segment: 'SMB', satisfaction: 8.0, retention: 85, revenue: 145000 },
  { segment: 'SMB', satisfaction: 7.5, retention: 79, revenue: 98000 },
  { segment: 'Startup', satisfaction: 8.8, retention: 88, revenue: 65000 },
  { segment: 'Startup', satisfaction: 8.3, retention: 84, revenue: 58000 },
  { segment: 'Startup', satisfaction: 9.0, retention: 91, revenue: 72000 },
]

// Create chart configurations
const penguinsChart = useAccessibleScatterPlot({
  data: penguinsData,
  x: 'body_mass_g',
  y: 'flipper_length_mm',
  category: 'species',
  title: 'Palmer Penguins: Body Mass vs Flipper Length',
  xLabel: 'Body mass (g) →',
  yLabel: '↑ Flipper length (mm)',
  colors: scatterPlotColorSchemes.default,
  symbols: symbolSets.set3,
})

const productChart = useScatterPlot({
  data: productData,
  x: 'price',
  y: 'sales',
  stroke: 'category',
  symbol: 'category',
  title: 'Product Performance',
  xLabel: 'Price ($) →',
  yLabel: '↑ Sales (units)',
  colors: scatterPlotColorSchemes.vibrant,
})

const colorOnlyChart = useScatterPlot({
  data: penguinsData,
  x: 'body_mass_g',
  y: 'flipper_length_mm',
  stroke: 'species',
  title: 'Color Only (Less Accessible)',
  xLabel: 'Body mass (g) →',
  yLabel: '↑ Flipper length (mm)',
})

const bubbleChart = useBubbleChart({
  data: customerData,
  x: 'satisfaction',
  y: 'retention',
  size: 'revenue',
  stroke: 'segment',
  symbol: 'segment',
  title: 'Customer Segments Analysis',
  xLabel: 'Satisfaction Score →',
  yLabel: '↑ Retention Rate (%)',
  colors: scatterPlotColorSchemes.cool,
})
</script>

## Accessible Scatter Plot (Symbol + Color)

The symbol channel combined with color encoding makes charts accessible for readers with color vision deficiency:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="penguinsChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Plot Example
This matches the [Observable Plot symbol channel example](https://observablehq.com/@observablehq/plot-symbol-channel). Each species is encoded with **both a unique color and shape**, making it accessible even without color perception.
:::

## Why Redundant Encoding Matters

### Comparison: Color Only vs Color + Shape

**Color Only (Less Accessible):**

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="colorOnlyChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: warning Accessibility Issue
Relying on color alone makes it difficult for readers with color vision deficiency to distinguish between categories. About 8% of men and 0.5% of women have some form of color blindness.
:::

## Product Performance Scatter Plot

Price vs sales with category encoding:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="productChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Bubble Chart (Sized Dots)

Customer segment analysis with revenue encoded as bubble size:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="bubbleChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Usage Examples

### Accessible Scatter Plot

```vue
<script setup>
import { useAccessibleScatterPlot } from '../.vitepress/theme/composables/useScatterPlot'

const data = [
  { species: 'Adelie', body_mass_g: 3750, flipper_length_mm: 181 },
  { species: 'Gentoo', body_mass_g: 4750, flipper_length_mm: 217 },
  { species: 'Chinstrap', body_mass_g: 3500, flipper_length_mm: 196 },
  // ...
]

const chart = useAccessibleScatterPlot({
  data,
  x: 'body_mass_g',
  y: 'flipper_length_mm',
  category: 'species', // Encoded as BOTH color and shape
  xLabel: 'Body mass (g) →',
  yLabel: '↑ Flipper length (mm)',
})
</script>

<template>
  <PlotChart :options="chart" />
</template>
```

### Manual Symbol Configuration

```vue
<script setup>
import { useScatterPlot, symbolSets } from '../.vitepress/theme/composables/useScatterPlot'

const chart = useScatterPlot({
  data: myData,
  x: 'xField',
  y: 'yField',
  stroke: 'category', // Color encoding
  symbol: 'category', // Shape encoding
  symbols: symbolSets.set5, // 5 different shapes
})
</script>
```

### Bubble Chart

```vue
<script setup>
import { useBubbleChart } from '../.vitepress/theme/composables/useScatterPlot'

const chart = useBubbleChart({
  data: customerData,
  x: 'satisfaction',
  y: 'retention',
  size: 'revenue', // Bubble size
  stroke: 'segment',
  symbol: 'segment',
})
</script>
```

### Color Only (Not Recommended)

```vue
<script setup>
import { useScatterPlot } from '../.vitepress/theme/composables/useScatterPlot'

const chart = useScatterPlot({
  data: myData,
  x: 'xField',
  y: 'yField',
  stroke: 'category', // Color only - less accessible
})
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `Array` | Required | Data array |
| `x` | `string` | Required | X-axis field name |
| `y` | `string` | Required | Y-axis field name |
| `stroke` | `string` | Optional | Color encoding field |
| `symbol` | `string` | Optional | Shape encoding field |
| `fill` | `string` | Optional | Fill color field |
| `r` | `string\|number` | `3` | Radius or size field |
| `width` | `number` | `640` | Chart width |
| `height` | `number` | `400` | Chart height |
| `xLabel` | `string` | Auto | X-axis label |
| `yLabel` | `string` | Auto | Y-axis label |
| `colors` | `string[]` | Default | Color scheme |
| `symbols` | `string[]` | Default | Symbol shapes |
| `showGrid` | `boolean` | `true` | Show grid |
| `showTooltip` | `boolean` | `true` | Interactive tooltips |
| `showLegend` | `boolean` | `true` | Show legend |

## Available Symbols

```javascript
import { plotSymbols } from '../.vitepress/theme/composables/useScatterPlot'

// Basic shapes
plotSymbols.circle      // ●
plotSymbols.square      // ■
plotSymbols.triangle    // ▲
plotSymbols.diamond     // ◆
plotSymbols.star        // ★
plotSymbols.cross       // ✕
plotSymbols.wye         // Y

// Filled variants
plotSymbols.circleFill
plotSymbols.squareFill
// ... etc
```

## Symbol Sets

Pre-configured sets for different numbers of categories:

```javascript
import { symbolSets } from '../.vitepress/theme/composables/useScatterPlot'

symbolSets.set3    // ['circle', 'square', 'triangle']
symbolSets.set5    // 5 most distinct shapes
symbolSets.set7    // Extended set for 7+ categories

// Filled variants for better visibility
symbolSets.filled3
symbolSets.filled5
```

## Color Schemes

```javascript
import { scatterPlotColorSchemes } from '../.vitepress/theme/composables/useScatterPlot'

// Available:
// - default (Observable Plot colors)
// - categorical (D3 Category10)
// - vibrant, pastel, earth
// - ocean, warm, cool

const chart = useScatterPlot({
  data: myData,
  x: 'x',
  y: 'y',
  stroke: 'category',
  colors: scatterPlotColorSchemes.ocean,
})
```

## Accessibility Best Practices

1. ✅ **Use redundant encoding** - Same field for both `stroke` and `symbol`
2. ✅ **Add tooltips** - Enable `showTooltip: true`
3. ✅ **Use distinct shapes** - Choose shapes that are clearly different
4. ✅ **Limit categories** - 3-7 categories work best
5. ✅ **Test with simulators** - Check with color blindness simulators
6. ⚠️ **Avoid color-only** - Never rely solely on color for critical information

## Symbol Legend

When using both color and symbol encoding on the same field, Observable Plot automatically creates a combined legend showing both color and shape:

```javascript
const chart = useAccessibleScatterPlot({
  data: penguins,
  x: 'body_mass_g',
  y: 'flipper_length_mm',
  category: 'species', // Legend shows colored shapes
})
```

## Features

✅ **Redundant Encoding** - Color + shape for accessibility  
✅ **Symbol Legend** - Combined color and shape legend  
✅ **Interactive Tooltips** - Hover to see values  
✅ **Multiple Shapes** - 7+ distinct symbol types  
✅ **Bubble Charts** - Size-encoded scatter plots  
✅ **Responsive** - Adapts to container  
✅ **Theme Support** - Light/dark mode compatible  

## Data Format

```typescript
interface ScatterPlotData {
  [key: string]: any
}

// Example:
const data = [
  { category: 'A', x: 10, y: 20 },
  { category: 'B', x: 15, y: 25 },
  // ...
]
```

## More Information

- [Observable Plot Symbol Channel](https://observablehq.com/@observablehq/plot-symbol-channel)
- [Dot Mark Documentation](https://observablehq.com/plot/marks/dot)
- [Accessibility Guidelines](https://observablehq.com/plot/features/accessibility)
- [Color Vision Deficiency](https://www.color-blindness.com/)
