<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập văn hóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Môn học văn hóa</span>
    </div>

    <!-- Create Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Thêm mới Môn học văn hóa</h2>
        <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
          <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
          Quay Lại
        </button>
      </div>

      <div class="px-6 pb-8">
        <div class="flex flex-col gap-5 max-w-[100%] mx-auto">
          <!-- Mã môn -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.code"
              type="text" 
              id="subject-code"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="subject-code"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Mã môn
            </label>
          </div>

          <!-- Tên môn -->
          <div class="relative group mt-6">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.name ? 'hidden' : ''"
            >
              Tên môn
            </label>
            <a-select v-model:value="formData.name" placeholder="Tên môn" class="w-full h-[40px] custom-select">
              <a-select-option value="tin">Tin học</a-select-option>
              <a-select-option value="toan">Toán học</a-select-option>
            </a-select>
          </div>

          <!-- Khối học -->
          <div class="relative group mt-6">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.grade ? 'hidden' : ''"
            >
              Khối học
            </label>
            <a-select v-model:value="formData.grade" placeholder="Khối học" class="w-full h-[40px] custom-select">
              <a-select-option value="10">Khối 10</a-select-option>
              <a-select-option value="11">Khối 11</a-select-option>
              <a-select-option value="12">Khối 12</a-select-option>
            </a-select>
          </div>

          <!-- Ghi chú -->
          <div class="relative group mt-6">
            <textarea 
              v-model="formData.note"
              id="subject-note"
              placeholder=" "
              rows="4"
              class="floating-input w-full px-3 py-2 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] transition-all resize-none"
            ></textarea>
            <label 
              for="subject-note"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Ghi chú
            </label>
          </div>

          <!-- Trạng thái -->
          <div class="relative group mt-6">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.status ? 'hidden' : ''"
            >
              Trạng thái
            </label>
            <a-select v-model:value="formData.status" placeholder="Trạng thái" class="w-full h-[40px] custom-select">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Tạm ngưng</a-select-option>
            </a-select>
          </div>

          <!-- Buttons -->
          <div class="flex justify-center gap-3 mt-4">
            <button class="px-8 py-2 rounded-md bg-[#E81919] text-white text-[14px] font-medium hover:bg-[#d11616] shadow-sm transition-colors">
              Thêm Mới
            </button>
            <button @click="resetForm" class="px-8 py-2 rounded-md bg-[#E69A00] text-white text-[14px] font-medium hover:bg-[#d18b00] shadow-sm transition-colors">
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
import NavIcon from '../atoms/icons/NavIcon.vue'

const router = useRouter()

const formData = ref({
  code: '',
  name: undefined,
  grade: undefined,
  note: '',
  status: undefined
})

const resetForm = () => {
  formData.value = {
    code: '',
    name: undefined,
    grade: undefined,
    note: '',
    status: undefined
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  top: -8px;
  left: 10px;
  font-size: 12px;
  color: #32475c;
  font-weight: 500;
}

.floating-input:focus {
  border-color: #d9dee3 !important;
  outline: none;
  box-shadow: none !important;
}

.custom-select :deep(.ant-select-selector) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.custom-select :deep(.ant-select-selector:hover) {
  border-color: #d9dee3 !important;
}

.custom-select :deep(.ant-select-focused .ant-select-selector) {
  border-color: #d9dee3 !important;
  box-shadow: none !important;
}

.custom-select :deep(.ant-select-selection-placeholder) {
  color: #b4bdc6 !important;
}
</style>
