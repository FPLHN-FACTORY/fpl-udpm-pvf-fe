<template>
  <AdminPage>
    <AdminCard title="Nhật ký hệ thống">
      <FilterBar @search="() => {}" @reset="resetFilters">
        <InputSearch v-model="searchUser" placeholder="Tìm người dùng" class="!w-[250px]" />
        <SelectFilter v-model:value="objectType" placeholder="Chọn Loại đối tượng" class="!w-[200px]">
          <a-select-option value="USER">USER</a-select-option>
          <a-select-option value="IP_POLICY">IP_POLICY</a-select-option>
          <a-select-option value="AUTH">AUTH</a-select-option>
        </SelectFilter>
        <a-range-picker
          v-model:value="timeRange"
          class="!w-[280px] !h-[38px] !border-[#d9dee3] !rounded-md"
          :placeholder="['Thời gian', 'Thời gian']"
        />
      </FilterBar>

      <div class="overflow-x-auto">
        <LogTable />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'
import FilterBar from '../../../molecules/FilterBar.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import LogTable from '../../../organisms/LogTable.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const searchUser = ref('')
const objectType = ref()
const timeRange = ref([])

const resetFilters = () => {
  searchUser.value = ''
  objectType.value = undefined
  timeRange.value = []
}
</script>
