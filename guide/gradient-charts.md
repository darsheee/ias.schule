---
title: Gradient Bar Charts
tags:
  - observable-style-gradient-(purple-to-gold)
  - preset-gradients
  - custom-gradient
  - usage-examples
  - configuration-options
readingTime: 7 min
lastUpdated: '2025-11-09'
---
# Gradient Bar Charts

Create visually striking bar charts with custom SVG gradient fills using Observable Plot's custom mark functions.

<script setup>
import { useGradientBarChart, useMultiGradientBarChart, gradientPresets, createGradient } from '../.vitepress/theme/composables/useGradientBarChart'

// Sample data: Letter frequency (Observable example)
const alphabetData = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.02360 },
  { letter: 'X', frequency: 0.00150 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
]

// Sample data: Monthly sales
const salesData = [
  { month: 'Jan', sales: 4500 },
  { month: 'Feb', sales: 5200 },
  { month: 'Mar', sales: 6100 },
  { month: 'Apr', sales: 5800 },
  { month: 'May', sales: 7200 },
  { month: 'Jun', sales: 8100 },
]

// Sample data: Product performance
const productData = [
  { product: 'Premium', score: 95, category: 'A' },
  { product: 'Standard', score: 78, category: 'B' },
  { product: 'Basic', score: 62, category: 'C' },
  { product: 'Enterprise', score: 88, category: 'A' },
]

// Create chart configurations
const purpleGradientChart = useGradientBarChart({
  data: alphabetData,
  x: 'letter',
  y: 'frequency',
  gradient: gradientPresets.purple,
  title: 'Letter Frequency in English',
  yLabel: 'Frequency',
  sort: true,
})

const sunsetChart = useGradientBarChart({
  data: salesData,
  x: 'month',
  y: 'sales',
  gradient: gradientPresets.sunset,
  title: 'Monthly Sales',
  yLabel: 'Sales ($)',
})

const oceanChart = useGradientBarChart({
  data: salesData,
  x: 'month',
  y: 'sales',
  gradient: gradientPresets.ocean,
  title: 'Sales with Ocean Gradient',
  yLabel: 'Sales ($)',
})

const rainbowChart = useGradientBarChart({
  data: alphabetData.slice(0, 10),
  x: 'letter',
  y: 'frequency',
  gradient: gradientPresets.rainbow,
  title: 'Rainbow Gradient',
  yLabel: 'Frequency',
})

// Custom gradient
const customGradient = createGradient(
  'custom-blue-pink',
  ['#667eea', '#f093fb', '#764ba2'],
  { rotation: 90 }
)

const customChart = useGradientBarChart({
  data: salesData,
  x: 'month',
  y: 'sales',
  gradient: customGradient,
  title: 'Custom Blue-Pink Gradient',
  yLabel: 'Sales ($)',
})
</script>

## Observable-Style Gradient (Purple to Gold)

