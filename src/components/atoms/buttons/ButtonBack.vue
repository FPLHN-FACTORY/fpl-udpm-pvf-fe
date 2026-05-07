<template>
  <a-button
    class="!bg-[#eceef1] hover:!bg-[#daddf1] !text-[#8592a3] !border-none !rounded-md !h-[38px] !px-4 flex items-center justify-center gap-2 transition-colors"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxChevronLeft" size="18" />
    </template>
    <span class="font-medium text-[13px]">Quay Lại</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
