<template>
  <div class="space-y-5">
    <div class="text-[11px] leading-4 text-[#a1acb8]">
      Học tập văn hoá
      <span class="mx-1">/</span>
      Đơn xin phép nghỉ học
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      <div
        v-for="item in absenceStatistics"
        :key="item.title"
        class="rounded-[10px] border border-gray-100 bg-white px-5 py-4 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="app-summary-stat-copy">
            <div class="app-summary-stat-label text-[11px]">{{ item.title }}</div>
            <div class="app-summary-stat-row">
              <span class="app-summary-stat-value text-[24px]">{{ item.value }}</span>
              <span v-if="item.hint" class="app-summary-stat-hint text-[#71dd37]">
                {{ item.hint }}
              </span>
            </div>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-md" :class="statIconClass(item.accent)">
            <NavIcon
              :name="item.iconName"
              :size="item.iconName === 'BxLayersMinus' || item.iconName === 'BxLayersPlus' ? 22 : 18"
            />
          </div>
        </div>
      </div>
    </div>

    <section class="rounded-[10px] border border-gray-100 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-[18px] font-semibold text-[#566a7f]">Danh sách Đơn xin phép nghỉ học</h2>
        <div class="flex flex-wrap items-center gap-2">
          <a-button
            class="deleted-list-button !inline-flex !h-[38px] !items-center !justify-center !gap-2 !rounded-md !border-none !bg-[#8592a3] !px-4 !text-white whitespace-nowrap shadow-sm hover:!bg-[#717d8c]"
            @click="$router.push('/cultural/absence/deleted')"
          >
            <template #icon>
              <NavIcon name="BxTrash" size="16" />
            </template>
            <span class="text-[12px] font-semibold leading-none">Danh Sách Đã Xóa</span>
          </a-button>
          <ButtonAddNoIcon text="Thêm Mới" @click="$router.push('/cultural/absence/create')" />
        </div>
      </div>

      <div class="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div class="w-full lg:w-[208px] lg:shrink-0">
            <InputSearch v-model="filterForm.keyword" placeholder="Tìm kiếm" />
          </div>

          <div class="w-full lg:w-[158px] lg:shrink-0">
            <a-date-picker
              v-model:value="filterForm.date"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              placeholder="Chọn thời gian"
              input-read-only
              class="w-full filter-date-picker !h-[38px]"
            />
          </div>

          <div class="w-full lg:w-[168px] lg:shrink-0">
            <a-select v-model:value="filterForm.status" placeholder="Chọn trạng thái" class="w-full filter-select">
              <a-select-option value="Chấp nhận">Chấp nhận</a-select-option>
              <a-select-option value="Chờ xác nhận">Chờ xác nhận</a-select-option>
            </a-select>
          </div>
        </div>

        <div class="flex items-center gap-2 lg:shrink-0">
          <ButtonSearch @click="runSearch" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <div class="overflow-x-auto px-5 pb-2">
        <table class="absence-table min-w-[1120px] w-full table-fixed">
          <colgroup>
            <col style="width: 44px" />
            <col style="width: 52px" />
            <col style="width: 210px" />
            <col style="width: 170px" />
            <col style="width: 160px" />
            <col style="width: 160px" />
            <col style="width: 170px" />
            <col style="width: 150px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  :checked="areAllPageRowsSelected"
                  @change="toggleSelectAllRows"
                />
              </th>
              <th>#</th>
              <th>HỌC VIÊN</th>
              <th>NGÀY GỬI ĐƠN</th>
              <th>NGÀY BĐ NGHỈ</th>
              <th>NGÀY KT NGHỈ</th>
              <th>TRẠNG THÁI</th>
              <th class="text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in paginatedRequests" :key="request.id">
              <td>
                <input
                  type="checkbox"
                  :checked="selectedRowIds.includes(request.id)"
                  @change="toggleSelectRow(request.id)"
                />
              </td>
              <td class="text-[#696cff]">{{ request.order }}</td>
              <td>{{ request.listStudentName }}</td>
              <td>{{ request.submittedAt }}</td>
              <td>{{ request.startDate }}</td>
              <td>{{ request.endDate }}</td>
              <td>
                <span class="absence-status-chip" :class="statusChipClass(request.status)">{{ request.status }}</span>
              </td>
              <td>
                <div class="flex items-center justify-center gap-3">
                  <button class="absence-action-button" @click="$router.push(`/cultural/absence/detail/${request.id}`)">
                    <NavIcon name="BxShow" size="16" />
                  </button>
                  <button class="absence-action-button" @click="$router.push(`/cultural/absence/edit/${request.id}`)">
                    <NavIcon name="BxEdit" size="16" />
                  </button>
                  <button class="absence-action-button" @click="handleDelete(request.id)">
                    <NavIcon name="BxTrash" size="16" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!paginatedRequests.length">
              <td colspan="8" class="py-6 text-center text-[13px] text-[#8592a3]">Không có dữ liệu phù hợp</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end px-5 py-4">
        <BasePagination :current="currentPage" :total="filteredRequests.length" :page-size="pageSize" @change="currentPage = $event" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import { softDeleteAbsenceRequest, useAbsenceData, useAbsenceStatistics } from './absenceData'

