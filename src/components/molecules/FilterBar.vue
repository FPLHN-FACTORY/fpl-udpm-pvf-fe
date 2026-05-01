<template>
  <div class="flex items-center justify-between gap-4 p-4 bg-white rounded-t-xl border-x border-t border-gray-100">
    <div class="flex items-center gap-3 flex-1 max-w-2xl">
      <div class="w-64">
        <BaseInput v-model="searchQuery" placeholder="Tìm người dùng" icon="BxSearch" class="h-[38px]" />
      </div>
      <div class="w-48">
        <a-select v-model:value="roleFilter" placeholder="Chọn Nhóm Quyền" class="w-full h-[38px]">
          <a-select-option value="admin">Admin</a-select-option>
          <a-select-option value="editor">Editor</a-select-option>
        </a-select>
      </div>
      <div class="w-48">
        <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full h-[38px]">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Chưa kích hoạt</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <BaseButton variant="primary" icon="BxSearch" class="!h-[38px] !bg-blue-600 hover:!bg-blue-700 !border-blue-600">Tìm Kiếm</BaseButton>
      <BaseButton 
        icon="BxReset" 
        class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-[38px] !h-[38px] !p-0 !min-w-0 flex items-center justify-center rounded-lg shadow-sm" 
        icon-class-name="w-6 h-6 text-white" 
        @click="resetFilters" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'

const searchQuery = ref('')
const roleFilter = ref(undefined)
const statusFilter = ref(undefined)

const resetFilters = () => {
  searchQuery.value = ''
  roleFilter.value = undefined
  statusFilter.value = undefined
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 38px !important;
  display: flex;
  align-items: center;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}
:deep(.ant-select-selection-placeholder) {
  line-height: 38px !important;
  color: #b4bdc6 !important;
}
</style>
