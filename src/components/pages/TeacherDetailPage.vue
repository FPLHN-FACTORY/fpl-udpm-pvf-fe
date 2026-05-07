<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập ngoại khóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Giáo viên phụ trách</span>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[110px]">
        <div class="flex flex-col h-full justify-between py-0.5">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng lớp phụ trách</span>
          <span class="text-[26px] font-bold text-[#566a7f]">250</span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#e7e7ff] flex items-center justify-center">
          <NavIcon name="BxSpreadsheet" class-name="w-6 h-6 text-[#696cff]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[110px]">
        <div class="flex flex-col h-full justify-between py-0.5">
          <span class="text-[#566a7f] text-[13px] font-bold">Số học viên phụ trách</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">20</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#ffe5e5] flex items-center justify-center">
          <NavIcon name="BxUser" class-name="w-6 h-6 text-[#E81919]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[110px]">
        <div class="flex flex-col h-full justify-between py-0.5">
          <span class="text-[#566a7f] text-[13px] font-bold">Số học viên đang dạy</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">1</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#fff2e2] flex items-center justify-center">
          <NavIcon name="BxUser" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[110px]">
        <div class="flex flex-col h-full justify-between py-0.5">
          <span class="text-[#566a7f] text-[13px] font-bold">Tỷ lệ hoàn thành lớp</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[26px] font-bold text-[#566a7f]">1</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#fff2e2] flex items-center justify-center">
          <NavIcon name="BxGridAlt" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Chi tiết Giáo viên phụ trách</h2>
        <div class="flex gap-2">
          <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
            <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
            Quay Lại
          </button>
          <button @click="goToEdit" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#E69A00] text-white text-[13px] font-medium hover:bg-[#d18b00] transition-colors shadow-sm">
            Chỉnh Sửa
          </button>
        </div>
      </div>

      <div class="px-6 pb-6">
        <div class="border border-[#d9dee3] rounded-lg overflow-hidden">
          <table class="w-full text-[14px]">
            <tbody class="divide-y divide-[#d9dee3]">
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">ID giáo viên</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.code }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">Họ tên giáo viên</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.name }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">SĐT giáo viên</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.phone }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">Email</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.email }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">Thời gian tạo</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.createdAt || 'N/A' }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">Thời gian cập nhật</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ teacher.updatedAt || 'N/A' }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 bg-[#f9fafb] font-bold text-[#566a7f]">Trạng thái</td>
                <td class="w-2/3 px-6 py-3">
                  <span 
                    class="px-2 py-1 rounded-md text-[11px] font-bold"
                    :class="teacher.status === 'Đang giảng dạy' ? 'bg-[#e7f9ed] text-[#71dd37]' : 'bg-[#fff2e6] text-[#ffab00]'"
                  >
                    {{ teacher.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Class List Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Danh sách Lớp học ngoại khóa</h2>
        <div class="flex gap-2">
          <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#E81919] text-white text-[13px] font-medium hover:bg-[#d11616] shadow-sm transition-colors">
            <NavIcon name="BxPlus" class-name="w-4 h-4" />
            Thêm Mới
          </button>
          <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#71dd37] text-white text-[13px] font-medium hover:bg-[#63c530] shadow-sm transition-colors">
            <NavIcon name="BxSpreadsheet" class-name="w-4 h-4" />
            Xuất Danh Sách
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="px-6 py-3 flex items-center justify-between gap-4 border-b border-[#d9dee3]">
        <div class="flex items-center gap-3 flex-1">
          <div class="w-[30%]">
            <input 
              type="text"
              placeholder="Tìm kiếm" 
              class="w-full h-[38px] px-3 rounded-md border border-[#d9dee3] focus:outline-none focus:border-[#696cff] text-[14px] text-[#566a7f] placeholder-[#b4bdc6]"
            />
          </div>
          <div class="w-[20%]">
            <a-select placeholder="Chọn môn" class="w-full h-[38px] custom-select" />
          </div>
          <div class="w-[20%]">
            <a-select placeholder="Chọn trạng thái" class="w-full h-[38px] custom-select" />
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

      <TeacherClassTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import TeacherClassTable from '../organisms/TeacherClassTable.vue'
import { mockTeachers } from '../../services/home/api'

const router = useRouter()
const route = useRoute()

const teacherId = route.params.id as string
const teacher = computed(() => mockTeachers.find(t => t.key === teacherId) || mockTeachers[3]) // Fallback to GV001 for demo

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push({ name: 'extracurricular-teacher-edit', params: { id: teacher.value.key } })
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
</style>
