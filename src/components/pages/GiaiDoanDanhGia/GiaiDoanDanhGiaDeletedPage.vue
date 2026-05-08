<template>
  <KyTuyenSinhShell :breadcrumbs="['Đánh giá học viên', 'Giai đoạn đánh giá']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Danh sách Giai đoạn đánh giá đã xóa</h2>
        <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'evaluation-stages' })" />
      </div>
      <div class="space-y-5 px-6 py-5">
        <KyTuyenSinhFilterBar
          :assignee-options="assigneeOptions"
          :status-options="statusOptions"
          show-assignee
          @search="handleSearch"
          @reset="handleReset"
        />
        <div class="kyts-table overflow-hidden rounded-2xl border border-[#edf1f5]">
          <a-table :columns="columns" :data-source="stages.items" :pagination="false" :row-selection="rowSelection" :scroll="{ x: 1160 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'order'"><span class="font-semibold text-[#696cff]">{{ record.order }}</span></template>
              <template v-else-if="column.key === 'actions'">
                <div class="flex items-center justify-center gap-3 text-[#8592a3]">
                  <button class="transition hover:text-[#566a7f]" @click="goDetail(record.key)"><NavIcon name="BxShow" class-name="h-[18px] w-[18px]" /></button>
                  <button class="transition hover:text-[#696cff]" @click="restoreStage(record.key)"><NavIcon name="BxReset" class-name="h-[18px] w-[18px]" /></button>
                  <button class="transition hover:text-[#ef2b2d]" @click="removeStage(record.key)"><NavIcon name="BxTrash" class-name="h-[18px] w-[18px]" /></button>
                </div>
              </template>
            </template>
          </a-table>
          <div class="kyts-pagination flex justify-end border-t border-[#edf1f5] px-5 py-4">
            <a-pagination :current="stages.page" :total="stages.total" :page-size="stages.pageSize" show-less-items @change="handlePageChange" />
          </div>
        </div>
      </div>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import NavIcon from '../../atoms/NavIcon.vue'
import type { KyTuyenSinhFilterPayload, PaginationResult, SelectOption } from '../../../types'
import { apiGiaiDoanDanhGia, type EvaluationStageListQuery, type EvaluationStageRecord } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'
import KyTuyenSinhActionButton from '../KyTuyenSinh/components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhFilterBar from '../KyTuyenSinh/components/KyTuyenSinhFilterBar.vue'
import KyTuyenSinhShell from '../KyTuyenSinh/components/KyTuyenSinhShell.vue'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])
const statusOptions = ref<SelectOption[]>([])
const assigneeOptions = ref<SelectOption[]>([
  { label: 'HLV A', value: 'hlv-a' },
  { label: 'HLV B', value: 'hlv-b' }
])
const stages = ref<PaginationResult<EvaluationStageRecord>>({ items: [], total: 0, page: 1, pageSize: 10 })
const query = ref<EvaluationStageListQuery>({ keyword: '', date: null, status: undefined, page: 1, pageSize: 10 })
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
const handleSearch = async (filters: KyTuyenSinhFilterPayload) => {
  query.value = { ...query.value, keyword: filters.keyword, date: filters.date, status: filters.status, page: 1 }
  await loadStages()
}
const handleReset = async (filters: KyTuyenSinhFilterPayload) => {
  query.value = { ...query.value, keyword: filters.keyword, date: filters.date, status: filters.status, page: 1 }
  await loadStages()
}
const handlePageChange = async (page: number, pageSize: number) => {
  query.value = { ...query.value, page, pageSize }
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
