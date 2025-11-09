import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { encode as blurhashEncode } from 'blurhash'
import fg from 'fast-glob'
import { basename } from 'pathe'
import sharp from 'sharp'

// Find all images
const files = await fg([
  'public/**/*.{jpg,jpeg,png,webp}',
  'assets/**/*.{jpg,jpeg,png,webp}',
  'avatars/**/*.{jpg,jpeg,png,webp}',
], {
  ignore: ['node_modules/**', '.vitepress/dist/**', '.vitepress/cache/**'],
  caseSensitiveMatch: false,
  absolute: true,
})

console.log(`Found ${files.length} images to process\n`)

let processed = 0
let skipped = 0
let generated = 0

for (const filepath of files) {
  const configFile = filepath.replace(/\.\w+$/, '.json')
  let config: Record<string, any> = {}

  // Read existing config if it exists
  if (existsSync(configFile)) {
    try {
      config = JSON.parse(await fs.readFile(configFile, 'utf-8'))
    }
    catch (e) {
      config = {}
    }
  }

  // Skip if already has blurhash
  if (config.blurhash) {
    console.log(`[SKIP] ${basename(filepath)} - already has blurhash`)
    skipped++
    continue
  }

  try {
    // Generate blurhash
    const buffer = await fs.readFile(filepath)
    const img = sharp(buffer)
    const { data, info } = await img
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'cover' })
      .toBuffer({ resolveWithObject: true })

    const blurhash = blurhashEncode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      4,
    )

    config.blurhash = blurhash

    // Save config file
    await fs.writeFile(configFile, JSON.stringify(config, null, 2))

    console.log(`[DONE] ${basename(filepath)}`)
    console.log(`       Blurhash: ${blurhash}`)
    console.log(`       Saved to: ${basename(configFile)}\n`)

    generated++
  }
  catch (e) {
    console.error(`[FAIL] ${basename(filepath)} - ${e}`)
  }

  processed++
}

console.log('\n✅ Blurhash generation completed!')
console.log(`   Generated: ${generated}`)
console.log(`   Skipped: ${skipped}`)
console.log(`   Total: ${processed}/${files.length}`)
