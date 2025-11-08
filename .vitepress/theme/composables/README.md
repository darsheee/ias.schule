# Chart Composables

Reusable, modular chart functions for creating data visualizations across your VitePress site.

## Available Chart Types

- **Grouped Bar Charts** - Compare values across multiple groups
- **Stacked Bar Charts** - Show total and composition
- **Faceted Charts** - Multiple small charts side-by-side
- **Gradient Bar Charts** - Bar charts with custom SVG gradient fills
- **Area Charts** - Visualize trends and stacked data over time
- **Stacked Area Charts** - Show part-to-whole relationships over time
- **Scatter Plots** - Show relationships between two variables
- **Accessible Scatter Plots** - Color + shape encoding for accessibility
- **Bubble Charts** - Scatter plots with size encoding
- **Percentogram** - Histogram binned by percentiles (Andrew Gelman)
- **Pie Charts** - Visualize proportions and parts of a whole
- **Donut Charts** - Pie charts with center space

## Quick Start

```vue
<script setup>
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const myData = [
  { region: 'North', product: 'A', sales: 100 },
  { region: 'South', product: 'A', sales: 150 },
]

const chart = useGroupedBarChart({
  data: myData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
})
</script>

<template>
  <PlotChart :options="chart" />
</template>
```

## Available Composables

### `useGroupedBarChart`

Creates a grouped bar chart with bars side-by-side.

**Best for:** Comparing values across multiple groups

```typescript
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const chart = useGroupedBarChart({
  data: salesData,
  groupBy: 'region',      // Group bars by this field
  xField: 'product',      // X-axis categories
  yField: 'sales',        // Y-axis values
  title: 'Sales by Region',
  xLabel: 'Product',
  yLabel: 'Sales ($K)',
  colors: ['#3b82f6', '#10b981', '#f59e0b'],
  grid: true,
})
```

### `useFacetedGroupedBarChart`

Creates multiple small charts (facets) side-by-side.

**Best for:** Comparing patterns across many categories

```typescript
import { useFacetedGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const chart = useFacetedGroupedBarChart({
  data: populationData,
  facetBy: 'state',       // Create separate chart for each state
  groupBy: 'state',
  xField: 'ageGroup',
  yField: 'population',
  title: 'Population by State',
})
```

### `useStackedBarChart`

Creates a stacked bar chart.

**Best for:** Showing total and composition

```typescript
import { useStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const chart = useStackedBarChart({
  data: revenueData,
  groupBy: 'department',  // Stack bars by this field
  xField: 'quarter',
  yField: 'revenue',
  title: 'Revenue by Department',
  colors: ['#6366f1', '#ec4899', '#f59e0b'],
})
```

## Configuration Options

All composables accept these options:

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `data` | `Array<Object>` | ✅ | - | Data array |
| `groupBy` | `string` | ✅ | - | Field to group by |
| `xField` | `string` | ✅ | - | X-axis field name |
| `yField` | `string` | ✅ | - | Y-axis field name |
| `colors` | `string[]` | ❌ | `['#4f46e5', ...]` | Color array |
| `title` | `string` | ❌ | - | Chart title |
| `xLabel` | `string` | ❌ | `xField` | X-axis label |
| `yLabel` | `string` | ❌ | `yField` | Y-axis label |
| `marginLeft` | `number` | ❌ | `60` | Left margin |
| `marginBottom` | `number` | ❌ | `50` | Bottom margin |
| `grid` | `boolean` | ❌ | `true` | Show grid |
| `sort` | `boolean` | ❌ | `false` | Sort by total |

Additional for `useFacetedGroupedBarChart`:
| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `facetBy` | `string` | ✅ | Field to create facets |

## Data Format

Your data should be an array of objects:

```javascript
const data = [
  { groupField: 'GroupA', category: 'Cat1', value: 100 },
  { groupField: 'GroupA', category: 'Cat2', value: 150 },
  { groupField: 'GroupB', category: 'Cat1', value: 120 },
  { groupField: 'GroupB', category: 'Cat2', value: 180 },
]
```

## Using Across Multiple Pages

### Centralized Data

Create a data file:

```typescript
// data/sales.ts
export const salesData = [
  { region: 'North', product: 'Laptops', sales: 450 },
  { region: 'South', product: 'Laptops', sales: 380 },
  // ...
]
```

