<template>
  <div class="permission-table-container">
    <AppTable :columns="columns" :data-source="dataSource" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'roles'">
          <div class="flex flex-wrap gap-2">
            <BaseTag v-for="role in record.roles" :key="role.name" :type="role.type">
              {{ role.name }}
            </BaseTag>
          </div>
        </template>

        <template v-else-if="column.key === 'actions'">
          <TableActions :actions="getActions(record.key)" />
        </template>
      </template>
    </AppTable>
    
    <div class="flex justify-end p-4 border-t border-gray-50">
      <BasePagination 
        :total="dataSource.length" 
        :current="1" 
        :page-size="10" 
        @change="(p) => console.log('Page change', p)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTag from '../atoms/display/BaseTag.vue'
import BasePagination from '../atoms/display/BasePagination.vue'
import TableActions from '../molecules/TableActions.vue'
import AppTable from './AppTable.vue'

const router = useRouter()

const columns = [
  { title: 'TÊN QUYỀN', dataIndex: 'name', key: 'name', width: '30%', sorter: true },
  { title: 'NHÓM QUYỀN', key: 'roles', width: '35%' },
  { title: 'NGÀY TẠO', dataIndex: 'createdAt', key: 'createdAt', width: '20%' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: '15%', align: 'center' },
]

const dataSource = ref([
  { key: '1', name: 'Management', roles: [{ name: 'Administrator', type: 'primary' }], createdAt: '14 Apr 2021, 8:43 PM' },
  { key: '2', name: 'Manage Billing & Roles', roles: [{ name: 'Administrator', type: 'primary' }], createdAt: '16 Sep 2021, 5:20 PM' },
  {
    key: '3',
    name: 'Add & Remove Users',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '14 Oct 2021, 10:20 AM'
  },
  {
    key: '4',
    name: 'Project Planning',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' }
    ],
    createdAt: '14 Oct 2021, 10:20 AM'
  },
  {
    key: '5',
    name: 'Manage Email Sequences',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '23 Aug 2021, 2:00 PM'
  },
  {
    key: '6',
    name: 'Client Communication',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '15 Apr 2021, 11:30 AM'
  },
  {
    key: '7',
    name: 'Only View',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Restricted User', type: 'danger' }
    ],
    createdAt: '04 Dec 2021, 8:15 PM'
  },
  {
    key: '8',
    name: 'Financial Management',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '25 Feb 2021, 10:30 AM'
  },
  {
    key: '9',
    name: 'Manage Others Tasks',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '04 Nov 2021, 11:45 AM'
  },
])



const getActions = (id: string) => [
  {
    label: 'Xem chi tiết',
    icon: 'BxShow',
    onClick: () => router.push(`/system/security/permissions/detail/${id}`)
  },
  {
    label: 'Chỉnh sửa',
    icon: 'BxEdit',
    onClick: () => router.push(`/system/security/permissions/edit/${id}`)
  }
]
</script>
