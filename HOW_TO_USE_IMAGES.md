---
title: "\U0001F5BC️ Complete Guide: How to Use Images in ias.schule"
tags:
  - "\U0001F4C1-where-to-place-images"
  - "\U0001F680-complete-workflow:-adding-a-new-image"
  - "\U0001F4DD-usage-examples-in-markdown-files"
  - "\U0001F3A8-using-optimizedimage-component-(advanced)"
  - "\U0001F4CB-complete-example:-adding-images-to-a-page"
readingTime: 7 min
lastUpdated: '2025-11-09'
---
# 🖼️ Complete Guide: How to Use Images in ias.schule

## 📁 Where to Place Images

### 1. **Public Folder** (Recommended for most images)
```
public/
├── images/              # General images
│   ├── hero.jpg
│   ├── banner.png
│   └── diagram.webp
├── screenshots/         # App screenshots
├── charts/             # Chart images
└── photos/             # Photo gallery
```

**When to use**: Static images that don't need processing during build.

### 2. **Assets Folder** (For build-time processing)
```
assets/
├── og-images/          # Open Graph images
├── icons/              # Icon sets
└── graphics/           # SVG graphics
```

**When to use**: Images that need build-time optimization.

### 3. **Avatars Folder** (For team/author images)
```
avatars/
├── author1.png
├── author2.webp
└── contributor1.jpg
```

**When to use**: Profile pictures, team member photos.

## 🚀 Complete Workflow: Adding a New Image

### Step 1: Add Your Image File

Place your image in the appropriate folder:

```bash
# Example: Adding a hero image
# Copy your image to: public/images/hero.jpg
```

### Step 2: Optimize the Image

Run the optimization script:

```bash
pnpm run optimize:images
```

**Expected Output:**
```
Found 1 images to process

[COMP]   2.34 MB ->  567.89 kB  -75.7%  public/images/hero.jpg

✅ Image compression completed!
```

### Step 3: Use in Your Markdown Files

#### **Option A: Simple Markdown Syntax** (Basic)

```md
![Hero Image](/images/hero.jpg)
```

#### **Option B: HTML img tag** (More control)

```md
<img src="/images/hero.jpg" alt="Hero Image" loading="lazy" />
```

#### **Option C: OptimizedImage Component** (Best - with blurhash)

First, check if auto-import is enabled. If not, import manually:

```vue
<script setup>
import OptimizedImage from '@theme/components/OptimizedImage.vue'
</script>

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero Image"
/>
```

## 📝 Usage Examples in Markdown Files

### Example 1: Simple Image in Content

```md
# Modern History

This is the historical timeline of British India.

![British India Timeline](/images/timeline.png)

The image above shows...
```

### Example 2: Image with Caption

```md
<figure>
  <img src="/images/map.jpg" alt="Map of India 1857" loading="lazy" />
  <figcaption>Map of British India during the 1857 Mutiny</figcaption>
</figure>
```

### Example 3: Side-by-side Images

```md
<div class="grid grid-cols-2 gap-4">
  <img src="/images/before.jpg" alt="Before" loading="lazy" />
  <img src="/images/after.jpg" alt="After" loading="lazy" />
</div>
```

### Example 4: Full-width Hero Image

```md
<div class="w-full -mx-7 mb-8">
  <img src="/images/hero.jpg" alt="Hero" class="w-full h-auto" loading="eager" />
</div>

# Your Page Title
```

### Example 5: Image Gallery

```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <img src="/images/photo1.jpg" alt="Photo 1" loading="lazy" />
  <img src="/images/photo2.jpg" alt="Photo 2" loading="lazy" />
  <img src="/images/photo3.jpg" alt="Photo 3" loading="lazy" />
  <img src="/images/photo4.jpg" alt="Photo 4" loading="lazy" />
  <img src="/images/photo5.jpg" alt="Photo 5" loading="lazy" />
  <img src="/images/photo6.jpg" alt="Photo 6" loading="lazy" />
</div>
```

