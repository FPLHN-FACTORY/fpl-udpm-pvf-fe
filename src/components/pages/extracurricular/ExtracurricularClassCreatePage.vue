<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khóa</a-breadcrumb-item>
      <a-breadcrumb-item>Lớp học ngoại khóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Create Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Thêm mới Lớp học ngoại khóa</h2>
        <ButtonBackNoIcon @click="handleBack" />
      </div>

      <!-- Form Section -->
      <div class="space-y-8 pb-10 max-w-5xl mx-auto">
        <InputForm v-model="createForm.name" label="Tên lớp" placeholder="Nhập tên lớp" />
        
        <SelectForm v-model:value="createForm.subject" label="Môn" placeholder="Chọn môn">
          <a-select-option value="tamly">Tâm lý thi đấu</a-select-option>
          <a-select-option value="kynang">Kỹ năng mềm</a-select-option>
        </SelectForm>

        <SelectForm v-model:value="createForm.location" label="Địa điểm" placeholder="Chọn địa điểm">
          <a-select-option value="p1">Phòng học 1</a-select-option>
          <a-select-option value="p2">Phòng học 2</a-select-option>
        </SelectForm>

        <SelectForm v-model:value="createForm.teacher" label="Giáo viên phụ trách" placeholder="Chọn giáo viên">
          <a-select-option value="t1">Nguyễn Văn Hùng</a-select-option>
          <a-select-option value="t2">Trần Minh Tuấn</a-select-option>
        </SelectForm>

        <InputForm v-model="createForm.maxSize" label="Sỹ số tối đa" type="number" />

        <SelectForm v-model:value="createForm.status" label="Trạng thái" placeholder="Chọn trạng thái">
          <a-select-option value="open">Đang mở</a-select-option>
          <a-select-option value="closed">Đã đóng</a-select-option>
        </SelectForm>
        
        <!-- Submit Buttons -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <ButtonSaveNoIcon text="Thêm Mới" @click="handleCreate" />
          <ButtonResetYellow @click="handleReset" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBackNoIcon from '@/components/atoms/buttons/ButtonBackNoIcon.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'

const router = useRouter()

const createForm = ref({
  name: '',
  subject: undefined,
  location: undefined,
  teacher: undefined,
  maxSize: 32,
  status: 'open'
})

const handleBack = () => {
  router.back()
}

const handleCreate = () => {
  console.log('Creating class:', createForm.value)
  router.push('/extracurricular/classes/list')
}

const handleReset = () => {
  createForm.value = {
    name: '',
    subject: undefined,
    location: undefined,
    teacher: undefined,
    maxSize: 32,
    status: 'open'
  }
}
</script>

<style scoped>
/* Styles are handled by the common components */
</style>
