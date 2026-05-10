<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khóa</a-breadcrumb-item>
      <a-breadcrumb-item>Lớp học ngoại khóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Back Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Lớp học ngoại khóa đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonBack @click="$router.back()" />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 -mx-6 mb-4"></div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm kiếm" class="!h-[42px] !border-[#d9dee3] rounded-md">
            <template #prefix>
              <NavIcon name="BxSearch" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="timeFilter" placeholder="Chọn thời gian" class="w-full !h-[42px] custom-select">
            <a-select-option value="all">Tất cả</a-select-option>
          </a-select>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full !h-[42px] custom-select">
            <a-select-option value="all">Tất cả</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <a-button type="primary" class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-[42px] px-6 rounded-md flex items-center gap-2">
            <NavIcon name="BxSearch" size="16" />
            Tìm Kiếm
          </a-button>
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-[42px] !h-[42px] !p-0 !min-w-0 flex items-center justify-center rounded-md shadow-sm" 
            @click="resetFilters"
          >
            <NavIcon name="BxReset" class-name="w-6 h-6 text-white" />
          </a-button>
        </div>
      </div>

      <!-- Divider before table -->
      <div class="border-t border-gray-100 -mx-6 mb-0"></div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="deletedData" 
          :pagination="false"
          :row-selection="{}"
          class="custom-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <button class="text-gray-400 hover:text-[#696cff] transition-colors" title="Xem chi tiết">
                  <NavIcon name="BxShow" size="18" />
                </button>
                <button class="text-gray-400 hover:text-green-500 transition-colors" title="Khôi phục" @click="handleRestore(record)">
                  <NavIcon name="BxReset" size="18" />
                </button>
                <button class="text-gray-400 hover:text-[#ff3e1d] transition-colors" title="Xóa vĩnh viễn" @click="handlePermanentDelete(record)">
                  <NavIcon name="BxTrash" size="18" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Custom Pagination -->
      <div class="flex justify-end mt-4">
        <a-pagination :current="3" :total="60" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'

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
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130, align: 'center' }
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
:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: transparent;
  color: #22303E;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.custom-table .ant-table-tbody > tr > td) {
  padding: 16px;
  color: #22303E;
  opacity: 0.9;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.custom-select .ant-select-selector) {
  height: 42px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.ant-pagination-item-active) {
  background-color: #696cff !important;
  border-color: #696cff !important;
}

:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
