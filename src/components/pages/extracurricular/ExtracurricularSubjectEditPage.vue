<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập ngoại khoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400 cursor-pointer" @click="$router.push('/extracurricular/subjects')">Môn học ngoại khoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Điều chỉnh</span>
    </div>

    <!-- Form Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto w-full">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Điều chỉnh Môn học ngoại khoá</h2>
        <a-button 
          @click="$router.push('/extracurricular/subjects')"
          class="!bg-[#f1f1f2] hover:!bg-[#e1e1e2] !text-[#566a7f] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
        >
          <NavIcon name="BxArrowBack" size="14" />
          Quay Lại
        </a-button>
      </div>

      <!-- Form Content -->
      <div class="p-8 flex flex-col gap-6">
        <div>
          <label class="text-xs text-gray-400 block mb-1">Mã môn</label>
          <a-input v-model:value="formState.code" placeholder="Mã môn" class="!h-10 !border-[#d9dee3] rounded-md bg-[#fcfcfd]" disabled />
        </div>
        <div>
          <label class="text-xs text-gray-400 block mb-1">Tên môn</label>
          <a-input v-model:value="formState.name" placeholder="Tên môn" class="!h-10 !border-[#d9dee3] rounded-md" />
        </div>
        <div>
          <label class="text-xs text-gray-400 block mb-1">Mô tả môn</label>
          <a-input v-model:value="formState.description" placeholder="Mô tả môn" class="!h-10 !border-[#d9dee3] rounded-md" />
        </div>
        <div>
          <label class="text-xs text-gray-400 block mb-1">Chọn loại điểm</label>
          <a-select 
            v-model:value="formState.scores" 
            mode="multiple" 
            placeholder="Chọn loại điểm" 
            class="w-full !min-h-[40px] custom-select"
          >
            <a-select-option v-for="opt in scoreOptions" :key="opt" :value="opt">{{ opt }}</a-select-option>
          </a-select>
        </div>
        <div>
          <label class="text-xs text-gray-400 block mb-1">Trạng thái</label>
          <a-select v-model:value="formState.status" placeholder="Trạng thái" class="w-full !h-10 custom-select">
            <a-select-option value="Đang hoạt động">Đang hoạt động</a-select-option>
            <a-select-option value="Đang sử dụng">Đang sử dụng</a-select-option>
            <a-select-option value="Tạm ngưng">Tạm ngưng</a-select-option>
          </a-select>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-center items-center gap-4 mt-4">
          <a-button 
            type="primary" 
            class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none h-10 px-8 rounded-md font-medium"
            @click="handleSubmit"
            :loading="loading"
          >
            Cập Nhật
          </a-button>
          <a-button 
            class="!bg-[#ffab00] hover:!bg-[#e59900] !text-white !border-none h-10 px-8 rounded-md font-medium"
            @click="resetForm"
          >
            Đặt Lại
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { mhnkService, scoreTypesOptions } from '@/services/extracurricular/mhnkapi'

const router = useRouter()
const route = useRoute()
const scoreOptions = scoreTypesOptions
const loading = ref(false)
const originalData = ref<any>(null)

const formState = ref({
  code: '',
  name: '',
  description: '',
  scores: [] as string[],
  status: undefined as string | undefined
})

const fetchDetail = async () => {
  try {
    const id = route.params.id as string
    if (id) {
      const res = await mhnkService.getById(id)
      if (res.data) {
        originalData.value = { ...res.data }
        formState.value = {
          code: res.data.code,
          name: res.data.name,
          description: res.data.description,
          scores: res.data.scores?.map((s: any) => `${s.name} (${s.weight}%)`) || [],
          status: res.data.status
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const resetForm = () => {
  if (originalData.value) {
    formState.value = {
      code: originalData.value.code,
      name: originalData.value.name,
      description: originalData.value.description,
      scores: originalData.value.scores?.map((s: any) => `${s.name} (${s.weight}%)`) || [],
      status: originalData.value.status
    }
  }
}

const handleSubmit = async () => {
  if (!formState.value.code || !formState.value.name || !formState.value.status) {
    message.error('Vui lòng điền các trường bắt buộc')
    return
  }

  loading.value = true
  try {
    const id = route.params.id as string
    await mhnkService.update(id, formState.value)
    message.success('Cập nhật thành công')
    router.push('/extracurricular/subjects')
  } catch (error) {
    message.error('Có lỗi xảy ra')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
:deep(.custom-select .ant-select-selector) {
  min-height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
