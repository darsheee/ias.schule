<script setup lang="ts">
import { computed } from 'vue'
import { blurhashToGradientCssObject } from '@unpic/placeholder'

interface Props {
  src: string
  alt?: string
  blurhash?: string
  loading?: 'lazy' | 'eager'
  class?: string
  aspectRatio?: string
  zoomable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  alt: '',
  zoomable: true,
})

const style = computed(() => {
  const baseStyle: Record<string, any> = {}
  
  if (props.blurhash) {
    Object.assign(baseStyle, blurhashToGradientCssObject(props.blurhash))
  }
  
  if (props.aspectRatio) {
    baseStyle.aspectRatio = props.aspectRatio
  }
  
  return baseStyle
})

const imageClass = computed(() => {
  const classes = [props.class || '']
  if (!props.zoomable) {
    classes.push('no-zoom')
  }
  return classes.filter(Boolean).join(' ')
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :loading="loading"
    :style="style"
    :class="imageClass"
    :data-zoomable="zoomable ? '' : undefined"
  >
</template>

<style scoped>
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
