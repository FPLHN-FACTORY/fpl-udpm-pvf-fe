<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Đánh giá học viên</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Đánh giá toàn khóa</span>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Total Students -->
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng học viên hoàn thành</span>
          <span class="text-[26px] font-bold text-[#566a7f]">21</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#f0f0ff] flex items-center justify-center">
          <NavIcon name="BxBookContent" class-name="w-6 h-6 text-[#696cff]" />
        </div>
      </div>

      <!-- Average Score -->
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Điểm trung bình toàn khóa</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">20</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#ffebe6] flex items-center justify-center">
          <NavIcon name="BxCalendar" class-name="w-6 h-6 text-[#E81919]" />
        </div>
      </div>

      <!-- Pass/Fail Rate -->
      <div class="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tỷ lệ đạt / không đạt</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">1</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#fff2d6] flex items-center justify-center">
          <NavIcon name="BxLayers" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>

      <!-- Excellent Students -->
      <div class="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Số học viên xuất sắc</span>
          <span class="text-[26px] font-bold text-[#566a7f]">7</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#fff2d6] flex items-center justify-center">
          <NavIcon name="BxAward" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Danh sách Đánh giá toàn khóa</h2>
        <div class="flex gap-2">
          <button @click="goToDeleted" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#8592a3] text-white text-[13px] font-medium hover:bg-[#717d8c] transition-colors shadow-sm">
            <NavIcon name="BxTrash" class-name="w-4 h-4" />
            Danh Sách Đã Xóa
          </button>
          <button @click="goToCreate" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#E81919] text-white text-[13px] font-medium hover:bg-[#d11616] transition-colors shadow-sm">
            <NavIcon name="BxPlus" class-name="w-4 h-4" />
            Thêm Mới
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="px-6 py-3 flex items-center justify-between gap-4 border-b border-[#d9dee3]">
        <div class="flex items-center gap-3 flex-1">
          <div class="w-[30%]">
            <input 
              v-model="searchQuery" 
              type="text"
              placeholder="Tìm kiếm" 
              class="w-full h-[38px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] placeholder-[#b4bdc6]"
            />
          </div>
          <div class="w-[20%]">
            <a-select 
              v-model:value="courseFilter" 
              placeholder="Chọn khóa" 
              class="w-full h-[38px]"
            >
              <a-select-option value="2025">PVF 2025</a-select-option>
            </a-select>
          </div>
          <div class="w-[20%]">
            <a-select 
              v-model:value="statusFilter" 
              placeholder="Chọn trạng thái" 
              class="w-full h-[38px]"
            >
              <a-select-option value="locked">Đã khóa</a-select-option>
            </a-select>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button class="px-5 py-2 rounded-md bg-[#696cff] text-white text-[13px] font-medium hover:bg-[#5f61e6] transition-colors shadow-sm flex items-center gap-2">
            <NavIcon name="BxSearch" class-name="w-4 h-4" />
            Tìm Kiếm
          </button>
          <button 
            @click="resetFilters"
            class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#8592a3] text-white hover:bg-[#717d8c] transition-colors shadow-sm"
          >
            <NavIcon name="BxReset" class-name="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <CourseEvaluationTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/icons/NavIcon.vue'
import CourseEvaluationTable from '../organisms/CourseEvaluationTable.vue'

const router = useRouter()
const searchQuery = ref('')
const courseFilter = ref(undefined)
const statusFilter = ref(undefined)

const goToCreate = () => {
  router.push({ name: 'evaluation-full-course-create' })
}

const goToDeleted = () => {
  router.push({ name: 'evaluation-full-course-deleted' })
}

const resetFilters = () => {
  searchQuery.value = ''
  courseFilter.value = undefined
  statusFilter.value = undefined
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 8px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  box-shadow: none !important;
}

:deep(.ant-select-selection-placeholder) {
  color: #b4bdc6 !important;
  font-size: 14px !important;
}

:deep(.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  border-color: #696cff !important;
}
</style>
