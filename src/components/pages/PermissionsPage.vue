<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Danh sách Quyền người dùng</span>
    </div>

    <!-- Permission Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Add Button -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Quyền người dùng</h2>
        <BaseButton 
          variant="primary" 
          icon="BxPlus" 
          icon-class-name="w-4 h-4"
          class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none"
          @click="$router.push('/system/security/permissions/add')"
        >
          Thêm Mới
        </BaseButton>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="Tìm kiếm Quyền" 
            class="!h-[38px] !border-[#d9dee3]"
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="roleFilter" 
            placeholder="Chọn quyền" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="admin">Administrator</a-select-option>
            <a-select-option value="manager">Manager</a-select-option>
            <a-select-option value="user">User</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton 
            variant="primary" 
            icon="BxSearch" 
            class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-[38px]"
          >
            Tìm Kiếm
          </BaseButton>
          <BaseButton 
            icon="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-[38px] !h-[38px] !p-0 !min-w-0 flex items-center justify-center rounded-lg shadow-sm" 
            icon-class-name="w-6 h-6 text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <PermissionTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseInput from '../atoms/BaseInput.vue'
import PermissionTable from '../organisms/PermissionTable.vue'

const searchQuery = ref('')
const roleFilter = ref(undefined)

const resetFilters = () => {
  searchQuery.value = ''
  roleFilter.value = undefined
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
