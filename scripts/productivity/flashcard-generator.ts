import fs from 'node:fs/promises'
import prompts from 'prompts'
import c from 'ansis'

interface Flashcard {
  question: string
  answer: string
}

function extractFlashcards(content: string): Flashcard[] {
  const cards: Flashcard[] = []
  const lines = content.split('\n')

  let currentQuestion = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Look for heading followed by content
    if (line.match(/^##\s+(.+\?)/)) {
      currentQuestion = line.replace(/^##\s+/, '').trim()
      
      // Get next non-empty line as answer
      for (let j = i + 1; j < lines.length; j++) {
        const answerLine = lines[j].trim()
        if (answerLine && !answerLine.startsWith('#')) {
          cards.push({
            question: currentQuestion,
            answer: answerLine,
          })
          currentQuestion = ''
          break
        }
      }
    }
  }

  return cards
}

function generateAnkiCSV(cards: Flashcard[]): string {
  let csv = '"Question","Answer"\n'
  for (const card of cards) {
    const q = card.question.replace(/"/g, '""')
    const a = card.answer.replace(/"/g, '""')
    csv += `"${q}","${a}"\n`
  }
  return csv
}

function generateJSON(cards: Flashcard[]): string {
  return JSON.stringify({ flashcards: cards }, null, 2)
}

function generateMarkdown(cards: Flashcard[]): string {
  let md = '# Flashcards\n\n'
  for (let i = 0; i < cards.length; i++) {
    md += `## Card ${i + 1}\n\n`
    md += `**Q:** ${cards[i].question}\n\n`
    md += `**A:** ${cards[i].answer}\n\n`
    md += '---\n\n'
  }
  return md
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Flashcard Generator                   ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { inputFile } = await prompts({
    type: 'text',
    name: 'inputFile',
    message: 'Markdown file with Q&A:',
  })

  if (!inputFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  try {
    const content = await fs.readFile(inputFile, 'utf-8')
    const cards = extractFlashcards(content)

    if (cards.length === 0) {
      console.log(c.yellow`\n⚠️  No Q&A found!`)
      console.log(c.dim`\nExpected format:`)
      console.log(c.dim`  ## Who founded the Mauryan Empire?`)
      console.log(c.dim`  Chandragupta Maurya in 322 BCE`)
      console.log(c.dim`  `)
      console.log(c.dim`  ## What was the capital?`)
      console.log(c.dim`  Pataliputra`)
      return
    }

    console.log(c.green`\n✓ Found ${cards.length} flashcard(s):\n`)
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      console.log(c.dim`  Q: ${cards[i].question}`)
      console.log(c.dim`  A: ${cards[i].answer.substring(0, 60)}${cards[i].answer.length > 60 ? '...' : ''}`)
      console.log()
    }
    if (cards.length > 3) {
      console.log(c.dim`  ... and ${cards.length - 3} more\n`)
    }

    const { format } = await prompts({
      type: 'select',
      name: 'format',
      message: 'Output format:',
      choices: [
        { title: 'Anki CSV (import to Anki)', value: 'anki' },
        { title: 'JSON', value: 'json' },
        { title: 'Markdown', value: 'markdown' },
      ],
    })

    if (!format) {
      return
    }

    let output = ''
    let extension = ''

    if (format === 'anki') {
      output = generateAnkiCSV(cards)
      extension = '.csv'
    }
    else if (format === 'json') {
      output = generateJSON(cards)
      extension = '.json'
    }
    else {
      output = generateMarkdown(cards)
      extension = '.md'
    }

    const { saveFile } = await prompts({
      type: 'text',
      name: 'saveFile',
      message: 'Save to file:',
      initial: `flashcards${extension}`,
    })

    if (saveFile) {
      await fs.writeFile(saveFile, output)
      console.log(c.green`\n✓ Flashcards saved to: ${saveFile}`)
      
      if (format === 'anki') {
        console.log(c.yellow`\n💡 Import to Anki: File → Import → Select ${saveFile}`)
      }
    }
    else {
      console.log(c.yellow`\n📋 Generated Flashcards:\n`)
      console.log(output)
    }
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
