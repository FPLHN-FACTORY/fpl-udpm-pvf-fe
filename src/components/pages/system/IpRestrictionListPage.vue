<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Giới hạn địa chỉ IP" padded>
      <template #actions>
        <ButtonAdd text="Thêm Mới" @click="$router.push('/system/security/ip-restriction/add')" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <InputSearch v-model="searchQuery" placeholder="Tìm IP/ mô tả" class="flex-1 min-w-[200px]" />
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="rangeFilter" placeholder="Phạm vi">
            <a-select-option value="all">Tất cả</a-select-option>
            <a-select-option value="internal">Nội bộ</a-select-option>
            <a-select-option value="external">Bên ngoài</a-select-option>
          </SelectFilter>
        </div>
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="statusFilter" placeholder="Trạng thái">
            <a-select-option value="active">Cho phép</a-select-option>
            <a-select-option value="locked">Tạm khoá</a-select-option>
            <a-select-option value="inactive">Chưa kích hoạt</a-select-option>
          </SelectFilter>
        </div>

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
          :data-source="ipData" 
          :pagination="false"
          :row-selection="{}"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getTagColor(record.status)" class="!rounded-md !px-3">
                {{ getStatusText(record.status) }}
              </BaseTag>
            </template>
            <template v-else-if="column.key === 'action'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
          <template #pagination>
            <div class="flex justify-end p-4">
              <BasePagination 
                :total="25" 
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
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import IconButton from '@/components/atoms/buttons/IconButton.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Bảo mật & Phân quyền', path: '#' },
  { title: 'Giới hạn địa chỉ IP', path: '/system/security/ip-restriction' }
]

const searchQuery = ref('')
const rangeFilter = ref(undefined)
const statusFilter = ref(undefined)
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'ĐỊA CHỈ IP ĐƯỢC PHÉP', dataIndex: 'ip', key: 'ip' },
  { title: 'MÔ TẢ CHÍNH SÁCH', dataIndex: 'description', key: 'description' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const ipData = ref([
  { id: 1, ip: '192.168.1.10', description: 'IP nội bộ văn phòng Hà Nội', status: 'active' },
  { id: 2, ip: '192.168.1.11', description: 'IP nội bộ phòng kỹ thuật', status: 'active' },
  { id: 3, ip: '10.0.0.5', description: 'IP truy cập hệ thống test', status: 'locked' },
  { id: 4, ip: '118.70.52.100', description: 'IP truy cập từ chi nhánh TP.HCM', status: 'inactive' }
])

const resetFilters = () => {
  searchQuery.value = ''
  rangeFilter.value = undefined
  statusFilter.value = undefined
}

const getTagColor = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'locked': return 'default'
    case 'inactive': return 'warning'
    default: return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Cho phép'
    case 'locked': return 'Tạm khoá'
    case 'inactive': return 'Chưa kích hoạt'
    default: return status
  }
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/system/security/ip-restriction/${record.id}`) },
  { label: 'Chỉnh sửa', icon: 'BxEditAlt', onClick: () => router.push(`/system/security/ip-restriction/edit/${record.id}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => console.log('Delete', record.id) }
]

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
