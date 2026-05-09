<template>
  <KyTuyenSinhShell :breadcrumbs="['Quản lý tuyển sinh', 'Vòng tuyển sinh']">
    <KyTuyenSinhMetricCards :items="roundMetrics" />

    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh</h2>

        <div class="flex flex-wrap items-center gap-3">
          <KyTuyenSinhActionButton
            label="Danh Sách Đã Xóa"
            icon="BxTrash"
            tone="neutral"
            @click="router.push({ name: 'admission-rounds-deleted' })"
          />
          <KyTuyenSinhActionButton
            label="Thêm Mới"
            icon="BxPlus"
            tone="primary"
            @click="router.push({ name: 'admission-rounds-create' })"
          />
        </div>
      </div>

      <div class="space-y-5 px-6 py-5">
        <KyTuyenSinhFilterBar
          :status-options="statusOptions"
          @search="handleSearch"
          @reset="handleReset"
        />

        <div class="kyts-table overflow-hidden rounded-2xl border border-[#edf1f5]">
          <a-table
            :columns="columns"
            :data-source="admissionRounds.items"
            :pagination="false"
            :row-selection="rowSelection"
            :scroll="{ x: 1080 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'order'">
                <span class="font-semibold text-[#696cff]">{{ record.order }}</span>
              </template>

              <template v-else-if="column.key === 'statusLabel'">
                <KyTuyenSinhStatusTag :label="record.statusLabel" :tone="record.statusTone" />
              </template>

              <template v-else-if="column.key === 'actions'">
                <div class="flex items-center justify-center gap-3 text-[#8592a3]">
                  <button class="transition hover:text-[#566a7f]" @click="goDetail(record.key)">
                    <NavIcon name="BxShow" class-name="h-[18px] w-[18px]" />
                  </button>
                  <button class="transition hover:text-[#566a7f]" @click="goEdit(record.key)">
                    <NavIcon name="BxEdit" class-name="h-[18px] w-[18px]" />
                  </button>
                  <button class="transition hover:text-[#ef2b2d]" @click="moveToDeleted(record.key)">
                    <NavIcon name="BxTrash" class-name="h-[18px] w-[18px]" />
                  </button>
                </div>
              </template>
            </template>
          </a-table>

          <div class="kyts-pagination flex justify-end border-t border-[#edf1f5] px-5 py-4">
            <a-pagination
              :current="admissionRounds.page"
              :total="admissionRounds.total"
              :page-size="admissionRounds.pageSize"
              show-less-items
              @change="handlePageChange"
            />
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
import NavIcon from '../../atoms/icons/NavIcon.vue'
import {
  type AdmissionRoundListQuery,
  type AdmissionRoundRecord,
  type KyTuyenSinhFilterPayload,
  type MetricCardItem,
  type PaginationResult,
  type SelectOption
} from '../../../types'
import { apiVongTuyenSinh } from '../../../services/VongTuyenSinh/apiVongTuyenSinh'
import KyTuyenSinhActionButton from './components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhFilterBar from './components/KyTuyenSinhFilterBar.vue'
import KyTuyenSinhMetricCards from './components/KyTuyenSinhMetricCards.vue'
import KyTuyenSinhShell from './components/KyTuyenSinhShell.vue'
import KyTuyenSinhStatusTag from './components/KyTuyenSinhStatusTag.vue'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])
const roundMetrics = ref<MetricCardItem[]>([])
const admissionRounds = ref<PaginationResult<AdmissionRoundRecord>>({
  items: [],
  total: 0,
  page: 1,
  pageSize: 10
})
const statusOptions = ref<SelectOption[]>([])
const listQuery = ref<AdmissionRoundListQuery>({
  keyword: '',
  date: null,
  status: undefined,
  page: 1,
  pageSize: 10
})

const columns: TableColumnsType<AdmissionRoundRecord> = [
  { title: '#', key: 'order', dataIndex: 'order', width: 70 },
  { title: 'Kỳ tuyển sinh', key: 'sessionName', dataIndex: 'sessionName', ellipsis: true },
  { title: 'Tên vòng thi', key: 'roundName', dataIndex: 'roundName', ellipsis: true },
  { title: 'Ngày bắt đầu thi', key: 'startDate', dataIndex: 'startDate', width: 150 },
  { title: 'Ngày kết thúc thi', key: 'endDate', dataIndex: 'endDate', width: 150 },
  { title: 'Trạng thái', key: 'statusLabel', dataIndex: 'statusLabel', width: 160 },
  { title: 'Hành động', key: 'actions', width: 120, align: 'center' }
]

const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[]) => {
    selectedRowKeys.value = keys
  }
}))

const goDetail = (id: string) => {
  router.push({ name: 'admission-rounds-detail', params: { id } })
}

const goEdit = (id: string) => {
  router.push({ name: 'admission-rounds-edit', params: { id } })
}

const loadRounds = async () => {
  const data = await apiVongTuyenSinh.getAdmissionRounds(listQuery.value)
  roundMetrics.value = data.metrics
  admissionRounds.value = data.rounds
  statusOptions.value = data.statusOptions
  listQuery.value.page = data.rounds.page
  listQuery.value.pageSize = data.rounds.pageSize
}

const handleSearch = async (filters: KyTuyenSinhFilterPayload) => {
  listQuery.value = {
    ...listQuery.value,
    keyword: filters.keyword,
    date: filters.date,
    status: filters.status,
    page: 1
  }

  await loadRounds()
}

const handleReset = async (filters: KyTuyenSinhFilterPayload) => {
  listQuery.value = {
    ...listQuery.value,
    keyword: filters.keyword,
    date: filters.date,
    status: filters.status,
    page: 1
  }

  await loadRounds()
}

const handlePageChange = async (page: number, pageSize: number) => {
  listQuery.value = {
    ...listQuery.value,
    page,
    pageSize
  }

  await loadRounds()
}

const moveToDeleted = async (id: string) => {
  apiVongTuyenSinh.softDeleteAdmissionRound(id)
  message.success('Đã chuyển vòng tuyển sinh vào danh sách đã xóa.')
  await loadRounds()
}

onMounted(async () => {
  await loadRounds()
})
</script>
