<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chi tiết lịch sử xử lý yêu cầu" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="border border-gray-100 rounded-lg overflow-hidden">
        <div class="grid grid-cols-[200px_1fr] border-b border-gray-100 last:border-0" v-for="item in details" :key="item.label">
          <div class="bg-gray-50/50 p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100">
            {{ item.label }}
          </div>
          <div class="p-4 text-[13px] text-gray-600">
            <template v-if="item.key === 'action'">
              <BaseTag :type="history?.actionType" class="!rounded-md !px-3">
                {{ item.value }}
              </BaseTag>
            </template>
            <template v-else-if="item.key === 'user'">
              <div class="flex items-center gap-2">
                <img :src="history?.userAvatar" class="w-8 h-8 rounded-full" />
                <div>
                  <div class="font-medium">{{ history?.userName }}</div>
                  <div class="text-gray-400 text-[11px]">{{ history?.userEmail }}</div>
                </div>
              </div>
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
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'

const route = useRoute()
const history = ref<any>(null)

const breadcrumbs = [
  { title: 'Quản lý công cụ -dụng cụ thi đấu', path: '#' },
  { title: 'Yêu cầu cấp phát', path: '/equipment/allocation-request' },
  { title: 'Chi tiết Yêu cầu cấp phát', path: `/equipment/allocation-request/detail/${route.params.requestId}` },
  { title: 'Chi tiết lịch sử xử lý yêu cầu', path: '#' }
]

const details = computed(() => [
  { label: 'ID lịch sử xử lý yêu cầu', value: history.value?.id || '1', key: 'id' },
  { label: 'ID yêu cầu cấp phát dụng cụ', value: '18A121212', key: 'requestId' },
  { label: 'Hành động thực hiện trên yêu cầu', value: history.value?.action || '', key: 'action' },
  { label: 'Ngày thực hiện yêu cầu', value: history.value?.time || '', key: 'time' },
  { label: 'Người xử lý yêu cầu', value: '', key: 'user' },
  { label: 'Ghi chú liên quan đến yêu cầu', value: '-', key: 'note' },
  { label: 'Thời gian tạo bản ghi lịch sử', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật lịch sử', value: '2026-01-20 10:15:45', key: 'updatedAt' }
])

onMounted(async () => {
  const historyId = route.params.historyId as string
  try {
    // Mock data based on historyId
    const mockHistories: Record<string, any> = {
      '69979': {
        id: '#69979',
        time: 'Apr 15, 2023, 10:21',
        userName: 'Cristine Easom',
        userEmail: 'ceasomw@theguardian.com',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        action: 'Tạo',
        actionType: 'warning',
        objectType: 'USER',
        object: 'U001_NguyenVanA'
      },
      '69980': {
        id: '#69980',
        time: 'Apr 16, 2023, 14:30',
        userName: 'Phạm Văn Hải',
        userEmail: 'phamhai@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        action: 'Duyệt',
        actionType: 'success',
        objectType: 'ALLOCATION_REQUEST',
        object: 'AR001_YeuCauCapPhat'
      },
      '69981': {
        id: '#69981',
        time: 'Apr 17, 2023, 09:15',
        userName: 'Nguyễn Thị Mai',
        userEmail: 'nguyenmai@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=3',
        action: 'Cập nhật',
        actionType: 'warning',
        objectType: 'ALLOCATION_REQUEST',
        object: 'AR001_YeuCauCapPhat'
      }
    }
    
    history.value = mockHistories[historyId] || mockHistories['69979']
  } catch (error) {
    console.error('Failed to fetch history details')
  }
})
</script>
