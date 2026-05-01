<template>
  <a-tag :color="color" class="px-2 py-0.5 rounded-sm font-medium border-none capitalize">
    <slot />
  </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger'
}>()

const color = computed(() => {
  switch (props.type) {
    case 'success': return '#71dd37' // Saturated green
    case 'warning': return '#ffab00' // Saturated orange
    case 'danger':
    case 'error': return '#ff3e1d'   // Saturated red
    case 'primary':
    case 'processing': return '#696cff' // Saturated blue
    case 'info': return '#03c3ec'
    default: return '#8592a3'        // Saturated gray
  }
})
</script>

<style scoped>
:deep(.ant-tag) {
  background-color: transparent !important;
  border: 1px solid currentColor !important;
  opacity: 0.85;
}
</style>
