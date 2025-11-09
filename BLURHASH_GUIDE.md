# 🎨 Blurhash Guide

## What is Blurhash?

Blurhash creates a tiny placeholder gradient that shows while your image loads. It makes your site feel faster and more polished.

**Without Blurhash:**
```
[ ] → [Loading...] → [Full Image]
```

**With Blurhash:**
```
[Blurred gradient] → [Full Image] (smooth transition)
```

---

## ⚡ Quick Answer

### Blurhash is **OPTIONAL** and **NOT automatic**

You have 3 options:

1. **Don't use blurhash** (simplest)
2. **Generate manually** (for a few images)
3. **Generate automatically** (for many images)

---

## Option 1: Don't Use Blurhash (Simplest)

Just use the OptimizedImage component without blurhash:

```md
<OptimizedImage 
  src="/images/history/company.jpg" 
  alt="British East India Company"
/>
```

✅ **This works perfectly fine!**
- Image still loads with lazy loading
- No blurhash placeholder (blank until loaded)
- Simpler to use

---

## Option 2: Generate Manually (For Few Images)

### Step 1: Go to Online Tool

Visit: **https://blurha.sh/**

### Step 2: Upload Your Image

Drag and drop your image file

### Step 3: Copy the Hash

You'll get something like:
```
U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8
```

### Step 4: Add to Markdown

```md
<OptimizedImage 
  src="/images/history/company.jpg" 
  alt="British East India Company"
  blurhash="U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
/>
```

**Use this for:** Important above-the-fold images (hero images, main banners)

---

## Option 3: Generate Automatically (For Many Images)

### Step 1: Run the Generator Script

```bash
pnpm run generate:blurhash
```

### Step 2: Check Output

This creates JSON files with blurhash for each image:

```
public/images/history/company.jpg
public/images/history/company.json  ← Created!
```

**company.json:**
```json
{
  "blurhash": "U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
}
```

### Step 3: Use in Code

For programmatic usage (advanced), you can read these JSON files.

---

## 📊 Comparison: When to Use Each Method

| Method | Best For | Effort | Result |
|--------|----------|--------|--------|
| **No Blurhash** | Most images | 0 min | Simple, works fine |
| **Manual** | Hero images, key visuals | 2 min/image | Best UX for important images |
| **Automatic** | Bulk generation | 5 min setup | Good for galleries |

---

## 🎯 Recommended Approach

### For Your IAS Schule Project:

**1. Most Images: No Blurhash**
```md
![Map of India](/images/history/map.jpg)
```
or
```md
<img src="/images/history/map.jpg" alt="Map" loading="lazy" />
```

**2. Hero Images: Manual Blurhash**
```md
<OptimizedImage 
  src="/images/hero.jpg" 
  alt="Hero" 
  blurhash="generated-hash-here"
/>
```

**3. Photo Galleries: Automatic Generation** (if you create galleries)

---

## 🔧 Complete Workflow Examples

### Example 1: Simple Image (No Blurhash)

```bash
# 1. Add image
cp my-image.jpg public/images/history/

# 2. Compress
pnpm run optimize:images

# 3. Use in markdown
# Add to your .md file:
```
```md
![Historical Image](/images/history/my-image.jpg)
```

**Total time:** 2 minutes
**Blurhash:** Not needed

---

### Example 2: Hero Image with Blurhash

```bash
# 1. Add image
cp hero.jpg public/images/

# 2. Compress
pnpm run optimize:images

# 3. Generate blurhash online
# Go to: https://blurha.sh/
# Upload hero.jpg
# Copy hash: U02r,A01yART...

# 4. Use in markdown with blurhash
```
```md
<OptimizedImage 
  src="/images/hero.jpg" 
  alt="Hero Image"
  blurhash="U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
/>
```

**Total time:** 5 minutes
**Blurhash:** Smooth loading experience

---

### Example 3: Bulk Blurhash Generation

```bash
# 1. Add multiple images
cp *.jpg public/images/gallery/

# 2. Compress all
pnpm run optimize:images

# 3. Generate blurhash for all
pnpm run generate:blurhash

# 4. Check generated JSON files
# Each image now has a .json file with blurhash
```

