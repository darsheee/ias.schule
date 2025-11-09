import fs from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import prompts from 'prompts'
import c from 'ansis'

async function convertCsvToMarkdown(csvPath: string, options: any = {}) {
  // Read CSV file
  const csvContent = await fs.readFile(csvPath, 'utf-8')
  
  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })

  if (records.length === 0) {
    throw new Error('CSV file is empty')
  }

  // Get headers
  const headers = Object.keys(records[0])
  
  // Build markdown table
  let markdown = '\n'
  
  // Add table class if requested
  if (options.styled) {
    markdown += '<div class="table-container">\n\n'
  }
  
  // Header row
  markdown += `| ${headers.join(' | ')} |\n`
  
  // Separator row
  markdown += `|${headers.map(() => '---').join('|')}|\n`
  
  // Data rows
  for (const record of records) {
    const row = headers.map(header => record[header] || '')
    markdown += `| ${row.join(' | ')} |\n`
  }
  
  if (options.styled) {
    markdown += '\n</div>\n'
  }
  
  markdown += '\n'
  
  return {
    markdown,
    rowCount: records.length,
    columnCount: headers.length,
  }
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║     CSV to Markdown Table Converter           ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { csvFile } = await prompts({
    type: 'text',
    name: 'csvFile',
    message: 'CSV file path:',
  })

  if (!csvFile) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const { styled } = await prompts({
    type: 'confirm',
    name: 'styled',
    message: 'Add styling wrapper?',
    initial: true,
  })

  const { outputFile } = await prompts({
    type: 'text',
    name: 'outputFile',
    message: 'Output markdown file (optional, or will copy to clipboard):',
    initial: '',
  })

  try {
    console.log(c.yellow`\nConverting...`)
    
    const result = await convertCsvToMarkdown(csvFile, { styled })
    
    console.log(c.green`\n✓ Conversion successful!`)
    console.log(c.dim`  Rows: ${result.rowCount}`)
    console.log(c.dim`  Columns: ${result.columnCount}`)
    
    if (outputFile) {
      await fs.writeFile(outputFile, result.markdown)
      console.log(c.green`✓ Saved to: ${outputFile}`)
    }
    else {
      console.log(c.yellow`\n📋 Copy this markdown:\n`)
      console.log(result.markdown)
    }
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
  }
}

main().catch(console.error)
