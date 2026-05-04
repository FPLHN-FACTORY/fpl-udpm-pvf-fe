<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số biên bản</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">50</h3>
        </div>
        <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxCalendar" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Đang sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Ngừng sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">11</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Mức độ khen thưởng/kỷ luật</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="$router.push('/discipline/levels/deleted')" />
          <ButtonAdd text="Thêm Mới" @click="$router.push('/discipline/levels/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
        <div class="w-[250px]">
          <InputSearch 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Chọn trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </a-select>
        </div>
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
          class="template-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/levels/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/levels/edit/${record.key}`)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end">
        <BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="(page) => currentPage = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
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

const getStatusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Ngừng hoạt động': return 'default'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN MỨC', dataIndex: 'name', key: 'name' },
  { title: 'KHIỂN TRÁCH', dataIndex: 'type', key: 'type' },
  { title: 'CẤP ĐỘ', dataIndex: 'level', key: 'level' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '2',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '3',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
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

:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}

:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}

.template-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
