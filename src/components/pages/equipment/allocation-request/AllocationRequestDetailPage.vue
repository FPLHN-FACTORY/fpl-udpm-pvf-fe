<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chi tiết Yêu cầu cấp phát" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon @click="$router.push(`/equipment/allocation-request/edit/${$route.params.id}`)" />
      </template>

      <div class="border border-gray-100 rounded-lg overflow-hidden mb-8">
        <div class="grid grid-cols-[200px_1fr] border-b border-gray-100 last:border-0" v-for="item in details" :key="item.label">
          <div class="bg-gray-50/50 p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100">
            {{ item.label }}
          </div>
          <div class="p-4 text-[13px] text-gray-600">
            <template v-if="item.key === 'status'">
              <BaseTag :type="getStatusType(request?.status)" class="!rounded-md !px-3">
                {{ getStatusText(request?.status) }}
              </BaseTag>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-[16px] font-bold text-[#566a7f] mb-4">Lịch sử xử lý yêu cầu</h3>
        <div class="overflow-x-auto">
          <table class="w-full border border-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">#</th>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">THỜI GIAN</th>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">NGƯỜI DÙNG</th>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">HÀNH ĐỘNG</th>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">LOẠI ĐỐI TƯỢNG</th>
                <th class="p-3 text-left text-[13px] font-bold text-[#566a7f] border-b border-gray-100">ĐỐI TƯỢNG</th>
                <th class="p-3 text-center text-[13px] font-bold text-[#566a7f] border-b border-gray-100">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in logs" :key="index" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="p-3 text-[13px] text-gray-600">{{ log.id }}</td>
                <td class="p-3 text-[13px] text-gray-600">{{ log.time }}</td>
                <td class="p-3 text-[13px] text-gray-600">
                  <div class="flex items-center gap-2">
                    <img :src="log.userAvatar" class="w-8 h-8 rounded-full" />
                    <div>
                      <div class="font-medium">{{ log.userName }}</div>
                      <div class="text-gray-400 text-[11px]">{{ log.userEmail }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-3 text-[13px]">
                  <BaseTag :type="log.actionType" class="!rounded-md !px-3">{{ log.action }}</BaseTag>
                </td>
                <td class="p-3 text-[13px] text-gray-600">{{ log.objectType }}</td>
                <td class="p-3 text-[13px] text-gray-600">{{ log.object }}</td>
                <td class="p-3 text-center">
                  <button @click="viewHistoryDetail(log)" class="text-gray-400 hover:text-gray-600">
                    <NavIcon name="BxShow" :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AdminPage from '@/components/templates/AdminPage.vue'

const route = useRoute()
const router = useRouter()
const request = ref<any>(null)

const breadcrumbs = [
  { title: 'Quản lý công cụ -dụng cụ thi đấu', path: '#' },
  { title: 'Yêu cầu cấp phát', path: '/equipment/allocation-request' },
  { title: 'Chi tiết Yêu cầu cấp phát', path: '#' }
]

const logs: Array<{
  id: string
  time: string
  userName: string
  userEmail: string
  userAvatar: string
  action: string
  actionType: 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger'
  objectType: string
  object: string
}> = [
  {
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
  {
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
  {
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
]

const viewHistoryDetail = (log: any) => {
  const requestId = route.params.id
  const historyId = log.id.replace('#', '')
  router.push(`/equipment/allocation-request/detail/${requestId}/history/${historyId}`)
}

const getStatusType = (status?: string): 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger' => {
  const types: Record<string, 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger'> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status || 'pending'] || 'default'
}

const getStatusText = (status?: string) => {
  const texts: Record<string, string> = {
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối'
  }
  return texts[status || 'pending'] || 'Không xác định'
}

const details = computed(() => [
  { label: 'ID yêu cầu cấp phát dụng cụ', value: request.value?.id || '1', key: 'id' },
  { label: 'ID học viên yêu cầu', value: '18A121212 - Nguyễn Xuân An', key: 'student' },
  { label: 'Ngày yêu cầu cấp phát dụng cụ', value: '2025-01-05 08:30:00', key: 'requestDate' },
  { label: 'Dụng cụ yêu cầu cấp phát', value: 'Dây khăng lực', key: 'equipmentType' },
  { label: 'Số lượng yêu cầu cấp phát', value: '1', key: 'quantity' },
  { label: 'Trạng thái yêu cầu', value: '', key: 'status' },
  { label: 'Ngày duyệt yêu cầu', value: '2025-01-05 08:30:00', key: 'approvalDate' },
  { label: 'Người xử lý yêu cầu', value: 'HD123 - Phạm Văn Hải', key: 'approver' },
  { label: 'Ghi chú liên quan đến yêu cầu', value: '-', key: 'note' },
  { label: 'Thời gian tạo yêu cầu', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật yêu cầu', value: '2026-01-20 10:15:45', key: 'updatedAt' }
])

onMounted(async () => {
  try {
    // Mock data
    request.value = {
      id: '1',
      studentCode: '18A121212',
      studentName: 'Nguyễn Xuân An',
      requestDate: '2025-01-05 08:30:00',
      equipmentType: 'Dây khăng lực',
      quantity: 1,
      status: 'approved',
      approver: 'HD123 - Phạm Văn Hải',
      approvalDate: '2025-01-05 08:30:00',
      note: '-'
    }
  } catch (error) {
    console.error('Failed to fetch details')
  }
})
</script>