Classic gradient bars matching the Observable Plot example:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="purpleGradientChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Plot Example
This matches the [Observable Plot gradient bars example](https://observablehq.com/@observablehq/plot-gradient-bars). The gradient goes from purple at the bottom, through red in the middle, to gold at the top - creating a striking visual effect for letter frequency data.
:::

## Preset Gradients

### Sunset Gradient

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="sunsetChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

### Ocean Gradient

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="oceanChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

### Rainbow Gradient

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="rainbowChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Custom Gradient

Create your own gradient with any colors:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="customChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Usage Examples

### Basic Gradient Chart

```vue
<script setup>
import { useGradientBarChart, gradientPresets } from '../.vitepress/theme/composables/useGradientBarChart'

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 150 },
  { category: 'C', value: 120 },
]

const chart = useGradientBarChart({
  data,
  x: 'category',
  y: 'value',
  gradient: gradientPresets.sunset,
  title: 'My Gradient Chart',
})
</script>

<template>
  <PlotChart :options="chart" />
</template>
```

### Custom Gradient

```vue
<script setup>
import { useGradientBarChart, createGradient } from '../.vitepress/theme/composables/useGradientBarChart'

// Create a custom gradient
const myGradient = createGradient(
  'my-gradient-id',
  ['#ff6b6b', '#feca57', '#48dbfb'], // Array of colors
  { rotation: 90 } // Optional: rotation in degrees
)

const chart = useGradientBarChart({
  data: myData,
  x: 'category',
  y: 'value',
  gradient: myGradient,
})
</script>
```

### Manual Gradient Configuration

```vue
<script setup>
import { useGradientBarChart } from '../.vitepress/theme/composables/useGradientBarChart'

const chart = useGradientBarChart({
  data: myData,
  x: 'category',
  y: 'value',
  gradient: {
    id: 'custom-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#667eea' },
      { offset: '50%', color: '#764ba2' },
      { offset: '100%', color: '#f093fb' },
    ],
  },
})
</script>
```

### Radial Gradient

```vue
<script setup>
import { useGradientBarChart } from '../.vitepress/theme/composables/useGradientBarChart'

const chart = useGradientBarChart({
  data: myData,
  x: 'category',
  y: 'value',
  gradient: {
    id: 'radial-gradient',
    type: 'radial', // Radial instead of linear
    stops: [
      { offset: '0%', color: '#feca57' },
      { offset: '100%', color: '#ff6b6b' },
    ],
  },
})
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `Array` | Required | Data array |
| `x` | `string` | Required | X-axis field |
| `y` | `string` | Required | Y-axis field |
| `gradient` | `GradientConfig` | Required | Gradient configuration |
| `width` | `number` | `640` | Chart width |
| `height` | `number` | `400` | Chart height |
| `title` | `string` | Optional | Chart title |
| `xLabel` | `string` | Auto | X-axis label |
| `yLabel` | `string` | Auto | Y-axis label |
| `showGrid` | `boolean` | `true` | Show grid |
| `sort` | `boolean` | `false` | Sort bars by value |

## Gradient Configuration

```typescript
interface GradientConfig {
  id: string                    // Unique ID for gradient
  type?: 'linear' | 'radial'   // Gradient type
  rotation?: number             // Rotation in degrees (linear only)
  stops: Array<{
    offset: string              // e.g., "0%", "50%", "100%"
    color: string               // Any CSS color
  }>
}
```

## Preset Gradients

```javascript
import { gradientPresets } from '../.vitepress/theme/composables/useGradientBarChart'

// Available presets:
gradientPresets.purple   // Purple → Red → Gold (Observable example)
gradientPresets.sunset   // Red → Yellow → Pink
gradientPresets.ocean    // Blue → Purple
gradientPresets.forest   // Green → Light green
gradientPresets.fire     // Red → Orange → Yellow
gradientPresets.rainbow  // Full spectrum
gradientPresets.cool     // Blue → Cyan
gradientPresets.warm     // Pink → Coral

// Radial gradients:
gradientPresets.radialSunset
gradientPresets.radialOcean
```

## Creating Custom Gradients

### Simple 2-Color Gradient

```javascript
import { createGradient } from '../.vitepress/theme/composables/useGradientBarChart'

const gradient = createGradient(
  'my-gradient',
  ['#667eea', '#764ba2']
)
```

### Multi-Color Gradient

```javascript
const gradient = createGradient(
  'rainbow',
  ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
)
```

### With Rotation

```javascript
const gradient = createGradient(
  'diagonal',
  ['#667eea', '#764ba2'],
  { rotation: 45 } // 45-degree diagonal
)
```

### Radial Gradient

```javascript
const gradient = createGradient(
  'radial-burst',
  ['#feca57', '#ff6b6b'],
  { type: 'radial' }
)
```

## How It Works

Gradient bars use Observable Plot's custom mark functions to inject SVG gradient definitions:

```javascript
// Observable Plot generates this SVG structure:
<svg>
  <defs>
    <linearGradient id="my-gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="purple" />
      <stop offset="50%" stop-color="red" />
      <stop offset="100%" stop-color="gold" />
    </linearGradient>
  </defs>
  <rect fill="url(#my-gradient)" ... />
</svg>
```

The `useGradientBarChart` composable:
1. Creates an SVG `<defs>` element with gradient definition
2. Returns a custom mark function that Plot renders
3. References the gradient using `fill: "url(#gradient-id)"`

## Best Practices

1. **Use meaningful gradients** - Choose colors that enhance data meaning
2. **Avoid too many stops** - 2-4 color stops work best
3. **Consider accessibility** - Gradients should have sufficient contrast
4. **Unique IDs** - Each gradient needs a unique ID if using multiple
5. **Rotation** - Use 90° for vertical bars (bottom-to-top gradient)
6. **Test themes** - Ensure gradients work in both light and dark modes

## Common Gradient Directions

```javascript
// Vertical (bottom to top) - Most common for bars
{ rotation: 90 }

// Horizontal (left to right)
{ rotation: 0 }

// Diagonal
{ rotation: 45 }

// Reverse vertical (top to bottom)
{ rotation: 270 }
```

## Features

✅ **Custom SVG Gradients** - Full control over gradient appearance  
✅ **Preset Gradients** - Ready-to-use beautiful gradients  
✅ **Linear & Radial** - Support for both gradient types  
✅ **Multi-Stop Gradients** - Unlimited color stops  
✅ **Easy Creation** - Helper function for quick gradients  
✅ **Observable Plot** - Uses Plot's custom mark system  

## Data Format

```typescript
interface ChartData {
  [key: string]: any
}

// Example:
const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 150 },
  { category: 'C', value: 120 },
]
```

## More Information

- [Observable Plot Gradient Bars](https://observablehq.com/@observablehq/plot-gradient-bars)
- [SVG Gradients (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)
- [Custom Marks in Plot](https://observablehq.com/plot/features/marks)
