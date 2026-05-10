<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium cursor-pointer hover:underline" @click="$router.push({ name: 'admission-rounds' })">Vòng tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-[#566a7f]">Điều chỉnh Vòng tuyển sinh</h2>
        <a-button 
          @click="$router.push({ name: 'admission-rounds' })"
          class="!bg-[#f1f1f2] hover:!bg-[#e1e1e2] !text-[#566a7f] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
        >
          <NavIcon name="BxArrowBack" size="14" />
          Quay Lại
        </a-button>
      </div>

      <!-- Form -->
      <div class="p-6">
        <a-form layout="vertical" class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 gap-6">
            <!-- Basic Info -->
            <a-form-item>
              <a-select v-model:value="formState.session" placeholder="Kỳ tuyển sinh" class="w-full !h-10">
                <a-select-option v-for="opt in formOptions.sessionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item>
              <a-select v-model:value="formState.round" placeholder="Tên vòng thi" class="w-full !h-10">
                <a-select-option v-for="opt in formOptions.roundOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item>
              <a-select v-model:value="formState.criteria" placeholder="Bộ tiêu chí snap cho vòng thi" class="w-full !h-10">
                <a-select-option v-for="opt in formOptions.criteriaOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</a-select-option>
              </a-select>
            </a-form-item>

            <div class="grid grid-cols-2 gap-6">
              <a-form-item>
                <a-date-picker v-model:value="formState.startDate" placeholder="Ngày bắt đầu vòng thi" value-format="YYYY-MM-DD" class="w-full !h-10" />
              </a-form-item>
              <a-form-item>
                <a-date-picker v-model:value="formState.endDate" placeholder="Ngày kết thúc vòng thi" value-format="YYYY-MM-DD" class="w-full !h-10" />
              </a-form-item>
            </div>

            <a-form-item>
              <a-select v-model:value="formState.status" placeholder="Trạng thái" class="w-full !h-10">
                <a-select-option v-for="opt in formOptions.statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</a-select-option>
              </a-select>
            </a-form-item>

            <!-- Original Criteria Section -->
            <div class="mt-8 border border-gray-100 rounded-xl p-6 bg-[#fcfcfd]">
              <h3 class="text-base font-bold text-[#566a7f] mb-6">Bộ tiêu chí gốc</h3>
              
              <div class="grid grid-cols-1 gap-6 mb-8">
                <a-form-item label="Tên bộ tiêu chí" class="custom-label">
                  <a-input v-model:value="criteriaMaster.name" placeholder="Input" class="!h-10 rounded-md" />
                </a-form-item>
                <a-form-item label="Trạng thái" class="custom-label">
                  <a-input v-model:value="criteriaMaster.status" placeholder="Input" class="!h-10 rounded-md" />
                </a-form-item>
                <a-form-item label="Mô tả bộ tiêu chí" class="custom-label">
                  <a-textarea v-model:value="criteriaMaster.description" placeholder="Nhập mô tả" :rows="4" class="rounded-md" />
                </a-form-item>
              </div>

              <!-- Criteria Lines -->
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-bold text-[#566a7f]">Các tiêu chí</h3>
                <a-button 
                  type="primary" 
                  class="!bg-[#71dd37] hover:!bg-[#63c72e] !border-none rounded-md font-medium text-[13px] h-8 px-4"
                  @click="addCriteriaLine"
                >
                  Thêm Tiêu Chí
                </a-button>
              </div>

              <div class="space-y-4">
                <div v-for="(line, index) in criteriaLines" :key="index" class="flex items-start gap-4">
                  <div class="flex-1">
                    <a-input v-model:value="line.name" :placeholder="'Tiêu chí ' + (index + 1)" class="!h-10 rounded-md" />
                  </div>
                  <div class="flex-1">
                    <a-input v-model:value="line.description" :placeholder="'Mô tả tiêu chí ' + (index + 1)" class="!h-10 rounded-md" />
                  </div>
                  <div class="w-[150px]">
                    <a-input v-model:value="line.weight" placeholder="Trọng số %" class="!h-10 rounded-md" />
                  </div>
                  <div class="w-10 flex justify-center pt-2">
                    <NavIcon 
                      name="BxTrash" 
                      class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                      @click="removeCriteriaLine(index)"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="flex justify-center gap-3 mt-8">
            <a-button 
              type="primary" 
              class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none !h-10 px-8 rounded-md font-medium"
              @click="handleUpdate"
            >
              Cập Nhật
            </a-button>
            <a-button 
              class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !h-10 px-8 rounded-md font-medium"
              @click="loadData"
            >
              Đặt Lại
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { apiVongTuyenSinh } from '@/services/VongTuyenSinh/apiVongTuyenSinh'

const router = useRouter()
const route = useRoute()
const id = route.params.id as string

const formOptions = ref<any>({
  sessionOptions: [],
  roundOptions: [],
  criteriaOptions: [],
  statusOptions: []
})

const formState = reactive({
  session: undefined,
  round: undefined,
  criteria: undefined,
  startDate: undefined,
  endDate: undefined,
  status: undefined
})

const criteriaMaster = reactive({
  name: '',
  status: '',
  description: ''
})

const criteriaLines = ref<any[]>([])

const loadData = async () => {
  try {
    const data = await apiVongTuyenSinh.getEditFormData(id)
    formOptions.value = data.options
    
    if (data.initialData) {
      Object.assign(formState, data.initialData.form)
      Object.assign(criteriaMaster, data.initialData.criteriaMaster)
      criteriaLines.value = [...data.initialData.criteriaLines]
    }
  } catch (error) {
    console.error(error)
  }
}

const addCriteriaLine = () => {
  criteriaLines.value.push({
    id: Date.now(),
    name: '',
    description: '',
    weight: ''
  })
}

const removeCriteriaLine = (index: number) => {
  criteriaLines.value.splice(index, 1)
}

const handleUpdate = async () => {
  try {
    if (!formState.session || !formState.round || !formState.status) {
      message.error('Vui lòng điền các trường bắt buộc')
      return
    }
    
    const payload = {
      form: { ...formState } as any,
      criteriaMaster: { ...criteriaMaster },
      criteriaLines: [...criteriaLines.value]
    }
    
    const res = await apiVongTuyenSinh.updateAdmissionRound(id, payload)
    if (res) {
      message.success('Cập nhật thành công')
      router.push({ name: 'admission-rounds' })
    } else {
      message.error('Lỗi khi cập nhật')
    }
  } catch (error) {
    message.error('Lỗi hệ thống')
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
:deep(.ant-form-item) {
  margin-bottom: 0;
}
:deep(.ant-select-selector) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
:deep(.ant-picker) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
:deep(.custom-label .ant-form-item-label > label) {
  color: #a1b0cb;
  font-size: 13px;
  height: auto;
}
:deep(.ant-input), :deep(.ant-input-affix-wrapper) {
  border-color: #d9dee3;
}
:deep(.ant-input:focus), :deep(.ant-input-affix-wrapper-focused) {
  border-color: #696cff;
  box-shadow: 0 0 0 2px rgba(105, 108, 255, 0.1);
}
</style>
