import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'
import c from 'ansis'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

function extractTimeline(content: string): TimelineEvent[] {
  const events: TimelineEvent[] = []
  const lines = content.split('\n')

  // Pattern 1: **YYYY** - Event
  const pattern1 = /\*\*(\d{3,4}(?:\s*(?:BCE|CE|AD|BC))?)\*\*\s*[-–—]\s*(.+)/gi
  
  // Pattern 2: | Year | Event |
  const pattern2 = /\|\s*(\d{3,4}(?:\s*(?:BCE|CE|AD|BC))?)\s*\|\s*([^|]+)\s*\|/gi
  
  // Pattern 3: - **YYYY**: Event
  const pattern3 = /-\s*\*\*(\d{3,4}(?:\s*(?:BCE|CE|AD|BC))?)\*\*:\s*(.+)/gi

  for (const line of lines) {
    // Try pattern 1
    let match = pattern1.exec(line)
    if (match) {
      events.push({
        year: match[1].trim(),
        title: match[2].trim(),
        description: '',
      })
      continue
    }

    // Try pattern 2
    pattern2.lastIndex = 0
    match = pattern2.exec(line)
    if (match) {
      events.push({
        year: match[1].trim(),
        title: match[2].trim(),
        description: '',
      })
      continue
    }

    // Try pattern 3
    pattern3.lastIndex = 0
    match = pattern3.exec(line)
    if (match) {
      events.push({
        year: match[1].trim(),
        title: match[2].trim(),
        description: '',
      })
    }
  }

  return events
}

function generateTimelineComponent(events: TimelineEvent[]): string {
  const eventsJson = JSON.stringify(events, null, 2)
    .split('\n')
    .map(line => `  ${line}`)
    .join('\n')

  return `
<script setup>
const timelineEvents = ${eventsJson.trim()}
</script>

<div class="timeline-container my-8">
  <div 
    v-for="(event, idx) in timelineEvents" 
    :key="idx" 
    class="timeline-item flex gap-4 mb-6"
  >
    <div class="timeline-year flex-shrink-0 w-32 text-right">
      <span class="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
        {{ event.year }}
      </span>
    </div>
    
    <div class="timeline-line relative flex-shrink-0 w-px bg-gray-300 dark:bg-gray-700">
      <div class="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-primary-500"></div>
    </div>
    
    <div class="timeline-content flex-1 pb-8">
      <h3 class="text-lg font-semibold mb-2">{{ event.title }}</h3>
      <p v-if="event.description" class="text-gray-600 dark:text-gray-400">
        {{ event.description }}
      </p>
    </div>
  </div>
</div>

<style scoped>
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item:last-child .timeline-content {
  padding-bottom: 0;
}
</style>
`
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Timeline Generator                    ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { inputFile } = await prompts({
    type: 'text',
    name: 'inputFile',
    message: 'Markdown file to extract timeline from:',
  })

  if (!inputFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  try {
    const content = await fs.readFile(inputFile, 'utf-8')
    const events = extractTimeline(content)

    if (events.length === 0) {
      console.log(c.yellow`\n⚠️  No timeline events found!`)
      console.log(c.dim`\nSupported formats:`)
      console.log(c.dim`  - **1757** - Battle of Plassey`)
      console.log(c.dim`  - | 1757 | Battle of Plassey |`)
      console.log(c.dim`  - - **1757**: Battle of Plassey`)
      return
    }

    console.log(c.green`\n✓ Found ${events.length} timeline event(s):\n`)
    for (const event of events) {
      console.log(c.dim`  ${event.year.padEnd(15)} ${event.title}`)
    }

    const { outputFormat } = await prompts({
      type: 'select',
      name: 'outputFormat',
      message: 'Output format:',
      choices: [
        { title: 'Vue Component', value: 'vue' },
        { title: 'Markdown Table', value: 'markdown' },
        { title: 'JSON', value: 'json' },
      ],
    })

    if (!outputFormat) {
      return
    }

    let output = ''

    if (outputFormat === 'vue') {
      output = generateTimelineComponent(events)
    }
    else if (outputFormat === 'markdown') {
      output = '\n## Timeline\n\n'
      output += '| Year | Event |\n'
      output += '|------|-------|\n'
      for (const event of events) {
        output += `| ${event.year} | ${event.title} |\n`
      }
    }
    else {
      output = JSON.stringify(events, null, 2)
    }

    const { saveFile } = await prompts({
      type: 'text',
      name: 'saveFile',
      message: 'Save to file (or press Enter to display):',
      initial: '',
    })

    if (saveFile) {
      await fs.writeFile(saveFile, output)
      console.log(c.green`\n✓ Timeline saved to: ${saveFile}`)
    }
    else {
      console.log(c.yellow`\n📋 Generated Timeline:\n`)
      console.log(output)
    }
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