## 🎨 Using OptimizedImage Component (Advanced)

### Step 1: Enable Auto-Import (One-time setup)

Check if `OptimizedImage` is already auto-imported by your VitePress config. If not, you can import it manually.

### Step 2: Generate Blurhash (Optional but Recommended)

For key images, generate a blurhash placeholder:

**Online Tool Method:**
1. Go to https://blurha.sh/
2. Upload your image
3. Copy the generated hash

**Example:**
```
Input: hero.jpg
Output: U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8
```

### Step 3: Use in Markdown

```md
<script setup>
import OptimizedImage from '@theme/components/OptimizedImage.vue'
</script>

# My Page

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero Image"
  blurhash="U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
/>
```

### With Custom Styling

```md
<OptimizedImage
  src="/images/profile.jpg"
  alt="Profile"
  aspect-ratio="1/1"
  class="rounded-full shadow-lg mx-auto w-48"
/>
```

## 📋 Complete Example: Adding Images to a Page

Let's say you want to add images to `upsc/gs1/modern-history/british-entry.md`:

### Step 1: Prepare Your Images

```
public/
└── images/
    └── history/
        ├── east-india-company.jpg
        ├── battle-of-plassey.jpg
        └── fort-william.jpg
```

### Step 2: Compress Images

```bash
pnpm run optimize:images
```

### Step 3: Update Your Markdown

```md
---
title: British Entry (1599-1765)
description: The arrival and establishment of British East India Company
---

# British Entry (1599-1765)

## Formation of East India Company

The British East India Company was formed in 1600...

![East India Company](/images/history/east-india-company.jpg)
*The British East India Company headquarters in London*

## Battle of Plassey (1757)

The Battle of Plassey was a decisive victory...

<div class="my-8">
  <img 
    src="/images/history/battle-of-plassey.jpg" 
    alt="Battle of Plassey 1757" 
    loading="lazy"
    class="rounded-lg shadow-lg"
  />
</div>

### Key Points

- Robert Clive led British forces
- Siraj-ud-Daulah was defeated
- Marked beginning of British rule

## Fort William

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <div>
    <img 
      src="/images/history/fort-william.jpg" 
      alt="Fort William" 
      loading="lazy"
    />
  </div>
  <div>
    <h3>Historical Significance</h3>
    <p>Fort William served as...</p>
  </div>
</div>
```

## 🔧 Scripts Reference

### Compress All Images

```bash
pnpm run optimize:images
```

**What it does:**
- Scans `public/`, `assets/`, `avatars/`
- Compresses all PNG, JPG, JPEG, WebP files
- Shows size reduction statistics

### Compress Staged Images (Before Commit)

```bash
pnpm run compress
```

**What it does:**
- Finds images in git staging area
- Asks for confirmation
- Compresses selected images
- Re-stages compressed files

### Check What Will Be Compressed

```bash
git add public/images/new-image.jpg
pnpm run compress
```

## 📊 Image Best Practices

### 1. File Naming

**Good:**
```
british-east-india-company.jpg
battle-of-plassey-1757.png
map-india-1857.webp
```

**Avoid:**
```
IMG_1234.jpg
photo1.png
pic.jpg
```

### 2. File Organization

```
public/images/
├── history/
│   ├── ancient/
│   ├── medieval/
│   └── modern/
├── geography/
├── society/
└── charts/
```

### 3. Image Formats

**Use JPEG for:**
- Photographs
- Complex images with many colors

**Use PNG for:**
- Screenshots
- Images with text
- Images needing transparency

**Use WebP for:**
- Best compression (if browser support is OK)
- Modern web applications

### 4. Image Sizes

**Recommended dimensions:**
- Hero images: 1920x1080 or 1440x810
- Content images: 1200x800 or smaller
- Thumbnails: 300x200
- Icons: 64x64 or 128x128
- Avatars: 200x200

### 5. Alt Text

