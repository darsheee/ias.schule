---
title: '⚡ Quick Start: Images in 3 Steps'
tags:
  - "\U0001F3AF-the-simplest-way"
  - "\U0001F4C1-where-to-put-images?"
  - "\U0001F5BC️-how-to-use-in-markdown?"
  - "\U0001F680-complete-example"
  - "\U0001F4A1-image-path-rules"
readingTime: 3 min
lastUpdated: '2025-11-09'
---
# ⚡ Quick Start: Images in 3 Steps

## 🎯 The Simplest Way

### Step 1️⃣ : Add Image (30 seconds)
```bash
# Copy your image to public/images/
# Example: Copy hero.jpg to public/images/hero.jpg
```

### Step 2️⃣ : Compress (10 seconds)
```bash
pnpm run optimize:images
```

### Step 3️⃣ : Use in Markdown (30 seconds)
```md
![Hero Image](/images/hero.jpg)
```

**Done!** 🎉

---

## 📁 Where to Put Images?

```
public/
└── images/              ← Put your images here!
    ├── hero.jpg
    ├── diagram.png
    └── photo.webp
```

---

## 🖼️ How to Use in Markdown?

### Simple Way
```md
![Alt text](/images/your-image.jpg)
```

### With Styling
```md
<img src="/images/your-image.jpg" alt="Description" class="rounded-lg shadow-lg" />
```

---

## 🚀 Complete Example

**1. Add image:**
```
public/images/map.jpg
```

**2. Compress:**
```bash
pnpm run optimize:images
```

**3. In your markdown file:**
```md
# My Page

![Map of India](/images/map.jpg)

This map shows...
```

**4. View:**
```bash
pnpm run dev
```
Open: `http://localhost:5173`

---

## 💡 Image Path Rules

✅ **Always start with /** (absolute path)
```md
![Image](/images/photo.jpg)          ← Correct
<img src="/images/chart.png" />       ← Correct
```

❌ **Never use relative paths**
```md
![Image](./images/photo.jpg)          ← Wrong
<img src="../images/chart.png" />     ← Wrong
```

---

## 🎨 Common Styling Classes

```md
class="rounded-lg"           → Rounded corners
class="shadow-lg"            → Drop shadow
class="mx-auto"              → Center horizontally
class="max-w-2xl"            → Max width
class="w-full"               → Full width
```

**Example:**
```md
<img 
  src="/images/hero.jpg" 
  alt="Hero" 
  class="rounded-lg shadow-lg mx-auto max-w-2xl"
/>
```

---

## 📝 Real Example with Your Content

**File:** `upsc/gs1/modern-history/british-entry.md`

**Add:**
```md
# British Entry Into India

![East India Company](/images/history/east-india-company.jpg)

The British East India Company was formed in 1600...
```

---

## ⚙️ Commands Cheat Sheet

```bash
# Compress all images
pnpm run optimize:images

# Start dev server
pnpm run dev

# Build production
pnpm run build
```

---

## ✅ Checklist

- [ ] Image in `public/images/`
- [ ] Run `pnpm run optimize:images`
- [ ] Add to markdown with `![Alt](/images/file.jpg)`
- [ ] Test with `pnpm run dev`
- [ ] ✨ Done!

---

## 🆘 Troubleshooting

**Image not showing?**
- Check path starts with `/`
- File in `public/images/`?
- Restart dev server

**Too large?**
- Run `pnpm run optimize:images`
- Check file size < 500KB

---

## 📚 More Help?

| Guide | Purpose |
|-------|---------|
| `HOW_TO_USE_IMAGES.md` | Complete guide |
| `IMAGE_WORKFLOW_DIAGRAM.md` | Visual workflow |
| `PRACTICAL_EXAMPLE.md` | Real examples |
| `ANTFU_BEST_PRACTICES_ANALYSIS.md` | Best practices |

---

## 🎯 Most Common Use Cases

### 1. Single Image in Content
```md
![Description](/images/photo.jpg)
```

### 2. Centered with Shadow
```md
<div class="my-6">
  <img 
    src="/images/photo.jpg" 
    alt="Description"
    class="mx-auto rounded-lg shadow-lg"
  />
</div>
```

### 3. Full Width Banner
```md
<img src="/images/banner.jpg" alt="Banner" class="w-full" />
```

### 4. Two Images Side by Side
```md
<div class="grid grid-cols-2 gap-4">
  <img src="/images/img1.jpg" alt="1" />
  <img src="/images/img2.jpg" alt="2" />
</div>
```

---

## 🎓 Pro Tips

1. **Always compress**: Run `optimize:images` before committing
2. **Name descriptively**: `battle-of-plassey.jpg` not `img1.jpg`
3. **Use lazy loading**: Add `loading="lazy"` for images below the fold
4. **Add alt text**: Important for accessibility
5. **Organize folders**: Group by topic (history, geography, etc.)

---

**That's it!** Now go add some images! 🚀

**First time?** Follow these 3 steps and you're done! ✨
