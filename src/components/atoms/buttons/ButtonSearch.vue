<template>
  <a-button
    type="primary"
    class="!inline-flex !h-[38px] !w-[96px] !items-center !justify-center !gap-1.5 !border-none !rounded-md !bg-[#696cff] whitespace-nowrap shadow-sm hover:!bg-[#5f61e6]"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxSearch" size="24" class-name="shrink-0" />
    </template>
    <span class="text-[12px] font-medium leading-none text-white">Tìm Kiếm</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

defineEmits(['click'])
</script>
