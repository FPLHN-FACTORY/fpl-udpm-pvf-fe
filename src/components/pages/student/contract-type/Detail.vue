<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Loại hợp đồng</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Basic Info Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-6">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Chi tiết Loại hợp đồng</h2>
        <div class="flex gap-2">
          <ButtonBack @click="$router.push('/student/contract-type')" />
          <ButtonEdit @click="$router.push(`/student/contract-type/edit/${$route.params.id}`)" />
        </div>
      </div>

      <DetailList :items="detailItems">
        <template #value-status="{ item }">
          <BaseTag :type="item.value === 'active' ? 'success' : 'default'">
            {{ item.value === 'active' ? 'Đang hoạt động' : 'Ngừng sử dụng' }}
          </BaseTag>
        </template>
      </DetailList>
    </a-card>

    <!-- Version Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <a-card v-for="(stat, index) in versionStats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
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

    <!-- Contract Version Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <!-- Card Header: Title and Add Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Phiên bản hợp đồng</h2>
        <div class="flex items-center gap-3">
          <ButtonAdd @click="$router.push('/student/contract-version/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
        <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" class="!w-[250px]" />
        
        <div class="relative flex-1 max-w-[200px]">
          <a-date-picker 
            v-model:value="filters.date" 
            placeholder="Chọn thời gian" 
            class="w-full h-10 rounded-lg border-gray-300"
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

      <!-- Version Table -->
      <a-table 
        :columns="versionColumns" 
        :data-source="versionDataSource" 
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'versionName'">
            <span class="font-medium text-gray-800">{{ record.versionName }}</span>
          </template>
          
          <template v-if="column.key === 'contractType'">
            <span class="text-gray-600">{{ record.contractType }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="record.status === 'active' ? 'success' : 'default'">
              {{ record.status === 'active' ? 'Đang hoạt động' : 'Ngừng sử dụng' }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3 justify-center">
              <button 
                @click="handleViewVersion(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
                title="Xem chi tiết"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleEditVersion(record.key)"
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

      <!-- Footer -->
      <div class="flex items-center justify-between mt-12 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import ButtonEdit from '../../../atoms/buttons/ButtonEdit.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import IconButton from '../../../atoms/buttons/IconButton.vue'
import DetailList from '../../../molecules/DetailList.vue'

const router = useRouter()

// Contract Category Detail Items
const detailItems = [
  { label: 'Tên loại hợp đồng', value: 'Cơ sở đào tạo FPT Hà Nội' },
  { label: 'Mô tả loại hợp đồng', value: 'Hợp đồng ký với học viên bóng đá PVF trong thời gian đào tạo, bao gồm quyền lợi đào tạo, sinh hoạt và nghĩa vụ tuân thủ quy chế trung tâm' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45' },
  { key: 'status', label: 'Trạng thái', value: 'active' }
]

// Version Stats Data
const versionStats = [
  { 
    title: 'Tổng số loại hợp đồng đã tạo', 
    value: '21', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-indigo-100 text-indigo-500' 
  },
  { 
    title: 'Số loại hợp đồng đang hoạt động', 
    value: '20', 
    percentage: '95%', 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-red-100 text-red-500' 
  },
  { 
    title: 'Số loại hợp đồng ngừng sử dụng', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-yellow-100 text-yellow-500' 
  }
]

// Filter State for Versions
const filters = reactive({
  keyword: '',
  date: null,
  status: undefined
})

const handleSearch = () => {
  console.log('Search versions', filters)
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

// Version Table Columns
const versionColumns = [
  { title: '#', key: 'index', width: 60, align: 'center' },
  { title: 'TÊN PHIÊN BẢN HỢP ĐỒNG', dataIndex: 'versionName', key: 'versionName' },
  { title: 'LOẠI HỢP ĐỒNG', dataIndex: 'contractType', key: 'contractType' },
  { title: 'NGÀY ÁP DỤNG', dataIndex: 'startDate', key: 'startDate', align: 'center' },
  { title: 'NGÀY KẾT THÚC', dataIndex: 'endDate', key: 'endDate', align: 'center' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 140 }
]

// Version Mock Data
const versionDataSource = ref([
  {
    key: '1',
    versionName: 'Phiên bản chuẩn PVF v1.0',
    contractType: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'active'
  },
  {
    key: '2',
    versionName: 'Phiên bản chuẩn PVF v1.0',
    contractType: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'active'
  },
  {
    key: '3',
    versionName: 'Phiên bản chuẩn PVF v1.0',
    contractType: 'Đào tạo cầu thủ trẻ',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    status: 'active'
  }
])

const handleViewVersion = (id: string) => {
  router.push(`/student/contract-version/detail/${id}`)
}

const handleEditVersion = (id: string) => {
  router.push(`/student/contract-version/edit/${id}`)
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
