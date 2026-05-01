<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Edit Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Điều chỉnh Trung tâm liên kết</h2>
        <a-button @click="$router.back()" class="flex items-center gap-2 border-none shadow-none text-gray-400 rounded-md h-9 bg-gray-100/50 hover:bg-gray-100 px-4">
          <template #icon><NavIcon name="ChevronLeftIcon" size="14" /></template>
          <span class="text-xs font-bold">Quay Lại</span>
        </a-button>
      </div>

      <!-- Form Section -->
      <div class="space-y-8 pb-10">
        <!-- Fieldset-like inputs -->
        <div class="relative">
          <label class="absolute -top-2.5 left-4 bg-white px-2 text-xs font-medium text-gray-400 z-10">Tên trung tâm liên kết</label>
          <a-input 
            v-model:value="form.name" 
            class="h-11 rounded-md border-gray-200"
          />
        </div>

        <div class="relative">
          <label class="absolute -top-2.5 left-4 bg-white px-2 text-xs font-medium text-gray-400 z-10">Cơ sở đào tạo</label>
          <a-select 
            v-model:value="form.facilityId" 
            class="w-full rounded-md"
          >
            <a-select-option value="1">Cơ sở đào tạo FPT Hà Nội</a-select-option>
          </a-select>
        </div>

        <div class="relative">
          <label class="absolute -top-2.5 left-4 bg-white px-2 text-xs font-medium text-gray-400 z-10">Địa chỉ trung tâm</label>
          <a-input 
            v-model:value="form.address" 
            class="h-11 rounded-md border-gray-200"
          />
        </div>

        <div class="relative">
          <label class="absolute -top-2.5 left-4 bg-white px-2 text-xs font-medium text-gray-400 z-10">Thông tin liên hệ</label>
          <a-input 
            v-model:value="form.contact" 
            class="h-11 rounded-md border-gray-200"
          />
        </div>

        <div class="relative">
          <label class="absolute -top-2.5 left-4 bg-white px-2 text-xs font-medium text-gray-400 z-10">Trạng thái</label>
          <a-select 
            v-model:value="form.status" 
            class="w-full rounded-md"
          >
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </a-select>
        </div>

        <!-- Submit Buttons -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <a-button 
            type="primary" 
            class="bg-[#ED1C24] border-[#ED1C24] hover:bg-[#d0181e] h-10 px-10 rounded-md font-bold shadow-md text-white border-none"
          >
            Cập Nhật
          </a-button>
          <a-button 
            class="bg-[#EAB308] border-[#EAB308] text-white hover:bg-[#ca8a04] hover:text-white h-10 px-10 rounded-md font-bold shadow-md border-none"
          >
            Đặt Lại
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import NavIcon from '../../atoms/NavIcon.vue'

// Mock pre-filled data
const form = reactive({
  name: 'Trung tâm liên kết CNTT Hà Nội',
  facilityId: '1',
  address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
  contact: '024-7300-1955',
  status: 'active'
})
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.ant-select-selector) {
  height: 44px !important;
  display: flex;
  align-items: center;
  border-radius: 6px !important;
  border-color: #e5e7eb !important;
}

:deep(.ant-select-selection-item) {
  line-height: 44px !important;
  color: #4b5563 !important;
  font-weight: 500;
}
</style>
