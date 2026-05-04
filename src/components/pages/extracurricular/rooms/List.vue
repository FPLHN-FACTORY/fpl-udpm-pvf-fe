<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khoá</a-breadcrumb-item>
      <a-breadcrumb-item>Phòng học ngoại khoá</a-breadcrumb-item>
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
            <p class="text-xs text-gray-400 mt-1">Phòng học ngoại khoá</p>
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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Phòng học ngoại khoá</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="$router.push('/extracurricular/rooms/deleted')" />
          <ButtonAdd @click="$router.push('/extracurricular/rooms/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
        <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" class="!w-[250px]" />

        <SelectFilter v-model:value="filters.status" placeholder="Trạng thái" class="!w-[200px]">
          <a-select-option value="active">Đang sử dụng</a-select-option>
          <a-select-option value="maintenance">Đang bảo trì</a-select-option>
          <a-select-option value="inactive">Tạm ngưng</a-select-option>
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
            <span class="font-semibold text-gray-800">{{ record.name }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="getStatusType(record.status)">
              {{ getStatusLabel(record.status) }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3 justify-center">
              <button 
                @click="handleView(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
                title="Xem chi tiết"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleEdit(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
                title="Chỉnh sửa"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button class="text-gray-400 hover:text-red-500 transition-colors" title="Xóa">
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
  router.push(`/extracurricular/rooms/detail/${id}`)
}

const handleEdit = (id: string) => {
  router.push(`/extracurricular/rooms/edit/${id}`)
}

// Stats Data
const stats = [
  { 
    title: 'Tổng số', 
    value: '21', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-indigo-100 text-indigo-500' 
  },
  { 
    title: 'Tổng số đang sử dụng', 
    value: '20', 
    percentage: '95%', 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-red-100 text-red-500' 
  },
  { 
    title: 'Tổng số tạm ngưng', 
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
  status: undefined
})

const handleSearch = () => {
  console.log('Search', filters)
}

const handleReset = () => {
  filters.keyword = ''
  filters.status = undefined
}

// Table Selection
const selectedRowKeys = ref<string[]>([])
const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

// Table Columns
const columns = [
  { title: 'STT', key: 'index', width: 60, align: 'center' },
  { title: 'TÊN ĐỊA ĐIỂM', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ', dataIndex: 'address', key: 'address' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 140 }
]

const getStatusType = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'maintenance': return 'default'
    case 'inactive': return 'warning'
    default: return 'default'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Đang sử dụng'
    case 'maintenance': return 'Đang bảo trì'
    case 'inactive': return 'Tạm ngưng'
    default: return ''
  }
}

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Phòng học chiến thuật PVF',
    address: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên',
    status: 'active'
  },
  {
    key: '2',
    name: 'Sân tập số 1',
    address: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên',
    status: 'active'
  },
  {
    key: '3',
    name: 'Sân tập số 2',
    address: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên',
    status: 'maintenance'
  },
  {
    key: '4',
    name: 'Hội trường PVF',
    address: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên',
    status: 'inactive'
  }
])

// Pagination config
const pagination = reactive({
  current: 3,
  pageSize: 10,
  total: 50,
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
