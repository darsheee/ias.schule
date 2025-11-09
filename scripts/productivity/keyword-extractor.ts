import fs from 'node:fs/promises'
import prompts from 'prompts'
import c from 'ansis'

interface KeywordData {
  keyword: string
  frequency: number
}

function extractKeywords(content: string): KeywordData[] {
  // Remove frontmatter, code blocks, links
  let cleaned = content.replace(/^---[\s\S]*?---/m, '')
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '')
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  cleaned = cleaned.replace(/[#*_`]/g, '')

  // Split into words
  const words = cleaned
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3) // Only words longer than 3 chars

  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'will',
    'this', 'that', 'with', 'from', 'have', 'has', 'had', 'was', 'were',
    'been', 'being', 'does', 'did', 'done', 'when', 'where', 'what', 'which',
    'who', 'whom', 'whose', 'these', 'those', 'then', 'than', 'there', 'their',
    'they', 'them', 'into', 'through', 'during', 'before', 'after', 'above',
    'below', 'between', 'under', 'again', 'further', 'other', 'such', 'only',
    'same', 'also', 'some', 'more', 'most', 'very', 'about', 'would', 'could',
    'should', 'make', 'made', 'like', 'time', 'just', 'know', 'take', 'people',
    'year', 'good', 'work', 'first', 'well', 'even', 'want', 'because', 'give',
  ])

  // Count frequencies
  const freq = new Map<string, number>()
  for (const word of words) {
    if (!stopWords.has(word) && word.match(/^[a-z]+$/)) {
      freq.set(word, (freq.get(word) || 0) + 1)
    }
  }

  // Convert to array and sort
  const keywords = Array.from(freq.entries())
    .map(([keyword, frequency]) => ({ keyword, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 20)

  return keywords
}

function generateMetaDescription(content: string, maxLength = 160): string {
  // Get first paragraph
  const paragraphs = content
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/^#+\s+.+$/gm, '')
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 50)

  if (paragraphs.length === 0) {
    return ''
  }

  let description = paragraphs[0].substring(0, maxLength)
  if (paragraphs[0].length > maxLength) {
    description = description.substring(0, description.lastIndexOf(' ')) + '...'
  }

  return description
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          SEO Keyword Extractor                 ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { inputFile } = await prompts({
    type: 'text',
    name: 'inputFile',
    message: 'Markdown file to analyze:',
  })

  if (!inputFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  try {
    const content = await fs.readFile(inputFile, 'utf-8')
    const keywords = extractKeywords(content)
    const metaDesc = generateMetaDescription(content)

    console.log(c.green`\n✓ Analysis complete!\n`)

    console.log(c.bold`🔑 Top Keywords (by frequency):\n`)
    for (let i = 0; i < Math.min(10, keywords.length); i++) {
      const kw = keywords[i]
      console.log(`   ${(i + 1).toString().padStart(2)}. ${kw.keyword.padEnd(20)} ${c.dim(`(${kw.frequency}x)`)}`)
    }

    if (metaDesc) {
      console.log(c.bold`\n📝 Suggested Meta Description:\n`)
      console.log(c.dim`   "${metaDesc}"`)
      console.log(c.dim`   Length: ${metaDesc.length} characters`)
    }

    // Suggested tags
    const suggestedTags = keywords
      .slice(0, 5)
      .map(kw => kw.keyword)
      .join(', ')

    console.log(c.bold`\n🏷️  Suggested Tags:\n`)
    console.log(c.dim`   ${suggestedTags}`)

    // Frontmatter suggestion
    console.log(c.bold`\n📋 Add to Frontmatter:\n`)
    console.log(c.yellow`---`)
    console.log(c.yellow`keywords: [${suggestedTags}]`)
    if (metaDesc) {
      console.log(c.yellow`description: "${metaDesc}"`)
    }
    console.log(c.yellow`---`)

    console.log()
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
