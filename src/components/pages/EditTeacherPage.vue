<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập ngoại khóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Giáo viên phụ trách</span>
    </div>

    <!-- Edit Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mt-2 pb-6">
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3] mb-6">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Điều chỉnh Giáo viên phụ trách</h2>
        <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
          <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
          Quay Lại
        </button>
      </div>

      <div class="px-6 space-y-6">
        <!-- Họ tên giáo viên -->
        <div class="relative group">
          <input 
            v-model="formData.name"
            type="text" 
            id="edit-teacher-name"
            placeholder=" "
            class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] transition-all"
          />
          <label 
            for="edit-teacher-name"
            class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
          >
            Họ tên giáo viên
          </label>
        </div>

        <!-- SĐT giáo viên -->
        <div class="relative group mt-6">
          <input 
            v-model="formData.phone"
            type="text" 
            id="edit-teacher-phone"
            placeholder=" "
            class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] transition-all"
          />
          <label 
            for="edit-teacher-phone"
            class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
          >
            SĐT giáo viên
          </label>
        </div>

        <!-- Email -->
        <div class="relative group mt-6">
          <input 
            v-model="formData.email"
            type="text" 
            id="edit-teacher-email"
            placeholder=" "
            class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] transition-all"
          />
          <label 
            for="edit-teacher-email"
            class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
          >
            Email
          </label>
        </div>

        <!-- Trạng thái -->
        <div class="relative group mt-6">
          <label 
            class="absolute -top-2 left-3 px-1 bg-white text-[12px] text-[#566a7f] z-10 transition-all"
            :class="!formData.status ? 'hidden' : ''"
          >
            Trạng thái
          </label>
          <a-select v-model:value="formData.status" placeholder="Trạng thái" class="w-full h-[40px] custom-select">
            <a-select-option value="Đang giảng dạy">Đang giảng dạy</a-select-option>
            <a-select-option value="Ngừng hợp tác">Ngừng hợp tác</a-select-option>
          </a-select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-center gap-3 pt-4">
          <button class="px-8 py-2 rounded-md bg-[#E81919] text-white text-[14px] font-medium hover:bg-[#d11616] shadow-sm transition-colors">
            Cập Nhật
          </button>
          <button @click="resetForm" class="px-8 py-2 rounded-md bg-[#E69A00] text-white text-[14px] font-medium hover:bg-[#d18b00] shadow-sm transition-colors">
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
import NavIcon from '../atoms/NavIcon.vue'

const router = useRouter()

const initialData = {
  name: 'Nguyễn Văn Hùng',
  phone: '0903 123 456',
  email: 'hung.nguyen@pvf.com.vn',
  status: 'Đang giảng dạy'
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
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  top: -8px;
  left: 10px;
  font-size: 12px;
  color: #32475c; /* Dark text */
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
}

.custom-select :deep(.ant-select-selector:hover) {
  border-color: #d9dee3 !important;
}

.custom-select :deep(.ant-select-focused .ant-select-selector) {
  border-color: #d9dee3 !important;
  box-shadow: none !important;
}

.custom-select :deep(.ant-select-selection-item) {
  font-size: 14px;
  color: #566a7f;
  display: flex;
  align-items: center;
}
</style>
