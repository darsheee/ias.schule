import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import prompts from 'prompts'
import c from 'ansis'

interface LinkSuggestion {
  keyword: string
  targetFile: string
  targetTitle: string
  occurrences: number
}

async function buildIndexMap(): Promise<Map<string, { file: string, title: string }>> {
  const index = new Map<string, { file: string, title: string }>()
  
  const files = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
  ])

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8')
    
    // Extract title from first heading or frontmatter
    const titleMatch = content.match(/^#\s+(.+)$/m) || content.match(/title:\s*['"]?([^'"]+)['"]?/m)
    if (titleMatch) {
      const title = titleMatch[1].trim()
      const keywords = title.toLowerCase().split(/\s+/)
      
      // Index by full title and individual words
      index.set(title.toLowerCase(), { file, title })
      
      // Also index important keywords (longer than 4 chars)
      for (const keyword of keywords) {
        if (keyword.length > 4 && !index.has(keyword)) {
          index.set(keyword, { file, title })
        }
      }
    }
  }

  return index
}

async function suggestLinks(targetFile: string): Promise<LinkSuggestion[]> {
  const suggestions: LinkSuggestion[] = []
  const content = await fs.readFile(targetFile, 'utf-8')
  const index = await buildIndexMap()

  // Remove existing links from content
  const textContent = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // Check for each indexed keyword
  for (const [keyword, target] of index.entries()) {
    if (target.file === targetFile) {
      continue // Skip self-references
    }

    // Count occurrences (case-insensitive)
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    const matches = textContent.match(regex)
    
    if (matches && matches.length > 0) {
      suggestions.push({
        keyword,
        targetFile: target.file,
        targetTitle: target.title,
        occurrences: matches.length,
      })
    }
  }

  // Sort by occurrences (most mentioned first)
  return suggestions.sort((a, b) => b.occurrences - a.occurrences)
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Related Links Suggester               ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { targetFile } = await prompts({
    type: 'text',
    name: 'targetFile',
    message: 'Markdown file to analyze:',
  })

  if (!targetFile || !existsSync(targetFile)) {
    console.log(c.yellow`\nFile not found or cancelled.`)
    return
  }

  console.log(c.yellow`\nAnalyzing content and finding related pages...\n`)

  try {
    const suggestions = await suggestLinks(targetFile)

    if (suggestions.length === 0) {
      console.log(c.green`\n✓ No link suggestions found.`)
      console.log(c.dim`  Your content may already be well-linked!`)
      return
    }

    console.log(c.green`\n✓ Found ${suggestions.length} link suggestion(s):\n`)

    // Show top 10
    for (let i = 0; i < Math.min(10, suggestions.length); i++) {
      const s = suggestions[i]
      console.log(c.bold`${i + 1}. "${s.keyword}" → ${s.targetTitle}`)
      console.log(c.dim`   Mentioned ${s.occurrences}x`)
      console.log(c.dim`   Target: ${s.targetFile}`)
      console.log()
    }

    if (suggestions.length > 10) {
      console.log(c.dim`... and ${suggestions.length - 10} more suggestions\n`)
    }

    console.log(c.yellow`💡 To add links, replace:`)
    console.log(c.dim`   "${suggestions[0].keyword}"`)
    console.log(c.yellow`   with:`)
    console.log(c.dim`   [${suggestions[0].keyword}](/${suggestions[0].targetFile})`)
    console.log()
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