**Good:**
```md
![Map showing British territories in India during 1857](/images/map-1857.jpg)
```

**Bad:**
```md
![map](/images/map-1857.jpg)
```

## 🎯 Common Scenarios

### Scenario 1: Adding a Diagram

```md
# Administrative Structure

<div class="my-8 flex justify-center">
  <img 
    src="/images/diagrams/admin-structure.png" 
    alt="Administrative structure of British India"
    class="max-w-2xl"
    loading="lazy"
  />
</div>
```

### Scenario 2: Image with Text Overlay

```md
<div class="relative">
  <img src="/images/hero.jpg" alt="Hero" class="w-full" />
  <div class="absolute inset-0 flex items-center justify-center">
    <h1 class="text-white text-4xl font-bold">Welcome to IAS Schule</h1>
  </div>
</div>
```

### Scenario 3: Responsive Image

```md
<picture>
  <source media="(max-width: 640px)" srcset="/images/hero-mobile.jpg">
  <source media="(max-width: 1024px)" srcset="/images/hero-tablet.jpg">
  <img src="/images/hero-desktop.jpg" alt="Hero" loading="lazy">
</picture>
```

### Scenario 4: Image in Container

```md
<div class="container mx-auto px-4">
  <div class="max-w-4xl mx-auto">
    <img 
      src="/images/content.jpg" 
      alt="Content" 
      class="rounded-lg shadow-xl"
      loading="lazy"
    />
  </div>
</div>
```

## 🐛 Troubleshooting

### Issue: Image Not Showing

**Check:**
1. Is the path correct? (starts with `/`)
2. Is the file in the `public/` folder?
3. Is the filename spelled correctly?
4. Did you restart dev server?

### Issue: Image Not Compressed

**Solution:**
```bash
# Run compression manually
pnpm run optimize:images

# Check file size
ls -lh public/images/your-image.jpg
```

### Issue: Compression Didn't Help

**Reasons:**
- Image already optimized
- Size reduction < 10% (script skips)
- Try reducing dimensions first

```bash
# Install ImageMagick or use Sharp directly
```

## 📚 Quick Reference

### Markdown Syntax
```md
![Alt text](/path/to/image.jpg)
```

### HTML in Markdown
```md
<img src="/path/to/image.jpg" alt="Alt text" loading="lazy" />
```

### Vue Component
```md
<OptimizedImage src="/path/to/image.jpg" alt="Alt text" />
```

### With UnoCSS Classes
```md
<img src="/path.jpg" class="w-full rounded-lg shadow-lg" />
```

## ✅ Checklist for Each Image

- [ ] Image placed in correct folder
- [ ] Run `pnpm run optimize:images`
- [ ] Image compressed successfully
- [ ] Used in markdown with proper alt text
- [ ] Tested in browser (dev server)
- [ ] Loading attribute set (`lazy` or `eager`)
- [ ] Responsive behavior checked
- [ ] Committed to git

## 🎉 Complete Workflow Example

```bash
# 1. Add your image
cp ~/Downloads/map.jpg public/images/history/

# 2. Compress it
pnpm run optimize:images

# 3. Add to markdown file
echo '![Historical Map](/images/history/map.jpg)' >> upsc/gs1/modern-history/british-entry.md

# 4. Check in browser
pnpm run dev

# 5. Commit
git add .
git commit -m "Add historical map to British entry page"
```

## 💡 Pro Tips

1. **Compress before committing**: Always run `pnpm run optimize:images`
2. **Use descriptive names**: `battle-of-plassey-1757.jpg` not `img1.jpg`
3. **Organize by topic**: Create subfolders in `public/images/`
4. **Use WebP when possible**: Better compression
5. **Add alt text**: Important for accessibility and SEO
6. **Lazy load**: Use `loading="lazy"` except above-the-fold images
7. **Test on slow connections**: Chrome DevTools -> Network throttling

---

**Need help?** Check the other documentation files or run `pnpm run optimize:images --help`
