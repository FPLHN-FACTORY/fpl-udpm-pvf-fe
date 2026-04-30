<template>
  <div class="bg-white rounded-b-xl border-x border-b border-gray-100 overflow-hidden">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      :pagination="false"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <template #bodyCell="{ column, record }">
        <!-- NGƯỜI DÙNG -->
        <div v-if="column.key === 'user'" class="flex items-center gap-3">
          <img :src="record.avatar" class="w-8 h-8 rounded-full object-cover" />
          <div class="flex flex-col">
            <span class="text-[13px] font-bold text-[#566a7f] leading-tight">{{ record.name }}</span>
            <span class="text-[11px] text-gray-400">{{ record.email }}</span>
          </div>
        </div>

        <!-- NHÓM QUYỀN -->
        <div v-else-if="column.key === 'role'" class="flex items-center gap-2">
          <NavIcon :name="record.roleIcon" :class-name="`w-5 h-5 ${record.roleColor}`" />
          <span class="text-[13px] text-gray-600 capitalize">{{ record.role }}</span>
        </div>

        <!-- TRẠNG THÁI -->
        <div v-else-if="column.key === 'status'">
          <BaseTag :type="record.statusType">{{ record.status }}</BaseTag>
        </div>

        <div v-else-if="column.key === 'actions'" class="flex items-center justify-center gap-2">
          <button 
            class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
            @click="$router.push(`/system/security/detail/${record.key}`)"
          >
            <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
          </button>
          <button 
            class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
            @click="$router.push(`/system/security/edit/${record.key}`)"
          >
            <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
          </button>
          <button class="p-1 text-[#a1acb8] hover:text-red-500 transition-colors">
            <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
          </button>
        </div>
      </template>
    </a-table>

    <!-- Custom Pagination -->
    <div class="p-4 flex justify-end border-t border-gray-100">
      <a-pagination :total="50" :current="1" :page-size="10" show-less-items />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../atoms/NavIcon.vue'
import BaseTag from '../atoms/BaseTag.vue'

const selectedRowKeys = ref([])
const onSelectChange = (keys: any) => {
  selectedRowKeys.value = keys
}

const columns = [
  { title: 'NGƯỜI DÙNG', key: 'user', dataIndex: 'name' },
  { title: 'NHÓM QUYỀN', key: 'role', dataIndex: 'role' },
  { title: 'NGÀY TẠO', key: 'created', dataIndex: 'created' },
  { title: 'NGÀY CẬP NHẬT', key: 'updated', dataIndex: 'updated' },
  { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
  {
    title: 'HÀNH ĐỘNG',
    key: 'actions',
    width: '150px',
    align: 'center',
  },
]

const dataSource = [
  {
    key: '1',
    name: 'Jordan Stevenson',
    email: 'jordan@gmail.com',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png',
    role: 'Admin',
    roleIcon: 'BxLogInWrapper', // Using available icons
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

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: transparent !important;
  color: #a1acb8 !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  border-bottom: 1px solid #f0f2f4 !important;
}
:deep(.ant-table-row) {
  cursor: pointer;
}
:deep(.ant-table-cell) {
  padding: 12px 16px !important;
  border-bottom: 1px solid #f0f2f4 !important;
}
:deep(.ant-pagination-item-active) {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
