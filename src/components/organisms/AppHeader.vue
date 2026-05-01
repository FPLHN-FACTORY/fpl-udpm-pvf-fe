<template>
  <header class="z-20 px-6 pt-4 pb-2 bg-[#f5f5f9]">
    <div class="bg-white shadow-sm h-16 flex items-center justify-between px-8 border-b border-gray-100">
      <div class="flex items-center h-full">
        <h1 class="text-[#dc2626] font-bold text-[22px] leading-none tracking-tight flex items-center">
          Hệ Thống Quản Lý Đào Tạo PVF
        </h1>
      </div>

      <div class="flex items-center h-full">
        <HeaderActions />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderActions from '../molecules/HeaderActions.vue'
</script>
