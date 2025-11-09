---
title: Universal Chart Syntax | IAS Schule
---

<script setup>
// ============================================
// ALL CHART EXAMPLES IN ONE PLACE
// ============================================

// 1. PIE CHART DATA
const pets = [
  {name: 'Dogs', value: 386},
  {name: 'Cats', value: 85},
  {name: 'Rats', value: 15}
]

// 2. DONUT CHART DATA
const browsers = [
  {name: 'Chrome', value: 65},
  {name: 'Safari', value: 19},
  {name: 'Edge', value: 5},
  {name: 'Firefox', value: 4},
  {name: 'Others', value: 7}
]

// 3. BAR CHART DATA
const sales = [
  {month: 'Jan', revenue: 12000},
  {month: 'Feb', revenue: 15000},
  {month: 'Mar', revenue: 18000},
  {month: 'Apr', revenue: 22000},
  {month: 'May', revenue: 25000}
]

// 4. AREA CHART DATA
const growth = [
  {year: 2019, users: 1000},
  {year: 2020, users: 2500},
  {year: 2021, users: 5000},
  {year: 2022, users: 8500},
  {year: 2023, users: 15000}
]

// 5. SCATTER PLOT DATA
const distribution = [
  {height: 160, weight: 55, gender: 'F'},
  {height: 175, weight: 70, gender: 'M'},
  {height: 165, weight: 60, gender: 'F'},
  {height: 180, weight: 85, gender: 'M'},
  {height: 170, weight: 65, gender: 'M'},
  {height: 155, weight: 50, gender: 'F'},
  {height: 185, weight: 90, gender: 'M'},
  {height: 162, weight: 58, gender: 'F'}
]

// 6. PERCENTOGRAM DATA (histogram)
const scores = [
  {value: 45}, {value: 67}, {value: 78}, {value: 89},
  {value: 56}, {value: 90}, {value: 34}, {value: 72},
  {value: 88}, {value: 45}, {value: 92}, {value: 67}
]

// 7. GROUPED BAR CHART DATA
const regionSales = [
  {month: 'Jan', North: 12000, South: 15000, East: 13000},
  {month: 'Feb', North: 14000, South: 17000, East: 15000},
  {month: 'Mar', North: 16000, South: 19000, East: 17000}
]
</script>

# Universal Chart Syntax

**One component, all chart types!** 🎉

Create any D3/Plot chart with minimal code using the `<Chart>` component.

---

## 🎯 Supported Chart Types

1. **Pie Charts** - Show proportions
2. **Donut Charts** - Pie with center space
3. **Bar Charts** - Compare categories
4. **Area Charts** - Show trends over time
5. **Scatter Plots** - Show distributions
6. **Percentograms** - Histograms by percentile
7. **Gradient Bar Charts** - Beautiful gradients

---

## 📊 Examples

### 1. Pie Chart

**Data:**
```js
const pets = [
  {name: 'Dogs', value: 386},
  {name: 'Cats', value: 85},
  {name: 'Rats', value: 15}
]
```

**Chart:**
```vue
<Chart type="pie" title="Pets Adopted" :data="pets" />
```

**Result:**

<Chart type="pie" title="Pets Adopted by Volunteers" :data="pets" />

---

### 2. Donut Chart

**Data:**
```js
const browsers = [
  {name: 'Chrome', value: 65},
  {name: 'Safari', value: 19},
  {name: 'Edge', value: 5}
]
```

**Chart:**
```vue
<Chart type="donut" title="Browser Share" :data="browsers" />
```

**Result:**

<Chart type="donut" title="Browser Market Share" :data="browsers" />

---

### 3. Bar Chart

**Data:**
```js
const sales = [
  {month: 'Jan', revenue: 12000},
  {month: 'Feb', revenue: 15000},
  {month: 'Mar', revenue: 18000}
]
```

**Chart:**
```vue
<Chart 
  type="bar" 
  title="Monthly Revenue" 
  :data="sales" 
  xKey="month" 
  yKey="revenue" 
/>
```

**Result:**

<Chart type="bar" title="Monthly Revenue ($)" :data="sales" xKey="month" yKey="revenue" />

---

### 4. Area Chart

**Data:**
```js
const growth = [
  {year: 2019, users: 1000},
  {year: 2020, users: 2500},
  {year: 2021, users: 5000}
]
```

**Chart:**
```vue
<Chart 
  type="area" 
  title="User Growth" 
  :data="growth" 
  xKey="year" 
  yKey="users" 
/>
```

**Result:**

<Chart type="area" title="User Growth Over Time" :data="growth" xKey="year" yKey="users" />

---

### 5. Scatter Plot

**Data:**
```js
const distribution = [
  {height: 160, weight: 55, gender: 'F'},
  {height: 175, weight: 70, gender: 'M'}
]
```

**Chart:**
```vue
<Chart 
  type="scatter" 
  title="Height vs Weight" 
  :data="distribution" 
  xKey="height" 
  yKey="weight"
  colorKey="gender"
/>
```

**Result:**

<Chart 
  type="scatter" 
  title="Height vs Weight Distribution" 
  :data="distribution" 
  xKey="height" 
  yKey="weight"
  colorKey="gender"
