---
title: Simple Chart Syntax | IAS Schule
---

# Simple Chart Syntax

Write D3/Plot charts with **minimal syntax** - no `<script setup>` needed!

## Overview

Instead of writing complex Vue code like this:

```vue
<script setup>
import { usePieChart } from '../.vitepress/theme/composables/usePieChart'

const data = [
  { name: 'Chrome', value: 65 },
  { name: 'Safari', value: 19 },
]

const chart = usePieChart({ data, width: 600 })
</script>

<template>
  <PieChart v-bind="chart" />
</template>
```

You can now just write:

```md
<ChartBlock>
pie title Browser Share
    "Chrome" : 65
    "Safari" : 19
</ChartBlock>
```

**That's it!** ✨

## Supported Chart Types

### 1. Pie Chart

```md
<ChartBlock>
pie title My Pie Chart
    "Category A" : 100
    "Category B" : 200
    "Category C" : 150
</ChartBlock>
```

**Output:**

<ChartBlock>
pie title Project Time Allocation
    "Development" : 45
    "Design" : 20
    "Testing" : 15
    "Documentation" : 12
    "Meetings" : 8
</ChartBlock>

### 2. Donut Chart

```md
<ChartBlock>
donut title Revenue Distribution
    "Product A" : 450000
    "Product B" : 320000
    "Product C" : 280000
</ChartBlock>
```

**Output:**

<ChartBlock>
donut title Revenue Distribution
    "Product A" : 450000
    "Product B" : 320000
    "Product C" : 280000
    "Product D" : 180000
</ChartBlock>

### 3. Bar Chart *(Coming Soon)*

```md
<ChartBlock>
bar title Sales by Region
    "North" : 500
    "South" : 800
    "East" : 650
    "West" : 720
</ChartBlock>
```

### 4. Line Chart *(Coming Soon)*

```md
<ChartBlock>
line title Growth Over Time
    2020 : 100
    2021 : 150
    2022 : 225
    2023 : 340
</ChartBlock>
```

## Syntax Rules

### Basic Structure

```
<chartType> title <Chart Title>
    "<Name 1>" : <Value 1>
    "<Name 2>" : <Value 2>
    "<Name 3>" : <Value 3>
```

### Rules:

1. **First line**: Chart type + title
   - Format: `pie title My Title` or `donut title My Title`
   - Title is required

2. **Data lines**: Category name + value
   - Names must be in **quotes**: `"Category A"`
   - Colon separator: `:`
   - Values are numbers (integers or decimals)

3. **Indentation**: 4 spaces (for readability)
   - Not required but recommended

4. **Case**: Chart type is case-insensitive
   - `pie`, `PIE`, `Pie` all work

## Examples

### Simple Pie Chart

<ChartBlock>
pie title Favorite Fruits
    "Apples" : 23
    "Oranges" : 17
    "Bananas" : 29
    "Grapes" : 15
</ChartBlock>

**Code:**
```md
<ChartBlock>
pie title Favorite Fruits
    "Apples" : 23
    "Oranges" : 17
    "Bananas" : 29
    "Grapes" : 15
</ChartBlock>
```

### Donut with Many Categories

<ChartBlock>
donut title Operating System Usage
    "Windows" : 68.5
    "macOS" : 20.3
    "Linux" : 6.8
    "Chrome OS" : 2.4
    "Others" : 2.0
</ChartBlock>

**Code:**
```md
<ChartBlock>
donut title Operating System Usage
    "Windows" : 68.5
    "macOS" : 20.3
    "Linux" : 6.8
    "Chrome OS" : 2.4
    "Others" : 2.0
</ChartBlock>
```

### Large Numbers

<ChartBlock>
pie title Annual Budget ($)
    "Salaries" : 500000
    "Marketing" : 150000
    "R&D" : 120000
    "Operations" : 80000
</ChartBlock>

**Code:**
```md
<ChartBlock>
pie title Annual Budget ($)
    "Salaries" : 500000
    "Marketing" : 150000
    "R&D" : 120000
    "Operations" : 80000
</ChartBlock>
```

## Advantages

