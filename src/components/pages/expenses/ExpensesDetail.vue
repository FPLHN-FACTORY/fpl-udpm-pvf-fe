<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Yêu cầu rút sinh hoạt phí</span>
    </div>

    <!-- 2. Detail Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9] mb-6">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[14px] font-bold text-[#475569] uppercase">Chi tiết Yêu cầu rút sinh hoạt phí</h2>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#7a8593]" 
            @click="goBack"
          >
            <i class="bx bx-left-arrow-alt mr-1"></i> Quay Lại
          </button>
          <button 
            class="px-4 py-2 bg-[#ffab00] text-white rounded-md text-sm font-medium hover:bg-[#e69a00] shadow-sm" 
            @click="goToEdit"
          >
            Chỉnh Sửa
          </button>
        </div>
      </div>

      <!-- Detail Info Table -->
      <div class="p-[24px]">
        <div class="border border-[#F1F5F9] rounded-[4px]">
          <div v-for="(item, index) in detailInfo" :key="index" class="flex border-b border-[#F1F5F9] last:border-b-0">
            <div class="w-[300px] bg-[#F8FAFC] p-[12px] text-[13px] font-bold text-[#475569] border-r border-[#F1F5F9]">
              {{ item.label }}
            </div>
            <div class="flex-1 p-[12px] text-[13px] text-[#475569]">
              <template v-if="item.key === 'file'">
                <a href="#" class="text-[#696CFF] hover:underline">{{ item.value }}</a>
              </template>
              <template v-else-if="item.key === 'status'">
                <span class="px-2 py-1 rounded-[6px] bg-[#E8FADF] text-[#71DD37] text-[12px] font-normal">
                  {{ item.value }}
                </span>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. History Table Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9]">
        <h2 class="text-[14px] font-bold text-[#475569] uppercase">Lịch sử xử lý yêu cầu</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-[13px] border-collapse">
          <thead class="bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <tr class="text-[#64748B] uppercase font-bold">
              <th class="px-[24px] py-[16px] text-left w-[40px] border-r border-[#F1F5F9]">#</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">THỜI GIAN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">NGƯỜI DÙNG</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">HÀNH ĐỘNG</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">LOẠI ĐỐI TƯỢNG</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">ĐỐI TƯỢNG</th>
              <th class="px-[24px] py-[16px] text-center">CHI TIẾT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(history, index) in historyData" :key="index" class="border-b border-[#F1F5F9] last:border-b-0 hover:bg-gray-50 transition-colors">
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ index + 1 }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ history.time }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ history.user }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ history.action }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ history.type }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">{{ history.target }}</td>
              <td class="px-[24px] py-[18px] text-center">
                <i class="bx bx-show text-[#A1ACB8] hover:text-[#696CFF] cursor-pointer text-xl" @click="goToHistoryDetail(history.id)"></i>
              </td>
            </tr>
            <tr v-if="historyData.length === 0">
              <td colspan="6" class="px-[24px] py-[40px] text-center text-[#A1ACB8]">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const detailInfo = ref([
  { label: 'ID', value: 'HS001', key: 'id' },
  { label: 'Học viên', value: 'HV001 - Nguyễn Xuân An', key: 'student' },
  { label: 'Hợp đồng', value: 'HĐ PVF 2025', key: 'contract' },
  { label: 'Số tiền đề nghị rút', value: '2.000.000 VNĐ', key: 'amount' },
  { label: 'Mục đích/ghi chú rút', value: 'Mục đích', key: 'purpose' },
  { label: 'File minh chứng chi/rút (link/filename)', value: 'file.pdf', key: 'file' },
  { label: 'Trạng thái xử lý đơn', value: 'Đã duyệt', key: 'status' },
  { label: 'Số dư trước khi rút', value: '10.000.000 VNĐ', key: 'balance_before' },
  { label: 'Số dư sau khi duyệt', value: '8.000.000 VNĐ', key: 'balance_after' },
  { label: 'Ngày tạo yêu cầu', value: '10/01/2025 09:00', key: 'created_at' },
  { label: 'Ngày xử lý', value: '12/01/2025 14:30', key: 'processed_at' },
  { label: 'Người xử lý', value: 'Admin A', key: 'handler' },
  { label: 'Ghi chú nội bộ', value: 'Hóa đơn hợp lệ', key: 'internal_note' }
])

const historyData = ref([
  { id: 'HS001', time: '10/01/2025 14:00', user: 'Trần Minh Quân', action: 'Duyệt yêu cầu', type: 'Hợp đồng', target: 'Tuyển sinh PVF 2025' }
])

const goToHistoryDetail = (id: string) => {
  router.push({ name: 'expenses-history-detail', params: { id } })
}

const goBack = () => {
  router.push({ name: 'expenses-list' })
}

const goToEdit = () => {
  router.push({ name: 'expenses-edit', params: { id: route.params.id || 'HS001' } })
}
</script>

<style scoped>
/* Reuse patterns from ExpensesList.vue */
</style>