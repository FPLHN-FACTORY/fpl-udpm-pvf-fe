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
          <ButtonDeleteList @click="$router.push('/recruitment/affiliated-center/deleted-list')" />
          <ButtonAdd @click="$router.push('/recruitment/affiliated-center/add')" />
        </div>
      </div>

      <AffiliatedCenterFilter 
        v-model:filters="filters"
        :initial-filters="filters"
        @search="() => {}"
        @reset="() => {}"
      />

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

          <template v-if="column.key === 'status'">
            <BaseTag :type="record.status === 'Active' ? 'success' : 'warning'">
              {{ record.status === 'Active' ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
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
              <button class="text-gray-400 hover:text-red-500 transition-colors">
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
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import AffiliatedCenterFilter from '@/components/molecules/recruitment/AffiliatedCenterFilter.vue'

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
</style>
