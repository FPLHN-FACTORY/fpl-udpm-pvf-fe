<template>
  <a-button
    class="!bg-[#8592a3] hover:!bg-[#788393] !text-white !border-none !rounded-md !h-[34px] !px-2 flex items-center justify-center gap-1 shadow-sm"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxTrash" size="18" />
    </template>
    <span class="font-bold text-[13px]">Danh Sách Đã Xóa</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'
defineEmits(['click'])
</script>
