<template>
  <div class="overflow-hidden bg-white">
    <AppTable
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
    >
      <template #bodyCell="{ column, record }">
        <div v-if="column.key === 'user'">
          <UserAvatar :name="record.name" :email="record.email" :avatar="record.avatar" />
        </div>

        <div v-else-if="column.key === 'role'" class="flex items-center gap-2">
          <NavIcon :name="record.roleIcon" :class-name="`h-5 w-5 ${record.roleColor}`" />
          <span class="text-[13px] capitalize text-gray-600">{{ record.role }}</span>
        </div>

        <div v-else-if="column.key === 'status'">
          <BaseTag :type="record.statusType">{{ record.status }}</BaseTag>
        </div>

        <div v-else-if="column.key === 'actions'">
          <TableActions :actions="getActions(record.key)" />
        </div>
      </template>

      <template #pagination>
        <div class="flex justify-end p-4">
          <BasePagination 
            :total="dataSource.length" 
            :current="1" 
            :page-size="10" 
            @change="(p) => console.log('Page change', p)" 
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/icons/NavIcon.vue'
import BaseTag from '../atoms/display/BaseTag.vue'
import BasePagination from '../atoms/display/BasePagination.vue'
import TableActions from '../molecules/TableActions.vue'
import UserAvatar from '../molecules/UserAvatar.vue'
import AppTable from './AppTable.vue'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])

const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

const getActions = (id: string) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/system/security/roles/detail/${id}`) },
  { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => router.push(`/system/security/roles/edit/${id}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => undefined },
]

const columns = [
  { title: 'NGƯỜI DÙNG', key: 'user', dataIndex: 'name' },
  { title: 'NHÓM QUYỀN', key: 'role', dataIndex: 'role' },
  { title: 'NGÀY TẠO', key: 'created', dataIndex: 'created' },
  { title: 'NGÀY CẬP NHẬT', key: 'updated', dataIndex: 'updated' },
  { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
]

const dataSource = [
  {
    key: '1',
    name: 'Jordan Stevenson',
    email: 'jordan@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png',
    role: 'Admin',
    roleIcon: 'BxLogInWrapper',
    roleColor: 'text-red-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Chưa kích hoạt',
    statusType: 'warning'
  },
  {
    key: '2',
    name: 'Richard Payne',
    email: 'richard247@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
    role: 'Editor',
    roleIcon: 'BxEdit',
    roleColor: 'text-orange-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Đang hoạt động',
    statusType: 'success'
  },
  {
    key: '3',
    name: 'Jennifer Summers',
    email: 'summers.45@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
    role: 'Author',
    roleIcon: 'BxFile',
    roleColor: 'text-yellow-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Đang hoạt động',
    statusType: 'success'
  },
  {
    key: '4',
    name: 'Mr. Justin Richardson',
    email: 'jr.3734@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png',
    role: 'Editor',
    roleIcon: 'BxEdit',
    roleColor: 'text-orange-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Chưa kích hoạt',
    statusType: 'warning'
  },
  {
    key: '5',
    name: 'Nicholas Tanner',
    email: 'nicholas.t@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png',
    role: 'Maintainer',
    roleIcon: 'BxServer',
    roleColor: 'text-blue-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Đang hoạt động',
    statusType: 'success'
  },
  {
    key: '6',
    name: 'Mary Garcia',
    email: 'mary.garcia@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png',
    role: 'Maintainer',
    roleIcon: 'BxServer',
    roleColor: 'text-blue-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Không hoạt động',
    statusType: 'default'
  },
  {
    key: '7',
    name: 'Megan Roberts',
    email: 'roberts.3456@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/7.png',
    role: 'Subscriber',
    roleIcon: 'BxUser',
    roleColor: 'text-green-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Đang hoạt động',
    statusType: 'success'
  },
  {
    key: '8',
    name: 'Joseph Oliver',
    email: 'joseph.87@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/8.png',
    role: 'Subscriber',
    roleIcon: 'BxUser',
    roleColor: 'text-green-500',
    created: '12/2/2024',
    updated: '12/2/2024',
    status: 'Chưa kích hoạt',
    statusType: 'warning'
  }
]
</script>
