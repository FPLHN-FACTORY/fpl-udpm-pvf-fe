<template>
  <a-button
    type="primary"
    class="!bg-[#71dd37] hover:!bg-[#66c732] !border-none !rounded-md !h-[34px] !px-2 flex items-center justify-center gap-1 shadow-sm"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxExport" size="18" />
    </template>
    <span class="font-bold text-[12px] text-white">Xuất Danh Sách</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
