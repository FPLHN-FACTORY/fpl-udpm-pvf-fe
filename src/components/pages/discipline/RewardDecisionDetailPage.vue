<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Chi tiết Quyết định khen thưởng" 
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <ButtonBack 
            @click="handleBack"
          />
          <a-button 
            class="!bg-[#ffab00] hover:!bg-[#e09600] !text-white !border-none !rounded-md !h-[38px] !px-4 !font-medium"
            @click="handleEdit"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </template>

      <div class="p-6 max-w-5xl mx-auto">
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">ID biên bản</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.recordId }}</div>
          </div>
          
          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Học viên</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.studentName }}</div>
          </div>

          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Mẫu biên bản</div>
            <div class="w-2/3 md:w-3/4 flex items-center justify-between">
              <span class="text-[#697a8d] text-[13px]">{{ decision.templateName }}</span>
              <a-button 
                class="!bg-[#e0e1e2] hover:!bg-[#d5d6d7] !text-[#566a7f] !border-none !rounded-md !h-8 !px-3 !text-[12px] !font-medium"
              >
                Xem Biên Bản
              </a-button>
            </div>
          </div>

          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Ngày quyết định</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.decisionDate }}</div>
          </div>

          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Người quyết định</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.decider }}</div>
          </div>

          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Mô tả lý do khen thưởng</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px] py-3">{{ decision.reason }}</div>
          </div>

          <div class="flex items-center min-h-[56px] border-b border-gray-200 px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Thời gian tạo</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.createdAt }}</div>
          </div>

          <div class="flex items-center min-h-[56px] px-6">
            <div class="w-1/3 md:w-1/4 text-[#566a7f] font-bold text-[13px]">Thời gian cập nhật</div>
            <div class="w-2/3 md:w-3/4 text-[#697a8d] text-[13px]">{{ decision.updatedAt }}</div>
          </div>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'

const router = useRouter()
const route = useRoute()

const breadcrumbs = [
  { title: 'Kỷ luật Khen thưởng', path: '#' },
  { title: 'Quyết định khen thưởng', path: '/discipline/reward-decisions' }
]

const decision = reactive({
  id: '',
  recordId: '',
  studentName: '',
  templateName: '',
  decisionDate: '',
  decider: '',
  reason: '',
  createdAt: '',
  updatedAt: ''
})

onMounted(() => {
  // Mock data fetching based on route params
  const id = route.params.id
  if (id) {
    decision.id = id as string
    decision.recordId = 'HS001'
    decision.studentName = 'Nguyễn Văn An'
    decision.templateName = 'Nguyễn Văn An' // Based on Figma mockup exactly
    decision.decisionDate = '10/01/2025'
    decision.decider = 'Nguyễn Minh Quân'
    decision.reason = 'Được khen'
    decision.createdAt = '10/01/2025 09:00'
    decision.updatedAt = '12/01/2025 14:30'
  }
})

const handleBack = () => {
  router.push('/discipline/reward-decisions')
}

const handleEdit = () => {
  router.push(`/discipline/reward-decisions/edit/${decision.id}`)
}
</script>
