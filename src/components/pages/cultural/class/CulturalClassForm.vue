<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="flex justify-between items-center p-6 border-b border-gray-100">
      <h2 class="text-lg font-bold text-[#566a7f]">{{ title }}</h2>
      <ButtonBack @click="goBack" />
    </div>

    <!-- Form Body -->
    <div class="p-8">
      <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <!-- Tên lớp học -->
        <a-input
          v-model:value="form.name"
          placeholder="Tên lớp học"
          class="w-full !h-[48px] !border-[#d9dee3] rounded-md transition-all text-[#566a7f]"
        />

        <!-- Khối lớp -->
        <a-select
          v-model:value="form.gradeName"
          placeholder="Khối lớp"
          class="w-full !h-[48px]"
        >
          <a-select-option v-for="grade in gradeOptions" :key="grade" :value="grade">
            {{ grade }}
          </a-select-option>
        </a-select>

        <!-- Năm học -->
        <a-select
          v-model:value="form.schoolYear"
          placeholder="Năm học"
          class="w-full !h-[48px]"
        >
          <a-select-option v-for="year in schoolYearOptions" :key="year" :value="year">
            {{ year }}
          </a-select-option>
        </a-select>

        <!-- Giáo viên chủ nhiệm -->
        <a-select
          v-model:value="form.homeroomTeacher"
          placeholder="Giáo viên chủ nhiệm"
          class="w-full !h-[48px]"
        >
          <a-select-option v-for="teacher in teacherOptions" :key="teacher" :value="teacher">
            {{ teacher }}
          </a-select-option>
        </a-select>

        <!-- Trạng thái -->
        <a-select
          v-model:value="form.status"
          placeholder="Trạng thái"
          class="w-full !h-[48px]"
        >
          <a-select-option v-for="s in statusOptions" :key="s.value" :value="s.value">
            {{ s.label }}
          </a-select-option>
        </a-select>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <a-button
            class="!bg-[#ff3e1d] hover:!bg-[#e33619] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium"
            :disabled="!canSubmit"
            @click="handleSubmit"
          >
            {{ submitLabel }}
          </a-button>
          <a-button
            class="!bg-[#fdac41] hover:!bg-[#e39a3a] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium"
            @click="resetForm"
          >
            Đặt Lại
          </a-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import {
  culturalClassGradeOptions,
  culturalClassSchoolYearOptions,
  culturalClassStatusOptions,
  culturalClassTeacherOptions,
  type CulturalClassStatus,
  type SaveCulturalClassInput,
} from '../../../../services/cultural/culturalClass'

interface Props {
  title: string
  submitLabel: string
  initialValues?: Partial<SaveCulturalClassInput>
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
})

const emit = defineEmits<{
  submit: [payload: SaveCulturalClassInput]
}>()

const router = useRouter()

const buildDefaultForm = (): SaveCulturalClassInput => ({
  name: props.initialValues.name ?? '',
  gradeName: props.initialValues.gradeName ?? '',
  schoolYear: props.initialValues.schoolYear ?? '',
  homeroomTeacher: props.initialValues.homeroomTeacher ?? '',
  status: props.initialValues.status ?? 'ACTIVE',
})

const form = reactive<SaveCulturalClassInput>(buildDefaultForm())

watch(
  () => props.initialValues,
  () => { Object.assign(form, buildDefaultForm()) },
  { deep: true },
)

const canSubmit = computed(
  () =>
    form.name.trim().length > 0 &&
    form.gradeName.length > 0 &&
    form.schoolYear.length > 0 &&
    form.homeroomTeacher.length > 0,
)

const gradeOptions = culturalClassGradeOptions
const schoolYearOptions = culturalClassSchoolYearOptions
const teacherOptions = culturalClassTeacherOptions
const statusOptions = culturalClassStatusOptions as ReadonlyArray<{
  value: CulturalClassStatus
  label: string
}>

const goBack = () => router.back()
const resetForm = () => { Object.assign(form, buildDefaultForm()) }

const handleSubmit = () => {
  if (!canSubmit.value) return
  emit('submit', {
    name: form.name.trim(),
    gradeName: form.gradeName,
    schoolYear: form.schoolYear,
    homeroomTeacher: form.homeroomTeacher,
    status: form.status,
  })
}
</script>

<style scoped>
:deep(.ant-input),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  height: 48px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  color: #566a7f !important;
  box-shadow: none !important;
  font-size: 14px !important;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus),
:deep(.ant-select-selector:hover),
:deep(.ant-picker:hover),
:deep(.ant-select-focused .ant-select-selector),
:deep(.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selection-item),
:deep(.ant-picker-input > input) {
  color: #566a7f !important;
}

:deep(.ant-select-arrow),
:deep(.ant-picker-suffix) {
  color: #a1acb8 !important;
}
</style>
