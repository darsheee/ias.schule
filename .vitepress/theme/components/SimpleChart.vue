<script setup lang="ts">
import { computed } from 'vue'
import { useSimpleChart } from '../composables/useSimpleChart'
import PieChart from '../PieChart.vue'

interface Props {
  text: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: 'w-full max-w-3xl mx-auto my-8',
})

const chartData = computed(() => useSimpleChart(props.text))
</script>

<template>
  <div v-if="chartData.success" :class="containerClass">
    <!-- Pie/Donut Charts -->
    <PieChart 
      v-if="chartData.type === 'pie' || chartData.type === 'donut'"
      v-bind="chartData.config"
      :container-class="`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${chartData.title ? 'pt-8' : ''}`"
    >
      <template v-if="chartData.title" #title>
        <h3 class="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
          {{ chartData.title }}
        </h3>
      </template>
    </PieChart>
    
    <!-- Bar Charts -->
    <div 
      v-else-if="chartData.type === 'bar'"
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h3 v-if="chartData.title" class="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
        {{ chartData.title }}
      </h3>
      <!-- Bar chart component would go here -->
      <div class="text-center text-gray-500">Bar chart rendering (component needed)</div>
    </div>
    
    <!-- Line Charts -->
    <div 
      v-else-if="chartData.type === 'line'"
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h3 v-if="chartData.title" class="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
        {{ chartData.title }}
      </h3>
      <!-- Line chart component would go here -->
      <div class="text-center text-gray-500">Line chart rendering (component needed)</div>
    </div>
  </div>
  
  <!-- Error State -->
  <div 
    v-else 
    class="my-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
  >
    <p class="text-red-800 dark:text-red-200 font-medium">Chart Error</p>
    <p class="text-red-600 dark:text-red-400 text-sm mt-1">{{ chartData.error }}</p>
  </div>
</template>
