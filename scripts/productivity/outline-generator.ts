import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'
import c from 'ansis'

const outlineTemplates = {
  'emperor': {
    sections: [
      '## Early Life',
      '### Birth and Family',
      '### Education and Training',
      '',
      '## Rise to Power',
      '### Path to Throne',
      '### Challenges Faced',
      '',
      '## Reign',
      '### Major Events',
      '### Administrative Reforms',
      '### Military Campaigns',
      '### Cultural Contributions',
      '',
      '## Personal Life',
      '',
      '## Legacy',
      '### Immediate Impact',
      '### Historical Significance',
      '',
      '## Timeline',
      '',
      '## Related Topics',
    ],
  },
  'battle': {
    sections: [
      '## Background',
      '### Political Situation',
      '### Causes',
      '',
      '## Opposing Forces',
      '### Side 1',
      '### Side 2',
      '',
      '## Battle Sequence',
      '### Initial Positions',
      '### Key Phases',
      '### Turning Point',
      '',
      '## Outcome',
      '### Immediate Results',
      '### Casualties',
      '### Treaty/Agreement',
      '',
      '## Significance',
      '### Military Impact',
      '### Political Impact',
      '### Long-term Consequences',
      '',
      '## Timeline',
      '',
      '## Sources',
    ],
  },
  'dynasty': {
    sections: [
      '## Foundation',
      '### Origins',
      '### Founder',
      '',
      '## Major Rulers',
      '### Early Period',
      '### Golden Age',
      '### Decline Period',
      '',
      '## Administration',
      '### Central Government',
      '### Provincial System',
      '### Revenue System',
      '',
      '## Military',
      '### Army Organization',
      '### Major Campaigns',
      '',
      '## Culture & Society',
      '### Religion',
      '### Architecture',
      '### Literature & Arts',
      '### Economy',
      '',
      '## Decline & Fall',
      '### Internal Factors',
      '### External Factors',
      '',
      '## Legacy',
      '',
      '## Timeline',
      '',
      '## Related Topics',
    ],
  },
  'topic': {
    sections: [
      '## Overview',
      '',
      '## Historical Background',
      '',
      '## Key Concepts',
      '',
      '## Important Points',
      '',
      '## Significance',
      '',
      '## Current Relevance',
      '',
      '## Related Topics',
      '',
      '## For UPSC',
      '### Previous Year Questions',
      '### Key Points to Remember',
    ],
  },
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Content Outline Generator             ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { type } = await prompts({
    type: 'select',
    name: 'type',
    message: 'What type of content?',
    choices: [
      { title: 'Emperor/Ruler', value: 'emperor' },
      { title: 'Battle/War', value: 'battle' },
      { title: 'Dynasty/Empire', value: 'dynasty' },
      { title: 'General Topic', value: 'topic' },
    ],
  })

  if (!type) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const { title } = await prompts({
    type: 'text',
    name: 'title',
    message: 'Topic title:',
  })

  if (!title) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const template = outlineTemplates[type as keyof typeof outlineTemplates]
  const outline = [
    `# ${title}`,
    '',
    ...template.sections,
  ].join('\n')

  const { saveFile } = await prompts({
    type: 'text',
    name: 'saveFile',
    message: 'Save to file:',
    initial: `${title.toLowerCase().replace(/\s+/g, '-')}-outline.md`,
  })

  if (saveFile) {
    await fs.writeFile(saveFile, outline)
    console.log(c.green`\n✓ Outline saved to: ${saveFile}`)
    console.log(c.dim`\nSections created: ${template.sections.filter(s => s.startsWith('#')).length}`)
  }
  else {
    console.log(c.yellow`\n📋 Generated Outline:\n`)
    console.log(outline)
  }
}

main().catch(console.error)
