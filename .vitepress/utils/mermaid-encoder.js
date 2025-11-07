/**
 * Mermaid Diagram Encoder Utility
 * 
 * This utility helps you encode Mermaid diagram syntax for use in VitePress markdown files.
 * 
 * Usage:
 *   node .vitepress/utils/mermaid-encoder.js "your diagram code here"
 * 
 * Or use in browser console:
 *   encodeURIComponent(`graph TD\n    A[Start] --> B[End]`)
 */

const diagram = process.argv[2]

if (!diagram) {
  console.log(`
Mermaid Diagram Encoder
=======================

Usage:
  node mermaid-encoder.js "diagram code"

Example:
  node mermaid-encoder.js "graph TD
    A[Start] --> B[End]"

Output:
  Encoded string that you can use in the graph parameter

Example Markdown Usage:
  <Mermaid id="my-diagram" graph="ENCODED_STRING_HERE" :showCode="true" />

Common Diagram Types:
  - Flowchart:        graph TD or graph LR
  - Sequence:         sequenceDiagram
  - Class:            classDiagram
  - State:            stateDiagram-v2
  - ER Diagram:       erDiagram
  - Gantt:            gantt
  - Pie:              pie
  `)
  process.exit(1)
}

const encoded = encodeURIComponent(diagram)

console.log('\n=== Original Diagram ===')
console.log(diagram)
console.log('\n=== Encoded String ===')
console.log(encoded)
console.log('\n=== Usage in Markdown ===')
console.log(`<Mermaid id="diagram-${Date.now()}" graph="${encoded}" :showCode="true" />`)
console.log('')
