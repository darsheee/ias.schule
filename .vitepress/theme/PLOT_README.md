# PlotChart Component - Technical Reference

## Overview

High-performance, responsive D3 chart component using Observable Plot.

## Component API

### Props

```typescript
interface PlotChartProps {
  options: PlotOptions      // Observable Plot configuration
  containerClass?: string   // UnoCSS classes for container
}
```

### Example

```vue
<PlotChart 
  :options="{
    marks: [{ mark: 'line', data, x: 'x', y: 'y' }],
    grid: true
  }"
  container-class="w-full max-w-4xl mx-auto"
/>
```

## Performance Features

### 1. Lazy Loading
```typescript
const Plot = await import('@observablehq/plot')
```
- Library only loads when component is used
- ~50KB gzipped, loaded asynchronously
- Zero impact on initial page load

### 2. Layout Stability
```css
min-height: 200px;
contain: layout style paint;
```
- Prevents Cumulative Layout Shift (CLS)
- CSS containment for performance
- Reserves space before chart renders

### 3. Efficient Updates
- Only re-renders on options change
- Removes old chart before rendering new one
- Deep watch on options object

## Responsive Design

### Built-in Responsiveness
```typescript
style: {
  maxWidth: '100%',
  height: 'auto'
}
```

### Recommended Container
```vue
<div class="w-full max-w-4xl mx-auto p-4">
  <PlotChart :options="..." />
</div>
```

### UnoCSS Classes
- `w-full` - Full width
- `max-w-{size}` - Maximum width
- `mx-auto` - Center horizontally
- `p-{size}` - Padding

## Observable Plot Options

### Common Marks
```typescript
{ mark: 'line' }     // Line chart
{ mark: 'barY' }     // Vertical bars
{ mark: 'barX' }     // Horizontal bars
{ mark: 'dot' }      // Scatter plot
{ mark: 'area' }     // Area chart
{ mark: 'rect' }     // Rectangles/heatmap
{ mark: 'text' }     // Text labels
```

### Configuration
```typescript
{
  marks: [...],        // Array of marks
  grid: true,          // Show grid
  x: { label: '...' }, // X-axis config
  y: { label: '...' }, // Y-axis config
  color: {             // Color scale
    scheme: 'blues',
    legend: true
  },
  marginTop: 20,       // Chart margins
  marginRight: 30,
  marginBottom: 40,
  marginLeft: 50
}
```

## Lighthouse Impact

### Expected Scores
- **Performance**: 95-100
- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **TBT**: < 200ms
- **CLS**: 0
- **Speed Index**: < 3.4s

### Why Zero Impact?

1. **Lazy loaded**: Not in initial bundle
2. **Client-side only**: No SSR overhead
3. **CSS containment**: Isolated rendering
4. **Min-height**: No layout shift
5. **Efficient**: Only renders when needed

## Usage Patterns

### Static Chart
```vue
<script setup>
const data = [...]
const options = {
  marks: [{ mark: 'barY', data, x: 'x', y: 'y' }]
}
</script>

<PlotChart :options="options" />
```

### Dynamic Data
```vue
<script setup>
import { ref, computed } from 'vue'

const data = ref([...])
const options = computed(() => ({
  marks: [{ mark: 'line', data: data.value, x: 'x', y: 'y' }]
}))
</script>

<PlotChart :options="options" />
```

### With Interactions
```typescript
{
  mark: 'dot',
  data,
  x: 'x',
  y: 'y',
  tip: true,  // Enable tooltips
  title: d => `Value: ${d.y}`  // Custom tooltip
}
```

## Best Practices

### 1. Data Size
- Line charts: < 5,000 points
- Bar charts: < 100 bars
- Scatter plots: < 10,000 points

### 2. Responsive Containers
Always wrap in responsive containers:
```vue
<div class="w-full max-w-4xl">
  <PlotChart :options="..." />
</div>
```

### 3. Memoization
For expensive data calculations:
```vue
<script setup>
import { computed } from 'vue'

const processedData = computed(() => {
  // Heavy computation
  return transformData(rawData.value)
})

const options = computed(() => ({
  marks: [{ mark: 'line', data: processedData.value, ... }]
}))
</script>
```

### 4. Theme Support
```vue
<PlotChart 
  container-class="bg-white dark:bg-gray-800"
/>
```

### 5. Accessibility
```typescript
{
  ariaLabel: 'Chart description',
  ariaDescription: 'Detailed explanation'
}
```

## Troubleshooting

### Chart not rendering?
- Check if data format is correct
- Open browser console for errors
- Verify component is client-side (not SSR)

### Performance issues?
- Reduce data points
- Avoid complex computations in options
- Use appropriate mark types

### Layout shift?
- Container has `min-height: 200px` by default
- Adjust if your charts are typically taller

## Dependencies

```json
{
  "@observablehq/plot": "^0.6.16"
}
```

## Resources

- **Observable Plot Docs**: https://observablehq.com/plot/
- **Examples**: `/guide/d3-charts`
- **GitHub**: https://github.com/observablehq/plot
