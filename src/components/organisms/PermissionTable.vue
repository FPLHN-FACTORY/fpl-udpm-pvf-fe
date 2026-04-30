<template>
  <div class="permission-table-container">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      :pagination="paginationConfig"
      :row-class-name="() => 'hover:bg-gray-50 transition-colors'"
    >
      <!-- NHÓM QUYỀN column -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'roles'">
          <div class="flex flex-wrap gap-2">
            <BaseTag 
              v-for="role in record.roles" 
              :key="role.name"
              :type="role.type"
            >
              {{ role.name }}
            </BaseTag>
          </div>
        </template>

        <!-- HÀNH ĐỘNG column -->
        <template v-else-if="column.key === 'actions'">
          <div class="flex items-center justify-center gap-2">
            <button 
              class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
              @click="$router.push(`/system/security/permissions/detail/${record.key}`)"
            >
              <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
            </button>
            <button 
              class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
              @click="$router.push(`/system/security/permissions/edit/${record.key}`)"
            >
              <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
            </button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../atoms/NavIcon.vue'
import BaseTag from '../atoms/BaseTag.vue'

const columns = [
  {
    title: 'TÊN QUYỀN',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    sorter: true,
  },
  {
    title: 'NHÓM QUYỀN',
    key: 'roles',
    width: '35%',
  },
  {
    title: 'NGÀY TẠO',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '20%',
  },
  {
    title: 'HÀNH ĐỘNG',
    key: 'actions',
    width: '15%',
    align: 'center',
  },
]

const dataSource = ref([
  {
    key: '1',
    name: 'Management',
    roles: [{ name: 'Administrator', type: 'primary' }],
    createdAt: '14 Apr 2021, 8:43 PM',
  },
  {
    key: '2',
    name: 'Manage Billing & Roles',
    roles: [{ name: 'Administrator', type: 'primary' }],
    createdAt: '16 Sep 2021, 5:20 PM',
  },
  {
    key: '3',
    name: 'Add & Remove Users',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '14 Oct 2021, 10:20 AM',
  },
  {
    key: '4',
    name: 'Project Planning',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' }
    ],
    createdAt: '14 Oct 2021, 10:20 AM',
  },
  {
    key: '5',
    name: 'Manage Email Sequences',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '23 Aug 2021, 2:00 PM',
  },
  {
    key: '6',
    name: 'Client Communication',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '15 Apr 2021, 11:30 AM',
  },
  {
    key: '7',
    name: 'Only View',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Restricted User', type: 'danger' }
    ],
    createdAt: '04 Dec 2021, 8:15 PM',
  },
  {
    key: '8',
    name: 'Financial Management',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '25 Feb 2021, 10:30 AM',
  },
  {
    key: '9',
    name: 'Manage Others\' Tasks',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '04 Nov 2021, 11:45 AM',
  },
])

const paginationConfig = {
  pageSize: 10,
  showSizeChanger: false,
  position: ['bottomRight'],
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.ant-pagination-item-active) {
  border-color: #dc2626;
  background-color: #dc2626;
}

:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
