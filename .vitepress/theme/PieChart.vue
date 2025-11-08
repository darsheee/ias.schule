<template>
  <div
    ref="container"
    class="pie-chart-container w-full max-w-full overflow-x-auto"
    :class="containerClass"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  data: Array<{ name: string; value: number }>
  width?: number
  height?: number
  innerRadius?: number // 0 for pie, >0 for donut
  padAngle?: number // Spacing between slices in radians
  colors?: string[]
  showLabels?: boolean
  showValues?: boolean
  containerClass?: string
}>()

const container = ref<HTMLDivElement>()
let svg: SVGSVGElement | null = null

const renderChart = async () => {
  if (!container.value || !props.data.length) return

  try {
    // Lazy load D3 only when needed
    const d3 = await import('d3')

    // Remove old chart
    if (svg) {
      svg.remove()
      svg = null
    }

    // Chart dimensions
    const width = props.width || 500
    const height = props.height || Math.min(width, 500)
    const radius = Math.min(width, height) / 2
    const innerRadius = props.innerRadius ?? 0 // 0 = pie, >0 = donut

    // Create color scale
    const color = props.colors
      ? d3.scaleOrdinal<string>()
          .domain(props.data.map(d => d.name))
          .range(props.colors)
      : d3.scaleOrdinal<string>()
          .domain(props.data.map(d => d.name))
          .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), props.data.length).reverse())

    // Create pie layout with optional padding
    const pie = d3.pie<{ name: string; value: number }>()
      .padAngle(props.padAngle ?? (innerRadius > 0 ? 1 / radius : 0))
      .sort(null)
      .value(d => d.value)

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(Math.min(width, height) / 2 - 1)

    const labelRadius = arc.outerRadius()(null as any) * 0.8

    // Arc for labels
    const arcLabel = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius)

    const arcs = pie(props.data)

    // Create SVG
    const svgElement = d3.create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height] as any)
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

    // Add sectors
    svgElement.append('g')
      .attr('stroke', 'white')
      .selectAll()
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.name))
      .attr('d', arc as any)
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString('en-US')}`)

    // Add labels if enabled
    if (props.showLabels !== false) {
      svgElement.append('g')
        .attr('text-anchor', 'middle')
        .selectAll()
        .data(arcs)
        .join('text')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text(d => d.data.name))
        .call(text => {
          if (props.showValues !== false) {
            text.filter(d => (d.endAngle - d.startAngle) > 0.25)
              .append('tspan')
              .attr('x', 0)
              .attr('y', '0.7em')
              .attr('fill-opacity', 0.7)
              .text(d => d.data.value.toLocaleString('en-US'))
          }
        })
    }

    svg = svgElement.node()
    if (svg) {
      container.value.appendChild(svg)
    }
  } catch (error) {
    console.error('Error rendering pie chart:', error)
  }
}

onMounted(() => {
  renderChart()
})

watch(() => [props.data, props.width, props.height, props.innerRadius, props.colors], renderChart, { deep: true })

onBeforeUnmount(() => {
  if (svg) {
    svg.remove()
  }
})
</script>

<style scoped>
.pie-chart-container {
  contain: layout style paint;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-chart-container :deep(svg) {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
