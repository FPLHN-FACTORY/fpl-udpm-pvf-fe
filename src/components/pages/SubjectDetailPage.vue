<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Quản lý học tập văn hóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#b4bdc6]">Môn học văn hóa</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Chi tiết Môn học văn hóa</span>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Chi tiết Môn học văn hóa</h2>
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
            <tbody>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 w-[25%] font-bold text-[#566a7f]">Mã môn</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.code }}</td>
              </tr>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 font-bold text-[#566a7f]">Tên môn</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.name }}</td>
              </tr>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 font-bold text-[#566a7f]">Khối học</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.grade }}</td>
              </tr>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 font-bold text-[#566a7f]">Ghi chú</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.note || 'N/A' }}</td>
              </tr>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 font-bold text-[#566a7f]">Thời gian tạo</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.createdAt || 'N/A' }}</td>
              </tr>
              <tr class="border-b border-[#d9dee3]">
                <td class="px-6 py-4 font-bold text-[#566a7f]">Thời gian cập nhật</td>
                <td class="px-6 py-4 text-[#566a7f]">{{ subject.updatedAt || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="px-6 py-4 font-bold text-[#566a7f]">Trạng thái</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-3 py-1 rounded text-[11px] font-bold"
                    :class="subject.status === 'Đang hoạt động' ? 'bg-[#e8fadf] text-[#71dd37]' : 'bg-[#fff2d6] text-[#ffab00]'"
                  >
                    {{ subject.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[120px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng lớp học môn</span>
          <span class="text-[24px] font-bold text-[#566a7f]">21</span>
        </div>
        <div class="w-10 h-10 rounded-md bg-[#f0f0ff] flex items-center justify-center">
          <NavIcon name="BxBookContent" class-name="w-6 h-6 text-[#696cff]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[120px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tổng học viên</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[24px] font-bold text-[#566a7f]">20</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-md bg-[#ffebe6] flex items-center justify-center">
          <NavIcon name="BxsUserBadgeCheck" class-name="w-6 h-6 text-[#E81919]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[120px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Điểm trung bình môn</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[24px] font-bold text-[#566a7f]">1</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-md bg-[#fff2d6] flex items-center justify-center">
          <NavIcon name="BxsErrorCircle" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between h-[120px]">
        <div class="flex flex-col h-full justify-between py-1">
          <span class="text-[#566a7f] text-[13px] font-bold">Tỷ lệ đạt / không đạt</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[24px] font-bold text-[#566a7f]">21</span>
            <span class="text-[#71dd37] text-[12px] font-bold">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-md bg-[#fff2d6] flex items-center justify-center">
          <NavIcon name="BxWaves" class-name="w-6 h-6 text-[#ffab00]" />
        </div>
      </div>
    </div>

    <!-- Class List Section -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4 border-b border-[#d9dee3]">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Danh sách Lớp học</h2>
        <div class="flex gap-2">
          <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#E81919] text-white text-[13px] font-medium hover:bg-[#d11616] shadow-sm transition-colors">
            <NavIcon name="BxPlus" class-name="w-4 h-4" />
            Thêm Mới
          </button>
          <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#71dd37] text-white text-[13px] font-medium hover:bg-[#65c731] shadow-sm transition-colors">
            <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="m12 16 4-5h-3V4h-2v7H8l4 5zM4 18h16v2H4z"/></svg>
            Xuất Danh Sách
          </button>
          <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#03c3ec] text-white text-[13px] font-medium hover:bg-[#02afec] shadow-sm transition-colors">
            <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="m12 16 4-5h-3V4h-2v7H8l4 5zM4 18h16v2H4z" transform="rotate(180 12 12)"/></svg>
            Nhập Danh Sách
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
            <a-date-picker placeholder="Chọn thời gian" class="w-full h-[38px] !rounded-md" />
          </div>
          <div class="w-[20%]">
            <a-select placeholder="Chọn trạng thái" class="w-full h-[38px]">
              <a-select-option value="active">Đang hoạt động</a-select-option>
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

      <ClassTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'
import ClassTable from '../organisms/ClassTable.vue'
import { mockSubjects } from '../../services/home/api'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')

const subjectId = route.params.id as string
const subject = computed(() => mockSubjects.find(s => s.key === subjectId) || mockSubjects[0])

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push({ name: 'cultural-subject-edit', params: { id: subject.value.key } })
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  border-radius: 8px !important;
  border-color: #d9dee3 !important;
  height: 38px !important;
  display: flex;
  align-items: center;
}
</style>
