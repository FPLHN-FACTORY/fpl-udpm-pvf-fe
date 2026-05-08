<template>
  <div class="space-y-5">
    <div class="text-[11px] leading-4 text-[#a1acb8]">
      Học tập văn hoá
      <span class="mx-1">/</span>
      Đơn xin phép nghỉ học
    </div>

    <section class="rounded-[10px] border border-gray-100 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-[18px] font-semibold text-[#566a7f]">Danh sách Đơn xin phép nghỉ học đã xóa</h2>
        <ButtonBack @click="$router.push('/cultural/absence')" />
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
              <th>NGÀY XÓA</th>
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
              <td>{{ request.deletedAt }}</td>
              <td>
                <div class="flex items-center justify-center gap-3">
                  <button class="absence-action-button" @click="$router.push(`/cultural/absence/detail/${request.id}`)">
                    <NavIcon name="BxShow" size="16" />
                  </button>
                  <button class="absence-action-button">
                    <NavIcon name="BxEdit" size="16" />
                  </button>
                  <button class="absence-action-button">
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
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import { useAbsenceData } from './absenceData'

const { deletedAbsenceRequests } = useAbsenceData()

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

  return deletedAbsenceRequests.value.filter((request) => {
    const matchesKeyword = !keyword
      || request.listStudentName.toLowerCase().includes(keyword)
      || request.reason.toLowerCase().includes(keyword)
      || request.fileName.toLowerCase().includes(keyword)

    const matchesTime = !selectedDate
      || request.submittedAt === selectedDate
      || request.startDate === selectedDate
      || request.endDate === selectedDate
      || (request.deletedAt ?? '').startsWith(selectedDate)

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
</style>
