<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      <div v-for="card in summaryCards" :key="card.label" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-gray-400 mb-2">{{ card.label }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-[22px] font-bold text-[#566a7f]">{{ card.value }}</span>
            <span v-if="card.hint" :class="card.hintClass" class="text-[12px] font-medium">{{ card.hint }}</span>
          </div>
        </div>
        <div :class="card.iconWrapperClass" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <NavIcon :name="card.icon" :size="20" />
        </div>
      </div>
    </div>

<<<<<<< HEAD
    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in summaryCards"
        :key="card.label"
        class="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
      >
        <div class="app-summary-stat-copy">
          <p class="app-summary-stat-label">
            {{ card.label }}
          </p>
          <div class="app-summary-stat-row">
            <p class="app-summary-stat-value">
              {{ card.value }}
            </p>
            <span
              v-if="card.hint"
              class="app-summary-stat-hint"
              :class="card.hintClass"
            >
              {{ card.hint }}
            </span>
          </div>
        </div>
=======
    <!-- Main Content Card -->
    <AdminCard title="Danh sách Bộ tiêu chí gốc">
      <template #actions>
        <ButtonDeleteList @click="goToDeleted" />
        <ButtonAdd @click="goToCreate" />
      </template>
>>>>>>> e3d5ebe15887ecefe7a224e6cb73a2e24468246d

      <!-- Filter Section -->
      <MasterCriteriaFilter 
        v-model:filters="filters"
        @search="handleSearch"
        @reset="handleReset"
      />

<<<<<<< HEAD
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Danh sách Bộ tiêu chí gốc
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="goToDeleted"
          >
            <MasterCriteriaIcon name="BxTrash" class-name="h-4 w-4" />
            Danh sách bộ tiêu chí đã xóa
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[#ff1f1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b]"
            @click="goToCreate"
          >
            <MasterCriteriaIcon name="BxPlus" class-name="h-4 w-4" />
            Thêm mới
          </button>
        </div>
      </div>

      <div class="space-y-5 px-5 py-5">
        <div
          class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              v-model="draftFilters.keyword"
              type="text"
              placeholder="Tìm kiếm"
              class="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10 md:w-[228px]"
            />

            <div class="relative w-full md:w-[184px]">
              <select
                v-model="draftFilters.status"
                class="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
              >
                <option value="all">Chọn trạng thái</option>
                <option
                  v-for="option in masterCriteriaStatusOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <MasterCriteriaIcon
                name="BxChevronRight"
                class-name="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 self-end xl:self-auto">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#696cff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f63f2]"
              @click="applyFilters"
            >
              <MasterCriteriaIcon name="BxSearch" class-name="h-4 w-4" />
              Tìm Kiếm
            </button>

            <button
              type="button"
              class="app-filter-reset-button"
              @click="resetFilters"
            >
              <MasterCriteriaIcon name="BxRefresh" class-name="app-filter-reset-icon" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr
                class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                <th class="w-14 border-y border-slate-200 px-4 py-3">
                  <input
                    :checked="isAllVisibleSelected"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleSelectVisible"
                  />
                </th>
                <th class="w-16 border-y border-slate-200 px-2 py-3">#</th>
                <th class="border-y border-slate-200 px-4 py-3">
                  Tên bộ tiêu chí
                </th>
                <th class="border-y border-slate-200 px-4 py-3">
                  Mô tả bộ tiêu chí
                </th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">
                  Trạng thái
                </th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in rows"
                :key="row.id"
                class="text-sm text-slate-600 transition hover:bg-slate-50/70"
              >
                <td class="border-b border-slate-100 px-4 py-4">
                  <input
                    :checked="selectedIds.includes(row.id)"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleRowSelection(row.id)"
                  />
                </td>
                <td
                  class="border-b border-slate-100 px-2 py-4 font-semibold text-[#6c63ff]"
                >
                  {{ row.order }}
                </td>
                <td
                  class="border-b border-slate-100 px-4 py-4 font-semibold text-slate-700"
                >
                  {{ row.name }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.description }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 text-center">
                  <span
                    class="inline-flex whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold"
                    :class="statusClassMap[row.status]"
                  >
                    {{ row.statusLabel }}
                  </span>
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  <div
                    class="flex items-center justify-center gap-3 text-slate-400"
                  >
                    <button
                      type="button"
                      class="transition hover:text-[#6c63ff]"
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                      @click="goToDetail(row.id)"
                    >
                      <MasterCriteriaIcon name="BxShow" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-amber-500"
                      title="Chỉnh sửa"
                      aria-label="Chỉnh sửa"
                      @click="goToEdit(row.id)"
                    >
                      <MasterCriteriaIcon name="BxEditAlt" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-sky-500"
                      title="Nhân bản"
                      aria-label="Nhân bản"
                      @click="duplicateRow(row.id)"
                    >
                      <MasterCriteriaIcon name="BxCopy" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      title="Xóa"
                      aria-label="Xóa"
                      @click="deleteRow(row.id)"
                    >
                      <MasterCriteriaIcon name="BxTrash" class-name="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="rows.length === 0">
                <td
                  colspan="6"
                  class="px-4 py-10 text-center text-sm text-slate-400"
                >
                  Không có bộ tiêu chí phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="flex justify-end border-t border-slate-100 pt-4"
        >
          <BasePagination
            :current="pagination.currentPage"
            :page-size="pagination.itemsPerPage"
            :total="pagination.totalItems"
            @change="changePage"
          />
        </div>
      </div>
    </section>
  </div>
=======
      <!-- Table Section -->
      <MasterCriteriaTable
        :data-source="rows"
        :loading="loading"
        :total="pagination.totalItems"
        :current="pagination.currentPage"
        :page-size="pagination.itemsPerPage"
        @view="goToDetail"
        @edit="goToEdit"
        @delete="deleteRow"
        @page-change="handlePageChange"
      />
    </AdminCard>
  </AdminPage>
>>>>>>> e3d5ebe15887ecefe7a224e6cb73a2e24468246d
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import MasterCriteriaFilter from '@/components/molecules/recruitment/MasterCriteriaFilter.vue'
import MasterCriteriaTable from '@/components/organisms/recruitment/MasterCriteriaTable.vue'
import {
  masterCriteriaService,
  type MasterCriteriaListItem,
  type MasterCriteriaStatus,
  type PaginationMeta,
  type MasterCriteriaSummary,
} from '@/services/recruitment/masterCriteria'

const router = useRouter()
const loading = ref(false)
const rows = ref<MasterCriteriaListItem[]>([])

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Bộ tiêu chí gốc', path: '/recruitment/evaluation-criteria/master-criteria' }
]

