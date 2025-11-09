import fg from 'fast-glob'
import { compressImages } from './img-compress'

// Find all images in public and assets directories
const images = await fg([
  'public/**/*.{png,jpg,jpeg,webp}',
  'assets/**/*.{png,jpg,jpeg,webp}',
  'avatars/**/*.{png,jpg,jpeg,webp}',
], {
  ignore: ['node_modules/**', '.vitepress/dist/**', '.vitepress/cache/**'],
})

console.log(`Found ${images.length} images to process\n`)

if (images.length > 0) {
  await compressImages(images)
  console.log('\n✅ Image compression completed!')
}
else {
  console.log('No images found to compress')
}
