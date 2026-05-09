<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Biên bản đã xóa">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 bg-[#fcfcfd] p-4 border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
          />
        </div>
        <div class="w-[200px]">
          <a-date-picker 
            v-model:value="dateFilter" 
            placeholder="Chọn thời gian" 
            class="w-full !h-[38px]"
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Chọn trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="template-deleted-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>

            <template v-else-if="column.key === 'actions'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end border-t border-gray-100">
        <BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="handlePageChange"
        />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const dateFilter = ref(undefined)
const currentPage = ref(1)

const breadcrumbs = [
  { title: 'Kỷ luật khen thưởng', path: '#' },
  { title: 'Mẫu biên bản', path: '/discipline/templates' },
  { title: 'Danh sách đã xóa', path: '#' }
]

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  dateFilter.value = undefined
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => {} },
  { label: 'Khôi phục', icon: 'BxReset', onClick: () => {} },
  { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => {} },
]

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'TÊN MẪU', dataIndex: 'name', key: 'name' },
  { title: 'LOẠI', dataIndex: 'type', key: 'type' },
  { title: 'MỨC ĐỘ', dataIndex: 'level', key: 'level' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 200 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 150, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    deletedAt: '2025-01-02 7:00',
  },
  {
    key: '2',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    deletedAt: '2025-01-02 7:00',
  },
  {
    key: '3',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    deletedAt: '2025-01-02 7:00',
  },
])
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

:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
