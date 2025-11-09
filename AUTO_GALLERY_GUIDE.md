---
title: "\U0001F3A8 Auto Gallery Detection - Smart Image Processor v2"
tags:
  - '✨-new-feature:-automatic-responsive-galleries!'
  - "\U0001F3AF-how-it-works"
  - "\U0001F4DD-real-world-examples"
  - the-three-great-emperors
  - the-three-great-emperors
readingTime: 7 min
lastUpdated: '2025-11-09'
---
# 🎨 Auto Gallery Detection - Smart Image Processor v2

## ✨ NEW Feature: Automatic Responsive Galleries!

The Smart Image Processor now **automatically detects** when you place multiple images together and creates **beautiful responsive galleries** with perfect UnoCSS grid layouts!

---

## 🎯 How It Works

### Single Image Detection
When you add **1 image**, it creates a **centered layout**:

```md
![](ashoka.jpg)
```

**Output:**
```md
<div class="my-8 flex justify-center">
  <OptimizedImage 
    src="/images/.../ashoka.jpg" 
    alt="Ashoka"
    blurhash="..."
    class="rounded-lg shadow-lg max-w-4xl"
  />
</div>
```

---

### 2-Image Gallery Detection
When you add **2 consecutive images**, it creates a **2-column grid**:

```md
![](ashoka.jpg)
![](bindusara.jpg)
```

**Output:**
```md
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <OptimizedImage 
    src="/images/.../ashoka.jpg" 
    alt="Ashoka"
    blurhash="..."
    class="rounded-lg shadow-md w-full"
  />
  <OptimizedImage 
    src="/images/.../bindusara.jpg" 
    alt="Bindusara"
    blurhash="..."
    class="rounded-lg shadow-md w-full"
  />
</div>
```

**Result:** 
- Mobile: 1 column
- Desktop: 2 columns

---

### 3-Image Gallery Detection
When you add **3 consecutive images**, it creates a **3-column grid**:

```md
![](chandragupta-maurya.jpg)
![](bindusara.jpg)
![](ashoka.jpg)
```

**Output:**
```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <OptimizedImage src="..." alt="Chandragupta Maurya" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Bindusara" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Ashoka" blurhash="..." class="rounded-lg shadow-md w-full" />
</div>
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### 4-Image Gallery Detection
When you add **4 consecutive images**, it creates a **4-column grid**:

```md
![](image1.jpg)
![](image2.jpg)
![](image3.jpg)
![](image4.jpg)
```

**Output:**
```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
  <!-- 4 OptimizedImage components -->
</div>
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

### 5+ Image Gallery Detection
When you add **5 or more images**, it creates a **flexible grid**:

```md
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)
![](img4.jpg)
![](img5.jpg)
![](img6.jpg)
```

**Output:**
```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
  <!-- 6 OptimizedImage components -->
</div>
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large Desktop: 4 columns

---

## 📝 Real-World Examples

### Example 1: Mauryan Dynasty (3 Emperors)

**Before (Your Input):**
```md
---
title: Mauryan Empire
---

# Mauryan Empire

## The Three Great Emperors

![](chandragupta-maurya.jpg)
![](bindusara.jpg)
![](ashoka.jpg)

These three emperors...
```

**After Running Script:**
```md
---
title: Mauryan Empire
---

# Mauryan Empire

## The Three Great Emperors

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <OptimizedImage 
    src="/images/upsc/gs1/ancient-history/mauryan-empire/chandragupta-maurya.jpg" 
    alt="Chandragupta Maurya"
    blurhash="ULB3qB00xu~q009F..."
    class="rounded-lg shadow-md w-full"
  />
  <OptimizedImage 
    src="/images/upsc/gs1/ancient-history/mauryan-empire/bindusara.jpg" 
    alt="Bindusara"
    blurhash="U8B3qB00xu~q009F..."
    class="rounded-lg shadow-md w-full"
  />
  <OptimizedImage 
    src="/images/upsc/gs1/ancient-history/mauryan-empire/ashoka.jpg" 
    alt="Ashoka"
    blurhash="U02r,A01yART01~p8..."
    class="rounded-lg shadow-md w-full"
  />
