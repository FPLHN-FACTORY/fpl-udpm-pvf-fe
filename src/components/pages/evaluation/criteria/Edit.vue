<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Tiêu chí đánh giá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Điều chỉnh Tiêu chí đánh giá</h2>
        <ButtonBack @click="$router.push('/evaluation/criteria')" />
      </div>

      <div class="max-w-4xl space-y-6">
        <div class="space-y-4">
          <InputForm v-model="form.name" placeholder="Tên tiêu chí" />
          
          <div class="relative">
            <textarea
              v-model="form.desc"
              rows="4"
              placeholder="Mô tả"
              class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-[#d9dee3] focus:ring-2 focus:ring-inset focus:ring-[#696cff] sm:text-sm sm:leading-6 placeholder:text-gray-400"
            ></textarea>
          </div>

          <InputForm v-model="form.maxScore" placeholder="Điểm tối đa" type="number" />
          <InputForm v-model="form.weight" placeholder="Trọng số" type="number" />
          <InputForm v-model="form.order" placeholder="Thứ tự hiển thị" type="number" />

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
  maxScore: '',
  weight: '',
  order: '',
  status: undefined as any
})

const originalData = {
  name: 'Thể lực',
  desc: 'Đánh giá sức bền, tốc độ và thể trạng',
  maxScore: '10',
  weight: '25',
  order: '1',
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
  router.push('/evaluation/criteria')
}

const handleReset = () => {
  form.name = originalData.name
  form.desc = originalData.desc
  form.maxScore = originalData.maxScore
  form.weight = originalData.weight
  form.order = originalData.order
  form.status = originalData.status
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
