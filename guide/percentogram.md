---
title: Percentogram
tags:
  - what-is-a-percentogram?
  - why-use-a-percentogram?
  - custom-percentile-divisions
  - usage-examples
  - configuration-options
readingTime: 8 min
lastUpdated: '2025-11-09'
---
# Percentogram

A histogram binned by percentages of the cumulative distribution, rather than using fixed bin widths. This technique, referenced by Andrew Gelman, provides equal representation across the data's distribution.

<script setup>
import { usePercentogram, useCustomPercentogram, percentilePresets, percentogramColorSchemes, generateNormalDistribution, generateLogNormalDistribution } from '../.vitepress/theme/composables/usePercentogram'

// Generate sample data: Normal distribution
const normalData = generateNormalDistribution(1000, 50, 15)

// Generate sample data: Log-normal distribution (skewed)
const logNormalData = generateLogNormalDistribution(1000, 3, 0.5)

// Generate sample data: Bimodal distribution
const bimodalData = [
  ...generateNormalDistribution(500, 30, 5),
  ...generateNormalDistribution(500, 70, 5),
]

// Create chart configurations
const normalPercentogram = usePercentogram({
  data: normalData,
  bins: 10,
  title: 'Normal Distribution (Deciles)',
  xLabel: 'Value',
  colorScheme: 'spectral',
})

const logNormalPercentogram = usePercentogram({
  data: logNormalData,
  bins: 10,
  title: 'Log-Normal Distribution (Deciles)',
  xLabel: 'Value',
  colorScheme: 'rdylbu',
})

const bimodalPercentogram = usePercentogram({
  data: bimodalData,
  bins: 10,
  title: 'Bimodal Distribution (Deciles)',
  xLabel: 'Value',
  colorScheme: 'spectral',
})

// Quartiles example
const quartilesChart = useCustomPercentogram({
  data: normalData,
  percentiles: percentilePresets.quartiles,
  title: 'Normal Distribution (Quartiles)',
  xLabel: 'Value',
  colorScheme: 'viridis',
})

// Vigintiles (20 bins) example
const fineGrainedChart = useCustomPercentogram({
  data: normalData,
  percentiles: percentilePresets.vigintiles,
  title: 'Normal Distribution (Vigintiles - 20 bins)',
  xLabel: 'Value',
  colorScheme: 'turbo',
})

// Tail focus example
const tailFocusChart = useCustomPercentogram({
  data: logNormalData,
  percentiles: percentilePresets.tailFocus,
  title: 'Log-Normal with Tail Focus',
  xLabel: 'Value',
  colorScheme: 'spectral',
})
</script>

## What is a Percentogram?

A percentogram is a histogram where bins are defined by percentiles of the cumulative distribution rather than fixed widths. This ensures each bin contains approximately the same proportion of data, making it easier to compare distributions across their full range.

### Normal Distribution

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="normalPercentogram"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

