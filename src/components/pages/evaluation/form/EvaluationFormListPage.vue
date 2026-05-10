<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Form đánh giá</a-breadcrumb-item>
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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Form đánh giá</h2>
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
            <SelectFilter v-model:value="selectedStatus" placeholder="Chọn trạng thái">
              <a-select-option value="">Tất cả</a-select-option>
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Không hoạt động</a-select-option>
              <a-select-option value="draft">Nháp</a-select-option>
            </SelectFilter>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
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

          <template v-if="column.key === 'trangThai'">
            <BaseTag :type="statusType(record.trangThai)">
              {{ record.trangThai }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'hanhDong'">
            <div class="flex items-center space-x-3">
              <button
                @click="handleClickDetail(record.id)"
                class="text-gray-400 transition-colors hover:text-blue-500"
                title="Xem chi tiet"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button
                @click="handleEdit(record.id)"
                class="text-gray-400 transition-colors hover:text-green-500"
                title="Chinh sua"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button
                @click="handleDelete(record)"
                class="text-gray-400 transition-colors hover:text-red-500"
                title="Xoa"
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
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

// Stats Data
const stats = [
  { 
    title: 'Tổng số form', 
    value: '60', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Đang hoạt động', 
    value: '54', 
    percentage: '90%', 
    trendClass: 'text-green-500', 
    icon: 'BxCheck', 
    iconBg: 'bg-green-400' 
  },
  { 
    title: 'Không hoạt động', 
    value: '4', 
    percentage: '7%', 
    trendClass: 'text-red-500', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Nháp', 
    value: '2', 
    percentage: '3%', 
    trendClass: 'text-yellow-500', 
    icon: 'BxEdit', 
    iconBg: 'bg-yellow-400' 
  },
  { 
    title: 'Tổng độ tuổi', 
    value: '8', 
    icon: 'BxGroup', 
    iconBg: 'bg-purple-400' 
  }
]

// Types
interface FormRecord {
  id: number
  idForm: string
  tenForm: string
  phienBan: string
  doTuoi: string
  tongDiem: number
  trangThai: string
}

// State
const searchText = ref<string>('')
const selectedStatus = ref<string>('')
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

// Mock data
const allData = ref<FormRecord[]>(
  Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    idForm: 'HS001',
    tenForm: 'Form đánh giá PVF U13',
    phienBan: 'v1.0',
    doTuoi: 'U13',
    tongDiem: 10,
    trangThai: i % 5 === 3 ? 'Không hoạt động' : i % 7 === 0 ? 'Nháp' : 'Đang hoạt động',
  }))
)

// Computed
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchSearch =
      !searchText.value ||
      item.tenForm.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.idForm.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus =
      !selectedStatus.value ||
      (selectedStatus.value === 'active' && item.trangThai === 'Đang hoạt động') ||
      (selectedStatus.value === 'inactive' && item.trangThai === 'Không hoạt động') ||
      (selectedStatus.value === 'draft' && item.trangThai === 'Nháp')
    return matchSearch && matchStatus
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
  { title: 'TRẠNG THÁI', key: 'trangThai', width: 160, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 140, align: 'center' }
]

// Row selection
const selectedRowKeys = ref<number[]>([])
const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys
}

// Methods
const statusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Không hoạt động': return 'error'
    case 'Nháp': return 'warning'
    default: return 'default'
  }
}

const handleEdit = (id: string | number) => {
  router.push({ name: 'evaluation-form-edit', params: { id } })
}

const handleDelete = (record: FormRecord) => {
  allData.value = allData.value.filter((item) => item.id !== record.id)
  message.warning(`Đã xóa form: ${record.tenForm}`)
}

const handleClickDeleted = () => {
  router.push({ name: 'evaluation-form-deleted' })
}

const handleClickAdd = () => {
  router.push({ name: 'evaluation-form-add' })
}

const handleClickDetail = (id: string | number) => {
  router.push({ name: 'evaluation-form-detail', params: { id } })
}

const handleReset = () => {
  searchText.value = ''
  selectedStatus.value = ''
  currentPage.value = 1
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
