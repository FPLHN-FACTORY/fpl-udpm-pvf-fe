<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <!-- Tổng số học viên -->
    <div class="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
      <div>
        <div class="text-sm text-gray-600 mb-1">Tổng số học viên</div>
        <div class="text-2xl font-bold text-gray-900">{{ stats.total }}</div>
      </div>
      <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
        <UserOutlined />
      </div>
    </div>

    <!-- Đang học -->
    <div class="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
      <div>
        <div class="text-sm text-gray-600 mb-1">Học viên đang học</div>
        <div class="flex items-end gap-2">
          <div class="text-2xl font-bold text-gray-900">{{ stats.active.count }}</div>
          <div class="text-sm font-medium text-green-500 mb-1">({{ stats.active.percent }}%)</div>
        </div>
      </div>
      <div class="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xl">
        <TeamOutlined />
      </div>
    </div>

    <!-- Đã tốt nghiệp -->
    <div class="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
      <div>
        <div class="text-sm text-gray-600 mb-1">Học viên đã tốt nghiệp</div>
        <div class="flex items-end gap-2">
          <div class="text-2xl font-bold text-gray-900">{{ stats.graduated.count }}</div>
          <div class="text-sm font-medium text-green-500 mb-1">({{ stats.graduated.percent }}%)</div>
        </div>
      </div>
      <div class="w-12 h-12 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center text-xl">
        <TrophyOutlined />
      </div>
    </div>

    <!-- Nghỉ / Bảo lưu -->
    <div class="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
      <div>
        <div class="text-sm text-gray-600 mb-1">Học viên nghỉ / bảo lưu</div>
        <div class="flex items-end gap-2">
          <div class="text-2xl font-bold text-gray-900">{{ stats.suspended.count }}</div>
          <div class="text-sm font-medium text-green-500 mb-1">({{ stats.suspended.percent }}%)</div>
        </div>
      </div>
      <div class="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-xl">
        <UserDeleteOutlined />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  UserOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  UserDeleteOutlined 
} from '@ant-design/icons-vue';
import type { StudentStats } from '../../../types/student';

defineProps<{
  stats: StudentStats
}>();
</script>
