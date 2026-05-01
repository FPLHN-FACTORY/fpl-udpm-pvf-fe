<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập văn hóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Môn học văn hóa</span>
    </div>

    <!-- Edit Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Điều chỉnh Môn học văn hóa</h2>
        <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
          <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
          Quay Lại
        </button>
      </div>

      <div class="px-6 pb-8">
        <div class="flex flex-col gap-5 max-w-[100%] mx-auto pt-5">
          <!-- Mã môn -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-semibold text-[#566a7f] ml-1">Mã môn</label>
            <input 
              v-model="formData.code"
              type="text" 
              placeholder="Mã môn"
              class="w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] placeholder-[#b4bdc6] transition-colors"
            />
          </div>

          <!-- Tên môn -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-semibold text-[#566a7f] ml-1">Tên môn</label>
            <a-select v-model:value="formData.name" placeholder="Tên môn" class="w-full h-[40px] custom-select">
              <a-select-option value="Tin học">Tin học</a-select-option>
              <a-select-option value="Toán học">Toán học</a-select-option>
            </a-select>
          </div>

          <!-- Khối học -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-semibold text-[#566a7f] ml-1">Khối học</label>
            <a-select v-model:value="formData.grade" placeholder="Khối học" class="w-full h-[40px] custom-select">
              <a-select-option value="10">Khối 10</a-select-option>
              <a-select-option value="11">Khối 11</a-select-option>
              <a-select-option value="12">Khối 12</a-select-option>
            </a-select>
          </div>

          <!-- Ghi chú -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-semibold text-[#566a7f] ml-1">Ghi chú</label>
            <textarea 
              v-model="formData.note"
              placeholder="Ghi chú"
              rows="4"
              class="w-full px-3 py-2 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] placeholder-[#b4bdc6] transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Trạng thái -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-semibold text-[#566a7f] ml-1">Trạng thái</label>
            <a-select v-model:value="formData.status" placeholder="Trạng thái" class="w-full h-[40px] custom-select">
              <a-select-option value="Đang hoạt động">Đang hoạt động</a-select-option>
              <a-select-option value="Tạm ngưng">Tạm ngưng</a-select-option>
            </a-select>
          </div>

          <!-- Buttons -->
          <div class="flex justify-center gap-3 mt-4">
            <button class="px-8 py-2 rounded-md bg-[#ff3e1d] text-white text-[14px] font-medium hover:bg-[#e6381a] shadow-sm transition-colors">
              Cập Nhật
            </button>
            <button @click="resetForm" class="px-8 py-2 rounded-md bg-[#ffab00] text-white text-[14px] font-medium hover:bg-[#e69a00] shadow-sm transition-colors">
              Đặt Lại
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'

const router = useRouter()

// Pre-populate with mockup data
const initialData = {
  code: 'MH001',
  name: 'Tin học',
  grade: '12',
  note: 'Môn tin học lớp 12',
  status: 'Đang hoạt động'
}

const formData = ref({ ...initialData })

const resetForm = () => {
  formData.value = { ...initialData }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.custom-select :deep(.ant-select-selector) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.custom-select :deep(.ant-select-selector:hover) {
  border-color: #696cff !important;
}

.custom-select :deep(.ant-select-focused .ant-select-selector) {
  border-color: #696cff !important;
  box-shadow: 0 0 0 2px rgba(105, 108, 255, 0.1) !important;
}
</style>
