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
  destPath: string
  publicPath: string
  altText: string
  blurhash: string
  lineNumber: number
}

interface ImageGroup {
  markdownFile: string
  images: ImageInfo[]
  startLine: number
  endLine: number
  count: number
}

// Convert filename to human-readable alt text
function filenameToAltText(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Generate folder path based on markdown file location
function generateImagePath(markdownPath: string, imageFilename: string): string {
  const relativePath = markdownPath
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
  
  const pathParts = relativePath.split('/')
  let imagePath = 'public/images'
  
  if (pathParts.includes('upsc')) {
    const upscIndex = pathParts.indexOf('upsc')
    const relevantParts = pathParts.slice(upscIndex)
    imagePath = path.join(imagePath, ...relevantParts)
  }
  else {
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

// Get gallery classes based on image count
function getGalleryClasses(count: number): string {
  switch (count) {
    case 1:
      return 'my-8 flex justify-center'
    case 2:
      return 'grid grid-cols-1 md:grid-cols-2 gap-4 my-8'
    case 3:
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8'
    case 4:
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8'
    default:
      // For 5+ images, use a flexible grid
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8'
  }
}

// Get image wrapper classes based on count
function getImageClasses(count: number): string {
  if (count === 1) {
    return 'rounded-lg shadow-lg max-w-4xl'
  }
  return 'rounded-lg shadow-md w-full'
}

// Find consecutive images in markdown files
async function findImageGroups(): Promise<Map<string, ImageGroup[]>> {
  const fileGroups = new Map<string, ImageGroup[]>()
  
  const markdownFiles = await fg([
    '**/*.md',
    '!node_modules/**',
    '!.vitepress/**',
    '!README.md',
  ])

  for (const mdFile of markdownFiles) {
    const content = await fs.readFile(mdFile, 'utf-8')
    const lines = content.split('\n')
    
    const groups: ImageGroup[] = []
    let currentGroup: { images: any[], startLine: number, lines: number[] } | null = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Check if line contains an image reference
      const mdImageRegex = /!\[([^\]]*)\]\(([^)]+\.(?:jpg|jpeg|png|webp))\)/i
      const htmlImageRegex = /<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/i
      
      const mdMatch = mdImageRegex.exec(line)
      const htmlMatch = htmlImageRegex.exec(line)
      
      if (mdMatch || htmlMatch) {
        const imagePath = mdMatch ? mdMatch[2] : (htmlMatch ? htmlMatch[1] : '')
        
        // Check if it's a local file
        if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
          const fullImagePath = path.join(path.dirname(mdFile), imagePath)
          
          if (existsSync(fullImagePath)) {
            // Start new group or add to current
            if (!currentGroup) {
              currentGroup = { images: [], startLine: i, lines: [] }
            }
            
            currentGroup.images.push({
              originalPath: fullImagePath,
              filename: path.basename(imagePath),
              lineNumber: i,
            })
            currentGroup.lines.push(i)
          }
        }
      }
      else if (currentGroup && line.length > 0 && !line.startsWith('#')) {
        // If we hit non-empty, non-heading content, finalize current group
        if (currentGroup.images.length > 0) {
          groups.push({
            markdownFile: mdFile,
            images: [],
            startLine: currentGroup.startLine,
            endLine: currentGroup.lines[currentGroup.lines.length - 1],
            count: currentGroup.images.length,
          })
          
          // Store the raw image info for processing
          for (const img of currentGroup.images) {
            (groups[groups.length - 1].images as any[]).push(img)
          }
        }
        currentGroup = null
      }
    }
    
    // Finalize any remaining group
    if (currentGroup && currentGroup.images.length > 0) {
      groups.push({
        markdownFile: mdFile,
        images: [],
        startLine: currentGroup.startLine,
        endLine: currentGroup.lines[currentGroup.lines.length - 1],
        count: currentGroup.images.length,
      })
      
      for (const img of currentGroup.images) {
        (groups[groups.length - 1].images as any[]).push(img)
      }
    }
    
    if (groups.length > 0) {
      fileGroups.set(mdFile, groups)
    }
  }
  
  return fileGroups
}

// Process a single image
async function processImage(imageInfo: any, markdownFile: string): Promise<ImageInfo> {
  const destPath = generateImagePath(markdownFile, imageInfo.filename)
  const destDir = path.dirname(destPath)
  
  // Create directory
  await fs.mkdir(destDir, { recursive: true })
  
  // Compress image
  const buffer = await fs.readFile(imageInfo.originalPath)
  const image = sharp(buffer)
  const compressed = await compressSharp(image, buffer, imageInfo.originalPath, destPath)
  
  // Save compressed image
  await fs.writeFile(destPath, compressed.outBuffer)
  
  // Generate blurhash
  const blurhash = await generateBlurhash(destPath)
  
  // Generate alt text
  const altText = filenameToAltText(imageInfo.filename)
  
  // Public path
  const publicPath = destPath.replace(/\\/g, '/').replace('public', '')
  
  return {
    originalPath: imageInfo.originalPath,
    filename: imageInfo.filename,
    destPath,
    publicPath,
    altText,
    blurhash,
    lineNumber: imageInfo.lineNumber,
  }
}

