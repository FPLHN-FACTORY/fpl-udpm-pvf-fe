<template>
  <KyTuyenSinhShell :breadcrumbs="['Đánh giá học viên', 'Giai đoạn đánh giá']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Chi tiết Giai đoạn đánh giá</h2>
        <div class="flex flex-wrap items-center gap-3">
          <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'evaluation-stages' })" />
          <KyTuyenSinhActionButton label="Chỉnh Sửa" tone="warning" @click="router.push({ name: 'evaluation-stages-edit', params: { id: route.params.id || '1' } })" />
        </div>
      </div>
      <div class="px-6 py-5">
        <div class="kyts-info-table">
          <div class="kyts-info-row"><div class="kyts-info-label">ID</div><div class="kyts-info-value">{{ detail?.id }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Tên giai đoạn đánh giá</div><div class="kyts-info-value">{{ detail?.stageName }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Khóa</div><div class="kyts-info-value">{{ detail?.courseName }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Form áp dụng</div><div class="kyts-info-value">{{ detail?.formName }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Thời gian bắt đầu</div><div class="kyts-info-value">{{ detail?.startAt }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Thời gian kết thúc</div><div class="kyts-info-value">{{ detail?.endAt }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Thời gian tạo</div><div class="kyts-info-value">{{ detail?.createdAt }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Thời gian cập nhật</div><div class="kyts-info-value">{{ detail?.updatedAt }}</div></div>
          <div class="kyts-info-row"><div class="kyts-info-label">Trạng thái</div><div class="kyts-info-value"><KyTuyenSinhStatusTag v-if="detail" :label="detail.statusLabel" :tone="detail.statusTone" /></div></div>
        </div>
      </div>
    </section>
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Danh sách Học viên đã đánh giá</h2>
        <KyTuyenSinhActionButton label="Thêm Mới" icon="BxPlus" tone="primary" />
      </div>
      <div class="space-y-5 px-6 py-5">
        <KyTuyenSinhFilterBar
          :status-options="statusOptions"
          :stage-options="stageOptions"
          :show-date="false"
          show-stage
          @search="noop"
          @reset="noop"
        />
        <div class="kyts-table overflow-hidden rounded-2xl border border-[#edf1f5]">
          <a-table :columns="columns" :data-source="students" :pagination="false" :scroll="{ x: 1000 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'order'"><span class="font-semibold text-[#696cff]">{{ record.order }}</span></template>
              <template v-else-if="column.key === 'statusLabel'"><KyTuyenSinhStatusTag :label="record.statusLabel" :tone="record.statusTone" /></template>
              <template v-else-if="column.key === 'actions'">
                <div class="flex items-center justify-center gap-3 text-[#8592a3]">
                  <NavIcon name="BxShow" class-name="h-[18px] w-[18px]" />
                  <NavIcon name="BxEdit" class-name="h-[18px] w-[18px]" />
                  <NavIcon name="BxTrash" class-name="h-[18px] w-[18px]" />
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TableColumnsType } from 'ant-design-vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'
import type { KyTuyenSinhFilterPayload, SelectOption } from '../../../types'
import { apiGiaiDoanDanhGia, type EvaluationStageDetailRecord, type EvaluationStageStudentRecord } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'
import KyTuyenSinhActionButton from '../KyTuyenSinh/components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhFilterBar from '../KyTuyenSinh/components/KyTuyenSinhFilterBar.vue'
import KyTuyenSinhShell from '../KyTuyenSinh/components/KyTuyenSinhShell.vue'
import KyTuyenSinhStatusTag from '../KyTuyenSinh/components/KyTuyenSinhStatusTag.vue'

const router = useRouter()
const route = useRoute()
const detail = ref<EvaluationStageDetailRecord | null>(null)
const students = ref<EvaluationStageStudentRecord[]>([])
const statusOptions = ref<SelectOption[]>([])
const stageOptions = ref<SelectOption[]>([])
const columns: TableColumnsType<EvaluationStageStudentRecord> = [
  { title: '#', key: 'order', dataIndex: 'order', width: 70 },
  { title: 'Học viên', key: 'studentName', dataIndex: 'studentName', width: 180 },
  { title: 'Mã học viên', key: 'studentCode', dataIndex: 'studentCode', width: 140 },
  { title: 'Giai đoạn', key: 'stageName', dataIndex: 'stageName', width: 180 },
  { title: 'Người đánh giá', key: 'evaluator', dataIndex: 'evaluator', width: 160 },
  { title: 'Tổng điểm', key: 'totalScore', dataIndex: 'totalScore', width: 130 },
  { title: 'Trạng thái', key: 'statusLabel', dataIndex: 'statusLabel', width: 140 },
  { title: 'Hành động', key: 'actions', width: 120, align: 'center' }
]
const noop = (_filters: KyTuyenSinhFilterPayload) => undefined
onMounted(async () => {
  const data = await apiGiaiDoanDanhGia.getStageDetail(String(route.params.id || '1'))
  detail.value = data.detail
  students.value = data.students
  statusOptions.value = data.statusOptions
  stageOptions.value = data.detail ? [{ label: data.detail.stageName, value: data.detail.key }] : []
})
</script>
