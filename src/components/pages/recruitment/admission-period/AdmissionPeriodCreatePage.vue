<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm mới Kỳ tuyển sinh</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/recruitment/admission-periods')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-8">
        <div class="flex flex-col gap-6">
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-50 font-medium">Cơ sở đào tạo</label>
            <a-select 
              v-model:value="formData.facility" 
              placeholder="Cơ sở đào tạo" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="hn">Cơ sở đào tạo FPT Hà Nội</a-select-option>
              <a-select-option value="hcm">Cơ sở đào tạo FPT TP.HCM</a-select-option>
            </a-select>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-50 font-medium">Tên kỳ tuyển sinh</label>
            <a-input 
              v-model:value="formData.name" 
              placeholder="Tên kỳ tuyển sinh" 
              class="w-full !h-[42px] !border-[#d9dee3] rounded-md transition-all text-[#566a7f]"
            />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-50 font-medium">Ngày bắt đầu kỳ tuyển sinh</label>
            <a-date-picker 
                v-model:value="formData.startDate" 
                placeholder="Ngày bắt đầu kỳ tuyển sinh" 
                class="w-full !h-[42px]"
              />
          </div>
            <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-50 font-medium">Ngày kết thúc kỳ tuyển sinh</label>
            <a-date-picker 
                v-model:value="formData.endDate" 
                placeholder="Ngày kết thúc kỳ tuyển sinh" 
                class="w-full !h-[42px]"
              />
          </div>
          </div>

          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-50 font-medium">Trạng thái</label>
            <a-select 
              v-model:value="formData.status" 
              placeholder="Trạng thái" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </div>

          <div class="flex justify-center gap-3 mt-6">
            <a-button class="!bg-[#ff1f1f] hover:!bg-[#e31b1b] !border-none !text-white !h-[42px] !px-8 font-medium rounded-md" @click="handleSubmit">
              Thêm Mới
            </a-button>
            <a-button class="!bg-[#eab308] hover:!bg-[#ca8a04] !border-none !text-white !h-[42px] !px-8 font-medium rounded-md" @click="resetForm">
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
import InputForm from '../../../atoms/inputs/InputForm.vue'
import ButtonSave from '../../../atoms/buttons/ButtonSave.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'

const router = useRouter()

interface FormData {
  facility: string | undefined
  name: string
  startDate: any
  endDate: any
  status: string | undefined
}

const formData = ref<FormData>({
  facility: undefined,
  name: '',
  startDate: undefined,
  endDate: undefined,
  status: undefined
})

const handleSubmit = () => {
  console.log('Submit', formData.value)
  router.push('/recruitment/admission-periods')
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
:deep(.ant-input),
:deep(.ant-select-selector), 
:deep(.ant-picker) {
  height: 42px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  color: #566a7f !important;
  box-shadow: none !important;
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
