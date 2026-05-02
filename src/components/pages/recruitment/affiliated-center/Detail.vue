<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Detail Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Chi tiết Trung tâm liên kết</h2>
        <div class="flex gap-3">
          <ButtonBack @click="$router.back()" />
          <ButtonEditNoIcon @click="router.push('/recruitment/affiliated-center/edit/1')" />
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

    <!-- Bottom Section: Stats and Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6">
      <!-- Left: Mini Stat Cards -->
      <div class="grid grid-cols-2 gap-4">
        <a-card v-for="(stat, index) in miniStats" :key="index" :bordered="false" class="stat-card shadow-[0_2px_10px_0_rgba(0,0,0,0.05)] rounded-xl hover:shadow-md transition-shadow h-full">
          <div class="flex flex-col justify-center gap-4 h-full p-1">
            <!-- Row 1: Title and Icon -->
            <div class="flex justify-between items-start">
              <p class="text-[#22303E] opacity-70 text-[14px] font-medium m-0">{{ stat.title }}</p>
              <div :class="stat.iconBg" class="w-[42px] h-[42px] rounded-xl flex items-center justify-center flex-shrink-0">
                <NavIcon :name="stat.icon" size="20" :class-name="stat.iconColor" />
              </div>
            </div>
            <!-- Row 2: Values -->
            <div class="flex items-center gap-2">
              <span class="text-[24px] font-bold text-[#22303E] leading-none">{{ stat.value }}</span>
              <span class="text-[14px] font-bold text-[#71DD37] leading-none">{{ stat.percentage }}</span>
            </div>
          </div>
        </a-card>
      </div>

      <!-- Right: Chart Card -->
      <a-card :bordered="false" class="chart-card shadow-[0_2px_10px_0_rgba(0,0,0,0.05)] rounded-xl overflow-hidden h-full flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-lg font-bold text-[#22303E] m-0">Thống kê hồ sơ</h2>
          <div class="flex items-center text-xs text-[#22303E] opacity-70 font-medium cursor-pointer hover:opacity-100 transition-opacity">
            <span>Quý</span>
            <NavIcon name="ChevronDownIcon" size="14" class-name="ml-1" />
          </div>
        </div>

        <!-- CSS Mock Chart -->
        <div class="relative h-56 w-full mt-4 px-10 pb-8 flex flex-col justify-end">
          <!-- Y-axis labels -->
          <div class="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-[11px] text-[#22303E] opacity-30 font-medium">
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
          
          <!-- Chart Grid Lines -->
          <div class="absolute left-8 right-0 top-0 bottom-12 flex flex-col justify-between pointer-events-none">
            <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
            <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
            <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
            <div class="w-full border-b border-gray-100 h-0"></div>
          </div>

          <!-- Chart Bars Container -->
          <div class="flex items-end justify-between w-full h-full relative z-10 px-2">
            <div v-for="q in quarters" :key="q.label" class="flex flex-col items-center flex-1 gap-4">
              <div class="flex items-end gap-1.5 h-36">
                <div v-for="(bar, bIdx) in q.bars" :key="bIdx" class="w-2.5 flex flex-col">
                  <div class="w-full bg-[#E0AAFF] rounded-t-[2px]" :style="{height: bar.fail + '%'}"></div>
                  <div class="w-full bg-[#709BFF] rounded-b-[1px]" :style="{height: bar.pass + '%'}"></div>
                </div>
              </div>
              <span class="text-[11px] text-[#22303E] opacity-30 uppercase font-bold tracking-tight">{{ q.label }}</span>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-8 mt-2 ml-10 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#709BFF]"></div>
            <span class="text-[12px] text-[#22303E] opacity-80 font-medium">Tỷ lệ hồ sơ đạt</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#E0AAFF]"></div>
            <span class="text-[12px] text-[#22303E] opacity-80 font-medium">Tỷ lệ hồ sơ không đạt</span>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'

const router = useRouter()

// Detail Data
const detailInfo = [
  { label: 'Tên trung tâm liên kết', value: 'Trung tâm liên kết CNTT Hà Nội' },
  { label: 'Cơ sở đào tạo', value: 'Cơ sở đào tạo FPT Hà Nội' },
  { label: 'Địa chỉ trung tâm', value: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội' },
  { label: 'Thông tin liên hệ', value: '024-7300-1955' },
  { label: 'Thời gian tạo trung tâm', value: '2025-01-05 08:30:00' },
  { label: 'Thời gian cập nhật trung tâm', value: '2026-01-20 10:15:45' },
  { label: 'Trạng thái', value: 'Đang hoạt động', key: 'status' },
]

// Stats Data
const miniStats = [
  { 
    title: 'Hồ sơ chờ duyệt', 
    value: '20', 
    percentage: '(95%)', 
    icon: 'BxCalendar', 
    iconBg: 'bg-[#FFEDED]', 
    iconColor: 'text-[#FF4D4D]' 
  },
  { 
    title: 'Hồ sơ đã duyệt', 
    value: '20', 
    percentage: '(95%)', 
    icon: 'BxCheck', 
    iconBg: 'bg-[#F3E8FF]', 
    iconColor: 'text-[#A855F7]' 
  },
  { 
    title: 'Hồ sơ bị từ chối', 
    value: '1', 
    percentage: '(5%)', 
    icon: 'BxsCategoryAlt', 
    iconBg: 'bg-[#FFF4E5]', 
    iconColor: 'text-[#FFAB00]' 
  },
  { 
    title: 'Hồ sơ YC bổ sung', 
    value: '1', 
    percentage: '(5%)', 
    icon: 'BxEdit', 
    iconBg: 'bg-[#FFF9E6]', 
    iconColor: 'text-[#FFD700]' 
  }
]

// Quarter Data for Chart
const quarters = [
  { label: 'q1', bars: [{pass: 60, fail: 40}, {pass: 70, fail: 30}, {pass: 50, fail: 50}, {pass: 80, fail: 20}, {pass: 45, fail: 55}] },
  { label: 'q2', bars: [{pass: 55, fail: 45}, {pass: 65, fail: 35}, {pass: 40, fail: 60}, {pass: 75, fail: 25}, {pass: 50, fail: 50}] },
  { label: 'q3', bars: [{pass: 60, fail: 40}, {pass: 70, fail: 30}, {pass: 50, fail: 50}, {pass: 80, fail: 20}, {pass: 45, fail: 55}] },
  { label: 'q4', bars: [{pass: 55, fail: 45}, {pass: 65, fail: 35}, {pass: 40, fail: 60}, {pass: 75, fail: 25}, {pass: 50, fail: 50}] }
]
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}

.stat-card :deep(.ant-card-body) {
  padding: 20px;
  height: 100%;
}

.chart-card :deep(.ant-card-body) {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
