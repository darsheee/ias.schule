---
title: "\U0001F3AF Practical Example: Adding Images to Your Content"
tags:
  - 'real-example:-adding-images-to-`british-entry.md`'
  - "\U0001F4DD-current-file-location"
  - "\U0001F5BC️-images-you-might-want-to-add"
  - step-by-step-process
  - east-india-company-&-early-british-presence-(1599-1765)
readingTime: 7 min
lastUpdated: '2025-11-09'
---
# 🎯 Practical Example: Adding Images to Your Content

## Real Example: Adding Images to `british-entry.md`

Let me show you exactly how to add images to your existing `british-entry.md` file.

---

## 📝 Current File Location

```
upsc/gs1/modern-history/british-entry.md
```

## 🖼️ Images You Might Want to Add

1. Map of British India (1765)
2. East India Company coat of arms
3. Portrait of Robert Clive
4. Battle of Plassey painting
5. Surat trading post illustration

---

## Step-by-Step Process

### STEP 1: Create Image Folder Structure

```bash
# Create organized folders
mkdir -p public/images/history/modern/british-entry
```

**Result:**
```
public/
└── images/
    └── history/
        └── modern/
            └── british-entry/
                ← Place your images here
```

### STEP 2: Add Your Images

Copy your images to the folder:

```bash
# Example: Copy images to the folder
# You can do this manually via File Explorer or command line

# Windows File Explorer:
# Navigate to: C:\Users\Lenovo\Documents\GitHub\ias.schule\public\images\history\modern\british-entry
# Copy your images there
```

**Example files:**
```
public/images/history/modern/british-entry/
├── east-india-company-logo.jpg
├── map-india-1765.png
├── robert-clive-portrait.jpg
├── battle-of-plassey.jpg
└── surat-trading-post.jpg
```

### STEP 3: Compress Images

```bash
cd C:\Users\Lenovo\Documents\GitHub\ias.schule
pnpm run optimize:images
```

**Expected Output:**
```
Found 5 images to process

[COMP]   2.34 MB ->  567.89 kB  -75.7%  public/images/history/modern/british-entry/map-india-1765.png
[COMP]   1.89 MB ->  423.12 kB  -77.6%  public/images/history/modern/british-entry/robert-clive-portrait.jpg
[COMP]   3.12 MB ->  689.45 kB  -77.9%  public/images/history/modern/british-entry/battle-of-plassey.jpg
[SKIP]   234.56 kB ->  229.34 kB   -2.2%  public/images/history/modern/british-entry/east-india-company-logo.jpg
[COMP]   1.67 MB ->  398.23 kB  -76.2%  public/images/history/modern/british-entry/surat-trading-post.jpg

✅ Image compression completed!
```

### STEP 4: Update Your Markdown File

Open: `upsc\gs1\modern-history\british-entry.md`

**BEFORE (Current):**
```md
---
title: British Entry Into India | 1599-1765
---

# British Entry Into India
## East India Company & Early British Presence (1599-1765)

The Elizabethan era's energy drove English merchants...
```

