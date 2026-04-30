<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Danh sách Quyền người dùng</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Chi tiết Quyền người dùng</span>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <!-- Card Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-xl font-bold text-[#566a7f]">Chi tiết Quyền người dùng</h1>
        <div class="flex items-center gap-3">
          <BaseButton 
            variant="default" 
            size="small" 
            icon="ChevronLeftIcon"
            class="!bg-[#eceef1] hover:!bg-[#daddf1] !border-none !text-[#8592a3] !text-[13px] !px-3"
            @click="$router.back()"
          >
            Quay Lại
          </BaseButton>
          <BaseButton 
            variant="default"
            size="small"
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !border-none !text-white !text-[13px] !px-4"
            @click="$router.push(`/system/security/permissions/edit/${$route.params.id}`)"
          >
            Chỉnh Sửa
          </BaseButton>
        </div>
      </div>

      <!-- Detail Table -->
      <div class="border border-gray-100 rounded-lg overflow-hidden">
        <div v-for="(item, index) in details" :key="index" 
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../atoms/BaseButton.vue'

const route = useRoute()

const details = ref([
  { label: 'Mã quyền', value: 'USER_VIEW' },
  { label: 'Tên quyền', value: 'Xem người dùng' },
  { label: 'Mô tả quyền', value: 'Cho phép xem danh sách và thông tin người dùng' },
  { label: 'Thời gian tạo quyền', value: '2026-01-01 08:00:00' },
  { label: 'Thời gian cập nhật quyền', value: '2026-01-01 08:00:00' }
])

onMounted(() => {
  const id = route.params.id
  console.log('Loading details for id:', id)
})
</script>

<style scoped>
</style>
