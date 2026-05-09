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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách loại điểm đã xóa</h2>
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
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="searchText" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái">
              <a-select-option value="">Tất cả</a-select-option>
              <a-select-option value="active">Đang áp dụng</a-select-option>
              <a-select-option value="inactive">Ngừng áp dụng</a-select-option>
            </SelectFilter>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleReset" />
        </div>
      </div>

      <!-- Data Table -->
      <a-table 
        :columns="columns" 
        :data-source="filteredData" 
        :pagination="false"
        :row-selection="rowSelection"
        row-key="id"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'stt'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'name'">
            <span class="font-semibold text-[#22303E]">{{ record.name }}</span>
          </template>

          <template v-if="column.key === 'action'">
            <div class="flex items-center space-x-3">
              <button 
                @click="handleView(record)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
                title="Xem chi tiết"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleRestore(record)"
                class="text-gray-400 hover:text-green-500 transition-colors"
                title="Khôi phục"
              >
                <NavIcon name="BxReset" size="18" />
              </button>
              <button 
                @click="handleDeletePermanent(record)"
                class="text-gray-400 hover:text-red-500 transition-colors"
                title="Xóa vĩnh viễn"
              >
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>

      <!-- Custom Pagination -->
      <div class="flex justify-end mt-4">
        <BasePagination 
          :total="filteredData.length" 
          :current="1" 
          :page-size="10" 
          @change="() => {}" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import type { TableProps } from 'ant-design-vue'
import type { ScoreTypeRecord } from '../pages/ScoreTypesPage.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

// Stats Data
const stats = [
  { 
    title: 'Tổng đã xóa', 
    value: '12', 
    icon: 'BxTrash', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Xóa trong 7 ngày', 
    value: '3', 
    percentage: '25%', 
    trendClass: 'text-orange-500', 
    icon: 'BxTime', 
    iconBg: 'bg-orange-400' 
  },
  { 
    title: 'Xóa trong 30 ngày', 
    value: '7', 
    percentage: '58%', 
    trendClass: 'text-yellow-500', 
    icon: 'BxCalendar', 
    iconBg: 'bg-yellow-400' 
  },
  { 
    title: 'Xóa trên 30 ngày', 
    value: '2', 
    percentage: '17%', 
    trendClass: 'text-gray-500', 
    icon: 'BxHistory', 
    iconBg: 'bg-gray-400' 
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
  { title: 'HÀNH ĐỘNG', key: 'action', width: 140, align: 'center' },
]

const rowSelection: TableProps['rowSelection'] = {
  type: 'checkbox',
  selectedRowKeys: selectedRowKeys as any,
  onChange: (keys: (string | number)[]) => {
    selectedRowKeys.value = keys as number[]
  },
}

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

function handleView(record: ScoreTypeRecord) {
  message.info(`Xem: ${record.name}`)
}

function handleRestore(record: ScoreTypeRecord) {
  dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
  message.success(`Đã khôi phục: ${record.name}`)
  emit('restored', record)
}

function handleDeletePermanent(record: ScoreTypeRecord) {
  dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
  message.warning(`Đã xóa vĩnh viễn: ${record.name}`)
}

function handleBulkRestore() {
  const count = selectedRowKeys.value.length
  const restoredItems = dataSource.value.filter((item) => selectedRowKeys.value.includes(item.id as number))
  dataSource.value = dataSource.value.filter((item) => !selectedRowKeys.value.includes(item.id as number))
  selectedRowKeys.value = []
  message.success(`Đã khôi phục ${count} loại điểm`)
  restoredItems.forEach(item => emit('restored', item))
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: transparent;
  color: #22303E;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #22303E;
  opacity: 0.9;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-row:hover > td) {
  background-color: #f8faff !important;
}
</style>
