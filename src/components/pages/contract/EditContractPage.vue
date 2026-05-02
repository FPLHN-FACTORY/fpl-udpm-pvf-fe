<template>
  <div class="flex flex-col h-full bg-[#f5f5f9] p-6">
    <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] p-8">
      <!-- Header với nút Quay Lại bên phải -->
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-xl font-bold text-[#566a7f]">Điều chỉnh Hợp đồng đã ký</h3>
        <button 
          @click="router.back()" 
          class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm hover:bg-[#7a8593] transition flex items-center gap-2 font-medium"
        >
         <i class='bx bx-left-arrow-alt text-lg'></i> Quay Lại
        </button>
      </div>

      <!-- Form nhập liệu chính -->
      <div class="space-y-8">
        
        <!-- Ô chọn Học viên -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
          <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Học viên</label>
          <a-select 
            v-model:value="formData.student" 
            class="w-full custom-select" 
            :bordered="false"
          >
            <a-select-option value="TH12345 - Nguyễn Văn An">TH12345 - Nguyễn Văn An</a-select-option>
          </a-select>
        </div>

        <!-- Ô nhập Phiên bản hợp đồng -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
          <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Phiên bản hợp đồng</label>
          <a-input v-model:value="formData.contractVersion" :bordered="false" class="p-0 text-[#566a7f]" />
        </div>

        <!-- Hàng Ngày bắt đầu & Kết thúc -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
            <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Ngày bắt đầu</label>
            <a-date-picker v-model:value="formData.startDate" class="w-full p-0" :bordered="false" format="DD/MM/YYYY" />
          </div>
          <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
            <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Ngày kết thúc</label>
            <a-date-picker v-model:value="formData.endDate" class="w-full p-0" :bordered="false" format="DD/MM/YYYY" />
          </div>
        </div>

        <!-- Ô nhập Số năm -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
          <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Số năm</label>
          <a-input-number v-model:value="formData.years" class="w-full p-0" :bordered="false" />
        </div>

        <!-- Cụm nút bấm sát nhau ở giữa -->
        <div class="flex justify-center gap-3 pt-4">
          <button 
            @click="handleUpdate"
            class="px-8 py-2 bg-[#ff3e1d] text-white rounded-md font-bold hover:bg-[#e6381a] transition-all uppercase text-sm"
          >
            Cập Nhật
          </button>
          <button 
            @click="handleReset"
            class="px-8 py-2 bg-[#ffab00] text-white rounded-md font-bold hover:bg-[#e69a00] transition-all uppercase text-sm"
          >
            Đặt Lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const contractId = route.params.id

const formData = ref({
  student: 'TH12345 - Nguyễn Văn An',
  contractVersion: 'HĐĐT-CTT-PVF-2025-v1.0',
  startDate: dayjs('2025-01-01'),
  endDate: dayjs('2027-12-31'),
  years: 3
})

const handleUpdate = () => {
  message.success('Cập nhật thành công!')
}

const handleReset = () => {
  // Logic reset dữ liệu
}
</script>

<style scoped>
/* Xử lý cho Ant Design Select không có border để dùng border của div cha */
:deep(.ant-select-selector) {
  padding: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.ant-picker-input > input) {
  color: #566a7f;
}

:deep(.ant-input-number-handler-wrap) {
  display: none; /* Ẩn nút tăng giảm giống ảnh */
}
</style>