<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start">
      <span class="text-gray-400 text-xs">Tổng {{ totalUsers }} người dùng</span>
      <div class="flex -space-x-1.5">
        <img 
          v-for="(avatar, index) in avatars.slice(0, 4)" 
          :key="index"
          :src="avatar" 
          class="w-7 h-7 rounded-full border-2 border-white object-cover"
        />
        <div v-if="avatars.length > 4" class="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500">
          +{{ avatars.length - 4 }}
        </div>
      </div>
    </div>
    
    <div class="flex flex-col gap-0.5">
      <h3 class="text-lg font-bold text-[#566a7f]">{{ title }}</h3>
      <button 
        class="text-red-500 text-xs font-medium hover:underline text-left w-fit"
        @click="$router.push(`/system/security/roles/edit/1`)"
      >
        Sửa Nhóm quyền
      </button>
    </div>
    
    <div class="mt-1 flex justify-end">
      <button class="text-gray-400 hover:text-gray-600">
        <NavIcon name="BxCopy" class-name="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../atoms/NavIcon.vue'

defineProps<{
  title: string
  totalUsers: number
  avatars: string[]
}>()
</script>
