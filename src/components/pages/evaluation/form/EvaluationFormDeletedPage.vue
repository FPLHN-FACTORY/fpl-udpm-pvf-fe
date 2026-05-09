<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Form đánh giá</a-breadcrumb-item>
      <a-breadcrumb-item>Danh sách đã xóa</a-breadcrumb-item>
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
      <!-- Card Header -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Form đánh giá đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonResetYellow 
            v-if="selectedRowKeys.length > 0"
            :text="`Khôi phục (${selectedRowKeys.length})`"
            @click="handleBulkRestore"
          />
          <ButtonBack @click="handleBack" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="searchText" placeholder="Tìm kiếm" />
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
        :data-source="pagedData" 
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        row-key="id"
        class="custom-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'idForm'">
            <span class="font-medium text-[#696cff]">{{ record.idForm }}</span>
          </template>
          
          <template v-if="column.key === 'tenForm'">
            <span class="font-semibold text-[#22303E]">{{ record.tenForm }}</span>
          </template>

          <template v-if="column.key === 'hanhDong'">
            <div class="flex items-center space-x-3">
              <button 
                @click="handleView(record)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
                title="Xem chi tiết"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="handleRestore(record)"
                class="text-gray-400 hover:text-green-500 transition-colors"
                title="Khôi phục"
              >
                <NavIcon name="BxReset" size="18" />
              </button>
              <button 
                @click="handleDeletePermanent(record)"
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
          :total="totalItems" 
          :current="currentPage" 
          :page-size="pageSize" 
          @change="(p) => currentPage = p" 
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
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

// Stats Data
const stats = [
  { 
    title: 'Tổng đã xóa', 
    value: '55', 
    icon: 'BxTrash', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Xóa trong 7 ngày', 
    value: '12', 
    percentage: '22%', 
    trendClass: 'text-orange-500', 
    icon: 'BxTime', 
    iconBg: 'bg-orange-400' 
  },
  { 
    title: 'Xóa trong 30 ngày', 
    value: '35', 
    percentage: '64%', 
    trendClass: 'text-yellow-500', 
    icon: 'BxCalendar', 
    iconBg: 'bg-yellow-400' 
  },
  { 
    title: 'Xóa trên 30 ngày', 
    value: '8', 
    percentage: '14%', 
    trendClass: 'text-gray-500', 
    icon: 'BxHistory', 
    iconBg: 'bg-gray-400' 
  }
]

// Types
interface DeletedFormRecord {
  id: number
  idForm: string
  tenForm: string
  phienBan: string
  doTuoi: string
  tongDiem: number
  ngayXoa: string
}

// State
const searchText = ref<string>('')
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

// Mock data
const allData = ref<DeletedFormRecord[]>(
  Array.from({ length: 55 }, (_, i) => ({
    id: i + 1,
    idForm: `FD${String(i + 1).padStart(3, '0')}`,
    tenForm: 'Form đánh giá PVF U13',
    phienBan: 'v1.0',
    doTuoi: 'U13',
    tongDiem: 10,
    ngayXoa: '2025/12/12 7:00',
  }))
)

// Computed
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchSearch =
      !searchText.value ||
      item.tenForm.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.idForm.toLowerCase().includes(searchText.value.toLowerCase())
    return matchSearch
  })
})

const totalItems = computed(() => filteredData.value.length)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

// Table columns
const columns = [
  { title: 'ID FORM', dataIndex: 'idForm', key: 'idForm', width: 120 },
  { title: 'TÊN FORM', dataIndex: 'tenForm', key: 'tenForm' },
  { title: 'PHIÊN BẢN', dataIndex: 'phienBan', key: 'phienBan', width: 120 },
  { title: 'ĐỘ TUỔI', dataIndex: 'doTuoi', key: 'doTuoi', width: 100 },
  { title: 'TỔNG ĐIỂM', dataIndex: 'tongDiem', key: 'tongDiem', width: 130 },
  { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 180 },
  { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 140, align: 'center' }
]

// Row selection
const selectedRowKeys = ref<number[]>([])
const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys
}

// Methods
const handleSearch = () => { 
  currentPage.value = 1 
}

const handleReset = () => {
  searchText.value = ''
  currentPage.value = 1
}

const handleBack = () => {
  router.push({ name: 'evaluation-forms' })
}

const handleView = (record: DeletedFormRecord) => {
  message.info(`Xem form: ${record.tenForm}`)
}

const handleRestore = (record: DeletedFormRecord) => {
  allData.value = allData.value.filter((item) => item.id !== record.id)
  message.success(`Đã khôi phục form: ${record.tenForm}`)
}

const handleDeletePermanent = (record: DeletedFormRecord) => {
  allData.value = allData.value.filter((item) => item.id !== record.id)
  message.warning(`Đã xóa vĩnh viễn form: ${record.tenForm}`)
}

const handleBulkRestore = () => {
  const count = selectedRowKeys.value.length
  allData.value = allData.value.filter((item) => !selectedRowKeys.value.includes(item.id))
  selectedRowKeys.value = []
  message.success(`Đã khôi phục ${count} form`)
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
