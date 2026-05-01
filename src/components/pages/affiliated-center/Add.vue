<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Add Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Thêm mới Trung tâm liên kết</h2>
        <a-button @click="$router.back()" class="flex items-center gap-2 border-none shadow-none text-gray-400 rounded-md h-9 bg-gray-100/50 hover:bg-gray-100 px-4">
          <template #icon><NavIcon name="ChevronLeftIcon" size="14" /></template>
          <span class="text-xs font-bold">Quay Lại</span>
        </a-button>
      </div>

      <!-- Form Section -->
      <div class="space-y-7 pb-10">
        <div class="space-y-1">
          <a-input 
            v-model:value="form.name" 
            placeholder="Tên trung tâm liên kết" 
            class="h-10 rounded-md border-gray-200 placeholder:text-gray-400"
          />
        </div>

        <div class="space-y-1">
          <a-select 
            v-model:value="form.facilityId" 
            placeholder="Cơ sở đào tạo" 
            class="w-full rounded-md"
          >
            <a-select-option value="1">Cơ sở đào tạo FPT Hà Nội</a-select-option>
          </a-select>
        </div>

        <div class="space-y-1">
          <a-input 
            v-model:value="form.address" 
            placeholder="Địa chỉ trung tâm" 
            class="h-10 rounded-md border-gray-200 placeholder:text-gray-400"
          />
        </div>

        <div class="space-y-1">
          <a-input 
            v-model:value="form.contact" 
            placeholder="Thông tin liên hệ" 
            class="h-10 rounded-md border-gray-200 placeholder:text-gray-400"
          />
        </div>

        <div class="space-y-1">
          <a-select 
            v-model:value="form.status" 
            placeholder="Trạng thái" 
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
            Thêm Mới
          </a-button>
          <a-button 
            class="bg-[#F59E0B] border-[#F59E0B] text-white hover:bg-[#d97706] hover:text-white h-10 px-10 rounded-md font-bold shadow-md border-none"
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

// Form State
const form = reactive({
  name: '',
  facilityId: undefined,
  address: '',
  contact: '',
  status: undefined
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

:deep(.ant-select-selection-placeholder) {
  line-height: 44px !important;
}
</style>