### ✅ Minimal Code
Write just the data - no imports, no setup, no config!

### ✅ Readable
Clean, simple syntax that anyone can understand

### ✅ Fast
Create charts in seconds, not minutes

### ✅ Consistent
All charts use the same pattern

### ✅ Portable
Easy to copy/paste between files

## Comparison

### Traditional Way (Complex)

```vue
<script setup>
import { usePieChart, pieChartColorSchemes } from '../.vitepress/theme/composables/usePieChart'

const marketShareData = [
  { name: 'Chrome', value: 65 },
  { name: 'Safari', value: 19 },
  { name: 'Edge', value: 5 },
  { name: 'Firefox', value: 4 },
  { name: 'Others', value: 7 },
]

const marketShareChart = usePieChart({
  data: marketShareData,
  width: 600,
  colors: pieChartColorSchemes.vibrant,
})
</script>

<div class="w-full max-w-3xl mx-auto my-8">
  <PieChart 
    v-bind="marketShareChart"
    container-class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  />
</div>
```

**Lines of code: 25+**

### Simple Syntax Way (Easy!)

```md
<ChartBlock>
pie title Browser Market Share
    "Chrome" : 65
    "Safari" : 19
    "Edge" : 5
    "Firefox" : 4
    "Others" : 7
</ChartBlock>
```

**Lines of code: 9** ✨

## Error Handling

If syntax is invalid, you'll see a friendly error message:

```md
<ChartBlock>
invalid syntax here
</ChartBlock>
```

Displays:
> **Chart Error**  
> Unknown chart type in: invalid syntax here

## Best Practices

### 1. Keep Titles Descriptive
```md
✅ Good: pie title Browser Market Share 2024
❌ Bad:  pie title Chart
```

### 2. Use Meaningful Names
```md
✅ Good: "Chrome Browser" : 65
❌ Bad:  "C" : 65
```

### 3. Limit Categories
For readability, keep to 5-8 categories maximum:
```md
✅ Good: 5-8 categories
❌ Too many: 20+ categories (hard to read)
```

### 4. Round Large Numbers
```md
✅ Good: "Revenue" : 450000
❌ Bad:  "Revenue" : 450123.456789
```

## Roadmap

### Currently Supported
- ✅ Pie charts
- ✅ Donut charts

### Coming Soon
- 🔜 Bar charts
- 🔜 Line charts
- 🔜 Area charts
- 🔜 Scatter plots

### Future
- 🔮 Multi-series charts
- 🔮 Custom colors
- 🔮 Axis labels
- 🔮 Legends positioning

## Technical Details

### Under the Hood

The `<ChartBlock>` component:
1. Parses the simple syntax
2. Converts to chart configuration
3. Renders using existing D3/Plot components

### File Structure
```
.vitepress/theme/
  ├── composables/
  │   └── useSimpleChart.ts      # Syntax parser
  ├── components/
  │   ├── ChartBlock.vue          # Wrapper component
  │   └── SimpleChart.vue         # Renderer
  └── index.ts                    # Registered globally
```

### Syntax Parser
Location: `.vitepress/theme/composables/useSimpleChart.ts`

Supports:
- Type detection (pie, donut, bar, line)
- Title extraction
- Data parsing
- Error handling

## FAQ

**Q: Do I need to import anything?**  
A: No! `ChartBlock` is globally registered.

**Q: Can I use this in any markdown file?**  
A: Yes! Works in all `.md` files.

**Q: What if I need advanced customization?**  
A: Use the traditional `<script setup>` approach for full control.

**Q: Are there color schemes?**  
A: Charts use the default "vibrant" scheme. Custom colors coming soon!

**Q: Can I mix simple and traditional syntax?**  
A: Yes! Use both in the same file if needed.

## See Also

- [Pie & Donut Charts](/guide/pie-charts) - Traditional syntax
- [D3 Charts](/guide/d3-charts) - Full D3 documentation
- [Mermaid Diagrams](/guide/mermaid-diagrams) - Similar minimal syntax for diagrams

---

**Start creating beautiful charts with minimal syntax today!** ✨
