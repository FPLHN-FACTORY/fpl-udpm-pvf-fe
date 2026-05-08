<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Breadcrumb -->
    <nav class="flex text-sm text-gray-500 mb-4 items-center space-x-2">
      <span>Kỷ luật khen thưởng</span>
      <span>/</span>
      <span class="text-gray-800 font-medium">Quyết định kỷ luật</span>
    </nav>

    <!-- Main Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="flex justify-between items-center p-5 border-b border-gray-100">
        <h2 class="text-xl font-bold text-gray-800">Chi tiết Quyết định kỷ luật</h2>
        <div class="flex space-x-3">
          <button 
            @click="$router.back()" 
            class="group flex items-center gap-2 px-4 py-2 bg-[#f1f3f5] text-[#748293] rounded-lg font-medium hover:bg-[#e9ecef] transition-all duration-200"
            >
                <!-- Icon mũi tên thanh mảnh giống ảnh -->
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
  
                <span class="text-[15px]">Quay Lại</span>
            </button>
          <button @click="handleEdit" class="px-4 py-2 bg-[#ffab00] text-white rounded-md hover:bg-[#e69a00] transition shadow-sm font-medium">
            Chỉnh Sửa
          </button>
        </div>
      </div>

      <!-- Detail Table -->
      <div class="p-0">
        <table class="w-full text-left border-collapse">
          <tbody>
            <tr class="border-b border-gray-100">
              <th class="w-1/4 p-4 font-semibold text-gray-700 bg-gray-50/50">ID biên bản</th>
              <td class="p-4 text-gray-800">{{ decisionId }}</td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Học viên</th>
              <td class="p-4 text-gray-800 text-blue-600">Nguyễn Văn An</td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Mẫu biên bản</th>
              <td class="p-4 flex justify-between items-center">
                <span class="text-gray-800 text-blue-600">Nguyễn Văn An</span>
                <button class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded border border-gray-200 hover:bg-gray-200 transition">
                  Xem Biên Bản
                </button>
              </td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Ngày quyết định</th>
              <td class="p-4 text-gray-500">10/01/2025</td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Người quyết định</th>
              <td class="p-4 text-gray-500 text-blue-600">Nguyễn Minh Quân</td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Lý do kỷ luật</th>
              <td class="p-4 text-gray-500">Đi học muộn nhiều lần</td>
            </tr>
            <tr class="border-b border-gray-100">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50">Thời gian tạo</th>
              <td class="p-4 text-gray-800">10/01/2025 09:00</td>
            </tr>
            <tr class="">
              <th class="p-4 font-semibold text-gray-700 bg-gray-50/50 border-b-0">Thời gian cập nhật</th>
              <td class="p-4 text-gray-800">12/01/2025 14:30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

// Lấy ID từ tham số URL (ví dụ: HS001 từ /detail/HS001)
const decisionId = computed(() => route.params.id as string)

// Hàm xử lý khi bấm nút Chỉnh sửa
const handleEdit = () => {
  router.push({ 
    name: 'discipline-decisions-edit', 
    params: { id: decisionId.value } 
  })
}
</script>

<style scoped>
/* CSS giữ nguyên như thiết kế Figma của bạn */
</style>