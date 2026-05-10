<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <!-- Main Card: Đã bỏ max-w-5xl để co giãn rộng sang 2 bên như trang Edit -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
      <!-- Card Header -->
      <div class="flex justify-between items-center p-8 border-b border-gray-100">
        <h2 class="text-2xl font-bold text-[#566a7f]">Thêm mới Kỳ tuyển sinh</h2>
        <ButtonBackNoIcon @click="$router.push({ name: 'admission-periods' })" />
      </div>

      <!-- Form Body -->
      <div class="p-10">
        <div class="flex flex-col gap-8">
          
          <!-- Field: Cơ sở đào tạo -->
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Cơ sở</label>
            <a-select 
              v-model:value="formData.facility" 
              placeholder="Cơ sở" 
              class="w-full !h-[48px]"
            >
              <a-select-option value="hn">Cơ sở đào tạo FPT Hà Nội</a-select-option>
              <a-select-option value="hcm">Cơ sở đào tạo FPT TP.HCM</a-select-option>
            </a-select>
          </div>

          <!-- Field: Tên kỳ tuyển sinh -->
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Tên kỳ tuyển sinh</label>
            <a-input 
              v-model:value="formData.name" 
              placeholder="Tên kỳ tuyển sinh" 
              class="w-full !h-[48px] !border-[#d9dee3] rounded-md transition-all text-[#566a7f]"
            />
          </div>

          <!-- Grid: Ngày bắt đầu & Ngày kết thúc -->
          <div class="grid grid-cols-2 gap-8">
            <div class="relative w-full">
              <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Ngày bắt đầu kỳ tuyển sinh</label>
              <a-date-picker 
                v-model:value="formData.startDate" 
                placeholder="YYYY-MM-DD" 
                class="w-full !h-[48px]"
              />
            </div>

            <div class="relative w-full">
              <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Ngày kết thúc kỳ tuyển sinh</label>
              <a-date-picker 
                v-model:value="formData.endDate" 
                placeholder="YYYY-MM-DD" 
                class="w-full !h-[48px]"
              />
            </div>
          </div>

          <!-- Field: Trạng thái -->
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Trạng thái</label>
            <a-select 
              v-model:value="formData.status" 
              placeholder="Trạng thái" 
              class="w-full !h-[48px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngưng hoạt động</a-select-option>
            </a-select>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-center gap-3 mt-8">
            <a-button
              class="!bg-[#ff3e1d] hover:!bg-[#e33619] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium"
              @click="handleSubmit"
            >
              Thêm Mới
            </a-button>
            <a-button
              class="!bg-[#fdac41] hover:!bg-[#e39a3a] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium"
              @click="resetForm"
            >
              Đặt Lại
            </a-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBackNoIcon from '@/components/atoms/buttons/ButtonBackNoIcon.vue'

const router = useRouter()
const formData = ref({
  facility: undefined,
  name: '',
  startDate: undefined,
  endDate: undefined,
  status: undefined
})

const handleSubmit = () => {
  console.log('Submit', formData.value)
  router.push({ name: 'admission-periods' })
}

const resetForm = () => {
  formData.value = {
    facility: undefined,
    name: '',
    startDate: undefined,
    endDate: undefined,
    status: undefined
  }
}
</script>

<style scoped>
/* CSS đồng bộ tuyệt đối với AdmissionPeriodEditPage.vue */
:deep(.ant-input), :deep(.ant-select-selector), :deep(.ant-picker) {
  height: 48px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  color: #566a7f !important;
  box-shadow: none !important;
  font-size: 14px !important;
}

:deep(.ant-input:hover), :deep(.ant-input:focus), 
:deep(.ant-select-selector:hover), :deep(.ant-picker:hover), 
:deep(.ant-select-focused .ant-select-selector), :deep(.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selection-item), :deep(.ant-picker-input > input) {
  color: #566a7f !important;
}

:deep(.ant-select-arrow), :deep(.ant-picker-suffix) {
  color: #a1acb8 !important;
}
</style>
