<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Giai đoạn đánh giá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header: Title and Back Button -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Danh sách Giai đoạn đánh giá đã xóa</h2>
        <div class="flex items-center gap-3">
          <ButtonBack @click="router.push({ name: 'evaluation-stages' })" />
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

          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button 
                @click="goDetail(record.key)"
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <NavIcon name="BxShow" size="18" />
              </button>
              <button 
                @click="restoreStage(record.key)"
                class="text-gray-400 hover:text-green-500 transition-colors"
              >
                <NavIcon name="BxReset" size="18" />
              </button>
              <button 
                @click="removeStage(record.key)"
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
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import type { PaginationResult, SelectOption } from '../../../types'
import { apiGiaiDoanDanhGia, type EvaluationStageListQuery, type EvaluationStageRecord } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])
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
  { title: 'Ngày xóa', key: 'deletedAt', dataIndex: 'deletedAt', width: 150 },
  { title: 'Hành động', key: 'actions', width: 120, align: 'center' }
]

const rowSelection = computed(() => ({ selectedRowKeys: selectedRowKeys.value, onChange: (keys: string[]) => { selectedRowKeys.value = keys } }))
const goDetail = (id: string) => router.push({ name: 'evaluation-stages-detail', params: { id } })

const loadStages = async () => {
  const data = await apiGiaiDoanDanhGia.listDeletedStages(query.value)
  stages.value = data.stages
  statusOptions.value = data.statusOptions
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

const restoreStage = async (id: string) => {
  await apiGiaiDoanDanhGia.restoreStage(id)
  message.success('Khôi phục giai đoạn đánh giá thành công.')
  await loadStages()
}

const removeStage = async (id: string) => {
  await apiGiaiDoanDanhGia.removeDeletedStage(id)
  message.success('Đã xóa vĩnh viễn giai đoạn đánh giá.')
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
