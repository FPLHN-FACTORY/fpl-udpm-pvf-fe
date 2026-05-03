<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mẫu biên bản</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Biên bản đã xóa</h2>
        <div class="flex gap-3">
          <BaseButton 
            variant="default" 
            size="small" 
            class="!bg-[#eceef1] hover:!bg-[#daddf1] !border-none !text-[#8592a3] !text-[13px] !px-4 flex items-center gap-1"
            @click="$router.back()"
          >
            <span class="text-lg">←</span> Quay Lại
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
          class="template-deleted-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/templates/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  title="Khôi phục"
                >
                  <NavIcon name="BxUndo" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors"
                  title="Xóa vĩnh viễn"
                >
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
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const dateFilter = ref(undefined)
const currentPage = ref(4)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  dateFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const columns = [
  { title: '#', key: 'stt', width: 60 },
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

:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}
</style>
