<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">{{ moduleTitle }}</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">{{ pageTitle }}</span>
    </div>

    <!-- Stats Cards -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <article
        v-for="card in summaryCards"
        :key="card.label"
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start"
      >
        <div>
          <p class="text-sm text-gray-500 mb-1">{{ card.label }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ card.value }}</h3>
            <span v-if="card.hint" class="text-[#71dd37] text-sm">{{ card.hint }}</span>
          </div>
        </div>
        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center"
          :class="card.iconWrapperClass"
        >
          <NavIcon :name="card.icon" class-name="w-6 h-6" />
        </div>
      </article>
    </section>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Lớp học văn hóa</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="goToDeleted" />
          <ButtonAdd text="Thêm Mới" @click="goToCreate" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="draftFilters.keyword" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-select
              v-model:value="draftFilters.schoolYear"
              placeholder="Chọn năm học"
              class="w-full !h-[38px]"
            >
              <a-select-option value="all">Tất cả</a-select-option>
              <a-select-option v-for="year in schoolYearOptions" :key="year" :value="year">
                {{ year }}
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
          class="cultural-class-table"
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
                  @click="goToDetail(record.id)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="goToEdit(record.id)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button
                  class="p-1 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors"
                  @click="deleteRow(record.id)"
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
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
import {
  culturalClassSchoolYearOptions,
  culturalClassService,
  culturalClassStatusOptions,
  type CulturalClassListItem,
  type CulturalClassStatus,
  type CulturalClassSummary,
  type PaginationMeta,
} from '../../../../services/cultural/culturalClass'

const moduleTitle = 'Quản lý học tập văn hóa'
const pageTitle = 'Lớp học văn hóa'
const router = useRouter()

const rows = ref<CulturalClassListItem[]>([])
const selectedIds = ref<number[]>([])

const draftFilters = reactive({
  keyword: '',
  schoolYear: 'all',
  status: 'all' as 'all' | CulturalClassStatus,
})

const queryFilters = reactive({
  keyword: '',
  schoolYear: 'all',
  status: 'all' as 'all' | CulturalClassStatus,
})

const pagination = reactive<PaginationMeta>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
})

const summary = reactive<CulturalClassSummary>({
  total: 0,
  active: 0,
  paused: 0,
})

const statusOptions = culturalClassStatusOptions
const schoolYearOptions = culturalClassSchoolYearOptions

const getStatusType = (status: CulturalClassStatus) => {
  switch (status) {
    case 'ACTIVE': return 'success'
    case 'PAUSED': return 'warning'
    default: return 'default'
  }
}

const summaryCards = computed(() => [
  {
    label: 'Tổng số lớp học',
    value: summary.total,
    hint: '',
    icon: 'BxPanelSplit',
    iconWrapperClass: 'bg-[#e7e7ff] text-[#696cff]',
  },
  {
    label: 'Tổng số đang hoạt động',
    value: summary.active,
    hint: summary.total ? `(${Math.round((summary.active / summary.total) * 100)}%)` : '',
    icon: 'BxLayersPlus',
    iconWrapperClass: 'bg-[#ffe1e1] text-[#ff3e1d]',
  },
  {
    label: 'Tổng số tạm ngưng',
    value: summary.paused,
    hint: summary.total ? `(${Math.round((summary.paused / summary.total) * 100)}%)` : '',
    icon: 'BxLayersMinus',
    iconWrapperClass: 'bg-[#fff2e2] text-[#fdac41]',
  },
])

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' as const },
  { title: 'TÊN LỚP HỌC', dataIndex: 'code', key: 'code' },
  { title: 'KHỐI LỚP', dataIndex: 'gradeName', key: 'gradeName' },
  { title: 'NĂM HỌC', dataIndex: 'schoolYear', key: 'schoolYear' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 140, align: 'center' as const },
]

const onSelectChange = (selectedRowKeys: (string | number)[]) => {
  selectedIds.value = selectedRowKeys.map(Number)
}

const loadRows = async () => {
  const response = await culturalClassService.list({
    keyword: queryFilters.keyword,
    schoolYear: queryFilters.schoolYear,
    status: queryFilters.status,
    page: pagination.currentPage,
    pageSize: pagination.itemsPerPage,
  })
  rows.value = response.data
  Object.assign(pagination, response.meta)
  Object.assign(summary, response.summary)
  selectedIds.value = []
}

const syncFiltersAndReload = async () => {
  queryFilters.keyword = draftFilters.keyword
  queryFilters.schoolYear = draftFilters.schoolYear
  queryFilters.status = draftFilters.status
  pagination.currentPage = 1
  await loadRows()
}

const applyFilters = async () => await syncFiltersAndReload()
const resetFilters = async () => {
  draftFilters.keyword = ''
  draftFilters.schoolYear = 'all'
  draftFilters.status = 'all'
  await syncFiltersAndReload()
}

const changePage = async (page: number) => {
  if (page < 1 || page > pagination.totalPages) return
  pagination.currentPage = page
  await loadRows()
}

const goToDeleted = () => router.push({ name: 'cultural-class-deleted' })
const goToCreate = () => router.push({ name: 'cultural-class-create' })
const goToDetail = (id: number) => router.push({ name: 'cultural-class-detail', params: { id } })
const goToEdit = (id: number) => router.push({ name: 'cultural-class-edit', params: { id } })

const deleteRow = async (id: number) => {
  await culturalClassService.softDelete(id)
  if (rows.value.length === 1 && pagination.currentPage > 1) pagination.currentPage -= 1
  await loadRows()
}

onMounted(async () => await loadRows())
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

.cultural-class-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>