<template>
  <span :class="tagClass" class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatusTone } from '../../../../types'

const props = defineProps<{
  label: string
  tone: StatusTone
}>()

const tagClass = computed(() => {
  switch (props.tone) {
    case 'active':
      return 'bg-[#e8fadf] text-[#71c122]'
    case 'warning':
      return 'bg-[#fff2d6] text-[#ff9f43]'
    case 'inactive':
      return 'bg-[#eceef1] text-[#8592a3]'
    default:
      return 'bg-[#e7f1ff] text-[#4b6bfb]'
  }
})
</script>
