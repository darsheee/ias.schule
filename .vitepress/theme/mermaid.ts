import mermaid, { type MermaidConfig } from 'mermaid'

let initialized = false

export const render = async (id: string, code: string, config: MermaidConfig): Promise<string> => {
  if (!initialized) {
    mermaid.initialize(config)
    initialized = true
  } else {
    // Update config for subsequent renders (e.g., theme changes)
    mermaid.initialize(config)
  }
  
  const { svg } = await mermaid.render(id, code)
  return svg
}
