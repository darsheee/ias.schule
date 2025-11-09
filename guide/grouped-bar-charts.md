---
title: Grouped Bar Charts
tags:
  - grouped-bar-chart---basic-example
  - faceted-grouped-bar-chart
  - observable-style-faceted-chart-(sorted)
  - 'historical-example:-crimean-war-casualties'
  - stacked-vs-grouped-comparison
readingTime: 10 min
lastUpdated: '2025-11-09'
---
# Grouped Bar Charts

Reusable, composable grouped bar chart components for comparing multiple data series.

<script setup>
import { useGroupedBarChart, useFacetedGroupedBarChart, useFacetedBarChart, useStackedBarChart, useTimeSeriesStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

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

// Sample data: Crimean War casualties (Florence Nightingale's data)
const crimeaData = [
  { date: new Date('1854-04-01'), cause: 'Disease', deaths: 1 },
  { date: new Date('1854-04-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-04-01'), cause: 'Other', deaths: 5 },
  { date: new Date('1854-05-01'), cause: 'Disease', deaths: 12 },
  { date: new Date('1854-05-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-05-01'), cause: 'Other', deaths: 9 },
  { date: new Date('1854-06-01'), cause: 'Disease', deaths: 11 },
  { date: new Date('1854-06-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-06-01'), cause: 'Other', deaths: 6 },
  { date: new Date('1854-07-01'), cause: 'Disease', deaths: 359 },
  { date: new Date('1854-07-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-07-01'), cause: 'Other', deaths: 23 },
  { date: new Date('1854-08-01'), cause: 'Disease', deaths: 828 },
  { date: new Date('1854-08-01'), cause: 'Wounds', deaths: 1 },
  { date: new Date('1854-08-01'), cause: 'Other', deaths: 30 },
  { date: new Date('1854-09-01'), cause: 'Disease', deaths: 788 },
  { date: new Date('1854-09-01'), cause: 'Wounds', deaths: 81 },
  { date: new Date('1854-09-01'), cause: 'Other', deaths: 70 },
  { date: new Date('1854-10-01'), cause: 'Disease', deaths: 503 },
  { date: new Date('1854-10-01'), cause: 'Wounds', deaths: 132 },
  { date: new Date('1854-10-01'), cause: 'Other', deaths: 128 },
  { date: new Date('1854-11-01'), cause: 'Disease', deaths: 844 },
  { date: new Date('1854-11-01'), cause: 'Wounds', deaths: 287 },
  { date: new Date('1854-11-01'), cause: 'Other', deaths: 106 },
  { date: new Date('1854-12-01'), cause: 'Disease', deaths: 1725 },
  { date: new Date('1854-12-01'), cause: 'Wounds', deaths: 114 },
  { date: new Date('1854-12-01'), cause: 'Other', deaths: 131 },
  { date: new Date('1855-01-01'), cause: 'Disease', deaths: 2761 },
  { date: new Date('1855-01-01'), cause: 'Wounds', deaths: 83 },
  { date: new Date('1855-01-01'), cause: 'Other', deaths: 324 },
  { date: new Date('1855-02-01'), cause: 'Disease', deaths: 2120 },
  { date: new Date('1855-02-01'), cause: 'Wounds', deaths: 42 },
  { date: new Date('1855-02-01'), cause: 'Other', deaths: 361 },
  { date: new Date('1855-03-01'), cause: 'Disease', deaths: 1205 },
  { date: new Date('1855-03-01'), cause: 'Wounds', deaths: 32 },
  { date: new Date('1855-03-01'), cause: 'Other', deaths: 172 },
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

// Observable-style faceted bar chart (sorted by total population)
const populationFacetedChart = useFacetedBarChart({
  data: populationData,
  facetBy: 'state',
  xField: 'ageGroup',
  yField: 'population',
  title: 'Population by State and Age (Sorted by Total)',
  yLabel: 'Population',
  colorScheme: 'spectral',
  sortFacets: true,
  hideXAxis: false,
})

// Crimean War casualties chart (Florence Nightingale's data)
const crimeaChart = useTimeSeriesStackedBarChart({
  data: crimeaData,
  dateField: 'date',
  categoryField: 'cause',
  yField: 'deaths',
  interval: 'month',
  title: 'Crimean War Casualties by Cause',
  yLabel: 'Deaths',
  hideXLabel: true,
  colors: ['#dc2626', '#f59e0b', '#64748b'], // Red for Disease, Orange for Wounds, Gray for Other
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

## Observable-Style Faceted Chart (Sorted)

Facets sorted by total population, with spectral color scheme and SI notation:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="populationFacetedChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Plot Example
This matches the [Observable Plot grouped bar chart example](https://observablehq.com/@observablehq/plot-grouped-bar-chart). Features:
- **Facets sorted by sum** - States ordered by total population
- **Color encoding** - Age groups colored using spectral scheme
- **SI notation** - Y-axis values formatted as 1k, 10k, etc.
- **Color legend** - Shows age group categories
:::

## Historical Example: Crimean War Casualties

Florence Nightingale's famous data visualization showing deaths predominantly from disease:

<div class="w-full max-w-6xl mx-auto my-8">
  <PlotChart 
    :options="crimeaChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Florence Nightingale's Data
This matches the [Observable Plot Crimean War example](https://observablehq.com/@observablehq/plot-crimean-war-bary). Features:
- **Time-series stacked bars** - Monthly data from 1854-1855
- **Interval scale** - X-axis quantized by month
- **Custom tick format** - Shows month abbreviations (J, F, M, etc.)
- **Historical insight** - Reveals disease (red) caused far more deaths than wounds (orange)

Florence Nightingale used this data to advocate for improved sanitary conditions in military hospitals.
:::

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

### Observable-Style Faceted Chart

```vue
<script setup>
import { useFacetedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const populationData = [
  { state: 'CA', age: '0-17', population: 9000 },
  { state: 'CA', age: '18-34', population: 11000 },
  { state: 'TX', age: '0-17', population: 8000 },
  { state: 'TX', age: '18-34', population: 9500 },
  // ...
]

const chartOptions = useFacetedBarChart({
  data: populationData,
  facetBy: 'state',        // Create a facet for each state
  xField: 'age',           // X-axis within each facet
  yField: 'population',    // Y-axis values
  colorScheme: 'spectral', // Observable color scheme
  sortFacets: true,        // Sort facets by total population
  yLabel: 'Population',
})
</script>

<template>
  <PlotChart :options="chartOptions" />
</template>
```

### Time-Series Stacked Bar Chart

```vue
<script setup>
import { useTimeSeriesStackedBarChart } from '../.vitepress/theme/composables/useGroupedBarChart'

const monthlyCasualties = [
  { date: new Date('1854-04-01'), cause: 'Disease', deaths: 1 },
  { date: new Date('1854-04-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-04-01'), cause: 'Other', deaths: 5 },
  { date: new Date('1854-05-01'), cause: 'Disease', deaths: 12 },
  { date: new Date('1854-05-01'), cause: 'Wounds', deaths: 0 },
  { date: new Date('1854-05-01'), cause: 'Other', deaths: 9 },
  // ...
]

const chartOptions = useTimeSeriesStackedBarChart({
  data: monthlyCasualties,
  dateField: 'date',         // Field containing Date objects
  categoryField: 'cause',    // Field to stack by
  yField: 'deaths',          // Y-axis values
  interval: 'month',         // Quantize by month
  title: 'Monthly Casualties',
  yLabel: 'Deaths',
  hideXLabel: true,          // Hide x-axis label
  colors: ['#dc2626', '#f59e0b', '#64748b'],
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

### `useFacetedBarChart` (Observable-style)
Faceted bar charts with:
- Bars colored by x-field category
- Facets sorted by sum of values
- SI notation for y-axis (1k, 10k, etc.)
- Observable Plot color schemes
- Optional hidden x-axis

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `facetBy` | `string` | Required | Field to facet by |
| `xField` | `string` | Required | X-axis field |
| `yField` | `string` | Required | Y-axis field |
| `colorScheme` | `string` | `'spectral'` | Observable color scheme |
| `sortFacets` | `boolean` | `true` | Sort facets by sum |
| `hideXAxis` | `boolean` | `false` | Hide x-axis labels |
| `colors` | `string[]` | Optional | Override color scheme |

### `useStackedBarChart`
Bars stacked on top of each other.

### `useTimeSeriesStackedBarChart`
Time-series stacked bar charts with interval scale support. Perfect for monthly/yearly data like Florence Nightingale's Crimean War casualties.

**Features:**
- Date-based x-axis with interval quantization
- Custom tick formatting (e.g., month abbreviations)
- Automatic stacking by category
- Optional hidden x-axis label

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dateField` | `string` | Required | Field containing Date objects |
| `categoryField` | `string` | Required | Field to stack by |
| `yField` | `string` | Required | Y-axis values |
| `interval` | `string` | `'month'` | Time interval: day, week, month, quarter, year |
| `tickFormat` | `function` | Month abbreviation | Custom tick formatter |
| `hideXLabel` | `boolean` | `false` | Hide x-axis label |
| `colors` | `string[]` | Default | Color array |

**Example intervals:**
- `'day'` - Daily data
- `'week'` - Weekly aggregation
- `'month'` - Monthly data (default)
- `'quarter'` - Quarterly data
- `'year'` - Yearly data
