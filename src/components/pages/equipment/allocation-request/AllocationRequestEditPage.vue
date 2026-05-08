<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chỉnh sửa Yêu cầu cấp phát" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <SelectForm v-model:value="formData.equipmentType" label="Dụng cụ yêu cầu cấp phát dụng cụ">
          <a-select-option value="day-khang-luc">Dây khăng lực</a-select-option>
          <a-select-option value="bong-da">Bóng đá</a-select-option>
          <a-select-option value="giay-the-thao">Giày thể thao</a-select-option>
        </SelectForm>

        <InputForm 
          v-model.number="formData.quantity" 
          label="Số lượng yêu cầu cấp phát" 
          type="number"
          placeholder="Nhập số lượng"
        />

        <SelectForm v-model:value="formData.status" label="Trạng thái yêu cầu">
          <a-select-option value="pending">Chờ duyệt</a-select-option>
          <a-select-option value="approved">Đã duyệt</a-select-option>
          <a-select-option value="rejected">Từ chối</a-select-option>
        </SelectForm>

        <TextareaForm v-model="formData.note" label="Ghi chú liên quan đến yêu cầu" placeholder="Nhập ghi chú" :rows="4" />

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
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()
const route = useRoute()

const breadcrumbs = [
  { title: 'Quản lý công cụ -dụng cụ thi đấu', path: '#' },
  { title: 'Yêu cầu cấp phát', path: '/equipment/allocation-request' },
  { title: 'Chỉnh sửa Yêu cầu cấp phát', path: '#' }
]

const formData = ref({
  id: '',
  equipmentType: undefined,
  quantity: 1,
  status: 'pending',
  note: ''
})

const originalData = ref<any>(null)

onMounted(async () => {
  const id = route.params.id as string
  try {
    // Mock data
    const mockData = {
      id: '1',
      equipmentType: 'day-khang-luc',
      quantity: 1,
      status: 'approved',
      note: ''
    }
    formData.value = { ...mockData }
    originalData.value = { ...mockData }
  } catch (error) {
    message.error('Không tìm thấy dữ liệu')
    router.push('/equipment/allocation-request')
  }
})

const handleSubmit = async () => {
  if (!formData.value.equipmentType) {
    message.warning('Vui lòng chọn dụng cụ')
    return
  }
  try {
    message.success('Cập nhật yêu cầu cấp phát thành công')
    router.push('/equipment/allocation-request')
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
