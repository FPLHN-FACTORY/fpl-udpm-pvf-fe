<template>
  <a-button
    type="primary"
    class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !rounded-md !h-[42px] !px-8 flex items-center justify-center gap-2 shadow-md shadow-red-100"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxCheck" size="20" />
    </template>
    <span class="font-bold text-[14px] text-white">{{ text }}</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Lưu Lại'
})

defineEmits(['click'])
</script>
