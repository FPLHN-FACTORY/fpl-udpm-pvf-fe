<template>
  <a-button
    type="primary"
    class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !rounded-md !h-[38px] !px-8 flex items-center justify-center shadow-md shadow-red-100"
    @click="$emit('click')"
  >
    <span class="font-bold text-[14px] text-white">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Lưu Lại'
})

defineEmits(['click'])
</script>
