<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá</a-breadcrumb-item>
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
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
      <!-- Card Header: Title and Add Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Đánh giá học viên</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="goToDeleted" />
          <ButtonAdd @click="goToCreate" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex flex-wrap items-center gap-4 flex-1">
          <div class="w-[240px]">
            <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="filters.stage" placeholder="Chọn giai đoạn">
              <a-select-option v-for="stage in stageOptions" :key="stage" :value="stage">
                {{ stage }}
              </a-select-option>
            </SelectFilter>
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
              <a-select-option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </a-select-option>
            </SelectFilter>
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
        :data-source="paginatedRows" 
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedIds, onChange: onSelectChange }"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ (currentPage - 1) * pageSize + index + 1 }}</span>
          </template>
          
          <template v-if="column.key === 'studentName'">
            <span class="font-semibold text-[#22303E]">{{ record.studentName }}</span>
          </template>

          <template v-if="column.key === 'totalScore'">
            <span class="font-medium">{{ record.totalScore.toFixed(1) }}</span>
          </template>

          <template v-if="column.key === 'status'">
            <BaseTag :type="getStatusType(record.status)">
              {{ record.status }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button 
                @click="goToDetail(record.id)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="goToEdit(record.id)"
                class="text-gray-400 hover:text-green-500 transition-colors"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button 
                @click="deleteRow(record.id)"
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
          :total="filteredRows.length" 
          :current="currentPage" 
          :page-size="pageSize" 
          @change="changePage" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import { evaluationRows, softDeleteEvaluationById, stageOptions, statusOptions } from './evaluationData'

const router = useRouter()

const pageSize = 10
const currentPage = ref(1)
const selectedIds = ref<number[]>([])

// Stats Data
const stats = computed(() => {
  const total = evaluationRows.length
  const evaluated = evaluationRows.filter(row => row.status !== 'Chưa đánh giá').length
  const pending = total - evaluated
  const averageScore = total
    ? Math.round(evaluationRows.reduce((sum, row) => sum + row.totalScore, 0) / total)
    : 0

  return [
    { 
      title: 'Tổng số lượt đánh giá', 
      value: total.toString(), 
      icon: 'BxPanelSplit', 
      iconBg: 'bg-blue-500' 
    },
    { 
      title: 'Số học viên đã đánh giá', 
      value: evaluated.toString(), 
      percentage: total ? `${Math.round((evaluated / total) * 100)}%` : '0%', 
      trendClass: 'text-green-500', 
      icon: 'BxCalendarCheck', 
      iconBg: 'bg-red-400' 
    },
    { 
      title: 'Số chưa đánh giá', 
      value: pending.toString(), 
      percentage: total ? `${Math.round((pending / total) * 100)}%` : '0%', 
      trendClass: 'text-green-500', 
      icon: 'BxLayersStacked', 
      iconBg: 'bg-orange-400' 
    },
    { 
      title: 'Điểm trung bình', 
      value: averageScore.toString(), 
      icon: 'BxAverageAngle', 
      iconBg: 'bg-yellow-400' 
    }
  ]
})

// Filter State
const filters = reactive({
  keyword: '',
  stage: undefined,
  status: undefined
})

// Table Columns
const columns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'HỌC VIÊN', dataIndex: 'studentName', key: 'studentName' },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'studentCode', key: 'studentCode' },
  { title: 'GIAI ĐOẠN', dataIndex: 'stage', key: 'stage' },
  { title: 'NGƯỜI ĐÁNH GIÁ', dataIndex: 'reviewer', key: 'reviewer' },
  { title: 'TỔNG ĐIỂM', dataIndex: 'totalScore', key: 'totalScore', align: 'center' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

// Filtered and paginated data
const filteredRows = computed(() => {
  const keyword = filters.keyword.trim().toLowerCase()

  return evaluationRows.filter((row) => {
    const matchKeyword =
      keyword.length === 0 ||
      row.studentName.toLowerCase().includes(keyword) ||
      row.studentCode.toLowerCase().includes(keyword) ||
      row.reviewer.toLowerCase().includes(keyword)

    const matchStage = !filters.stage || row.stage === filters.stage
    const matchStatus = !filters.status || row.status === filters.status

    return matchKeyword && matchStage && matchStatus
  })
})

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

// Methods
const getStatusType = (status: string) => {
  switch (status) {
    case 'Đã khóa': return 'success'
    case 'Đang mở': return 'info'
    case 'Chưa đánh giá': return 'warning'
    default: return 'default'
  }
}

const onSelectChange = (keys: number[]) => {
  selectedIds.value = keys
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleReset = () => {
  filters.keyword = ''
  filters.stage = undefined
  filters.status = undefined
  currentPage.value = 1
}

const changePage = (page: number) => {
  currentPage.value = page
}

const goToDetail = (id: number) => {
  router.push({
    name: 'evaluation-student-detail',
    params: { id }
  })
}

const goToCreate = () => {
  router.push({ name: 'evaluation-student-create' })
}

const goToDeleted = () => {
  router.push({ name: 'evaluation-student-deleted' })
}

const goToEdit = (id: number) => {
  router.push({
    name: 'evaluation-student-edit',
    params: { id }
  })
}

const deleteRow = (id: number) => {
  const record = evaluationRows.find((row) => row.id === id)

  if (!record) {
    return
  }

  const shouldDelete = window.confirm(
    `Bạn có chắc muốn xóa bản đánh giá của ${record.studentName}?`
  )

  if (!shouldDelete) {
    return
  }

  if (!softDeleteEvaluationById(id)) {
    return
  }

  selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id)
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
