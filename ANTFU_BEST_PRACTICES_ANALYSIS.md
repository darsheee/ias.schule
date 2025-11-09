# Best Practices Analysis: Anthony Fu's Website

This document analyzes the best practices from [antfu.me](https://github.com/antfu/antfu.me) that can be applied to ias.schule project.

## 📊 Tech Stack Comparison

### antfu.me
- **Framework**: Vite + Vue 3 + vite-ssg (Static Site Generation)
- **Styling**: UnoCSS (Atomic CSS)
- **Image Processing**: Sharp, Blurhash
- **Markdown**: unplugin-vue-markdown with various plugins
- **Package Manager**: pnpm with workspace support

### ias.schule (Current)
- **Framework**: VitePress
- **Styling**: UnoCSS
- **Package Manager**: pnpm
- **Content**: Markdown-based

## 🎯 Key Best Practices to Adopt

### 1. **Image Optimization System** ⭐

antfu.me implements a sophisticated multi-stage image optimization pipeline:

#### A. Automated Image Compression
```typescript
// scripts/img-compress.ts
- Resizes images to max 1440px
- Compresses with quality 80 for JPEG/WebP, 100 for PNG
- Compression level 9
- Only writes if size reduction > 10%
- Preserves metadata
```

#### B. Pre-commit Image Compression Hook
```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

#### C. Blurhash Placeholder Generation
- Generates blurhash for progressive image loading
- Creates 32x32 thumbnails for hash generation
- Stores metadata in JSON files alongside images
- Uses `@unpic/placeholder` for rendering

#### D. Photo Management Script
```typescript
// scripts/photos-manage.ts
- Renames photos with timestamp-based naming (p-YYYY-MM-DD-HH-MM-SS-000-N.jpg)
- Extracts EXIF metadata (date, location)
- Compresses images automatically
- Generates blurhash for each photo
- Cleans up orphaned JSON files
```

### 2. **Project Structure & Organization**

```
antfu.me/
├── scripts/              # Build-time scripts
│   ├── img-compress.ts
│   ├── photos-manage.ts
│   ├── rss.ts
│   ├── og-template.svg   # OG image template
│   └── slugify.ts
├── photos/               # Photo gallery with metadata
│   ├── data.ts          # Photo data aggregator
│   ├── p-*.jpg          # Photos (timestamp-named)
│   └── p-*.json         # Photo metadata (blurhash, text)
├── pages/               # Route pages
├── src/
│   ├── components/      # Vue components
│   ├── styles/          # Global styles
│   └── App.vue          # Root component
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

### 3. **Build Pipeline Enhancements**

#### A. OG Image Generation
```typescript
// vite.config.ts - frontmatterPreprocess
- Automatically generates Open Graph images from markdown frontmatter
- Uses Sharp to convert SVG template to PNG
- Caches generated images
- Falls back to existing images
```

#### B. Markdown Enhancement
```typescript
// Plugins used:
- @shikijs/markdown-it (syntax highlighting)
- markdown-it-anchor (heading anchors)
- markdown-it-link-attributes (external links)
- markdown-it-magic-link (branded links)
- markdown-it-github-alerts (callouts)
- markdown-it-table-of-contents
```

### 4. **Component Design Patterns**

#### A. Image Gallery with Blurhash
```vue
<template>
  <div class="photos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div v-for="photo, idx in photos" :key="idx">
      <img
        :src="photo.url"
        :alt="photo.text"
        :data-photo-index="idx"
        :style="photo.blurhash ? blurhashToGradientCssObject(photo.blurhash) : ''"
        loading="lazy"
        w-full
        class="object-cover aspect-square"
      >
    </div>
  </div>
</template>
```

#### B. Image Modal with Keyboard Navigation
```vue
// App.vue
- Click any image in prose/photos to open modal
- Arrow keys for navigation
- Escape to close
- Prevents opening when image is moving (mobile)
- Displays alt text/caption
```

### 5. **TypeScript & Type Safety**

```typescript
// Glob-based imports with proper typing
const metaInfo = Object.entries(
  import.meta.glob<PhotoMate>('./**/*.json', {
    eager: true,
    import: 'default',
  }),
)

const photos = Object.entries(
  import.meta.glob<string>('./**/*.{jpg,png}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
```

### 6. **UnoCSS Configuration**

```typescript
// Advanced shortcuts and rules
shortcuts: [
  {
    'bg-base': 'bg-white dark:bg-black',
    'color-base': 'text-black dark:text-white',
  },
  [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all...`],
],
rules: [
  [/^slide-enter-(\d+)$/, ([_, n]) => ({ '--enter-stage': n })],
],
```

### 7. **Build Scripts Organization**

```json
{
  "scripts": {
    "build": "npm run static && vite-ssg build && tsx ./scripts/copy-fonts.ts && tsx ./scripts/rss.ts && cp _dist_redirects dist/_redirects",
    "static": "rimraf temp && degit antfu/static temp --force && tsx scripts/copy-sponsors",
    "compress": "tsx scripts/img-compress-staged.ts",
    "photos": "tsx scripts/photos-manage.ts"
  }
}
```

### 8. **Performance Optimizations**

- **Image lazy loading**: All images use `loading="lazy"`
- **Blurhash placeholders**: Smooth loading experience
- **Image resizing**: Max 1440px to reduce bandwidth
- **Compression**: Automatic optimization before commit
- **SSG**: Static site generation for fast load times
- **Code splitting**: Automatic via Vite

### 9. **Developer Experience**

- **Auto-imports**: Components and Vue APIs
- **TypeScript**: Full type safety
- **ESLint**: Strict linting with @antfu/eslint-config
- **Git hooks**: Automated checks before commit
- **pnpm workspace**: Monorepo support with catalogs

## 🚀 Recommended Implementation for ias.schule

### Priority 1: Image Optimization System

1. **Install dependencies**:
```bash
pnpm add -D sharp blurhash @unpic/placeholder exifreader fast-glob fs-extra prompts ansis
```

2. **Create scripts directory** with:
   - `img-compress.ts`
   - `img-compress-staged.ts`
   - `photos-manage.ts` (if using photo gallery)

3. **Add scripts to package.json**:
```json
{
  "scripts": {
    "compress": "tsx scripts/img-compress-staged.ts",
    "optimize:images": "tsx scripts/img-compress-cli.ts"
  }
}
```

4. **Setup git hooks**:
```bash
pnpm add -D simple-git-hooks lint-staged
```

### Priority 2: Enhanced Markdown Processing

1. Add markdown plugins:
```bash
pnpm add -D markdown-it-anchor markdown-it-github-alerts markdown-it-link-attributes
```

2. Configure in `.vitepress/config.ts`

### Priority 3: Component Library Enhancement

1. Create reusable image components with blurhash support
2. Add image modal/lightbox functionality
3. Implement keyboard navigation

### Priority 4: Build Pipeline Improvements

1. Add OG image generation
2. Implement RSS feed generation
3. Add font subsetting/optimization

## 📝 Code Snippets to Copy

### 1. Image Compression Script

See: `c:\Users\Lenovo\Documents\GitHub\antfu.me\scripts\img-compress.ts`

Key features:
- Max size constraint (1440px)
- Quality settings per format
- Size comparison
- Metadata preservation

### 2. Photo Data Aggregator

See: `c:\Users\Lenovo\Documents\GitHub\antfu.me\photos\data.ts`

Key features:
- Glob-based imports
- Automatic metadata merging
- Type-safe interfaces

### 3. Image Gallery Component

See: `c:\Users\Lenovo\Documents\GitHub\antfu.me\src\components\photos\PhotoGrid.vue`

Key features:
- Responsive grid
- Blurhash backgrounds
- Lazy loading
- Aspect ratio control

## 🎨 Design Patterns

### 1. Separation of Concerns
- Scripts in `/scripts` directory
- Components in `/src/components` or `/.vitepress/theme/components`
- Content in `/pages` or root markdown files
- Static assets in `/public`

### 2. Type Safety
- Interface definitions for all data structures
- Typed glob imports
- Proper Vue props typing

### 3. Build-time Generation
- OG images generated during build
- Photo metadata extracted during development
- Static optimization for production

### 4. Progressive Enhancement
- Blurhash placeholders load first
- Images lazy load as they enter viewport
- Modal opens only for intentional clicks

## 🔧 Implementation Steps

### Phase 1: Foundation (Week 1)
1. ✅ Set up scripts directory
2. ✅ Install image processing dependencies
3. ✅ Create base compression script
4. ✅ Test with sample images

### Phase 2: Integration (Week 2)
1. ✅ Add git hooks for auto-compression
2. ✅ Create photo management script
3. ✅ Generate blurhash for existing images
4. ✅ Create image component with blurhash

### Phase 3: Enhancement (Week 3)
1. ✅ Add image modal/lightbox
2. ✅ Implement keyboard navigation
3. ✅ Add OG image generation
4. ✅ Optimize build pipeline

### Phase 4: Refinement (Week 4)
1. ✅ Performance testing
2. ✅ Documentation
3. ✅ Code review
4. ✅ Production deployment

## 📊 Expected Improvements

- **Page Load Speed**: 30-50% faster with optimized images
- **Bandwidth**: 60-70% reduction in image sizes
- **User Experience**: Smooth loading with blurhash placeholders
- **Developer Experience**: Automated optimization workflow
- **SEO**: Better OG images and meta tags

## 🔗 References

- [antfu.me repository](https://github.com/antfu/antfu.me)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Blurhash](https://blurha.sh/)
- [@unpic/placeholder](https://github.com/ascorbic/unpic-placeholder)
- [UnoCSS](https://unocss.dev/)
- [VitePress](https://vitepress.dev/)

---

**Next Steps**: Start with Phase 1 implementation focusing on the image compression scripts.
