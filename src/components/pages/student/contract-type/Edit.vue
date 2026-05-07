<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Loại hợp đồng</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Điều chỉnh Loại hợp đồng</h2>
        <ButtonBack @click="$router.push('/student/contract-type')" />
      </div>

      <div class="max-w-4xl space-y-6">
        <div class="space-y-4">
          <InputForm v-model="form.name" placeholder="Tên loại hợp đồng" />
          
          <div class="relative">
            <textarea
              v-model="form.desc"
              rows="4"
              placeholder="Mô tả nhóm quyền"
              class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-[#d9dee3] focus:ring-2 focus:ring-inset focus:ring-[#696cff] sm:text-sm sm:leading-6 placeholder:text-gray-400"
            ></textarea>
          </div>

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
  desc: '',
  status: undefined as any
})

const originalData = {
  name: 'Hợp đồng đào tạo cầu thủ trẻ',
  desc: 'Hợp đồng ký với học viên bóng đá PVF trong thời gian đào tạo, bao gồm quyền lợi đào tạo, sinh hoạt và nghĩa vụ tuân thủ quy chế trung tâm',
  status: 'active'
}

onMounted(() => {
  console.log('Edit ID:', route.params.id)
  handleReset()
})

const statusOptions = [
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'inactive', label: 'Ngừng sử dụng' }
]

const handleSubmit = () => {
  console.log('Submit form:', form)
  router.push('/student/contract-type')
}

const handleReset = () => {
  form.name = originalData.name
  form.desc = originalData.desc
  form.status = originalData.status
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
