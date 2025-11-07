# Mermaid Diagrams

Mermaid lets you create diagrams and visualizations using text and code.

## Basic Usage

To use Mermaid diagrams in your markdown files, use the `<Mermaid>` component with the diagram code encoded as a URL parameter.

### Flowchart Example

<Mermaid id="flowchart-example" graph="graph TD%0A    A[Start] --> B{Is it working?}%0A    B -->|Yes| C[Great!]%0A    B -->|No| D[Debug]%0A    D --> B" />

### Sequence Diagram Example

<Mermaid id="sequence-example" graph="sequenceDiagram%0A    participant User%0A    participant App%0A    participant API%0A    User->>App: Request Data%0A    App->>API: Fetch Data%0A    API-->>App: Return Data%0A    App-->>User: Display Data" />

### Simple Flowchart

<Mermaid id="simple-flow" graph="graph LR%0A    A[Client] --> B[Load Balancer]%0A    B --> C[Server1]%0A    B --> D[Server2]" />

## How to Create Diagrams

You can use the following format in your markdown:

```vue
<Mermaid 
  id="unique-id-here" 
  graph="encoded-diagram-code-here" 
/>
```

### Parameters

- **id** (required): A unique identifier for the diagram
- **graph** (required): URL-encoded Mermaid diagram syntax

## Encoding Your Diagram

To encode your diagram code for the `graph` parameter:

1. Write your Mermaid diagram syntax
2. URL-encode it (you can use online tools or JavaScript's `encodeURIComponent()`)
3. Use it in the `graph` parameter

### Example:

Original diagram:
```
graph TD
    A[Start] --> B[End]
```

URL-encoded:
```
graph%20TD%0A%20%20%20%20A%5BStart%5D%20-->%20B%5BEnd%5D
```

## Diagram Types Supported

Mermaid supports various diagram types:

- **Flowcharts**: `graph TD` or `graph LR`
- **Sequence Diagrams**: `sequenceDiagram`
- **Class Diagrams**: `classDiagram`
- **State Diagrams**: `stateDiagram-v2`
- **Entity Relationship Diagrams**: `erDiagram`
- **Gantt Charts**: `gantt`
- **Pie Charts**: `pie`
- **And many more...**

For complete documentation, visit [Mermaid Documentation](https://mermaid.js.org/).

## Theme Support

The diagrams automatically adapt to your VitePress theme (light/dark mode).
