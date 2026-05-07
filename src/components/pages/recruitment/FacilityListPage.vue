<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Cơ sở đào tạo</span>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Cơ sở đào tạo</h2>
        <div class="flex items-center gap-2">
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !text-white !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
            @click="$router.push('/recruitment/facility/deleted')"
          >
            <NavIcon name="BxTrash" size="14" />
            Danh Sách Đã Xóa
          </a-button>
          <a-button 
            type="primary" 
            class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
            @click="$router.push('/recruitment/facility/create')"
          >
            <NavIcon name="BxPlus" size="14" />
            Thêm Mới
          </a-button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm kiếm cơ sở..." class="!h-10 !border-[#d9dee3] rounded-md">
            <template #prefix>
              <NavIcon name="BxSearch" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full !h-10">
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
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
          :data-source="facilityData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'status'">
              <div class="flex items-center">
                <span :class="record.status === 'active' ? 'bg-[#e7f5e9] text-[#71dd37]' : 'bg-[#fff2e1] text-[#ffab00]'" class="px-3 py-1 rounded-md text-[11px] font-bold uppercase whitespace-nowrap">
                  {{ record.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
                </span>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                  @click="$router.push(`/recruitment/facility/info`)"
                />
                <NavIcon 
                  name="BxEditAlt" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" 
                  @click="$router.push(`/recruitment/facility/edit/${record.id}`)"
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="1" :total="facilityData.length" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN CƠ SỞ ĐÀO TẠ', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ', dataIndex: 'address', key: 'address' },
  { title: 'THÔNG TIN LIÊN HỆ', dataIndex: 'contact', key: 'contact' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const facilityData = ref([
  { id: 1, name: 'Cơ sở đào tạo FPT Hà Nội', address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội', contact: '024-7300-1955', status: 'active' },
  { id: 2, name: 'Cơ sở đào tạo FPT TP.HCM', address: 'Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức', contact: '028-7300-1955', status: 'active' },
  { id: 3, name: 'Cơ sở đào tạo FPT Đà Nẵng', address: 'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng', contact: '0236-7300-1955', status: 'inactive' },
])

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
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
