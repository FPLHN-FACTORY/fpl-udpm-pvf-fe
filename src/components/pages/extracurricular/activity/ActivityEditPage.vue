// fpl-udpm-pvf-fe/src/components/pages/extracurricular/ActivityEditPage.vue
<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Điều chỉnh Hoạt động ngoại khoá" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div v-if="loading" class="py-10 text-center text-gray-500">Đang tải dữ liệu...</div>
      
      <div v-else class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm v-model="formData.name" label="Tên hoạt động" />
        <TextareaForm v-model="formData.description" label="Mô tả" :rows="4" />
        <SelectForm v-model:value="formData.location" label="Địa điểm tổ chức">
          <a-select-option value="Sân tập số 1 PVF">Sân tập số 1 PVF</a-select-option>
          <a-select-option value="Phòng Gym PVF">Phòng Gym PVF</a-select-option>
        </SelectForm>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium">Thời gian bắt đầu</label>
            <!-- Bổ sung v-model và value-format để nhận/hiển thị String Data -->
            <a-date-picker 
              v-model:value="formData.start" 
              value-format="DD/MM/YYYY HH:mm"
              format="DD/MM/YYYY HH:mm"
              show-time 
              class="w-full !h-[42px] !border-[#d9dee3] rounded-md" 
            />
          </div>
          <div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium">Thời gian kết thúc</label>
            <a-date-picker 
              v-model:value="formData.end" 
              value-format="DD/MM/YYYY HH:mm"
              format="DD/MM/YYYY HH:mm"
              show-time 
              class="w-full !h-[42px] !border-[#d9dee3] rounded-md" 
            />
          </div>
        </div>

        <SelectForm v-model:value="formData.teacherId" label="Người tổ chức/phụ trách">
          <a-select-option value="1">Trần Minh Tuấn</a-select-option>
          <a-select-option value="2">Nguyễn Văn Hùng</a-select-option>
        </SelectForm>
        <TextareaForm v-model="formData.note" label="Ghi chú thêm" :rows="4" />
        <SelectForm v-model:value="formData.status" label="Trạng thái">
          <a-select-option value="Đang diễn ra">Đang diễn ra</a-select-option>
          <a-select-option value="Sắp diễn ra">Sắp diễn ra</a-select-option>
        </SelectForm>

        <div class="mt-4 flex items-center justify-center gap-4">
          <ButtonSaveNoIcon :loading="submitting" text="Cập Nhật" @click="handleUpdate" />
          <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import { activityService } from '@/services/extracurricular/activity'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const submitting = ref(false)
const originalData = ref<any>(null)

const breadcrumbs = [
  { title: 'Quản lý hoạt động ngoại khoá', path: '#' },
  { title: 'Hoạt động ngoại khoá', path: '/extracurricular/activities/list' },
  { title: 'Điều chỉnh', path: '#' }
]

const formData = ref<any>({})

const fetchDetail = async () => {
  try {
    const id = route.params.id as string
    const res = await activityService.getById(id)
    originalData.value = { ...res.data }
    formData.value = { ...res.data }
  } catch (error) {
    message.error('Lỗi khi tải dữ liệu!')
  } finally {
    loading.value = false
  }
}

const handleUpdate = async () => {
  submitting.value = true
  try {
    await activityService.update(route.params.id as string, formData.value)
    message.success('Cập nhật hoạt động thành công!')
    router.push('/extracurricular/activities/list')
  } catch (error) {
    message.error('Cập nhật thất bại!')
  } finally {
    submitting.value = false
  }
}

const handleReset = () => {
  formData.value = { ...originalData.value }
}

onMounted(() => {
  fetchDetail()
})
</script>