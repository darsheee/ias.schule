---
title: Pie & Donut Charts
tags:
  - basic-pie-chart
  - donut-chart
  - donut-chart-with-padding
  - pie-chart-without-values
  - grouped-small-values
readingTime: 8 min
lastUpdated: '2025-11-09'
---
# Pie & Donut Charts

Visualize proportions and parts of a whole using D3.js-powered pie and donut charts.

<script setup>
import { usePieChart, useDonutChart, pieChartColorSchemes, groupSmallValues } from '../.vitepress/theme/composables/usePieChart'

// Sample data: Market share
const marketShareData = [
  { name: 'Chrome', value: 65 },
  { name: 'Safari', value: 19 },
  { name: 'Edge', value: 5 },
  { name: 'Firefox', value: 4 },
  { name: 'Others', value: 7 },
]

// Sample data: Revenue by product
const revenueData = [
  { name: 'Product A', value: 450000 },
  { name: 'Product B', value: 320000 },
  { name: 'Product C', value: 280000 },
  { name: 'Product D', value: 180000 },
  { name: 'Product E', value: 120000 },
]

// Sample data: Project allocation
const projectData = [
  { name: 'Development', value: 45 },
  { name: 'Design', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Support', value: 12 },
  { name: 'Operations', value: 8 },
]

// Sample data: Budget with many small items
const budgetData = [
  { name: 'Salaries', value: 500000 },
  { name: 'Marketing', value: 150000 },
  { name: 'R&D', value: 120000 },
  { name: 'Equipment', value: 80000 },
  { name: 'Travel', value: 30000 },
  { name: 'Software', value: 25000 },
  { name: 'Office Supplies', value: 15000 },
  { name: 'Utilities', value: 12000 },
  { name: 'Training', value: 8000 },
  { name: 'Misc', value: 5000 },
]

// Create chart configs
const marketShareChart = usePieChart({
  data: marketShareData,
  width: 600,
  colors: pieChartColorSchemes.vibrant,
})

const revenueDonutChart = useDonutChart({
  data: revenueData,
  width: 600,
  colors: pieChartColorSchemes.corporate,
})

const projectPieChart = usePieChart({
  data: projectData,
  width: 500,
  colors: pieChartColorSchemes.ocean,
  showValues: false,
})

// Group small values in budget data
const groupedBudgetData = groupSmallValues(budgetData, 5) // Group items < 5%

const budgetDonutChart = useDonutChart({
  data: groupedBudgetData,
  width: 600,
  colors: pieChartColorSchemes.earth,
})

// Donut with custom padding (Observable example)
const customDonutChart = useDonutChart({
  data: marketShareData,
  width: 600,
  padAngle: 0.02, // Custom padding between slices
  colors: pieChartColorSchemes.sunset,
})
</script>

## Basic Pie Chart

Browser market share distribution:

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="marketShareChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Donut Chart

Revenue distribution by product (donut chart for better center space):

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="revenueDonutChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Donut Chart with Padding

Observable-style donut chart with spacing between slices:

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="customDonutChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Example
This donut chart matches the [Observable D3 donut chart example](https://observablehq.com/@d3/donut-chart/2) with:
- **Inner radius**: 67% of outer radius
- **Pad angle**: Automatic spacing between slices (customizable)
- **Labels**: Centered on each slice
:::

## Pie Chart Without Values

Project time allocation (labels only):

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="projectPieChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Grouped Small Values

Budget breakdown with small items grouped as "Others":

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="budgetDonutChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Usage

### Basic Pie Chart

```vue
<script setup>
import { usePieChart } from '../.vitepress/theme/composables/usePieChart'

const data = [
  { name: 'Category A', value: 100 },
  { name: 'Category B', value: 200 },
  { name: 'Category C', value: 150 },
]

const chartConfig = usePieChart({
  data,
  width: 500,
})
</script>

<template>
  <PieChart v-bind="chartConfig" />
</template>
```

### Donut Chart

```vue
<script setup>
import { useDonutChart } from '../.vitepress/theme/composables/usePieChart'

const data = [
  { name: 'Category A', value: 100 },
  { name: 'Category B', value: 200 },
]

const chartConfig = useDonutChart({
  data,
  width: 500,
  padAngle: 0.02, // Optional: spacing between slices
})
</script>

<template>
  <PieChart v-bind="chartConfig" />
</template>
```

### Custom Colors

```vue
<script setup>
import { usePieChart, pieChartColorSchemes } from '../.vitepress/theme/composables/usePieChart'

const chartConfig = usePieChart({
  data: myData,
  colors: pieChartColorSchemes.sunset,
  // or custom colors array:
  // colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
})
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `Array<{name, value}>` | Required | Data array |
| `width` | `number` | `500` | Chart width in pixels |
| `height` | `number` | `min(width, 500)` | Chart height |
| `innerRadius` | `number` | `0` | Inner radius (0=pie, >0=donut) |
| `padAngle` | `number` | Auto | Spacing between slices (radians) |
| `colors` | `string[]` | `default scheme` | Color array |
| `showLabels` | `boolean` | `true` | Show category labels |
| `showValues` | `boolean` | `true` | Show values on chart |

## Data Format

```typescript
interface PieChartData {
  name: string   // Category name
  value: number  // Category value
}
```

Example:
```javascript
const data = [
  { name: 'Category A', value: 100 },
  { name: 'Category B', value: 200 },
  { name: 'Category C', value: 150 },
]
```

## Color Schemes

Pre-built color schemes available:

### Default
<div class="flex gap-2 my-4">
  <div class="w-8 h-8 rounded" style="background: #4f46e5"></div>
  <div class="w-8 h-8 rounded" style="background: #10b981"></div>
  <div class="w-8 h-8 rounded" style="background: #f59e0b"></div>
  <div class="w-8 h-8 rounded" style="background: #ef4444"></div>
  <div class="w-8 h-8 rounded" style="background: #8b5cf6"></div>
  <div class="w-8 h-8 rounded" style="background: #ec4899"></div>
</div>

### Vibrant
<div class="flex gap-2 my-4">
  <div class="w-8 h-8 rounded" style="background: #FF6B6B"></div>
  <div class="w-8 h-8 rounded" style="background: #4ECDC4"></div>
  <div class="w-8 h-8 rounded" style="background: #45B7D1"></div>
  <div class="w-8 h-8 rounded" style="background: #FFA07A"></div>
</div>

### Corporate
<div class="flex gap-2 my-4">
  <div class="w-8 h-8 rounded" style="background: #003f5c"></div>
  <div class="w-8 h-8 rounded" style="background: #665191"></div>
  <div class="w-8 h-8 rounded" style="background: #d45087"></div>
  <div class="w-8 h-8 rounded" style="background: #ffa600"></div>
</div>

### Ocean
<div class="flex gap-2 my-4">
  <div class="w-8 h-8 rounded" style="background: #006994"></div>
  <div class="w-8 h-8 rounded" style="background: #00adc1"></div>
  <div class="w-8 h-8 rounded" style="background: #4dd9dc"></div>
  <div class="w-8 h-8 rounded" style="background: #b3f0ff"></div>
</div>

Usage:
```javascript
import { pieChartColorSchemes } from '../.vitepress/theme/composables/usePieChart'

colors: pieChartColorSchemes.vibrant
colors: pieChartColorSchemes.corporate
colors: pieChartColorSchemes.ocean
colors: pieChartColorSchemes.sunset
colors: pieChartColorSchemes.forest
colors: pieChartColorSchemes.earth
colors: pieChartColorSchemes.pastel
```

## Helper Functions

### Group Small Values

Combine small slices into "Others":

```javascript
import { groupSmallValues } from '../.vitepress/theme/composables/usePieChart'

const data = [
  { name: 'Large 1', value: 500 },
  { name: 'Large 2', value: 300 },
  { name: 'Small 1', value: 20 },
  { name: 'Small 2', value: 15 },
  { name: 'Small 3', value: 10 },
]

// Group items that are less than 5% of total
const grouped = groupSmallValues(data, 5) // threshold in percentage
// Result: Small items combined into "Others"
```

### Calculate Percentages

```javascript
import { calculatePercentages } from '../.vitepress/theme/composables/usePieChart'

const withPercentages = calculatePercentages(data)
// Each item now has: { name, value, percentage }
```

### Sort Data

```javascript
import { sortPieData } from '../.vitepress/theme/composables/usePieChart'

const sorted = sortPieData(data) // descending by default
const sortedAsc = sortPieData(data, false) // ascending
```

## Pie vs Donut

### When to Use Pie Charts
- Small number of categories (3-6)
- Showing simple proportions
- Emphasizing largest/smallest values

### When to Use Donut Charts
- Need center space for title/total
- More modern appearance
- Better for labels/legends
- Multiple concentric rings (advanced)

## Responsive Design

Charts automatically scale to container width:

```vue
<div class="w-full max-w-2xl mx-auto p-4">
  <PieChart v-bind="chartConfig" />
</div>
```

Container classes:
- `max-w-sm` - Small (384px)
- `max-w-md` - Medium (448px)
- `max-w-lg` - Large (512px)
- `max-w-xl` - Extra large (576px)
- `max-w-2xl` - 2X large (672px)
- `max-w-3xl` - 3X large (768px)

## Best Practices

### 1. Limit Categories
Keep to 5-7 slices maximum for readability:
```javascript
const grouped = groupSmallValues(data, 5) // Group < 5%
```

### 2. Order Data
Sort by value for better visual hierarchy:
```javascript
const sorted = sortPieData(data) // Largest first
```

### 3. Choose Appropriate Colors
- Use distinct, contrasting colors
- Consider colorblind-friendly palettes
- Match brand colors when applicable

### 4. Labels
- Hide values if chart is too small
- Use donut for better label placement

```vue
<PieChart 
  :data="data"
  :showValues="false"  
  :width="400"
/>
```

## Advanced Examples

### Dynamic Data

```vue
<script setup>
import { ref } from 'vue'
import { usePieChart } from '../.vitepress/theme/composables/usePieChart'

const data = ref([
  { name: 'A', value: 100 },
  { name: 'B', value: 200 },
])

const chartConfig = usePieChart({ data: data.value })

function updateData() {
  data.value[0].value += 50
}
</script>
```

### Multiple Charts on Same Page

```vue
<div class="grid grid-cols-2 gap-4">
  <PieChart v-bind="chart1Config" />
  <PieChart v-bind="chart2Config" />
</div>
```

### Theme-Aware Colors

```vue
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const colors = computed(() => 
  isDark.value 
    ? pieChartColorSchemes.ocean 
    : pieChartColorSchemes.sunset
)

const chartConfig = usePieChart({
  data: myData,
  colors: colors.value,
})
</script>
```

## Troubleshooting

**Chart not showing?**
- Check data format: `[{name: string, value: number}]`
- Verify D3 is installed: `pnpm install`
- Check console for errors

**Labels overlapping?**
- Reduce number of slices with `groupSmallValues()`
- Increase chart width
- Disable values: `showValues: false`

**Colors not applying?**
- Ensure color array has enough colors for data
- Check color format (hex, rgb)
- Verify color scheme import

## See Also

- [D3 Charts](/guide/d3-charts)
- [Grouped Bar Charts](/guide/grouped-bar-charts)
- [D3.js Documentation](https://d3js.org/)
