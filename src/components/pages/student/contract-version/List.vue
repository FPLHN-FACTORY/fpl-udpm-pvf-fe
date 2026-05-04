<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Phiên bản hợp đồng</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <p class="text-xs text-gray-400 mt-1">Phiên bản hợp đồng</p>
          </div>
          <div :class="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
             <NavIcon :name="stat.icon" class-name="w-6 h-6 text-white" />
          </div>
        </div>
      </a-card>
    </div>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Add Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Phiên bản hợp đồng</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="$router.push('/student/contract-version/deleted')" />
          <ButtonAdd @click="$router.push('/student/contract-version/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
        <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" class="!w-[250px]" />
        
        <div class="relative w-[200px]">
          <a-date-picker 
            v-model:value="filters.date" 
            placeholder="Chọn thời gian" 
            class="!w-full !h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
          />
        </div>

        <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái" class="!w-[200px]">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
        </SelectFilter>
        
        <div class="flex items-center ml-auto">
          <ButtonSearch @click="handleSearch" class="!bg-indigo-500 hover:!bg-indigo-600" />
          <IconButton icon="BxReset" label="Làm mới" @click="handleReset" class="ml-2 bg-gray-500 text-white hover:bg-gray-600 border-none" />
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
            <span class="font-medium">{{ index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'name'">
            <span class="font-semibold text-[#696cff]">{{ record.name }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="record.status === 'Active' ? 'success' : 'default'">
              {{ record.status === 'Active' ? 'Đang hoạt động' : 'Ngừng sử dụng' }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3 justify-center">
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
              <button class="text-gray-400 hover:text-red-500 transition-colors">
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>

      <!-- Custom Pagination -->
      <div class="flex items-center justify-between mt-4 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
          <a-pagination
            v-model:current="pagination.current"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :show-size-changer="false"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import IconButton from '../../../atoms/buttons/IconButton.vue'

const router = useRouter()

const handleView = (id: string) => {
  router.push(`/student/contract-version/detail/${id}`)
}

const handleEdit = (id: string) => {
  router.push(`/student/contract-version/edit/${id}`)
}

// Stats Data
const stats = [
  { 
    title: 'Tổng Số phiên bản hợp đồng', 
    value: '21', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-indigo-100 text-indigo-500' 
  },
  { 
    title: 'Số phiên bản đang hoạt động', 
    value: '20', 
    percentage: '95%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheckShield', 
    iconBg: 'bg-red-100 text-red-500' 
  },
  { 
    title: 'Số phiên bản ngừng sử dụng', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-yellow-100 text-yellow-500' 
  }
]

// Filter State
const filters = reactive({
  keyword: '',
  date: null,
  status: undefined
})

const handleSearch = () => {
  console.log('Search', filters)
}

const handleReset = () => {
  filters.keyword = ''
  filters.date = null
  filters.status = undefined
}

// Table Selection
const selectedRowKeys = ref<string[]>([])
const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

// Table Columns
const columns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'TÊN PHIÊN BẢN HỢP ĐỒNG', dataIndex: 'name', key: 'name' },
  { title: 'LOẠI HỢP ĐỒNG', dataIndex: 'type', key: 'type' },
  { title: 'NGÀY ÁP DỤNG', dataIndex: 'startDate', key: 'startDate' },
  { title: 'NGÀY KẾT THÚC', dataIndex: 'endDate', key: 'endDate' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 140 }
]

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Phiên bản chuẩn PVF v1.0',
    type: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'Active'
  },
  {
    key: '2',
    name: 'Phiên bản chuẩn PVF v1.0',
    type: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'Active'
  },
  {
    key: '3',
    name: 'Phiên bản chuẩn PVF v1.0',
    type: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'Active'
  }
])

// Pagination config
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 6,
  showSizeChanger: false
})
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
  font-size: 13px;
  border-bottom: 1px solid #f0f2f5;
  padding: 16px;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #22303E;
  opacity: 0.9;
  border-bottom: 1px solid #f0f2f5;
  font-size: 14px;
}

:deep(.ant-table-row:hover > td) {
  background-color: #f8faff !important;
}
</style>
