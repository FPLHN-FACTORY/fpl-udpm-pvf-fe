<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Kỳ tuyển sinh</span>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số kỳ tuyển sinh</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxSpreadsheet" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Số kỳ đang mở</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxsSchool" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng hồ sơ (tất cả kỳ)</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxFile" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng học viên trúng tuyển</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxsUserBadge" class-name="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Kỳ tuyển sinh</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="$router.push('/recruitment/admission-periods/deleted')" />
          <ButtonAdd text="Thêm Mới" @click="$router.push('/recruitment/admission-periods/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-date-picker 
              v-model:value="dateFilter" 
              placeholder="Chọn thời gian" 
              class="w-full !h-[38px]"
              format="YYYY-MM-DD"
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
              <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
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
                  @click="$router.push(`/recruitment/admission-periods/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/recruitment/admission-periods/edit/${record.key}`)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxCopy" class-name="w-[18px] h-[18px]" />
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
      <div class="p-6 flex justify-end">
        <BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="(page) => currentPage = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const dateFilter = ref()
const currentPage = ref(3)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  dateFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const getStatusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Ngừng hoạt động': return 'warning'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'CƠ SỞ ĐÀO TẠO', dataIndex: 'facility', key: 'facility' },
  { title: 'TÊN KỲ TUYỂN SINH', dataIndex: 'name', key: 'name' },
  { title: 'NGÀY TUYỂN', dataIndex: 'startDate', key: 'startDate' },
  { title: 'NGÀY KẾT THÚC', dataIndex: 'endDate', key: 'endDate' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 140, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '2',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '3',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '7',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Ngừng hoạt động',
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