**Output:**
```
Found 15 images to process

[DONE] image1.jpg
       Blurhash: U02r,A01yART...
       Saved to: image1.json

[DONE] image2.jpg
       Blurhash: ULMj8w~q%Mt7...
       Saved to: image2.json

✅ Blurhash generation completed!
   Generated: 15
   Skipped: 0
   Total: 15/15
```

---

## 📝 Practical Examples from Your Content

### british-entry.md (Simple)

```md
# British Entry Into India

## Foundation of East India Company

![East India Company Logo](/images/history/modern/east-india-company.jpg)

The British East India Company was formed in 1600...
```

**No blurhash needed!** This is perfect for content images.

---

### british-entry.md (With Hero Blurhash)

```md
---
title: British Entry Into India | 1599-1765
---

<OptimizedImage 
  src="/images/history/modern/british-entry-hero.jpg" 
  alt="British India Historical Map"
  blurhash="U8B3qB00xu~q009F4n%M9F%M-;9F%MWBof"
  class="w-full rounded-lg shadow-xl mb-8"
/>

# British Entry Into India
## East India Company & Early British Presence (1599-1765)
```

**Use blurhash for:** Above-the-fold hero images for better perceived performance.

---

## 🎨 How to Get Blurhash

### Online Tools

1. **https://blurha.sh/** (Recommended)
   - Simple, fast
   - Drag & drop
   - Instant results

2. **https://unpic.pics/placeholder/**
   - Alternative option
   - More customization

### Using the Script

```bash
# Generate for all images
pnpm run generate:blurhash

# Check generated files
ls public/images/**/*.json
```

---

## 💡 Pro Tips

### 1. Only Use Blurhash for Key Images

**Good candidates:**
- Hero images
- Above-the-fold images
- Featured images on homepage
- Large banner images

**Not needed for:**
- Small icons
- Inline content images
- Diagrams
- Screenshots

### 2. Blurhash is Tiny

The hash is just a string:
```
U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8
```

Size: ~40-50 characters
Impact: Minimal on page size

### 3. Cache the Results

Once generated, save the blurhash:
- In markdown frontmatter
- In JSON files
- In your content management system

### 4. Test the Effect

Before/After comparison:
1. Load page without blurhash
2. Load page with blurhash
3. Notice the smoother experience!

---

## 🔍 Understanding the Output

### When you run `generate:blurhash`:

**Output structure:**
```
public/images/
├── photo.jpg          ← Your image
└── photo.json         ← Generated blurhash data
```

**photo.json contents:**
```json
{
  "blurhash": "U02r,A01yART01~p8|tP~p8y%eV{8y.6Mzk8"
}
```

You can add more metadata:
```json
{
  "blurhash": "U02r,A01yART...",
  "text": "Caption for the image",
  "credit": "Photographer name",
  "date": "2024-11-09"
}
```

---

## ✅ Checklist

### For Each Image:

**Without Blurhash:**
- [ ] Add image to `public/images/`
- [ ] Run `pnpm run optimize:images`
- [ ] Use in markdown: `![Alt](/images/file.jpg)`
- [ ] Done!

**With Blurhash:**
- [ ] Add image to `public/images/`
- [ ] Run `pnpm run optimize:images`
- [ ] Generate blurhash (online or script)
- [ ] Use OptimizedImage component with blurhash
- [ ] Test in browser
- [ ] Done!

---

## 🎓 Summary

| Question | Answer |
|----------|--------|
| Is blurhash required? | **No**, it's optional |
| Is blurhash automatic? | **No**, you provide it |
| How to get blurhash? | Online tool or script |
| When to use blurhash? | Hero images, key visuals |
| When to skip blurhash? | Most content images |

---

## 📚 Quick Commands

```bash
# Compress images
pnpm run optimize:images

# Generate blurhash for all images
pnpm run generate:blurhash

# Start dev server
pnpm run dev
```

---

## 🚀 Start Simple

**For 90% of your images:**
```md
![Description](/images/path/to/image.jpg)
```

**For hero/featured images (10%):**
```md
<OptimizedImage 
  src="/images/hero.jpg" 
  alt="Hero"
  blurhash="get-from-blurha.sh"
/>
```

---

**Bottom Line:** Blurhash is a nice-to-have enhancement for important images. For most images, simple markdown syntax is perfectly fine! 🎉
