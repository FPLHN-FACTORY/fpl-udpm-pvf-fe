<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Kỳ tuyển sinh đã xoá</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/recruitment/admission-periods')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
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
              <a-select-option value="all">Tất cả</a-select-option>
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
            <template v-if="column.key === 'stt'">
              <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxShow" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxRevision" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" /></button>
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
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'CƠ SỞ ĐÀO TẠO', dataIndex: 'facility', key: 'facility' },
  { title: 'TÊN KỲ TUYỂN SINH', dataIndex: 'name', key: 'name' },
  { title: 'NGÀY TUYỂN', dataIndex: 'startDate', key: 'startDate' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  { key: '1', facility: 'Cơ sở đào tạo FPT Hà Nội', name: 'Kỳ tuyển sinh Xuân 2025', startDate: '2025-01-15', deletedAt: '2025-03-31 8:30' },
  { key: '2', facility: 'Cơ sở đào tạo FPT TP.HCM', name: 'Kỳ tuyển sinh Xuân 2025', startDate: '2025-01-15', deletedAt: '2025-03-31 8:30' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
</style>