</div>

These three emperors...
```

**Browser Result:** Beautiful 3-column gallery, responsive!

---

### Example 2: Parliament Structure (Single Image)

**Before:**
```md
# Parliament of India

## Structure

![](parliament-seat-distribution.jpg)

The Parliament consists of...
```

**After:**
```md
# Parliament of India

## Structure

<div class="my-8 flex justify-center">
  <OptimizedImage 
    src="/images/upsc/gs2/polity/parliament/parliament-seat-distribution.jpg" 
    alt="Parliament Seat Distribution"
    blurhash="U8B3qB00..."
    class="rounded-lg shadow-lg max-w-4xl"
  />
</div>

The Parliament consists of...
```

**Browser Result:** Centered, large image with shadow!

---

### Example 3: Freedom Struggle Timeline (6 Images)

**Before:**
```md
# Freedom Struggle

## Major Events

![](jallianwala-bagh-1919.jpg)
![](non-cooperation-1920.jpg)
![](simon-commission-1928.jpg)
![](salt-march-1930.jpg)
![](quit-india-1942.jpg)
![](independence-1947.jpg)

These events shaped...
```

**After:**
```md
# Freedom Struggle

## Major Events

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
  <OptimizedImage src="..." alt="Jallianwala Bagh 1919" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Non Cooperation 1920" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Simon Commission 1928" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Salt March 1930" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Quit India 1942" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Independence 1947" blurhash="..." class="rounded-lg shadow-md w-full" />
</div>

These events shaped...
```

**Browser Result:** Responsive 4-column gallery on large screens!

---

## 🎨 UnoCSS Classes Applied

### Single Image (1)
```
Wrapper: my-8 flex justify-center
Image:   rounded-lg shadow-lg max-w-4xl
```
**Effect:** Centered, large, prominent

### 2-Image Gallery
```
Wrapper: grid grid-cols-1 md:grid-cols-2 gap-4 my-8
Image:   rounded-lg shadow-md w-full
```
**Effect:** Side-by-side on desktop, stacked on mobile

### 3-Image Gallery
```
Wrapper: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8
Image:   rounded-lg shadow-md w-full
```
**Effect:** 
- Mobile: 1 col
- Tablet: 2 cols
- Desktop: 3 cols

### 4-Image Gallery
```
Wrapper: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8
Image:   rounded-lg shadow-md w-full
```
**Effect:**
- Mobile: 1 col
- Tablet: 2 cols
- Desktop: 4 cols

### 5+ Image Gallery
```
Wrapper: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8
Image:   rounded-lg shadow-md w-full
```
**Effect:**
- Mobile: 1 col
- Tablet: 2 cols
- Desktop: 3 cols
- XL: 4 cols

---

## 🔄 How Detection Works

### Consecutive Images = Gallery

```md
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)

Text breaks the group

![](img4.jpg)
```

**Result:**
- First 3 images → 3-image gallery
- Last image → Single image (centered)

### Separated Images = Individual

```md
![](img1.jpg)

Some text here

![](img2.jpg)

More text

![](img3.jpg)
```

**Result:**
- Each image → Individual centered layout

---

## 📋 Complete Workflow Example

### Step 1: Add Your Images

```
upsc/gs1/ancient-history/
├── mauryan-empire.md
├── chandragupta-maurya.jpg
├── bindusara.jpg
└── ashoka.jpg
```

### Step 2: Reference Consecutively

```md
# Mauryan Empire

## The Dynasty

![](chandragupta-maurya.jpg)
![](bindusara.jpg)
![](ashoka.jpg)

These rulers...
```

### Step 3: Run Script

```bash
pnpm run smart:optimize
```

### Step 4: Console Output

```
╔════════════════════════════════════════════════════════╗
║  Smart Image Processor v2 - Auto Gallery Detection    ║
╚════════════════════════════════════════════════════════╝

Scanning for images in markdown files...

