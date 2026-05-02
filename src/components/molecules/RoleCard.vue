<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px] hover:shadow-md transition-shadow relative">
    <div class="flex justify-between items-start">
      <span class="text-gray-400 text-[13px]">Tổng {{ totalUsers }} người dùng</span>
      <div class="flex -space-x-2">
        <img 
          v-for="(avatar, index) in avatars.slice(0, 4)" 
          :key="index"
          :src="avatar" 
          class="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
        <div v-if="avatars.length > 4" class="w-8 h-8 rounded-full border-2 border-white bg-[#f5f5f9] flex items-center justify-center text-[10px] font-bold text-gray-500">
          +{{ avatars.length - 4 }}
        </div>
      </div>
    </div>
    
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <h3 class="text-[18px] font-bold text-[#566a7f] m-0">{{ title }}</h3>
        <button class="text-gray-400 hover:text-gray-600 p-1">
          <NavIcon name="BxCopy" size="20" />
        </button>
      </div>
      <button 
        class="text-[#ff3e1d] text-[13px] font-medium hover:underline text-left w-fit"
        @click="$router.push(`/system/security/roles/edit/1`)"
      >
        Sửa Nhóm quyền
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../atoms/icons/NavIcon.vue'

defineProps<{
  title: string
  totalUsers: number
  avatars: string[]
}>()
</script>

<style scoped>
/* Bạn có thể thêm style nếu cần */
</style>