**AFTER (With Images):**
```md
---
title: British Entry Into India | 1599-1765
---

# British Entry Into India
## East India Company & Early British Presence (1599-1765)

<div class="my-6">
  <img 
    src="/images/history/modern/british-entry/east-india-company-logo.jpg" 
    alt="East India Company Coat of Arms" 
    loading="eager"
    class="mx-auto rounded-lg shadow-lg max-w-md"
  />
</div>

The Elizabethan era's energy drove English merchants to establish the East India Company, competing with Portuguese, Dutch, and French powers in India. From trading posts at Surat, Madras, Bombay, and Calcutta, British commercial interests gradually transformed into territorial ambitions, culminating in Clive's victory at Plassey (1757) and the acquisition of Diwani rights over Bengal, Bihar, and Orissa.

---

## 📅 Foundation of East India Company (1599-1600)

:::details **22 Sept 1599 - Founding Meeting**
Founding meeting at Founder's Hall, London with 101 merchants. Initial subscriptions: £30,133
:::

:::details **23 Sept 1600 - First Governor**
Thomas Smythe elected as first Governor of East India Company
:::

:::details **31 Dec 1600 - Royal Charter**
**Elizabeth I granted charter** founding the Honourable East India Company with 15-year trade monopoly in the East
:::

---

## 🚢 Early Voyages & Trade (1601-1620)

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div>
    <img 
      src="/images/history/modern/british-entry/surat-trading-post.jpg" 
      alt="Surat Trading Post" 
      loading="lazy"
      class="rounded-lg shadow-lg w-full"
    />
    <p class="text-sm text-gray-600 mt-2 text-center">Surat Trading Post (1613)</p>
  </div>
  <div>
    <h3>Establishing Presence in India</h3>
    <p>The English gradually established trading posts along the Indian coast...</p>
  </div>
</div>

:::details **1601-12 - Spice Trade Focus**
Company focused on spice trade: pepper, cloves, nutmeg in East Indies archipelago
:::

[... rest of your content ...]

---

## Battle of Plassey (1757)

<div class="my-8">
  <img 
    src="/images/history/modern/british-entry/battle-of-plassey.jpg" 
    alt="Battle of Plassey 1757" 
    loading="lazy"
    class="rounded-lg shadow-xl w-full"
  />
  <p class="text-sm text-gray-600 mt-2 text-center italic">The Battle of Plassey marked the beginning of British political dominance in India</p>
</div>

### Robert Clive

<div class="flex items-start gap-6 my-6">
  <img 
    src="/images/history/modern/british-entry/robert-clive-portrait.jpg" 
    alt="Robert Clive Portrait" 
    loading="lazy"
    class="rounded-lg shadow-lg w-48 flex-shrink-0"
  />
  <div>
    <h4>Major General Robert Clive</h4>
    <p>Robert Clive, also known as Clive of India, was instrumental in establishing British rule...</p>
  </div>
</div>

---

## Territorial Expansion

<div class="my-8">
  <img 
    src="/images/history/modern/british-entry/map-india-1765.png" 
    alt="Map of British India in 1765" 
    loading="lazy"
    class="rounded-lg shadow-xl w-full"
  />
  <p class="text-sm text-gray-600 mt-2 text-center">British territories in India by 1765 after the grant of Diwani rights</p>
</div>

[... rest of your content ...]
```

---

## 🎨 Different Ways to Add Images

### 1. Simple Image (Markdown)

```md
![East India Company Logo](/images/history/modern/british-entry/east-india-company-logo.jpg)
```

**Use for:** Quick, simple images in content

### 2. Centered Image with Shadow

```md
<div class="my-6">
  <img 
    src="/images/history/modern/british-entry/map.jpg" 
    alt="Map" 
    class="mx-auto rounded-lg shadow-lg max-w-3xl"
  />
</div>
```

**Use for:** Important images that need emphasis

### 3. Full-Width Image

```md
<div class="my-8 -mx-4 md:-mx-8">
  <img 
    src="/images/history/modern/british-entry/banner.jpg" 
    alt="Banner" 
    class="w-full"
  />
</div>
```

**Use for:** Hero images, banners

### 4. Image with Caption

```md
<figure class="my-8">
  <img 
    src="/images/history/modern/british-entry/photo.jpg" 
    alt="Photo" 
    class="rounded-lg shadow-lg"
  />
  <figcaption class="text-sm text-gray-600 mt-2 text-center italic">
    Caption text here
  </figcaption>
</figure>
```

**Use for:** Images needing detailed descriptions

### 5. Side-by-Side Images

```md
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/images/history/modern/british-entry/img1.jpg" alt="Image 1" class="rounded-lg" />
  <img src="/images/history/modern/british-entry/img2.jpg" alt="Image 2" class="rounded-lg" />
</div>
```

**Use for:** Comparisons, before/after

### 6. Image with Text Beside It

```md
<div class="flex items-start gap-6 my-6">
  <img 
    src="/images/history/modern/british-entry/portrait.jpg" 
    alt="Portrait" 
    class="rounded-lg shadow-lg w-48 flex-shrink-0"
  />
  <div>
    <h4>Person Name</h4>
    <p>Description text here...</p>
  </div>
</div>
```

**Use for:** Biographical content, profiles

### 7. Image Gallery (3 columns)

