<template>
  <a-button
    class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !rounded-md !h-[38px] !px-4 flex items-center justify-center gap-2 transition-colors shadow-sm shadow-orange-100"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxEdit" size="18" />
    </template>
    <span class="font-bold text-[13px]">Chỉnh Sửa</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
