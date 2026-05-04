<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập văn hoá</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Khối lớp</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách <span class="bg-[#fcf3d7] px-1 rounded">Khối lớp</span> đã xóa</h2>
        <div class="flex gap-3">
        <ButtonBack @click="$router.back()" />
      </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang sử dụng</a-select-option>
            <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
            <a-select-option value="suspended">Tạm ngưng</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="grade-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxReset" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end">
        <a-pagination 
          v-model:current="currentPage" 
          :total="50" 
          :show-size-changer="false"
          class="custom-pagination"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'
import ButtonSearch from '../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../atoms/inputs/InputSearch.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const currentPage = ref(3)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const columns = [
  { title: 'STT', key: 'stt', width: 80 },
  { title: 'TÊN KHỐI', dataIndex: 'name', key: 'name' },
  { title: 'GHI CHÚ', dataIndex: 'note', key: 'note' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 200 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 150, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: '10',
    note: 'Dành cho học viên độ tuổi U12',
    deletedAt: '25-02-01 8:30',
  },
  {
    key: '2',
    name: '11',
    note: 'Dành cho học viên độ tuổi U12',
    deletedAt: '25-02-01 8:30',
  },
  {
    key: '3',
    name: '12',
    note: 'Dành cho học viên độ tuổi U12',
    deletedAt: '25-02-01 8:30',
  },
  {
    key: '4',
    name: '9',
    note: 'Dành cho học viên độ tuổi U12',
    deletedAt: '25-02-01 8:30',
  },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}
</style>
