<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Loại hợp đồng</a-breadcrumb-item>
      <a-breadcrumb-item>Đã xóa</a-breadcrumb-item>
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
      <!-- Card Header: Title and Back Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Loại hợp đồng đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonResetYellow 
            v-if="selectedRowKeys.length > 0"
            :text="`Khôi phục (${selectedRowKeys.length})`"
            @click="handleBulkRestore"
          />
          <ButtonBack @click="$router.push('/student/contract-type')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
          </div>

          <div class="w-[200px]">
            <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
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
            <span class="font-medium text-gray-800">{{ record.name }}</span>
          </template>
          
          <template v-if="column.key === 'description'">
            <span class="text-gray-600">{{ record.description }}</span>
          </template>

          <template v-if="column.key === 'deletedAt'">
            <span class="text-gray-500">{{ record.deletedAt }}</span>
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
                @click="handleRestore(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
                title="Khôi phục"
              >
                <NavIcon name="BxReset" size="18" />
              </button>
              <button 
                @click="handleHardDelete(record.key)"
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
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'

const router = useRouter()

// Stats Cards
const stats = ref([
  {
    title: 'Tổng đã xóa',
    value: '60',
    icon: 'BxTrash',
    iconBg: 'bg-red-500',
  },
  {
    title: 'Xóa trong 7 ngày',
    value: '12',
    percentage: '20%',
    trendClass: 'text-orange-500',
    icon: 'BxCalendar',
    iconBg: 'bg-orange-500',
  },
  {
    title: 'Xóa trong 30 ngày',
    value: '28',
    percentage: '47%',
    trendClass: 'text-yellow-500',
    icon: 'BxTime',
    iconBg: 'bg-yellow-500',
  },
  {
    title: 'Xóa trên 30 ngày',
    value: '20',
    percentage: '33%',
    trendClass: 'text-gray-500',
    icon: 'BxHistory',
    iconBg: 'bg-gray-500',
  },
])

const handleView = (id: string) => {
  router.push(`/student/contract-type/detail/${id}`)
}

const handleRestore = (id: string) => {
  console.log('Restore', id)
}

const handleHardDelete = (id: string) => {
  console.log('Hard delete', id)
}

const handleBulkRestore = () => {
  console.log('Bulk restore', selectedRowKeys.value)
  // TODO: Implement bulk restore logic
}

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
  { title: '#', key: 'index', width: 60, align: 'center' },
  { title: 'TÊN LOẠI HỢP ĐỒNG', dataIndex: 'name', key: 'name' },
  { title: 'MÔ TẢ LOẠI HỢP ĐỒNG', dataIndex: 'description', key: 'description' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 140 }
]

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Hợp đồng đào tạo cầu thủ trẻ',
    description: 'Hợp đồng ký với học viên bóng đá PVF trong thời gian đào tạo, bao gồm quyền lợi đào tạo, ...',
    deletedAt: '25-02-01 8:30'
  },
  {
    key: '2',
    name: 'Hợp đồng đào tạo cầu thủ trẻ',
    description: 'Hợp đồng ký với học viên bóng đá PVF trong thời gian đào tạo, bao gồm quyền lợi đào tạo, ...',
    deletedAt: '25-02-01 8:30'
  }
])

// Pagination config
const pagination = reactive({
  current: 3,
  pageSize: 10,
  total: 60,
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
