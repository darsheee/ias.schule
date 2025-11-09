# 🔄 Image Workflow Diagram

## Simple 3-Step Process

```
┌─────────────────────────────────────────────────────────────────┐
│                     STEP 1: ADD IMAGE                           │
│                                                                 │
│  Copy your image to the appropriate folder:                    │
│  ✓ public/images/        (most common)                        │
│  ✓ public/screenshots/   (app screenshots)                    │
│  ✓ assets/               (build-time processing)              │
│  ✓ avatars/              (profile pictures)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  STEP 2: OPTIMIZE IMAGE                         │
│                                                                 │
│  Run in terminal:                                              │
│  $ pnpm run optimize:images                                    │
│                                                                 │
│  Expected result:                                              │
│  [COMP]   2.34 MB ->  567.89 kB  -75.7%  public/images/x.jpg │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: USE IN MARKDOWN                       │
│                                                                 │
│  Option A - Simple:                                            │
│  ![Alt text](/images/your-image.jpg)                          │
│                                                                 │
│  Option B - HTML:                                              │
│  <img src="/images/your-image.jpg" alt="..." loading="lazy"/> │
│                                                                 │
│  Option C - Component:                                         │
│  <OptimizedImage src="/images/your-image.jpg" alt="..." />   │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Workflow

```
📁 Your Computer
    │
    └─→ Copy image file
           │
           ↓
📂 public/images/your-image.jpg
    │
    ├─→ Run: pnpm run optimize:images
    │      │
    │      └─→ [Compression Process]
    │             │
    │             ├─ Resize if > 1440px
    │             ├─ Compress (quality 80)
    │             └─ Save if > 10% smaller
    │
    └─→ Compressed: public/images/your-image.jpg ✓
           │
           ↓
📝 Markdown File (e.g., british-entry.md)
    │
    ├─→ Add image syntax:
    │   ![Description](/images/your-image.jpg)
    │
    └─→ Save file
           │
           ↓
🌐 Browser (localhost:3333)
    │
    └─→ Image appears optimized ✓
```

## Folder Structure Reference

```
ias.schule/
│
├── public/                    ← Place images here
│   ├── images/               ← Main images folder
│   │   ├── history/         ← Organize by subject
│   │   │   ├── ancient/
│   │   │   ├── medieval/
│   │   │   └── modern/
│   │   ├── geography/
│   │   ├── diagrams/
│   │   └── charts/
│   │
│   ├── screenshots/          ← App screenshots
│   ├── og-image.png         ← Social media preview
│   └── favicon.svg          ← Site icon
│
├── assets/                   ← Build-time images
│   └── graphics/
│
├── avatars/                  ← Profile pictures
│   ├── author1.png
│   └── author2.webp
│
└── upsc/                     ← Your content
    └── gs1/
        └── modern-history/
            └── british-entry.md  ← Use images here
```

## Image Path Reference

### ✅ Correct Paths (in Markdown)

```md
From any markdown file:
![Image](/images/history/map.jpg)          ← Absolute path
<img src="/images/chart.png" />             ← Absolute path
<OptimizedImage src="/avatars/author.jpg"/> ← Absolute path
```

### ❌ Wrong Paths

```md
![Image](../../../public/images/map.jpg)   ← Don't use relative to public
![Image](./images/map.jpg)                 ← Don't use relative paths
<img src="images/chart.png" />              ← Missing leading slash
```

## File Naming Convention

```
✅ GOOD:
british-east-india-company.jpg
battle-of-plassey-1757.png
map-india-mughal-empire.webp
diagram-administrative-structure.png

❌ AVOID:
IMG_1234.jpg
photo1.png
pic.jpg
Screenshot 2024-11-09.png
```

## Scripts Quick Reference

```bash
# Compress all images in project
pnpm run optimize:images

# Compress only staged images (before commit)
pnpm run compress

# Start dev server to view changes
pnpm run dev

# Build for production
pnpm run build
```

## When to Use Each Image Method

### 1. Simple Markdown Syntax
```md
![Alt text](/images/photo.jpg)
```
**Use when:** Simple image in content, no special styling needed

### 2. HTML img Tag
```md
<img src="/images/photo.jpg" alt="..." loading="lazy" class="rounded-lg" />
```
**Use when:** Need custom styling, classes, or attributes

### 3. OptimizedImage Component
```md
<OptimizedImage src="/images/photo.jpg" alt="..." blurhash="..." />
```
**Use when:** Want blurhash placeholders, best performance

## Complete Real-World Example

### Before Adding Image:

```md
# British Entry (1599-1765)

The British East India Company was formed in 1600...
```

### Step 1: Add Image File

```bash
# Copy your image to public folder
public/images/history/east-india-company.jpg
```

### Step 2: Compress

```bash
$ pnpm run optimize:images

Found 1 images to process
[COMP]   3.2 MB ->  456 kB  -85.8%  public/images/history/east-india-company.jpg
✅ Image compression completed!
```

### Step 3: Update Markdown

```md
# British Entry (1599-1765)

The British East India Company was formed in 1600...

![British East India Company headquarters in London](/images/history/east-india-company.jpg)

The company received a Royal Charter from Queen Elizabeth I...
```

### Result in Browser:

```
┌────────────────────────────────────────┐
│  British Entry (1599-1765)             │
│                                        │
│  The British East India Company was... │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │                                  │ │
│  │   [East India Company Image]    │ │
│  │                                  │ │
│  └──────────────────────────────────┘ │
│  British East India Company HQ        │
│                                        │
│  The company received a Royal...       │
└────────────────────────────────────────┘
```

## Troubleshooting Flow

```
Image not showing?
    │
    ├─→ Check path starts with /  ✓
    ├─→ File in public/ folder?   ✓
    ├─→ Filename correct?          ✓
    ├─→ Dev server restarted?      ✓
    └─→ Browser cache cleared?     ✓
```

## Performance Checklist

- [ ] Image compressed (run `optimize:images`)
- [ ] File size < 500KB (preferably < 200KB)
- [ ] Dimensions appropriate (max 1440px)
- [ ] Format correct (JPEG for photos, PNG for graphics)
- [ ] Alt text provided
- [ ] loading="lazy" for below-fold images
- [ ] loading="eager" for above-fold images
- [ ] Tested in browser

## Pro Tips Diagram

```
📸 Raw Image (3.2 MB)
    │
    ↓ pnpm run optimize:images
    │
📦 Compressed (456 KB) → 85% smaller!
    │
    ↓ Used in markdown
    │
🌐 Loads in browser → Fast & smooth!
```

---

**Quick Start:** Copy image → Run `pnpm run optimize:images` → Add to markdown → Done! 🎉
