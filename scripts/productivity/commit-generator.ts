import { simpleGit } from 'simple-git'
import c from 'ansis'

async function generateCommitMessage(): Promise<string> {
  const git = simpleGit()
  
  // Get status
  const status = await git.status()
  
  if (status.files.length === 0) {
    return 'No changes to commit'
  }

  // Categorize changes
  const added = status.files.filter(f => f.index === 'A' || f.index === '?')
  const modified = status.files.filter(f => f.index === 'M')
  const deleted = status.files.filter(f => f.index === 'D')
  
  // Analyze file types
  const markdownFiles = status.files.filter(f => f.path.endsWith('.md'))
  const imageFiles = status.files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f.path))
  const configFiles = status.files.filter(f => /\.(json|ts|js|vue)$/i.test(f.path))
  
  // Extract topics from markdown files
  const topics = new Set<string>()
  for (const file of markdownFiles) {
    const parts = file.path.split('/')
    if (parts.includes('upsc')) {
      const upscIndex = parts.indexOf('upsc')
      if (parts[upscIndex + 2]) {
        topics.add(parts[upscIndex + 2].replace(/-/g, ' '))
      }
    }
    else if (parts.length > 1) {
      topics.add(parts[0])
    }
  }

  // Generate message
  let message = ''
  
  // Main action
  if (added.length > 0 && modified.length === 0 && deleted.length === 0) {
    message = 'Add '
  }
  else if (modified.length > 0 && added.length === 0 && deleted.length === 0) {
    message = 'Update '
  }
  else if (deleted.length > 0 && added.length === 0 && modified.length === 0) {
    message = 'Remove '
  }
  else {
    message = 'Update '
  }

  // Content type
  if (markdownFiles.length > 0) {
    if (topics.size > 0) {
      message += Array.from(topics).join(' and ') + ' content'
    }
    else {
      message += 'content'
    }
  }
  else if (imageFiles.length > 0) {
    message += 'images'
  }
  else if (configFiles.length > 0) {
    message += 'configuration'
  }
  else {
    message += 'files'
  }

  // Add details
  if (imageFiles.length > 0 && markdownFiles.length > 0) {
    message += ' with images'
  }

  // Add file count if significant
  if (status.files.length > 5) {
    message += ` (${status.files.length} files)`
  }

  return message
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Git Commit Message Generator          ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  try {
    const git = simpleGit()
    const status = await git.status()

    if (status.files.length === 0) {
      console.log(c.yellow`\n⚠️  No changes to commit\n`)
      return
    }

    console.log(c.bold`📊 Changed Files:\n`)
    
    // Show files by category
    const added = status.files.filter(f => f.index === 'A' || f.index === '?')
    const modified = status.files.filter(f => f.index === 'M')
    const deleted = status.files.filter(f => f.index === 'D')

    if (added.length > 0) {
      console.log(c.green`  Added (${added.length}):`)
      for (const file of added.slice(0, 5)) {
        console.log(c.dim`    + ${file.path}`)
      }
      if (added.length > 5) {
        console.log(c.dim`    ... and ${added.length - 5} more`)
      }
      console.log()
    }

    if (modified.length > 0) {
      console.log(c.yellow`  Modified (${modified.length}):`)
      for (const file of modified.slice(0, 5)) {
        console.log(c.dim`    ~ ${file.path}`)
      }
      if (modified.length > 5) {
        console.log(c.dim`    ... and ${modified.length - 5} more`)
      }
      console.log()
    }

    if (deleted.length > 0) {
      console.log(c.red`  Deleted (${deleted.length}):`)
      for (const file of deleted.slice(0, 5)) {
        console.log(c.dim`    - ${file.path}`)
      }
      if (deleted.length > 5) {
        console.log(c.dim`    ... and ${deleted.length - 5} more`)
      }
      console.log()
    }

    // Generate message
    const suggestedMessage = await generateCommitMessage()

    console.log(c.bold`💡 Suggested Commit Message:\n`)
    console.log(c.green`  "${suggestedMessage}"`)
    console.log()

    console.log(c.yellow`📋 To commit with this message:\n`)
    console.log(c.dim`  git add .`)
    console.log(c.dim`  git commit -m "${suggestedMessage}"`)
    console.log()

    // Alternative messages
    console.log(c.dim`💭 Alternative messages:`)
    console.log(c.dim`  "Update ${Array.from(new Set(status.files.map(f => f.path.split('/')[0]))).join(', ')}"`)
    console.log(c.dim`  "Add new content and improvements"`)
    console.log()
  }
  catch (error) {
    console.error(c.red`\n✗ Error: ${error}`)
    console.log(c.yellow`\nMake sure you're in a git repository!`)
  }
}

main().catch(console.error)
