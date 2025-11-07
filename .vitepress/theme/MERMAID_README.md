# Mermaid Integration for VitePress

This implementation adds Mermaid diagram support to your VitePress documentation site.

## Files Created

### 1. `Mermaid.vue`
The Vue component that renders Mermaid diagrams. It includes:
- Forest theme with hand-drawn look
- ELK layout engine for better diagram organization
- Automatic re-rendering on theme changes
- Support for all Mermaid diagram types

### 2. `mermaid.ts`
Helper module that initializes and renders Mermaid diagrams using the Mermaid API.

### 3. `index.ts` (Modified)
Registers the Mermaid component globally so it can be used in any markdown file.

## How It Works

1. **Component Registration**: The `Mermaid` component is registered globally in `theme/index.ts`
2. **Rendering**: When you use `<Mermaid>` in markdown, it:
   - Decodes the diagram syntax from the `graph` parameter
   - Initializes Mermaid with global configuration:
     - **Theme**: `forest` - Nature-inspired color scheme
     - **Look**: `handDrawn` - Sketchy, hand-drawn appearance
     - **Layout**: `elk` - Advanced layout algorithm for complex diagrams
   - Renders the diagram as SVG
   - Re-renders on theme changes

## Usage in Markdown Files

### Basic Example

```vue
<Mermaid 
  id="my-diagram" 
  graph="graph%20TD%0A%20%20%20%20A[Start]%20-->%20B[End]" 
/>
```

### Parameters

- **id** (required, string): Unique identifier for the diagram
- **graph** (required, string): URL-encoded Mermaid diagram code

### Creating Diagrams

1. Write your Mermaid diagram:
   ```
   graph TD
       A[Start] --> B[End]
   ```

2. URL-encode it using JavaScript:
   ```javascript
   encodeURIComponent(`graph TD
       A[Start] --> B[End]`)
   ```

3. Use it in your markdown:
   ```vue
   <Mermaid id="example" graph="..." />
   ```

## Supported Diagram Types

All Mermaid diagram types are supported:
- Flowcharts
- Sequence Diagrams
- Class Diagrams
- State Diagrams
- Entity Relationship Diagrams
- Gantt Charts
- Pie Charts
- Git Graphs
- User Journey Diagrams
- And more...

## Features

✅ **Hand-Drawn Style**: Sketchy, informal appearance using `handDrawn` look
✅ **Forest Theme**: Nature-inspired color scheme
✅ **ELK Layout**: Advanced layout algorithm for complex diagrams
✅ **Browser Compatible**: Works in all modern browsers (Firefox, Chrome, Safari, Edge)
✅ **Type Safe**: Full TypeScript support
✅ **Zero Config**: Works out of the box with your VitePress setup

## Global Configuration

All Mermaid diagrams use these global settings in `Mermaid.vue`:

```typescript
const mermaidConfig = {
  securityLevel: 'loose',
  startOnLoad: false,
  theme: 'forest',        // Nature-inspired green color scheme
  look: 'handDrawn',      // Sketchy, hand-drawn appearance
  layout: 'elk',          // Advanced layout algorithm
}
```

### Configuration Options

- **theme**: `'forest'` - Green, nature-inspired colors
  - Alternatives: `'default'`, `'dark'`, `'neutral'`, `'base'`
- **look**: `'handDrawn'` - Sketchy, informal style
  - Alternatives: `'classic'` (default)
- **layout**: `'elk'` - ELK (Eclipse Layout Kernel) for better diagram organization
  - Better handling of complex graphs and flowcharts
  - Improved node placement and edge routing

### Customizing Configuration

To change global settings, edit `renderChart` function in `.vitepress/theme/Mermaid.vue`:

```typescript
const renderChart = async () => {
  const mermaidConfig = {
    securityLevel: 'loose' as const,
    startOnLoad: false,
    theme: 'forest' as const,     // Change theme here
    look: 'handDrawn' as const,   // Change look here
    layout: 'elk' as const,       // Change layout here
  }
  // ...
}
```

## Troubleshooting

### Diagram not rendering
- Ensure the `id` is unique
- Check that the `graph` parameter is properly URL-encoded
- Open browser console to see any Mermaid syntax errors

### Hand-drawn look not showing
- The `handDrawn` look requires Mermaid v10.5.0 or higher
- Check that you have the latest Mermaid version installed
- Some diagram types may not support hand-drawn rendering

### Layout issues
- ELK layout works best with flowcharts and graphs
- For simpler diagrams, consider switching to default layout
- Complex diagrams may take longer to render with ELK

## Dependencies

Required dependency (already in package.json):
```json
{
  "dependencies": {
    "mermaid": "^11.12.1"
  }
}
```

## Example Page

See `/guide/mermaid-diagrams.md` for complete examples and usage patterns.

## References

- [Mermaid Documentation](https://mermaid.js.org/)
- [VitePress Documentation](https://vitepress.dev/)
- [Official Mermaid-VitePress Integration](https://github.com/mermaid-js/mermaid/tree/develop/packages/mermaid/src/docs/.vitepress)
