import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { encode as blurhashEncode } from 'blurhash'
import c from 'ansis'
import fg from 'fast-glob'
import sharp from 'sharp'
import { compressSharp } from './img-compress'

interface ImageInfo {
  originalPath: string
  filename: string
  markdownFile: string
  lineNumber: number
  lineContent: string
}

// Convert filename to human-readable alt text
function filenameToAltText(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace hyphens/underscores with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
    .join(' ')
}

// Generate folder path based on markdown file location
function generateImagePath(markdownPath: string, imageFilename: string): string {
  // Extract path structure from markdown file
  // Example: upsc/gs1/modern-history/british-entry.md
  // -> public/images/upsc/gs1/modern-history/british-entry/
  
  const relativePath = markdownPath
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
  
  // Remove leading parts
  const pathParts = relativePath.split('/')
  
  // Create organized path
  let imagePath = 'public/images'
  
  // Add path based on content structure
  if (pathParts.includes('upsc')) {
    const upscIndex = pathParts.indexOf('upsc')
    const relevantParts = pathParts.slice(upscIndex)
    imagePath = path.join(imagePath, ...relevantParts)
  }
  else {
    // For other files, use parent directory name
    const parentDir = path.basename(path.dirname(markdownPath))
    imagePath = path.join(imagePath, parentDir)
  }
  
  return path.join(imagePath, imageFilename)
}

// Generate blurhash for an image
async function generateBlurhash(imagePath: string): Promise<string> {
  const buffer = await fs.readFile(imagePath)
  const img = sharp(buffer)
  const { data, info } = await img
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'cover' })
    .toBuffer({ resolveWithObject: true })

  return blurhashEncode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4,
  )
}

// Find all markdown files with image references
async function findMarkdownFilesWithImages(): Promise<ImageInfo[]> {
  const images: ImageInfo[] = []
  
  // Find all markdown files
  const markdownFiles = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
    '!README.md',
  ])

  for (const mdFile of markdownFiles) {
    const content = await fs.readFile(mdFile, 'utf-8')
    const lines = content.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Match markdown images: ![](image.jpg) or ![alt](image.jpg)
      const mdImageRegex = /!\[([^\]]*)\]\(([^)]+\.(?:jpg|jpeg|png|webp))\)/gi
      let match
      
      while ((match = mdImageRegex.exec(line)) !== null) {
        const imagePath = match[2]
        
        // Check if it's a local file (not a URL)
        if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
          const fullImagePath = path.join(path.dirname(mdFile), imagePath)
          
          if (existsSync(fullImagePath)) {
            images.push({
              originalPath: fullImagePath,
              filename: path.basename(imagePath),
              markdownFile: mdFile,
              lineNumber: i,
              lineContent: line,
            })
          }
        }
      }
      
      // Also match HTML img tags: <img src="image.jpg">
      const htmlImageRegex = /<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/gi
      
      while ((match = htmlImageRegex.exec(line)) !== null) {
        const imagePath = match[1]
        
        if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
          const fullImagePath = path.join(path.dirname(mdFile), imagePath)
          
          if (existsSync(fullImagePath)) {
            images.push({
              originalPath: fullImagePath,
              filename: path.basename(imagePath),
              markdownFile: mdFile,
              lineNumber: i,
              lineContent: line,
            })
          }
        }
      }
    }
  }
  
  return images
}

