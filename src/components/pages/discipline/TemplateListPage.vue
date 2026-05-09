<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số <span class="bg-[#fcf3d7] px-1 rounded">mẫu biên bản</span></p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Số <span class="bg-[#fcf3d7] px-1 rounded">mẫu biên bản</span> đang sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#e8fadf] rounded-lg flex items-center justify-center text-[#71dd37]">
          <NavIcon name="BxCalendarCheck" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Số <span class="bg-[#fcf3d7] px-1 rounded">mẫu biên bản</span> ngừng sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
            <span class="text-[#ff3e1d] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <AdminCard title="Danh sách Biên bản">
      <template #actions>
        <ButtonDeleteList 
          @click="$router.push('/discipline/templates/deleted')"
        />
        <ButtonAdd text="Thêm Mới" @click="$router.push('/discipline/templates/create')" />
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
          class="template-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/templates/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/templates/edit/${record.key}`)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
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
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const dateFilter = ref(undefined)
const currentPage = ref(1)

const breadcrumbs = [
  { title: 'Kỷ luật khen thưởng', path: '#' },
  { title: 'Mẫu biên bản', path: '/discipline/templates' }
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

const getStatusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Ngừng hoạt động': return 'default'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'TÊN MẪU', dataIndex: 'name', key: 'name' },
  { title: 'LOẠI', dataIndex: 'type', key: 'type' },
  { title: 'MỨC ĐỘ', dataIndex: 'level', key: 'level' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '2',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '3',
    name: 'BB Kỷ luật nhẹ',
    type: 'Khiển trách',
    level: '1',
    status: 'Đang hoạt động',
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

.template-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
