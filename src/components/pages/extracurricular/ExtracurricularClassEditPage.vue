<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khóa</a-breadcrumb-item>
      <a-breadcrumb-item>Lớp học ngoại khóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Edit Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Điều chỉnh Lớp học ngoại khóa</h2>
        <ButtonBackNoIcon @click="handleBack" />
      </div>

      <!-- Form Section -->
      <div class="space-y-8 pb-10 max-w-5xl mx-auto">
        <InputForm v-model="editForm.name" label="Tên lớp" placeholder="Nhập tên lớp" />
        
        <SelectForm v-model:value="editForm.subject" label="Môn" placeholder="Chọn môn">
          <a-select-option value="tamly">Kỹ năng làm việc nhóm</a-select-option>
          <a-select-option value="kynang">Kỹ năng mềm</a-select-option>
        </SelectForm>

        <SelectForm v-model:value="editForm.location" label="Địa điểm" placeholder="Chọn địa điểm">
          <a-select-option value="p1">Phòng học chiến thuật PVF</a-select-option>
          <a-select-option value="p2">Phòng học 2</a-select-option>
        </SelectForm>

        <SelectForm v-model:value="editForm.teacher" label="Giáo viên phụ trách" placeholder="Chọn giáo viên">
          <a-select-option value="t1">Nguyễn Văn Hùng</a-select-option>
          <a-select-option value="t2">Trần Minh Tuấn</a-select-option>
        </SelectForm>

        <InputForm v-model="editForm.maxSize" label="Sỹ số tối đa" type="number" />

        <SelectForm v-model:value="editForm.status" label="Trạng thái" placeholder="Chọn trạng thái">
          <a-select-option value="open">Đang mở</a-select-option>
          <a-select-option value="closed">Đã đóng</a-select-option>
        </SelectForm>
        
        <!-- Submit Buttons -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleUpdate" />
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

const editForm = ref({
  name: 'UT1301',
  subject: 'tamly',
  location: 'p1',
  teacher: 't1',
  maxSize: 20,
  status: 'open'
})

const handleBack = () => {
  router.back()
}

const handleUpdate = () => {
  console.log('Updating class:', editForm.value)
  router.push('/extracurricular/classes/list')
}

const handleReset = () => {
  editForm.value = {
    name: 'UT1301',
    subject: 'tamly',
    location: 'p1',
    teacher: 't1',
    maxSize: 20,
    status: 'open'
  }
}
</script>

<style scoped>
/* Styles are handled by the common components */
</style>
