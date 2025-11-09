<script setup lang="ts">
/**
 * ChartBlock - Renders charts from simple text syntax
 * 
 * Usage in markdown:
 * <ChartBlock>
 * pie title My Chart
 *     "Item 1" : 100
 *     "Item 2" : 200
 * </ChartBlock>
 */

import { useSlots, computed } from 'vue'
import SimpleChart from './SimpleChart.vue'

const slots = useSlots()

// Extract text content from default slot
const chartText = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot || defaultSlot.length === 0) return ''
  
  // Get text content from slot
  const getText = (vnode: any): string => {
    if (typeof vnode === 'string') return vnode
    if (typeof vnode.children === 'string') return vnode.children
    if (Array.isArray(vnode.children)) {
      return vnode.children.map(getText).join('')
    }
    return ''
  }
  
  return defaultSlot.map(getText).join('').trim()
})
</script>

<template>
  <SimpleChart v-if="chartText" :text="chartText" />
  <div v-else class="text-red-500 p-4">
    No chart content provided
  </div>
</template>
