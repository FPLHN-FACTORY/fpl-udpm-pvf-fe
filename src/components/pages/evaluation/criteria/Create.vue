<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Tiêu chí đánh giá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Thêm mới Tiêu chí đánh giá</h2>
        <ButtonBack @click="$router.push('/evaluation/criteria')" />
      </div>

      <div class="space-y-8 pb-10">
        <div class="space-y-4">
          <InputForm v-model="form.name" label="Tên tiêu chí" />
          
          <div class="relative">
            <textarea
              v-model="form.desc"
              rows="4"
              placeholder="Mô tả"
              class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-[#d9dee3] focus:ring-2 focus:ring-inset focus:ring-[#696cff] sm:text-sm sm:leading-6 placeholder:text-gray-400"
            ></textarea>
          </div>

          <InputForm v-model="form.maxScore" label="Điểm tối đa" type="number" />
          <InputForm v-model="form.weight" label="Trọng số" type="number" />
          <InputForm v-model="form.order" label="Thứ tự hiển thị" type="number" />

          <SelectForm v-model="form.status" label="Trạng thái" :options="statusOptions" />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 pt-10">
          <ButtonAddNoIcon @click="handleSubmit" text="Thêm Mới" />
          <ButtonResetYellow @click="handleReset" text="Đặt Lại" />
        </div>
      </div>
      

    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import SelectForm from '../../../atoms/inputs/SelectForm.vue'

const router = useRouter()

const form = reactive({
  name: '',
  desc: '',
  maxScore: '',
  weight: '',
  order: '',
  status: undefined
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
  form.name = ''
  form.desc = ''
  form.maxScore = ''
  form.weight = ''
  form.order = ''
  form.status = undefined
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
