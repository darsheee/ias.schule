# 📸 Gallery Examples - Visual Guide

## 🎨 See What You Get with Auto Gallery Detection!

---

## Example 1: Single Image (Centered)

### Input:
```md
# Ashoka the Great

![](ashoka-pillar.jpg)

Ashoka erected pillars...
```

### Output:
```md
# Ashoka the Great

<div class="my-8 flex justify-center">
  <OptimizedImage 
    src="/images/.../ashoka-pillar.jpg" 
    alt="Ashoka Pillar"
    blurhash="U02r,A01yART..."
    class="rounded-lg shadow-lg max-w-4xl"
  />
</div>

Ashoka erected pillars...
```

### Browser Result:
```
┌─────────────────────────────────────────┐
│           Ashoka the Great              │
│                                         │
│     ┌───────────────────────────┐      │
│     │                           │      │
│     │   [Ashoka Pillar Image]   │      │
│     │     (Centered, Large)     │      │
│     │                           │      │
│     └───────────────────────────┘      │
│                                         │
│  Ashoka erected pillars...              │
└─────────────────────────────────────────┘
```

---

## Example 2: Two Images (2-Column Grid)

### Input:
```md
# British India

![](east-india-company.jpg)
![](battle-of-plassey.jpg)

The company's victory...
```

### Output:
```md
# British India

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <OptimizedImage 
    src="/images/.../east-india-company.jpg" 
    alt="East India Company"
    blurhash="..."
    class="rounded-lg shadow-md w-full"
  />
  <OptimizedImage 
    src="/images/.../battle-of-plassey.jpg" 
    alt="Battle Of Plassey"
    blurhash="..."
    class="rounded-lg shadow-md w-full"
  />
</div>

The company's victory...
```

### Browser Result (Desktop):
```
┌────────────────────────────────────────────────┐
│              British India                     │
│                                                │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │                  │  │                  │  │
│  │  [EIC Image]     │  │  [Battle Image]  │  │
│  │                  │  │                  │  │
│  └──────────────────┘  └──────────────────┘  │
│                                                │
│  The company's victory...                      │
└────────────────────────────────────────────────┘
```

### Browser Result (Mobile):
```
┌──────────────────────┐
│   British India      │
│                      │
│  ┌────────────────┐ │
│  │ [EIC Image]    │ │
│  └────────────────┘ │
│                      │
│  ┌────────────────┐ │
│  │ [Battle Image] │ │
│  └────────────────┘ │
│                      │
│  The company's...    │
└──────────────────────┘
```

---

## Example 3: Three Images (3-Column Grid)

### Input:
```md
# Mauryan Dynasty

![](chandragupta-maurya.jpg)
![](bindusara.jpg)
![](ashoka.jpg)

The three great emperors...
```

### Output:
```md
# Mauryan Dynasty

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <OptimizedImage src="..." alt="Chandragupta Maurya" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Bindusara" blurhash="..." class="rounded-lg shadow-md w-full" />
  <OptimizedImage src="..." alt="Ashoka" blurhash="..." class="rounded-lg shadow-md w-full" />
</div>

The three great emperors...
```

### Browser Result (Desktop):
```
┌─────────────────────────────────────────────────────────────┐
│                    Mauryan Dynasty                          │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐ │
│  │               │  │               │  │               │ │
│  │ [Chandragupta]│  │ [Bindusara]   │  │   [Ashoka]    │ │
│  │               │  │               │  │               │ │
│  └───────────────┘  └───────────────┘  └───────────────┘ │
│                                                             │
│  The three great emperors...                                │
└─────────────────────────────────────────────────────────────┘
```

### Browser Result (Tablet):
```
┌────────────────────────────────────────┐
│          Mauryan Dynasty               │
│                                        │
│  ┌───────────────┐  ┌───────────────┐│
│  │               │  │               ││
│  │[Chandragupta] │  │ [Bindusara]   ││
│  │               │  │               ││
│  └───────────────┘  └───────────────┘│
│                                        │
│  ┌───────────────┐                    │
│  │   [Ashoka]    │                    │
│  └───────────────┘                    │
│                                        │
│  The three great emperors...           │
└────────────────────────────────────────┘
```

---

## Example 4: Four Images (4-Column Grid)

### Input:
```md
# Government Structure

![](president.jpg)
![](prime-minister.jpg)
![](lok-sabha.jpg)
![](rajya-sabha.jpg)

The four pillars...
```

### Browser Result (Desktop):
```
┌────────────────────────────────────────────────────────────────────────┐
│                      Government Structure                              │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │             │  │             │  │             │  │             │ │
│  │ [President] │  │   [PM]      │  │ [Lok Sabha] │  │[Rajya Sabha]│ │
│  │             │  │             │  │             │  │             │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                                        │
│  The four pillars...                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Example 5: Six Images (Flexible Grid)

### Input:
```md
# Freedom Struggle Timeline

![](jallianwala-1919.jpg)
![](non-cooperation-1920.jpg)
![](simon-commission-1928.jpg)
![](salt-march-1930.jpg)
![](quit-india-1942.jpg)
![](independence-1947.jpg)

