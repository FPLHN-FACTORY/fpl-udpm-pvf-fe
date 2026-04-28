<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">{{ routeTitle }}</h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32 flex flex-col justify-center">
        <span class="text-gray-400 text-sm font-medium">Thống kê {{ i }}</span>
        <span class="text-2xl font-bold text-gray-900 mt-1">0</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Chào mừng bạn đến với hệ thống quản lý PVF</h3>
      <p class="text-gray-500 mb-6">Bạn đang xem mục: <span class="text-red-600 font-medium">{{ routeTitle }}</span></p>
      
      <button 
        @click="handleLogout"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
      >
        Đăng xuất
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routeTitle = computed(() => route.meta.title || 'Dashboard')

const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>