```md
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <img src="/images/history/modern/british-entry/img1.jpg" alt="1" loading="lazy" class="rounded" />
  <img src="/images/history/modern/british-entry/img2.jpg" alt="2" loading="lazy" class="rounded" />
  <img src="/images/history/modern/british-entry/img3.jpg" alt="3" loading="lazy" class="rounded" />
  <img src="/images/history/modern/british-entry/img4.jpg" alt="4" loading="lazy" class="rounded" />
  <img src="/images/history/modern/british-entry/img5.jpg" alt="5" loading="lazy" class="rounded" />
  <img src="/images/history/modern/british-entry/img6.jpg" alt="6" loading="lazy" class="rounded" />
</div>
```

**Use for:** Multiple related images

---

## 🚀 Test Your Changes

### 1. Start Dev Server

```bash
pnpm run dev
```

### 2. Open in Browser

Navigate to: `http://localhost:5173/upsc/gs1/modern-history/british-entry`

### 3. Check Images Load

- ✅ Images appear correctly
- ✅ No broken image icons
- ✅ Images are responsive on mobile
- ✅ Loading is smooth

---

## 📋 Complete Workflow Checklist

For each image you add:

- [ ] **1. Organize**: Place image in `public/images/[category]/[subcategory]/`
- [ ] **2. Name**: Use descriptive kebab-case names (`battle-of-plassey.jpg`)
- [ ] **3. Compress**: Run `pnpm run optimize:images`
- [ ] **4. Add to MD**: Use appropriate syntax based on layout needs
- [ ] **5. Alt Text**: Write descriptive alt text for accessibility
- [ ] **6. Loading**: Use `loading="lazy"` except for above-fold images
- [ ] **7. Styling**: Add appropriate classes (rounded, shadow, etc.)
- [ ] **8. Test**: Check in browser on desktop and mobile
- [ ] **9. Commit**: Add to git and commit

---

## 💡 UnoCSS Classes You Can Use

### Sizing
```md
class="w-full"           → 100% width
class="w-1/2"            → 50% width
class="max-w-md"         → Max width medium (448px)
class="max-w-2xl"        → Max width 2xl (672px)
class="max-w-4xl"        → Max width 4xl (896px)
class="h-auto"           → Automatic height
```

### Spacing
```md
class="my-4"             → Margin top & bottom
class="mx-auto"          → Center horizontally
class="p-4"              → Padding all sides
class="gap-4"            → Gap between grid items
```

### Borders & Effects
```md
class="rounded"          → Slightly rounded corners
class="rounded-lg"       → Large rounded corners
class="rounded-full"     → Fully rounded (circle)
class="shadow"           → Basic shadow
class="shadow-lg"        → Large shadow
class="shadow-xl"        → Extra large shadow
```

### Responsive
```md
class="md:w-1/2"         → 50% width on medium screens
class="lg:grid-cols-3"   → 3 columns on large screens
class="md:flex"          → Flex layout on medium screens
```

### Layout
```md
class="flex"             → Flexbox layout
class="grid"             → Grid layout
class="grid-cols-2"      → 2 column grid
class="items-center"     → Center items vertically
class="justify-center"   → Center items horizontally
```

---

## 🎯 Quick Commands Reference

```bash
# Navigate to project
cd C:\Users\Lenovo\Documents\GitHub\ias.schule

# Compress images
pnpm run optimize:images

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# View specific page
# Browser: http://localhost:5173/upsc/gs1/modern-history/british-entry
```

---

## ✅ Success Checklist

Your image integration is successful when:

- ✅ Image appears on the page
- ✅ Image is sharp and clear
- ✅ File size is reasonable (< 500KB)
- ✅ Loading is smooth (no layout shift)
- ✅ Works on mobile devices
- ✅ Alt text is descriptive
- ✅ Page loads quickly

---

## 📚 Quick Reference

| Task | Command | Location |
|------|---------|----------|
| Add Image | Copy file | `public/images/` |
| Compress | `pnpm run optimize:images` | Terminal |
| Use in MD | `![Alt](/images/file.jpg)` | Markdown file |
| Test | `pnpm run dev` | Browser |

---

**Need more examples?** Check `HOW_TO_USE_IMAGES.md` for comprehensive guide!

**Visual workflow?** See `IMAGE_WORKFLOW_DIAGRAM.md` for diagrams!
