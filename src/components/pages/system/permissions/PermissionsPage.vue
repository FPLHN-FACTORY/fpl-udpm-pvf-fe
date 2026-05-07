<template>
  <AdminPage>
    <AdminCard title="Danh sách Quyền người dùng">
      <!-- @vue-ignore -->
      <template #actions>
        <ButtonAdd @click="$router.push('/system/security/permissions/add')" />
      </template>

      <FilterBar @search="() => {}" @reset="resetFilters">
        <div class="min-w-[200px] flex-1">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm Quyền" />
        </div>
        <div class="w-[200px]">
          <SelectFilter v-model:value="roleFilter" placeholder="Chọn quyền">
            <a-select-option value="admin">Administrator</a-select-option>
            <a-select-option value="manager">Manager</a-select-option>
            <a-select-option value="user">User</a-select-option>
          </SelectFilter>
        </div>
      </FilterBar>

      <div class="overflow-x-auto">
        <PermissionTable />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'
import FilterBar from '../../../molecules/FilterBar.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import PermissionTable from '../../../organisms/PermissionTable.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const searchQuery = ref('')
const roleFilter = ref()

const resetFilters = () => {
  searchQuery.value = ''
  roleFilter.value = undefined
}
</script>
