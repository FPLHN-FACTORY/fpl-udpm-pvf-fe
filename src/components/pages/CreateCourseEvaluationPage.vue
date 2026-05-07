<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Đánh giá học viên</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Đánh giá toàn khóa</span>
    </div>

    <!-- Create Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden pb-8">
      <div class="flex justify-between items-center px-6 py-4">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Thêm mới Đánh giá toàn khóa</h2>
        <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
          <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
          Quay Lại
        </button>
      </div>

      <div class="px-6">
        <div class="flex flex-col gap-5">
          <!-- Học viên -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.studentName"
              type="text" 
              id="eval-student"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="eval-student"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Học viên
            </label>
          </div>

          <!-- Khóa -->
          <div class="relative group mt-2">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.course ? 'hidden' : ''"
            >
              Khóa
            </label>
            <a-select v-model:value="formData.course" placeholder="Khóa" class="w-full h-[40px] custom-select">
              <a-select-option value="PVF 2025">PVF 2025</a-select-option>
              <a-select-option value="U13">U13</a-select-option>
            </a-select>
          </div>

          <!-- Tổng điểm -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.totalScore"
              type="text" 
              id="eval-total-score"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="eval-total-score"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Tổng điểm
            </label>
          </div>

          <!-- Điểm TB -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.averageScore"
              type="text" 
              id="eval-avg-score"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="eval-avg-score"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Điểm TB
            </label>
          </div>

          <!-- Xếp hạng -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.rank"
              type="text" 
              id="eval-rank"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="eval-rank"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Xếp hạng
            </label>
          </div>

          <!-- Xếp loại -->
          <div class="relative group mt-2">
            <input 
              v-model="formData.classification"
              type="text" 
              id="eval-class"
              placeholder=" "
              class="floating-input w-full h-[40px] px-3 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all"
            />
            <label 
              for="eval-class"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Xếp loại
            </label>
          </div>

          <!-- Ngày đánh giá -->
          <div class="relative group mt-2">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.evalDate ? 'hidden' : ''"
            >
              Ngày đánh giá
            </label>
            <a-date-picker v-model:value="formData.evalDate" placeholder="Ngày đánh giá" class="w-full h-[40px] custom-picker" />
          </div>

          <!-- Nhận xét tổng quan -->
          <div class="relative group mt-2">
            <textarea 
              v-model="formData.overallComment"
              id="eval-comment"
              placeholder=" "
              rows="4"
              class="floating-input w-full px-3 py-2 rounded-md border border-[#d9dee3] focus:outline-none text-[14px] text-[#566a7f] transition-all resize-none"
            ></textarea>
            <label 
              for="eval-comment"
              class="floating-label absolute left-3 top-[10px] px-1 bg-white text-[14px] text-[#b4bdc6] transition-all pointer-events-none"
            >
              Nhận xét tổng quan
            </label>
          </div>

          <!-- Trạng thái -->
          <div class="relative group mt-2">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.status ? 'hidden' : ''"
            >
              Trạng thái
            </label>
            <a-select v-model:value="formData.status" placeholder="Trạng thái" class="w-full h-[40px] custom-select">
              <a-select-option value="Đã khóa">Đã khóa</a-select-option>
              <a-select-option value="Chưa khóa">Chưa khóa</a-select-option>
            </a-select>
          </div>

          <!-- Thời điểm khóa đánh giá -->
          <div class="relative group mt-2">
            <label 
              class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#566a7f] z-10 transition-all"
              :class="!formData.lockedDate ? 'hidden' : ''"
            >
              Thời điểm khóa đánh giá
            </label>
            <a-date-picker v-model:value="formData.lockedDate" placeholder="Thời điểm khóa đánh giá" class="w-full h-[40px] custom-picker" />
          </div>

          <!-- Action Buttons -->
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
import NavIcon from '../atoms/NavIcon.vue'

const router = useRouter()

interface FormData {
  studentName: string
  course: string | undefined
  totalScore: string
  averageScore: string
  rank: string
  classification: string
  evalDate: any
  overallComment: string
  status: string | undefined
  lockedDate: any
}

const formData = ref<FormData>({
  studentName: '',
  course: undefined,
  totalScore: '',
  averageScore: '',
  rank: '',
  classification: '',
  evalDate: null,
  overallComment: '',
  status: undefined,
  lockedDate: null
})

const resetForm = () => {
  formData.value = {
    studentName: '',
    course: undefined,
    totalScore: '',
    averageScore: '',
    rank: '',
    classification: '',
    evalDate: null,
    overallComment: '',
    status: undefined,
    lockedDate: null
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
  color: #566a7f;
  font-weight: 500;
}

.floating-input:focus {
  border-color: #696cff !important;
  box-shadow: none !important;
}

.custom-select :deep(.ant-select-selector), .custom-picker :deep(.ant-picker) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  height: 40px !important;
  display: flex;
  align-items: center;
}

.custom-select :deep(.ant-select-selection-placeholder), .custom-picker :deep(.ant-picker-input > input::placeholder) {
  color: #b4bdc6 !important;
}

:deep(.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}
</style>
