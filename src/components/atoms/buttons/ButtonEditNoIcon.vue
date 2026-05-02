<template>
  <a-button
    class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !rounded-md !h-[38px] !px-4 flex items-center justify-center transition-colors shadow-sm shadow-orange-100"
    @click="$emit('click')"
  >
    <span class="font-bold text-[13px]">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Chỉnh Sửa'
})
defineEmits(['click'])
</script>
