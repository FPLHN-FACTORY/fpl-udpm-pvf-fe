<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h1 class="text-xl font-bold text-gray-800 tracking-tight">Danh sách Form đánh giá</h1>
          <div class="flex gap-3">
            <a-button @click="handleClickDeleted"
              class="flex items-center gap-2  !text-white hover:!bg-[#8592A3] hover:!border-gray-400 !bg-[#8592A3]/90">
              <template #icon><delete-outlined /></template>
              Danh Sách Đã Xóa
            </a-button>
            <a-button @click="handleClickAdd" type="primary" danger class="flex items-center gap-2">
              <template #icon><plus-outlined /></template>
              Thêm Mới
            </a-button>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
          <a-input v-model:value="searchText" placeholder="Tìm kiếm" class="!w-64" allow-clear />
          <a-select v-model:value="selectedStatus" placeholder="Chọn trạng thái" class="!w-52" allow-clear>
            <a-select-option value="active">Đang Hoạt động</a-select-option>
            <a-select-option value="inactive">Không Hoạt động</a-select-option>
            <a-select-option value="draft">Nháp</a-select-option>
          </a-select>
          <div class="flex-1" />
          <a-button type="primary" class="!bg-blue-600 hover:!bg-blue-700 flex items-center gap-2">
            <template #icon><search-outlined /></template>
            Tìm Kiếm
          </a-button>
          <a-button class="!border-gray-300 !text-gray-500">
            <template #icon><reload-outlined /></template>
          </a-button>
        </div>

        <!-- Table -->
        <a-table :columns="columns" :data-source="pagedData" :pagination="false" :row-selection="rowSelection"
          row-key="id" class="form-table">
          <!-- ID FORM -->
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'idForm'">
              <a class="text-blue-500 hover:text-blue-700 font-medium">{{ record.idForm }}</a>
            </template>

            <!-- TRẠNG THÁI -->
            <template v-else-if="column.key === 'trangThai'">
              <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="statusClass(record.trangThai)">
                {{ record.trangThai }}
              </span>
            </template>

            <!-- HÀNH ĐỘNG -->
            <template v-else-if="column.key === 'hanhDong'">
              <div class="flex items-center gap-3">
                <a-tooltip title="Xem chi tiết">
                  <eye-outlined class="text-gray-500 hover:text-blue-500 cursor-pointer text-base transition-colors"
                    @click="handleClickDetail(record.id)" />
                </a-tooltip>
                <a-tooltip title="Chỉnh sửa">
                  <edit-outlined class="text-gray-500 hover:text-green-500 cursor-pointer text-base transition-colors"
                    @click="handleEdit(record.id)" />
                </a-tooltip>
                <a-tooltip title="Xóa">
                  <a-popconfirm title="Bạn có chắc muốn xóa form này?" ok-text="Xóa" cancel-text="Hủy"
                    @confirm="handleDelete(record)">
                    <delete-outlined
                      class="text-gray-500 hover:text-red-500 cursor-pointer text-base transition-colors" />
                  </a-popconfirm>
                </a-tooltip>
              </div>
            </template>
          </template>
        </a-table>

        <!-- Pagination -->
        <div class="flex justify-end py-5 border-t border-gray-100">
          <a-pagination v-model:current="currentPage" :total="totalItems" :page-size="pageSize"
            :item-render="itemRender" show-less-items :show-size-changer="false" />
        </div>
      </div>
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router';
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter();

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Form đánh giá', path: '#' },
]

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormRecord {
  id: number
  idForm: string
  tenForm: string
  phienBan: string
  doTuoi: string
  tongDiem: number
  trangThai: string
}

// ─── State ────────────────────────────────────────────────────────────────────
const searchText = ref<string>('')
const selectedStatus = ref<string | undefined>(undefined)
const currentPage = ref<number>(3)
const pageSize = ref<number>(10)

