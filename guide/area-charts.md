# Area Charts

Visualize trends over time and stacked data distributions using Observable Plot's area charts.

<script setup>
import { useStackedAreaChart, useAreaChart, areaChartColorSchemes } from '../.vitepress/theme/composables/useAreaChart'

// Sample data: Unemployment by industry (Observable Plot example)
const unemploymentData = [
  { date: '2000-01', industry: 'Agriculture', unemployed: 320 },
  { date: '2000-01', industry: 'Manufacturing', unemployed: 850 },
  { date: '2000-01', industry: 'Construction', unemployed: 450 },
  { date: '2000-01', industry: 'Services', unemployed: 1200 },
  { date: '2000-01', industry: 'Technology', unemployed: 280 },
  { date: '2001-01', industry: 'Agriculture', unemployed: 310 },
  { date: '2001-01', industry: 'Manufacturing', unemployed: 920 },
  { date: '2001-01', industry: 'Construction', unemployed: 480 },
  { date: '2001-01', industry: 'Services', unemployed: 1350 },
  { date: '2001-01', industry: 'Technology', unemployed: 350 },
  { date: '2002-01', industry: 'Agriculture', unemployed: 295 },
  { date: '2002-01', industry: 'Manufacturing', unemployed: 980 },
  { date: '2002-01', industry: 'Construction', unemployed: 520 },
  { date: '2002-01', industry: 'Services', unemployed: 1420 },
  { date: '2002-01', industry: 'Technology', unemployed: 410 },
  { date: '2003-01', industry: 'Agriculture', unemployed: 285 },
  { date: '2003-01', industry: 'Manufacturing', unemployed: 1050 },
  { date: '2003-01', industry: 'Construction', unemployed: 490 },
  { date: '2003-01', industry: 'Services', unemployed: 1480 },
  { date: '2003-01', industry: 'Technology', unemployed: 380 },
  { date: '2004-01', industry: 'Agriculture', unemployed: 270 },
  { date: '2004-01', industry: 'Manufacturing', unemployed: 950 },
  { date: '2004-01', industry: 'Construction', unemployed: 420 },
  { date: '2004-01', industry: 'Services', unemployed: 1380 },
  { date: '2004-01', industry: 'Technology', unemployed: 320 },
  { date: '2005-01', industry: 'Agriculture', unemployed: 260 },
  { date: '2005-01', industry: 'Manufacturing', unemployed: 880 },
  { date: '2005-01', industry: 'Construction', unemployed: 390 },
  { date: '2005-01', industry: 'Services', unemployed: 1300 },
  { date: '2005-01', industry: 'Technology', unemployed: 280 },
  { date: '2006-01', industry: 'Agriculture', unemployed: 250 },
  { date: '2006-01', industry: 'Manufacturing', unemployed: 820 },
  { date: '2006-01', industry: 'Construction', unemployed: 360 },
  { date: '2006-01', industry: 'Services', unemployed: 1250 },
  { date: '2006-01', industry: 'Technology', unemployed: 250 },
]

// Sample data: Revenue over time
const revenueData = [
  { month: '2024-01', revenue: 45000 },
  { month: '2024-02', revenue: 48000 },
  { month: '2024-03', revenue: 52000 },
  { month: '2024-04', revenue: 49000 },
  { month: '2024-05', revenue: 55000 },
  { month: '2024-06', revenue: 58000 },
  { month: '2024-07', revenue: 62000 },
  { month: '2024-08', revenue: 61000 },
  { month: '2024-09', revenue: 65000 },
  { month: '2024-10', revenue: 68000 },
  { month: '2024-11', revenue: 72000 },
  { month: '2024-12', revenue: 75000 },
]

// Sample data: Sales by category
const salesByCategoryData = [
  { quarter: 'Q1', category: 'Electronics', sales: 450 },
  { quarter: 'Q1', category: 'Clothing', sales: 320 },
  { quarter: 'Q1', category: 'Food', sales: 280 },
  { quarter: 'Q1', category: 'Books', sales: 180 },
  { quarter: 'Q2', category: 'Electronics', sales: 480 },
  { quarter: 'Q2', category: 'Clothing', sales: 350 },
  { quarter: 'Q2', category: 'Food', sales: 310 },
  { quarter: 'Q2', category: 'Books', sales: 190 },
  { quarter: 'Q3', category: 'Electronics', sales: 520 },
  { quarter: 'Q3', category: 'Clothing', sales: 380 },
  { quarter: 'Q3', category: 'Food', sales: 340 },
  { quarter: 'Q3', category: 'Books', sales: 210 },
  { quarter: 'Q4', category: 'Electronics', sales: 580 },
  { quarter: 'Q4', category: 'Clothing', sales: 420 },
  { quarter: 'Q4', category: 'Food', sales: 380 },
  { quarter: 'Q4', category: 'Books', sales: 240 },
]

// Create chart configurations
const unemploymentChart = useStackedAreaChart({
  data: unemploymentData,
  x: 'date',
  y: 'unemployed',
  fill: 'industry',
  title: 'Unemployment by Industry',
  xLabel: 'Date',
  yLabel: '↑ Unemployed (thousands)',
  colors: areaChartColorSchemes.categorical10,
})

const revenueChart = useAreaChart({
  data: revenueData,
  x: 'month',
  y: 'revenue',
  title: 'Monthly Revenue',
  xLabel: 'Month',
  yLabel: '↑ Revenue ($)',
  colors: ['#10b981'],
})

