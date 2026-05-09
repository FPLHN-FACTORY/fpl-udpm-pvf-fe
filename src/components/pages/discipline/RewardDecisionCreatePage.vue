<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Thêm mới Quyết định khen thưởng" 
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
              placeholder="" 
              class="w-full !h-[38px]"
              :options="studentOptions"
            />
          </a-form-item>

          <a-form-item label="Mẫu biên bản">
            <a-select 
              v-model:value="form.templateId" 
              placeholder="" 
              class="w-full !h-[38px]"
              :options="templateOptions"
            />
          </a-form-item>

          <a-form-item label="Ngày quyết định">
            <a-date-picker 
              v-model:value="form.decisionDate" 
              placeholder="" 
              class="w-full !h-[38px]"
              format="DD/MM/YYYY"
            />
          </a-form-item>

          <a-form-item label="Người quyết định">
            <a-select 
              v-model:value="form.decider" 
              placeholder="" 
              class="w-full !h-[38px]"
              :options="deciderOptions"
            />
          </a-form-item>

          <a-form-item label="Mô tả lý do khen thưởng">
            <a-textarea 
              v-model:value="form.reason" 
              placeholder="" 
              :rows="5" 
              class="w-full !rounded-md"
            />
          </a-form-item>

          <a-form-item label="Trạng thái">
            <a-select 
              v-model:value="form.status" 
              placeholder="" 
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
              Thêm Mới
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Kỷ luật Khen thưởng', path: '#' },
  { title: 'Quyết định khen thưởng', path: '/discipline/reward-decisions' }
]

const form = reactive({
  studentId: undefined,
  templateId: undefined,
  decisionDate: null,
  decider: undefined,
  reason: '',
  status: undefined
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

const handleBack = () => {
  router.push('/discipline/reward-decisions')
}

const handleSubmit = () => {
  if (!form.studentId) {
    message.error('Vui lòng chọn học viên')
    return
  }
  message.success('Thêm mới thành công')
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
