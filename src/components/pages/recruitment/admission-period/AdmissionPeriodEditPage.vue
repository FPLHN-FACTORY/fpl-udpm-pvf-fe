<template>
  <div class="flex flex-col gap-6 px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full mx-auto">
      <div class="flex justify-between items-center p-8 border-b border-gray-100">
        <h2 class="text-2xl font-bold text-[#566a7f]">Điều chỉnh Kỳ tuyển sinh</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/recruitment/admission-periods')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-10">
        <div class="flex flex-col gap-8">
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Cơ sở đào tạo</label>
            <a-select 
              v-model:value="formData.facility" 
              placeholder="Cơ sở đào tạo" 
              class="w-full !h-[48px]"
            >
              <a-select-option value="hn">Cơ sở đào tạo FPT Hà Nội</a-select-option>
              <a-select-option value="hcm">Cơ sở đào tạo FPT TP.HCM</a-select-option>
            </a-select>
            <span v-if="errors.facility" class="text-red-500 text-sm mt-1 block">{{ errors.facility }}</span>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Tên kỳ tuyển sinh</label>
            <a-input 
              v-model:value="formData.name" 
              placeholder="Tên kỳ tuyển sinh" 
              class="w-full !h-[48px] !border-[#d9dee3] rounded-md transition-all text-[#566a7f]"
            />
            <span v-if="errors.name" class="text-red-500 text-sm mt-1 block">{{ errors.name }}</span>
          </div>

          <div class="grid grid-cols-2 gap-8">
            <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Ngày bắt đầu kỳ tuyển sinh</label>
            <a-date-picker 
                v-model:value="formData.startDate" 
                placeholder="Ngày bắt đầu kỳ tuyển sinh"
                format="YYYY-MM-DD" 
                class="w-full !h-[48px]"
              />
              <span v-if="errors.startDate" class="text-red-500 text-sm mt-1 block">{{ errors.startDate }}</span>
          </div>
            <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Ngày kết thúc kỳ tuyển sinh</label>
            <a-date-picker 
                v-model:value="formData.endDate" 
                placeholder="Ngày kết thúc kỳ tuyển sinh"
                format="YYYY-MM-DD" 
                class="w-full !h-[48px]"
              />
              <span v-if="errors.endDate" class="text-red-500 text-sm mt-1 block">{{ errors.endDate }}</span>
          </div>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[13px] text-gray-400 z-50 font-medium">Trạng thái</label>
            <a-select 
              v-model:value="formData.status" 
              placeholder="Trạng thái" 
              class="w-full !h-[48px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
            <span v-if="errors.status" class="text-red-500 text-sm mt-1 block">{{ errors.status }}</span>
          </div>

          <div class="flex justify-center gap-4 mt-8">
            <a-button class="!bg-[#ff1f1f] hover:!bg-[#e31b1b] !border-none !text-white !h-[48px] !px-12 !text-[15px] font-medium rounded-md" @click="handleSubmit">
              Cập Nhật
            </a-button>
            <a-button class="!bg-[#eab308] hover:!bg-[#ca8a04] !border-none !text-white !h-[48px] !px-12 !text-[15px] font-medium rounded-md" @click="resetForm">
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
import dayjs from 'dayjs'
import { validateRequired } from '../../../../utils/validation'

const router = useRouter()

interface FormData {
  facility: string | undefined
  name: string
  startDate: any
  endDate: any
  status: string | undefined
}

const formData = ref<FormData>({
  facility: 'hn',
  name: 'Kỳ tuyển sinh Xuân 2025',
  startDate: dayjs('2025-01-15', 'YYYY-MM-DD'),
  endDate: dayjs('2025-03-31', 'YYYY-MM-DD'),
  status: 'active'
})

const errors = ref<Record<string, string>>({})

const validateForm = () => {
  errors.value = {}
  if (!formData.value.facility) {
    errors.value.facility = 'Vui lòng chọn cơ sở đào tạo'
  }
  if (!validateRequired(formData.value.name)) {
    errors.value.name = 'Vui lòng nhập tên kỳ tuyển sinh'
  }
  if (!formData.value.startDate) {
    errors.value.startDate = 'Vui lòng chọn ngày bắt đầu'
  }
  if (!formData.value.endDate) {
    errors.value.endDate = 'Vui lòng chọn ngày kết thúc'
  }
  if (formData.value.startDate && formData.value.endDate && formData.value.startDate.isAfter(formData.value.endDate)) {
    errors.value.endDate = 'Ngày kết thúc phải sau ngày bắt đầu'
  }
  if (!formData.value.status) {
    errors.value.status = 'Vui lòng chọn trạng thái'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Submit', formData.value)
    router.push('/recruitment/admission-periods')
  }
}

const resetForm = () => {
  formData.value = {
    facility: 'hn',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: dayjs('2025-01-15', 'YYYY-MM-DD'),
    endDate: dayjs('2025-03-31', 'YYYY-MM-DD'),
    status: 'active'
  }
  errors.value = {}
}
</script>

<style scoped>
:deep(.ant-input),
:deep(.ant-select-selector), 
:deep(.ant-picker) {
  height: 48px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  color: #566a7f !important;
  box-shadow: none !important;
  font-size: 14px !important;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus),
:deep(.ant-select-selector:hover), 
:deep(.ant-picker:hover),
:deep(.ant-select-focused .ant-select-selector), 
:deep(.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selection-item), 
:deep(.ant-picker-input > input) {
  color: #566a7f !important;
}

:deep(.ant-select-arrow) {
  color: #a1acb8 !important;
}

:deep(.ant-picker-suffix) {
  color: #a1acb8 !important;
}
</style>