// Process a single image
async function processImage(info: ImageInfo) {
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.bold`Processing: ${c.yellow(info.filename)}`)
  console.log(c.dim`From: ${info.markdownFile}`)
  
  try {
    // 1. Generate destination path
    const destPath = generateImagePath(info.markdownFile, info.filename)
    const destDir = path.dirname(destPath)
    
    console.log(c.dim`Target: ${destPath}`)
    
    // 2. Create destination directory
    await fs.mkdir(destDir, { recursive: true })
    console.log(c.green`✓ Created directory: ${destDir}`)
    
    // 3. Read and compress image
    const buffer = await fs.readFile(info.originalPath)
    const image = sharp(buffer)
    const compressed = await compressSharp(image, buffer, info.originalPath, destPath)
    
    // 4. Save compressed image
    await fs.writeFile(destPath, compressed.outBuffer)
    console.log(c.green`✓ Compressed: ${bytesToHuman(compressed.size)} → ${bytesToHuman(compressed.outSize)} (${(compressed.percent * 100).toFixed(1)}%)`)
    
    // 5. Generate blurhash
    const blurhash = await generateBlurhash(destPath)
    console.log(c.green`✓ Generated blurhash: ${c.dim(blurhash.substring(0, 20))}...`)
    
    // 6. Generate alt text from filename
    const altText = filenameToAltText(info.filename)
    console.log(c.green`✓ Generated alt text: "${altText}"`)
    
    // 7. Create optimized markdown code
    const publicPath = destPath.replace(/\\/g, '/').replace('public', '')
    const newMarkdown = `<OptimizedImage 
  src="${publicPath}" 
  alt="${altText}"
  blurhash="${blurhash}"
/>`
    
    console.log(c.green`✓ Generated markdown code`)
    
    // 8. Update markdown file
    const mdContent = await fs.readFile(info.markdownFile, 'utf-8')
    const lines = mdContent.split('\n')
    
    // Replace the line with new markdown
    lines[info.lineNumber] = lines[info.lineNumber].replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      newMarkdown,
    ).replace(
      /<img[^>]+src=["']([^"']+)["'][^>]*>/g,
      newMarkdown,
    )
    
    await fs.writeFile(info.markdownFile, lines.join('\n'))
    console.log(c.green`✓ Updated markdown file`)
    
    // 9. Delete original image
    await fs.unlink(info.originalPath)
    console.log(c.green`✓ Removed original image from: ${info.originalPath}`)
    
    console.log(c.bold.green`\n✨ SUCCESS!`)
    console.log(c.dim`New image location: ${publicPath}`)
    
    return {
      success: true,
      publicPath,
      altText,
      blurhash,
      compression: compressed.percent,
    }
  }
  catch (error) {
    console.error(c.red`\n✗ ERROR: ${error}`)
    return {
      success: false,
      error,
    }
  }
}

function bytesToHuman(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / 1024 ** i).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`.padStart(10, ' ')
}

// Main execution
async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║     Smart Image Processor - Auto Optimization         ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════════════╝\n`)
  
  console.log(c.yellow`Scanning for images in markdown files...\n`)
  
  const images = await findMarkdownFilesWithImages()
  
  if (images.length === 0) {
    console.log(c.green`\n✓ No images to process. All markdown files are using optimized images!`)
    console.log(c.dim`\nTo use this script:`)
    console.log(c.dim`1. Place raw image in same folder as markdown file`)
    console.log(c.dim`2. Reference it: ![](ashoka.jpg)`)
    console.log(c.dim`3. Run: pnpm run smart:optimize`)
    return
  }
  
  console.log(c.bold`Found ${c.yellow(images.length)} image(s) to process:\n`)
  
  images.forEach((img, idx) => {
    console.log(`${idx + 1}. ${c.yellow(img.filename)} ${c.dim`in`} ${img.markdownFile}`)
  })
  
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
  
  // Process all images
  const results = []
  for (const img of images) {
    const result = await processImage(img)
    results.push(result)
  }
  
  // Summary
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.bold.green`\n🎉 PROCESSING COMPLETE!\n`)
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(c.green`✓ Successful: ${successful}`)
  if (failed > 0) {
    console.log(c.red`✗ Failed: ${failed}`)
  }
  
  console.log(c.dim`\nAll images have been:`)
  console.log(c.dim`  • Moved to organized folders`)
  console.log(c.dim`  • Compressed for optimal size`)
  console.log(c.dim`  • Enhanced with blurhash`)
  console.log(c.dim`  • Updated in markdown files`)
  console.log(c.dim`  • Given descriptive alt text`)
  
  console.log(c.bold.cyan`\n✨ Your content is now fully optimized! ✨\n`)
}

main().catch(console.error)
