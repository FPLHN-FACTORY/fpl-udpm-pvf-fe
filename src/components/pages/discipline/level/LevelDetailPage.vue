<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Detail Info - PHẦN ĐÃ SỬA BO GÓC -->
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
          <a-button class="!bg-[#fdac41] hover:!bg-[#e89a30] !text-white !border-none !h-[38px] !px-4 !font-medium" @click="$router.push('/discipline/levels/edit/1')">
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <div class="p-6">
        <!-- Khung bo góc cho nội dung chi tiết -->
        <div class="border border-gray-100 rounded-lg overflow-hidden">
          
          <!-- Dòng: ID -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              ID
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              HS001
            </div>
          </div>

          <!-- Dòng: Tên mức -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              Tên mức
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              Khiển trách
            </div>
          </div>

          <!-- Dòng: Cấp độ -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              Cấp độ
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              1
            </div>
          </div>

          <!-- Dòng: Mô tả -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              Mô tả
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              Mô tả
            </div>
          </div>

          <!-- Dòng: Thời gian tạo -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              Thời gian tạo
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              10/01/2025 09:00
            </div>
          </div>

          <!-- Dòng: Thời gian cập nhật -->
          <div class="flex border-b border-gray-100 last:border-0">
            <div class="w-[250px] p-5 bg-[#fcfcfd] border-r border-gray-100 font-bold text-[#566a7f] text-[14px]">
              Thời gian cập nhật
            </div>
            <div class="flex-1 p-5 text-[#697a8d] text-[14px]">
              12/01/2025 14:30
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Related List - GIỮ NGUYÊN BẢNG DƯỚI -->
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
          <template #bodyCell="{ column, index }">
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
  { title: '#', key: 'stt', width: 80, align: 'center' },
  { title: 'TÊN MẪU BIÊN BẢN', dataIndex: 'name', key: 'name' },
  { title: 'SỐ TRƯỜNG', dataIndex: 'fields', key: 'fields', width: 150, align: 'center' },
  { title: 'TRẠNG THÁI', key: 'status', width: 200, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 180, align: 'center' },
];

const dataSource = ref([
  { key: '1', name: 'BB Kỷ luật nhẹ', fields: '2' },
  { key: '2', name: 'BB Khen thưởng', fields: '4' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
</style>