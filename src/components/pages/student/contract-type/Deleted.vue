<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Loại hợp đồng</a-breadcrumb-item>
      <a-breadcrumb-item>Đã xóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Back Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Loại hợp đồng đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonAdd @click="$router.push('/student/contract-type/create')" />
          <ButtonBack @click="$router.push('/student/contract-type')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
        <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" class="!w-[250px]" />

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
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import IconButton from '../../../atoms/buttons/IconButton.vue'

const router = useRouter()

const handleView = (id: string) => {
  router.push(`/student/contract-type/detail/${id}`)
}

const handleRestore = (id: string) => {
  console.log('Restore', id)
}

const handleHardDelete = (id: string) => {
  console.log('Hard delete', id)
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
