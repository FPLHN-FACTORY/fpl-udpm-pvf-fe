<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập văn hoá</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Khối lớp</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách <span class="bg-[#fcf3d7] px-1 rounded">Khối lớp</span></h2>
        <div class="flex gap-3">
          <BaseButton 
            variant="default" 
            icon="BxTrash" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !text-white !text-[13px] !px-4"
            @click="$router.push('/cultural/grade/deleted')"
          >
            Danh Sách Đã Xóa
          </BaseButton>
          <BaseButton 
            variant="primary" 
            icon="BxPlus" 
            class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !text-white !text-[13px] !px-4"
            @click="$router.push('/cultural/grade/create')"
          >
            Thêm Mới
          </BaseButton>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
            class="!h-[38px] !border-[#d9dee3]"
            icon="BxSearch"
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang sử dụng</a-select-option>
            <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
            <a-select-option value="suspended">Tạm ngưng</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton 
            variant="primary" 
            icon="BxSearch" 
            class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-[38px]"
          >
            Tìm Kiếm
          </BaseButton>
          <BaseButton 
            icon="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-[38px] !h-[38px] !p-0 !min-w-0 flex items-center justify-center rounded-lg" 
            icon-class-name="w-6 h-6 text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="grade-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/cultural/grade/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/cultural/grade/edit/${record.key}`)"
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
      <div class="p-6 flex justify-end">
        <a-pagination 
          v-model:current="currentPage" 
          :total="50" 
          :show-size-changer="false"
          class="custom-pagination"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../atoms/BaseButton.vue'
import BaseInput from '../../atoms/BaseInput.vue'
import BaseTag from '../../atoms/BaseTag.vue'
import NavIcon from '../../atoms/NavIcon.vue'

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
  switch (status) {
    case 'Đang sử dụng': return 'success'
    case 'Ngừng sử dụng': return 'secondary'
    case 'Tạm ngưng': return 'warning'
    default: return 'primary'
  }
}

const columns = [
  { title: 'STT', key: 'stt', width: 80 },
  { title: 'TÊN KHỐI', dataIndex: 'name', key: 'name' },
  { title: 'GHI CHÚ', dataIndex: 'note', key: 'note' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: '10',
    note: 'Dành cho học viên độ tuổi U12',
    status: 'Đang sử dụng',
  },
  {
    key: '2',
    name: '11',
    note: 'Dành cho học viên độ tuổi U12',
    status: 'Đang sử dụng',
  },
  {
    key: '3',
    name: '12',
    note: 'Dành cho học viên độ tuổi U12',
    status: 'Ngừng sử dụng',
  },
  {
    key: '4',
    name: '9',
    note: 'Dành cho học viên độ tuổi U12',
    status: 'Tạm ngưng',
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

:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}

:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}

.grade-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
