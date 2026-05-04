<template>
  <a-button
    class="!bg-[#e0e1e2] hover:!bg-[#d5d6d7] !text-[#566a7f] !border-none !rounded-md !h-[38px] !px-4 flex items-center justify-center gap-2"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxTrash" size="18" />
    </template>
    <span class="font-bold text-[13px]">Danh Sách Kỳ Tuyển Sinh Đã Xóa</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
