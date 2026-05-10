<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Dụng cụ</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Edit Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Điều chỉnh Dụng cụ</h2>
        <ButtonBackNoIcon @click="$router.back()" />
      </div>

      <!-- Form Section -->
      <div class="space-y-8 pb-10">
        <InputForm v-model="form.name" label="Tên dụng cụ" />
        
        <SelectForm v-model:value="form.categoryId" label="Mô tả dụng cụ">
          <a-select-option value="1">Áo tập luyện</a-select-option>
          <a-select-option value="2">Quần tập luyện</a-select-option>
          <a-select-option value="3">Giày thể thao</a-select-option>
        </SelectForm>

        <SelectForm v-model:value="form.status" label="Trạng thái">
          <a-select-option value="active">Đang sử dụng</a-select-option>
          <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import ButtonBackNoIcon from '@/components/atoms/buttons/ButtonBackNoIcon.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'

const router = useRouter()

// Mock pre-filled data
const form = reactive({
  name: 'Áo tập luyện',
  categoryId: '1',
  status: 'active'
})

const initialForm = { ...form }

const handleUpdate = () => {
  if (!form.name) {
    message.warning('Vui lòng nhập tên dụng cụ')
    return
  }
  if (!form.categoryId) {
    message.warning('Vui lòng chọn mô tả dụng cụ')
    return
  }
  
  console.log('Update form:', form)
  message.success('Cập nhật thành công')
  router.push({ name: 'student-equipment' })
}

const handleReset = () => {
  Object.assign(form, initialForm)
}
</script>
