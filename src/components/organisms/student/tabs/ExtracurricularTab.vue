<template>
  <div class="space-y-4">
    <!-- View: Danh sách Học tập ngoại khóa -->
    <template v-if="extracurricularView === 'list'">
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div class="py-4 px-5 border-b border-[#E4E6E7]">
          <h2 class="font-bold text-base text-[#394552] m-0">Danh sách Học tập ngoại khóa</h2>
        </div>
        
        <!-- Search & Filters -->
        <div class="py-3 px-5 flex flex-wrap gap-3 items-center border-b border-[#E4E6E7]">
          <a-input 
            placeholder="Tìm kiếm"
            class="w-64 rounded-md"
          />
          <a-date-picker 
            placeholder="Chọn thời gian" 
            class="w-48 rounded-md"
          />
          <a-select
            placeholder="Chọn trạng thái"
            class="w-48 rounded-md"
          >
            <a-select-option value="pass">Pass</a-select-option>
            <a-select-option value="fail">Fail</a-select-option>
          </a-select>
          <a-button type="primary" style="background-color: #696CFF; border-color: #696CFF;" class="flex items-center gap-[2px] shadow-[0_2px_4px_rgba(105,108,255,0.4)] rounded-md hover:opacity-80 transition-opacity !text-white hover:!text-white ml-auto">
            <SearchOutlined /> Tìm Kiếm
          </a-button>
          <a-button style="background-color: #8592A3; border-color: #8592A3; color: white;" class="flex items-center justify-center shadow-[0_2px_4px_rgba(133,146,163,0.4)] rounded-md hover:opacity-80 transition-opacity !text-white hover:!text-white">
            <ReloadOutlined />
          </a-button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <a-table 
            :columns="extracurricularColumns" 
            :data-source="extracurricularClasses" 
            :row-selection="rowSelection"
            :pagination="false"
            row-key="id"
            class="extracurricular-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'index'">
                <span class="text-[#696CFF]">{{ record.index }}</span>
              </template>
              <template v-else-if="column.key === 'status'">
                <span class="bg-[#E8F9DF] text-[#71DD37] px-3 py-1 rounded-sm text-xs font-medium">
                  {{ record.status }}
                </span>
              </template>
              <template v-else-if="column.key === 'action'">
                <div class="flex gap-3 text-[#22303E]">
                  <button @click="extracurricularView = 'detail'" class="hover:text-blue-500 transition-colors" title="Xem chi tiết">
                    <EyeOutlined class="text-lg" />
                  </button>
                </div>
              </template>
            </template>
          </a-table>
        </div>

        <!-- Pagination -->
        <div class="py-4 px-5 flex justify-end">
          <div class="flex gap-2 items-center">
            <button class="page-btn"><DoubleLeftOutlined class="text-xs" /></button>
            <button class="page-btn"><LeftOutlined class="text-xs" /></button>
            <button class="page-btn">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn active">3</button>
            <button class="page-btn">4</button>
            <button class="page-btn">5</button>
            <button class="page-btn">6</button>
            <button class="page-btn"><RightOutlined class="text-xs" /></button>
            <button class="page-btn"><DoubleRightOutlined class="text-xs" /></button>
          </div>
        </div>
      </div>
    </template>

    <!-- View: Chi tiết Học tập ngoại khóa -->
    <template v-else>
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-bold text-base text-[#394552] m-0">Chi tiết Học tập ngoại khóa</h2>
          <div class="flex gap-2 items-center">
            <a-button @click="extracurricularView = 'list'" class="rounded-[6px] bg-[#EEEDF0] !text-[#384551] hover:!text-[#384551] border-none hover:bg-[#dcdbdc] transition-colors flex items-center justify-center">← Quay Lại</a-button>
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
                v-for="row in extracurricularDetailRows"
                :key="row.key"
                class="border-b border-[#E4E6E7] last:border-b-0"
              >
                <td class="w-[400px] px-5 py-3 font-bold text-[13px] text-[#394552] align-middle">
                  {{ row.label }}
                </td>
                <td class="px-2 py-3 text-[13px] text-[#394552] align-middle">
                  <span v-if="row.key === 'status'" class="bg-[#E8F9DF] text-[#71DD37] px-3 py-0.5 rounded-sm text-xs font-medium">
                    {{ row.value }}
                  </span>
                  <template v-else>
                    {{ row.value || '—' }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  SearchOutlined, 
  ReloadOutlined, 
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons-vue';
import type { Student } from '../../../../types/student';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

const extracurricularView = ref<'list' | 'detail'>('list');

const extracurricularColumns = [
  { title: '#', dataIndex: 'index', key: 'index', align: 'center', width: 60 },
  { title: 'TÊN LỚP HỌC', dataIndex: 'className', key: 'className' },
  { title: 'MÔN HỌC', dataIndex: 'subject', key: 'subject' },
  { title: 'THỜI GIAN HỌC', dataIndex: 'time', key: 'time' },
  { title: 'GV PHỤ TRÁCH', dataIndex: 'teacher', key: 'teacher' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 120 },
];

const extracurricularClasses = [
  { id: '1', index: 1, className: 'Lớp U12-A', subject: 'Ngoại khóa 1', time: '2024 - 2025', teacher: 'Nguyễn Đức Anh', status: 'Pass' },
  { id: '2', index: 1, className: 'Lớp U12-A', subject: 'Ngoại khóa 1', time: '2024 - 2025', teacher: 'Nguyễn Đức Anh', status: 'Pass' },
  { id: '3', index: 1, className: 'Lớp U12-A', subject: 'Ngoại khóa 1', time: '2024 - 2025', teacher: 'Nguyễn Đức Anh', status: 'Pass' },
  { id: '4', index: 1, className: 'Lớp U12-A', subject: 'Ngoại khóa 1', time: '2024 - 2025', teacher: 'Nguyễn Đức Anh', status: 'Pass' },
];

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const extracurricularDetailRows = computed(() => [
  { key: 'classCode', label: 'Mã lớp học',           value: 'Lớp U12-A' },
  { key: 'className', label: 'Tên lớp học',          value: 'Kỹ thuật bóng đá cơ bản' },
  { key: 'subject',   label: 'Môn học',              value: 'Ngoại khóa 1' },
  { key: 'time',      label: 'Thời gian học',        value: '2024 - 2025' },
  { key: 'teacher',   label: 'Giáo viên phụ trách',  value: 'Nguyễn Đức Anh' },
  { key: 'score1',    label: 'Đầu Điểm số 1',        value: '8' },
  { key: 'score2',    label: 'Đầu Điểm số 2',        value: '9' },
  { key: 'score3',    label: 'Đầu Điểm số 3',        value: '9' },
  { key: 'total',     label: 'Tổng điểm',            value: '9' },
  { key: 'avg',       label: 'Điểm Trung bình',      value: '9' },
  { key: 'status',    label: 'Trạng thái',           value: 'Pass' },
]);
</script>

<style scoped>
/* Tuỳ chỉnh table header và row cho giống design */
:deep(.extracurricular-table .ant-table-thead > tr > th) {
  background-color: transparent;
  color: #394552;
  font-weight: 700;
  font-size: 13px;
  border-bottom: 1px solid #E4E6E7;
  padding: 16px 16px;
  white-space: nowrap;
}
:deep(.extracurricular-table .ant-table-thead > tr > th::before) {
  width: 1px !important;
  background-color: #E4E6E7 !important;
  height: 14px !important;
}
:deep(.extracurricular-table .ant-table-tbody > tr > td) {
  border-bottom: 1px solid #E4E6E7;
  color: #394552;
  font-size: 13px;
  padding: 8px 16px;
}
:deep(.extracurricular-table .ant-table-tbody > tr:last-child > td) {
  border-bottom: none;
}
:deep(.extracurricular-table .ant-table-thead > tr > th:last-child),
:deep(.extracurricular-table .ant-table-tbody > tr > td:last-child) {
  padding-right: 32px;
}

/* Custom Pagination styles */
.page-btn {
  background-color: #F2F3F4;
  color: rgba(34, 48, 62, 0.9);
  border: none;
  border-radius: 6px;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(.active) {
  background-color: rgba(232, 25, 25, 0.1);
  color: #E81919;
}

.page-btn.active {
  background-color: #E81919;
  color: #FFFFFF;
}

:deep(.ant-input), :deep(.ant-picker), :deep(.ant-select-selector) {
  border-color: #CED2D5 !important;
}

:deep(.ant-checkbox-inner) {
  border-width: 2px;
  border-color: rgba(34, 48, 62, 0.4);
}
</style>
