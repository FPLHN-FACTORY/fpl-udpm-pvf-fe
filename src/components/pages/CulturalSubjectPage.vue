<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs matching mockup exactly -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập văn hóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Môn học văn hóa</span>
    </div>

    <!-- Summary Cards (Smaller height) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Subjects -->
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng số</span>
          <span class="text-[26px] font-bold text-[#566a7f]">21</span>
          <span class="text-[#566a7f] text-[12px] font-semibold">Môn học văn hóa</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#f0f0ff] flex items-center justify-center">
          <NavIcon name="BxBookContent" class-name="w-6 h-6 text-[#696cff]" />
        </div>
      </div>

      <!-- Active Subjects -->
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng số đang sử dụng</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">20</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(95%)</span>
          </div>
          <span class="text-[#566a7f] text-[12px] font-semibold">Môn học văn hóa</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#ffebe6] flex items-center justify-center">
          <NavIcon name="BxsLayers" class-name="w-6 h-6 text-[#ff3e1d]" />
        </div>
      </div>

      <!-- Suspended Subjects -->
      <div class="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between h-[150px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng số tạm ngưng</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">1</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
          <span class="text-[#566a7f] text-[12px] font-semibold">Môn học văn hóa</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#fff2d6] flex items-center justify-center">
          <NavIcon name="BxsDatabaseMinus" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Danh sách Môn học văn hóa</h2>
        <div class="flex gap-2">
          <button @click="goToDeleted" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#8592a3] text-white text-[13px] font-medium hover:bg-[#717d8c] transition-colors shadow-sm">
            <NavIcon name="BxTrash" class-name="w-4 h-4" />
            Danh Sách Đã Xóa
          </button>
          <button @click="goToCreate" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#ff3e1d] text-white text-[13px] font-medium hover:bg-[#e6381a] transition-colors shadow-sm">
            <NavIcon name="BxPlus" class-name="w-4 h-4" />
            Thêm Mới
          </button>
        </div>
      </div>

      <!-- Filter Bar (Aligned exactly like mockup) -->
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
            <a-date-picker 
              v-model:value="dateFilter" 
              placeholder="Chọn thời gian" 
              class="w-full h-[38px] !rounded-lg !border-[#d9dee3]"
            />
          </div>
          <div class="w-[20%]">
            <a-select 
              v-model:value="statusFilter" 
              placeholder="Chọn trạng thái" 
              class="w-full h-[38px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="suspended">Tạm ngưng</a-select-option>
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
      <SubjectTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'
import SubjectTable from '../organisms/SubjectTable.vue'

const router = useRouter()
const searchQuery = ref('')
const dateFilter = ref(null)
const selectedGrade = ref(undefined)

const goToCreate = () => {
  router.push({ name: 'cultural-subject-create' })
}

const goToDeleted = () => {
  router.push({ name: 'cultural-subject-deleted' })
}
const statusFilter = ref(undefined)

const resetFilters = () => {
  searchQuery.value = ''
  dateFilter.value = null
  statusFilter.value = undefined
}
</script>

<style scoped>
:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 8px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  box-shadow: none !important;
}

:deep(.ant-select-selection-placeholder), :deep(.ant-picker-input > input::placeholder) {
  color: #b4bdc6 !important;
  font-size: 14px !important;
}

:deep(.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  border-color: #696cff !important;
}

:deep(.ant-picker-focused) {
  border-color: #696cff !important;
}
</style>
