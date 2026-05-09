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
        <h2 class="text-[20px] font-bold text-gray-700 m-0 uppercase tracking-tight">Danh sách loại điểm đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonResetYellow 
            v-if="selectedRowKeys.length > 0"
            :text="`Khôi phục (${selectedRowKeys.length})`"
            @click="handleBulkRestore"
          />
          <ButtonBack @click="handleBack" />
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
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableActions from '@/components/molecules/TableActions.vue'

// Stats Data
const stats = [
  { 
    title: 'Tổng đã xóa', 
    value: '12', 
    icon: 'BxTrash', 
    iconBg: 'bg-[#ffe5e5]',
    iconColor: 'text-[#ff3e1d]'
  },
  { 
    title: 'Xóa trong 7 ngày', 
    value: '3', 
    percentage: '25%', 
    trendClass: 'text-orange-500', 
    icon: 'BxTime', 
    iconBg: 'bg-[#fff2d6]',
    iconColor: 'text-[#ffab00]'
  },
  { 
    title: 'Xóa trong 30 ngày', 
    value: '7', 
    percentage: '58%', 
    trendClass: 'text-yellow-500', 
    icon: 'BxCalendar', 
    iconBg: 'bg-[#fff2d6]',
    iconColor: 'text-[#ffab00]'
  },
  { 
    title: 'Xóa trên 30 ngày', 
    value: '2', 
    percentage: '17%', 
    trendClass: 'text-gray-500', 
    icon: 'BxHistory', 
    iconBg: 'bg-[#e7e7ff]',
    iconColor: 'text-[#696cff]'
  }
]

// Emits
const emit = defineEmits<{
  back: []
  restored: [record: ScoreTypeRecord]
}>()

// State
const searchText = ref<string>('')
const statusFilter = ref<string>('')
const selectedRowKeys = ref<number[]>([])
const currentPage = ref(1)
const pageSize = ref(10)

const dataSource = ref<ScoreTypeRecord[]>(
  Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Điểm thành phần ${index + 1}`,
    weight: Math.floor(Math.random() * 30) + 10,
    status: 'active',
    ngayXoa: '2025-03-02 7:20'
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
  { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 180 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 120, align: 'center' },
]

const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (keys: (string | number)[]) => {
    selectedRowKeys.value = keys as number[]
  },
}

const getActions = (record: ScoreTypeRecord) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => message.info(`Xem: ${record.name}`) },
  { label: 'Khôi phục', icon: 'BxReset', onClick: () => handleRestore(record) },
  { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => handleDeletePermanent(record) },
]

// Handlers
function handleSearch() {
  message.success('Đã tìm kiếm')
}

function handleReset() {
  searchText.value = ''
  statusFilter.value = ''
}

function handleBack() {
  emit('back')
}

function handleRestore(record: ScoreTypeRecord) {
  Modal.confirm({
    title: 'Xác nhận khôi phục',
    content: `Bạn có chắc muốn khôi phục "${record.name}" về danh sách?`,
    okText: 'Khôi phục',
    onOk() {
      dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
      message.success(`Đã khôi phục: ${record.name}`)
      emit('restored', record)
    }
  })
}

function handleDeletePermanent(record: ScoreTypeRecord) {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn',
    content: `Hành động này không thể hoàn tác. Bạn có chắc muốn xóa vĩnh viễn "${record.name}"?`,
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
      message.warning(`Đã xóa vĩnh viễn: ${record.name}`)
    }
  })
}

function handleBulkRestore() {
  Modal.confirm({
    title: 'Xác nhận khôi phục hàng loạt',
    content: `Bạn có chắc muốn khôi phục ${selectedRowKeys.value.length} loại điểm đã chọn?`,
    okText: 'Khôi phục',
    onOk() {
      const count = selectedRowKeys.value.length
      const restoredItems = dataSource.value.filter((item) => selectedRowKeys.value.includes(item.id as number))
      dataSource.value = dataSource.value.filter((item) => !selectedRowKeys.value.includes(item.id as number))
      selectedRowKeys.value = []
      message.success(`Đã khôi phục ${count} loại điểm`)
      restoredItems.forEach(item => emit('restored', item))
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
