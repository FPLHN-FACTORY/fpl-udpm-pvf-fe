<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khoá</a-breadcrumb-item>
      <a-breadcrumb-item>Phòng học ngoại khoá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Điều chỉnh Phòng học ngoại khoá</h2>
        <ButtonBack @click="$router.push('/extracurricular/rooms')" />
      </div>

      <div class="max-w-4xl space-y-6">
        <div class="space-y-4">
          <InputForm v-model="form.name" placeholder="Tên địa điểm" />
          <InputForm v-model="form.address" placeholder="Địa chỉ" />
          <SelectForm v-model="form.status" placeholder="Trạng thái" :options="statusOptions" />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 pt-10">
          <ButtonAddNoIcon @click="handleSubmit" text="Cập Nhật" />
          <ButtonResetYellow @click="handleReset" text="Đặt Lại" />
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-between mt-12 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import SelectForm from '../../../atoms/inputs/SelectForm.vue'

const router = useRouter()
const route = useRoute()

const form = reactive({
  name: '',
  address: '',
  status: undefined as any
})

const originalData = {
  name: 'Phòng học chiến thuật PVF',
  address: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên',
  status: 'active'
}

onMounted(() => {
  console.log('Edit ID:', route.params.id)
  handleReset() // Pre-fill with original data
})

const statusOptions = [
  { value: 'active', label: 'Đang sử dụng' },
  { value: 'maintenance', label: 'Đang bảo trì' },
  { value: 'inactive', label: 'Tạm ngưng' }
]

const handleSubmit = () => {
  console.log('Submit form:', form)
  router.push('/extracurricular/rooms')
}

const handleReset = () => {
  form.name = originalData.name
  form.address = originalData.address
  form.status = originalData.status
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
