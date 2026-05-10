<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">{{ moduleTitle }}</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400 font-medium">{{ pageTitle }}</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Lớp học văn hóa đã xóa</h2>
        <ButtonBack @click="goBack" />
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="draftFilters.keyword" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-select
              v-model:value="draftFilters.deletedDate"
              placeholder="Chọn thời gian"
              class="w-full !h-[38px]"
            >
              <a-select-option value="all">Tất cả</a-select-option>
              <a-select-option v-for="date in deletedDateOptions" :key="date" :value="date">
                {{ date }}
              </a-select-option>
            </a-select>
          </div>
          <div class="w-[200px]">
            <a-select
              v-model:value="draftFilters.status"
              placeholder="Chọn trạng thái"
              class="w-full !h-[38px]"
            >
              <a-select-option value="all">Tất cả</a-select-option>
              <a-select-option v-for="s in statusOptions" :key="s.value" :value="s.value">
                {{ s.label }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="applyFilters" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table
          :columns="columns"
          :data-source="rows"
          :pagination="false"
          :row-selection="{ selectedRowKeys: selectedIds.map(String), onChange: onSelectChange }"
          row-key="id"
          class="deleted-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
            </template>

            <template v-else-if="column.key === 'code'">
              <span
                class="font-semibold text-[#696cff] cursor-pointer hover:underline"
                @click="goToDetail(record.id)"
              >
                {{ record.code }}
              </span>
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.statusLabel }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  title="Xem chi tiết"
                  @click="goToDetail(record.id)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button
                  class="p-1 text-[#a1acb8] hover:text-[#71dd37] transition-colors"
                  title="Khôi phục"
                  @click="restoreRow(record.id)"
                >
                  <NavIcon name="BxReset" class-name="w-[18px] h-[18px]" />
                </button>
                <button
                  class="p-1 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors"
                  title="Xóa vĩnh viễn"
                  @click="hardDeleteRow(record.id)"
                >
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end">
        <BasePagination
          :current="pagination.currentPage"
          :total="pagination.totalItems"
          :page-size="pagination.itemsPerPage"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
import {
  culturalClassService,
  culturalClassStatusOptions,
  type CulturalClassListItem,
  type CulturalClassStatus,
  type PaginationMeta,
} from '../../../../services/cultural/culturalClass'

const moduleTitle = 'Quản lý học tập văn hóa'
const pageTitle = 'Lớp học văn hóa đã xóa'
const router = useRouter()

const rows = ref<CulturalClassListItem[]>([])
const selectedIds = ref<number[]>([])

const draftFilters = reactive({
  keyword: '',
  deletedDate: 'all',
  status: 'all' as 'all' | CulturalClassStatus,
})

const queryFilters = reactive({
  keyword: '',
  deletedDate: 'all',
  status: 'all' as 'all' | CulturalClassStatus,
})

const pagination = reactive<PaginationMeta>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
})

let filterSyncTimer: ReturnType<typeof setTimeout> | undefined

const statusOptions = culturalClassStatusOptions
const deletedDateOptions = ['2025-02-01']

const getStatusType = (status: CulturalClassStatus) => {
  switch (status) {
    case 'ACTIVE': return 'success'
    case 'PAUSED': return 'warning'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' as const },
  { title: 'TÊN LỚP HỌC', dataIndex: 'code', key: 'code' },
  { title: 'KHỐI LỚP', dataIndex: 'gradeName', key: 'gradeName' },
  { title: 'NĂM HỌC', dataIndex: 'schoolYear', key: 'schoolYear' },
  { title: 'GIÁO VIÊN CHỦ NHIỆM', dataIndex: 'homeroomTeacher', key: 'homeroomTeacher' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 140, align: 'center' as const },
]

const onSelectChange = (selectedRowKeys: (string | number)[]) => {
  selectedIds.value = selectedRowKeys.map(Number)
}

const loadRows = async () => {
  const response = await culturalClassService.listDeleted({
    keyword: queryFilters.keyword,
    deletedDate: queryFilters.deletedDate,
    status: queryFilters.status,
    page: pagination.currentPage,
    pageSize: pagination.itemsPerPage,
  })
  rows.value = response.data
  pagination.currentPage = response.meta.currentPage
  pagination.totalPages = response.meta.totalPages
  pagination.totalItems = response.meta.totalItems
  pagination.itemsPerPage = response.meta.itemsPerPage
  selectedIds.value = []
}

const syncFiltersAndReload = async () => {
  queryFilters.keyword = draftFilters.keyword
  queryFilters.deletedDate = draftFilters.deletedDate
  queryFilters.status = draftFilters.status
  pagination.currentPage = 1
  await loadRows()
}

const applyFilters = async () => {
  if (filterSyncTimer) clearTimeout(filterSyncTimer)
  await syncFiltersAndReload()
}

const resetFilters = () => {
  draftFilters.keyword = ''
  draftFilters.deletedDate = 'all'
  draftFilters.status = 'all'
}

const changePage = async (page: number) => {
  if (page < 1 || page > pagination.totalPages) return
  pagination.currentPage = page
  await loadRows()
}

const goBack = () => router.push({ name: 'cultural-class' })
const goToDetail = (id: number) => router.push({ name: 'cultural-class-detail', params: { id } })

const restoreRow = async (id: number) => {
  await culturalClassService.restore(id)
  await loadRows()
}

const hardDeleteRow = async (id: number) => {
  await culturalClassService.hardDelete(id)
  if (rows.value.length === 1 && pagination.currentPage > 1) pagination.currentPage -= 1
  await loadRows()
}

onMounted(async () => await loadRows())

watch(
  () => [draftFilters.keyword, draftFilters.deletedDate, draftFilters.status],
  () => {
    if (filterSyncTimer) clearTimeout(filterSyncTimer)
    filterSyncTimer = setTimeout(() => void syncFiltersAndReload(), 250)
  },
)
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}

.deleted-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