// Generate markdown for image group
function generateGroupMarkdown(images: ImageInfo[], count: number): string {
  const galleryClasses = getGalleryClasses(count)
  const imageClasses = getImageClasses(count)
  
  if (count === 1) {
    // Single image - centered with nice styling
    return `<div class="${galleryClasses}">
  <OptimizedImage 
    src="${images[0].publicPath}" 
    alt="${images[0].altText}"
    blurhash="${images[0].blurhash}"
    class="${imageClasses}"
  />
</div>`
  }
  
  // Multiple images - gallery layout
  let markdown = `<div class="${galleryClasses}">\n`
  
  for (const img of images) {
    markdown += `  <OptimizedImage 
    src="${img.publicPath}" 
    alt="${img.altText}"
    blurhash="${img.blurhash}"
    class="${imageClasses}"
  />\n`
  }
  
  markdown += `</div>`
  
  return markdown
}

// Process an image group
async function processImageGroup(group: ImageGroup) {
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.bold`Processing Group: ${c.yellow(group.count)} image(s)`)
  console.log(c.dim`File: ${group.markdownFile}`)
  console.log(c.dim`Lines: ${group.startLine + 1}-${group.endLine + 1}`)
  
  try {
    // Process all images in the group
    const processedImages: ImageInfo[] = []
    
    for (const imgInfo of group.images) {
      console.log(c.dim`  Processing: ${imgInfo.filename}`)
      const processed = await processImage(imgInfo, group.markdownFile)
      processedImages.push(processed)
      
      console.log(c.green`  ✓ ${imgInfo.filename}`)
    }
    
    // Generate new markdown
    const newMarkdown = generateGroupMarkdown(processedImages, group.count)
    
    // Update markdown file
    const content = await fs.readFile(group.markdownFile, 'utf-8')
    const lines = content.split('\n')
    
    // Remove old image lines
    lines.splice(group.startLine, (group.endLine - group.startLine + 1), newMarkdown)
    
    await fs.writeFile(group.markdownFile, lines.join('\n'))
    
    // Delete original images
    for (const img of processedImages) {
      await fs.unlink(img.originalPath)
    }
    
    console.log(c.green`\n✓ Created ${group.count === 1 ? 'single image' : `${group.count}-image gallery`}`)
    console.log(c.dim`  Gallery classes: ${getGalleryClasses(group.count)}`)
    console.log(c.dim`  Updated: ${group.markdownFile}`)
    
    return { success: true, count: group.count }
  }
  catch (error) {
    console.error(c.red`✗ Error: ${error}`)
    return { success: false, error }
  }
}

function bytesToHuman(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / 1024 ** i).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`.padStart(10, ' ')
}

// Main execution
async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║  Smart Image Processor v2 - Auto Gallery Detection    ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════════════╝\n`)
  
  console.log(c.yellow`Scanning for images in markdown files...\n`)
  
  const fileGroups = await findImageGroups()
  
  if (fileGroups.size === 0) {
    console.log(c.green`\n✓ No images to process. All markdown files are using optimized images!`)
    console.log(c.dim`\nTo use this script:`)
    console.log(c.dim`1. Place raw images in same folder as markdown file`)
    console.log(c.dim`2. Reference them: ![](image1.jpg)`)
    console.log(c.dim`                   ![](image2.jpg)`)
    console.log(c.dim`3. Run: pnpm run smart:optimize`)
    console.log(c.dim`4. Automatic gallery created based on image count!`)
    return
  }
  
  let totalGroups = 0
  let totalImages = 0
  
  for (const groups of fileGroups.values()) {
    totalGroups += groups.length
    for (const group of groups) {
      totalImages += group.count
    }
  }
  
  console.log(c.bold`Found ${c.yellow(totalImages)} image(s) in ${c.yellow(totalGroups)} group(s):\n`)
  
  for (const [file, groups] of fileGroups.entries()) {
    console.log(c.dim`  ${file}:`)
    for (const group of groups) {
      if (group.count === 1) {
        console.log(c.dim`    • Single image (centered layout)`)
      }
      else {
        console.log(c.dim`    • ${group.count}-image gallery (responsive grid)`)
      }
    }
  }
  
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
  
  // Process all groups
  const results = []
  for (const groups of fileGroups.values()) {
    for (const group of groups) {
      const result = await processImageGroup(group)
      results.push(result)
    }
  }
  
  // Summary
  console.log(c.cyan`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(c.bold.green`\n🎉 PROCESSING COMPLETE!\n`)
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(c.green`✓ Successful groups: ${successful}`)
  if (failed > 0) {
    console.log(c.red`✗ Failed groups: ${failed}`)
  }
  
  // Gallery stats
  const single = results.filter(r => r.count === 1).length
  const galleries = results.filter(r => r.count && r.count > 1).length
  
  if (single > 0) {
    console.log(c.dim`\n  Single images: ${single} (centered layout)`)
  }
  if (galleries > 0) {
    console.log(c.dim`  Galleries: ${galleries} (responsive grid)`)
  }
  
  console.log(c.dim`\nFeatures applied:`)
  console.log(c.dim`  • Automatic gallery detection`)
  console.log(c.dim`  • Responsive UnoCSS grid classes`)
  console.log(c.dim`  • Image compression`)
  console.log(c.dim`  • Blurhash generation`)
  console.log(c.dim`  • Descriptive alt text`)
  console.log(c.dim`  • Click-to-zoom enabled`)
  
  console.log(c.bold.cyan`\n✨ Your images are beautifully optimized! ✨\n`)
}

main().catch(console.error)
