---
title: ⚡ Smart Image Processor - Quick Start
tags:
  - "\U0001F3AF-3-step-workflow"
  - emperor-ashoka
  - "\U0001F389-what-happens-automatically"
  - "\U0001F4DD-examples"
  - "\U0001F4A1-pro-tips"
readingTime: 3 min
lastUpdated: '2025-11-09'
---
# ⚡ Smart Image Processor - Quick Start

## 🎯 3-Step Workflow

### Step 1: Place Image
Copy your image to the same folder as your markdown file:
```
upsc/gs1/ancient-history/
├── mauryan-empire.md
└── ashoka.jpg          ← Place here
```

### Step 2: Reference in Markdown
```md
# Mauryan Empire

## Emperor Ashoka

![](ashoka.jpg)

Ashoka was the third emperor...
```

### Step 3: Run Script
```bash
pnpm run smart:optimize
```

**Done!** ✨

---

## 🎉 What Happens Automatically

The script will:

✅ Move `ashoka.jpg` → `public/images/upsc/gs1/ancient-history/mauryan-empire/ashoka.jpg`  
✅ Compress image (60-75% smaller)  
✅ Generate blurhash  
✅ Create alt text: "Ashoka"  
✅ Update markdown:
```md
<OptimizedImage 
  src="/images/upsc/gs1/ancient-history/mauryan-empire/ashoka.jpg" 
  alt="Ashoka"
  blurhash="U02r,A01yART..."
/>
```
✅ Delete original `ashoka.jpg` from markdown folder

---

## 📝 Examples

### Example 1: Single Image

**Before:**
```
File: upsc/gs2/polity/parliament.md

![](parliament-seat-distribution.jpg)
```

**Run:** `pnpm run smart:optimize`

**After:**
```md
<OptimizedImage 
  src="/images/upsc/gs2/polity/parliament/parliament-seat-distribution.jpg" 
  alt="Parliament Seat Distribution"
  blurhash="U8B3qB..."
/>
```

### Example 2: Multiple Images

**Before:**
```
File: upsc/gs1/modern-history/british-entry.md

![](east-india-company.jpg)
...
![](battle-plassey.jpg)
...
![](fort-william.jpg)
```

**Run:** `pnpm run smart:optimize`

**After:** All 3 images processed, moved, optimized, and markdown updated! ✨

---

## 💡 Pro Tips

### 1. Use Descriptive Filenames
```
✅ ashoka-pillar.jpg → Alt: "Ashoka Pillar"
✅ battle-of-plassey-1757.jpg → Alt: "Battle Of Plassey 1757"
❌ IMG_1234.jpg → Alt: "IMG 1234"
```

### 2. Process Multiple Files
Place images in different markdown files, run once:
```bash
pnpm run smart:optimize
```
All processed together!

### 3. Check Before Committing
```bash
# After running smart:optimize
pnpm run dev

# Verify images look good in browser
# Then commit
git add .
git commit -m "Add optimized images"
```

---

## 🔧 Commands

```bash
# Smart optimize (use this!)
pnpm run smart:optimize

# Start dev server
pnpm run dev

# Manual optimize (if needed)
pnpm run optimize:images

# Generate blurhash only
pnpm run generate:blurhash
```

---

## ✅ Checklist

- [ ] Place raw image in markdown folder
- [ ] Reference in markdown: `![](image.jpg)`
- [ ] Run `pnpm run smart:optimize`
- [ ] Check browser with `pnpm run dev`
- [ ] Commit changes

---

## 📊 Expected Output

```
╔════════════════════════════════════════════════════════╗
║     Smart Image Processor - Auto Optimization         ║
╚════════════════════════════════════════════════════════╝

Scanning for images in markdown files...

Found 1 image(s) to process:

1. ashoka.jpg in upsc/gs1/ancient-history/mauryan-empire.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Processing: ashoka.jpg
From: upsc/gs1/ancient-history/mauryan-empire.md
Target: public/images/upsc/gs1/ancient-history/mauryan-empire/ashoka.jpg
✓ Created directory
✓ Compressed: 2.34 MB → 567.89 kB (-75.7%)
✓ Generated blurhash
✓ Generated alt text: "Ashoka"
✓ Generated markdown code
✓ Updated markdown file
✓ Removed original image

✨ SUCCESS!

🎉 PROCESSING COMPLETE!
✓ Successful: 1
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "No images found" | Reference image in markdown: `![](image.jpg)` |
| "Image not found" | Place image in same folder as .md file |
| Bad alt text | Rename file: `IMG_1234.jpg` → `ashoka.jpg` |
| Script error | Check image file format (JPG, PNG, WebP) |

---

## 🎯 Bottom Line

**Old way:** 10 minutes per image  
**Smart way:** 30 seconds for ALL images

Just place, reference, run! 🚀

---

**Read full guide:** `SMART_IMAGE_WORKFLOW.md`
