<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Trung tâm liên kết</h2>
        <div class="flex items-center gap-3">
          <a-button 
            @click="$router.push('/recruitment/affiliated-center/deleted-list')"
            class="flex items-center gap-2 border-none text-white rounded-md h-10 px-4 bg-[#94a3b8] hover:bg-[#64748b] shadow-sm transition-colors"
          >
            <template #icon><NavIcon name="BxTrash" size="18" class-name="text-white" /></template>
            <span class="font-bold text-sm">Danh Sách Đã Xóa</span>
          </a-button>
          <a-button 
            @click="$router.push('/recruitment/affiliated-center/add')"
            type="primary" 
            danger 
            class="rounded-md h-10 px-6 flex items-center space-x-2 bg-[#ED1C24] border-[#ED1C24] shadow-sm"
          >
            <template #icon><NavIcon name="BxPlus" size="18" /></template>
            <span class="font-bold text-sm">Thêm Mới</span>
          </a-button>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 -mx-6 mb-4"></div>

      <!-- Filters Section -->
      <div class="flex items-center justify-between mb-4">
        <!-- Left: Filters -->
        <div class="flex items-center gap-4">
          <a-input 
            v-model:value="filters.keyword" 
            placeholder="Tìm kiếm" 
            class="w-[240px] h-9 rounded-md border-gray-200"
          />
          <a-date-picker 
            v-model:value="filters.date" 
            class="w-[240px] h-9 rounded-md border-gray-200" 
            placeholder="Chọn thời gian" 
          />
          <a-select 
            v-model:value="filters.status" 
            placeholder="Chọn trạng thái" 
            class="w-[220px] h-9 rounded-md border-gray-200"
          >
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </a-select>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center gap-3">
          <a-button 
            type="primary" 
            class="h-9 px-4 rounded-md flex items-center space-x-2 bg-[#6366F1] border-[#6366F1] hover:bg-[#4F46E5] shadow-sm"
          >
            <template #icon><NavIcon name="BxSearch" size="16" /></template>
            <span class="text-sm font-medium">Tìm Kiếm</span>
          </a-button>
          
          <a-button 
            class="h-9 w-9 flex items-center justify-center rounded-md bg-[#94a3b8] border-none hover:bg-[#64748b] transition-colors shadow-sm"
          >
            <template #icon>
              <NavIcon name="BxReset" size="18" class-name="text-white" />
            </template>
          </a-button>
        </div>
      </div>

      <!-- Divider before table -->
      <div class="border-t border-gray-100 -mx-6"></div>

      <!-- Data Table -->
      <a-table 
        :columns="columns" 
        :data-source="dataSource" 
        :pagination="pagination"
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

          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'Active' ? 'green' : 'orange'" class="rounded-md px-3 py-1 border-none font-medium">
              {{ record.status === 'Active' ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
            </a-tag>
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
              <button class="text-gray-400 hover:text-red-500 transition-colors">
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../atoms/NavIcon.vue'

const router = useRouter()

const handleView = (id: string) => {
  router.push(`/recruitment/affiliated-center/detail/${id}`)
}

const handleEdit = (id: string) => {
  router.push(`/recruitment/affiliated-center/edit/${id}`)
}

// Stats Data
const stats = [
  { 
    title: 'Tổng số trung tâm', 
    value: '21', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Hồ sơ chờ duyệt', 
    value: '20', 
    percentage: '95%', 
    trendClass: 'text-green-500', 
    icon: 'BxCalendar', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Hồ sơ đã duyệt', 
    value: '20', 
    percentage: '95%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheck', 
    iconBg: 'bg-red-200' 
  },
  { 
    title: 'Hồ sơ bị từ chối', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-orange-300' 
  },
  { 
    title: 'Hồ sơ YC bổ sung', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxEdit', 
    iconBg: 'bg-yellow-400' 
  }
]

// Filter State
const filters = reactive({
  keyword: '',
  date: null,
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
  { title: 'TÊN TRUNG TÂM LIÊN KẾT', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ CƠ SỞ', dataIndex: 'address', key: 'address' },
  { title: 'THÔNG TIN LIÊN HỆ', dataIndex: 'contact', key: 'contact' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

// Mock Data
const dataSource = ref([
  {
    key: '1',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '391A Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
    contact: '024-7300-1955',
    status: 'Active'
  },
  {
    key: '2',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng',
    contact: '024-7300-1955',
    status: 'Active'
  },
  {
    key: '3',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
    contact: '024-7300-1955',
    status: 'Active'
  },
  {
    key: '4',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '391A Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
    contact: '024-7300-1955',
    status: 'Active'
  },
  {
    key: '5',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng',
    contact: '024-7300-1955',
    status: 'Active'
  },
  {
    key: '6',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
    contact: '024-7300-1955',
    status: 'Inactive'
  },
  {
    key: '7',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '391A Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
    contact: '024-7300-1955',
    status: 'Inactive'
  },
  {
    key: '8',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng',
    contact: '024-7300-1955',
    status: 'Inactive'
  }
])

// Pagination config
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 8,
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

:deep(.ant-tag-green) {
  background-color: #71DD3729;
  color: #71DD37;
}

:deep(.ant-tag-orange) {
  background-color: #FFAB0029;
  color: #FFAB00;
}

:deep(.ant-pagination-item-active) {
  background-color: #ED1C24;
  border-color: #ED1C24;
}

:deep(.ant-pagination-item-active a) {
  color: white;
}
</style>
