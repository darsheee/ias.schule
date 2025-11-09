<script setup lang="ts">
/**
 * Universal Chart Component - Simple syntax for all chart types
 * 
 * Usage:
 * <Chart type="pie" title="My Chart" :data="[...]" />
 * <Chart type="bar" title="Sales" :data="[...]" xKey="month" yKey="sales" />
 * <Chart type="area" title="Growth" :data="[...]" xKey="year" yKey="revenue" />
 * <Chart type="scatter" title="Distribution" :data="[...]" xKey="x" yKey="y" />
 * <Chart type="percentogram" title="Histogram" :data="[...]" />
 */

import { computed } from 'vue'
import { usePieChart, useDonutChart, pieChartColorSchemes } from '../composables/usePieChart'
import { useAreaChart } from '../composables/useAreaChart'
import { useGroupedBarChart } from '../composables/useGroupedBarChart'
import { useGradientBarChart } from '../composables/useGradientBarChart'
import { useScatterPlot } from '../composables/useScatterPlot'
import { usePercentogram } from '../composables/usePercentogram'
import PieChart from '../PieChart.vue'
import PlotChart from '../PlotChart.vue'

interface Props {
  type?: 'pie' | 'donut' | 'bar' | 'grouped-bar' | 'gradient-bar' | 'area' | 'scatter' | 'percentogram'
  title?: string
  data: any[] // Flexible data type for different charts
  xKey?: string // For bar, area, scatter charts
  yKey?: string // For bar, area, scatter charts
  groupKey?: string // For grouped bar charts
  colorKey?: string // For scatter plots
  containerClass?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'pie',
  containerClass: 'w-full max-w-3xl mx-auto my-8',
  width: 600,
})

const chartConfig = computed(() => {
  const baseConfig = {
    data: props.data,
    width: props.width,
    height: props.height,
  }

  let config
  
  switch (props.type) {
    case 'pie':
      config = usePieChart({
        ...baseConfig,
        colors: pieChartColorSchemes.vibrant,
      })
      break
    
    case 'donut':
      config = useDonutChart({
        ...baseConfig,
        colors: pieChartColorSchemes.vibrant,
      })
      break
    
    case 'bar':
      config = useGradientBarChart({
        ...baseConfig,
        x: props.xKey || 'name',
        y: props.yKey || 'value',
        gradient: {
          id: 'barGradient',
          stops: [
            { offset: '0%', color: '#4f46e5' },
            { offset: '100%', color: '#06b6d4' }
          ]
        }
      })
      break
    
    case 'gradient-bar':
      config = useGradientBarChart({
        ...baseConfig,
        x: props.xKey || 'name',
        y: props.yKey || 'value',
        gradient: {
          id: 'customGradient',
          stops: [
            { offset: '0%', color: '#f59e0b' },
            { offset: '100%', color: '#ef4444' }
          ]
        }
      })
      break
    
    case 'area':
      config = useAreaChart({
        ...baseConfig,
        x: props.xKey || 'name',
        y: props.yKey || 'value',
      })
      break
    
    case 'scatter':
      config = useScatterPlot({
        ...baseConfig,
        x: props.xKey || 'x',
        y: props.yKey || 'y',
        color: props.colorKey,
      })
      break
    
    case 'percentogram':
      config = usePercentogram({
        ...baseConfig,
        value: props.yKey || 'value',
      })
      break
    
    default:
      config = usePieChart({
        ...baseConfig,
        colors: pieChartColorSchemes.vibrant,
      })
  }
  
  // Unwrap the ComputedRef returned by composables
  return config.value
})

const isPieOrDonut = computed(() => props.type === 'pie' || props.type === 'donut')
</script>

<template>
  <div :class="containerClass">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 v-if="title" class="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>
      <!-- PieChart: use spread props -->
      <PieChart v-if="isPieOrDonut" v-bind="chartConfig" />
      <!-- PlotChart: use options prop -->
      <PlotChart v-else :options="chartConfig" />
    </div>
  </div>
</template>
