<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs matching mockup -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập ngoại khóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Giáo viên phụ trách</span>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mt-2">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Danh sách Giáo viên phụ trách</h2>
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
            <a-select placeholder="Chọn trạng thái" class="w-full h-[38px] custom-select">
              <a-select-option value="active">Đang giảng dạy</a-select-option>
              <a-select-option value="inactive">Ngừng hợp tác</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="px-5 py-2 rounded-md bg-[#696cff] text-white text-[13px] font-medium hover:bg-[#5f61e6] transition-colors shadow-sm flex items-center gap-2">
            <NavIcon name="BxSearch" class-name="w-4 h-4" />
            Tìm Kiếm
          </button>
          <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#8592a3] text-white hover:bg-[#717d8c] transition-colors shadow-sm">
            <NavIcon name="BxReset" class-name="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <TeacherTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'
import TeacherTable from '../organisms/TeacherTable.vue'

const router = useRouter()

const searchQuery = ref('')
const goToCreate = () => {
  router.push({ name: 'extracurricular-teacher-create' })
}

const goToDeleted = () => {
  router.push({ name: 'extracurricular-teacher-deleted' })
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  height: 38px !important;
  display: flex;
  align-items: center;
}

:deep(.ant-select-selector:hover) {
  border-color: #696cff !important;
}
</style>
