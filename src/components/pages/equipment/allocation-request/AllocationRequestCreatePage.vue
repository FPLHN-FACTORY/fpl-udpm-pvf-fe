<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới Yêu cầu cấp phát" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <InputForm v-model="formData.studentName" label="Học viên yêu cầu" placeholder="Nhập tên học viên" />
        
        <InputForm 
          v-model="formData.requestDate" 
          label="Ngày yêu cầu cấp phát dụng cụ" 
          type="date"
        />

        <SelectForm v-model:value="formData.equipmentType" label="Dụng cụ yêu cầu cấp phát">
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

        <TextareaForm v-model="formData.note" label="Ghi chú" placeholder="Nhập ghi chú" :rows="4" />

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
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý công cụ -dụng cụ thi đấu', path: '#' },
  { title: 'Yêu cầu cấp phát', path: '/equipment/allocation-request' },
  { title: 'Thêm mới Yêu cầu cấp phát', path: '#' }
]

const formData = ref({
  studentName: '',
  requestDate: '',
  equipmentType: undefined,
  quantity: 1,
  status: 'pending',
  note: ''
})

const handleSubmit = async () => {
  if (!formData.value.studentName) {
    message.warning('Vui lòng nhập tên học viên')
    return
  }
  if (!formData.value.requestDate) {
    message.warning('Vui lòng chọn ngày yêu cầu')
    return
  }
  if (!formData.value.equipmentType) {
    message.warning('Vui lòng chọn dụng cụ')
    return
  }
  try {
    message.success('Thêm mới yêu cầu cấp phát thành công')
    router.push('/equipment/allocation-request')
  } catch (error) {
    message.error('Thêm mới thất bại')
  }
}

const resetForm = () => {
  formData.value = {
    studentName: '',
    requestDate: '',
    equipmentType: undefined,
    quantity: 1,
    status: 'pending',
    note: ''
  }
}
</script>
