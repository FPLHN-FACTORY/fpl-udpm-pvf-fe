<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Dụng cụ</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <a-card v-for="(stat, index) in stats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.title }}</p>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl font-bold text-gray-800">{{ stat.value }}</span>
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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Dụng cụ đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonResetYellow v-if="selectedRowKeys.length > 0" text="Khôi phục" @click="handleBulkRestore" />
          <ButtonBack @click="$router.back()" />
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
              <a-select-option value="active">Đang sử dụng</a-select-option>
              <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
            </SelectFilter>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleResetFilter" />
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
            <span class="font-semibold">{{ record.name }}</span>
          </template>

          <template v-if="column.key === 'description'">
            <span>{{ record.description }}</span>
          </template>

          <template v-if="column.key === 'deletedAt'">
            <span>{{ record.deletedAt }}</span>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
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
                @click="handleDelete(record.key)"
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
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

const handleView = (id: string) => {
  router.push(`/student/equipment/chi-tiet/${id}`)
}

const handleRestore = (id: string) => {
  message.success('Khôi phục thành công')
  console.log('Restore', id)
}

const handleDelete = (id: string) => {
  message.success('Xóa vĩnh viễn thành công')
  console.log('Delete permanently', id)
}

const handleBulkRestore = () => {
  message.success(`Khôi phục ${selectedRowKeys.value.length} mục thành công`)
  selectedRowKeys.value = []
}

const handleSearch = () => {
  console.log('Search:', filters)
}

const handleResetFilter = () => {
  filters.keyword = ''
  filters.status = undefined
}

// Stats Data
const stats = [
  { 
    title: 'Tổng số dụng cụ đã xóa', 
    value: '5', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Đang sử dụng', 
    value: '3', 
    icon: 'BxCheck', 
    iconBg: 'bg-green-500' 
  },
  { 
    title: 'Ngừng sử dụng', 
    value: '2', 
    icon: 'BxX', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Xóa trong tháng', 
    value: '2', 
    icon: 'BxCalendar', 
    iconBg: 'bg-orange-400' 
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
  { title: 'TÊN DỤNG CỤ', dataIndex: 'name', key: 'name' },
  { title: 'TÊN DỤNG CỤ', dataIndex: 'description', key: 'description' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Áo tập luyện',
    description: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày',
    deletedAt: '2025-02-01 8:30'
  },
  {
    key: '2',
    name: 'Áo tập luyện',
    description: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày',
    deletedAt: '2025-02-01 8:30'
  },
  {
    key: '3',
    name: 'Áo tập luyện',
    description: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày',
    deletedAt: '2025-02-01 8:30'
  }
])

// Pagination config
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 3,
  showSizeChanger: true,
  showQuickJumper: true
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
