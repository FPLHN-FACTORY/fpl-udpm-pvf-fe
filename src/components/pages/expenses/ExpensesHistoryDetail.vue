<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#A1ACB8]">Yêu cầu rút sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Chi tiết lịch sử xử lý</span>
    </div>

    <!-- 2. Detail Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9] mb-6">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[18px] font-bold text-[#475569]">Chi tiết lịch sử xử lý</h2>
        <div class="flex gap-2">
          <button 
            class="w-[38px] h-[38px] bg-[#eceef1] text-[#8592a3] rounded-md flex items-center justify-center hover:bg-[#e1e4e8] transition-colors" 
            @click="goBack"
          >
            <i class="bx bx-left-arrow-alt text-[22px]"></i>
          </button>
          <button 
            class="px-4 py-1.5 bg-[#FFAB00] text-white rounded-md text-[13px] font-medium hover:bg-[#e69a00] shadow-sm transition-colors flex items-center" 
            @click="goToEdit"
          >
            Chỉnh Sửa
          </button>
        </div>
      </div>

      <!-- Detail Info Table -->
      <div class="p-[24px]">
        <div class="border border-[#F1F5F9] rounded-[4px]">
          <div v-for="(item, index) in historyInfo" :key="index" class="flex border-b border-[#F1F5F9] last:border-b-0">
            <div class="w-[300px] bg-[#FFFFFF] p-[12px] text-[13px] font-bold text-[#475569] border-r border-[#F1F5F9]">
              {{ item.label }}
            </div>
            <div class="flex-1 p-[12px] text-[13px] text-[#475569]">
              <template v-if="item.key === 'file'">
                <span class="text-[#475569]">{{ item.value }}</span>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const historyInfo = ref([
  { label: 'ID lịch sử', value: 'HS001', key: 'id' },
  { label: 'Hành động', value: 'Duyệt yêu cầu', key: 'action' },
  { label: 'Hợp đồng', value: 'Tuyển sinh PVF 2025', key: 'contract' },
  { label: 'Người thực hiện', value: 'Trần Minh Quân', key: 'user' },
  { label: 'Thời điểm', value: '10/01/2025 14:00', key: 'time' },
  { label: 'Số dư trước', value: '10.000.000 vnd', key: 'balance_before' },
  { label: 'Số dư sau', value: '8.000.000 vnd', key: 'balance_after' },
  { label: 'Ghi chú nội bộ', value: 'Ghi chú nội bộ', key: 'note' },
  { label: 'File chứng từ', value: 'minhchung.png', key: 'file' }
])

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push({ name: 'expenses-edit', params: { id: route.params.id || 'HS001' } })
}
</script>

<style scoped>
/* Custom styles to match the mockup */
h2 {
  font-family: 'Public Sans', sans-serif;
}
</style>
