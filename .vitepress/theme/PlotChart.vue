<template>
  <div
    ref="container"
    class="plot-chart-container w-full max-w-full overflow-x-auto"
    :class="containerClass"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  options: any
  containerClass?: string
}>()

const container = ref<HTMLDivElement>()
let plot: SVGSVGElement | HTMLElement | null = null

const renderChart = async () => {
  if (!container.value) return

  try {
    // Lazy load Plot only when needed (performance optimization)
    const Plot = await import('@observablehq/plot')

    // Remove old chart
    if (plot) {
      plot.remove()
      plot = null
    }

    // Render new chart with responsive width
    plot = Plot.plot({
      ...props.options,
      // Make chart responsive by default
      style: {
        maxWidth: '100%',
        height: 'auto',
        ...props.options?.style,
      },
    })

    container.value.appendChild(plot)
  } catch (error) {
    console.error('Error rendering chart:', error)
  }
}

onMounted(() => {
  // Render chart after component mounts (client-side only)
  renderChart()
})

// Watch for options changes and re-render
watch(() => props.options, renderChart, { deep: true })

onBeforeUnmount(() => {
  if (plot) {
    plot.remove()
  }
})
</script>

<style scoped>
.plot-chart-container {
  /* Ensure chart container is responsive */
  contain: layout style paint;
  /* Prevent layout shift */
  min-height: 200px;
}

.plot-chart-container :deep(svg) {
  /* Make SVG responsive */
  max-width: 100%;
  height: auto;
  display: block;
}

.plot-chart-container :deep(figure) {
  /* Reset margins */
  margin: 0;
  max-width: 100%;
}
</style>
