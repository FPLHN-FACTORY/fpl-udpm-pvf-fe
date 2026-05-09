<template>
  <a-button
    class="!inline-flex !h-[38px] !items-center !justify-center !border-none !rounded-md !bg-[#eceef1] !px-4 !text-[#8592a3] transition-colors hover:!bg-[#daddf1]"
    @click="$emit('click')"
  >
    <span class="text-[13px] font-medium leading-none">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Quay Lại'
})

defineEmits(['click'])
</script>
