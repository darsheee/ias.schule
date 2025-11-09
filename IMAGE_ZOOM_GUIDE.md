# 🔍 Image Zoom / Lightbox Feature

## ✨ What's New?

**All content images now support click-to-zoom!** 

Click any image to view it in a beautiful full-screen lightbox with:
- ✅ **Full-screen view** with dark backdrop
- ✅ **Automatic zoom** to fill screen
- ✅ **ESC key** to close
- ✅ **Click backdrop** to close
- ✅ **Image captions** displayed
- ✅ **Smooth animations**
- ✅ **Works on all devices**

---

## 🎯 How It Works

### Automatic for All Content Images

**By default, ALL images in your content are zoomable!**

```md
# Any of these will be zoomable:

![Historical Map](/images/map.jpg)

<img src="/images/photo.jpg" alt="Photo" />

<OptimizedImage src="/images/hero.jpg" alt="Hero" />
```

**Just click the image** → Full-screen lightbox opens! 📸

---

## 🚀 Usage Examples

### Example 1: Regular Markdown Image (Auto Zoomable)

```md
# British Entry Into India

![East India Company](/images/history/company.jpg)

Click the image above to zoom!
```

✅ **Automatically zoomable** - no extra code needed!

---

### Example 2: HTML Image (Auto Zoomable)

```md
<img 
  src="/images/history/battle.jpg" 
  alt="Battle of Plassey"
  loading="lazy"
/>
```

✅ **Automatically zoomable** - works with HTML too!

---

### Example 3: OptimizedImage Component (Auto Zoomable)

```md
<OptimizedImage 
  src="/images/history/map.jpg" 
  alt="Historical Map"
/>
```

✅ **Automatically zoomable** by default!

---

### Example 4: Disable Zoom (If Needed)

```md
<!-- For OptimizedImage -->
<OptimizedImage 
  src="/images/icon.jpg" 
  alt="Small Icon"
  :zoomable="false"
/>

<!-- For regular HTML img -->
<img 
  src="/images/logo.jpg" 
  alt="Logo"
  class="no-zoom"
/>
```

❌ **Not zoomable** - useful for small icons, logos

---

### Example 5: Image with Caption

```md
<figure>
  <img src="/images/history/map.jpg" alt="India 1765" />
  <figcaption>Map of British India in 1765</figcaption>
</figure>
```

When zoomed, the caption appears at the bottom! ✨

---

## 🎨 Features in Detail

### 1. Click to Zoom

Simply click any image in content:
- Image expands to full screen
- Dark backdrop dims the page
- Image is centered and scaled to fit

### 2. Close Options

Three ways to close the lightbox:
1. **Press ESC** key
2. **Click the X button** (top-right)
3. **Click the backdrop** (anywhere outside image)

### 3. Responsive

Works on all screen sizes:
- **Desktop**: Full-screen overlay
- **Tablet**: Optimized for touch
- **Mobile**: Swipe-friendly (backdrop click)

### 4. Captions

If your image has:
- An `alt` attribute
- A `<figcaption>` in parent `<figure>`

The caption will display at the bottom of the lightbox!

### 5. Smooth Animations

- Fade in/out transitions
- Backdrop blur effect
- Hover effects on close button

---

## 🔧 Control Zoom Behavior

### Make Image NON-Zoomable

**Method 1: Using OptimizedImage**
```md
<OptimizedImage 
  src="/images/small-icon.jpg" 
  :zoomable="false"
/>
```

**Method 2: Using HTML Class**
```md
<img src="/images/logo.jpg" class="no-zoom" />
```

**Method 3: Using Markdown with HTML**
```md
![Logo](/images/logo.jpg){.no-zoom}
```

### Force Zoomable (Outside Content Area)

If you have images outside the main content:
```md
<div data-zoomable>
  <img src="/images/sidebar-image.jpg" alt="Sidebar" />
</div>
```

---

## 📝 Real Examples from Your Content

### british-entry.md

**Before (Simple):**
```md
# British Entry Into India

The British East India Company was formed in 1600...
```

**After (With Zoomable Images):**
```md
# British Entry Into India

![East India Company Logo](/images/history/east-india-company.jpg)
*Click to zoom and see details*

The British East India Company was formed in 1600...

## Battle of Plassey

<figure>
  <img src="/images/history/battle-plassey.jpg" alt="Battle of Plassey 1757" />
  <figcaption>The decisive Battle of Plassey (1757)</figcaption>
</figure>

*Click the image above to view in full screen!*
```

