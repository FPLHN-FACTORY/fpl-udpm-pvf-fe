<template>
  <AdminPage>
    <AdminCard title="Danh sách Quyền người dùng">
      <template #actions>
        <BaseButton
          variant="primary"
          icon="BxPlus"
          icon-class-name="w-4 h-4"
          class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none"
          @click="$router.push('/system/security/permissions/add')"
        >
          Thêm Mới
        </BaseButton>
      </template>

      <div class="flex flex-wrap items-center gap-3 border-b border-gray-100 bg-[#fcfcfd] p-6">
        <div class="min-w-[200px] flex-1">
          <BaseInput v-model="searchQuery" placeholder="Tìm kiếm Quyền" class="!h-[38px] !border-[#d9dee3]" />
        </div>
        <div class="w-[200px]">
          <a-select v-model:value="roleFilter" placeholder="Chọn quyền" class="w-full !h-[38px]">
            <a-select-option value="admin">Administrator</a-select-option>
            <a-select-option value="manager">Manager</a-select-option>
            <a-select-option value="user">User</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton variant="primary" icon="BxSearch" class="!h-[38px] !border-none !bg-[#696cff] hover:!bg-[#5f61e6]">
            Tìm Kiếm
          </BaseButton>
          <BaseButton
            icon="BxReset"
            class="!flex !h-[38px] !w-[38px] !min-w-0 items-center justify-center rounded-lg !border-none !bg-[#8592a3] !p-0 shadow-sm hover:!bg-[#717d8c]"
            icon-class-name="w-6 h-6 text-white"
            @click="resetFilters"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <PermissionTable />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseInput from '../atoms/BaseInput.vue'
import AdminCard from '../molecules/AdminCard.vue'
import PermissionTable from '../organisms/PermissionTable.vue'
import AdminPage from '../templates/AdminPage.vue'

const searchQuery = ref('')
const roleFilter = ref()

const resetFilters = () => {
  searchQuery.value = ''
  roleFilter.value = undefined
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  align-items: center;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
  display: flex;
  height: 38px !important;
}
</style>
