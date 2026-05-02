<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới Năm học" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <InputForm v-model="formData.name" label="Năm học" placeholder="2024-2025" />
        
        <SelectForm v-model:value="formData.status" label="Trạng thái">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>

        <div class="mt-4 flex items-center justify-center gap-4">
          <ButtonAddNoIcon @click="handleSubmit" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import { schoolYearService } from '@/services/cultural/school-year'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý học tập văn hóa', path: '#' },
  { title: 'Năm học', path: '/cultural/school-year' },
  { title: 'Thêm mới Năm học', path: '#' }
]

const formData = ref({
  name: '',
  status: 'active',
  startDate: '2024-01-01', // Default or handle via picker
  endDate: '2024-12-31'
})

const handleSubmit = async () => {
  if (!formData.value.name) {
    message.warning('Vui lòng nhập tên năm học')
    return
  }
  try {
    await schoolYearService.create({ ...formData.value })
    message.success('Thêm mới năm học thành công')
    router.push('/cultural/school-year')
  } catch (error) {
    message.error('Thêm mới thất bại')
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
}
</script>

