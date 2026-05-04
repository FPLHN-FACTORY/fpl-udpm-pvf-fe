<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Bộ tiêu chí gốc đã xóa">
      <template #actions>
        <ButtonBack @click="goBack" />
      </template>

      <!-- Filter Section -->
      <MasterCriteriaFilter 
        v-model:filters="filters"
        @search="handleSearch"
        @reset="handleReset"
      />

      <!-- Table Section -->
      <MasterCriteriaTable
        is-deleted-view
        :data-source="rows"
        :loading="loading"
        :total="pagination.totalItems"
        :current="pagination.currentPage"
        :page-size="pagination.itemsPerPage"
        @view="goToDetail"
        @restore="restoreRow"
        @delete="hardDeleteRow"
        @page-change="handlePageChange"
      />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import MasterCriteriaFilter from '@/components/molecules/recruitment/MasterCriteriaFilter.vue'
import MasterCriteriaTable from '@/components/organisms/recruitment/MasterCriteriaTable.vue'
import {
  masterCriteriaService,
  type MasterCriteriaListItem,
  type MasterCriteriaStatus,
  type PaginationMeta,
} from '@/services/recruitment/masterCriteria'

const router = useRouter()
const loading = ref(false)
const rows = ref<MasterCriteriaListItem[]>([])

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Bộ tiêu chí gốc', path: '/recruitment/evaluation-criteria/master-criteria' },
  { title: 'Thùng rác', path: '' }
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

const loadRows = async () => {
  loading.value = true
  try {
    const response = await masterCriteriaService.listDeleted({
      keyword: filters.keyword,
      status: filters.status,
      page: pagination.currentPage,
      pageSize: pagination.itemsPerPage,
    })

    rows.value = response.data
    Object.assign(pagination, response.meta)
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

const goBack = () => router.push({ name: "master-criteria" })
const goToDetail = (id: number) => router.push({ name: "master-criteria-detail", params: { id } })

const restoreRow = async (id: number) => {
  try {
    await masterCriteriaService.restore(id)
    message.success('Khôi phục thành công')
    loadRows()
  } catch (error) {
    message.error('Khôi phục thất bại')
  }
}

const hardDeleteRow = (id: number) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn',
    content: 'Hành động này không thể hoàn tác! Bạn có chắc chắn muốn xóa vĩnh viễn bộ tiêu chí này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await masterCriteriaService.hardDelete(id)
        message.success('Xóa vĩnh viễn thành công')
        loadRows()
      } catch (error) {
        message.error('Xóa thất bại')
      }
    }
  })
}

onMounted(loadRows)
</script>
