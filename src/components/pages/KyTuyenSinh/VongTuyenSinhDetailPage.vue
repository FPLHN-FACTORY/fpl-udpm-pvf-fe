<template>
  <KyTuyenSinhShell :breadcrumbs="['Quản lý tuyển sinh', 'Vòng tuyển sinh']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Chi tiết Vòng tuyển sinh</h2>

        <div class="flex flex-wrap items-center gap-3">
          <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'admission-rounds' })" />
          <KyTuyenSinhActionButton label="Chỉnh Sửa" tone="warning" @click="router.push({ name: 'admission-rounds-edit', params: { id: route.params.id || '1' } })" />
        </div>
      </div>

      <div class="space-y-6 px-6 py-5">
        <div class="kyts-info-table">
          <div class="kyts-info-row">
            <div class="kyts-info-label">Kỳ tuyển sinh</div>
            <div class="kyts-info-value">{{ roundDetail?.sessionName }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Tên vòng thi</div>
            <div class="kyts-info-value">{{ roundDetail?.roundName }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Bộ tiêu chí snap</div>
            <div class="kyts-info-value">{{ roundDetail?.criteriaName }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Ngày bắt đầu vòng thi</div>
            <div class="kyts-info-value">{{ roundDetail?.startDate }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Ngày kết thúc vòng thi</div>
            <div class="kyts-info-value">{{ roundDetail?.endDate }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Thời gian tạo trung tâm</div>
            <div class="kyts-info-value">{{ roundDetail?.centerDeadline }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Thời gian cập nhật trung tâm</div>
            <div class="kyts-info-value">{{ roundDetail?.updatedAt }}</div>
          </div>
          <div class="kyts-info-row">
            <div class="kyts-info-label">Trạng thái</div>
            <div class="kyts-info-value">
              <KyTuyenSinhStatusTag
                v-if="roundDetail"
                :label="roundDetail.statusLabel"
                :tone="roundDetail.statusTone"
              />
            </div>
          </div>
        </div>

        <KyTuyenSinhMetricCards :items="detailMetrics" />

        <section class="rounded-2xl border border-[#edf1f5] bg-white">
          <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <h3 class="text-lg font-bold text-[#566a7f]">Danh sách Bộ tiêu chí gốc</h3>
            <KyTuyenSinhActionButton label="Thêm Mới" icon="BxPlus" tone="primary" @click="goEdit" />
          </div>

          <div class="space-y-5 px-5 py-5">
            <KyTuyenSinhFilterBar
              :status-options="statusOptions"
              :show-date="false"
              @search="handleCriteriaSearch"
              @reset="handleCriteriaReset"
            />

            <div class="kyts-table overflow-hidden rounded-2xl border border-[#edf1f5]">
              <a-table :columns="columns" :data-source="criteriaRecords" :pagination="false" :scroll="{ x: 920 }">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'order'">
                    <span class="font-semibold text-[#696cff]">{{ record.order }}</span>
                  </template>

                  <template v-else-if="column.key === 'statusLabel'">
                    <KyTuyenSinhStatusTag :label="record.statusLabel" :tone="record.statusTone" />
                  </template>

                  <template v-else-if="column.key === 'actions'">
                    <div class="flex items-center justify-center gap-3 text-[#8592a3]">
                      <button class="transition hover:text-[#566a7f]" @click="goEdit">
                        <NavIcon name="BxShow" class-name="h-[18px] w-[18px]" />
                      </button>
                      <button class="transition hover:text-[#566a7f]" @click="goEdit">
                        <NavIcon name="BxEdit" class-name="h-[18px] w-[18px]" />
                      </button>
                    </div>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
        </section>
      </div>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import NavIcon from '../../atoms/NavIcon.vue'
import {
  type AdmissionRoundDetailRecord,
  type CriteriaListQuery,
  type CriteriaRecord,
  type KyTuyenSinhFilterPayload,
  type MetricCardItem,
  type SelectOption
} from '../../../types'
import { apiVongTuyenSinh } from '../../../services/VongTuyenSinh/apiVongTuyenSinh'
import KyTuyenSinhActionButton from './components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhFilterBar from './components/KyTuyenSinhFilterBar.vue'
import KyTuyenSinhMetricCards from './components/KyTuyenSinhMetricCards.vue'
import KyTuyenSinhShell from './components/KyTuyenSinhShell.vue'
import KyTuyenSinhStatusTag from './components/KyTuyenSinhStatusTag.vue'

const router = useRouter()
const route = useRoute()
const roundDetail = ref<AdmissionRoundDetailRecord | null>(null)
const detailMetrics = ref<MetricCardItem[]>([])
const criteriaRecords = ref<CriteriaRecord[]>([])
const statusOptions = ref<SelectOption[]>([])
const criteriaQuery = ref<CriteriaListQuery>({
  keyword: '',
  status: undefined
})

const columns: TableColumnsType<CriteriaRecord> = [
  { title: '#', key: 'order', dataIndex: 'order', width: 70 },
  { title: 'Tên bộ tiêu chí', key: 'name', dataIndex: 'name', width: 220 },
  { title: 'Mô tả bộ tiêu chí', key: 'description', dataIndex: 'description', ellipsis: true },
  { title: 'Trạng thái', key: 'statusLabel', dataIndex: 'statusLabel', width: 150 },
  { title: 'Hành động', key: 'actions', width: 120, align: 'center' }
]

const goEdit = () => {
  router.push({ name: 'admission-rounds-edit', params: { id: route.params.id || '1' } })
}

const loadDetail = async () => {
  const data = await apiVongTuyenSinh.getAdmissionRoundDetailPage(
    String(route.params.id || '1'),
    criteriaQuery.value
  )
  roundDetail.value = data.detail
  detailMetrics.value = data.metrics
  criteriaRecords.value = data.criteriaRecords
  statusOptions.value = data.statusOptions
}

const handleCriteriaSearch = async (filters: KyTuyenSinhFilterPayload) => {
  criteriaQuery.value = {
    keyword: filters.keyword,
    status: filters.status
  }

  await loadDetail()
}

const handleCriteriaReset = async () => {
  criteriaQuery.value = {
    keyword: '',
    status: undefined
  }

  await loadDetail()
}

onMounted(async () => {
  await loadDetail()
})
</script>
