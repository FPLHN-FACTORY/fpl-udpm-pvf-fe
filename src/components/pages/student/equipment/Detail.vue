<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Dụng cụ</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Detail Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Chi tiết Cơ sở đào tạo</h2>
        <div class="flex gap-3">
          <ButtonBackNoIcon @click="$router.back()" />
          <ButtonEditNoIcon @click="router.push(`/student/equipment/chinh-sua/${route.params.id}`)" />
        </div>
      </div>

      <!-- Details List -->
      <div class="border border-gray-100 rounded-xl overflow-hidden px-8">
        <div v-for="(item, index) in detailInfo" :key="index" 
             class="flex items-center py-5 border-b border-gray-100 last:border-0">
          <div class="w-[350px] font-bold text-gray-700 text-sm">
            {{ item.label }}
          </div>
          <div class="flex-1 text-sm text-gray-500 font-medium">
            <template v-if="item.key === 'status'">
              <a-tag color="green" class="rounded-md px-4 py-1 border-none font-bold bg-[#71DD3729] text-[#71DD37] text-[11px]">
                {{ item.value }}
              </a-tag>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import ButtonBackNoIcon from '@/components/atoms/buttons/ButtonBackNoIcon.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'

const router = useRouter()
const route = useRoute()

// Detail Data
const detailInfo = [
  { label: 'Tên dụng cụ', value: 'Áo tập luyện' },
  { label: 'Mô tả dụng cụ', value: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45' },
  { label: 'Trạng thái', value: 'Đang sử dụng', key: 'status' },
]
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
