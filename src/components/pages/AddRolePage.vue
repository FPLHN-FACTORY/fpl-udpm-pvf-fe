<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Phân quyền người dùng</span>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <!-- Card Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-xl font-bold text-[#566a7f]">Thêm mới Nhóm quyền người dùng</h1>
        <BaseButton 
          variant="default" 
          size="small" 
          icon="ChevronLeftIcon"
          class="!bg-[#eceef1] hover:!bg-[#daddf1] !border-none !text-[#8592a3] !text-[13px] !px-3"
          @click="$router.back()"
        >
          Quay Lại
        </BaseButton>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-6 max-w-full">
        <div>
          <BaseInput 
            v-model="formData.name"
            placeholder="Tên nhóm quyền"
            class="!h-[42px] !border-[#d9dee3] rounded-md"
          />
        </div>

        <div>
          <BaseTextarea
            v-model="formData.description"
            placeholder="Mô tả nhóm quyền"
            :rows="6"
          />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../atoms/BaseInput.vue'
import BaseTextarea from '../atoms/BaseTextarea.vue'
import BaseButton from '../atoms/BaseButton.vue'

const router = useRouter()

const formData = ref({
  name: '',
  description: ''
})

const handleSubmit = () => {
  console.log('Submit:', formData.value)
  // Logic to add role here
  router.push('/system/roles')
}

const resetForm = () => {
  formData.value = {
    name: '',
    description: ''
  }
}
</script>

<style scoped>
:deep(.ant-input:focus), 
:deep(.ant-input-focused),
:deep(.ant-input:hover) {
  border-color: #dc2626 !important;
  box-shadow: none !important;
}
</style>