// ─── Mock data ────────────────────────────────────────────────────────────────
const allData = ref<FormRecord[]>(
  Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    idForm: 'HS001',
    tenForm: 'Form đánh giá PVF U13',
    phienBan: 'v1.0',
    doTuoi: 'U13',
    tongDiem: 10,
    trangThai: i % 5 === 3 ? 'Không Hoạt động' : 'Đang Hoạt động',
  }))
)

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchSearch =
      !searchText.value ||
      item.tenForm.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.idForm.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus =
      !selectedStatus.value ||
      (selectedStatus.value === 'active' && item.trangThai === 'Đang Hoạt động') ||
      (selectedStatus.value === 'inactive' && item.trangThai === 'Không Hoạt động')
    return matchSearch && matchStatus
  })
})

const totalItems = computed(() => filteredData.value.length)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns: TableColumnsType = [
  {
    title: 'ID FORM',
    dataIndex: 'idForm',
    key: 'idForm',
    width: 120,
  },
  {
    title: 'TÊN FORM',
    dataIndex: 'tenForm',
    key: 'tenForm',
  },
  {
    title: 'PHIÊN BẢN',
    dataIndex: 'phienBan',
    key: 'phienBan',
    width: 120,
  },
  {
    title: 'ĐỘ TUỔI',
    dataIndex: 'doTuoi',
    key: 'doTuoi',
    width: 100,
  },
  {
    title: 'TỔNG ĐIỂM',
    dataIndex: 'tongDiem',
    key: 'tongDiem',
    width: 130,
  },
  {
    title: 'TRẠNG THÁI',
    dataIndex: 'trangThai',
    key: 'trangThai',
    width: 160,
  },
  {
    title: 'HÀNH ĐỘNG',
    key: 'hanhDong',
    width: 140,
    align: 'center',
  },
]

// ─── Row selection ─────────────────────────────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
  selectedRowKeys,
  onChange: (keys: number[]) => {
    selectedRowKeys.value = keys
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusClass = (status: string): string => {
  switch (status) {
    case 'Đang Hoạt động':
      return 'bg-[#71DD37]/20 text-[#71DD37]/90'
    case 'Không Hoạt động':
      return 'bg-red-100 text-red-500'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

// Custom pagination item render to match design (disabled page 5 style)
const itemRender = ({ page, type, originalElement }: any) => {
  if (type === 'page' && page === 5) {
    return h('span', { class: 'text-pink-400 font-medium cursor-not-allowed' }, page)
  }
  return originalElement
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleEdit = (id: string | number) => {
  router.push({
    name: "evaluation-form-edit",
    params: { id }
  })
}

const handleDelete = (record: FormRecord) => {
  allData.value = allData.value.filter((item) => item.id !== record.id)
  message.warning(`Đã xóa form: ${record.tenForm}`)
}

const handleClickDeleted = () => {
  router.push({
    name: "evaluation-form-deleted"
  })
}

const handleClickAdd = () => {
  router.push({
    name: "evaluation-form-add"
  })
}

const handleClickDetail = (id: string | number) => {
  router.push({
    name: "evaluation-form-detail",
    params: { id }
  })
}
</script>

<style scoped>
/* Override Ant Design table header styles */
:deep(.form-table .ant-table-thead > tr > th) {
  @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.form-table .ant-table-tbody > tr > td) {
  @apply border-b border-gray-100 text-gray-700;
}

:deep(.form-table .ant-table-tbody > tr:hover > td) {
  @apply bg-blue-50/40;
}

/* Pagination styling */
:deep(.ant-pagination-item-active) {
  @apply !bg-red-500 !border-red-500;
}

:deep(.ant-pagination-item-active a) {
  @apply !text-white;
}

:deep(.ant-pagination-item:not(.ant-pagination-item-active):hover) {
  @apply !border-blue-400;
}

:deep(.ant-pagination-item:not(.ant-pagination-item-active):hover a) {
  @apply !text-blue-500;
}

/* Button overrides */
:deep(.ant-btn-dangerous) {
  @apply !bg-red-500 !border-red-500;
}
</style>