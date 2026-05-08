<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới Hoạt động ngoại khoá" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm v-model="formData.name" label="Tên hoạt động" />
        <TextareaForm v-model="formData.description" label="Mô tả hoạt động" :rows="4" />
        <SelectForm v-model:value="formData.location" label="Địa điểm tổ chức">
          <a-select-option value="san1">Sân tập số 1 PVF</a-select-option>
          <a-select-option value="san2">Sân tập số 2 PVF</a-select-option>
        </SelectForm>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium">Thời gian bắt đầu</label>
            <a-date-picker v-model:value="formData.start" show-time class="w-full !h-[42px] !border-[#d9dee3] rounded-md" />
          </div>
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium">Thời gian kết thúc</label>
            <a-date-picker v-model:value="formData.end" show-time class="w-full !h-[42px] !border-[#d9dee3] rounded-md" />
          </div>
        </div>

        <SelectForm v-model:value="formData.teacher" label="Người tổ chức/phụ trách">
          <a-select-option value="1">Trần Minh Tuấn</a-select-option>
          <a-select-option value="2">Nguyễn Văn Hùng</a-select-option>
        </SelectForm>
        <TextareaForm v-model="formData.note" label="Ghi chú thêm" :rows="4" />
        <SelectForm v-model:value="formData.status" label="Trạng thái">
          <a-select-option value="active">Đang diễn ra</a-select-option>
          <a-select-option value="pending">Sắp diễn ra</a-select-option>
        </SelectForm>

        <div class="mt-4 flex items-center justify-center gap-4">
          <ButtonAddNoIcon :loading="loading" text="Thêm Mới" @click="handleSubmit" />
          <ButtonResetYellow text="Đặt Lại" @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import { activityService } from '@/services/extracurricular/activity'

const router = useRouter()
const loading = ref(false)

const breadcrumbs = [
  { title: 'Quản lý hoạt động ngoại khoá', path: '#' },
  { title: 'Hoạt động ngoại khoá', path: '/extracurricular/activities/list' },
  { title: 'Thêm mới', path: '#' }
]

const formData = ref({
  name: '', description: '', location: undefined, start: null, end: null, teacher: undefined, note: '', status: undefined
})

const handleSubmit = async () => {
  if (!formData.value.name) return message.warning('Vui lòng nhập tên hoạt động!')
  
  loading.value = true
  try {
    await activityService.create(formData.value)
    message.success('Thêm mới hoạt động thành công!')
    router.push('/extracurricular/activities/list')
  } catch (error) {
    message.error('Có lỗi xảy ra!')
  } finally {
    loading.value = false
  }
}

const resetForm = () => { 
  formData.value = { name: '', description: '', location: undefined, start: null, end: null, teacher: undefined, note: '', status: undefined }
}
</script>