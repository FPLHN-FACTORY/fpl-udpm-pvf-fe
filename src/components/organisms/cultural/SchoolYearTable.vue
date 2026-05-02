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

        <template v-else-if="column.key === 'status'">
          <BaseTag :type="record.isCurrent ? 'success' : 'default'" class="!rounded-md !px-3">
            {{ record.isCurrent ? 'Năm học hiện tại' : 'Không phải năm học hiện tại' }}
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
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import type { SchoolYear } from '@/types/school-year'

const props = defineProps<{
  dataSource: SchoolYear[]
  loading?: boolean
  total: number
  current: number
  pageSize: number
  isDeletedView?: boolean
}>()

const emit = defineEmits(['edit', 'delete', 'view', 'restore', 'pageChange'])

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: SchoolYear[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const getActions = (record: SchoolYear) => {
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
    { title: 'NĂM HỌC', key: 'name', dataIndex: 'name' },
  ]

  if (props.isDeletedView) {
    return [
      ...baseColumns,
      { title: 'NGÀY XÓA', key: 'deletedAt', dataIndex: 'deletedAt' },
      { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
    ]
  }

  return [
    ...baseColumns,
    { title: 'TRẠNG THÁI', key: 'status', dataIndex: 'status' },
    { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
  ]
})
</script>

<style scoped>
:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ef4444 !important;
  border-color: #ef4444 !important;
}
:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}
</style>
