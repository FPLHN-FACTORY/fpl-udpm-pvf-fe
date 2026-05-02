<template>
  <h1 class="text-[#dc2626] font-bold text-[22px] leading-none tracking-tight flex items-center">
    <slot>{{ text }}</slot>
  </h1>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Hệ Thống Quản Lý Đào Tạo PVF'
})
</script>