---

## 🎯 Best Practices

### ✅ DO:

1. **Let most images be zoomable** (default behavior)
   ```md
   ![Description](/images/photo.jpg)
   ```

2. **Add descriptive alt text** (shows in lightbox)
   ```md
   ![Map showing British territories in India, 1765](/images/map.jpg)
   ```

3. **Use captions for context**
   ```md
   <figure>
     <img src="/images/photo.jpg" alt="Photo" />
     <figcaption>Detailed historical context here</figcaption>
   </figure>
   ```

4. **Disable zoom for UI elements**
   ```md
   <img src="/images/logo.svg" class="no-zoom" />
   ```

### ❌ DON'T:

1. **Disable zoom unnecessarily** - Users love zooming!
2. **Skip alt text** - Important for accessibility AND captions
3. **Use tiny images** - If they're not worth zooming, maybe use icons

---

## 🎨 Customization

### Change Lightbox Styles

Edit `.vitepress/theme/components/ImageLightbox.vue`:

```vue
<style scoped>
.lightbox-backdrop {
  background: rgba(0, 0, 0, 0.9);  /* ← Change darkness */
  backdrop-filter: blur(8px);       /* ← Change blur */
}

.lightbox-image {
  border-radius: 8px;               /* ← Change corners */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); /* ← Change shadow */
}
</style>
```

### Change Close Button

Modify the close button styles in `ImageLightbox.vue`:

```vue
.lightbox-close {
  width: 48px;              /* ← Change size */
  height: 48px;
  background: rgba(255, 255, 255, 0.1); /* ← Change color */
}
```

---

## ⚙️ Technical Details

### How It Works

1. **ImageLightbox.vue** component is globally mounted in `PwaLayout.vue`
2. **Click listener** on document captures image clicks
3. **Checks** if image is in content area (`.vp-doc`) or has `data-zoomable`
4. **Excludes** images with `no-zoom` class
5. **Opens** lightbox overlay with clicked image
6. **Listens** for ESC key or backdrop click to close

### Files Involved

```
.vitepress/theme/
├── PwaLayout.vue              ← Mounts ImageLightbox
├── components/
│   ├── ImageLightbox.vue      ← Lightbox component
│   └── OptimizedImage.vue     ← Image component with zoom support
```

---

## 🐛 Troubleshooting

### Image Not Zoomable?

**Check:**
1. Is image in content area? (Markdown content)
2. Does image have `no-zoom` class?
3. Is `zoomable="false"` set?
4. Try adding `data-zoomable` to parent div

### Zoom Opens for Wrong Images?

Add `no-zoom` class:
```md
<img src="/images/icon.jpg" class="no-zoom" />
```

### Caption Not Showing?

Make sure you have:
```md
<!-- Either alt text -->
![Descriptive alt text](/images/photo.jpg)

<!-- Or figcaption -->
<figure>
  <img src="/images/photo.jpg" alt="Photo" />
  <figcaption>Caption text here</figcaption>
</figure>
```

---

## 🎯 Quick Reference

### Zoomable by Default
```md
![Image](/images/photo.jpg)
<img src="/images/photo.jpg" />
<OptimizedImage src="/images/photo.jpg" />
```

### Disable Zoom
```md
<OptimizedImage src="/images/icon.jpg" :zoomable="false" />
<img src="/images/logo.jpg" class="no-zoom" />
```

### With Caption
```md
<figure>
  <img src="/images/photo.jpg" alt="Photo" />
  <figcaption>Caption here</figcaption>
</figure>
```

### Keyboard Shortcuts
- **ESC** - Close lightbox
- **Click** - Open/close lightbox

---

## ✅ Testing Checklist

- [ ] Click image in content - Opens lightbox
- [ ] Press ESC - Closes lightbox
- [ ] Click X button - Closes lightbox
- [ ] Click backdrop - Closes lightbox
- [ ] Caption displays (if provided)
- [ ] Image fills screen appropriately
- [ ] Works on mobile devices
- [ ] `no-zoom` images don't open
- [ ] Smooth animations

---

## 🎉 Summary

**You now have a beautiful image zoom feature!**

- ✅ **Automatic** for all content images
- ✅ **No configuration** needed
- ✅ **Professional** user experience
- ✅ **Mobile-friendly**
- ✅ **Keyboard accessible**

Just add images to your markdown and they'll automatically be zoomable! 🚀

---

**Pro Tip:** Add descriptive alt text to your images - it serves as both accessibility text AND the caption in the lightbox! 💡
