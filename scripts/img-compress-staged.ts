import prompts from 'prompts'
import Git from 'simple-git'
import { compressImages } from './img-compress'

const git = Git()
const stagedFiles = (await git.diff(['--cached', '--name-only']))
  .split('\n')
  .map((i: string) => i.trim())
  .filter(Boolean)

const images = stagedFiles.filter((i: string) => i.match(/\.(png|jpe?g|webp)$/i))
if (images.length > 0) {
  console.log('Images to compress:\n', images)
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Compress ${images.length} images?`,
  })

  if (confirm) {
    await compressImages(images)
    // Stage compressed images
    await git.add(images)
    console.log('Compressed images staged successfully!')
  }
  else {
    console.log('Skipping image compression')
  }
}
else {
  console.log('No images to compress')
}
