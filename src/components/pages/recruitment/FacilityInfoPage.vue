<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard :title="isEditing ? 'Điều chỉnh Thông tin cơ sở' : 'Chi tiết Thông tin cơ sở'" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="handleBack" />
        <ButtonEditNoIcon v-if="!isEditing" text="Chỉnh Sửa" @click="isEditing = true" />
      </template>

      <!-- View Mode -->
      <div v-if="!isEditing" class="p-0">
        <DetailList :items="facilityDetails">
          <template #value-status="{ item }">
            <BaseTag type="success">{{ item.value }}</BaseTag>
          </template>
        </DetailList>
      </div>

      <!-- Edit Mode -->
      <div v-else class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm v-model="editForm.name" label="Tên cơ sở đào tạo" />
        <InputForm v-model="editForm.address" label="Địa chỉ cơ sở" />
        <InputForm v-model="editForm.contact" label="Thông tin liên hệ" />
        <SelectForm v-model:value="editForm.status" label="Trạng thái">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>
        
        <div class="flex items-center justify-center gap-4 mt-4">
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleUpdate" />
          <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        </div>
      </div>
    </AdminCard>

    <div class="mt-6"></div>

    <!-- Stats Section (Only show in view mode) -->
    <div v-if="!isEditing" class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
        <div class="space-y-1">
          <p class="text-xs font-medium text-gray-500">{{ stat.label }}</p>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
            <span v-if="stat.percentage" :class="stat.trend === 'up' ? 'text-green-500' : 'text-orange-500'" class="text-xs font-medium">
              ({{ stat.percentage }}%)
            </span>
          </div>
        </div>
        <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
          <NavIcon :name="stat.icon" :class="stat.iconColor" size="20" />
        </div>
      </div>
    </div>

    <div class="mt-6"></div>

    <!-- Chart Section (Only show in view mode) -->
    <AdminCard v-if="!isEditing" title="Thống kê" padded>
      <template #actions>
        <a-select defaultValue="month" size="small" class="w-32">
          <a-select-option value="month">Tháng</a-select-option>
          <a-select-option value="year">Năm</a-select-option>
        </a-select>
      </template>
      <div class="h-[300px] w-full mt-4">
        <apexchart 
          type="line" 
          height="100%" 
          :options="chartOptions" 
          :series="chartSeries"
        />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import DetailList from '@/components/molecules/DetailList.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'

const router = useRouter()
const isEditing = ref(false)

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Thông tin cơ sở', path: '/recruitment/facility/list' },
  { title: 'Chi tiết cơ sở', path: '#' }
]

const facilityDetails = computed(() => [
  { label: 'Tên cơ sở đào tạo', value: 'Cơ sở đào tạo FPT Hà Nội', key: 'name' },
  { label: 'Địa chỉ cơ sở', value: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội', key: 'address' },
  { label: 'Thông tin liên hệ', value: '024-7300-1955', key: 'contact' },
  { label: 'Thời gian tạo cơ sở', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật cơ sở', value: '2026-01-20 10:15:45', key: 'updatedAt' },
  { label: 'Trạng thái', value: 'Đang hoạt động', key: 'status' },
])

const editForm = ref({
  name: 'Cơ sở đào tạo FPT Hà Nội',
  address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
  contact: '024-7300-1955',
  status: 'active'
})

const stats = [
  { label: 'Tổng số học viên', value: '21', icon: 'BxGroup', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Tổng số học viên đang học', value: '21', icon: 'BxGroup', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { label: 'Số học viên mới', value: '20', percentage: '95', trend: 'up', icon: 'BxPlusCircle', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  { label: 'Số học viên nghỉ / bảo lưu', value: '1', percentage: '5', trend: 'down', icon: 'BxLayer', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
]

const handleBack = () => {
  if (isEditing.value) {
    isEditing.value = false
  } else {
    router.back()
  }
}

const handleUpdate = () => {
  isEditing.value = false
}

const handleReset = () => {
  editForm.value = {
    name: 'Cơ sở đào tạo FPT Hà Nội',
    address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
    contact: '024-7300-1955',
    status: 'active'
  }
}

const chartOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    min: 0,
    max: 40,
    tickAmount: 4
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#4F46E5', '#F472B6', '#8B5CF6'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'left'
  },
  grid: {
    borderColor: '#f3f4f6',
    strokeDashArray: 4
  }
}

const chartSeries = [
  {
    name: 'Tổng số học viên đang học',
    data: [5, 10, 22, 8, 12, 18]
  },
  {
    name: 'Số học viên mới',
    data: [15, 12, 25, 14, 21, 10]
  },
  {
    name: 'Số học viên nghỉ / bảo lưu',
    data: [2, 5, 3, 4, 2, 3]
  }
]
</script>

<style scoped>
</style>
