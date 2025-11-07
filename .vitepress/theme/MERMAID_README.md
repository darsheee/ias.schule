# Mermaid Integration for VitePress

This implementation adds Mermaid diagram support to your VitePress documentation site.

## Files Created

### 1. `Mermaid.vue`
The Vue component that renders Mermaid diagrams. It includes:
- Dark/light theme support
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
   - Initializes Mermaid with the current theme (dark/light)
   - Renders the diagram as SVG
   - Monitors theme changes and re-renders automatically

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

✅ **Theme Aware**: Automatically switches between light and dark themes
✅ **Browser Compatible**: Works in all modern browsers (Firefox, Chrome, Safari, Edge)
✅ **Type Safe**: Full TypeScript support
✅ **Zero Config**: Works out of the box with your VitePress setup

## Configuration

The Mermaid configuration is set in the `Mermaid.vue` component:

```typescript
const mermaidConfig = {
  securityLevel: 'loose',
  startOnLoad: false,
  theme: hasDarkClass ? 'dark' : 'default',
}
```

You can customize this in the `renderChart` function in `Mermaid.vue`.

## Troubleshooting

### Diagram not rendering
- Ensure the `id` is unique
- Check that the `graph` parameter is properly URL-encoded
- Open browser console to see any Mermaid syntax errors

### Theme not switching
- The component monitors `document.documentElement` for the `dark` class
- Ensure your VitePress theme uses this class for dark mode

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
