import fs from 'node:fs/promises'
import fg from 'fast-glob'
import c from 'ansis'

interface Stats {
  totalFiles: number
  totalWords: number
  totalCharacters: number
  avgWordsPerFile: number
  filesByCategory: Record<string, number>
  recentFiles: Array<{ path: string, modified: Date }>
  largestFiles: Array<{ path: string, words: number }>
}

async function getContentStats(): Promise<Stats> {
  const files = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
    '!README.md',
    '!**/node_modules/**',
  ])

  let totalWords = 0
  let totalCharacters = 0
  const filesByCategory: Record<string, number> = {}
  const fileDetails: Array<{ path: string, words: number, modified: Date }> = []

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8')
      const stat = await fs.stat(file)
      
      // Count words (simple approximation)
      const words = content.split(/\s+/).filter(Boolean).length
      totalWords += words
      totalCharacters += content.length

      // Categorize by folder
      const category = file.split('/')[0] || 'root'
      filesByCategory[category] = (filesByCategory[category] || 0) + 1

      fileDetails.push({
        path: file,
        words,
        modified: stat.mtime,
      })
    }
    catch (error) {
      // Skip files that can't be read
    }
  }

  // Sort by modification time
  const recentFiles = fileDetails
    .sort((a, b) => b.modified.getTime() - a.modified.getTime())
    .slice(0, 5)

  // Sort by word count
  const largestFiles = fileDetails
    .sort((a, b) => b.words - a.words)
    .slice(0, 5)

  return {
    totalFiles: files.length,
    totalWords,
    totalCharacters,
    avgWordsPerFile: Math.round(totalWords / files.length),
    filesByCategory,
    recentFiles,
    largestFiles,
  }
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Content Statistics Dashboard         ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  console.log(c.yellow`Analyzing content...\n`)

  const stats = await getContentStats()

  // Overall Stats
  console.log(c.bold`📊 Overall Statistics\n`)
  console.log(`   Total Files:        ${c.green(stats.totalFiles.toString())}`)
  console.log(`   Total Words:        ${c.green(stats.totalWords.toLocaleString())}`)
  console.log(`   Total Characters:   ${c.green(stats.totalCharacters.toLocaleString())}`)
  console.log(`   Avg Words/File:     ${c.green(stats.avgWordsPerFile.toString())}`)

  // By Category
  console.log(c.bold`\n📁 Files by Category\n`)
  const sortedCategories = Object.entries(stats.filesByCategory)
    .sort((a, b) => b[1] - a[1])
  
  for (const [category, count] of sortedCategories) {
    console.log(`   ${category.padEnd(20)} ${c.cyan(count.toString())} files`)
  }

  // Recent Files
  console.log(c.bold`\n📝 Recently Modified (Top 5)\n`)
  for (const file of stats.recentFiles) {
    const date = file.modified.toISOString().split('T')[0]
    console.log(`   ${c.dim(date)}  ${file.path}`)
  }

  // Largest Files
  console.log(c.bold`\n📚 Largest Files (Top 5)\n`)
  for (const file of stats.largestFiles) {
    console.log(`   ${c.yellow(file.words.toLocaleString().padStart(6))} words  ${file.path}`)
  }

  // Reading time estimate
  const avgReadingSpeed = 200 // words per minute
  const totalReadingTime = Math.round(stats.totalWords / avgReadingSpeed)
  const hours = Math.floor(totalReadingTime / 60)
  const minutes = totalReadingTime % 60

  console.log(c.bold`\n⏱️  Reading Time Estimate\n`)
  console.log(`   Total content would take approximately ${c.green(`${hours}h ${minutes}m`)} to read`)

  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

main().catch(console.error)
