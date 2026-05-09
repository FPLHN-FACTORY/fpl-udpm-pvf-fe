<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Hồ sơ thí sinh</a-breadcrumb-item>
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
      <!-- Card Header -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Hồ sơ thí sinh</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="handleClickDeleted" />
          <ButtonAdd @click="handleClickAdd" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="searchText" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="selectedKy" placeholder="Chọn kỳ tuyển sinh">
              <a-select-option value="">Tất cả</a-select-option>
              <a-select-option value="2025">Tuyển sinh PVF 2025</a-select-option>
              <a-select-option value="2024">Tuyển sinh PVF 2024</a-select-option>
            </SelectFilter>
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="selectedStatus" placeholder="Chọn trạng thái">
              <a-select-option value="">Tất cả</a-select-option>
              <a-select-option value="day-du">Đầy đủ</a-select-option>
              <a-select-option value="khong-hop-le">Không hợp lệ</a-select-option>
              <a-select-option value="cho-xu-ly">Chờ xử lý</a-select-option>
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
        :data-source="pagedData" 
        :pagination="false"
        :row-selection="rowSelection"
        row-key="id"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'stt'">
            <span class="font-medium text-[#696cff]">{{ (currentPage - 1) * pageSize + index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'idHoSo'">
            <span class="font-semibold text-[#22303E]">{{ record.idHoSo }}</span>
          </template>

          <template v-if="column.key === 'trangThaiHoSo'">
            <BaseTag :type="getStatusType(record.trangThaiHoSo)">
              {{ record.trangThaiHoSo }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'hanhDong'">
            <div class="flex items-center space-x-3">
              <button 
                @click="handleScore(record)"
                class="text-gray-400 hover:text-purple-500 transition-colors"
                title="Xem bảng điểm"
              >
                <NavIcon name="BxTable" size="18" />
              </button>
              <button 
                @click="handleView(record)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
                title="Xem chi tiết"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleEdit(record)"
                class="text-gray-400 hover:text-green-500 transition-colors"
                title="Chỉnh sửa"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button 
                @click="handleDelete(record)"
                class="text-gray-400 hover:text-red-500 transition-colors"
                title="Xóa"
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
          :total="totalItems" 
          :current="currentPage" 
          :page-size="pageSize" 
          @change="(page) => currentPage = page" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

// Types
interface CandidateRecord {
  id: number
  idHoSo: string
  thiSinh: string
  ngaySinh: string
  soDienThoai: string
  kyTuyenSinh: string
  trangThaiHoSo: string
}

// Stats Data
const stats = [
  { 
    title: 'Tổng số thí sinh', 
    value: '55', 
    icon: 'BxUser', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Đầy đủ', 
    value: '50', 
    percentage: '91%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheck', 
    iconBg: 'bg-green-400' 
  },
  { 
    title: 'Không hợp lệ', 
    value: '5', 
    percentage: '9%', 
    trendClass: 'text-red-500', 
    icon: 'BxX', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Chờ xử lý', 
    value: '10', 
    percentage: '18%', 
    trendClass: 'text-yellow-500', 
    icon: 'BxTime', 
    iconBg: 'bg-yellow-400' 
  },
  { 
    title: 'Tỷ lệ pass', 
    value: '91%', 
    icon: 'BxBarChartAlt2', 
    iconBg: 'bg-purple-400' 
  }
]

// State
const searchText = ref('')
const selectedKy = ref<string>('')
const selectedStatus = ref<string>('')
const currentPage = ref(1)
const pageSize = ref(10)

// Mock data
const allData = ref<CandidateRecord[]>(
  Array.from({ length: 55 }, (_, i) => ({
    id: i + 1,
    idHoSo: `HS${String(i + 1).padStart(3, '0')}`,
    thiSinh: `Nguyễn Văn ${String.fromCharCode(65 + (i % 26))}`,
    ngaySinh: '15/06/2010',
    soDienThoai: '0903 123 456',
    kyTuyenSinh: i % 2 === 0 ? 'Tuyển sinh PVF 2025' : 'Tuyển sinh PVF 2024',
    trangThaiHoSo: i % 5 === 3 ? 'Không hợp lệ' : i % 5 === 4 ? 'Chờ xử lý' : 'Đầy đủ',
  }))
)

// Computed
const filteredData = computed(() =>
  allData.value.filter((item) => {
    const matchSearch = !searchText.value ||
      item.thiSinh.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.idHoSo.toLowerCase().includes(searchText.value.toLowerCase())
    
    const matchKy = !selectedKy.value || 
      item.kyTuyenSinh.includes(selectedKy.value)
    
    const matchStatus = !selectedStatus.value ||
      (selectedStatus.value === 'day-du' && item.trangThaiHoSo === 'Đầy đủ') ||
      (selectedStatus.value === 'khong-hop-le' && item.trangThaiHoSo === 'Không hợp lệ') ||
      (selectedStatus.value === 'cho-xu-ly' && item.trangThaiHoSo === 'Chờ xử lý')
    
    return matchSearch && matchKy && matchStatus
  })
)

const totalItems = computed(() => filteredData.value.length)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

// Table config
const columns = [
  { title: 'STT', key: 'stt', width: 70, align: 'center' },
  { title: 'ID HỒ SƠ', dataIndex: 'idHoSo', key: 'idHoSo', width: 110 },
  { title: 'THÍ SINH', dataIndex: 'thiSinh', key: 'thiSinh' },
  { title: 'NGÀY SINH', dataIndex: 'ngaySinh', key: 'ngaySinh', width: 130 },
  { title: 'SỐ ĐIỆN THOẠI', dataIndex: 'soDienThoai', key: 'soDienThoai', width: 150 },
  { title: 'KỲ TUYỂN SINH', dataIndex: 'kyTuyenSinh', key: 'kyTuyenSinh' },
  { title: 'TRẠNG THÁI', key: 'trangThaiHoSo', width: 160, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 160, align: 'center' },
]

const selectedRowKeys = ref<(string | number)[]>([])
const rowSelection = {
  selectedRowKeys: selectedRowKeys as any,
  onChange: (keys: (string | number)[]) => { 
    selectedRowKeys.value = keys
  },
}

// Helpers
const getStatusType = (status: string) => {
  switch (status) {
    case 'Đầy đủ': return 'success'
    case 'Không hợp lệ': return 'error'
    case 'Chờ xử lý': return 'warning'
    default: return 'default'
  }
}

// Handlers
const handleSearch = () => { 
  currentPage.value = 1 
}

const handleResetFilter = () => {
  searchText.value = ''
  selectedKy.value = ''
  selectedStatus.value = ''
  currentPage.value = 1
}

const handleScore = (record: CandidateRecord) => {
  message.info(`Xem bảng điểm: ${record.thiSinh}`)
}

const handleView = (record: CandidateRecord) => {
  router.push({ name: 'candidate-detail', params: { id: record.id } })
}

const handleEdit = (record: CandidateRecord) => {
  router.push({ name: 'candidate-edit', params: { id: record.id } })
}

const handleDelete = (record: CandidateRecord) => {
  allData.value = allData.value.filter(i => i.id !== record.id)
  message.warning(`Đã xóa hồ sơ: ${record.thiSinh}`)
}

const handleClickAdd = () => {
  router.push({ name: 'candidate-add' })
}

const handleClickDeleted = () => {
  router.push({ name: 'candidate-deleted' })
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
