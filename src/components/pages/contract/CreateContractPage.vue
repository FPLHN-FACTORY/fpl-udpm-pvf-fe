<template>
  <div class="flex flex-col h-full bg-[#f5f5f9] p-6">
    <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] p-8">
      <!-- Header với nút Quay Lại bên phải -->
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-xl font-bold text-[#566a7f]">Thêm mới Hợp đồng đã ký</h3>
        <button 
            @click="$router.back()" 
            class="group flex items-center gap-2 px-4 py-2 bg-[#f1f3f5] text-[#748293] rounded-lg font-medium hover:bg-[#e9ecef] transition-all duration-200"
            >
                <span class="text-[15px]">Quay Lại</span>
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
            placeholder="Chọn học viên"
          >
            <a-select-option value="TH12345 - Nguyễn Văn An">TH12345 - Nguyễn Văn An</a-select-option>
            <a-select-option value="TH12346 - Trần Thị B">TH12346 - Trần Thị B</a-select-option>
          </a-select>
        </div>

        <!-- Ô nhập Phiên bản hợp đồng -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
          <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Phiên bản hợp đồng</label>
          <a-input v-model:value="formData.contractVersion" :bordered="false" class="p-0 text-[#566a7f]" placeholder="Nhập phiên bản hợp đồng" />
        </div>

        <!-- Hàng Ngày bắt đầu & Kết thúc -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
            <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Ngày bắt đầu</label>
            <a-date-picker v-model:value="formData.startDate" class="w-full p-0" :bordered="false" format="DD/MM/YYYY" placeholder="Chọn ngày" />
          </div>
          <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
            <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Ngày kết thúc</label>
            <a-date-picker v-model:value="formData.endDate" class="w-full p-0" :bordered="false" format="DD/MM/YYYY" placeholder="Chọn ngày" />
          </div>
        </div>

        <!-- Ô nhập Số năm -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 pb-2 pt-3 focus-within:border-[#696cff] transition-all">
          <label class="absolute -top-3 left-3 bg-white px-1 text-[11px] font-bold text-[#a1acb8] uppercase">Số năm</label>
          <a-input-number v-model:value="formData.years" class="w-full p-0" :bordered="false" placeholder="Nhập số năm" />
        </div>

        <!-- Cụm nút bấm sát nhau ở giữa -->
        <div class="flex justify-center gap-3 pt-4">
          <button 
            @click="handleCreate"
            class="px-8 py-2 bg-[#ff3e1d] text-white rounded-md font-bold hover:bg-[#e6381a] transition-all uppercase text-sm"
          >
            Thêm Mới
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const formData = ref({
  student: undefined,
  contractVersion: '',
  startDate: null,
  endDate: null,
  years: null
})

const handleCreate = () => {
  if (!formData.value.student || !formData.value.contractVersion) {
    message.error('Vui lòng điền đầy đủ thông tin!')
    return
  }
  message.success('Thêm mới thành công!')
  router.push('/student/signed-contract')
}

const handleReset = () => {
  formData.value = {
    student: undefined,
    contractVersion: '',
    startDate: null,
    endDate: null,
    years: null
  }
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  padding: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.ant-picker-input > input) {
  color: #566a7f;
}

:deep(.ant-input-number-handler-wrap) {
  display: none;
}
</style>
