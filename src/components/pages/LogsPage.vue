<template>
  <AdminPage>
    <AdminCard title="Nhật ký hệ thống">
      <div class="flex flex-wrap items-center gap-3 border-b border-gray-100 bg-[#fcfcfd] p-6">
        <div class="w-[200px]">
          <BaseInput v-model="searchUser" placeholder="Tìm người dùng" class="!h-[38px] !border-[#d9dee3]" />
        </div>
        <div class="w-[200px]">
          <a-select v-model:value="objectType" placeholder="Chọn Loại đối tượng" class="w-full !h-[38px]">
            <a-select-option value="USER">USER</a-select-option>
            <a-select-option value="IP_POLICY">IP_POLICY</a-select-option>
            <a-select-option value="AUTH">AUTH</a-select-option>
          </a-select>
        </div>
        <div class="w-[300px]">
          <a-range-picker
            v-model:value="timeRange"
            class="w-full !h-[38px] !border-[#d9dee3]"
            :placeholder="['Từ ngày', 'Đến ngày']"
          />
        </div>
        <div class="ml-auto flex items-center gap-2">
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
        <LogTable />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseInput from '../atoms/BaseInput.vue'
import AdminCard from '../molecules/AdminCard.vue'
import LogTable from '../organisms/LogTable.vue'
import AdminPage from '../templates/AdminPage.vue'

const searchUser = ref('')
const objectType = ref()
const timeRange = ref([])

const resetFilters = () => {
  searchUser.value = ''
  objectType.value = undefined
  timeRange.value = []
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

:deep(.ant-picker) {
  border-radius: 6px !important;
}
</style>
