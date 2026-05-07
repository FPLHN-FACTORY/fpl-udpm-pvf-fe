<template>
  <div class="space-y-4">
    <!-- Section 1: Chi tiết Hợp đồng đã ký -->
    <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-bold text-base text-[#394552] m-0">Chi tiết Hợp đồng đã ký</h2>
        <div class="flex gap-2 items-center">
          <a-button @click="$emit('back')" class="rounded-[6px] bg-[#EEEDF0] !text-[#384551] hover:!text-[#384551] border-none hover:bg-[#dcdbdc] transition-colors flex items-center justify-center">← Quay Lại</a-button>
          <a-button
            class="rounded-[6px] bg-[#FFAB00] !text-white hover:!text-white border-none hover:opacity-80 transition-opacity flex items-center justify-center"
            style="box-shadow: -2px 4px 6px -1px rgba(0, 0, 0, 0.05), 2px 4px 6px -1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>
      <div class="border border-[#E4E6E7] rounded-[6px] overflow-hidden">
        <table class="w-full">
          <tbody>
            <tr
              v-for="row in contractRows"
              :key="row.key"
              class="border-b border-[#E4E6E7] last:border-b-0"
            >
              <td class="w-[400px] px-5 py-3 font-bold text-[13px] text-[#394552] align-middle">
                {{ row.label }}
              </td>
              <td class="px-2 py-3 text-[13px] text-[#394552] align-middle">
                {{ row.value || '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 2: Các điều khoản, quyền lợi, nghĩa vụ, ... -->
    <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <div class="flex items-center mb-5">
        <h3 class="font-bold text-base text-[#394552] m-0">Các điều khoản, quyền lợi, nghĩa vụ, ...</h3>
      </div>
      <div class="border border-[#E4E6E7] rounded-[6px] overflow-hidden">
        <a-table 
          :columns="termColumns" 
          :data-source="contractTerms" 
          :pagination="false"
          row-key="id"
          class="custom-table"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Student } from '../../../../types/student';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

// Dữ liệu tĩnh cho hợp đồng, sau này có thể ánh xạ từ props.student.contract nếu có
const contractRows = computed(() => [
  { key: 'contractId',     label: 'ID hợp đồng',          value: 'HF001' },
  { key: 'studentName',    label: 'Học viên',             value: props.student.fullName },
  { key: 'contractVersion',label: 'Phiên bản hợp đồng',   value: 'HĐĐT-CTT-PVF-2025-v1.0' },
  { key: 'startDate',      label: 'Ngày bắt đầu',         value: '01/01/2025' },
  { key: 'endDate',        label: 'Ngày kết thúc',        value: '31/12/2027' },
  { key: 'years',          label: 'Số năm',               value: '3' },
  { key: 'createdAt',      label: 'Thời gian tạo',        value: '2025-01-01 08:30:00' },
  { key: 'updatedAt',      label: 'Thời gian cập nhật',   value: '2026-01-20 10:15:45' },
]);

const termColumns = [
  { title: '#', dataIndex: 'index', key: 'index', width: 80, align: 'center' },
  { title: 'TÊN ĐIỀU KHOẢN', dataIndex: 'name', key: 'name', width: 300 },
  { title: 'MÔ TẢ', dataIndex: 'description', key: 'description' },
];

const contractTerms = [
  { id: '1', index: 1, name: 'Điều khoản 1', description: 'Mô tả Điều khoản 1' },
  { id: '2', index: 2, name: 'Điều khoản 2', description: 'Mô tả Điều khoản 2' },
];
</script>

<style scoped>
:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: transparent;
  color: #394552;
  font-weight: 700;
  font-size: 13px;
  border-bottom: 1px solid #E4E6E7;
  padding: 12px 16px;
  white-space: nowrap;
}
:deep(.custom-table .ant-table-tbody > tr > td) {
  border-bottom: 1px solid #E4E6E7;
  color: #394552;
  font-size: 13px;
  padding: 12px 16px;
}
:deep(.custom-table .ant-table-tbody > tr:last-child > td) {
  border-bottom: none;
}
:deep(.custom-table .ant-table-tbody > tr > td:first-child) {
  color: #696CFF; /* Màu xanh cho cột index */
}
</style>