Major milestones...
```

### Browser Result (Large Desktop - 4 cols):
```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                        Freedom Struggle Timeline                                   │
│                                                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                         │
│  │[Jallia-  │  │[Non-Coop]│  │[Simon]   │  │[Salt]    │                         │
│  │ wala]    │  │          │  │          │  │          │                         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                         │
│                                                                                    │
│  ┌──────────┐  ┌──────────┐                                                      │
│  │[Quit]    │  │[Indepen- │                                                      │
│  │          │  │ dence]   │                                                      │
│  └──────────┘  └──────────┘                                                      │
│                                                                                    │
│  Major milestones...                                                               │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Browser Result (Desktop - 3 cols):
```
┌─────────────────────────────────────────────────────────┐
│           Freedom Struggle Timeline                     │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │[Jallia-  │  │[Non-Coop]│  │[Simon]   │            │
│  │ wala]    │  │          │  │          │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │[Salt]    │  │[Quit]    │  │[Indepen- │            │
│  │          │  │          │  │ dence]   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  Major milestones...                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Example 6: Mixed Layout (Smart Detection)

### Input:
```md
# Ancient India

## Hero Image

![](map-ancient-india.jpg)

Text content here...

## Three Emperors

![](emperor1.jpg)
![](emperor2.jpg)
![](emperor3.jpg)

More text...

## Single Monument

![](taj-mahal.jpg)
```

### Output Structure:
```md
# Ancient India

## Hero Image

<div class="my-8 flex justify-center">
  <!-- Single centered image -->
</div>

Text content here...

## Three Emperors

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
  <!-- 3-column gallery -->
</div>

More text...

## Single Monument

<div class="my-8 flex justify-center">
  <!-- Single centered image -->
</div>
```

### Browser Result:
```
┌─────────────────────────────────────────┐
│           Ancient India                 │
│                                         │
│          Hero Image                     │
│                                         │
│     ┌───────────────────────┐          │
│     │   [Map - Centered]    │          │
│     └───────────────────────┘          │
│                                         │
│  Text content here...                   │
│                                         │
│          Three Emperors                 │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │[Emp 1] │  │[Emp 2] │  │[Emp 3] │  │
│  └────────┘  └────────┘  └────────┘  │
│                                         │
│  More text...                           │
│                                         │
│         Single Monument                 │
│                                         │
│     ┌───────────────────────┐          │
│     │  [Taj - Centered]     │          │
│     └───────────────────────┘          │
└─────────────────────────────────────────┘
```

---

## 📊 Responsive Breakpoints

### UnoCSS Breakpoints Used:

| Breakpoint | Screen Width | Class Prefix |
|------------|--------------|--------------|
| Mobile | < 768px | (default) |
| Tablet | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Large Desktop | ≥ 1280px | `xl:` |

### Gallery Layouts by Screen Size:

| Images | Mobile | Tablet | Desktop | XL Desktop |
|--------|--------|--------|---------|------------|
| 1 | Centered | Centered | Centered | Centered |
| 2 | 1 col | 2 cols | 2 cols | 2 cols |
| 3 | 1 col | 2 cols | 3 cols | 3 cols |
| 4 | 1 col | 2 cols | 4 cols | 4 cols |
| 5-6 | 1 col | 2 cols | 3 cols | 4 cols |
| 7-8 | 1 col | 2 cols | 3 cols | 4 cols |
| 9+ | 1 col | 2 cols | 3 cols | 4 cols |

---

## 🎨 Styling Details

### Single Image Classes:
```
Wrapper: my-8 flex justify-center
Image:   rounded-lg shadow-lg max-w-4xl
```

**Effect:**
- Vertical margin (my-8)
- Flexbox centering
- Large shadow for prominence
- Max width 896px (4xl)
- Rounded corners

### Gallery Image Classes:
```
Wrapper: grid grid-cols-* gap-4 my-8
Image:   rounded-lg shadow-md w-full
```

**Effect:**
- CSS Grid layout
- Medium shadow
- Full width within column
- Rounded corners
- 1rem gap between images

---

## 🚀 Usage Pattern

### For Historical Content:

```md
# [Topic]

## Single Hero Image
![](hero.jpg)

## Gallery of Related Items
![](item1.jpg)
![](item2.jpg)
![](item3.jpg)

## Another Single Image
![](diagram.jpg)
```

**Result:**
- Hero: Centered, prominent
- Items: 3-column responsive gallery
- Diagram: Centered

### For Comparative Analysis:

```md
# Comparison

## Before and After
![](before.jpg)
![](after.jpg)
```

**Result:**
- 2-column grid
- Perfect for comparisons

### For Timeline:

```md
# Evolution

![](period1.jpg)
![](period2.jpg)
![](period3.jpg)
![](period4.jpg)
```

**Result:**
- 4-column grid on desktop
- Shows progression

---

## ✨ Summary

**Just add images consecutively**, and the script:

1. ✅ Detects how many
2. ✅ Chooses perfect layout
3. ✅ Applies responsive classes
4. ✅ Optimizes everything
5. ✅ Creates beautiful galleries

**No manual configuration needed!** 🎉

---

**Try it with your content!** 🚀
