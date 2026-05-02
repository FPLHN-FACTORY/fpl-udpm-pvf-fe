<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chi tiết Năm học" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon @click="$router.push(`/cultural/school-year/edit/${$route.params.id}`)" />
      </template>

      <div class="border border-gray-100 rounded-lg overflow-hidden mb-8">
        <div class="grid grid-cols-[200px_1fr] border-b border-gray-100 last:border-0" v-for="item in details" :key="item.label">
          <div class="bg-gray-50/50 p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100">
            {{ item.label }}
          </div>
          <div class="p-4 text-[13px] text-gray-600">
            <template v-if="item.key === 'status'">
              <BaseTag :type="schoolYear?.isCurrent ? 'success' : 'default'" class="!rounded-md !px-3">
                {{ schoolYear?.isCurrent ? 'Năm học hiện tại' : 'Không phải năm học hiện tại' }}
              </BaseTag>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import { schoolYearService } from '@/services/cultural/school-year'
import type { SchoolYear } from '@/types/school-year'

const route = useRoute()
const schoolYear = ref<SchoolYear | null>(null)

const breadcrumbs = [
  { title: 'Quản lý học tập văn hóa', path: '#' },
  { title: 'Năm học', path: '/cultural/school-year' },
  { title: 'Chi tiết Năm học', path: '#' }
]

const details = computed(() => [
  { label: 'Năm học', value: schoolYear.value?.name || '', key: 'name' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45', key: 'updatedAt' },
  { label: 'Trạng thái', value: '', key: 'status' }
])

onMounted(async () => {
  const id = route.params.id as string
  try {
    const data = await schoolYearService.getById(id)
    if (data) {
      schoolYear.value = data
    }
  } catch (error) {
    console.error('Failed to fetch details')
  }
})
</script>

