<template>
  <AdminPage>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <RoleCard v-for="role in roles" :key="role.title" v-bind="role" />
      <AddRoleCard />
    </div>

    <AdminCard title="Danh sách người dùng theo từng vai trò" class="mt-8">
      <FilterBar @search="handleSearch" @reset="handleReset">
        <InputSearch v-model="searchQuery" placeholder="Tìm người dùng" class="!w-[230px]" />
        <SelectFilter v-model:value="roleFilter" placeholder="Chọn Nhóm Quyền" class="!w-[180px]">
          <a-select-option value="admin">Administrator</a-select-option>
          <a-select-option value="editor">Editor</a-select-option>
          <a-select-option value="user">User</a-select-option>
        </SelectFilter>
        <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái" class="!w-[180px]">
          <a-select-option value="active">Active</a-select-option>
          <a-select-option value="inactive">Inactive</a-select-option>
        </SelectFilter>
      </FilterBar>
      <UserTable />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RoleCard from '../../../molecules/RoleCard.vue'
import AddRoleCard from '../../../molecules/AddRoleCard.vue'
import FilterBar from '../../../molecules/FilterBar.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import UserTable from '../../../organisms/UserTable.vue'
import AdminPage from '../../../templates/AdminPage.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import SelectFilter from '../../../atoms/inputs/SelectFilter.vue'

const searchQuery = ref('')
const roleFilter = ref()
const statusFilter = ref()

const handleSearch = () => {
  console.log('Search:', searchQuery.value, roleFilter.value, statusFilter.value)
}

const handleReset = () => {
  searchQuery.value = ''
  roleFilter.value = undefined
  statusFilter.value = undefined
}

const roles = [
  {
    title: 'Administrator',
    totalUsers: 4,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png'
    ]
  },
  {
    title: 'Editor',
    totalUsers: 7,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/7.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/8.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/9.png'
    ]
  },
  {
    title: 'Users',
    totalUsers: 5,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/10.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/11.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/12.png'
    ]
  },
  {
    title: 'Support',
    totalUsers: 6,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/13.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/14.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png'
    ]
  },
  {
    title: 'Restricted User',
    totalUsers: 10,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png'
    ]
  }
]
</script>
