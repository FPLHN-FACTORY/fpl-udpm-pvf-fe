<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Back Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Trung tâm liên kết đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonBack @click="$router.back()" />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 -mx-6 mb-4"></div>

      <AffiliatedCenterFilter 
        v-model:filters="filters"
        :initial-filters="filters"
        @search="() => {}"
        @reset="() => {}"
      />

      <!-- Divider before table -->
      <div class="border-t border-gray-100 -mx-6"></div>

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

          <template v-if="column.key === 'deletedAt'">
            <span>{{ record.deletedAt }}</span>
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
                @click="handleRestore(record.key)"
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
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import AffiliatedCenterFilter from '@/components/molecules/recruitment/AffiliatedCenterFilter.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'

const router = useRouter()

const handleView = (id: string) => {
  router.push(`/recruitment/affiliated-center/detail/${id}`)
}

const handleRestore = (id: string) => {
  // Logic to restore
  console.log('Restore', id)
}

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
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

// Mock Data
const dataSource = ref([
  {
    key: '2',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '391A Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
    contact: '024-7300-1955',
    deletedAt: '25-02-02 8:30'
  },
  {
    key: '3',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng',
    contact: '024-7300-1955',
    deletedAt: '25-02-02 8:30'
  },
  {
    key: '4',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
    contact: '024-7300-1955',
    deletedAt: '25-02-02 8:30'
  },
  {
    key: '5',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '391A Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
    contact: '024-7300-1955',
    deletedAt: '25-02-02 8:30'
  },
  {
    key: '6',
    name: 'Trung tâm liên kết CNTT Hà Nội',
    address: '137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng',
    contact: '024-7300-1955',
    deletedAt: '25-02-02 8:30'
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
