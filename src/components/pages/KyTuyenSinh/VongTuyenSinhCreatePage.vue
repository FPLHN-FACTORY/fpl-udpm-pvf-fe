<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium cursor-pointer hover:underline" @click="$router.push('/admission/rounds')">Vòng tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm mới Vòng tuyển sinh</h2>
        <a-button 
          @click="$router.push('/admission/rounds')"
          class="!bg-[#f1f1f2] hover:!bg-[#e1e1e2] !text-[#566a7f] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
        >
          <NavIcon name="BxArrowBack" size="14" />
          Quay Lại
        </a-button>
      </div>

      <!-- Form -->
      <div class="p-6">
        <a-form layout="vertical" class="max-w-4xl">
          <div class="grid grid-cols-1 gap-6">
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
          </div>

          <div class="flex justify-center gap-3 mt-6">
            <a-button 
              type="primary" 
              class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none !h-10 px-8 rounded-md font-medium"
              @click="handleCreate"
            >
              Thêm Mới
            </a-button>
            <a-button 
              class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !h-10 px-8 rounded-md font-medium"
              @click="handleReset"
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
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { apiVongTuyenSinh } from '@/services/VongTuyenSinh/apiVongTuyenSinh'

const router = useRouter()

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

const loadData = async () => {
  try {
    const data = await apiVongTuyenSinh.getCreateFormData()
    formOptions.value = data.options
  } catch (error) {
    console.error(error)
  }
}

const handleCreate = async () => {
  try {
    if (!formState.session || !formState.round || !formState.status) {
      message.error('Vui lòng điền các trường bắt buộc')
      return
    }
    const res = await apiVongTuyenSinh.createAdmissionRound({
      form: { ...formState } as any
    })
    message.success('Thêm mới vòng tuyển sinh thành công')
    router.push(`/admission/rounds`)
  } catch (error) {
    message.error('Lỗi khi thêm mới')
  }
}

const handleReset = () => {
  formState.session = undefined
  formState.round = undefined
  formState.criteria = undefined
  formState.startDate = undefined
  formState.endDate = undefined
  formState.status = undefined
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
</style>
