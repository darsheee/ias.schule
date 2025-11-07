# Grouped Bar Charts

Reusable, composable grouped bar chart components for comparing multiple data series.

<script setup>
import { useGroupedBarChart, useFacetedGroupedBarChart, useStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

// Sample data: Sales by product and region
const salesByRegionData = [
  { region: 'North', product: 'Laptops', sales: 450 },
  { region: 'North', product: 'Phones', sales: 320 },
  { region: 'North', product: 'Tablets', sales: 180 },
  { region: 'South', product: 'Laptops', sales: 380 },
  { region: 'South', product: 'Phones', sales: 420 },
  { region: 'South', product: 'Tablets', sales: 210 },
  { region: 'East', product: 'Laptops', sales: 520 },
  { region: 'East', product: 'Phones', sales: 380 },
  { region: 'East', product: 'Tablets', sales: 240 },
  { region: 'West', product: 'Laptops', sales: 410 },
  { region: 'West', product: 'Phones', sales: 350 },
  { region: 'West', product: 'Tablets', sales: 190 },
]

// Sample data: Population by age group and state
const populationData = [
  { state: 'CA', ageGroup: '0-17', population: 9000 },
  { state: 'CA', ageGroup: '18-34', population: 11000 },
  { state: 'CA', ageGroup: '35-64', population: 15000 },
  { state: 'CA', ageGroup: '65+', population: 5000 },
  { state: 'TX', ageGroup: '0-17', population: 8000 },
  { state: 'TX', ageGroup: '18-34', population: 9500 },
  { state: 'TX', ageGroup: '35-64', population: 12000 },
  { state: 'TX', ageGroup: '65+', population: 3500 },
  { state: 'FL', ageGroup: '0-17', population: 4500 },
  { state: 'FL', ageGroup: '18-34', population: 6000 },
  { state: 'FL', ageGroup: '35-64', population: 8000 },
  { state: 'FL', ageGroup: '65+', population: 5500 },
  { state: 'NY', ageGroup: '0-17', population: 4000 },
  { state: 'NY', ageGroup: '18-34', population: 7000 },
  { state: 'NY', ageGroup: '35-64', population: 9000 },
  { state: 'NY', ageGroup: '65+', population: 3000 },
]

// Sample data: Revenue by quarter and department
const revenueData = [
  { quarter: 'Q1', department: 'Engineering', revenue: 250 },
  { quarter: 'Q1', department: 'Sales', revenue: 180 },
  { quarter: 'Q1', department: 'Marketing', revenue: 120 },
  { quarter: 'Q2', department: 'Engineering', revenue: 280 },
  { quarter: 'Q2', department: 'Sales', revenue: 220 },
  { quarter: 'Q2', department: 'Marketing', revenue: 140 },
  { quarter: 'Q3', department: 'Engineering', revenue: 320 },
  { quarter: 'Q3', department: 'Sales', revenue: 260 },
  { quarter: 'Q3', department: 'Marketing', revenue: 160 },
  { quarter: 'Q4', department: 'Engineering', revenue: 350 },
  { quarter: 'Q4', department: 'Sales', revenue: 300 },
  { quarter: 'Q4', department: 'Marketing', revenue: 180 },
]

// Create chart options using composables
const salesChart = useGroupedBarChart({
  data: salesByRegionData,
  groupBy: 'region',
  xField: 'product',
  yField: 'sales',
  title: 'Product Sales by Region',
  xLabel: 'Product',
  yLabel: 'Sales ($K)',
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
})

const populationFacetChart = useFacetedGroupedBarChart({
  data: populationData,
  facetBy: 'state',
  groupBy: 'state',
  xField: 'ageGroup',
  yField: 'population',
  title: 'Population by Age Group and State',
  xLabel: 'Age Group',
  yLabel: 'Population',
})

const revenueStackedChart = useStackedBarChart({
  data: revenueData,
  groupBy: 'department',
  xField: 'quarter',
  yField: 'revenue',
  title: 'Quarterly Revenue by Department (Stacked)',
  xLabel: 'Quarter',
  yLabel: 'Revenue ($K)',
  colors: ['#6366f1', '#ec4899', '#f59e0b'],
})

const revenueGroupedChart = useGroupedBarChart({
  data: revenueData,
  groupBy: 'department',
  xField: 'quarter',
  yField: 'revenue',
  title: 'Quarterly Revenue by Department (Grouped)',
  xLabel: 'Quarter',
  yLabel: 'Revenue ($K)',
  colors: ['#6366f1', '#ec4899', '#f59e0b'],
})
</script>

## Grouped Bar Chart - Basic Example

Compare product sales across different regions:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="salesChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Faceted Grouped Bar Chart

Show population distribution by age group for multiple states:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="populationFacetChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Stacked vs Grouped Comparison

### Stacked Bar Chart

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="revenueStackedChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

### Grouped Bar Chart

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="revenueGroupedChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## How to Use in Your Pages

### Basic Usage

```vue
<script setup>
import { useGroupedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const myData = [
  { category: 'A', product: 'X', value: 100 },
  { category: 'A', product: 'Y', value: 150 },
  { category: 'B', product: 'X', value: 120 },
  { category: 'B', product: 'Y', value: 180 },
]

const chartOptions = useGroupedBarChart({
  data: myData,
  groupBy: 'category',
  xField: 'product',
  yField: 'value',
  title: 'My Chart',
})
</script>

<template>
  <PlotChart :options="chartOptions" />
</template>
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `data` | `Array` | ✅ | Array of data objects |
| `groupBy` | `string` | ✅ | Field to group bars by |
| `xField` | `string` | ✅ | Field for x-axis |
| `yField` | `string` | ✅ | Field for y-axis values |
| `colors` | `string[]` | ❌ | Custom color array |
| `title` | `string` | ❌ | Chart title |
| `xLabel` | `string` | ❌ | X-axis label |
| `yLabel` | `string` | ❌ | Y-axis label |
| `grid` | `boolean` | ❌ | Show grid (default: true) |

## Available Composables

### `useGroupedBarChart`
Bars side-by-side for each group.

### `useFacetedGroupedBarChart`
Multiple small charts (facets) for each group.

### `useStackedBarChart`
Bars stacked on top of each other.
