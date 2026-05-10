<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Giai đoạn đánh giá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <a-card v-for="(stat, index) in stageMetrics" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.label }}</p>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl font-bold text-gray-800">{{ stat.value }}</span>
              <span v-if="stat.change" class="text-xs font-semibold text-green-500">
                ({{ stat.change }})
              </span>
            </div>
          </div>
          <div :style="{ backgroundColor: stat.iconBackground }" class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
             <NavIcon :name="stat.icon" :class-name="`w-6 h-6 ${stat.iconColor}`" />
          </div>
        </div>
      </a-card>
    </div>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Add Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Giai đoạn đánh giá</h2>
        <div class="flex items-center gap-3">
          <ButtonDeleteList @click="router.push({ name: 'evaluation-stages-deleted' })" />
          <ButtonAdd @click="router.push({ name: 'evaluation-stages-create' })" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-4 p-4 bg-[#fcfcfd] rounded-lg border border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch v-model="searchKeyword" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <SelectFilter :value="searchStatus" @update:value="searchStatus = $event" placeholder="Chọn trạng thái" :options="statusOptions" />
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleReset" />
        </div>
      </div>

      <!-- Data Table -->
      <a-table 
        :columns="columns" 
        :data-source="stages.items" 
        :pagination="false"
        :row-selection="rowSelection"
        class="custom-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'order'">
            <span class="font-medium text-[#696cff]">{{ record.order }}</span>
          </template>
          
          <template v-if="column.key === 'stageName'">
            <span class="font-semibold">{{ record.stageName }}</span>
          </template>

          <template v-if="column.key === 'statusLabel'">
            <BaseTag :type="record.statusTone === 'success' ? 'success' : record.statusTone === 'warning' ? 'warning' : 'default'">
              {{ record.statusLabel }}
            </BaseTag>
          </template>

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button 
                @click="goDetail(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="goEdit(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
              >
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button 
                @click="moveToDeleted(record.key)"
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
          :total="stages.total" 
          :current="stages.page" 
          :page-size="stages.pageSize" 
          @change="handlePageChange" 
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import type { MetricCardItem, PaginationResult, SelectOption } from '../../../types'
import { apiGiaiDoanDanhGia, type EvaluationStageListQuery, type EvaluationStageRecord } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])
const stageMetrics = ref<MetricCardItem[]>([])
const statusOptions = ref<SelectOption[]>([])
const stages = ref<PaginationResult<EvaluationStageRecord>>({ items: [], total: 0, page: 1, pageSize: 10 })
const query = ref<EvaluationStageListQuery>({ keyword: '', date: null, status: undefined, page: 1, pageSize: 10 })
const searchKeyword = ref('')
const searchStatus = ref<string | undefined>(undefined)

const columns: TableColumnsType<EvaluationStageRecord> = [
  { title: '#', key: 'order', dataIndex: 'order', width: 70 },
  { title: 'Tên GĐ đánh giá', key: 'stageName', dataIndex: 'stageName', ellipsis: true },
  { title: 'Khóa', key: 'courseName', dataIndex: 'courseName', width: 140 },
  { title: 'Form áp dụng', key: 'formName', dataIndex: 'formName', ellipsis: true },
  { title: 'Thời gian bắt đầu', key: 'startAt', dataIndex: 'startAt', width: 170 },
  { title: 'Thời gian kết thúc', key: 'endAt', dataIndex: 'endAt', width: 170 },
  { title: 'Trạng thái', key: 'statusLabel', dataIndex: 'statusLabel', width: 150 },
  { title: 'Hành động', key: 'actions', width: 120, align: 'center' }
]

const rowSelection = computed(() => ({ selectedRowKeys: selectedRowKeys.value, onChange: (keys: string[]) => { selectedRowKeys.value = keys } }))
const goDetail = (id: string) => router.push({ name: 'evaluation-stages-detail', params: { id } })
const goEdit = (id: string) => router.push({ name: 'evaluation-stages-edit', params: { id } })

const loadStages = async () => {
  const data = await apiGiaiDoanDanhGia.listStages(query.value)
  stageMetrics.value = data.metrics
  stages.value = data.stages
  statusOptions.value = data.statusOptions
  query.value.page = data.stages.page
  query.value.pageSize = data.stages.pageSize
}

const handleSearch = async () => {
  query.value = { ...query.value, keyword: searchKeyword.value, status: searchStatus.value, page: 1 }
  await loadStages()
}

const handleReset = async () => {
  searchKeyword.value = ''
  searchStatus.value = undefined
  query.value = { ...query.value, keyword: '', date: null, status: undefined, page: 1 }
  await loadStages()
}

const handlePageChange = async (page: number) => {
  query.value = { ...query.value, page }
  await loadStages()
}

const moveToDeleted = async (id: string) => {
  await apiGiaiDoanDanhGia.deleteStage(id)
  message.success('Đã chuyển giai đoạn đánh giá vào danh sách đã xóa.')
  await loadStages()
}

onMounted(loadStages)
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
