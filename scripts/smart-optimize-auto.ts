import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import c from 'ansis'

const execAsync = promisify(exec)

async function main() {
  console.log(c.yellow`\n💾 Checking for unsaved changes...\n`)
  
  // This will work if you have VS Code command line tools installed
  try {
    // Try to save all files via VS Code CLI
    await execAsync('code --command workbench.action.files.saveAll')
    console.log(c.green`✓ Saved all files\n`)
  }
  catch {
    console.log(c.yellow`⚠️  Could not auto-save. Please save manually (Ctrl+S)\n`)
  }
  
  // Wait a moment for saves to complete
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log(c.cyan`🚀 Running smart optimizer...\n`)
  
  // Run the optimizer
  try {
    const { stdout, stderr } = await execAsync('tsx scripts/smart-image-processor-v2.ts')
    console.log(stdout)
    if (stderr) {
      console.error(stderr)
    }
  }
  catch (error: any) {
    console.error(c.red`\n✗ Error: ${error.message}`)
    process.exit(1)
  }
}

main().catch(console.error)
