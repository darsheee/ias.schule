---
title: 'Quick Setup Guide: Image Optimization'
tags:
  - ✅-files-created
  - "\U0001F680-installation-steps"
  - "\U0001F4DD-usage"
  - "\U0001F3AF-next-steps"
  - "\U0001F527-troubleshooting"
readingTime: 4 min
lastUpdated: '2025-11-09'
---
# Quick Setup Guide: Image Optimization

## ✅ Files Created

The following files have been created for image optimization:

### Scripts
- ✅ `scripts/img-compress.ts` - Core compression logic
- ✅ `scripts/img-compress-staged.ts` - Git pre-commit compression
- ✅ `scripts/img-compress-cli.ts` - CLI tool for batch compression

### Components
- ✅ `.vitepress/theme/components/OptimizedImage.vue` - Vue component with blurhash support

### Documentation
- ✅ `ANTFU_BEST_PRACTICES_ANALYSIS.md` - Comprehensive analysis
- ✅ `IMAGE_OPTIMIZATION_GUIDE.md` - Detailed usage guide
- ✅ `SETUP_IMAGE_OPTIMIZATION.md` - This file

### Configuration
- ✅ `package.json` - Updated with scripts and dependencies

## 🚀 Installation Steps

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
pnpm install
```

This will install:
- `sharp` - Image processing
- `blurhash` - Blurhash generation
- `@unpic/placeholder` - Blurhash to gradient conversion
- `exifreader` - EXIF metadata extraction
- `fast-glob` - File pattern matching
- `fs-extra` - Enhanced file system operations
- `prompts` - Interactive CLI prompts
- `simple-git` - Git operations
- `simple-git-hooks` - Git hooks setup
- `lint-staged` - Pre-commit file processing
- `ansis` - Terminal colors
- `tsx` - TypeScript execution

### 2. Verify Installation

Check if Sharp is installed correctly:

```bash
pnpm run optimize:images
```

If you see "Found X images to process", the installation is successful!

## 📝 Usage

### Compress All Images

To compress all images in your project:

```bash
pnpm run optimize:images
```

This will:
- Scan `public/`, `assets/`, and `avatars/` directories
- Resize images larger than 1440px
- Compress with optimal quality
- Show size reduction statistics

### Compress Staged Images

To compress only staged images before committing:

```bash
pnpm run compress
```

### Using the OptimizedImage Component

In your VitePress markdown or Vue components:

```vue
<script setup>
import OptimizedImage from '@theme/components/OptimizedImage.vue'
</script>

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  blurhash="U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
/>
```

Or in Markdown with component auto-import (if configured):

```md
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
/>
```

## 🎯 Next Steps

### Immediate Actions

1. **Test the compression**:
   ```bash
   pnpm run optimize:images
   ```

2. **Check compressed images**: Review the output to see size reductions

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add image optimization system"
   ```

### Optional Enhancements

1. **Setup Git Hooks** (auto-compress on commit):
   
   Add to `package.json`:
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
   
   Then run:
   ```bash
   npx simple-git-hooks
   ```

2. **Generate Blurhash** for images:
   - Use online tool: https://blurha.sh/
   - Or create a script (see `IMAGE_OPTIMIZATION_GUIDE.md`)

3. **Update existing images** in your content to use `OptimizedImage` component

## 🔧 Troubleshooting

### Error: "Cannot find module 'sharp'"

**Solution**: The errors will disappear after running `pnpm install`. If they persist:

```bash
pnpm rebuild sharp
```

### Error: "sharp failed to load"

**Solution**: Make sure you're using Node.js 22 or higher:

```bash
node --version
```

### Images not compressing enough

**Solution**: Adjust quality settings in `scripts/img-compress.ts`:

```typescript
image = image[format]({
  quality: format === 'png' ? 90 : 75, // Lower for more compression
  compressionLevel: 9,
})
```

### Sharp installation issues on Windows

**Solution**: Try these steps:

1. Update npm:
   ```bash
   npm install -g npm@latest
   ```

2. Clear cache:
   ```bash
   pnpm store prune
   ```

3. Reinstall:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

## 📊 Expected Results

After running `pnpm run optimize:images`, you should see output like:

```
Found 15 images to process

[COMP]   1.23 MB ->  456.78 kB  -62.9%  public/hero.png
[COMP] 890.12 kB ->  234.56 kB  -73.7%  public/team-avatars/member1.webp
[SKIP] 120.45 kB ->  115.23 kB   -4.3%  assets/icon.png
...

✅ Image compression completed!
```

- **[COMP]** = Compressed and saved (>10% reduction)
- **[SKIP]** = Skipped (reduction <10%, not worth it)

## 🎨 Best Practices

1. **Always compress before committing** large images
2. **Use WebP format** when possible (better compression)
3. **Provide descriptive alt text** for accessibility
4. **Use blurhash** for important above-the-fold images
5. **Test on slow connections** to verify loading experience

## 📚 Additional Resources

- **Full Analysis**: See `ANTFU_BEST_PRACTICES_ANALYSIS.md`
- **Detailed Guide**: See `IMAGE_OPTIMIZATION_GUIDE.md`
- **Source Code**: Based on [antfu.me](https://github.com/antfu/antfu.me)

## 💡 Quick Tips

1. **Batch compress**: Run `pnpm run optimize:images` periodically
2. **Monitor bundle size**: Use `pnpm run build` to check impact
3. **Use lazy loading**: All images should use `loading="lazy"` (default in OptimizedImage)
4. **Progressive enhancement**: Add blurhash for smooth loading

## ✨ Success Indicators

You'll know the system is working when:
- ✅ Image file sizes are 40-70% smaller
- ✅ Page load times improve by 30-50%
- ✅ Lighthouse performance scores increase
- ✅ Images load smoothly with blurhash placeholders

---

**Need Help?** Check the troubleshooting section or review the detailed guides.

**Ready to start?** Run `pnpm install` to begin! 🚀
