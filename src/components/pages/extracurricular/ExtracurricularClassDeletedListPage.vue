<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập ngoại khóa</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Lớp học ngoại khóa</span>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Lớp học ngoại khóa đã xóa</h2>
        <div class="flex items-center gap-2">
          <a-button @click="$router.back()" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md h-9 text-xs font-medium">
            <NavIcon name="BxArrowBack" size="14" />
            <span>Quay Lại</span>
          </a-button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm kiếm" class="!h-10 !border-[#d9dee3] rounded-md">
            <template #prefix>
              <NavIcon name="BxSearch" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="timeFilter" placeholder="Chọn thời gian" class="w-full !h-10">
            <a-select-option value="all">Tất cả</a-select-option>
          </a-select>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full !h-10">
            <a-select-option value="all">Tất cả</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <a-button type="primary" class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-10 px-6 rounded-md flex items-center gap-2">
            <NavIcon name="BxSearch" size="16" />
            Tìm Kiếm
          </a-button>
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-10 !h-10 !p-0 !min-w-0 flex items-center justify-center rounded-md shadow-sm" 
            @click="resetFilters"
          >
            <NavIcon name="BxReset" class-name="w-6 h-6 text-white" />
          </a-button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="deletedData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                />
                <NavIcon 
                  name="BxReset" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-500" 
                  @click="handleRestore(record)"
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                  @click="handlePermanentDelete(record)"
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Custom Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="3" :total="60" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')
const timeFilter = ref(undefined)
const statusFilter = ref(undefined)

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'MÔN', dataIndex: 'subject', key: 'subject' },
  { title: 'TÊN LỚP', dataIndex: 'name', key: 'name' },
  { title: 'GIÁO VIÊN PHỤ TRÁCH', dataIndex: 'teacher', key: 'teacher' },
  { title: 'ĐỊA ĐIỂM', dataIndex: 'location', key: 'location' },
  { title: 'SỸ SỐ TỐI ĐA', dataIndex: 'maxSize', key: 'maxSize', align: 'center' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 180 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const deletedData = ref([
  { id: 1, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Trần Minh Tuấn', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 2, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 3, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 4, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 5, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 6, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 7, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 8, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
])

const resetFilters = () => {
  searchQuery.value = ''
  timeFilter.value = undefined
  statusFilter.value = undefined
}

const handleRestore = (record: any) => {
  console.log('Restoring class:', record.name)
}

const handlePermanentDelete = (record: any) => {
  console.log('Permanently deleting class:', record.name)
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
:deep(.ant-pagination-item-active) {
  background-color: #e31a1a !important;
  border-color: #e31a1a !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
