<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khóa</a-breadcrumb-item>
      <a-breadcrumb-item>Quản lý loại điểm</a-breadcrumb-item>
    </a-breadcrumb>

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
      <!-- Card Header: Title and Add Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Loại điểm</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="handleDeletedList" />
          <ButtonAdd @click="handleAdd" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
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
        :data-source="dataSource" 
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'name'">
            <span class="font-semibold text-[#22303E]">{{ record.name }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="record.status === 'Đang hoạt động' ? 'success' : 'warning'">
              {{ record.status }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button 
                @click="handleView(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleEdit(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button 
                @click="handleDelete(record.key)"
                class="text-gray-400 hover:text-red-500 transition-colors"
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
          :total="pagination.total" 
          :current="pagination.current" 
          :page-size="pagination.pageSize" 
          @change="(p) => pagination.current = p" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'


// Stats Data
const stats = [
  { 
    title: 'Tổng số loại điểm', 
    value: '12', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Đang hoạt động', 
    value: '10', 
    percentage: '83%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheck', 
    iconBg: 'bg-green-400' 
  },
  { 
    title: 'Ngừng hoạt động', 
    value: '2', 
    percentage: '17%', 
    trendClass: 'text-red-500', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Tổng trọng số', 
    value: '100', 
    icon: 'BxBarChartAlt2', 
    iconBg: 'bg-purple-400' 
  }
]

// Filter State
const filters = reactive({
  keyword: '',
  status: undefined
})

// Table Selection
const selectedRowKeys = ref<string[]>([])
const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

// Table Columns
const columns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'name', key: 'name' },
  { title: 'TRỌNG SỐ', dataIndex: 'weight', key: 'weight', width: 120 },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Điểm kỹ thuật',
    weight: 30,
    status: 'Đang hoạt động'
  },
  {
    key: '2',
    name: 'Điểm thể lực',
    weight: 25,
    status: 'Đang hoạt động'
  },
  {
    key: '3',
    name: 'Điểm chiến thuật',
    weight: 20,
    status: 'Đang hoạt động'
  },
  {
    key: '4',
    name: 'Điểm tinh thần',
    weight: 15,
    status: 'Đang hoạt động'
  },
  {
    key: '5',
    name: 'Điểm kỷ luật',
    weight: 10,
    status: 'Ngừng hoạt động'
  }
])

// Pagination config
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 5
})

// Methods
const handleView = (id: string) => {
  console.log('View:', id)
}

const handleEdit = (id: string) => {
  console.log('Edit:', id)
}

const handleDelete = (id: string) => {
  console.log('Delete:', id)
}

const handleAdd = () => {
  console.log('Add new')
}

const handleDeletedList = () => {
  console.log('View deleted list')
}

const handleSearch = () => {
  console.log('Search:', filters)
}

const handleReset = () => {
  filters.keyword = ''
  filters.status = undefined
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
