<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Quản lý học tập văn hoá</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Khối lớp</span>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <!-- Card Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-xl font-bold text-[#566a7f]">Thêm mới <span class="bg-[#fcf3d7] px-1 rounded">Khối lớp</span></h1>
        <ButtonBack @click="$router.back()" />
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-6 max-w-full">
        <div>
          <InputForm 
            v-model="formData.name"
            placeholder="Tên khối"
          />
        </div>

        <div>
          <TextareaForm
            v-model="formData.note"
            placeholder="Ghi chú"
            :rows="6"
          />
        </div>

        <div>
          <a-select 
            v-model:value="formData.status" 
            placeholder="Trạng thái" 
            class="w-full !h-[42px]"
          >
            <a-select-option value="active">Đang sử dụng</a-select-option>
            <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
            <a-select-option value="suspended">Tạm ngưng</a-select-option>
          </a-select>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 mt-4">
          <ButtonSave text="Thêm Mới" @click="handleSubmit" />
          <ButtonReset @click="resetForm" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '../../atoms/inputs/InputForm.vue'
import TextareaForm from '../../atoms/inputs/TextareaForm.vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'
import ButtonSave from '../../atoms/buttons/ButtonSave.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'

const router = useRouter()

const formData = ref({
  name: '',
  note: '',
  status: undefined
})

const handleSubmit = () => {
  console.log('Submit:', formData.value)
  router.push('/cultural/grade')
}

const resetForm = () => {
  formData.value = {
    name: '',
    note: '',
    status: undefined
  }
}
</script>

<style scoped>
:deep(.ant-input:focus), 
:deep(.ant-input-focused),
:deep(.ant-input:hover) {
  border-color: #f6c23e !important;
  box-shadow: none !important;
}

:deep(.ant-select-selector) {
  height: 42px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
