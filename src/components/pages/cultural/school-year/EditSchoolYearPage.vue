<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Điều chỉnh Năm học" padded title-size="xl">
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
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleSubmit" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import { schoolYearService } from '@/services/cultural/school-year'

const router = useRouter()
const route = useRoute()

const breadcrumbs = [
  { title: 'Quản lý học tập văn hóa', path: '#' },
  { title: 'Năm học', path: '/cultural/school-year' },
  { title: 'Điều chỉnh Năm học', path: '#' }
]

const formData = ref({
  id: '',
  name: '',
  status: 'active',
  startDate: '',
  endDate: ''
})

const originalData = ref<any>(null)

onMounted(async () => {
  const id = route.params.id as string
  try {
    const data = await schoolYearService.getById(id)
    if (data) {
      formData.value = {
        id: data.id,
        name: data.name,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate
      }
      originalData.value = { ...formData.value }
    }
  } catch (error) {
    message.error('Không tìm thấy dữ liệu')
    router.push('/cultural/school-year')
  }
})

const handleSubmit = async () => {
  if (!formData.value.name) {
    message.warning('Vui lòng nhập tên năm học')
    return
  }
  try {
    await schoolYearService.update({ ...formData.value })
    message.success('Cập nhật năm học thành công')
    router.push('/cultural/school-year')
  } catch (error) {
    message.error('Cập nhật thất bại')
  }
}

const resetForm = () => {
  if (originalData.value) {
    formData.value = { ...originalData.value }
  }
}
</script>
