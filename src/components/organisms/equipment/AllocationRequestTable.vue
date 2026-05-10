<template>
  <div class="overflow-hidden bg-white">
    <AppTable
      :columns="activeColumns"
      :data-source="dataSource"
      :pagination="false"
      :loading="loading"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <TableIndex :index="index + 1" />
        </template>

        <template v-else-if="column.key === 'student'">
          <div>
            <div class="font-medium">{{ record.studentCode }}</div>
            <div class="text-gray-400 text-[11px]">{{ record.studentName }}</div>
          </div>
        </template>

        <template v-else-if="column.key === 'approver'">
          <div>
            <div class="font-medium">{{ record.approver }}</div>
            <div class="text-gray-400 text-[11px]">Ngày duyệt: {{ record.approvalDate }}</div>
          </div>
        </template>

        <template v-else-if="column.key === 'status'">
          <BaseTag :type="getStatusType(record.status)" class="!rounded-md !px-3">
            {{ getStatusText(record.status) }}
          </BaseTag>
        </template>

        <template v-else-if="column.key === 'actions'">
          <TableActions :actions="getActions(record)" />
        </template>
      </template>

      <template #pagination>
        <div class="flex justify-end p-4">
          <BasePagination 
            :total="total" 
            :current="current" 
            :page-size="pageSize" 
            @change="$emit('pageChange', $event)" 
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import AppTable from '@/components/organisms/AppTable.vue'

const props = defineProps<{
  dataSource: any[]
  loading?: boolean
  total: number
  current: number
  pageSize: number
  isDeletedView?: boolean
}>()

const emit = defineEmits(['edit', 'delete', 'view', 'restore', 'pageChange'])

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger' => {
  const types: Record<string, 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger'> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'default'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối'
  }
  return texts[status] || 'Không xác định'
}

const getActions = (record: any) => {
  if (props.isDeletedView) {
    return [
      { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record) },
      { label: 'Khôi phục', icon: 'BxReset', onClick: () => emit('restore', record.id) },
      { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => emit('delete', record.id) },
    ]
  }
  return [
    { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record) },
    { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => emit('edit', record) },
    { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => emit('delete', record.id) },
  ]
}

const activeColumns = computed(() => {
  const baseColumns = [
    { title: '#', key: 'index', width: '60px', align: 'center' },
    { title: 'MÃ HỌC VIÊN', key: 'student', dataIndex: 'studentCode' },
    { title: 'TÊN HỌC VIÊN YÊU CẦU', key: 'studentName', dataIndex: 'studentName' },
    { title: 'NGÀY YÊU CẦU CẤP', key: 'requestDate', dataIndex: 'requestDate' },
  ]

  if (props.isDeletedView) {
    return [
      ...baseColumns,
      { title: 'XỬ LÝ YÊU CẦU', key: 'approver', dataIndex: 'approver' },
      { title: 'NGÀY XÓA', key: 'deletedAt', dataIndex: 'deletedAt' },
      { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
    ]
  }

  return [
    ...baseColumns,
    { title: 'XỬ LÝ YÊU CẦU', key: 'approver', dataIndex: 'approver' },
    { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
    { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
  ]
})
</script>
