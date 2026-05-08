<template>
  <div class="space-y-5">
    <div class="text-[11px] leading-4 text-[#a1acb8]">
      Học tập văn hoá
      <span class="mx-1">/</span>
      Đơn xin phép nghỉ học
    </div>

    <section class="rounded-[10px] border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-[18px] font-semibold text-[#566a7f]">Điều chỉnh Đơn xin phép nghỉ học</h2>
        <ButtonBack @click="$router.push('/cultural/absence')" />
      </div>

      <div class="space-y-4">
        <a-select v-model:value="form.studentId" placeholder="Học viên" class="w-full edit-select">
          <a-select-option v-for="student in absenceStudentOptions" :key="student.value" :value="student.value">
            {{ student.label }}
          </a-select-option>
        </a-select>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="relative">
            <a-input v-model:value="form.startDate" placeholder="Ngày bắt đầu nghỉ" class="edit-input pr-10" />
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a1acb8]">
              <NavIcon name="BxCalendar" size="16" />
            </span>
          </div>

          <div class="relative">
            <a-input v-model:value="form.endDate" placeholder="Ngày kết thúc nghỉ" class="edit-input pr-10" />
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a1acb8]">
              <NavIcon name="BxCalendar" size="16" />
            </span>
          </div>
        </div>

        <a-textarea v-model:value="form.reason" :rows="4" placeholder="Lý do nghỉ" class="edit-textarea" />

        <label class="file-field">
          <input ref="fileInput" type="file" class="hidden" @change="handleFileChange" />
          <span class="truncate">{{ form.fileName || 'File scan đơn nghỉ' }}</span>
          <span class="text-[#8592a3]">
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
              <path d="M11 3h2v9h3l-4 4-4-4h3zM5 18h14v2H5z" />
            </svg>
          </span>
        </label>

        <div class="flex items-center justify-center gap-4 pt-1">
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleSubmit" />
          <ButtonResetYellow text="Đặt Lại" @click="resetForm" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import ButtonSaveNoIcon from '../../../atoms/buttons/ButtonSaveNoIcon.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import { absenceStudentOptions, findAbsenceRequestById, updateAbsenceRequest } from './absenceData'

const route = useRoute()
const router = useRouter()
const source = findAbsenceRequestById(route.params.id as string)
const fileInput = ref<HTMLInputElement | null>(null)

const buildInitialForm = () => ({
  studentId: source.studentId,
  startDate: source.startDate,
  endDate: source.endDate,
  reason: source.reason,
  fileName: source.fileName
})

const form = ref(buildInitialForm())

const resetForm = () => {
  form.value = buildInitialForm()

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.fileName = target.files?.[0]?.name || source.fileName
}

const handleSubmit = () => {
  updateAbsenceRequest(route.params.id as string, {
    studentId: form.value.studentId,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    reason: form.value.reason,
    fileName: form.value.fileName
  })

  router.push(`/cultural/absence/detail/${route.params.id}`)
}
</script>

<style scoped>
:deep(.edit-select .ant-select-selector) {
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.edit-input) {
  height: 38px !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.edit-textarea) {
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

.file-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #d9dee3;
  border-radius: 6px;
  color: #8592a3;
  font-size: 13px;
  cursor: pointer;
}
</style>
