<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Thông tin đào tạo đã xóa" padded>
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <InputSearch v-model="searchQuery" placeholder="Tìm tên cơ sở / địa chỉ" class="flex-1 min-w-[200px]" />
        
        <div class="flex items-center gap-2">
          <ButtonSearch text="Tìm Kiếm" />
          <IconButton 
            name="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <AppTable 
          :columns="columns" 
          :data-source="deletedData" 
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'action'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
          <template #pagination>
            <div class="flex justify-end p-4">
              <BasePagination 
                :total="deletedData.length" 
                :current="currentPage" 
                :page-size="5" 
                @change="handlePageChange" 
              />
            </div>
          </template>
        </AppTable>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import IconButton from '@/components/atoms/buttons/IconButton.vue'

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Thông tin đào tạo', path: '/recruitment/facility/list' },
  { title: 'Danh sách đã xóa', path: '#' }
]

const searchQuery = ref('')
const currentPage = ref(1)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'TÊN CƠ SỞ ĐÀO TẠO', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ', dataIndex: 'address', key: 'address' },
  { title: 'THÔNG TIN LIÊN HỆ', dataIndex: 'contact', key: 'contact' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const deletedData = ref([
  { 
    id: 1, 
    name: 'Cơ sở đào tạo FPT Cần Thơ', 
    address: '600 Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ', 
    contact: '0292-7300-1955',
    deletedAt: '2026-04-15'
  },
  { 
    id: 2, 
    name: 'Cơ sở đào tạo FPT Đà Nẵng', 
    address: 'Khu đô thị FPT City, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng', 
    contact: '0236-7300-1955',
    deletedAt: '2026-03-20'
  }
])

const resetFilters = () => {
  searchQuery.value = ''
}

const getActions = (record: any) => [
  { label: 'Khôi phục', icon: 'BxReset', onClick: () => console.log('Restoring facility:', record.name) },
  { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => console.log('Permanently deleting facility:', record.name) }
]

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
