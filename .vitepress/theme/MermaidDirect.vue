<template>
  <Mermaid :id="id" :graph="encodedGraph" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Mermaid from './Mermaid.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
    default: '',
  },
})

// Auto-encode plain Mermaid syntax to URL-encoded format
const encodedGraph = computed(() => {
  // If code prop is provided, use it
  if (props.code) {
    return encodeURIComponent(props.code)
  }
  return ''
})
</script>

<style scoped>
/* Inherits styles from Mermaid component */
</style>
