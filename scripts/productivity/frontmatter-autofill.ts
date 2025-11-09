import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import c from 'ansis'
import matter from 'gray-matter'

function generateFrontmatter(filePath: string, content: string): Record<string, any> {
  const frontmatter: Record<string, any> = {}
  
  // Extract category from path
  const parts = filePath.split(path.sep)
  
  if (parts.includes('upsc')) {
    const upscIndex = parts.indexOf('upsc')
    if (parts[upscIndex + 1]) {
      frontmatter.paper = parts[upscIndex + 1].toUpperCase()
    }
    if (parts[upscIndex + 2]) {
      frontmatter.subject = parts[upscIndex + 2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }
  }
  
  // Extract title from first heading or filename
  const titleMatch = content.match(/^#\s+(.+)$/m)
  if (titleMatch) {
    frontmatter.title = titleMatch[1]
  }
  else {
    frontmatter.title = path.basename(filePath, '.md').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  
  // Extract tags from headings
  const headings = content.match(/^##\s+(.+)$/gm) || []
  const tags = headings
    .map(h => h.replace(/^##\s+/, '').toLowerCase().replace(/\s+/g, '-'))
    .slice(0, 5)
  
  if (tags.length > 0) {
    frontmatter.tags = tags
  }
  
  // Calculate reading time
  const words = content.split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(words / 200)
  frontmatter.readingTime = `${readingTime} min`
  
  // Add last updated
  frontmatter.lastUpdated = new Date().toISOString().split('T')[0]
  
  return frontmatter
}

async function processFile(filePath: string, options: { overwrite: boolean }) {
  const content = await fs.readFile(filePath, 'utf-8')
  const parsed = matter(content)
  
  // Skip if already has frontmatter and not overwriting
  if (Object.keys(parsed.data).length > 0 && !options.overwrite) {
    return { skipped: true, reason: 'Already has frontmatter' }
  }
  
  // Generate new frontmatter
  const newFrontmatter = generateFrontmatter(filePath, parsed.content)
  
  // Merge with existing (new values take precedence if overwriting)
  const finalFrontmatter = options.overwrite
    ? { ...parsed.data, ...newFrontmatter }
    : { ...newFrontmatter, ...parsed.data }
  
  // Create new content with frontmatter
  const newContent = matter.stringify(parsed.content, finalFrontmatter)
  
  await fs.writeFile(filePath, newContent)
  
  return { skipped: false, added: Object.keys(newFrontmatter) }
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║        Smart Frontmatter Auto-Fill             ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const files = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
    '!README.md',
  ])

  console.log(c.yellow`Found ${files.length} markdown files\n`)
  console.log(c.dim`Processing...\n`)

  let processed = 0
  let skipped = 0

  for (const file of files) {
    try {
      const result = await processFile(file, { overwrite: false })
      
      if (result.skipped) {
        skipped++
        console.log(c.dim`[SKIP] ${file}`)
      }
      else {
        processed++
        console.log(c.green`[DONE] ${file}`)
        console.log(c.dim`       Added: ${result.added?.join(', ')}`)
      }
    }
    catch (error) {
      console.log(c.red`[FAIL] ${file}: ${error}`)
    }
  }

  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.green`\n✓ Processed: ${processed}`)
  console.log(c.yellow`  Skipped: ${skipped}`)
  console.log(c.dim`\nFrontmatter fields added:`)
  console.log(c.dim`  - title`)
  console.log(c.dim`  - paper/subject (from path)`)
  console.log(c.dim`  - tags (from headings)`)
  console.log(c.dim`  - readingTime`)
  console.log(c.dim`  - lastUpdated\n`)
}

main().catch(console.error)
