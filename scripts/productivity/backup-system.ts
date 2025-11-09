import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import prompts from 'prompts'
import c from 'ansis'

const execAsync = promisify(exec)

async function createBackup(dirs: string[], backupDir: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const backupName = `backup-${timestamp}-${Date.now()}`
  const backupPath = path.join(backupDir, backupName)

  await fs.mkdir(backupPath, { recursive: true })

  let totalFiles = 0

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      console.log(c.yellow`⚠️  Skipping ${dir} (doesn't exist)`)
      continue
    }

    const destDir = path.join(backupPath, dir)
    await fs.mkdir(path.dirname(destDir), { recursive: true })

    // Copy directory recursively
    await fs.cp(dir, destDir, { recursive: true })
    
    // Count files
    const countFiles = async (dirPath: string): Promise<number> => {
      let count = 0
      const entries = await fs.readdir(dirPath, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          count += await countFiles(path.join(dirPath, entry.name))
        }
        else {
          count++
        }
      }
      return count
    }

    const fileCount = await countFiles(destDir)
    totalFiles += fileCount
    console.log(c.dim`  ✓ Backed up ${dir} (${fileCount} files)`)
  }

  // Create metadata file
  const metadata = {
    timestamp: new Date().toISOString(),
    directories: dirs,
    fileCount: totalFiles,
  }

  await fs.writeFile(
    path.join(backupPath, 'backup-info.json'),
    JSON.stringify(metadata, null, 2),
  )

  return backupPath
}

async function listBackups(backupDir: string): Promise<string[]> {
  if (!existsSync(backupDir)) {
    return []
  }

  const entries = await fs.readdir(backupDir, { withFileTypes: true })
  const backups = entries
    .filter(e => e.isDirectory() && e.name.startsWith('backup-'))
    .map(e => e.name)
    .sort()
    .reverse()

  return backups
}

async function restoreBackup(backupPath: string): Promise<void> {
  const metadataPath = path.join(backupPath, 'backup-info.json')
  if (!existsSync(metadataPath)) {
    throw new Error('Invalid backup: metadata not found')
  }

  const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'))

  console.log(c.yellow`\nRestoring backup from: ${metadata.timestamp}`)
  console.log(c.dim`Directories: ${metadata.directories.join(', ')}\n`)

  for (const dir of metadata.directories) {
    const sourcePath = path.join(backupPath, dir)
    if (existsSync(sourcePath)) {
      // Backup current state before restoring
      if (existsSync(dir)) {
        const tempBackup = `${dir}.pre-restore-${Date.now()}`
        await fs.rename(dir, tempBackup)
        console.log(c.dim`  Saved current ${dir} to ${tempBackup}`)
      }

      await fs.cp(sourcePath, dir, { recursive: true })
      console.log(c.green`  ✓ Restored ${dir}`)
    }
  }
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║          Backup System                         ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      { title: 'Create Backup', value: 'create' },
      { title: 'List Backups', value: 'list' },
      { title: 'Restore Backup', value: 'restore' },
    ],
  })

  if (!action) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  const backupDir = 'backups'

  if (action === 'create') {
    const { dirs } = await prompts({
      type: 'list',
      name: 'dirs',
      message: 'Directories to backup (comma-separated):',
      initial: 'upsc,guides,public/images',
      separator: ',',
    })

    if (!dirs || dirs.length === 0) {
      console.log(c.yellow`\nCancelled.`)
      return
    }

    console.log(c.yellow`\nCreating backup...\n`)

    try {
      const backupPath = await createBackup(dirs, backupDir)
      console.log(c.green`\n✓ Backup created successfully!`)
      console.log(c.dim`  Location: ${backupPath}`)
      console.log()
    }
    catch (error) {
      console.error(c.red`\n✗ Error creating backup: ${error}`)
    }
  }
  else if (action === 'list') {
    const backups = await listBackups(backupDir)

    if (backups.length === 0) {
      console.log(c.yellow`\nNo backups found.\n`)
      return
    }

    console.log(c.bold`\n📦 Available Backups:\n`)
    for (let i = 0; i < backups.length; i++) {
      const backupPath = path.join(backupDir, backups[i])
      const metadataPath = path.join(backupPath, 'backup-info.json')

      if (existsSync(metadataPath)) {
        const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'))
        console.log(c.cyan`${i + 1}. ${backups[i]}`)
        console.log(c.dim`   Date: ${new Date(metadata.timestamp).toLocaleString()}`)
        console.log(c.dim`   Files: ${metadata.fileCount}`)
        console.log(c.dim`   Dirs: ${metadata.directories.join(', ')}`)
        console.log()
      }
      else {
        console.log(c.dim`${i + 1}. ${backups[i]} (metadata missing)`)
      }
    }
  }
  else if (action === 'restore') {
    const backups = await listBackups(backupDir)

    if (backups.length === 0) {
      console.log(c.yellow`\nNo backups found.\n`)
      return
    }

    const { backupIndex } = await prompts({
      type: 'select',
      name: 'backupIndex',
      message: 'Select backup to restore:',
      choices: backups.map((b, i) => ({
        title: b,
        value: i,
      })),
    })

    if (backupIndex === undefined) {
      console.log(c.yellow`\nCancelled.`)
      return
    }

    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'This will replace current files. Continue?',
      initial: false,
    })

    if (!confirm) {
      console.log(c.yellow`\nCancelled.`)
      return
    }

    try {
      const backupPath = path.join(backupDir, backups[backupIndex])
      await restoreBackup(backupPath)
      console.log(c.green`\n✓ Backup restored successfully!\n`)
    }
    catch (error) {
      console.error(c.red`\n✗ Error restoring backup: ${error}`)
    }
  }
}

main().catch(console.error)
