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
        <h1 class="text-xl font-bold text-[#566a7f]">Điều chỉnh <span class="bg-[#fcf3d7] px-1 rounded">Khối lớp</span></h1>
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
        <!-- Floating Label Inputs Pattern -->
        <div class="relative border border-[#d9dee3] rounded-md px-3 py-2">
          <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3]">Tên khối</label>
          <input 
            v-model="formData.name"
            class="w-full h-[26px] outline-none text-[#566a7f] text-[15px]"
            placeholder="Input"
          />
        </div>

        <div class="relative border border-[#d9dee3] rounded-md px-3 py-2">
          <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3]">Ghi chú</label>
          <textarea 
            v-model="formData.note"
            class="w-full h-[100px] outline-none text-[#566a7f] text-[15px] resize-none pt-1"
            placeholder="Ghi chú"
          ></textarea>
        </div>

        <div class="relative border border-[#d9dee3] rounded-md px-3 py-2">
          <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3]">Trạng thái</label>
          <a-select 
            v-model:value="formData.status" 
            placeholder="Input" 
            class="w-full custom-select"
            :bordered="false"
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
            Cập Nhật
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '../../atoms/BaseButton.vue'

const router = useRouter()
const route = useRoute()

const formData = ref({
  name: '10',
  note: 'Ghi chú',
  status: 'active'
})

const handleSubmit = () => {
  console.log('Update:', formData.value)
  router.push('/cultural/grade')
}

const resetForm = () => {
  // Reset to original data
  formData.value = {
    name: '10',
    note: 'Ghi chú',
    status: 'active'
  }
}

onMounted(() => {
  console.log('Loading grade data for ID:', route.params.id)
})
</script>

<style scoped>
.custom-select :deep(.ant-select-selector) {
  padding: 0 !important;
  height: 26px !important;
  box-shadow: none !important;
}

.custom-select :deep(.ant-select-selection-placeholder) {
  padding: 0 !important;
}

.relative:focus-within {
  border-color: #696cff;
}

.relative:focus-within label {
  color: #696cff;
}
</style>