const filters = reactive({
  keyword: '',
  status: 'all' as 'all' | MasterCriteriaStatus,
})

const pagination = reactive<PaginationMeta>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
})

const summary = reactive<MasterCriteriaSummary>({
  total: 0,
  inUse: 0,
  unused: 0,
  active: 0,
})

const summaryHintClass = "text-[rgba(113,221,55,1)]";

const summaryCards = computed(() => [
  {
    label: "Tổng số bộ tiêu chí",
    value: summary.total,
    icon: "BxBarChartAlt2",
    iconWrapperClass: "bg-blue-50 text-blue-500",
  },
  {
    label: "Số bộ đang sử dụng",
    value: summary.inUse,
    hint: summary.total ? `(${Math.round((summary.inUse / summary.total) * 100)}%)` : "",
    hintClass: "text-green-500",
    icon: "BxCalendarCheck",
    iconWrapperClass: "bg-red-50 text-red-500",
  },
  {
    label: "Số bộ chưa sử dụng",
    value: summary.unused,
    hint: summary.total ? `(${Math.round((summary.unused / summary.total) * 100)}%)` : "",
    hintClass: "text-orange-500",
    icon: "BxLayers",
    iconWrapperClass: "bg-orange-50 text-orange-500",
  },
  {
    label: "Số bộ đang active",
    value: summary.active,
    hint: summary.total ? `(${Math.round((summary.active / summary.total) * 100)}%)` : "",
    hintClass: "text-yellow-500",
    icon: "BxCheckShield",
    iconWrapperClass: "bg-yellow-50 text-yellow-500",
  },
])

const loadRows = async () => {
  loading.value = true
  try {
    const response = await masterCriteriaService.list({
      keyword: filters.keyword,
      status: filters.status,
      page: pagination.currentPage,
      pageSize: pagination.itemsPerPage,
    })

    rows.value = response.data
    Object.assign(pagination, response.meta)
    Object.assign(summary, response.summary)
  } catch (error) {
    message.error('Không thể tải dữ liệu')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.currentPage = 1
  loadRows()
}

const handleReset = () => {
  filters.keyword = ''
  filters.status = 'all'
  handleSearch()
}

const handlePageChange = (page: number) => {
  pagination.currentPage = page
  loadRows()
}

const goToDeleted = () => {
  router.push({ name: "master-criteria-deleted" })
}

const goToCreate = () => {
  router.push({ name: "master-criteria-create" })
}

const goToDetail = (id: number) => {
  router.push({ name: "master-criteria-detail", params: { id } })
}

const goToEdit = (id: number) => {
  router.push({ name: "master-criteria-edit", params: { id } })
}

const deleteRow = (id: number) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa bộ tiêu chí này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await masterCriteriaService.softDelete(id)
        message.success('Xóa thành công')
        loadRows()
      } catch (error) {
        message.error('Xóa thất bại')
      }
    }
  })
}

onMounted(loadRows)
</script>
