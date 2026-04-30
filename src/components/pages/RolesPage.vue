<template>
  <div class="flex flex-col gap-6 p-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Phân quyền người dùng</span>
    </div>

    <!-- Role Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoleCard 
        v-for="role in roles" 
        :key="role.title"
        v-bind="role"
      />
      <AddRoleCard />
    </div>

    <!-- Table Section Header -->
    <div class="mt-4 flex flex-col gap-1">
      <h2 class="text-xl font-bold text-[#566a7f]">Danh sách người dùng theo từng vai trò</h2>
    </div>

    <!-- Table & Filters -->
    <div class="flex flex-col">
      <FilterBar />
      <UserTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleCard from '../molecules/RoleCard.vue'
import AddRoleCard from '../molecules/AddRoleCard.vue'
import FilterBar from '../molecules/FilterBar.vue'
import UserTable from '../organisms/UserTable.vue'

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
