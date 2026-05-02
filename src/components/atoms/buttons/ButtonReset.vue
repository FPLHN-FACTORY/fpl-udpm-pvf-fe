<template>
  <a-button
    class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !rounded-lg !w-[38px] !h-[38px] !p-0 !min-w-0 flex items-center justify-center shadow-sm transition-colors"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxReset" size="22" class-name="text-white" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
