<template>
  <a-button
    type="primary"
    class="!inline-flex !h-[38px] !w-[auto] !min-w-[126px] !items-center !justify-center !border-none !rounded-md !bg-[#696cff] !text-white shadow-sm hover:!bg-[#5f61e6] !px-4"
    @click="$emit('click')"
  >
    <span class="text-[13px] font-semibold leading-none">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Đặt Lại Mặc Định'
})

defineEmits(['click'])
</script>
