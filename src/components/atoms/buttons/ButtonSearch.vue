<template>
  <a-button
    type="primary"
    class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !rounded-md !h-[38px] !px-6 flex items-center justify-center gap-2 shadow-sm"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxSearch" size="16" />
    </template>
    <span class="font-medium text-[13px] text-white">Tìm Kiếm</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