Use in multiple pages:

```vue
<!-- guide/page1.md -->
<script setup>
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'
import { salesData } from '../data/sales'

const chart = useGroupedBarChart({
  data: salesData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
})
</script>

<PlotChart :options="chart" />
```

```vue
<!-- guide/page2.md -->
<script setup>
import { useStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'
import { salesData } from '../data/sales'

const chart = useStackedBarChart({
  data: salesData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
})
</script>

<PlotChart :options="chart" />
```

### Dynamic/Reactive Data

```vue
<script setup>
import { ref, computed } from 'vue'
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const rawData = ref([
  { region: 'North', product: 'A', sales: 100 },
])

// Filter or transform data
const filteredData = computed(() => 
  rawData.value.filter(d => d.sales > 50)
)

const chart = useGroupedBarChart({
  data: filteredData.value,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
})
</script>
```

### Custom Colors by Theme

```vue
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const { isDark } = useData()

const colors = computed(() => 
  isDark.value 
    ? ['#60a5fa', '#34d399', '#fbbf24'] // Light colors for dark mode
    : ['#3b82f6', '#10b981', '#f59e0b'] // Dark colors for light mode
)

const chart = useGroupedBarChart({
  data: myData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
  colors: colors.value,
})
</script>
```

## Examples

### Example 1: Sales Dashboard

```vue
<!-- sales-dashboard.md -->
<script setup>
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const salesData = [
  { region: 'North', product: 'Laptops', sales: 450 },
  { region: 'North', product: 'Phones', sales: 320 },
  { region: 'South', product: 'Laptops', sales: 380 },
  { region: 'South', product: 'Phones', sales: 420 },
]

const chart = useGroupedBarChart({
  data: salesData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
  title: 'Q4 Sales Performance',
  colors: ['#3b82f6', '#10b981'],
})
</script>

<PlotChart :options="chart" />
```

### Example 2: Marketing Report

```vue
<!-- marketing-report.md -->
<script setup>
import { useStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const campaignData = [
  { channel: 'Email', month: 'Jan', conversions: 120 },
  { channel: 'Social', month: 'Jan', conversions: 200 },
  { channel: 'Email', month: 'Feb', conversions: 150 },
  { channel: 'Social', month: 'Feb', conversions: 250 },
]

const chart = useStackedBarChart({
  data: campaignData,
  groupBy: 'channel',
  xField: 'month',
  yField: 'conversions',
  title: 'Campaign Performance',
})
</script>

<PlotChart :options="chart" />
```

### Example 3: Regional Analysis

```vue
<!-- regional-analysis.md -->
<script setup>
import { useFacetedGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const populationData = [
  { state: 'CA', ageGroup: '0-17', population: 9000 },
  { state: 'CA', ageGroup: '18-34', population: 11000 },
  { state: 'TX', ageGroup: '0-17', population: 8000 },
  { state: 'TX', ageGroup: '18-34', population: 9500 },
]

const chart = useFacetedGroupedBarChart({
  data: populationData,
  facetBy: 'state',
  groupBy: 'state',
  xField: 'ageGroup',
  yField: 'population',
  title: 'Population Distribution',
})
</script>

<PlotChart :options="chart" />
```

## Tips

### 1. Performance
- Keep datasets < 1000 rows
- Use `computed()` for reactive data
- Memoize expensive transformations

### 2. Styling
- Wrap charts in responsive containers
- Use UnoCSS classes for consistent spacing
- Match colors to your brand

### 3. Accessibility
- Always provide meaningful titles
- Use descriptive axis labels
- Ensure color contrast

### 4. Responsive Design
```vue
<div class="w-full max-w-6xl mx-auto p-6">
  <PlotChart :options="chart" />
</div>
```

## Troubleshooting

**Charts not rendering?**
- Check console for errors
- Verify data format matches expected structure
- Ensure Observable Plot is installed

**Colors not showing?**
- Check color array length matches number of groups
- Use valid hex/rgb color values
- Verify no conflicting CSS

**Performance slow?**
- Reduce data points
- Simplify chart configuration
- Use appropriate chart type for data size

## See Also

- [D3 Charts Guide](/guide/d3-charts)
- [Grouped Bar Charts Examples](/guide/grouped-bar-charts)
- [Observable Plot Documentation](https://observablehq.com/plot/)
