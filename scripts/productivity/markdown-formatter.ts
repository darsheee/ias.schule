import fs from 'node:fs/promises'
import fg from 'fast-glob'
import c from 'ansis'
import matter from 'gray-matter'

function formatMarkdown(content: string): string {
  const parsed = matter(content)
  let body = parsed.content

  // Fix heading hierarchy
  const lines = body.split('\n')
  const formatted: string[] = []
  let prevHeadingLevel = 0

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Fix headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2].trim()
      
      // Ensure single space after #
      line = `${'#'.repeat(level)} ${text}`
      
      // Add blank line before heading (except after frontmatter or another heading)
      if (i > 0 && formatted.length > 0 && !formatted[formatted.length - 1].startsWith('#') && formatted[formatted.length - 1].trim() !== '') {
        formatted.push('')
      }
      
      prevHeadingLevel = level
    }

    // Normalize lists
    if (line.match(/^[\s]*[-*+]\s/)) {
      line = line.replace(/^[\s]*([-*+])\s+/, '- ')
    }

    // Normalize numbered lists
    if (line.match(/^[\s]*\d+\.\s/)) {
      const indent = line.match(/^[\s]*/)?.[0] || ''
      line = line.replace(/^[\s]*\d+\.\s+/, `${indent}1. `)
    }

    // Fix extra spaces
    line = line.replace(/\s+$/g, '') // Trailing spaces
    
    formatted.push(line)
  }

  // Remove multiple consecutive blank lines
  const finalLines: string[] = []
  let blankCount = 0
  
  for (const line of formatted) {
    if (line.trim() === '') {
      blankCount++
      if (blankCount <= 1) {
        finalLines.push(line)
      }
    }
    else {
      blankCount = 0
      finalLines.push(line)
    }
  }

  // Sort frontmatter keys
  if (Object.keys(parsed.data).length > 0) {
    const sortedData: any = {}
    const keyOrder = ['title', 'description', 'date', 'author', 'tags', 'category']
    
    // Add keys in preferred order
    for (const key of keyOrder) {
      if (parsed.data[key] !== undefined) {
        sortedData[key] = parsed.data[key]
      }
    }
    
    // Add remaining keys
    for (const key of Object.keys(parsed.data)) {
      if (!keyOrder.includes(key)) {
        sortedData[key] = parsed.data[key]
      }
    }
    
    return matter.stringify(finalLines.join('\n'), sortedData)
  }

  return finalLines.join('\n')
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Markdown Formatter                    ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const files = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
  ])

  console.log(c.yellow`Found ${files.length} markdown file(s)\n`)

  let formatted = 0
  let skipped = 0

  for (const file of files) {
    try {
      const original = await fs.readFile(file, 'utf-8')
      const formatted_content = formatMarkdown(original)

      if (original !== formatted_content) {
        await fs.writeFile(file, formatted_content)
        console.log(c.green`[FORMATTED] ${file}`)
        formatted++
      }
      else {
        console.log(c.dim`[SKIP] ${file}`)
        skipped++
      }
    }
    catch (error) {
      console.log(c.red`[ERROR] ${file}: ${error}`)
    }
  }

  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.green`\n✓ Formatted: ${formatted}`)
  console.log(c.yellow`  Skipped: ${skipped}`)
  console.log(c.dim`\nFormatting applied:`)
  console.log(c.dim`  • Fixed heading hierarchy`)
  console.log(c.dim`  • Normalized lists`)
  console.log(c.dim`  • Removed extra blank lines`)
  console.log(c.dim`  • Sorted frontmatter`)
  console.log()
}

main().catch(console.error)
