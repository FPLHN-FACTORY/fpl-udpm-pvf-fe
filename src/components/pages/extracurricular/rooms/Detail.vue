<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khoá</a-breadcrumb-item>
      <a-breadcrumb-item>Phòng học ngoại khoá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Statistic Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a-card v-for="(stat, index) in stats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.title }}</p>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl font-bold text-gray-800">{{ stat.value }}</span>
              <span v-if="stat.percentage" class="text-xs font-semibold" :class="stat.trendClass">
                ({{ stat.percentage }})
              </span>
            </div>
          </div>
          <div :class="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
             <NavIcon :name="stat.icon" class-name="w-6 h-6 text-white" />
          </div>
        </div>
      </a-card>
    </div>

    <!-- Basic Info Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Chi tiết Phòng học ngoại khoá</h2>
        <div class="flex gap-2">
          <ButtonBack @click="$router.push('/extracurricular/rooms')" />
          <ButtonEdit @click="$router.push(`/extracurricular/rooms/edit/${$route.params.id}`)" />
        </div>
      </div>

      <DetailList :items="detailItems">
        <template #value-status="{ item }">
          <BaseTag :type="item.value === 'active' ? 'success' : item.value === 'inactive' ? 'warning' : 'default'">
            {{ item.value === 'active' ? 'Đang sử dụng' : item.value === 'inactive' ? 'Tạm ngưng' : 'Đang bảo trì' }}
          </BaseTag>
        </template>
      </DetailList>
      
      <!-- Footer -->
      <div class="flex items-center justify-between mt-12 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import ButtonEdit from '../../../atoms/buttons/ButtonEdit.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import DetailList from '../../../molecules/DetailList.vue'

const router = useRouter()

// Stats Data for Detail
const stats = [
  { 
    title: 'Tổng số lớp', 
    value: '21', 
    icon: 'BxBookAlt', 
    iconBg: 'bg-indigo-100 text-indigo-500' 
  },
  { 
    title: 'Tỷ lệ sử dụng', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxTimer', 
    iconBg: 'bg-yellow-100 text-yellow-500' 
  },
  { 
    title: 'Số buổi học/tuần', 
    value: '1', 
    percentage: '5%', 
    trendClass: 'text-green-500', 
    icon: 'BxCalendar', 
    iconBg: 'bg-yellow-100 text-yellow-500' 
  }
]

const detailItems = [
  { label: 'ID địa điểm', value: 'DD001' },
  { label: 'Tên địa điểm', value: 'Phòng học chiến thuật PVF' },
  { label: 'Địa chỉ', value: 'Trung tâm đào tạo bóng đá PVF, Hưng Yên' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45' },
  { key: 'status', label: 'Trạng thái', value: 'active' }
]
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
