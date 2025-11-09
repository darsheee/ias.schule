import fs from 'node:fs/promises'
import prompts from 'prompts'
import c from 'ansis'

interface Fact {
  label: string
  value: string
}

function extractFacts(content: string): Fact[] {
  const facts: Fact[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    // Pattern: - **Label**: Value
    const match = line.match(/^[-*]\s+\*\*([^:*]+)\*\*:\s*(.+)/)
    if (match) {
      facts.push({
        label: match[1].trim(),
        value: match[2].trim(),
      })
    }
  }

  return facts
}

function generateFactBox(facts: Fact[], title: string): string {
  return `
<div class="fact-box my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-md border border-blue-200 dark:border-blue-800">
  <h3 class="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">${title}</h3>
  <div class="space-y-3">
${facts.map(fact => `    <div class="flex items-start gap-3">
      <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded text-sm font-semibold min-w-[120px]">
        ${fact.label}
      </span>
      <span class="text-gray-700 dark:text-gray-300 flex-1">
        ${fact.value}
      </span>
    </div>`).join('\n')}
  </div>
</div>
`
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Quick Facts Box Generator             ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { inputFile } = await prompts({
    type: 'text',
    name: 'inputFile',
    message: 'Markdown file with facts:',
  })

  if (!inputFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  try {
    const content = await fs.readFile(inputFile, 'utf-8')
    const facts = extractFacts(content)

    if (facts.length === 0) {
      console.log(c.yellow`\n⚠️  No facts found!`)
      console.log(c.dim`\nExpected format:`)
      console.log(c.dim`  - **Founded**: 322 BCE`)
      console.log(c.dim`  - **Capital**: Pataliputra`)
      console.log(c.dim`  - **Founder**: Chandragupta Maurya`)
      return
    }

    console.log(c.green`\n✓ Found ${facts.length} fact(s):\n`)
    for (const fact of facts) {
      console.log(c.dim`  ${fact.label.padEnd(20)}: ${fact.value}`)
    }

    const { title } = await prompts({
      type: 'text',
      name: 'title',
      message: 'Fact box title:',
      initial: 'Quick Facts',
    })

    if (!title) {
      return
    }

    const factBox = generateFactBox(facts, title)

    const { saveFile } = await prompts({
      type: 'text',
      name: 'saveFile',
      message: 'Save to file (or press Enter to display):',
      initial: '',
    })

    if (saveFile) {
      await fs.writeFile(saveFile, factBox)
      console.log(c.green`\n✓ Fact box saved to: ${saveFile}`)
    }
    else {
      console.log(c.yellow`\n📋 Generated Fact Box:\n`)
      console.log(factBox)
    }

    console.log(c.cyan`\n💡 Tip: Copy this HTML into your markdown file!`)
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
