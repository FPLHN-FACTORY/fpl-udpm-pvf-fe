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

        <!-- MÃ MÔN -->
        <div v-else-if="column.key === 'code'" class="text-[13px] font-bold text-[#566a7f]">
          {{ record.code }}
        </div>

        <!-- TÊN MÔN HỌC -->
        <div v-else-if="column.key === 'name'" class="text-[13px] text-[#566a7f]">
          {{ record.name }}
        </div>

        <!-- KHỐI HỌC -->
        <div v-else-if="column.key === 'grade'" class="text-[13px] text-[#566a7f]">
          {{ record.grade }}
        </div>

        <!-- NGÀY KẾT THÚC -->
        <div v-else-if="column.key === 'endDate'" class="text-[13px] text-[#566a7f]">
          {{ record.endDate }}
        </div>

        <!-- TRẠNG THÁI -->
        <div v-else-if="column.key === 'status'">
          <span 
            class="px-3 py-1 rounded-md text-[11px] font-bold"
            :class="record.status === 'Đang hoạt động' ? 'bg-[#e8fadf] text-[#71dd37]' : 'bg-[#fff2d6] text-[#ffab00]'"
          >
            {{ record.status }}
          </span>
        </div>

        <!-- HÀNH ĐỘNG -->
        <div v-else-if="column.key === 'actions'" class="flex items-center justify-center gap-3">
          <button @click="goToDetail(record.key)" class="text-[#a1acb8] hover:text-[#566a7f] transition-colors">
            <NavIcon name="BxShow" class-name="w-[20px] h-[20px]" />
          </button>
          <button @click="goToEdit(record.key)" class="text-[#a1acb8] hover:text-[#566a7f] transition-colors">
            <NavIcon name="BxEdit" class-name="w-[20px] h-[20px]" />
          </button>
          <button class="text-[#a1acb8] hover:text-red-500 transition-colors">
            <NavIcon name="BxTrash" class-name="w-[20px] h-[20px]" />
          </button>
        </div>
      </template>
    </a-table>

    <!-- Custom Pagination matching mockup -->
    <div class="p-6 flex justify-end">
      <div class="flex items-center gap-1">
        <!-- First Page -->
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#a1acb8] hover:bg-[#e1e4e8]">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M11.293 17.293 5.586 11.5l5.707-5.707 1.414 1.414L8.414 11.5l4.293 4.293zm6 0-5.707-5.793 5.707-5.707 1.414 1.414L14.414 11.5l4.293 4.293z"/></svg>
        </button>
        <!-- Prev Page -->
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#a1acb8] hover:bg-[#e1e4e8]">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"/></svg>
        </button>
        
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#566a7f] hover:bg-[#e1e4e8] text-[13px]">1</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#566a7f] hover:bg-[#e1e4e8] text-[13px]">2</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#ff3e1d] text-white shadow-sm text-[13px]">3</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#566a7f] hover:bg-[#e1e4e8] text-[13px]">4</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffebe6] text-[#ff3e1d] hover:bg-[#ffd9d0] text-[13px]">5</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#566a7f] hover:bg-[#e1e4e8] text-[13px]">6</button>
        
        <!-- Next Page -->
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#a1acb8] hover:bg-[#e1e4e8]">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
        </button>
        <!-- Last Page -->
        <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[#f0f2f4] text-[#a1acb8] hover:bg-[#e1e4e8]">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M7 17.293 12.707 11.5 7 5.793l1.414-1.414L15.535 11.5l-7.121 7.207zm6 0 5.707-5.793L13 5.793l1.414-1.414L21.535 11.5l-7.121 7.207z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'

const router = useRouter()
const selectedRowKeys = ref([])
const onSelectChange = (keys: any) => {
  selectedRowKeys.value = keys
}

const goToDetail = (id: string) => {
  router.push({ name: 'cultural-subject-detail', params: { id } })
}

const goToEdit = (id: string) => {
  router.push({ name: 'cultural-subject-edit', params: { id } })
}

const columns = [
  { title: '#', key: 'index', width: '60px', align: 'center' },
  { title: 'MÃ MÔN', key: 'code', dataIndex: 'code' },
  { title: 'TÊN MÔN HỌC', key: 'name', dataIndex: 'name' },
  { title: 'KHỐI HỌC', key: 'grade', dataIndex: 'grade' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate' },
  { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
  {
    title: 'HÀNH ĐỘNG',
    key: 'actions',
    width: '150px',
    align: 'center',
  },
]

const dataSource = [
  {
    key: '1',
    code: 'MH001',
    name: 'Tin học',
    grade: '12',
    endDate: '2025-02-10',
    status: 'Đang hoạt động'
  },
  {
    key: '2',
    code: 'MH002',
    name: 'Toán học',
    grade: '12',
    endDate: '2025-02-10',
    status: 'Đang hoạt động'
  },
  {
    key: '3',
    code: 'MH003',
    name: 'Văn học',
    grade: '12',
    endDate: '2025-02-10',
    status: 'Tạm ngưng'
  },
  {
    key: '4',
    code: 'MH004',
    name: 'Lịch sử',
    grade: '12',
    endDate: '2025-02-10',
    status: 'Đang hoạt động'
  }
]
</script>

<style scoped>
.custom-table :deep(.ant-table-thead > tr > th) {
  background-color: transparent !important;
  border-bottom: 1px solid #d9dee3 !important;
  padding: 16px !important;
  position: relative;
}

/* Vertical separators in header */
.custom-table :deep(.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #e1e4e8;
}

.custom-table :deep(.ant-table-row) {
  transition: background-color 0.2s;
}

.custom-table :deep(.ant-table-row:hover) {
  background-color: #fcfcfd;
}

.custom-table :deep(.ant-table-cell) {
  padding: 12px 16px !important;
  border-bottom: 1px solid #d9dee3 !important;
}

.custom-table :deep(.ant-checkbox-inner) {
  border-radius: 4px;
  border-color: #d9dee3;
}

.custom-table :deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #696cff;
  border-color: #696cff;
}
</style>