const { activeAbsenceRequests } = useAbsenceData()
const absenceStatistics = useAbsenceStatistics()

const filterForm = reactive({
  keyword: '',
  date: undefined as string | undefined,
  status: undefined as string | undefined
})

const appliedFilters = reactive({
  keyword: '',
  date: undefined as string | undefined,
  status: undefined as string | undefined
})

const currentPage = ref(1)
const pageSize = 10
const selectedRowIds = ref<number[]>([])

const filteredRequests = computed(() => {
  const keyword = appliedFilters.keyword.trim().toLowerCase()
  const selectedDate = appliedFilters.date

  return activeAbsenceRequests.value.filter((request) => {
    const matchesKeyword = !keyword
      || request.listStudentName.toLowerCase().includes(keyword)
      || request.reason.toLowerCase().includes(keyword)
      || request.fileName.toLowerCase().includes(keyword)

    const matchesTime = !selectedDate
      || request.submittedAt === selectedDate
      || request.startDate === selectedDate
      || request.endDate === selectedDate

    const matchesStatus = !appliedFilters.status || request.status === appliedFilters.status
    return matchesKeyword && matchesTime && matchesStatus
  })
})

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredRequests.value.slice(start, start + pageSize)
})

const areAllPageRowsSelected = computed(() => (
  paginatedRequests.value.length > 0
  && paginatedRequests.value.every((request) => selectedRowIds.value.includes(request.id))
))

watch(filteredRequests, (items) => {
  const maxPage = Math.max(1, Math.ceil(items.length / pageSize))
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage
  }
}, { immediate: true })

const applyFilters = () => {
  appliedFilters.keyword = filterForm.keyword
  appliedFilters.date = filterForm.date
  appliedFilters.status = filterForm.status
  currentPage.value = 1
}

watch(
  () => [filterForm.keyword, filterForm.date, filterForm.status],
  applyFilters
)

const runSearch = () => {
  applyFilters()
}

const resetFilters = () => {
  filterForm.keyword = ''
  filterForm.date = undefined
  filterForm.status = undefined
  appliedFilters.keyword = ''
  appliedFilters.date = undefined
  appliedFilters.status = undefined
  currentPage.value = 1
}

const handleDelete = (id: number) => {
  selectedRowIds.value = selectedRowIds.value.filter((selectedId) => selectedId !== id)
  softDeleteAbsenceRequest(id)
}

const toggleSelectRow = (id: number) => {
  selectedRowIds.value = selectedRowIds.value.includes(id)
    ? selectedRowIds.value.filter((selectedId) => selectedId !== id)
    : [...selectedRowIds.value, id]
}

const toggleSelectAllRows = () => {
  if (areAllPageRowsSelected.value) {
    selectedRowIds.value = selectedRowIds.value.filter(
      (selectedId) => !paginatedRequests.value.some((request) => request.id === selectedId)
    )
    return
  }

  const pageIds = paginatedRequests.value.map((request) => request.id)
  selectedRowIds.value = Array.from(new Set([...selectedRowIds.value, ...pageIds]))
}

const statIconClass = (accent: string) => {
  if (accent === 'purple') return 'bg-[#e7e7ff] text-[#696cff]'
  if (accent === 'orange') return 'bg-[#ffe5e5] text-[#ff3e1d]'
  return 'bg-[#fff2e2] text-[#ffab00]'
}

const statusChipClass = (status: string) => {
  return status === 'Chờ xác nhận'
    ? 'border border-[#ffe0b2] bg-[#fff2e2] text-[#ffab00]'
    : 'bg-[rgba(113,221,55,0.16)] text-[#71dd37]'
}
</script>

<style scoped>
.absence-table {
  border-collapse: collapse;
}

.absence-table th {
  padding: 12px 8px;
  border-bottom: 1px solid #f0f2f5;
  color: #566a7f;
  font-size: 11px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
}

.absence-table td {
  padding: 11px 8px;
  border-bottom: 1px solid #f0f2f5;
  color: #697a8d;
  font-size: 12px;
  white-space: nowrap;
}

.absence-table input[type='checkbox'] {
  width: 14px;
  height: 14px;
  accent-color: #696cff;
}

.absence-status-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.absence-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  line-height: 1;
  color: #8592a3;
  transition: color 0.2s ease;
}

.absence-action-button:hover {
  color: #566a7f;
}

.absence-table th:last-child,
.absence-table td:last-child {
  text-align: center;
}

:deep(.deleted-list-button .ant-btn-icon) {
  display: inline-flex;
  align-items: center;
  margin-inline-end: 4px;
}

:deep(.filter-select .ant-select-selector) {
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.filter-date-picker.ant-picker) {
  width: 100%;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.filter-date-picker.ant-picker .ant-picker-input > input) {
  font-size: 13px;
}

:deep(.filter-date-picker.ant-picker:hover),
:deep(.filter-date-picker.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.filter-date-picker.ant-picker .ant-picker-suffix) {
  align-items: center !important;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus),
:deep(.ant-input-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}
</style>
