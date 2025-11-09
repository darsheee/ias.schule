# 🎨 Auto Gallery - Quick Reference

## ⚡ How Many Images = What Layout?

| Count | Layout | Grid Classes |
|-------|--------|--------------|
| **1** | Centered | `my-8 flex justify-center` |
| **2** | 2-Column Grid | `grid grid-cols-1 md:grid-cols-2` |
| **3** | 3-Column Grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| **4** | 4-Column Grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |
| **5+** | Flexible Grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |

---

## 📝 Input Examples

### 1 Image (Centered):
```md
![](ashoka.jpg)
```

### 2 Images (Side-by-Side):
```md
![](img1.jpg)
![](img2.jpg)
```

### 3 Images (3-Column):
```md
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)
```

### 4 Images (4-Column):
```md
![](img1.jpg)
![](img2.jpg)
![](img3.jpg)
![](img4.jpg)
```

---

## 📱 Responsive Behavior

### Mobile (<768px):
- All layouts → 1 column (stacked)

### Tablet (768px+):
- 1 image → Centered
- 2+ images → 2 columns

### Desktop (1024px+):
- 1 image → Centered
- 2 images → 2 columns
- 3 images → 3 columns
- 4 images → 4 columns
- 5+ images → 3 columns

### XL Desktop (1280px+):
- 5+ images → 4 columns

---

## ⚡ Command

```bash
pnpm run smart:optimize
```

---

## ✨ Features Applied

✅ Auto gallery detection  
✅ Responsive UnoCSS grids  
✅ Image compression  
✅ Blurhash generation  
✅ Auto alt text  
✅ Click-to-zoom  
✅ Perfect spacing  
✅ Rounded corners  
✅ Shadows  

---

## 📚 Full Guides

- `AUTO_GALLERY_GUIDE.md` - Complete guide
- `GALLERY_EXAMPLES.md` - Visual examples
- `SMART_IMAGE_WORKFLOW.md` - Full workflow

---

**Just add images, run script, get beautiful galleries!** 🎉
