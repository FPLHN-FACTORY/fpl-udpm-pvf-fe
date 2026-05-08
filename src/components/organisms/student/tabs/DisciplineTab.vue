<template>
  <div class="space-y-4">
    <!-- View: Danh sách -->
    <template v-if="view === 'list'">
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-4">
        <div class="py-4 px-5 border-b border-[#E4E6E7] flex justify-between items-center">
          <h2 class="font-bold text-base text-[#394552] m-0">Danh sách Quyết định kỷ luật/ Khen thưởng</h2>
          <a-button type="primary" style="background-color: #E81919; border-color: #E81919;" class="flex items-center gap-[2px] shadow-[0_2px_4px_rgba(232,25,25,0.4)] rounded-md hover:opacity-80 transition-opacity !text-white hover:!text-white">
            <PlusOutlined /> Thêm Mới
          </a-button>
        </div>
        
        <!-- Search & Filters -->
        <div class="py-3 px-5 flex flex-wrap gap-3 items-center border-b border-[#E4E6E7]">
          <a-input 
            placeholder="Tìm kiếm"
            class="w-64 rounded-md"
          />
          <a-select
            placeholder="Chọn người quyết định"
            class="w-48 rounded-md"
          >
            <a-select-option value="quan">Nguyễn Minh Quân</a-select-option>
          </a-select>
          <a-select
            placeholder="Chọn trạng thái"
            class="w-48 rounded-md"
          >
            <a-select-option value="issued">Đã ban hành</a-select-option>
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
            :columns="columns" 
            :data-source="disciplineList" 
            :row-selection="rowSelection"
            :pagination="false"
            row-key="id"
            class="custom-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'recordId'">
                <span class="text-[#696CFF]">{{ record.recordId }}</span>
              </template>
              <template v-else-if="column.key === 'status'">
                <span class="bg-[#E8F9DF] text-[#71DD37] px-3 py-1 rounded-sm text-xs font-medium">
                  {{ record.status }}
                </span>
              </template>
              <template v-else-if="column.key === 'action'">
                <div class="flex gap-3 text-[#22303E]">
                  <button @click="view = 'detail'" class="hover:text-blue-500 transition-colors" title="Xem chi tiết">
                    <EyeOutlined class="text-lg" />
                  </button>
                  <button class="hover:text-yellow-500 transition-colors" title="Sửa">
                    <EditOutlined class="text-lg" />
                  </button>
                  <button class="hover:text-red-500 transition-colors" title="Xóa">
                    <DeleteOutlined class="text-lg" />
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

    <!-- View: Chi tiết -->
    <template v-else>
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 mb-4">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-bold text-base text-[#394552] m-0">Chi tiết Quyết định kỷ luật</h2>
          <div class="flex gap-2 items-center">
            <a-button @click="view = 'list'" class="rounded-[6px] bg-[#EEEDF0] !text-[#384551] hover:!text-[#384551] border-none hover:bg-[#dcdbdc] transition-colors flex items-center justify-center">← Quay Lại</a-button>
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
                v-for="row in detailRows"
                :key="row.key"
                class="border-b border-[#E4E6E7] last:border-b-0"
              >
                <td class="w-[400px] px-5 py-3 font-bold text-[13px] text-[#394552] align-middle">
                  {{ row.label }}
                </td>
                <td class="px-2 py-3 text-[13px] text-[#394552] align-middle">
                  <template v-if="row.key === 'status'">
                    <span class="text-[#394552]">{{ row.value }}</span>
                  </template>
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
import { ref, computed, onMounted } from 'vue';
import { 
  SearchOutlined, 
  ReloadOutlined, 
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons-vue';
import type { Student } from '../../../../types/student';
import { getDisciplineList, getDisciplineDetail } from '../../../../services/home/api';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

const view = ref<'list' | 'detail'>('list');
const isLoading = ref(false);

const disciplineList = ref<any[]>([]);
const detailData = ref<any>({});

onMounted(async () => {
  isLoading.value = true;
  try {
    const studentId = props.student.studentId;
    const [fetchedList, fetchedDetail] = await Promise.all([
      getDisciplineList(studentId),
      getDisciplineDetail('HS001')
    ]);
    disciplineList.value = fetchedList;
    detailData.value = fetchedDetail;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu kỷ luật/khen thưởng:', error);
  } finally {
    isLoading.value = false;
  }
});

const columns = [
  { title: 'ID BIÊN BẢN', key: 'recordId' },
  { title: 'LOẠI', dataIndex: 'type', key: 'type' },
  { title: 'MẪU BIÊN BẢN', dataIndex: 'template', key: 'template' },
  { title: 'NGÀY QUYẾT ĐỊNH', dataIndex: 'decisionDate', key: 'decisionDate' },
  { title: 'LÝ DO', dataIndex: 'reason', key: 'reason' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 120 },
];

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const detailRows = computed(() => [
  { key: 'id',           label: 'ID biên bản',           value: detailData.value?.id },
  { key: 'template',     label: 'Mẫu biên bản',          value: detailData.value?.template },
  { key: 'decisionDate', label: 'Ngày quyết định',       value: detailData.value?.decisionDate },
  { key: 'decider',      label: 'Người quyết định',      value: detailData.value?.decider },
  { key: 'reason',       label: 'Lý do kỷ luật',         value: detailData.value?.reason },
  { key: 'createdAt',    label: 'Thời gian tạo',         value: detailData.value?.createdAt },
  { key: 'updatedAt',    label: 'Thời gian cập nhật',    value: detailData.value?.updatedAt },
  { key: 'status',       label: 'Trạng thái',            value: detailData.value?.status },
]);

</script>

<style scoped>
/* Tuỳ chỉnh table header và row cho giống design */
:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: transparent;
  color: #394552;
  font-weight: 700;
  font-size: 13px;
  border-bottom: 1px solid #E4E6E7;
  padding: 16px 16px;
  white-space: nowrap;
}
:deep(.custom-table .ant-table-thead > tr > th::before) {
  width: 1px !important;
  background-color: #E4E6E7 !important;
  height: 14px !important;
}
:deep(.custom-table .ant-table-tbody > tr > td) {
  border-bottom: 1px solid #E4E6E7;
  color: #394552;
  font-size: 13px;
  padding: 8px 16px;
}
:deep(.custom-table .ant-table-tbody > tr:last-child > td) {
  border-bottom: none;
}
:deep(.custom-table .ant-table-thead > tr > th:last-child),
:deep(.custom-table .ant-table-tbody > tr > td:last-child) {
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
