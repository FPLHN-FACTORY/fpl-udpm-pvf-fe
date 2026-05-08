<template>
  <a-button
    type="primary"
    class="!inline-flex !h-[38px] !w-[126px] !items-center !justify-center !border-none !rounded-md !bg-[#ff3e1d] shadow-sm hover:!bg-[#e6381a]"
    @click="$emit('click')"
  >
    <span class="text-[13px] font-semibold leading-none text-white">{{ text }}</span>
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