/>

---

### 6. Percentogram (Histogram)

**Data:**
```js
const scores = [
  {value: 45}, {value: 67}, {value: 78},
  {value: 89}, {value: 56}, {value: 90}
]
```

**Chart:**
```vue
<Chart 
  type="percentogram" 
  title="Score Distribution" 
  :data="scores" 
/>
```

**Result:**

<Chart type="percentogram" title="Test Score Distribution" :data="scores" />

---

### 7. Gradient Bar Chart

**Data:**
```js
const sales = [
  {month: 'Jan', revenue: 12000},
  {month: 'Feb', revenue: 15000}
]
```

**Chart:**
```vue
<Chart 
  type="gradient-bar" 
  title="Revenue" 
  :data="sales" 
  xKey="month" 
  yKey="revenue" 
/>
```

**Result:**

<Chart type="gradient-bar" title="Revenue with Gradients" :data="sales" xKey="month" yKey="revenue" />

---

## 🚀 Quick Reference

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | ✅ | Chart type: `pie`, `donut`, `bar`, `area`, `scatter`, `percentogram` |
| `title` | string | | Chart title |
| `data` | array | ✅ | Data array |
| `xKey` | string | * | X-axis key (bar, area, scatter) |
| `yKey` | string | * | Y-axis key (bar, area, scatter) |
| `colorKey` | string | | Color grouping key (scatter) |
| `groupKey` | string | | Grouping key (grouped-bar) |
| `width` | number | | Chart width (default: 600) |
| `height` | number | | Chart height (auto) |

*Required for specific chart types

---

## 📝 Data Formats

### Pie/Donut
```js
[{name: string, value: number}, ...]
```

### Bar/Area
```js
[{[xKey]: string|number, [yKey]: number}, ...]
```

### Scatter
```js
[{[xKey]: number, [yKey]: number, [colorKey]?: string}, ...]
```

### Percentogram
```js
[{value: number}, ...]
```

---

## 💡 Tips

### 1. Minimal Code
```vue
<Chart type="pie" :data="myData" />
```
Only 1 line needed!

### 2. Custom Keys
```vue
<Chart type="bar" :data="sales" xKey="month" yKey="amount" />
```
Use any property names

### 3. Responsive
All charts automatically resize to container width

### 4. Dark Mode
Charts adapt to light/dark theme automatically

---

## 🎨 Comparison: Before vs After

### Before (Complex)
```vue
<script setup>
import { useGroupedBarChart } from '../composables/useGroupedBarChart'

const data = [{month: 'Jan', sales: 100}]
const config = useGroupedBarChart({
  data,
  xKey: 'month',
  yKey: 'sales',
  width: 600,
  height: 400
})
</script>

<template>
  <div class="w-full max-w-3xl mx-auto my-8">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-center mb-4">
        Sales Chart
      </h3>
      <PlotChart v-bind="config" />
    </div>
  </div>
</template>
```

**Lines: 25+**

### After (Simple)
```vue
<script setup>
const data = [{month: 'Jan', sales: 100}]
</script>

<Chart type="bar" title="Sales Chart" :data="data" xKey="month" yKey="sales" />
```

**Lines: 5** ✨

---

## 🔥 Real-World Examples

### Dashboard with Multiple Charts

```vue
<script setup>
const revenue = [{month: 'Q1', amount: 50000}, ...]
const users = [{date: '2023-01', count: 1000}, ...]
const distribution = [{age: 25, salary: 50000}, ...]
</script>

<div class="grid grid-cols-2 gap-4">
  <Chart type="bar" title="Quarterly Revenue" :data="revenue" xKey="month" yKey="amount" />
  <Chart type="area" title="User Growth" :data="users" xKey="date" yKey="count" />
  <Chart type="scatter" title="Age vs Salary" :data="distribution" xKey="age" yKey="salary" />
  <Chart type="pie" title="Categories" :data="categories" />
</div>
```

**4 interactive charts in 10 lines!** 🎉

---

## ✅ Benefits

| Feature | Traditional | Universal `<Chart>` |
|---------|-------------|---------------------|
| **Lines of code** | 25+ | 5 |
| **Imports** | Multiple | None (global) |
| **Learning curve** | Steep | Flat |
| **Type safety** | Manual | Built-in |
| **Customization** | Full | Smart defaults |
| **Speed** | Slow | Fast |

---

## 🎯 When to Use What

### Use `<Chart>` when:
- ✅ You want quick results
- ✅ Default styling is fine
- ✅ Simple use case
- ✅ Prototyping

### Use Traditional Composables when:
- ✅ You need advanced customization
- ✅ Complex data transformations
- ✅ Multiple chart instances with shared config
- ✅ Performance optimization needed

---

## 📚 See Also

- [Pie Charts (Traditional)](/guide/pie-charts)
- [Bar Charts (Traditional)](/guide/grouped-bar-charts)
- [Area Charts (Traditional)](/guide/area-charts)
- [Scatter Plots (Traditional)](/guide/scatter-plots)

---

**Start creating charts with minimal code today!** ✨
