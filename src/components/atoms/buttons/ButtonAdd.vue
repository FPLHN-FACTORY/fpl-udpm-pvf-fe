<template>
  <a-button
    type="primary"
    class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !rounded-md !h-[38px] !px-4 flex items-center justify-center gap-2 shadow-sm"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxPlus" size="18" />
    </template>
    <span class="font-bold text-[13px] text-white">Thêm Mới</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