Found 3 image(s) in 1 group(s):

  upsc/gs1/ancient-history/mauryan-empire.md:
    • 3-image gallery (responsive grid)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Processing Group: 3 image(s)
File: upsc/gs1/ancient-history/mauryan-empire.md
Lines: 7-9
  Processing: chandragupta-maurya.jpg
  ✓ chandragupta-maurya.jpg
  Processing: bindusara.jpg
  ✓ bindusara.jpg
  Processing: ashoka.jpg
  ✓ ashoka.jpg

✓ Created 3-image gallery
  Gallery classes: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8
  Updated: upsc/gs1/ancient-history/mauryan-empire.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 PROCESSING COMPLETE!

✓ Successful groups: 1

  Galleries: 1 (responsive grid)

Features applied:
  • Automatic gallery detection
  • Responsive UnoCSS grid classes
  • Image compression
  • Blurhash generation
  • Descriptive alt text
  • Click-to-zoom enabled

✨ Your images are beautifully optimized! ✨
```

### Step 5: Result

Perfect 3-column responsive gallery with all optimizations!

---

## 🎯 Comparison Table

| Images | Layout | Mobile | Tablet | Desktop | XL |
|--------|--------|--------|--------|---------|-----|
| **1** | Centered | 1 col | 1 col | 1 col | 1 col |
| **2** | Grid | 1 col | 2 cols | 2 cols | 2 cols |
| **3** | Grid | 1 col | 2 cols | 3 cols | 3 cols |
| **4** | Grid | 1 col | 2 cols | 4 cols | 4 cols |
| **5+** | Grid | 1 col | 2 cols | 3 cols | 4 cols |

---

## 💡 Pro Tips

### 1. Group Related Images

```md
✅ Good:
![](emperor1.jpg)
![](emperor2.jpg)
![](emperor3.jpg)

❌ Less good:
![](emperor1.jpg)
Some text
![](emperor2.jpg)
More text
![](emperor3.jpg)
```

### 2. Use Descriptive Filenames

```md
✅ chandragupta-maurya.jpg → Alt: "Chandragupta Maurya"
✅ battle-of-plassey-1757.jpg → Alt: "Battle Of Plassey 1757"
```

### 3. Mix Single & Gallery

```md
# Content

<!-- Single hero image -->
![](hero.jpg)

Some content...

<!-- Gallery of 3 -->
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)

More content...

<!-- Another single -->
![](diagram.jpg)
```

**Result:**
- Hero → Centered
- 3 images → Gallery
- Diagram → Centered

---

## ✅ What Gets Automatically Applied

For **every** image, you get:

✅ **Compression** (60-80% smaller)  
✅ **Blurhash** (smooth loading)  
✅ **Alt text** (from filename)  
✅ **Click-to-zoom** (lightbox)  
✅ **Lazy loading** (performance)  
✅ **Responsive sizing** (all devices)  

For **galleries**, you also get:

✅ **Auto grid layout** (based on count)  
✅ **Responsive columns** (mobile-friendly)  
✅ **Proper spacing** (gap-4)  
✅ **Consistent styling** (shadows, rounded)  

---

## 🎉 Summary

### What You Do:
```md
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)
```

### What Script Does:
1. ✅ Detects 3 consecutive images
2. ✅ Creates 3-column responsive grid
3. ✅ Compresses all 3 images
4. ✅ Generates blurhash for each
5. ✅ Creates alt text for each
6. ✅ Wraps in gallery div
7. ✅ Applies UnoCSS classes
8. ✅ Updates markdown
9. ✅ Deletes originals

### Result:
```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <OptimizedImage src="..." alt="..." blurhash="..." class="..." />
  <OptimizedImage src="..." alt="..." blurhash="..." class="..." />
  <OptimizedImage src="..." alt="..." blurhash="..." class="..." />
</div>
```

**Perfect responsive gallery with zero manual work!** 🚀

---

## 🚀 Try It Now!

```bash
# Add 3 images to a markdown folder
# Reference them consecutively
# Run:
pnpm run smart:optimize

# Boom! Responsive gallery created! ✨
```

---

**Welcome to effortless image galleries!** 🎨✨
