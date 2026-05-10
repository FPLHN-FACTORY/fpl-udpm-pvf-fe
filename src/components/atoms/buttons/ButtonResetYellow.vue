<template>
  <a-button
    type="primary"
    class="!inline-flex !h-[38px] !w-[126px] !items-center !justify-center !border-none !rounded-md !bg-[#ffab00] !text-white shadow-sm hover:!bg-[#e69a00]"
    @click="$emit('click')"
  >
    <span class="text-[13px] font-semibold leading-none">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Đặt Lại'
})

defineEmits(['click'])
</script>
