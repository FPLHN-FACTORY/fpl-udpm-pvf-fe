<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập ngoại khóa</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Lớp học ngoại khóa</span>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Lớp học ngoại khóa - Bảng điểm</h2>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="classData" 
          :pagination="false"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'status'">
              <div class="flex items-center">
                <span :class="record.status === 'active' ? 'bg-[#e7f5e9] text-[#71dd37]' : 'bg-[#fff2e1] text-[#ffab00]'" class="px-3 py-1 rounded-md text-[11px] font-bold uppercase whitespace-nowrap">
                  {{ record.status === 'active' ? 'Đang mở' : 'Đã đóng' }}
                </span>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <a-button 
                type="primary" 
                class="!bg-[#71dd37] border-none rounded-md h-8 text-[11px] font-bold uppercase"
                @click="$router.push({ name: 'extracurricular-classes-detail', params: { id: record.id }, query: { tab: 'grades' } })"
              >
                Vào Bảng Điểm
              </a-button>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="1" :total="classData.length" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'MÔN', dataIndex: 'subject', key: 'subject' },
  { title: 'TÊN LỚP', dataIndex: 'name', key: 'name' },
  { title: 'GIÁO VIÊN', dataIndex: 'teacher', key: 'teacher' },
  { title: 'SỸ SỐ', dataIndex: 'size', key: 'size', align: 'center' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const classData = ref([
  { id: 1, subject: 'Kỹ năng làm việc nhóm', name: 'UT1301', teacher: 'Nguyễn Văn Hùng', size: '20/20', status: 'active' },
  { id: 2, subject: 'Kỹ năng mềm', name: 'UT1302', teacher: 'Trần Minh Tuấn', size: '15/20', status: 'active' },
])
</script>

<style scoped>
:deep(.pvf-table .ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  border-bottom: 1px solid #d9dee3;
}
:deep(.pvf-table .ant-table-tbody > tr > td) {
  color: #566a7f;
  font-size: 13px;
  padding: 12px 16px;
}
:deep(.ant-pagination-item-active) {
  background-color: #e31a1a !important;
  border-color: #e31a1a !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
