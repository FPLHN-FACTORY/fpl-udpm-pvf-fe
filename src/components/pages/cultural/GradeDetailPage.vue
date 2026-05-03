<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Quản lý học tập văn hoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-500 font-medium">Khối lớp</span>
    </div>

    <!-- Page Header Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-lg font-bold text-[#566a7f] bg-[#fcf3d7] px-2 py-1 rounded inline-block">Chi tiết Khối lớp</h1>
        <div class="flex items-center gap-3">
          <ButtonBack @click="$router.back()" />
          <ButtonEdit @click="$router.push(`/cultural/grade/edit/${$route.params.id}`)" />
        </div>
      </div>

      <!-- Detail Info Table -->
      <div class="border border-gray-100 rounded-lg overflow-hidden">
        <div v-for="(item, index) in gradeDetails" :key="index" 
          class="flex border-b border-gray-100 last:border-0 min-h-[50px]"
        >
          <div class="w-1/3 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100 flex items-center">
            {{ item.label }}
          </div>
          <div class="w-2/3 p-4 text-[13px] text-[#697a8d] flex items-center">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div class="flex flex-col">
          <span class="text-[13px] font-medium text-[#566a7f] mb-1">{{ stat.title }}</span>
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-bold text-[#566a7f]">{{ stat.value }}</span>
            <span v-if="stat.percentage" class="text-[13px] text-[#71dd37] font-medium">({{ stat.percentage }})</span>
          </div>
        </div>
        <div :class="[stat.iconBg, 'w-10 h-10 rounded-lg flex items-center justify-center']">
          <NavIcon :name="stat.icon" :class-name="stat.iconColor" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'
import ButtonEdit from '../../atoms/buttons/ButtonEdit.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const gradeDetails = ref([
  { label: 'ID Khối lớp', value: 'HS001' },
  { label: 'Tên khối', value: '10' },
  { label: 'Ghi chú', value: 'Dành cho học viên độ tuổi U12' },
  { label: 'Thời gian tạo', value: '10/01/2025 09:00' },
  { label: 'Thời gian cập nhật', value: '12/01/2025 14:30' }
])

const stats = [
  { 
    title: 'Tổng lớp thuộc khối', 
    value: '21', 
    icon: 'BxLibrary', 
    iconBg: 'bg-[#e7e7ff]', 
    iconColor: 'text-[#696cff]' 
  },
  { 
    title: 'Tổng học viên', 
    value: '20', 
    percentage: '95%', 
    icon: 'BxCalendarEvent', 
    iconBg: 'bg-[#ffe5e5]', 
    iconColor: 'text-[#ff3e1d]' 
  },
  { 
    title: 'Tỷ lệ lên lớp / hoàn thành', 
    value: '1', 
    percentage: '5%', 
    icon: 'BxLayer', 
    iconBg: 'bg-[#fff2e2]', 
    iconColor: 'text-[#fdac41]' 
  },
  { 
    title: 'Điểm trung bình khối', 
    value: '21', 
    percentage: '5%', 
    icon: 'BxLayer', 
    iconBg: 'bg-[#fff2e2]', 
    iconColor: 'text-[#fdac41]' 
  }
]
</script>

<style scoped>
/* Specific adjustments to match the design */
</style>
