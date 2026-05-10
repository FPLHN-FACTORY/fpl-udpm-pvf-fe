<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thông tin cơ sở" padded>
      <template #actions>
        <ButtonDeleteList text="Danh Sách Đã Xóa" @click="$router.push('/recruitment/facility/deleted')" />
        <ButtonAdd text="Thêm Mới" @click="$router.push('/recruitment/facility/create')" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <InputSearch v-model="searchQuery" placeholder="Tìm kiếm cơ sở..." class="flex-1 min-w-[200px]" />
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái">
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </SelectFilter>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch text="Tìm Kiếm" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <AppTable 
          :columns="columns" 
          :data-source="facilityData" 
          :pagination="false"
          :row-selection="{}"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'active' ? 'success' : 'warning'" class="!rounded-md !px-3">
                {{ record.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
              </BaseTag>
            </template>
            <template v-else-if="column.key === 'action'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
          <template #pagination>
            <div class="flex justify-end p-4">
              <BasePagination 
                :total="facilityData.length" 
                :current="currentPage" 
                :page-size="10" 
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
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Thông tin cơ sở', path: '/recruitment/facility/list' }
]

const searchQuery = ref('')
const statusFilter = ref(undefined)
const currentPage = ref(1)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'TÊN CƠ SỞ ĐÀO TẠO', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA CHỈ', dataIndex: 'address', key: 'address' },
  { title: 'THÔNG TIN LIÊN HỆ', dataIndex: 'contact', key: 'contact' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const facilityData = ref([
  { id: 1, name: 'Cơ sở đào tạo FPT Hà Nội', address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội', contact: '024-7300-1955', status: 'active' },
  { id: 2, name: 'Cơ sở đào tạo FPT TP.HCM', address: 'Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức', contact: '028-7300-1955', status: 'active' },
  { id: 3, name: 'Cơ sở đào tạo FPT Đà Nẵng', address: 'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng', contact: '0236-7300-1955', status: 'inactive' },
])

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/recruitment/facility/info`) },
  { label: 'Chỉnh sửa', icon: 'BxEditAlt', onClick: () => router.push(`/recruitment/facility/edit/${record.id}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => console.log('Delete', record.id) }
]

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
