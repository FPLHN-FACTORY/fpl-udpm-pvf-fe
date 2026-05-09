<template>
  <KyTuyenSinhShell :breadcrumbs="['Quản lý tuyển sinh', 'Vòng tuyển sinh']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Thêm mới Vòng tuyển sinh</h2>
        <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'admission-rounds' })" />
      </div>

      <a-form layout="vertical" class="kyts-form-grid px-6 py-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-5">
          <a-form-item label="Kỳ tuyển sinh">
            <a-select v-model:value="form.session" class="kyts-select" placeholder="Kỳ tuyển sinh">
              <a-select-option v-for="option in formOptions.sessionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Tên vòng thi">
            <a-select v-model:value="form.round" class="kyts-select" placeholder="Tên vòng thi">
              <a-select-option v-for="option in formOptions.roundOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Bộ tiêu chí snap cho vòng thi">
            <a-select v-model:value="form.criteria" class="kyts-select" placeholder="Bộ tiêu chí snap cho vòng thi">
              <a-select-option v-for="option in formOptions.criteriaOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <a-form-item label="Ngày bắt đầu vòng thi">
              <a-date-picker v-model:value="form.startDate" class="kyts-date" placeholder="Ngày bắt đầu vòng thi" />
            </a-form-item>

            <a-form-item label="Ngày kết thúc vòng thi">
              <a-date-picker v-model:value="form.endDate" class="kyts-date" placeholder="Ngày kết thúc vòng thi" />
            </a-form-item>
          </div>

          <a-form-item label="Trạng thái">
            <a-select v-model:value="form.status" class="kyts-select" placeholder="Trạng thái">
              <a-select-option v-for="option in formOptions.statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div class="mt-2 flex flex-wrap justify-center gap-3">
          <KyTuyenSinhActionButton label="Thêm Mới" tone="primary" native-type="submit" />
          <KyTuyenSinhActionButton label="Đặt Lại" tone="warning" @click="resetForm" />
        </div>
      </a-form>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { KyTuyenSinhFormOptions, RoundFormPayload } from '../../../types'
import { apiVongTuyenSinh } from '../../../services/VongTuyenSinh/apiVongTuyenSinh'
import KyTuyenSinhActionButton from './components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhShell from './components/KyTuyenSinhShell.vue'

interface CreateFormState {
  session: string | undefined
  round: string | undefined
  criteria: string | undefined
  startDate: Dayjs | null
  endDate: Dayjs | null
  status: string | undefined
}

const router = useRouter()
const formOptions = ref<KyTuyenSinhFormOptions>({
  sessionOptions: [],
  roundOptions: [],
  criteriaOptions: [],
  statusOptions: []
})
const initialFormSeed = ref<RoundFormPayload>({
  session: undefined,
  round: undefined,
  criteria: undefined,
  startDate: null,
  endDate: null,
  status: undefined
})

const createInitialState = (): CreateFormState => ({
  session: undefined,
  round: undefined,
  criteria: undefined,
  startDate: null,
  endDate: null,
  status: undefined
})

const form = reactive<CreateFormState>(createInitialState())

const applyFormSeed = (seed: RoundFormPayload) => {
  form.session = seed.session
  form.round = seed.round
  form.criteria = seed.criteria
  form.startDate = seed.startDate ? dayjs(seed.startDate) : null
  form.endDate = seed.endDate ? dayjs(seed.endDate) : null
  form.status = seed.status
}

const resetForm = () => {
  applyFormSeed(initialFormSeed.value)
}

const validateForm = () => {
  if (!form.session || !form.round || !form.criteria || !form.startDate || !form.endDate || !form.status) {
    message.error('Vui lòng nhập đầy đủ thông tin vòng tuyển sinh.')
    return false
  }

  if (form.endDate.isBefore(form.startDate, 'day')) {
    message.error('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.')
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  apiVongTuyenSinh.createAdmissionRound({
    form: {
      session: form.session,
      round: form.round,
      criteria: form.criteria,
      startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : null,
      endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : null,
      status: form.status
    }
  })

  message.success('Thêm mới vòng tuyển sinh thành công.')
  router.push({ name: 'dashboard' })
}

onMounted(async () => {
  const data = await apiVongTuyenSinh.getCreateFormData()
  formOptions.value = data.options
  initialFormSeed.value = data.initialForm
  applyFormSeed(data.initialForm)
})
</script>
