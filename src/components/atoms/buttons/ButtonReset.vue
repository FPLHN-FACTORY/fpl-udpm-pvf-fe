<template>
  <a-button
    class="!inline-flex !h-[38px] !w-[38px] !min-w-0 !items-center !justify-center !border-none !rounded-md !bg-[#8592a3] !p-0 shadow-sm transition-colors hover:!bg-[#717d8c]"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxReset" size="20" class-name="text-white" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

defineEmits(['click'])
</script>
