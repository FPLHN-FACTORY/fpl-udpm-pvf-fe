<template>
  <KyTuyenSinhShell :breadcrumbs="['Đánh giá học viên', 'Giai đoạn đánh giá']">
    <section class="kyts-surface rounded-2xl bg-white">
      <div class="flex flex-col gap-4 border-b border-[#edf1f5] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-xl font-bold text-[#566a7f]">Điều chỉnh Giai đoạn đánh giá</h2>
        <KyTuyenSinhActionButton label="Quay Lại" icon="BxChevronLeft" tone="light" @click="router.push({ name: 'evaluation-stages' })" />
      </div>
      <a-form layout="vertical" class="px-6 py-6" @submit.prevent="handleUpdate">
        <div class="grid grid-cols-1 gap-5">
          <a-form-item label="Tên hoạt động"><a-input v-model:value="form.activityName" class="kyts-input" placeholder="Input" /></a-form-item>
          <a-form-item label="Tên giai đoạn đánh giá"><a-select v-model:value="form.stageValue" class="kyts-select" placeholder="Input"><a-select-option v-for="option in options.stageOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <a-form-item label="Khóa"><a-select v-model:value="form.courseValue" class="kyts-select" placeholder="Input"><a-select-option v-for="option in options.courseOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <a-form-item label="Form áp dụng"><a-select v-model:value="form.formValue" class="kyts-select" placeholder="Input"><a-select-option v-for="option in options.formOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
          <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <a-form-item label="Thời gian bắt đầu"><a-date-picker v-model:value="form.startDate" class="kyts-date" placeholder="Input" /></a-form-item>
            <a-form-item label="Thời gian kết thúc"><a-date-picker v-model:value="form.endDate" class="kyts-date" placeholder="Input" /></a-form-item>
          </div>
          <a-form-item label="Trạng thái"><a-select v-model:value="form.status" class="kyts-select" placeholder="Input"><a-select-option v-for="option in options.statusOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
        </div>
        <div class="mt-2 flex flex-wrap justify-center gap-3">
          <KyTuyenSinhActionButton label="Cập Nhật" tone="primary" native-type="submit" />
          <KyTuyenSinhActionButton label="Đặt Lại" tone="warning" @click="loadForm" />
        </div>
      </a-form>
    </section>
  </KyTuyenSinhShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGiaiDoanDanhGia, type EvaluationStageFormOptions, type EvaluationStageStatusValue } from '../../../services/GiaiDoanDanhGia/apiGiaiDoanDanhGia'
import KyTuyenSinhActionButton from '../KyTuyenSinh/components/KyTuyenSinhActionButton.vue'
import KyTuyenSinhShell from '../KyTuyenSinh/components/KyTuyenSinhShell.vue'

interface FormState { activityName: string; stageValue: string | undefined; courseValue: string | undefined; formValue: string | undefined; startDate: Dayjs | null; endDate: Dayjs | null; status: EvaluationStageStatusValue | undefined }
const router = useRouter()
const route = useRoute()
const options = ref<EvaluationStageFormOptions>({ stageOptions: [], courseOptions: [], formOptions: [], statusOptions: [] })
const form = reactive<FormState>({ activityName: '', stageValue: undefined, courseValue: undefined, formValue: undefined, startDate: null, endDate: null, status: undefined })
const loadForm = async () => {
  const data = await apiGiaiDoanDanhGia.getEditForm(String(route.params.id || '1'))
  if (!data) return
  form.activityName = data.activityName
  form.stageValue = data.stageValue
  form.courseValue = data.courseValue
  form.formValue = data.formValue
  form.startDate = data.startDate ? dayjs(data.startDate) : null
  form.endDate = data.endDate ? dayjs(data.endDate) : null
  form.status = data.status
}
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
const handleUpdate = async () => {
  if (!validateForm()) return
  await apiGiaiDoanDanhGia.updateStage(String(route.params.id || '1'), {
    activityName: form.activityName,
    stageValue: form.stageValue,
    courseValue: form.courseValue,
    formValue: form.formValue,
    startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : null,
    endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : null,
    status: form.status
  })
  message.success('Cập nhật giai đoạn đánh giá thành công.')
  router.push({ name: 'evaluation-stages-detail', params: { id: route.params.id || '1' } })
}
onMounted(async () => {
  options.value = await apiGiaiDoanDanhGia.getFormOptions()
  await loadForm()
})
</script>
