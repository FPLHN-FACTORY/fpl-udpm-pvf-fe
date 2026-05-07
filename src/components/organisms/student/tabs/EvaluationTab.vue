<template>
  <div class="space-y-4">
    <!-- View: Danh sách -->
    <template v-if="view === 'list'">
      <!-- Danh sách Giai đoạn đánh giá -->
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-4">
        <div class="py-4 px-5 border-b border-[#E4E6E7] flex justify-between items-center">
          <h2 class="font-bold text-base text-[#394552] m-0">Danh sách Giai đoạn đánh giá</h2>
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
          <a-date-picker 
            placeholder="Chọn thời gian" 
            class="w-48 rounded-md"
          />
          <a-select
            placeholder="Chọn trạng thái"
            class="w-48 rounded-md"
          >
            <a-select-option value="ongoing">Đang diễn ra</a-select-option>
          </a-select>
          <a-button type="primary" style="background-color: #696CFF; border-color: #696CFF;" class="flex items-center gap-[2px] shadow-[0_2px_4px_rgba(105,108,255,0.4)] rounded-md hover:opacity-80 transition-opacity !text-white hover:!text-white ml-auto">
            <SearchOutlined /> Tìm Kiếm
          </a-button>
          <a-button style="background-color: #8592A3; border-color: #8592A3; color: white;" class="flex items-center justify-center shadow-[0_2px_4px_rgba(133,146,163,0.4)] rounded-md hover:opacity-80 transition-opacity !text-white hover:!text-white">
            <ReloadOutlined />
          </a-button>
        </div>

        <!-- Table 1 -->
        <div class="overflow-x-auto">
          <a-table 
            :columns="evaluationColumns" 
            :data-source="evaluationList" 
            :row-selection="rowSelection"
            :pagination="false"
            row-key="id"
            class="custom-table"
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

      <!-- Chi tiết Đánh giá toàn khóa -->
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div class="py-4 px-5 border-b border-[#E4E6E7] flex justify-between items-center">
          <h2 class="font-bold text-base text-[#394552] m-0">Chi tiết Đánh giá toàn khóa</h2>
          <div class="flex gap-2 items-center">
            <a-button class="rounded-[6px] bg-[#EEEDF0] !text-[#384551] hover:!text-[#384551] border-none hover:bg-[#dcdbdc] transition-colors flex items-center justify-center">← Quay Lại</a-button>
            <a-button
              class="rounded-[6px] bg-[#FFAB00] !text-white hover:!text-white border-none hover:opacity-80 transition-opacity flex items-center justify-center"
              style="box-shadow: -2px 4px 6px -1px rgba(0, 0, 0, 0.05), 2px 4px 6px -1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
            >
              Chỉnh Sửa
            </a-button>
          </div>
        </div>

        <div class="p-5">
          <div class="border border-[#E4E6E7] rounded-[6px] overflow-hidden">
            <table class="w-full">
              <tbody>
                <tr
                  v-for="row in overallRows"
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
      </div>
    </template>

    <!-- View: Chi tiết Giai đoạn đánh giá -->
    <template v-else>
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 mb-4">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-bold text-base text-[#394552] m-0">Chi tiết Giai đoạn đánh giá</h2>
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
                  {{ row.value || '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bảng chấm điểm theo tiêu chí -->
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div class="py-4 px-5 border-b border-[#E4E6E7]">
          <h2 class="font-bold text-base text-[#394552] m-0">Bảng chấm điểm theo tiêu chí</h2>
        </div>

        <div class="overflow-x-auto p-5">
          <a-table 
            :columns="criteriaColumns" 
            :data-source="criteriaList" 
            :pagination="false"
            row-key="id"
            class="custom-table criteria-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'index'">
                <span class="text-[#696CFF]">{{ record.index }}</span>
              </template>
            </template>
            <template #summary>
              <a-table-summary fixed>
                <a-table-summary-row>
                  <a-table-summary-cell :index="0" :col-span="4" class="!font-bold !text-[#394552] !text-center">Tổng điểm</a-table-summary-cell>
                  <a-table-summary-cell :index="4" class="!font-bold !text-[#394552]">7.65</a-table-summary-cell>
                </a-table-summary-row>
              </a-table-summary>
            </template>
          </a-table>
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
import { getEvaluationList, getOverallEvaluation, getEvaluationDetail, getEvaluationCriteria } from '../../../../services/home/api';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

const view = ref<'list' | 'detail'>('list');
const isLoading = ref(false);

const evaluationList = ref<any[]>([]);
const overallData = ref<any>({});
const detailData = ref<any>({});
const criteriaList = ref<any[]>([]);

onMounted(async () => {
  isLoading.value = true;
  try {
    const studentId = props.student.studentId;
    const [fetchedList, fetchedOverall, fetchedDetail, fetchedCriteria] = await Promise.all([
      getEvaluationList(studentId),
      getOverallEvaluation(studentId),
      getEvaluationDetail('1'),
      getEvaluationCriteria('1')
    ]);
    evaluationList.value = fetchedList;
    overallData.value = fetchedOverall;
    detailData.value = fetchedDetail;
    criteriaList.value = fetchedCriteria;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu đánh giá:', error);
  } finally {
    isLoading.value = false;
  }
});

const evaluationColumns = [
  { title: '#', dataIndex: 'index', key: 'index', align: 'center', width: 60 },
  { title: 'TÊN GĐ ĐÁNH GIÁ', dataIndex: 'name', key: 'name' },
  { title: 'NGƯỜI ĐÁNH GIÁ', dataIndex: 'evaluator', key: 'evaluator' },
  { title: 'TỔNG ĐIỂM', dataIndex: 'score', key: 'score' },
  { title: 'THỜI ĐIỂM KHÓA ĐÁNH GIÁ', dataIndex: 'lockedAt', key: 'lockedAt' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 120 },
];

const criteriaColumns = [
  { title: '#', dataIndex: 'index', key: 'index', align: 'center', width: 60 },
  { title: 'TIÊU CHÍ', dataIndex: 'criteria', key: 'criteria' },
  { title: 'TRỌNG SỐ', dataIndex: 'weight', key: 'weight' },
  { title: 'ĐIỂM', dataIndex: 'score', key: 'score' },
  { title: 'ĐIỂM QUY ĐỔI', dataIndex: 'convertedScore', key: 'convertedScore' },
];

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const overallRows = computed(() => [
  { key: 'id',             label: 'ID',         value: overallData.value?.id },
  { key: 'course',         label: 'Khóa',       value: overallData.value?.course },
  { key: 'totalScore',     label: 'Tổng điểm',  value: overallData.value?.totalScore },
  { key: 'avgScore',       label: 'Điểm TB',    value: overallData.value?.avgScore },
  { key: 'ranking',        label: 'Xếp hạng',   value: overallData.value?.ranking },
  { key: 'classification', label: 'Xếp loại',   value: overallData.value?.classification },
]);

const detailRows = computed(() => [
  { key: 'id',             label: 'ID',                       value: detailData.value?.id },
  { key: 'phase',          label: 'Giai đoạn',                value: detailData.value?.phase },
  { key: 'form',           label: 'Form',                     value: detailData.value?.form },
  { key: 'evaluator',      label: 'Người đánh giá',           value: detailData.value?.evaluator },
  { key: 'totalScore',     label: 'Tổng điểm (nếu có)',       value: detailData.value?.totalScore },
  { key: 'overallComment', label: 'Nhận xét tổng quan',       value: detailData.value?.overallComment },
  { key: 'lockedAt',       label: 'Thời điểm khóa đánh giá',  value: detailData.value?.lockedAt },
  { key: 'createdAt',      label: 'Thời gian tạo',            value: detailData.value?.createdAt },
  { key: 'updatedAt',      label: 'Thời gian cập nhật',       value: detailData.value?.updatedAt },
  { key: 'status',         label: 'Trạng thái',               value: detailData.value?.status },
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

/* Custom Summary Row Style for Criteria Table */
:deep(.criteria-table .ant-table-summary) {
  border-top: 1px solid #E4E6E7;
}
:deep(.criteria-table .ant-table-summary > tr > td) {
  border-bottom: none;
  background-color: transparent;
  padding: 16px 16px;
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
