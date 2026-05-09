<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Chỉnh sửa Quyết định khen thưởng" 
    >
      <template #actions>
        <ButtonBack 
          @click="handleBack"
        />
      </template>

      <div class="p-6 max-w-4xl mx-auto">
        <a-form layout="vertical" class="w-full">
          <a-form-item label="Học viên">
            <a-select 
              v-model:value="form.studentId" 
              placeholder="Input" 
              class="w-full !h-[38px]"
              :options="studentOptions"
            />
          </a-form-item>

          <a-form-item label="Mẫu biên bản">
            <a-select 
              v-model:value="form.templateId" 
              placeholder="Input" 
              class="w-full !h-[38px]"
              :options="templateOptions"
            />
          </a-form-item>

          <a-form-item label="Ngày quyết định">
            <a-date-picker 
              v-model:value="form.decisionDate" 
              placeholder="Input" 
              class="w-full !h-[38px]"
              format="DD/MM/YYYY"
            />
          </a-form-item>

          <a-form-item label="Người quyết định">
            <a-select 
              v-model:value="form.decider" 
              placeholder="Input" 
              class="w-full !h-[38px]"
              :options="deciderOptions"
            />
          </a-form-item>

          <a-form-item label="Mô tả lý do khen thưởng">
            <a-textarea 
              v-model:value="form.reason" 
              placeholder="Mô tả lý do khen thưởng" 
              :rows="5" 
              class="w-full !rounded-md"
            />
          </a-form-item>

          <a-form-item label="Trạng thái">
            <a-select 
              v-model:value="form.status" 
              placeholder="Input" 
              class="w-full !h-[38px]"
              :options="statusOptions"
            />
          </a-form-item>

          <div class="flex justify-center gap-3 mt-8">
            <a-button 
              type="primary" 
              class="!bg-[#dc2626] !border-none !h-[38px] !px-6 !font-medium"
              @click="handleSubmit"
            >
              Cập Nhật
            </a-button>
            <a-button 
              class="!bg-[#eab308] hover:!bg-[#ca8a04] !text-white !border-none !h-[38px] !px-6 !font-medium"
              @click="handleReset"
            >
              Đặt Lại
            </a-button>
          </div>
        </a-form>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()

const breadcrumbs = [
  { title: 'Kỷ luật Khen thưởng', path: '#' },
  { title: 'Quyết định khen thưởng', path: '/discipline/reward-decisions' }
]

const form = reactive({
  studentId: undefined as string | undefined,
  templateId: undefined as string | undefined,
  decisionDate: null as any,
  decider: undefined as string | undefined,
  reason: '',
  status: undefined as string | undefined
})

const studentOptions = [
  { value: 'hs1', label: 'Nguyễn Văn An' },
  { value: 'hs2', label: 'Trần Thị B' }
]

const templateOptions = [
  { value: 't1', label: 'BB Khen thưởng' },
  { value: 't2', label: 'BB Khác' }
]

const deciderOptions = [
  { value: 'q1', label: 'Nguyễn Minh Quân' }
]

const statusOptions = [
  { value: 'published', label: 'Đã ban hành' },
  { value: 'draft', label: 'Nháp' }
]

onMounted(() => {
  // Mock data for edit form based on route params
  const id = route.params.id
  if (id) {
    // In a real app, you would fetch data here based on the ID
    // form.studentId = 'hs1'
    // form.templateId = 't1'
    // form.decisionDate = dayjs('2025-01-10')
    // form.decider = 'q1'
    // form.reason = 'Mô tả lý do khen thưởng'
    // form.status = 'published'
  }
})

const handleBack = () => {
  router.push('/discipline/reward-decisions')
}

const handleSubmit = () => {
  // Basic validation
  if (!form.studentId && form.studentId !== undefined) {
    message.error('Vui lòng kiểm tra lại dữ liệu')
    return
  }
  message.success('Cập nhật thành công')
  setTimeout(() => {
    router.push('/discipline/reward-decisions')
  }, 1000)
}

const handleReset = () => {
  form.studentId = undefined
  form.templateId = undefined
  form.decisionDate = null
  form.decider = undefined
  form.reason = ''
  form.status = undefined
}
</script>

<style scoped>
:deep(.ant-form-item-label > label) {
  color: #566a7f;
  font-weight: 500;
  font-size: 13px;
}
:deep(.ant-select-selector),
:deep(.ant-picker),
:deep(.ant-input) {
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}
:deep(.ant-select-selection-item) {
  line-height: 36px !important;
}
</style>
