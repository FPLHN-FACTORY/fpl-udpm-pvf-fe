<template>
  <div class="space-y-5">
    <div class="text-[11px] leading-4 text-[#a1acb8]">
      Học tập văn hoá
      <span class="mx-1">/</span>
      Đơn xin phép nghỉ học
    </div>

    <section class="rounded-[10px] border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-[18px] font-bold text-[#566a7f]">Thêm mới Đơn xin phép nghỉ học</h2>
        <ButtonBack @click="$router.push('/cultural/absence')" />
      </div>

      <div class="space-y-4">
        <a-select v-model:value="form.studentId" placeholder="Học viên" class="w-full create-select">
          <a-select-option v-for="student in absenceStudentOptions" :key="student.value" :value="student.value">
            {{ student.label }}
          </a-select-option>
        </a-select>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="relative">
            <a-input v-model:value="form.startDate" placeholder="Ngày bắt đầu nghỉ" class="create-input pr-10" />
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a1acb8]">
              <NavIcon name="BxCalendar" size="16" />
            </span>
          </div>

          <div class="relative">
            <a-input v-model:value="form.endDate" placeholder="Ngày kết thúc nghỉ" class="create-input pr-10" />
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a1acb8]">
              <NavIcon name="BxCalendar" size="16" />
            </span>
          </div>
        </div>

        <a-textarea v-model:value="form.reason" :rows="4" placeholder="Lý do nghỉ" class="create-textarea" />

        <label class="file-field">
          <input ref="fileInput" type="file" class="hidden" @change="handleFileChange" />
          <span class="truncate">{{ form.fileName || 'File scan đơn nghỉ' }}</span>
          <span class="text-[#8592a3]">
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
              <path d="M11 3h2v9h3l-4 4-4-4h3zM5 18h14v2H5z" />
            </svg>
          </span>
        </label>

        <div class="flex items-center justify-center gap-3 pt-1">
          <ButtonAddNoIcon text="Thêm Mới" @click="handleSubmit" />
          <ButtonResetYellow text="Đặt Lại" @click="resetForm" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import { absenceStudentOptions, createAbsenceRequest } from './absenceData'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)

const form = ref({
  studentId: undefined as string | undefined,
  startDate: '',
  endDate: '',
  reason: '',
  fileName: ''
})

const resetForm = () => {
  form.value = {
    studentId: undefined,
    startDate: '',
    endDate: '',
    reason: '',
    fileName: ''
  }

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.fileName = target.files?.[0]?.name || ''
}

const handleSubmit = () => {
  const created = createAbsenceRequest({
    studentId: form.value.studentId,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    reason: form.value.reason,
    fileName: form.value.fileName
  })

  router.push(`/cultural/absence/detail/${created.id}`)
}
</script>

<style scoped>
:deep(.create-select .ant-select-selector) {
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.create-input) {
  height: 38px !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}

:deep(.create-textarea) {
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
