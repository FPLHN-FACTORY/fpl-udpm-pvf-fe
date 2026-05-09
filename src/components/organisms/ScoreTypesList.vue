<template>
  <div class="space-y-6">
    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <a-card v-for="(stat, index) in stats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.title }}</p>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl font-bold text-gray-800">{{ stat.value }}</span>
              <span v-if="stat.percentage" class="text-xs font-semibold" :class="stat.trendClass">
                ({{ stat.percentage }})
              </span>
            </div>
          </div>
          <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
             <NavIcon :name="stat.icon" class-name="w-6 h-6 text-white" />
          </div>
        </div>
      </a-card>
    </div>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0 uppercase tracking-tight">Danh sách loại điểm</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="handleDeletedList" />
          <ButtonAdd label="Thêm Mới" @click="handleAdd" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-nowrap items-center gap-3 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="w-[300px]">
          <InputSearch v-model="searchText" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[220px]">
          <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái">
            <a-select-option value="">Tất cả</a-select-option>
            <a-select-option value="active">Đang áp dụng</a-select-option>
            <a-select-option value="inactive">Ngừng áp dụng</a-select-option>
          </SelectFilter>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleReset" />
        </div>
      </div>

      <!-- Data Table -->
      <div class="px-0">
        <AppTable 
          :columns="columns" 
          :data-source="filteredData" 
          :pagination="false"
          :row-selection="rowSelection"
          class="pvf-standard-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
            </template>
            
            <template v-if="column.key === 'name'">
              <span class="font-bold text-[#566a7f]">{{ record.name }}</span>
            </template>

            <template v-if="column.key === 'status'">
              <BaseTag :type="record.status === 'active' ? 'success' : 'default'">
                {{ record.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng' }}
              </BaseTag>
            </template>

            <template v-if="column.key === 'action'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
        </AppTable>
      </div>

      <!-- Pagination -->
      <div class="flex justify-end p-6 bg-white border-t border-gray-100">
        <BasePagination 
          v-model:current="currentPage"
          :total="filteredData.length" 
          :page-size="pageSize"
          @change="() => {}" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import type { ScoreTypeRecord } from '../pages/ScoreTypesPage.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableActions from '@/components/molecules/TableActions.vue'

// Stats Data
const stats = [
  { 
    title: 'Tổng số loại điểm', 
    value: '5', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-[#e7e7ff]', 
    iconColor: 'text-[#696cff]' 
  },
  { 
    title: 'Đang áp dụng', 
    value: '5', 
    percentage: '100%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheck', 
    iconBg: 'bg-[#e8fadf]', 
    iconColor: 'text-[#71dd37]' 
  },
  { 
    title: 'Ngừng áp dụng', 
    value: '0', 
    percentage: '0%', 
    trendClass: 'text-gray-500', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-[#ffe5e5]', 
    iconColor: 'text-[#ff3e1d]' 
  },
  { 
    title: 'Tổng trọng số', 
    value: '100%', 
    icon: 'BxBarChartAlt2', 
    iconBg: 'bg-[#fff2d6]', 
    iconColor: 'text-[#ffab00]' 
  }
]

// Emits
const emit = defineEmits<{
  add: []
  view: [record: ScoreTypeRecord]
  edit: [record: ScoreTypeRecord]
  deleted: []
}>()

// State
const searchText = ref<string>('')
const statusFilter = ref<string>('')
const currentPage = ref(1)
const pageSize = ref(10)

const dataSource = ref<ScoreTypeRecord[]>(
  Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Điểm thành phần ${index + 1}`,
    weight: Math.floor(Math.random() * 30) + 10,
    status: 'active',
  }))
)

// Computed
const filteredData = computed(() =>
  dataSource.value.filter((item) => {
    const matchName = item.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = !statusFilter.value || item.status === statusFilter.value
    return matchName && matchStatus
  })
)

// Table config
const columns = [
  { title: 'STT', key: 'stt', width: 70, align: 'center' },
  { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'name', key: 'name' },
  { title: 'TRỌNG SỐ (%)', dataIndex: 'weight', key: 'weight', width: 150 },
  { title: 'TRẠNG THÁI', key: 'status', width: 160, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 120, align: 'center' },
]

const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[]) => {
    console.log('selectedRowKeys:', selectedRowKeys)
  },
}

const getActions = (record: ScoreTypeRecord) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => handleView(record) },
  { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => handleEdit(record) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => handleDelete(record) },
]

// Handlers
function handleSearch() {
  message.success('Đã tìm kiếm')
}

function handleReset() {
  searchText.value = ''
  statusFilter.value = ''
}

function handleAdd() {
  emit('add')
}

function handleView(record: ScoreTypeRecord) {
  emit('view', record)
}

function handleEdit(record: ScoreTypeRecord) {
  emit('edit', record)
}

function handleDeletedList() {
  emit('deleted')
}

function handleDelete(record: ScoreTypeRecord) {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: `Bạn có chắc chắn muốn xóa loại điểm "${record.name}"?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
      message.success(`Đã xóa thành công loại điểm: ${record.name}`)
    }
  })
}
</script>

<style scoped>
:deep(.pvf-standard-table .ant-table-thead > tr > th) {
  background-color: white !important;
  color: #566a7f !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 13px !important;
  padding: 16px 24px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-tbody > tr > td) {
  padding: 16px 24px !important;
  color: #566a7f !important;
  font-size: 13px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-row:hover > td) {
  background-color: #f8faff !important;
}

:deep(.ant-table-thead > tr > th:not(:last-child)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #d9dee3;
}
</style>
