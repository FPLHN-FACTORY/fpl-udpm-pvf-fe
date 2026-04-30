<template>
  <a-tag :color="color" class="px-2 py-0.5 rounded-sm font-medium border-none capitalize">
    <slot />
  </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'success' | 'warning' | 'error' | 'processing' | 'default'
}>()

const color = computed(() => {
  switch (props.type) {
    case 'success': return '#71dd37' // Saturated green
    case 'warning': return '#ffab00' // Saturated orange
    case 'error': return '#ff3e1d'   // Saturated red
    case 'processing': return '#696cff' // Saturated blue
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

<script lang="ts">
// Using a separate script block to calculate dynamic style values if needed
import { computed as computedStyle } from 'vue'
const textColor = computedStyle(() => {
  // We'll just use the standard dark colors for these light backgrounds
  return '#566a7f' // Standard text color in our theme
})
</script>
