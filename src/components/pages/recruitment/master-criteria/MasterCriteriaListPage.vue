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

    <!-- Main Content Card -->
    <AdminCard title="Danh sách Bộ tiêu chí gốc">
      <template #actions>
        <ButtonDeleteList @click="goToDeleted" />
        <ButtonAdd @click="goToCreate" />
      </template>

      <!-- Filter Section -->
      <MasterCriteriaFilter 
        v-model:filters="filters"
        @search="handleSearch"
        @reset="handleReset"
      />

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
