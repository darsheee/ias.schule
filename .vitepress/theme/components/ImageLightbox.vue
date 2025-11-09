<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const imageModel = ref<HTMLImageElement>()
const imageAlt = ref<string>()

function setImageModel(img: HTMLImageElement) {
  imageModel.value = img
  imageAlt.value = img.alt
  const figure = img.closest('figure')
  if (figure) {
    const caption = figure.querySelector('figcaption')
    if (caption?.textContent)
      imageAlt.value ||= caption.textContent
  }
}

onMounted(() => {
  // Listen for clicks on images
  document.addEventListener('click', (e) => {
    const path = Array.from(e.composedPath())
    const first = path[0] as HTMLImageElement
    
    if (!(first instanceof HTMLElement))
      return
    if (first.tagName !== 'IMG')
      return
    if (first.classList.contains('no-zoom'))
      return
    if (path.some(el => el instanceof HTMLElement && ['A', 'BUTTON'].includes(el.tagName)))
      return
    
    // Check if image is in content area
    const isInContent = path.some(el => 
      el instanceof HTMLElement && 
      (el.classList.contains('vp-doc') || 
       el.classList.contains('content') ||
       el.hasAttribute('data-zoomable'))
    )
    
    if (!isInContent)
      return

    setImageModel(first)
  })
})

// Keyboard navigation
onKeyStroke('Escape', (e) => {
  if (imageModel.value) {
    imageModel.value = undefined
    e.preventDefault()
  }
})
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="imageModel" 
      class="image-lightbox"
      @click="imageModel = undefined"
    >
      <div class="lightbox-backdrop" />
      <div class="lightbox-content">
        <img 
          :src="imageModel.src" 
          :alt="imageModel.alt"
          class="lightbox-image"
        >
        <div v-if="imageAlt" class="lightbox-caption">
          {{ imageAlt }}
        </div>
      </div>
      <button class="lightbox-close" @click="imageModel = undefined">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.image-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: -1;
}

.lightbox-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  max-width: 600px;
  text-align: center;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Make content images zoomable by default */
:global(.vp-doc img) {
  cursor: zoom-in;
  transition: opacity 0.2s;
}

:global(.vp-doc img:hover) {
  opacity: 0.9;
}

/* Don't zoom images with no-zoom class */
:global(.vp-doc img.no-zoom) {
  cursor: default;
}

:global(.vp-doc img.no-zoom:hover) {
  opacity: 1;
}
</style>
