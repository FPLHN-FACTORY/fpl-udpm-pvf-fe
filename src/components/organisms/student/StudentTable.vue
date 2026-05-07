<template>
  <div class="overflow-hidden bg-white">
    <AppTable
      :columns="activeColumns"
      :data-source="paginatedData"
      :pagination="false"
      :loading="loading"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <TableIndex :index="(currentPage - 1) * pageSize + index + 1" />
        </template>

        <template v-else-if="column.key === 'studentId'">
          <span class="text-blue-500 font-medium">{{ record.studentId }}</span>
        </template>

        <template v-else-if="column.key === 'actions'">
          <TableActions :actions="getActions(record)" />
        </template>
      </template>

      <template #pagination>
        <div class="flex justify-end p-3">
          <BasePagination 
            :total="students.length" 
            :current="currentPage" 
            :page-size="pageSize" 
            @change="currentPage = $event" 
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TableIndex from '@/components/atoms/display/TableIndex.vue';
import BasePagination from '@/components/atoms/display/BasePagination.vue';
import TableActions from '@/components/molecules/TableActions.vue';
import AppTable from '@/components/organisms/AppTable.vue';
import type { Student } from '@/types/student';

const props = defineProps<{
  students: Student[];
  loading?: boolean;
  isTrash?: boolean;
}>();

const emit = defineEmits(['view', 'edit', 'delete', 'restore', 'hard-delete']);

// Pagination Logic
const currentPage = ref(1);
const pageSize = ref(10);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.students.slice(start, end);
});

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: Student[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const getActions = (record: Student) => {
  if (props.isTrash) {
    return [
      { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record) },
      { label: 'Khôi phục', icon: 'BxReset', onClick: () => emit('restore', record) },
      { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => emit('hard-delete', record) },
    ];
  }
  return [
    { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record) },
    { label: 'Sổ học bạ', icon: 'BxBookOpen', onClick: () => console.log('Sổ học bạ', record) },
    { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => emit('edit', record) },
    { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => emit('delete', record) },
  ];
};

const activeColumns = computed(() => {
  const baseColumns = [
    { title: 'ID HỌC VIÊN', key: 'studentId', dataIndex: 'studentId' },
    { title: 'TÊN HỌC VIÊN', key: 'fullName', dataIndex: 'fullName' },
  ];

  if (props.isTrash) {
    return [
      ...baseColumns,
      { title: 'NGÀY XÓA', key: 'deletedAt', dataIndex: 'deletedAt' },
      { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
    ];
  }

  return [
    ...baseColumns,
    { title: 'NGÀY SINH', key: 'dob', dataIndex: 'dob' },
    { title: 'ĐỊA CHỈ EMAIL', key: 'email', dataIndex: 'email' },
    { title: 'HÀNH ĐỘNG', key: 'actions', width: '200px', align: 'center' },
  ];
});
</script>