const salesChart = useStackedAreaChart({
  data: salesByCategoryData,
  x: 'quarter',
  y: 'sales',
  fill: 'category',
  title: 'Quarterly Sales by Category',
  xLabel: 'Quarter',
  yLabel: '↑ Sales ($K)',
  colors: areaChartColorSchemes.vibrant,
})
</script>

## Stacked Area Chart

The areaY mark implicitly stacks the areas vertically, avoiding occlusion and allowing the reader to see both the total and individual parts:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="unemploymentChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Plot Example
This chart matches the [Observable Plot stacked area chart example](https://observablehq.com/@observablehq/plot-stacked-area-chart) with automatic vertical stacking and interactive tooltips.
:::

## Simple Area Chart

Single-series area chart showing trends over time:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="revenueChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Stacked Area - Sales Data

Compare categorical data over time with stacked areas:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="salesChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Usage Examples

### Stacked Area Chart

```vue
<script setup>
import { useStackedAreaChart } from '../.vitepress/theme/composables/useAreaChart'

const data = [
  { date: '2024-01', category: 'A', value: 100 },
  { date: '2024-01', category: 'B', value: 150 },
  { date: '2024-02', category: 'A', value: 120 },
  { date: '2024-02', category: 'B', value: 180 },
  { date: '2024-03', category: 'A', value: 140 },
  { date: '2024-03', category: 'B', value: 200 },
]

const chartConfig = useStackedAreaChart({
  data,
  x: 'date',
  y: 'value',
  fill: 'category', // Stacks by this field
  xLabel: 'Date',
  yLabel: '↑ Value',
})
</script>

<template>
  <PlotChart :options="chartConfig" />
</template>
```

### Simple Area Chart

```vue
<script setup>
import { useAreaChart } from '../.vitepress/theme/composables/useAreaChart'

const data = [
  { date: '2024-01', value: 100 },
  { date: '2024-02', value: 120 },
  { date: '2024-03', value: 140 },
  { date: '2024-04', value: 130 },
]

const chartConfig = useAreaChart({
  data,
  x: 'date',
  y: 'value',
  colors: ['#10b981'],
  xLabel: 'Date',
  yLabel: '↑ Value',
})
</script>

<template>
  <PlotChart :options="chartConfig" />
</template>
```

### Custom Curves

```vue
<script setup>
import { useStackedAreaChart } from '../.vitepress/theme/composables/useAreaChart'

const chartConfig = useStackedAreaChart({
  data: myData,
  x: 'date',
  y: 'value',
  fill: 'category',
  curve: 'monotone-x', // Smooth monotone curve
})
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `Array<Object>` | Required | Data array |
| `x` | `string` | Required | X-axis field name |
| `y` | `string` | Required | Y-axis field name |
| `fill` | `string` | Optional | Field for stacking/coloring (stacked only) |
| `curve` | `string` | `'catmull-rom'` | Curve interpolation |
| `width` | `number` | `928` | Chart width in pixels |
| `height` | `number` | `500` | Chart height in pixels |
| `marginLeft` | `number` | `50` | Left margin |
| `xLabel` | `string` | Auto | X-axis label |
| `yLabel` | `string` | Auto | Y-axis label |
| `colors` | `string[]` | Default | Color array |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showTooltip` | `boolean` | `true` | Show tooltips |

## Curve Options

Available curve interpolation types:

- `'linear'` - Straight lines between points
- `'step'` - Step function
- `'step-before'` / `'step-after'` - Step variations
- `'basis'` - B-spline curve
- `'cardinal'` - Cardinal spline
- `'catmull-rom'` - Catmull-Rom spline (default, smooth)
- `'monotone-x'` / `'monotone-y'` - Monotone cubic interpolation
- `'natural'` - Natural cubic spline

## Color Schemes

```javascript
import { areaChartColorSchemes } from '../.vitepress/theme/composables/useAreaChart'

// Available schemes:
// - default, pastel, ocean, warm, cool
// - earth, vibrant, categorical10

const chart = useStackedAreaChart({
  data: myData,
  x: 'date',
  y: 'value',
  fill: 'category',
  colors: areaChartColorSchemes.ocean,
})
```

## Features

✅ **Automatic Stacking** - areaY mark stacks areas vertically  
✅ **Interactive Tooltips** - Hover to see values  
✅ **Smooth Curves** - Multiple interpolation options  
✅ **Responsive** - Adapts to container width  
✅ **Theme Support** - Works with light/dark themes  
✅ **Observable Plot** - Built on Observable Plot library  

## Best Practices

1. **Use stacked areas** for part-to-whole relationships
2. **Order categories** by importance (largest at bottom)
3. **Limit categories** to 5-7 for readability
4. **Choose smooth curves** for time series data
5. **Add tooltips** for detailed information
6. **Use contrasting colors** for better distinction

## Data Format

```typescript
interface AreaChartData {
  [key: string]: any
}

// Example for stacked area:
const data = [
  { date: '2024-01', category: 'A', value: 100 },
  { date: '2024-01', category: 'B', value: 150 },
  // ...
]

// Example for simple area:
const data = [
  { date: '2024-01', value: 100 },
  { date: '2024-02', value: 120 },
  // ...
]
```

## More Information

- [Observable Plot Documentation](https://observablehq.com/plot/)
- [Area Mark Reference](https://observablehq.com/plot/marks/area)
- [Stack Transform](https://observablehq.com/plot/transforms/stack)
