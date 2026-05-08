<template>
  <AppTable
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
    :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <span class="cursor-pointer font-medium text-blue-500 hover:underline" @click="goToDetail(record.key)">
          #{{ record.id }}
        </span>
      </template>

      <template v-else-if="column.key === 'user'">
        <div class="flex items-center gap-3">
          <img :src="record.user.avatar" class="h-8 w-8 rounded-full object-cover" />
          <div class="flex flex-col">
            <span class="text-[13px] font-bold leading-tight text-[#566a7f]">{{ record.user.name }}</span>
            <span class="text-[11px] text-gray-400">{{ record.user.email }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="column.key === 'action'">
        <span :class="getActionClass(record.action)" class="text-[12px] font-bold uppercase">
          {{ record.action }}
        </span>
      </template>

      <template v-else-if="column.key === 'objectType'">
        <BaseTag :type="getTagType(record.objectType)">{{ record.objectType }}</BaseTag>
      </template>

      <template v-else-if="column.key === 'actions'">
        <TableActions :actions="[{ label: 'Xem chi tiết', icon: 'BxShow', onClick: () => goToDetail(record.key) }]" />
      </template>
    </template>

    <template #pagination>
      <div class="flex justify-end">
        <a-pagination :total="dataSource.length" :current="1" :page-size="10" show-less-items />
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTag from '../atoms/display/BaseTag.vue'
import TableActions from '../molecules/TableActions.vue'
import AppTable from './AppTable.vue'

const router = useRouter()
const selectedRowKeys = ref<string[]>([])

const onSelectChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

const goToDetail = (id: string) => {
  router.push(`/system/log/detail/${id}`)
}

const columns = [
  { title: '#', key: 'id', align: 'center' },
  { title: 'THỜI GIAN', dataIndex: 'time', key: 'time' },
  { title: 'NGƯỜI DÙNG', key: 'user' },
  { title: 'HÀNH ĐỘNG', key: 'action', align: 'center' },
  { title: 'LOẠI ĐỐI TƯỢNG', key: 'objectType', align: 'center' },
  { title: 'ĐỐI TƯỢNG', dataIndex: 'object', key: 'object' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    id: '6979',
    time: 'Apr 15, 2023, 10:21',
    user: { name: 'Cristine Easom', email: 'ceasomw@theguardian.com', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png' },
    action: 'CREATE',
    objectType: 'USER',
    object: 'U001_NguyenVanA',
  },
  {
    key: '2',
    id: '6624',
    time: 'Apr 17, 2023, 6:43',
    user: { name: 'Fayre Screech', email: 'fscreechs@army.mil', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png' },
    action: 'DELETE',
    objectType: 'USER',
    object: 'U001_NguyenVanA',
  },
  {
    key: '3',
    id: '9305',
    time: 'Apr 17, 2023, 8:05',
    user: { name: 'Pauline Pfaffe', email: 'ppfaffeli@wikia.com', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png' },
    action: 'LOGIN',
    objectType: 'IP_POLICY',
    object: 'U001_NguyenVanA',
  },
  {
    key: '4',
    id: '8005',
    time: 'Apr 22, 2023, 3:01',
    user: { name: 'Maurits Nealey', email: 'mnealeyf@japanpost.jp', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png' },
    action: 'UPDATE',
    objectType: 'AUTH',
    object: 'U001_NguyenVanA',
  },
  {
    key: '5',
    id: '8114',
    time: 'Apr 8, 2023, 3:39',
    user: { name: 'Ulysses Goodlife', email: 'ugoodlife2p@blogger.com', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png' },
    action: 'DELETE',
    objectType: 'IP_POLICY',
    object: 'U001_NguyenVanA',
  },
  {
    key: '6',
    id: '6890',
    time: 'Aug 1, 2022, 7:24',
    user: { name: 'Etienne Duke', email: 'eduke1z@dell.com', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png' },
    action: 'LOGIN',
    objectType: 'AUTH',
    object: 'U001_NguyenVanA',
  },
  {
    key: '7',
    id: '5911',
    time: 'Aug 14, 2022, 3:26',
    user: { name: 'Hilliard Merck', email: 'hmerck2n@printfriendly.com', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/7.png' },
    action: 'LOGIN',
    objectType: 'USER',
    object: 'U001_NguyenVanA',
  },
  {
    key: '8',
    id: '5531',
    time: 'Aug 20, 2022, 3:21',
    user: { name: 'Cletus Arias', email: 'carias21@rambler.ru', avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/8.png' },
    action: 'DELETE',
    objectType: 'AUTH',
    object: 'U001_NguyenVanA',
  },
])

const getActionClass = (action: string) => {
  switch (action) {
    case 'CREATE': return 'text-orange-500'
    case 'DELETE': return 'text-red-500'
    case 'UPDATE': return 'text-green-500'
    case 'LOGIN': return 'text-gray-500'
    default: return 'text-blue-500'
  }
}

const getTagType = (type: string) => {
  switch (type) {
    case 'USER': return 'success'
    case 'IP_POLICY': return 'primary'
    case 'AUTH': return 'info'
    default: return 'default'
  }
}
</script>
