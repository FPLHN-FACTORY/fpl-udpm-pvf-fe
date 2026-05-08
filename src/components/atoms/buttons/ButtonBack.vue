<template>
  <a-button
    class="!inline-flex !h-[38px] !items-center !justify-center !gap-2 !border-none !rounded-md !bg-[#eceef1] !px-4 !text-[#8592a3] transition-colors hover:!bg-[#daddf1]"
    @click="$emit('click')"
  >
    <template #icon>
      <NavIcon name="BxChevronLeft" size="18" />
    </template>
    <span class="text-[13px] font-medium leading-none">Quay Lại</span>
  </a-button>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

defineEmits(['click'])
</script>
