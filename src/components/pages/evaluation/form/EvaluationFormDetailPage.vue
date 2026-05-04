<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="space-y-5">

    <!-- ── BLOCK 1: Chi tiết Form ─────────────────────────────────────── -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h1 class="text-xl font-bold text-gray-800 tracking-tight">Chi tiết Form đánh giá</h1>
        <div class="flex gap-3">
          <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-600 !border-gray-300 !bg-[#ebedf0]">
            <template #icon><arrow-left-outlined /></template>
            Quay Lại
          </a-button>
          <a-button @click="handleEdit" class="flex items-center gap-1 !bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 hover:!border-yellow-500 font-semibold">
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <!-- Info rows -->
      <div class="divide-y divide-gray-100">
        <div
          v-for="field in detailFields"
          :key="field.label"
          class="flex items-center px-6 py-4"
        >
          <span class="w-56 text-sm font-semibold text-gray-700 shrink-0">{{ field.label }}</span>
          <span class="text-sm text-gray-600">{{ field.value }}</span>
        </div>
      </div>
    </div>

    <!-- ── BLOCK 2: Danh sách Tiêu chí đánh giá ─────────────────────── -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 tracking-tight">Danh sách Tiêu chí đánh giá</h2>
      </div>

      <a-table
        :columns="criteriaColumns"
        :data-source="criteriaData"
        :pagination="false"
        :row-selection="rowSelection"
        row-key="id"
        class="criteria-table"
      >
        <template #bodyCell="{ column, record }">
          <!-- ID -->
          <template v-if="column.key === 'idTieuChi'">
            <a class="text-blue-500 hover:text-blue-700 font-medium">{{ record.idTieuChi }}</a>
          </template>

          <!-- Trạng thái -->
          <template v-else-if="column.key === 'trangThai'">
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :class="statusClass(record.trangThai)"
            >
              {{ record.trangThai }}
            </span>
          </template>
        </template>
      </a-table>
    </div>

    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import type { TableColumnsType } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Form đánh giá', path: '#' },
]

const idEvaluationForm = router.currentRoute.value.params.id as string
// ─── Types ────────────────────────────────────────────────────────────────────
interface DetailField {
  label: string
  value: string
}

interface CriteriaRecord {
  id: number
  idTieuChi: string
  tenTieuChi: string
  diemToiDa: number
  trongSo: string
  trangThai: string
}

// ─── Detail fields ─────────────────────────────────────────────────────────
const detailFields: DetailField[] = [
  { label: 'ID',                value: 'HS001' },
  { label: 'Tên Form',          value: 'Form đánh giá PVF U13' },
  { label: 'Phiên bản',         value: 'v1.0' },
  { label: 'Độ tuổi',           value: 'U13' },
  { label: 'Tổng điểm',         value: '10' },
  { label: 'Thời gian tạo',     value: '10/01/2025 09:00' },
  { label: 'Thời gian cập nhật',value: '12/01/2025 14:30' },
  { label: 'Trạng thái',        value: 'Đang hoạt động' },
]

// ─── Criteria table ────────────────────────────────────────────────────────
const criteriaColumns: TableColumnsType = [
  { title: 'ID TIÊU CHÍ', dataIndex: 'idTieuChi', key: 'idTieuChi', width: 140 },
  { title: 'TÊN TIÊU CHÍ', dataIndex: 'tenTieuChi', key: 'tenTieuChi' },
  { title: 'ĐIỂM TỐI ĐA', dataIndex: 'diemToiDa', key: 'diemToiDa', width: 140 },
  { title: 'TRỌNG SỐ', dataIndex: 'trongSo', key: 'trongSo', width: 120 },
  { title: 'TRẠNG THÁI', dataIndex: 'trangThai', key: 'trangThai', width: 160 },
]

const criteriaData = ref<CriteriaRecord[]>([
  { id: 1, idTieuChi: 'HS001', tenTieuChi: 'Thể lực', diemToiDa: 10, trongSo: '25%', trangThai: 'Đang Hoạt động' },
  { id: 2, idTieuChi: 'HS001', tenTieuChi: 'Thể lực', diemToiDa: 10, trongSo: '25%', trangThai: 'Đang Hoạt động' },
  { id: 3, idTieuChi: 'HS001', tenTieuChi: 'Thể lực', diemToiDa: 10, trongSo: '25%', trangThai: 'Đang Hoạt động' },
])

// ─── Row selection ─────────────────────────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
  selectedRowKeys,
  onChange: (keys: number[]) => { selectedRowKeys.value = keys },
}

// ─── Helpers ───────────────────────────────────────────────────────────────
const statusClass = (status: string): string => {
  switch (status) {
    case 'Đang Hoạt động': return 'bg-green-100 text-green-700'
    case 'Không Hoạt động': return 'bg-red-100 text-red-600'
    default: return 'bg-gray-100 text-gray-500'
  }
}

// ─── Actions ───────────────────────────────────────────────────────────────
const handleBack = () => router.push({ name: "evaluation-forms" })
const handleEdit = () => router.push({ name: "evaluation-form-edit", params: { id: idEvaluationForm } })
</script>

<style scoped>
:deep(.criteria-table .ant-table-thead > tr > th) {
  @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.criteria-table .ant-table-tbody > tr > td) {
  @apply border-b border-gray-100 text-gray-700;
}

:deep(.criteria-table .ant-table-tbody > tr:hover > td) {
  @apply bg-blue-50/40;
}
</style>