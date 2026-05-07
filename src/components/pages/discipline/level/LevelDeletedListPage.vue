<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-[13px] mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header Section -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-[18px] font-bold text-[#566a7f]">Danh sách Mức độ khen thưởng/kỷ luật đã xóa</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#a1acb8] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/discipline/levels')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
              <a-select-option value="all">Tất cả</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="() => {}" />
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [] }"
          table-layout="fixed"
          class="custom-table"
        >
          <template #bodyCell="{ column, record, index }">
            <!-- Số thứ tự màu xanh -->
            <template v-if="column.key === 'stt'">
              <span class="text-[#696cff] font-medium">{{ index + 1 }}</span>
            </template>
            
            <!-- Các cột text bình thường -->
            <template v-else-if="column.dataIndex === 'name'">
              <span class="text-[#697a8d]">{{ record.name }}</span>
            </template>

            <!-- Cột hành động với icon mờ -->
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center justify-center gap-4">
                <button class="text-[#a1acb8] hover:text-blue-500 transition-colors">
                  <NavIcon name="BxShow" class-name="w-[19px] h-[19px]" />
                </button>
                <button class="text-[#a1acb8] hover:text-green-500 transition-colors">
                  <NavIcon name="BxRevision" class-name="w-[19px] h-[19px]" />
                </button>
                <button class="text-[#a1acb8] hover:text-red-500 transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[19px] h-[19px]" />
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
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { 
    title: '#', 
    key: 'stt', 
    width: 70, 
    align: 'center' 
  },
  { 
    title: 'TÊN MỨC', 
    dataIndex: 'name', 
    key: 'name',
    width: 200, // Cố định để không chiếm quá nhiều khoảng trắng
    align: 'left'
  },
  { 
    title: 'KHIỂN TRÁCH', 
    dataIndex: 'type', 
    key: 'type', 
    width: 220, 
    align: 'left'
  },
  { 
    title: 'CẤP ĐỘ', 
    dataIndex: 'level', 
    key: 'level', 
    // KHÔNG đặt width ở đây để nó tự giãn ra, 
    // tạo khoảng trống lớn ngăn cách với Ngày Xóa
    align: 'left'
  },
  { 
    title: 'NGÀY XÓA', 
    dataIndex: 'deletedAt', 
    key: 'deletedAt', 
    width: 240,
    align: 'left'
  },
  { 
    title: 'HÀNH ĐỘNG', 
    key: 'actions', 
    width: 140, 
    align: 'center' 
  },
];

const dataSource = ref([
  { key: '1', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
  { key: '2', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
  { key: '3', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
])
</script>

<style scoped>
/* Header: Màu nền trắng, chữ hoa, có vạch ngăn dọc mờ */
:deep(.ant-table-thead > tr > th) {
  background-color: white !important;
  color: #566a7f !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  border-bottom: 1px solid #f0f2f5 !important;
  padding: 12px 20px !important;
  position: relative;
}

/* Vạch ngăn dọc mờ chỉ ở Header (cao 40% hàng) */
:deep(.ant-table-thead > tr > th:not(:last-child)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 30%;
  height: 40%;
  width: 1px;
  background-color: #d9dee3;
}

/* Body: Chữ mảnh (weight 400), không có vạch ngăn dọc */
:deep(.ant-table-tbody > tr > td) {
  padding: 16px 20px !important;
  color: #697a8d;
  font-size: 14px;
  font-weight: 400 !important; /* Tránh bị tô đậm chữ */
  border-bottom: 1px solid #f0f2f5 !important;
}

/* Hiệu ứng hover hàng */
:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #fcfcfd !important;
}

/* Xóa khung bao ngoài của Table */
:deep(.ant-table) {
  border: none !important;
}

/* Tùy chỉnh Select và Input */
:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
</style>