<template>
  <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 z-20">
    <div class="flex items-center">
      <h1 class="text-red-600 font-bold text-lg tracking-wide uppercase">
        Hệ Thống Quản Lý Đào Tạo PVF
      </h1>
    </div>

    <HeaderActions />
  </header>
</template>

<script setup lang="ts">
import HeaderActions from '../molecules/HeaderActions.vue'
</script>