::: tip Observable Plot Example
This matches the [Observable Plot percentogram example](https://observablehq.com/@observablehq/plot-percentogram). Each colored bar represents a decile (10% of the data), with density calculated as `1 / (x2 - x1)` to account for varying bin widths.
:::

## Why Use a Percentogram?

**Traditional histograms** use fixed bin widths, which can:
- Hide interesting features in sparse regions
- Over-emphasize dense regions
- Make it hard to compare across the full range

**Percentograms** give equal visual weight to each percentile range, making them ideal for:
- Skewed distributions
- Heavy-tailed data
- Comparing multiple distributions
- Identifying outliers and gaps

### Log-Normal Distribution (Skewed Data)

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="logNormalPercentogram"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

Notice how the percentogram reveals the shape of the distribution even though the values are heavily skewed to the right.

### Bimodal Distribution

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="bimodalPercentogram"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Custom Percentile Divisions

### Quartiles (4 bins)

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="quartilesChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

### Vigintiles (20 bins)

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="fineGrainedChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

### Tail Focus

More bins at the extremes to better show outliers:

<div class="w-full max-w-4xl mx-auto my-8">
  <PlotChart 
    :options="tailFocusChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>

## Usage Examples

### Basic Percentogram

```vue
<script setup>
import { usePercentogram } from '../.vitepress/theme/composables/usePercentogram'

const data = [12, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90]

const chart = usePercentogram({
  data,                        // Array of numbers
  bins: 10,                    // Number of percentile bins (deciles)
  colorScheme: 'spectral',     // Color scheme
  title: 'My Distribution',
})
</script>

<template>
  <PlotChart :options="chart" />
</template>
```

### With Object Data

```vue
<script setup>
import { usePercentogram } from '../.vitepress/theme/composables/usePercentogram'

const data = [
  { temperature: 15.2, location: 'A' },
  { temperature: 18.5, location: 'B' },
  { temperature: 22.1, location: 'C' },
  // ...
]

const chart = usePercentogram({
  data,
  valueField: 'temperature',   // Extract values from this field
  bins: 10,
})
</script>
```

### Custom Percentiles

```vue
<script setup>
import { useCustomPercentogram, percentilePresets } from '../.vitepress/theme/composables/usePercentogram'

// Use quartiles (4 bins: 0-25%, 25-50%, 50-75%, 75-100%)
const chart = useCustomPercentogram({
  data: myData,
  percentiles: percentilePresets.quartiles,
  colorScheme: 'viridis',
})
</script>
```

### Custom Percentile Array

```vue
<script setup>
import { useCustomPercentogram } from '../.vitepress/theme/composables/usePercentogram'

// Define your own percentile breakpoints
const chart = useCustomPercentogram({
  data: myData,
  percentiles: [0, 10, 25, 50, 75, 90, 100], // Custom division
  colorScheme: 'turbo',
})
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `number[]` or `object[]` | Required | Data array |
| `valueField` | `string` | `'value'` | Field name for object data |
| `bins` | `number` | `10` | Number of percentile bins |
| `colorScheme` | `string` | `'spectral'` | Observable color scheme |
| `width` | `number` | `640` | Chart width |
| `height` | `number` | `400` | Chart height |
| `title` | `string` | Optional | Chart title |
| `xLabel` | `string` | Auto | X-axis label |
| `yLabel` | `string` | `'Density'` | Y-axis label |
| `showGrid` | `boolean` | `true` | Show grid |

## Preset Percentile Divisions

```javascript
import { percentilePresets } from '../.vitepress/theme/composables/usePercentogram'

// Standard divisions
percentilePresets.deciles      // [0, 10, 20, ..., 90, 100] - 10 bins
percentilePresets.quartiles    // [0, 25, 50, 75, 100] - 4 bins
percentilePresets.quintiles    // [0, 20, 40, 60, 80, 100] - 5 bins
percentilePresets.tertiles     // [0, 33.33, 66.67, 100] - 3 bins

// Fine-grained
percentilePresets.vigintiles   // 20 bins (5% each)

// Focus on specific regions
percentilePresets.tailFocus    // More bins at extremes
percentilePresets.medianFocus  // More bins near center
```

## Color Schemes

```javascript
import { percentogramColorSchemes } from '../.vitepress/theme/composables/usePercentogram'

// Diverging schemes (good for showing deviation from center)
percentogramColorSchemes.spectral   // Observable default
percentogramColorSchemes.rdylbu     // Red-Yellow-Blue
percentogramColorSchemes.rdylgn     // Red-Yellow-Green
percentogramColorSchemes.puor       // Purple-Orange
percentogramColorSchemes.brbg       // Brown-Blue-Green

// Sequential schemes (good for showing progression)
percentogramColorSchemes.blues
percentogramColorSchemes.reds
percentogramColorSchemes.greens
percentogramColorSchemes.purples
percentogramColorSchemes.viridis
percentogramColorSchemes.turbo
```

## Generate Test Data

The composable includes helper functions for generating test distributions:

```javascript
import { 
  generateNormalDistribution, 
  generateLogNormalDistribution 
} from '../.vitepress/theme/composables/usePercentogram'

// Normal distribution (bell curve)
const normal = generateNormalDistribution(
  1000,  // count
  50,    // mean
  15     // standard deviation
)

// Log-normal distribution (right-skewed)
const logNormal = generateLogNormalDistribution(
  1000,  // count
  3,     // mu
  0.5    // sigma
)

// Use in chart
const chart = usePercentogram({
  data: normal,
  bins: 10,
})
```

## How Density is Calculated

The y-axis shows **density** rather than count:

```javascript
density = 1 / (x2 - x1)
```

Where:
- `x1` is the lower bound of the bin
- `x2` is the upper bound of the bin

This ensures that:
- **Narrow bins** (small ranges) have **high density**
- **Wide bins** (large ranges) have **low density**
- The visual area represents the proportion of data

## Mathematical Background

For a percentogram with `n` bins:

1. **Sort data**: Arrange all values in ascending order
2. **Calculate percentiles**: Divide into `n` equal groups
3. **Create bins**: Each bin contains `100/n` percent of data
4. **Calculate density**: For each bin, `density = 1 / width`

**Example with 10 bins (deciles):**
- Bin 1: 0-10th percentile
- Bin 2: 10-20th percentile
- ...
- Bin 10: 90-100th percentile

Each bin contains exactly 10% of the data, but widths vary based on the distribution.

## Use Cases

### 1. Income Distribution
Show wealth inequality - percentiles reveal concentration better than equal-width bins.

### 2. Response Times
Visualize latency where most responses are fast but some are very slow.

### 3. Test Scores
Compare student performance across the full range, not just around the mean.

### 4. Financial Data
Analyze stock returns, which are often heavy-tailed.

### 5. Scientific Measurements
Display any data where the range of interest spans orders of magnitude.

## Best Practices

1. **Choose appropriate bins** - 10 (deciles) works well for most cases
2. **Use diverging colors** for symmetric distributions
3. **Use sequential colors** for monotonic data
4. **Consider tail focus** for heavily skewed data
5. **Add context** in title/labels about percentile binning
6. **Compare with regular histogram** to show the difference

## Advantages Over Regular Histograms

| Aspect | Regular Histogram | Percentogram |
|--------|------------------|--------------|
| **Bin width** | Fixed | Variable |
| **Data per bin** | Variable | Fixed (equal percentiles) |
| **Sparse regions** | Hard to see | Equal representation |
| **Dense regions** | Dominates visual | Normalized |
| **Comparison** | Difficult across range | Easy across full distribution |
| **Outliers** | May be invisible | Always represented |

## Features

✅ **Percentile-based binning** - Equal data representation  
✅ **Density calculation** - Accounts for varying bin widths  
✅ **Custom divisions** - Quartiles, deciles, or custom percentiles  
✅ **Color schemes** - 15+ Observable Plot schemes  
✅ **Test data generators** - Normal and log-normal distributions  
✅ **Andrew Gelman reference** - Based on statistical best practices  

## Reference

This implementation is based on:
- Andrew Gelman's blog post: ["The percentogram"](https://statmodeling.stat.columbia.edu/2023/04/13/), April 13, 2023
- Observable Plot's binX transform with custom thresholds
- Density calculation: `1 / (x2 - x1)` for proper visual representation

## More Information

- [Observable Plot Percentogram](https://observablehq.com/@observablehq/plot-percentogram)
- [Bin Transform](https://observablehq.com/plot/transforms/bin)
- [Andrew Gelman's Blog](https://statmodeling.stat.columbia.edu/)
