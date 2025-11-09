# MermaidDirect Component Usage

## 🎯 What is MermaidDirect?

A simplified Mermaid component that accepts **plain Mermaid syntax** - no URL encoding needed!

## ✨ Benefits

- ✅ **Human-readable** - Write normal Mermaid code
- ✅ **Easy to edit** - No cryptic encoded strings
- ✅ **Auto-encoding** - Handles encoding automatically
- ✅ **Same output** - Uses existing Mermaid renderer

## 📊 Bundle Impact

- **Size added**: ~1-2 KB (just the encoding function)
- **Trade-off**: Easier usage vs minimal bundle increase

## 🚀 Usage

### Old Way (Manual Encoding):
```html
<Mermaid id="example" graph="flowchart%20TD%0A%20%20%20%20A%5BStart%5D%20--%3E%20B%5BEnd%5D" />
```

### New Way (MermaidDirect):
```html
<MermaidDirect 
  id="example" 
  code="flowchart TD
    A[Start] --> B[End]" 
/>
```

## 📝 Examples

### Flowchart
```html
<MermaidDirect 
  id="simple-flow" 
  code="flowchart LR
    A[Client] --> B[Server]
    B --> C[Database]" 
/>
```

### Sequence Diagram
```html
<MermaidDirect 
  id="sequence" 
  code="sequenceDiagram
    User->>API: Request
    API-->>User: Response" 
/>
```

### State Diagram
```html
<MermaidDirect 
  id="states" 
  code="stateDiagram-v2
    [*] --> Active
    Active --> Inactive
    Inactive --> [*]" 
/>
```

## 🎨 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | ✅ Yes | Unique identifier for the diagram |
| `code` | String | ✅ Yes | Plain Mermaid syntax (not URL-encoded) |

## 💡 Tips

1. **Multi-line syntax**: Use regular line breaks, no need for `\n`
2. **Special characters**: No need to escape `[`, `]`, `>`, etc.
3. **Indentation**: Use normal spaces/tabs
4. **Readability**: Write it as you would in any Mermaid editor

## 🔄 When to Use Which?

| Component | Use When |
|-----------|----------|
| `<Mermaid>` | You already have encoded diagrams |
| `<MermaidDirect>` | Creating new diagrams (easier!) |

## ⚠️ Limitations

- Code prop must be a string (can't use template literals with variables)
- For dynamic diagrams, you still need the original `<Mermaid>` component

## 🎯 Result

Both components produce **identical output** - MermaidDirect just makes authoring easier!
