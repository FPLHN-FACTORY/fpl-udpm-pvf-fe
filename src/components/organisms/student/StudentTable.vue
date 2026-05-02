<template>
  <div class="bg-white rounded-md shadow-md">
    <!-- Toolbar -->
    <div class="py-4 px-5 border-b border-[#E4E6E7] flex flex-nowrap gap-4 items-center justify-between overflow-x-auto">
      <h3 class="text-lg font-bold text-[#22303E] m-0 whitespace-nowrap">Danh sách Học viên</h3>
      <div class="flex gap-2 flex-nowrap">
        <a-button type="primary" style="background-color: #8592A3; border-color: #8592A3;" @click="$emit('viewTrash')" class="flex items-center gap-[2px] text-[13px] px-2 md:px-3">
          <DeleteOutlined />
          Danh Sách Đã Xóa
        </a-button>
        <a-button type="primary" danger @click="$emit('addNew')" class="flex items-center gap-[2px] text-[13px] px-2 md:px-3">
          <PlusOutlined />
          Thêm Mới
        </a-button>
        <a-button type="primary" style="background-color: #52c41a" class="flex items-center gap-[2px] text-[13px] px-2 md:px-3">
          <ExportOutlined />
          Xuất Danh Sách
        </a-button>
        <a-button type="primary" style="background-color: #13c2c2" class="flex items-center gap-[2px] text-[13px] px-2 md:px-3">
          <ImportOutlined />
          Nhập Danh Sách
        </a-button>
      </div>
    </div>

    <!-- Search / Filter -->
    <div class="py-3 px-5 flex justify-between items-center border-b border-[#E4E6E7]">
      <a-input 
        v-model:value="searchText"
        placeholder="Tìm kiếm"
        class="w-64 rounded-md"
      >
      </a-input>
      <div class="flex gap-2">
        <a-button type="primary" style="background-color: #696CFF; border-color: #696CFF;" class="flex items-center gap-[2px] shadow-[0_2px_4px_rgba(105,108,255,0.4)] rounded-md">
          <SearchOutlined /> Tìm Kiếm
        </a-button>
        <a-button style="background-color: #8592A3; border-color: #8592A3; color: white;" class="flex items-center justify-center shadow-[0_2px_4px_rgba(133,146,163,0.4)] rounded-md">
          <ReloadOutlined />
        </a-button>
      </div>
    </div>

    <!-- Table -->
    <a-table 
      :columns="columns" 
      :data-source="paginatedData" 
      :row-selection="rowSelection"
      :pagination="false"
      row-key="id"
      class="student-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="text-blue-500 font-medium">{{ record.studentId }}</span>
        </template>
        
        <template v-else-if="column.key === 'action'">
          <div class="flex gap-3 text-[#22303E]">
            <button @click="$emit('view', record)" class="hover:text-blue-500 transition-colors" title="Xem chi tiết">
              <EyeOutlined class="text-lg" />
            </button>
            <button class="hover:text-green-500 transition-colors" title="Hồ sơ">
              <ProfileOutlined class="text-lg" />
            </button>
            <button @click="$emit('edit', record)" class="hover:text-orange-500 transition-colors" title="Chỉnh sửa">
              <EditOutlined class="text-lg" />
            </button>
            <button @click="$emit('delete', record)" class="hover:text-red-500 transition-colors" title="Xóa">
              <DeleteOutlined class="text-lg" />
            </button>
          </div>
        </template>
      </template>
    </a-table>

    <!-- Custom Pagination -->
    <div class="py-4 px-5 flex justify-end">
      <div class="flex gap-2 items-center">
        <button class="page-btn" @click="currentPage = 1" :disabled="currentPage === 1">
          <DoubleLeftOutlined class="text-xs" />
        </button>
        <button class="page-btn" @click="currentPage--" :disabled="currentPage === 1">
          <LeftOutlined class="text-xs" />
        </button>
        
        <button 
          v-for="p in displayPages" 
          :key="p" 
          class="page-btn" 
          :class="{ active: p === currentPage }" 
          @click="currentPage = p"
        >
          {{ p }}
        </button>

        <button class="page-btn" @click="currentPage++" :disabled="currentPage === totalPages">
          <RightOutlined class="text-xs" />
        </button>
        <button class="page-btn" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
          <DoubleRightOutlined class="text-xs" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  DeleteOutlined, 
  PlusOutlined, 
  ExportOutlined, 
  ImportOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  ProfileOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons-vue';
import type { Student } from '../../../types/student';

const props = defineProps<{
  students: Student[]
}>();

defineEmits(['viewTrash', 'addNew', 'view', 'edit', 'delete']);

const searchText = ref('');

const columns = [
  {
    title: 'ID HỌC VIÊN',
    dataIndex: 'studentId',
    key: 'id',
  },
  {
    title: 'TÊN HỌC VIÊN',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'NGÀY SINH',
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'ĐỊA CHỈ EMAIL',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'HÀNH ĐỘNG',
    key: 'action',
    width: 200,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: Student[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const filteredData = computed(() => {
  if (!searchText.value) return props.students;
  const lowerSearch = searchText.value.toLowerCase();
  return props.students.filter(s => 
    s.fullName.toLowerCase().includes(lowerSearch) || 
    s.studentId.toLowerCase().includes(lowerSearch) ||
    s.email.toLowerCase().includes(lowerSearch)
  );
});

// Pagination Logic
const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value) || 1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

const displayPages = computed(() => {
  const pages = [];
  const maxPages = 5; // Show max 5 page numbers
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPages / 2));
  let endPage = startPage + maxPages - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

</script>

<style scoped>
/* Tùy chỉnh Ant Table nếu cần */
:deep(.ant-table-thead > tr > th) {
  background-color: transparent;
  color: #22303E;
  font-weight: 600;
  border-bottom: 1px solid #E4E6E7;
}
:deep(.ant-table-thead > tr > th::before) {
  width: 1px !important;
  background-color: #E4E6E7 !important;
  height: 14px !important;
}
:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #E4E6E7;
  color: #22303E;
}

/* Tùy chỉnh viền và placeholder cho Input */
:deep(.ant-input) {
  border-color: #CED2D5;
}
:deep(.ant-input::placeholder) {
  color: #CED2D5;
}

/* Tùy chỉnh Checkbox */
:deep(.ant-checkbox-inner) {
  border-width: 2px;
  border-color: rgba(34, 48, 62, 0.4);
}
:deep(.ant-table-selection-column) {
  padding-left: 20px !important;
}

/* Tùy chỉnh Custom Pagination */
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

.page-btn:hover:not(:disabled):not(.active) {
  background-color: rgba(232, 25, 25, 0.1);
  color: #E81919;
}

.page-btn.active {
  background-color: #E81919;
  color: #FFFFFF;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
