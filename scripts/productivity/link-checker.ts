import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import c from 'ansis'

interface BrokenLink {
  file: string
  line: number
  link: string
  reason: string
}

async function checkLinks(): Promise<BrokenLink[]> {
  const brokenLinks: BrokenLink[] = []
  
  const files = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
  ])

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8')
    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Match markdown links: [text](link)
      const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      let match

      while ((match = mdLinkRegex.exec(line)) !== null) {
        const linkText = match[1]
        const linkUrl = match[2]

        // Skip external links
        if (linkUrl.startsWith('http') || linkUrl.startsWith('//')) {
          continue
        }

        // Skip anchors
        if (linkUrl.startsWith('#')) {
          continue
        }

        // Check if file exists
        let targetPath = linkUrl
        
        // Handle relative paths
        if (!linkUrl.startsWith('/')) {
          targetPath = path.join(path.dirname(file), linkUrl)
        }
        else {
          // Absolute from root
          targetPath = linkUrl.substring(1)
        }

        // Remove anchor if present
        targetPath = targetPath.split('#')[0]

        if (!existsSync(targetPath)) {
          brokenLinks.push({
            file,
            line: i + 1,
            link: linkUrl,
            reason: 'File not found',
          })
        }
      }
    }
  }

  return brokenLinks
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║           Broken Link Checker                  ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  console.log(c.yellow`Checking all internal links...\n`)

  const brokenLinks = await checkLinks()

  if (brokenLinks.length === 0) {
    console.log(c.green.bold`✓ All internal links are valid!\n`)
    return
  }

  console.log(c.red.bold`Found ${brokenLinks.length} broken link(s):\n`)

  // Group by file
  const byFile = brokenLinks.reduce((acc, link) => {
    if (!acc[link.file]) {
      acc[link.file] = []
    }
    acc[link.file].push(link)
    return acc
  }, {} as Record<string, BrokenLink[]>)

  for (const [file, links] of Object.entries(byFile)) {
    console.log(c.yellow`📄 ${file}`)
    for (const link of links) {
      console.log(c.dim`   Line ${link.line}: ${c.red(link.link)}`)
      console.log(c.dim`   Reason: ${link.reason}\n`)
    }
  }

  console.log(c.cyan`\n💡 Tip: Fix these links to improve navigation!\n`)
}

main().catch(console.error)
