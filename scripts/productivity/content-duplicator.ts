import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'
import c from 'ansis'

async function duplicateContent(
  templateFile: string,
  count: number,
  pattern: string,
  outputDir: string,
  replacements: Record<string, string>,
): Promise<string[]> {
  const created: string[] = []
  const template = await fs.readFile(templateFile, 'utf-8')

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true })

  for (let i = 1; i <= count; i++) {
    // Replace {n} with current number
    let filename = pattern.replace(/{n}/g, i.toString())
    let content = template

    // Apply replacements
    for (const [key, value] of Object.entries(replacements)) {
      const replaceValue = value.replace(/{n}/g, i.toString())
      content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), replaceValue)
      filename = filename.replace(new RegExp(`\\{${key}\\}`, 'g'), replaceValue)
    }

    // Replace remaining {n} in content
    content = content.replace(/{n}/g, i.toString())

    const filepath = path.join(outputDir, `${filename}.md`)
    await fs.writeFile(filepath, content)
    created.push(filepath)
  }

  return created
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Content Duplicator                    ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { templateFile } = await prompts({
    type: 'text',
    name: 'templateFile',
    message: 'Template file path:',
  })

  if (!templateFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const { count } = await prompts({
    type: 'number',
    name: 'count',
    message: 'How many copies to create?',
    initial: 5,
    min: 1,
  })

  if (!count) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const { pattern } = await prompts({
    type: 'text',
    name: 'pattern',
    message: 'Filename pattern (use {n} for number):',
    initial: 'article-{n}',
  })

  if (!pattern) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const { outputDir } = await prompts({
    type: 'text',
    name: 'outputDir',
    message: 'Output directory:',
    initial: 'generated',
  })

  if (!outputDir) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  console.log(c.yellow`\n💡 In your template, use placeholders like {n}, {title}, {date}\n`)

  const { addReplacements } = await prompts({
    type: 'confirm',
    name: 'addReplacements',
    message: 'Add custom replacements?',
    initial: false,
  })

  const replacements: Record<string, string> = {}

  if (addReplacements) {
    let addMore = true
    while (addMore) {
      const { key } = await prompts({
        type: 'text',
        name: 'key',
        message: 'Placeholder name (without {}):',
      })

      if (!key) {
        break
      }

      const { value } = await prompts({
        type: 'text',
        name: 'value',
        message: `Value for {${key}} (use {n} for number):`,
      })

      if (value) {
        replacements[key] = value
      }

      const { more } = await prompts({
        type: 'confirm',
        name: 'more',
        message: 'Add another replacement?',
        initial: false,
      })

      addMore = more
    }
  }

  try {
    console.log(c.yellow`\nCreating ${count} files...\n`)

    const created = await duplicateContent(
      templateFile,
      count,
      pattern,
      outputDir,
      replacements,
    )

    console.log(c.green`\n✓ Created ${created.length} file(s):\n`)
    for (const file of created.slice(0, 10)) {
      console.log(c.dim`  ${file}`)
    }
    if (created.length > 10) {
      console.log(c.dim`  ... and ${created.length - 10} more`)
    }

    console.log(c.cyan`\n💡 Files created in: ${outputDir}/`)
    console.log()
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
