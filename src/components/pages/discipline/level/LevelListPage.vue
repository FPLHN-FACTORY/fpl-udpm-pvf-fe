<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Stats Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxSpreadsheet" class-name="w-6 h-6" /> <!-- Dùng BxSpreadsheet -->
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số biên bản</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">50</h3>
        </div>
        <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxsSchool" class-name="w-6 h-6" /> <!-- Dùng BxsSchool -->
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Đang sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxFile" class-name="w-6 h-6" /> <!-- Dùng BxFile -->
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Ngừng sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">11</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxsUserBadge" class-name="w-6 h-6" /> <!-- Dùng BxsUserBadge -->
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Mức độ khen thưởng/kỷ luật</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="$router.push('/discipline/levels/deleted')" />
          <ButtonAdd text="Thêm Mới" @click="$router.push('/discipline/levels/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full !h-[38px]">
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

      <!-- Table -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="custom-level-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#696cff] font-medium">{{ index + 1 }}</span>
            </template>

            <template v-else-if="column.key === 'name'">
              <span class="text-[#566a7f] font-semibold">{{ record.name }}</span>
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center justify-center gap-3 text-gray-400">
                <button class="hover:text-[#696cff] transition-colors" @click="$router.push(`/discipline/levels/detail/${record.key}`)">
                  <NavIcon name="BxShow" size="18" />
                </button>
                <button class="hover:text-[#566a7f] transition-colors" @click="$router.push(`/discipline/levels/edit/${record.key}`)">
                  <NavIcon name="BxEdit" size="18" /> <!-- Dùng BxEdit thay vì BxEditAlt -->
                </button>
                <button class="hover:text-[#ff3e1d] transition-colors">
                  <NavIcon name="BxTrash" size="18" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination Section -->
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
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const currentPage = ref(3)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const getStatusType = (status: string) => {
  return status === 'Đang hoạt động' ? 'success' : 'default'
}

const columns = [
  { title: '#', key: 'stt', width: 50, align: 'center' },
  { title: 'TÊN MỨC', dataIndex: 'name', key: 'name', width: 150 },
  { title: 'KHIỂN TRÁCH', dataIndex: 'type', key: 'type', width: 150 },
  { title: 'CẤP ĐỘ', dataIndex: 'level', key: 'level', width: 350 }, // Tăng rộng cột này để tạo khoảng trắng
  { title: 'TRẠNG THÁI', key: 'status', width: 180, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 130, align: 'center' },
]

const dataSource = ref([
  { key: '1', name: 'Khiển trách', type: 'Kỷ luật', level: '1', status: 'Đang hoạt động' },
  { key: '2', name: 'Khiển trách', type: 'Kỷ luật', level: '1', status: 'Đang hoạt động' },
  { key: '3', name: 'Khiển trách', type: 'Kỷ luật', level: '1', status: 'Đang hoạt động' },
])
</script>

<style scoped>
/* Vẽ vạch kẻ header */
:deep(.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column)) {
  position: relative;
}
:deep(.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #e2e8f0;
}
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
:deep(.ant-table-selection-column) {
  padding-left: 20px !important;
  width: 40px !important;
}
</style>