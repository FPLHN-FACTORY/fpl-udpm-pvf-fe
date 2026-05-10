<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập văn hóa</a-breadcrumb-item>
      <a-breadcrumb-item>Môn học văn hóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Môn học văn hóa</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="goToDeleted" />
          <ButtonAdd @click="goToCreate" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-4 p-4 bg-[#fcfcfd] rounded-lg border border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <SelectFilter :value="statusFilter" @update:value="statusFilter = $event" placeholder="Chọn trạng thái" :options="statusOptions" />
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="resetFilters" />
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
          
          <template v-if="column.key === 'code'">
            <span class="font-semibold">{{ record.code }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="record.status === 'Đang hoạt động' ? 'success' : 'warning'">
              {{ record.status }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button 
                @click="goToDetail(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="goToEdit(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button 
                @click="handleDelete(record.key)"
                class="text-gray-400 hover:text-red-500 transition-colors"
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
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import { mockSubjects } from '../../services/home/api'

const router = useRouter()
const searchQuery = ref('')
const statusFilter = ref<string | undefined>(undefined)
const selectedRowKeys = ref<string[]>([])

const totalSubjects = computed(() => mockSubjects.length)
const activeSubjects = computed(() => mockSubjects.filter(s => s.status === 'Đang hoạt động').length)
const suspendedSubjects = computed(() => mockSubjects.filter(s => s.status === 'Tạm ngưng').length)
const activePercentage = computed(() => totalSubjects.value ? Math.round((activeSubjects.value / totalSubjects.value) * 100) : 0)
const suspendedPercentage = computed(() => totalSubjects.value ? Math.round((suspendedSubjects.value / totalSubjects.value) * 100) : 0)

// Stats Data
const stats = computed(() => [
  { 
    title: 'Tổng số', 
    value: totalSubjects.value.toString(), 
    icon: 'BxBookContent', 
    iconBg: 'bg-blue-500' 
  },
  { 
    title: 'Tổng số đang sử dụng', 
    value: activeSubjects.value.toString(), 
    percentage: `${activePercentage.value}%`, 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-red-400' 
  },
  { 
    title: 'Tổng số tạm ngưng', 
    value: suspendedSubjects.value.toString(), 
    percentage: `${suspendedPercentage.value}%`, 
    trendClass: 'text-green-500', 
    icon: 'BxLayer', 
    iconBg: 'bg-yellow-400' 
  }
])

const statusOptions = [
  { label: 'Đang hoạt động', value: 'Đang hoạt động' },
  { label: 'Tạm ngưng', value: 'Tạm ngưng' }
]

const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

const columns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'MÃ MÔN', key: 'code', dataIndex: 'code' },
  { title: 'TÊN MÔN HỌC', key: 'name', dataIndex: 'name' },
  { title: 'KHỐI HỌC', key: 'grade', dataIndex: 'grade' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate' },
  { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' }
]

const dataSource = ref(mockSubjects)

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: mockSubjects.length
})

const goToCreate = () => {
  router.push({ name: 'cultural-subject-create' })
}

const goToDeleted = () => {
  router.push({ name: 'cultural-subject-deleted' })
}

const goToDetail = (id: string) => {
  router.push({ name: 'cultural-subject-detail', params: { id } })
}

const goToEdit = (id: string) => {
  router.push({ name: 'cultural-subject-edit', params: { id } })
}

const handleSearch = () => {
  // Implement search logic
}

const handleDelete = (id: string) => {
  message.success('Đã xóa môn học')
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
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
