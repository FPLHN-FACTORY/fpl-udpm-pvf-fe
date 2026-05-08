<template>
  <KyTuyenSinhShell :breadcrumbs="['Quản lý tuyển sinh', 'Vòng tuyển sinh']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh đã xóa</h2>
        <KyTuyenSinhActionButton label="Quay Lại" tone="neutral" @click="router.push({ name: 'admission-rounds' })" />
      </div>

      <div class="space-y-5 px-6 py-5">
        <KyTuyenSinhFilterBar
          :status-options="deletedStatusOptions"
          @search="handleSearch"
          @reset="handleReset"
        />

        <div class="kyts-table overflow-hidden rounded-2xl border border-[#edf1f5]">
          <a-table
            :columns="columns"
            :data-source="deletedAdmissionRounds.items"
            :pagination="false"
            :row-selection="rowSelection"
            :scroll="{ x: 1160 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'order'">
                <span class="font-semibold text-[#696cff]">{{ record.order }}</span>
              </template>

              <template v-else-if="column.key === 'actions'">
                <div class="flex items-center justify-center gap-3 text-[#8592a3]">
                  <button class="transition hover:text-[#566a7f]" @click="goDetail(record.key)">
                    <NavIcon name="BxShow" class-name="h-[18px] w-[18px]" />
                  </button>
                  <button class="transition hover:text-[#696cff]" @click="restoreRound(record.key)">
                    <NavIcon name="BxReset" class-name="h-[18px] w-[18px]" />
                  </button>
                  <button class="transition hover:text-[#ef2b2d]" @click="removeRound(record.key)">
                    <NavIcon name="BxTrash" class-name="h-[18px] w-[18px]" />
                  </button>
                </div>
              </template>
            </template>
          </a-table>

          <div class="kyts-pagination flex justify-end border-t border-[#edf1f5] px-5 py-4">
            <a-pagination
              :current="deletedAdmissionRounds.page"
              :total="deletedAdmissionRounds.total"
              :page-size="deletedAdmissionRounds.pageSize"
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
import NavIcon from '../../atoms/NavIcon.vue'
import {
  type AdmissionRoundListQuery,
  type AdmissionRoundRecord,
  type KyTuyenSinhFilterPayload,
  type PaginationResult,
  type SelectOption
} from '../../../types'
import { apiVongTuyenSinh } from '../../../services/VongTuyenSinh/apiVongTuyenSinh'
import KyTuyenSinhActionButton from './components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhFilterBar from './components/KyTuyenSinhFilterBar.vue'
import KyTuyenSinhShell from './components/KyTuyenSinhShell.vue'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])
const deletedAdmissionRounds = ref<PaginationResult<AdmissionRoundRecord>>({
  items: [],
  total: 0,
  page: 1,
  pageSize: 10
})
const deletedStatusOptions = ref<SelectOption[]>([])
const deletedQuery = ref<AdmissionRoundListQuery>({
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
  { title: 'Ngày xóa', key: 'deletedAt', dataIndex: 'deletedAt', width: 150 },
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

const loadDeletedRounds = async () => {
  const data = await apiVongTuyenSinh.getDeletedAdmissionRounds(deletedQuery.value)
  deletedAdmissionRounds.value = data.rounds
  deletedStatusOptions.value = data.statusOptions
  deletedQuery.value.page = data.rounds.page
  deletedQuery.value.pageSize = data.rounds.pageSize
}

const handleSearch = async (filters: KyTuyenSinhFilterPayload) => {
  deletedQuery.value = {
    ...deletedQuery.value,
    keyword: filters.keyword,
    date: filters.date,
    status: filters.status,
    page: 1
  }

  await loadDeletedRounds()
}

const handleReset = async (filters: KyTuyenSinhFilterPayload) => {
  deletedQuery.value = {
    ...deletedQuery.value,
    keyword: filters.keyword,
    date: filters.date,
    status: filters.status,
    page: 1
  }

  await loadDeletedRounds()
}

const handlePageChange = async (page: number, pageSize: number) => {
  deletedQuery.value = {
    ...deletedQuery.value,
    page,
    pageSize
  }

  await loadDeletedRounds()
}

const restoreRound = async (id: string) => {
  apiVongTuyenSinh.restoreAdmissionRound(id)
  message.success('Khôi phục vòng tuyển sinh thành công.')
  await loadDeletedRounds()
}

const removeRound = async (id: string) => {
  apiVongTuyenSinh.removeDeletedAdmissionRound(id)
  message.success('Đã xóa vĩnh viễn vòng tuyển sinh.')
  await loadDeletedRounds()
}

onMounted(async () => {
  await loadDeletedRounds()
})
</script>
