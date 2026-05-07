<template>
  <div class="bg-white rounded-b-lg overflow-hidden">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      :pagination="false"
      class="custom-table"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <template #headerCell="{ column }">
        <span class="text-[12px] font-bold text-[#566a7f] uppercase tracking-wider">
          {{ column.title }}
        </span>
      </template>

      <template #bodyCell="{ column, record, index }">
        <!-- Index -->
        <div v-if="column.key === 'index'" class="text-[13px] font-bold text-[#696cff]">
          {{ index + 1 }}
        </div>

        <!-- HỌC VIÊN -->
        <div v-else-if="column.key === 'studentName'" class="text-[13px] text-[#566a7f]">
          {{ record.studentName }}
        </div>

        <!-- MÃ HỌC VIÊN -->
        <div v-else-if="column.key === 'studentCode'" class="text-[13px] text-[#566a7f]">
          {{ record.studentCode }}
        </div>

        <!-- KHÓA -->
        <div v-else-if="column.key === 'course'" class="text-[13px] text-[#566a7f]">
          {{ record.course }}
        </div>

        <!-- THỜI GIAN XÓA -->
        <div v-else-if="column.key === 'deletedAt'" class="text-[13px] text-[#566a7f]">
          {{ record.deletedAt }}
        </div>

        <!-- TRẠNG THÁI -->
        <div v-else-if="column.key === 'status'">
          <span 
            class="px-3 py-1 rounded-md text-[11px] font-bold"
            :class="record.status === 'Đã khóa' ? 'bg-[#e8fadf] text-[#71dd37]' : 'bg-[#fff2d6] text-[#ffab00]'"
          >
            {{ record.status }}
          </span>
        </div>

        <!-- HÀNH ĐỘNG -->
        <div v-else-if="column.key === 'actions'" class="flex items-center justify-center gap-3">
          <button class="text-[#8592a3] hover:text-[#71dd37] transition-colors" title="Khôi phục">
            <NavIcon name="BxUndo" class-name="w-[20px] h-[20px]" />
          </button>
          <button class="text-[#8592a3] hover:text-[#E81919] transition-colors" title="Xóa vĩnh viễn">
            <NavIcon name="BxTrash" class-name="w-[20px] h-[20px]" />
          </button>
        </div>
      </template>
    </a-table>

    <div class="py-2 px-6 flex justify-end">
      <div class="flex items-center gap-1.5">
        <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#8592a3] hover:bg-[#e1e4e8] transition-colors">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M11.293 17.293 5.586 11.5l5.707-5.707 1.414 1.414L8.414 11.5l4.293 4.293zm6 0-5.707-5.793 5.707-5.707 1.414 1.414L14.414 11.5l4.293 4.293z"/></svg>
        </button>
        <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#8592a3] hover:bg-[#e1e4e8] transition-colors">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"/></svg>
        </button>
        <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#E81919] text-white shadow-sm text-[13px] font-bold">1</button>
        <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#8592a3] hover:bg-[#e1e4e8] transition-colors">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
        </button>
        <button class="w-[38px] h-[38px] flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#a1acb8] hover:bg-[#e1e4e8] transition-colors">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M7 17.293 12.707 11.5 7 5.793l1.414-1.414L15.535 11.5l-7.121 7.207zm6 0 5.707-5.793L13 5.793l1.414-1.414L21.535 11.5l-7.121 7.207z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from '../atoms/icons/NavIcon.vue'
import { mockDeletedCourseEvaluations } from '../../services/home/api'

const selectedRowKeys = ref([])
const onSelectChange = (keys: any) => {
  selectedRowKeys.value = keys
}

const columns = [
  { title: '#', key: 'index', width: '60px', align: 'center' },
  { title: 'HỌC VIÊN', key: 'studentName', dataIndex: 'studentName' },
  { title: 'MÃ HỌC VIÊN', key: 'studentCode', dataIndex: 'studentCode' },
  { title: 'KHÓA', key: 'course', dataIndex: 'course' },
  { title: 'THỜI GIAN XÓA', key: 'deletedAt', dataIndex: 'deletedAt' },
  { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
  {
    title: 'HÀNH ĐỘNG',
    key: 'actions',
    width: '150px',
    align: 'center',
  },
]

const dataSource = ref(mockDeletedCourseEvaluations)
</script>

<style scoped>
.custom-table :deep(.ant-table-thead > tr > th) {
  background-color: transparent !important;
  border-bottom: 1px solid #d9dee3 !important;
  padding: 16px !important;
  position: relative;
}

.custom-table :deep(.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #e1e4e8;
}

.custom-table :deep(.ant-table-cell) {
  padding: 12px 16px !important;
  border-bottom: 1px solid #d9dee3 !important;
}
</style>
