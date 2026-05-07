<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Cơ sở đào tạo</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Danh sách đã xóa</span>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Cơ sở đào tạo đã xóa</h2>
        <a-button @click="$router.back()" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md">
          <NavIcon name="BxArrowBack" size="14" />
          <span class="text-xs font-medium">Quay Lại</span>
        </a-button>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm tên cơ sở / địa chỉ" class="!h-10 !border-[#d9dee3]">
            <template #prefix>
              <NavIcon name="BxSearch" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input>
        </div>
        <div class="flex items-center gap-2">
          <a-button type="primary" class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-10 px-6">
            Tìm Kiếm
          </a-button>
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-10 !h-10 !p-0 !min-w-0 flex items-center justify-center rounded-lg shadow-sm" 
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
          :pagination="{ 
            current: 1, 
            pageSize: 5, 
            total: deletedData.length, 
            showSizeChanger: false,
          }"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <a-tooltip title="Khôi phục">
                  <NavIcon 
                    name="BxReset" 
                    class-name="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600" 
                    @click="handleRestore(record)"
                  />
                </a-tooltip>
                <a-tooltip title="Xóa vĩnh viễn">
                  <NavIcon 
                    name="BxTrash" 
                    class-name="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600" 
                    @click="handlePermanentDelete(record)"
                  />
                </a-tooltip>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')

const columns = [
  { title: 'STT', key: 'stt', width: 70 },
  { title: 'TÊN CƠ SỞ ĐÀO TẠ', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ', dataIndex: 'address', key: 'address' },
  { title: 'THÔNG TIN LIÊN HỆ', dataIndex: 'contact', key: 'contact' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150 }
]

const deletedData = ref([
  { 
    id: 1, 
    name: 'Cơ sở đào tạo FPT Cần Thơ', 
    address: '600 Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ', 
    contact: '0292-7300-1955',
    deletedAt: '2026-04-15'
  },
  { 
    id: 2, 
    name: 'Cơ sở đào tạo FPT Đà Nẵng', 
    address: 'Khu đô thị FPT City, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng', 
    contact: '0236-7300-1955',
    deletedAt: '2026-03-20'
  }
])

const resetFilters = () => {
  searchQuery.value = ''
}

const handleRestore = (record: any) => {
  console.log('Restoring facility:', record.name)
}

const handlePermanentDelete = (record: any) => {
  console.log('Permanently deleting facility:', record.name)
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
  font-size: 12px;
}
:deep(.ant-pagination-item-active) {
  background-color: #696cff !important;
  border-color: #696cff !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
