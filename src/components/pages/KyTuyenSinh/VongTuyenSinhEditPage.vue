<template>
  <KyTuyenSinhShell :breadcrumbs="['Quản lý tuyển sinh', 'Vòng tuyển sinh']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Điều chỉnh Vòng tuyển sinh</h2>
        <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'admission-rounds' })" />
      </div>

      <div class="space-y-6 px-6 py-6">
        <div class="grid grid-cols-1 gap-5">
          <a-select v-model:value="form.session" class="kyts-select" placeholder="Tuyển sinh 2025">
            <a-select-option v-for="option in formOptions.sessionOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>

          <a-select v-model:value="form.round" class="kyts-select" placeholder="Tên vòng thi">
            <a-select-option v-for="option in formOptions.roundOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>

          <a-select v-model:value="form.criteria" class="kyts-select" placeholder="Bộ tiêu chí snap cho vòng thi">
            <a-select-option v-for="option in formOptions.criteriaOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>

          <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <a-date-picker v-model:value="form.startDate" class="kyts-date" placeholder="Ngày bắt đầu vòng thi" />
            <a-date-picker v-model:value="form.endDate" class="kyts-date" placeholder="Ngày kết thúc vòng thi" />
          </div>

          <a-select v-model:value="form.status" class="kyts-select" placeholder="Hoạt động">
            <a-select-option v-for="option in formOptions.statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>
        </div>

        <section class="rounded-2xl border border-[#edf1f5] bg-white px-5 py-5">
          <h3 class="text-lg font-bold text-[#566a7f]">Bộ tiêu chí gốc</h3>

          <div class="mt-5 grid grid-cols-1 gap-4">
            <BaseInput v-model="criteriaMaster.name" label="Tên bộ tiêu chí" placeholder="Input" class="kyts-input" />
            <BaseInput v-model="criteriaMaster.status" label="Trạng thái" placeholder="Input" class="kyts-input" />
            <BaseTextarea v-model="criteriaMaster.description" label="Mô tả bộ tiêu chí" placeholder="Input" class="kyts-textarea" :rows="4" />
          </div>

          <div class="mt-8 space-y-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h4 class="text-base font-bold text-[#566a7f]">Các tiêu chí</h4>
              <KyTuyenSinhActionButton label="Thêm Tiêu Chí" tone="success" @click="addCriteriaLine" />
            </div>

            <div class="space-y-4">
              <div
                v-for="line in criteriaLines"
                :key="line.id"
                class="grid grid-cols-1 gap-4 rounded-2xl border border-[#edf1f5] p-4 xl:grid-cols-[1.2fr_1.2fr_0.8fr_auto]"
              >
                <BaseInput v-model="line.name" placeholder="Tên tiêu chí" class="kyts-input" />
                <BaseInput v-model="line.description" placeholder="Mô tả" class="kyts-input" />
                <BaseInput v-model="line.weight" placeholder="Trọng số %" class="kyts-input" />

                <button
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff2d6] text-[#ffab00] transition hover:bg-[#ffe7bb] hover:text-[#f09f00]"
                  @click="removeCriteriaLine(line.id)"
                >
                  <NavIcon name="BxTrash" class-name="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="flex flex-wrap justify-center gap-3">
          <KyTuyenSinhActionButton label="Cập Nhật" tone="primary" @click="handleUpdate" />
          <KyTuyenSinhActionButton label="Đặt Lại" tone="warning" @click="resetForm" />
        </div>
      </div>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '../../atoms/BaseInput.vue'
import BaseTextarea from '../../atoms/BaseTextarea.vue'
import NavIcon from '../../atoms/NavIcon.vue'
import {
  type CriteriaLine,
  type CriteriaMasterRecord,
  type KyTuyenSinhEditSeed,
  type KyTuyenSinhFormOptions,
  type RoundFormPayload
} from '../../../types'
import { apiVongTuyenSinh } from '../../../services/VongTuyenSinh/apiVongTuyenSinh'
import KyTuyenSinhActionButton from './components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhShell from './components/KyTuyenSinhShell.vue'

interface EditFormState {
  session: string | undefined
  round: string | undefined
  criteria: string | undefined
  startDate: Dayjs | null
  endDate: Dayjs | null
  status: string | undefined
}

const router = useRouter()
const route = useRoute()
const formOptions = ref<KyTuyenSinhFormOptions>({
  sessionOptions: [],
  roundOptions: [],
  criteriaOptions: [],
  statusOptions: []
})
const initialPayload = ref<KyTuyenSinhEditSeed | null>(null)

const createInitialState = (): EditFormState => ({
  session: undefined,
  round: undefined,
  criteria: undefined,
  startDate: null,
  endDate: null,
  status: undefined
})

const form = reactive<EditFormState>(createInitialState())
const criteriaMaster = reactive<CriteriaMasterRecord>({
  name: '',
  status: '',
  description: ''
})
const criteriaLines = ref<CriteriaLine[]>([])

const applyFormSeed = (seed: RoundFormPayload) => {
  form.session = seed.session
  form.round = seed.round
  form.criteria = seed.criteria
  form.startDate = seed.startDate ? dayjs(seed.startDate) : null
  form.endDate = seed.endDate ? dayjs(seed.endDate) : null
  form.status = seed.status
}

const applyEditPayload = (payload: KyTuyenSinhEditSeed) => {
  applyFormSeed(payload.form)
  criteriaMaster.name = payload.criteriaMaster.name
  criteriaMaster.status = payload.criteriaMaster.status
  criteriaMaster.description = payload.criteriaMaster.description
  criteriaLines.value = payload.criteriaLines.map((item) => ({ ...item }))
}

const resetForm = () => {
  if (!initialPayload.value) {
    Object.assign(form, createInitialState())
    return
  }

  applyEditPayload(initialPayload.value)
}

const addCriteriaLine = () => {
  criteriaLines.value.push({
    id: Date.now(),
    name: '',
    description: '',
    weight: ''
  })
}

const removeCriteriaLine = (id: number) => {
  if (criteriaLines.value.length === 1) {
    return
  }

  criteriaLines.value = criteriaLines.value.filter((item) => item.id !== id)
}

const validateEditPayload = () => {
  if (!form.session || !form.round || !form.criteria || !form.startDate || !form.endDate || !form.status) {
    message.error('Vui lòng nhập đầy đủ thông tin vòng tuyển sinh.')
    return false
  }

  if (form.endDate.isBefore(form.startDate, 'day')) {
    message.error('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.')
    return false
  }

  if (!criteriaMaster.name.trim() || !criteriaMaster.status.trim() || !criteriaMaster.description.trim()) {
    message.error('Vui lòng nhập đầy đủ thông tin bộ tiêu chí gốc.')
    return false
  }

  const hasInvalidLine = criteriaLines.value.some((item) => !item.name.trim() || !item.description.trim() || !item.weight.trim())
  if (hasInvalidLine) {
    message.error('Vui lòng nhập đầy đủ thông tin cho từng tiêu chí.')
    return false
  }

  return true
}

const handleUpdate = async () => {
  if (!validateEditPayload()) {
    return
  }

  apiVongTuyenSinh.updateAdmissionRound(String(route.params.id || '1'), {
    form: {
      session: form.session,
      round: form.round,
      criteria: form.criteria,
      startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : null,
      endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : null,
      status: form.status
    },
    criteriaMaster: {
      name: criteriaMaster.name,
      status: criteriaMaster.status,
      description: criteriaMaster.description
    },
    criteriaLines: criteriaLines.value.map((item) => ({ ...item }))
  })

  message.success('Cập nhật vòng tuyển sinh thành công.')
  router.push({ name: 'admission-rounds-detail', params: { id: route.params.id || '1' } })
}

onMounted(async () => {
  const data = await apiVongTuyenSinh.getEditFormData(String(route.params.id || '1'))
  formOptions.value = data.options
  initialPayload.value = data.initialData
  if (data.initialData) {
    applyEditPayload(data.initialData)
  }
})
</script>
