<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <div class="flex items-center text-[13px] text-gray-500 space-x-2 px-1">
      <span>Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span>Cơ sở đào tạo</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-800">Chi tiết cơ sở</span>
    </div>

    <!-- Header Section -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-800">
        {{ isEditing ? 'Điều chỉnh Cơ sở đào tạo' : 'Chi tiết Cơ sở đào tạo' }}
      </h2>
      <div class="flex items-center space-x-3">
        <a-button @click="handleBack" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md">
          <NavIcon name="BxArrowBack" size="14" />
          <span class="text-xs font-medium">Quay Lại</span>
        </a-button>
        <a-button 
          v-if="!isEditing"
          type="primary" 
          @click="isEditing = true"
          class="bg-[#ffab00] border-[#ffab00] hover:bg-[#e69a00] text-white rounded-md h-8 px-4 flex items-center"
        >
          <span class="text-xs font-bold uppercase">Chỉnh Sửa</span>
        </a-button>
      </div>
    </div>

    <!-- Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- View Mode -->
      <div v-if="!isEditing" class="p-0">
        <div class="divide-y divide-gray-100">
          <div v-for="(item, index) in facilityDetails" :key="index" class="grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors">
            <div class="col-span-3 text-sm font-semibold text-gray-700">{{ item.label }}</div>
            <div class="col-span-9 text-sm text-gray-600">
              <template v-if="item.key === 'status'">
                <a-tag color="success" class="rounded-full px-3">
                  {{ item.value }}
                </a-tag>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else class="p-8 max-w-4xl mx-auto">
        <a-form layout="vertical" :model="editForm" class="space-y-4">
          <a-form-item label="Tên cơ sở đào tạo">
            <a-input v-model:value="editForm.name" />
          </a-form-item>
          <a-form-item label="Địa chỉ cơ sở">
            <a-input v-model:value="editForm.address" />
          </a-form-item>
          <a-form-item label="Thông tin liên hệ">
            <a-input v-model:value="editForm.contact" />
          </a-form-item>
          <a-form-item label="Trạng thái">
            <a-select v-model:value="editForm.status">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </a-form-item>
          
          <div class="flex items-center justify-center space-x-3 mt-8">
            <a-button type="primary" danger size="large" class="px-10 rounded-lg bg-[#e31a1a] border-[#e31a1a] h-11 flex items-center" @click="handleUpdate">
              <span class="text-sm font-bold">Cập Nhật</span>
            </a-button>
            <a-button size="large" class="px-10 rounded-lg bg-[#ffab00] text-white border-[#ffab00] hover:bg-[#e69a00] h-11 flex items-center" @click="handleReset">
              <span class="text-sm font-bold">Đặt Lại</span>
            </a-button>
          </div>
        </a-form>
      </div>
    </div>

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

    <!-- Chart Section (Only show in view mode) -->
    <div v-if="!isEditing" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-gray-800">Thống kê</h3>
        <a-select defaultValue="month" size="small" class="w-32">
          <a-select-option value="month">Tháng</a-select-option>
          <a-select-option value="year">Năm</a-select-option>
        </a-select>
      </div>
      
      <div class="h-[300px] w-full">
        <apexchart 
          type="line" 
          height="100%" 
          :options="chartOptions" 
          :series="chartSeries"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../atoms/NavIcon.vue'

const router = useRouter()
const isEditing = ref(false)

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
:deep(.ant-btn-primary) {
  box-shadow: none;
}
:deep(.ant-form-item-label label) {
  font-weight: 500;
  color: #4b5563;
}
</style>
