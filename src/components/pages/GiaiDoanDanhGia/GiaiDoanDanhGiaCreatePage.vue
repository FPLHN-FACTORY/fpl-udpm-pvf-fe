<template>
  <KyTuyenSinhShell :breadcrumbs="['Đánh giá học viên', 'Giai đoạn đánh giá']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Thêm mới Giai đoạn đánh giá</h2>
        <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'evaluation-stages' })" />
      </div>
      <a-form layout="vertical" class="px-6 py-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-5">
          <a-form-item label="Tên hoạt động"><a-input v-model:value="form.activityName" class="kyts-input" placeholder="Tên hoạt động" /></a-form-item>
          <a-form-item label="Tên giai đoạn đánh giá"><a-select v-model:value="form.stageValue" class="kyts-select" placeholder="Tên giai đoạn đánh giá"><a-select-option v-for="option in options.stageOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <a-form-item label="Khóa"><a-select v-model:value="form.courseValue" class="kyts-select" placeholder="Khóa"><a-select-option v-for="option in options.courseOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <a-form-item label="Form áp dụng"><a-select v-model:value="form.formValue" class="kyts-select" placeholder="Form áp dụng"><a-select-option v-for="option in options.formOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <a-form-item label="Thời gian bắt đầu"><a-date-picker v-model:value="form.startDate" class="kyts-date" placeholder="Thời gian bắt đầu" /></a-form-item>
            <a-form-item label="Thời gian kết thúc"><a-date-picker v-model:value="form.endDate" class="kyts-date" placeholder="Thời gian kết thúc" /></a-form-item>
          </div>
          <a-form-item label="Trạng thái"><a-select v-model:value="form.status" class="kyts-select" placeholder="Trạng thái"><a-select-option v-for="option in options.statusOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
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
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { apiGiaiDoanDanhGia, type EvaluationStageFormOptions, type EvaluationStageStatusValue } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'
import KyTuyenSinhActionButton from '../KyTuyenSinh/components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhShell from '../KyTuyenSinh/components/KyTuyenSinhShell.vue'

interface FormState { activityName: string; stageValue: string | undefined; courseValue: string | undefined; formValue: string | undefined; startDate: Dayjs | null; endDate: Dayjs | null; status: EvaluationStageStatusValue | undefined }
const router = useRouter()
const options = ref<EvaluationStageFormOptions>({ stageOptions: [], courseOptions: [], formOptions: [], statusOptions: [] })
const createState = (): FormState => ({ activityName: '', stageValue: undefined, courseValue: undefined, formValue: undefined, startDate: null, endDate: null, status: undefined })
const form = reactive<FormState>(createState())
const resetForm = () => Object.assign(form, createState())
const validateForm = () => {
  if (!form.activityName.trim() || !form.stageValue || !form.courseValue || !form.formValue || !form.startDate || !form.endDate || !form.status) {
    message.error('Vui lòng nhập đầy đủ thông tin giai đoạn đánh giá.')
    return false
  }
  if (form.endDate.isBefore(form.startDate, 'day')) {
    message.error('Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu.')
    return false
  }
  return true
}
const handleSubmit = async () => {
  if (!validateForm()) return
  await apiGiaiDoanDanhGia.createStage({
    activityName: form.activityName,
    stageValue: form.stageValue,
    courseValue: form.courseValue,
    formValue: form.formValue,
    startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : null,
    endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : null,
    status: form.status
  })
  message.success('Thêm mới giai đoạn đánh giá thành công.')
  router.push({ name: 'dashboard' })
}
onMounted(async () => { options.value = await apiGiaiDoanDanhGia.getFormOptions() })
</script>
