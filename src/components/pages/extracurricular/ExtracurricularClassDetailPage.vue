<template>
  <div class="space-y-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumb -->
    <div class="flex items-center text-[13px] text-gray-500 space-x-2 px-1">
      <span>Quản lý học tập ngoại khóa</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Lớp học ngoại khóa</span>
    </div>

    <!-- Header Section -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <h2 class="text-lg font-bold text-[#566a7f]">
        Chi tiết Lớp học ngoại khóa
      </h2>
      <div class="flex items-center space-x-3">
        <a-button @click="handleBack" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md h-9 text-xs font-medium">
          <NavIcon name="BxArrowBack" size="14" />
          <span>Quay Lại</span>
        </a-button>
        <a-button 
          type="primary" 
          @click="$router.push(`/extracurricular/classes/edit/1`)"
          class="bg-[#ffab00] border-[#ffab00] hover:bg-[#e69a00] text-white rounded-md h-9 px-4 flex items-center text-xs font-bold uppercase"
        >
          Chỉnh Sửa
        </a-button>
      </div>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="divide-y divide-gray-100">
        <div v-for="(item, index) in classDetails" :key="index" class="grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors">
          <div class="col-span-3 text-sm font-semibold text-[#566a7f]">{{ item.label }}</div>
          <div class="col-span-9 text-sm text-[#566a7f]">
            <template v-if="item.key === 'status'">
              <a-tag color="processing" class="rounded-full px-3 border-none bg-[#e7f5e9] text-[#71dd37] font-bold">
                {{ item.value }}
              </a-tag>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Students Table with Tabs -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Học viên tham gia lớp học</h2>
        <div class="flex items-center gap-2">
          <a-button type="primary" class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium">
            <NavIcon name="BxPlus" size="14" />
            Thêm Học Viên
          </a-button>
          <a-button class="!bg-[#71dd37] hover:!bg-[#63c130] !text-white !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium">
            <NavIcon name="BxExport" size="14" />
            Xuất Danh Sách
          </a-button>
          <a-button class="!bg-[#03c3ec] hover:!bg-[#02af00] !text-white !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium">
            <NavIcon name="BxImport" size="14" />
            Nhập Danh Sách
          </a-button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="px-6 pt-4 flex gap-4 border-b border-gray-100 bg-[#fcfcfd]">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            activeTab === tab.key 
              ? 'bg-[#696cff] text-white' 
              : 'bg-[#e7e7ff] text-[#696cff] hover:bg-[#dbdbff]'
          ]"
          class="px-6 py-2 rounded-md text-xs font-bold transition-colors mb-4"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content: Danh Sách -->
      <div v-if="activeTab === 'list'" class="p-0">
        <a-table 
          :columns="studentColumns" 
          :data-source="studentData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'status'">
              <span class="bg-[#e7f5e9] text-[#71dd37] px-3 py-1 rounded-md text-[11px] font-bold uppercase">
                Học đi
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon name="BxShow" class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" />
                <NavIcon name="BxEditAlt" class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" />
                <NavIcon name="BxTrash" class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Tab Content: Điểm Danh -->
      <div v-if="activeTab === 'attendance'" class="p-6 space-y-6">
        <div class="w-[200px]">
          <a-select defaultValue="buoi1" class="w-full !h-10">
            <a-select-option value="buoi1">Chọn Buổi</a-select-option>
            <a-select-option value="buoi2">Buổi 2</a-select-option>
          </a-select>
        </div>
        <a-table 
          :columns="attendanceColumns" 
          :data-source="studentData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'attendance'">
              <a-switch v-model:checked="record.isPresent" />
            </template>
            <template v-if="column.key === 'note'">
              <a-input v-model:value="record.note" placeholder="..." class="!h-8" />
            </template>
          </template>
        </a-table>
      </div>

      <!-- Tab Content: Bảng Điểm -->
      <div v-if="activeTab === 'grades'" class="p-0">
        <a-table 
          :columns="gradeColumns" 
          :data-source="studentData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key.startsWith('score')">
              <a-input v-model:value="record[column.key]" placeholder="..." class="!h-8 w-20 mx-auto block text-center" />
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../atoms/NavIcon.vue'

const router = useRouter()
const isEditing = ref(false)
const activeTab = ref(router.currentRoute.value.query.tab as string || 'list')

const tabs = [
  { key: 'list', label: 'Danh Sách' },
  { key: 'attendance', label: 'Điểm Danh' },
  { key: 'grades', label: 'Bảng Điểm' },
]

const classDetails = computed(() => [
  { label: 'Tên lớp', value: 'UT1301', key: 'name' },
  { label: 'Môn', value: 'Kỹ năng làm việc nhóm', key: 'subject' },
  { label: 'Địa điểm', value: 'Phòng học chiến thuật PVF', key: 'location' },
  { label: 'Giáo viên phụ trách', value: 'Nguyễn Văn Hùng - Hungnv12', key: 'teacher' },
  { label: 'Sỹ số lớp tối đa', value: '20', key: 'maxSize' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45', key: 'updatedAt' },
  { label: 'Trạng thái', value: 'Đang mở', key: 'status' },
])

const studentColumns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'EMAIL', dataIndex: 'email', key: 'email' },
  { title: 'NGÀY VÀO LỚP', dataIndex: 'joinDate', key: 'joinDate' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 120 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const attendanceColumns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐIỂM DANH', key: 'attendance', width: 120, align: 'center' },
  { title: 'GHI CHÚ', key: 'note' }
]

const gradeColumns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐẦU ĐIỂM SỐ 1', key: 'score1', width: 150, align: 'center' },
  { title: 'ĐẦU ĐIỂM SỐ 2', key: 'score2', width: 150, align: 'center' },
  { title: 'ĐẦU ĐIỂM SỐ 3', key: 'score3', width: 150, align: 'center' }
]

const studentData = ref([
  { id: 1, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: true, note: '', score1: '', score2: '', score3: '' },
  { id: 2, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: false, note: '', score1: '', score2: '', score3: '' },
  { id: 3, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: true, note: '', score1: '', score2: '', score3: '' },
])

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
:deep(.pvf-table .ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  border-bottom: 1px solid #d9dee3;
}
:deep(.pvf-table .ant-table-tbody > tr > td) {
  color: #566a7f;
  font-size: 13px;
  padding: 12px 16px;
}
</style>
