<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
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
        <BaseButton 
          variant="default" 
          size="small" 
          class="!bg-[#eceef1] hover:!bg-[#daddf1] !border-none !text-[#8592a3] !text-[13px] !px-4 flex items-center gap-1"
          @click="$router.back()"
        >
          <span class="text-lg">←</span> Quay Lại
        </BaseButton>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-6 max-w-full">
        <div>
          <BaseInput 
            v-model="formData.name"
            placeholder="Tên khối"
            class="!h-[42px] !border-[#d9dee3] rounded-md"
          />
        </div>

        <div>
          <BaseTextarea
            v-model="formData.note"
            placeholder="Ghi chú"
            :rows="6"
            class="!border-[#d9dee3]"
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
          <BaseButton 
            variant="primary" 
            class="!h-[42px] !px-8 !bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none shadow-md shadow-red-200"
            @click="handleSubmit"
          >
            Thêm Mới
          </BaseButton>
          <BaseButton 
            variant="default"
            class="!h-[42px] !px-8 !bg-[#ffab00] hover:!bg-[#e69a00] !border-none !text-white shadow-md shadow-orange-200"
            @click="resetForm"
          >
            Đặt Lại
          </BaseButton>
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
import BaseInput from '../../atoms/BaseInput.vue'
import BaseTextarea from '../../atoms/BaseTextarea.vue'
import BaseButton from '../../atoms/BaseButton.vue'

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
