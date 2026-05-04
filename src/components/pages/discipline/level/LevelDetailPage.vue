<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Detail Info -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Mức độ khen thưởng/ kỷ luật</h2>
        <div class="flex gap-3">
          <a-button 
            class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
            @click="$router.push('/discipline/levels')"
          >
            <template #icon>←</template>
            Quay Lại
          </a-button>
          <a-button class="!bg-[#fdac41] !text-white !border-none !h-[38px] !px-4" @click="$router.push('/discipline/levels/edit/1')">
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <div class="p-0">
        <table class="w-full">
          <tbody class="divide-y divide-gray-100">
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f] w-1/4">ID</td>
              <td class="px-6 py-4 text-gray-500">HS001</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Tên mức</td>
              <td class="px-6 py-4 text-gray-500">Khiển trách</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Cấp độ</td>
              <td class="px-6 py-4 text-gray-500">1</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Mô tả</td>
              <td class="px-6 py-4 text-gray-500">Mô tả</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Thời gian tạo</td>
              <td class="px-6 py-4 text-gray-500">10/01/2025 09:00</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Thời gian cập nhật</td>
              <td class="px-6 py-4 text-gray-500">12/01/2025 14:30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Related List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Biên bản</h2>
        <ButtonAdd text="Thêm Mới" />
      </div>

      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
        <div class="w-[250px]">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <a-date-picker placeholder="Chọn thời gian" class="w-full !h-[38px]" />
        </div>
        <div class="w-[200px]">
          <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
            <a-select-option value="active">Đang hoạt động</a-select-option>
          </a-select>
        </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="() => {}" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [] }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">{{ index + 1 }}</template>
            <template v-else-if="column.key === 'status'">
              <BaseTag type="success">Đang hoạt động</BaseTag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxShow" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" /></button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
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
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN MẪU BIÊN BẢN', dataIndex: 'name', key: 'name' },
  { title: 'SỐ TRƯỜNG', dataIndex: 'fields', key: 'fields' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  { key: '1', name: 'BB Kỷ luật nhẹ', fields: '2' },
  { key: '2', name: 'BB Khen thưởng', fields: '4' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
:deep(.custom-pagination .ant-pagination-item-active) { background-color: #ff3e1d !important; border-color: #ff3e1d !important; }
:deep(.custom-pagination .ant-pagination-item-active a) { color: white !important; }
</style>
