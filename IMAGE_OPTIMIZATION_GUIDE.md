# Image Optimization Implementation Guide

## 🎯 Overview

This guide explains how to use the image optimization system implemented in the ias.schule project, based on best practices from antfu.me.

## 📦 Installation

### 1. Install Required Dependencies

```bash
pnpm add -D sharp blurhash @unpic/placeholder exifreader fast-glob fs-extra prompts simple-git ansis
```

### 2. Update package.json Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "compress": "tsx scripts/img-compress-staged.ts",
    "optimize:images": "tsx scripts/img-compress-cli.ts"
  }
}
```

## 🚀 Usage

### Manual Image Compression

To compress all images in your project:

```bash
pnpm run optimize:images
```

This will:
- Find all images in `public/`, `assets/`, and `avatars/` directories
- Resize images larger than 1440px
- Compress with optimal quality settings (JPEG: 80, PNG: 100, WebP: 80)
- Only save if compression reduces size by more than 10%
- Display size reduction statistics

### Automatic Compression on Commit

To compress staged images before committing:

```bash
pnpm run compress
```

This will:
- Check for staged image files
- Prompt for confirmation
- Compress selected images
- Re-stage compressed images

### Setting Up Git Hooks (Optional)

To automatically run image compression on every commit:

1. Install git hooks:
```bash
pnpm add -D simple-git-hooks lint-staged
```

2. Add to `package.json`:
```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*.{png,jpg,jpeg,webp}": "pnpm run compress"
  }
}
```

3. Activate hooks:
```bash
npx simple-git-hooks
```

## 🖼️ Using OptimizedImage Component

### Basic Usage

```vue
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
/>
```

### With Blurhash Placeholder

```vue
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  blurhash="U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
/>
```

### With Custom Aspect Ratio

```vue
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  aspect-ratio="16/9"
  class="rounded-lg shadow-lg"
/>
```

### Eager Loading (Above the Fold)

```vue
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  loading="eager"
/>
```

## 📝 Best Practices

### 1. Image Naming Convention

For photos/gallery images, use timestamp-based naming:
```
p-2024-11-09-10-30-00-000-1.jpg
```

Format: `p-YYYY-MM-DD-HH-MM-SS-MS-INDEX.ext`

### 2. Image Placement

- **Static assets**: Place in `/public/` directory
- **Build-time processed**: Place in `/assets/` directory
- **Avatars**: Place in `/avatars/` directory

### 3. Supported Formats

- JPEG/JPG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- WebP (`.webp`)

### 4. Size Recommendations

- **Hero images**: 1920x1080 or smaller
- **Content images**: 1440px max dimension
- **Thumbnails**: 300x300 or smaller
- **Avatars**: 200x200 or smaller

### 5. Quality Settings

The compression script uses these optimal settings:
- **JPEG**: Quality 80, Compression Level 9
- **PNG**: Quality 100, Compression Level 9
- **WebP**: Quality 80, Compression Level 9

## 🎨 Generating Blurhash

To generate blurhash for your images, you can use online tools or create a script:

### Online Tools
- [Blurhash Generator](https://blurha.sh/)
- [Unpic Placeholder Generator](https://unpic.pics/placeholder/)

### Programmatic Generation

Create `scripts/generate-blurhash.ts`:

```typescript
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { encode as blurhashEncode } from 'blurhash'
import fg from 'fast-glob'
import sharp from 'sharp'

const files = await fg('public/**/*.{jpg,png,jpeg}', {
  caseSensitiveMatch: false,
  absolute: true,
})

for (const filepath of files) {
  const configFile = filepath.replace(/\.\w+$/, '.json')
  let config: Record<string, any> = {}
  
  if (existsSync(configFile)) {
    config = JSON.parse(await fs.readFile(configFile, 'utf-8'))
  }
  
  if (config.blurhash) {
    continue // Skip if already has blurhash
  }
  
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
    4
  )
  
  config.blurhash = blurhash
  await fs.writeFile(configFile, JSON.stringify(config, null, 2))
  console.log(`Generated blurhash for ${filepath}`)
}
```

Run with:
```bash
tsx scripts/generate-blurhash.ts
```

## 📊 Image Data Structure

For advanced usage with photo galleries, store metadata in JSON files:

```
public/
├── photo1.jpg
├── photo1.json       # { "blurhash": "...", "text": "Caption" }
├── photo2.jpg
└── photo2.json
```

JSON structure:
```json
{
  "blurhash": "U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8",
  "text": "Image caption or alt text",
  "lang": "en"
}
```

## 🔧 Troubleshooting

### Issue: "Cannot find module 'sharp'"

**Solution**: Install sharp manually
```bash
pnpm add -D sharp
```

If it still fails, try:
```bash
pnpm rebuild sharp
```

### Issue: Images not compressing

**Solution**: Check if images are smaller than 10% threshold
- The script only saves compressed images if they're >10% smaller
- Try adjusting the threshold in `img-compress.ts`

### Issue: Out of memory during compression

**Solution**: Process images in batches
```typescript
// Modify compressImages to process in chunks
const chunkSize = 10
for (let i = 0; i < files.length; i += chunkSize) {
  const chunk = files.slice(i, i + chunkSize)
  await Promise.all(chunk.map(processImage))
}
```

## 📈 Performance Metrics

Expected improvements after implementation:
- **File size reduction**: 40-70% for JPEGs
- **Page load time**: 30-50% faster
- **Bandwidth savings**: 60-70% reduction
- **User experience**: Smooth loading with blurhash placeholders

## 🔗 References

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Blurhash Algorithm](https://blurha.sh/)
- [@unpic/placeholder](https://github.com/ascorbic/unpic-placeholder)
- [antfu.me Source Code](https://github.com/antfu/antfu.me)

## 💡 Tips

1. **Always compress before committing**: Large images can bloat your repository
2. **Use WebP when possible**: Better compression than JPEG
3. **Provide alt text**: Important for accessibility and SEO
4. **Test on slow connections**: Use DevTools throttling to verify loading experience
5. **Monitor bundle size**: Use `pnpm run build` to check impact

---

**Next Steps**:
1. Run `pnpm run optimize:images` to compress existing images
2. Set up git hooks for automatic compression
3. Update components to use `OptimizedImage`
4. Generate blurhash for key images
5. Test loading experience on slow connections
