<template>
  <div class="mermaid-diagram" v-html="svg"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { render } from './mermaid'

const props = defineProps({
  graph: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})

const svg = ref('')
const code = ref(decodeURIComponent(props.graph))

let mut: MutationObserver | null = null

onMounted(async () => {
  // Monitor theme changes and re-render
  mut = new MutationObserver(() => renderChart())
  mut.observe(document.documentElement, { attributes: true })

  await renderChart()

  // Refresh images on first render if diagram contains images
  const hasImages = /<img([\w\W]+?)>/.exec(code.value)?.length > 0
  if (hasImages) {
    setTimeout(() => {
      const imgElements = document.getElementsByTagName('img')
      const imgs = Array.from(imgElements)
      if (imgs.length) {
        Promise.all(
          imgs
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.onload = img.onerror = resolve
                })
            )
        ).then(() => {
          renderChart()
        })
      }
    }, 100)
  }
})

onUnmounted(() => mut?.disconnect())

const renderChart = async () => {
  const hasDarkClass = document.documentElement.classList.contains('dark')
  const mermaidConfig = {
    securityLevel: 'loose' as const,
    startOnLoad: false,
    theme: hasDarkClass ? 'dark' as const : 'default' as const,
  }
  const svgCode = await render(props.id, code.value, mermaidConfig)
  // Force v-html to re-render on theme changes
  const salt = Math.random().toString(36).substring(7)
  svg.value = `${svgCode} <span style="display: none">${salt}</span>`
}
</script>

<style scoped>
.mermaid-diagram {
  margin: 1rem 0;
}
</style>
