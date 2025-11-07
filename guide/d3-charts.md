# D3 Charts with Observable Plot

Interactive data visualizations using Observable Plot - a concise API for exploratory data visualization.

## Features

- ✅ **Responsive**: Charts automatically adapt to container width
- ✅ **Performance Optimized**: Lazy-loaded to avoid blocking page load
- ✅ **Lightweight**: Only loads when needed
- ✅ **Zero CLS**: No layout shift during rendering

## Basic Usage

<script setup>
import { computed } from 'vue'
import * as Plot from '@observablehq/plot'

// Sample data
const salesData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
]

const stockData = [
  { date: '2024-01', value: 100 },
  { date: '2024-02', value: 120 },
  { date: '2024-03', value: 115 },
  { date: '2024-04', value: 130 },
  { date: '2024-05', value: 145 },
  { date: '2024-06', value: 140 },
  { date: '2024-07', value: 160 },
]

const distributionData = Array.from({ length: 1000 }, () => ({
  value: Math.random() * 100,
}))

// Chart options using Observable Plot API
const barChartOptions = computed(() => ({
  marks: [
    Plot.barY(salesData, {
      x: 'month',
      y: 'revenue',
      fill: '#4f46e5',
      tip: true
    })
  ],
  marginBottom: 50,
  grid: true,
  x: { label: 'Month' },
  y: { label: 'Revenue ($)' }
}))

const lineChartOptions = computed(() => ({
  marks: [
    Plot.line(stockData, {
      x: 'date',
      y: 'value',
      stroke: '#10b981',
      strokeWidth: 2,
      curve: 'catmull-rom'
    }),
    Plot.dot(stockData, {
      x: 'date',
      y: 'value',
      fill: '#10b981',
      r: 4,
      tip: true
    })
  ],
  grid: true,
  x: { label: 'Date', tickRotate: -45 },
  y: { label: 'Stock Value ($)' }
}))

const multiSeriesOptions = computed(() => ({
  marks: [
    Plot.line(salesData, {
      x: 'month',
      y: 'revenue',
      stroke: '#3b82f6',
      strokeWidth: 2
    }),
    Plot.line(salesData, {
      x: 'month',
      y: 'expenses',
      stroke: '#ef4444',
      strokeWidth: 2
    })
  ],
  grid: true,
  x: { label: 'Month' },
  y: { label: 'Amount ($)' }
}))

const histogramOptions = computed(() => ({
  marks: [
    Plot.rectY(distributionData, Plot.binX({y: 'count'}, {x: 'value', thresholds: 20, fill: '#8b5cf6', tip: true}))
  ],
  grid: true,
  x: { label: 'Value' },
  y: { label: 'Frequency' }
}))
</script>

## Bar Chart Example

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="barChartOptions"
    container-class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
  />
</div>

## Line Chart Example

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="lineChartOptions"
    container-class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
  />
</div>

## Multi-Series Chart

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="multiSeriesOptions"
    container-class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
  />
</div>

## Histogram Example

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="histogramOptions"
    container-class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
  />
</div>

## Component Props

### PlotChart

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `options` | `PlotOptions` | Yes | Observable Plot configuration object |
| `containerClass` | `string` | No | Additional CSS classes for container (UnoCSS) |

## Plot Options

Observable Plot supports a wide range of chart types and configurations. Common options include:

### Marks
- `line` - Line charts
- `barY` / `barX` - Bar charts
- `dot` - Scatter plots
- `area` - Area charts
- `rect` - Rectangles/heatmaps
- `text` - Text annotations

### Configuration
- `grid` - Show grid lines
- `x`, `y` - Axis configuration
- `color` - Color scales and legends
- `marks` - Array of mark specifications
- `marginTop`, `marginBottom`, `marginLeft`, `marginRight` - Chart margins

## Responsive Design

Charts automatically adapt to container width using UnoCSS utility classes:

```vue
<div class="w-full max-w-4xl mx-auto">
  <PlotChart :options="..." />
</div>
```

### Common UnoCSS Classes

- `w-full` - Full width
- `max-w-4xl` - Maximum width constraint
- `mx-auto` - Center horizontally
- `p-4` - Padding
- `rounded-lg` - Rounded corners
- `shadow-sm` - Subtle shadow
- `bg-white dark:bg-gray-800` - Theme-aware background

## Performance Optimization

The PlotChart component is optimized for performance:

1. **Lazy Loading**: Observable Plot is only loaded when the component is used
2. **Client-Side Only**: Charts render only in the browser (no SSR overhead)
3. **No Layout Shift**: Container has min-height to prevent CLS
4. **Efficient Re-renders**: Only re-renders when options change

## More Examples

Visit [Observable Plot Documentation](https://observablehq.com/plot/) for:
- Advanced chart types
- Custom interactions
- Data transformations
- Styling options

## Best Practices

1. **Keep data sets reasonable** - Large datasets can impact performance
2. **Use appropriate chart types** - Choose the right visualization for your data
3. **Add tooltips** - Use `tip: true` for interactivity
4. **Theme support** - Use UnoCSS dark mode classes for theme switching
5. **Responsive containers** - Always wrap charts in responsive containers
