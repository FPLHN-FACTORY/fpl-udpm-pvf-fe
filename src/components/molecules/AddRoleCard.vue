<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4 hover:shadow-md transition-shadow h-full min-h-[140px]">
    <div class="flex-shrink-0">
      <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="60" fill="#FEE2E2" />
        <path d="M40 80C40 70 50 60 60 60C70 60 80 70 80 80" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
        <circle cx="60" cy="45" r="10" stroke="#EF4444" stroke-width="4" />
        <path d="M85 45H95M90 40V50" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      </svg>
    </div>
    <div class="flex flex-col items-end text-right gap-2 flex-1">
      <ButtonAdd text="Thêm Nhóm Quyền" @click="$router.push('/system/security/roles/add')" />
      <p class="text-gray-400 text-[10px] leading-relaxed max-w-[120px]">
        Thêm nhóm quyền, nếu nhóm quyền đó chưa tồn tại
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonAdd from '../atoms/buttons/ButtonAdd.vue'
</script>
