<template>
  <div class="overflow-hidden bg-white">
    <AppTable
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :loading="loading"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <TableIndex :index="index + 1 + (current - 1) * pageSize" />
        </template>

        <template v-else-if="column.key === 'status'">
          <BaseTag :type="record.status === 'ACTIVE' ? 'success' : 'default'">
            {{ record.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
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
import type { MasterCriteriaListItem } from '@/services/recruitment/masterCriteria'

const props = defineProps<{
  dataSource: MasterCriteriaListItem[]
  loading?: boolean
  total: number
  current: number
  pageSize: number
  isDeletedView?: boolean
}>()

const emit = defineEmits(['edit', 'delete', 'view', 'restore', 'pageChange'])

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: MasterCriteriaListItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const getActions = (record: MasterCriteriaListItem) => {
  if (props.isDeletedView) {
    return [
      { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record.id) },
      { label: 'Khôi phục', icon: 'BxReset', onClick: () => emit('restore', record.id) },
      { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => emit('delete', record.id) },
    ]
  }
  return [
    { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => emit('view', record.id) },
    { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => emit('edit', record.id) },
    { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => emit('delete', record.id) },
  ]
}

const columns = computed(() => {
  const base = [
    { title: '#', key: 'index', width: '60px', align: 'center' },
    { title: 'TÊN BỘ TIÊU CHÍ', key: 'name', dataIndex: 'name' },
    { title: 'MÔ TẢ BỘ TIÊU CHÍ', key: 'description', dataIndex: 'description' },
  ]

  if (props.isDeletedView) {
    return [
      ...base,
      { title: 'NGÀY XÓA', key: 'deletedAt', dataIndex: 'deletedAt', align: 'center' },
      { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
    ]
  }

  return [
    ...base,
    { title: 'TRẠNG THÁI', key: 'status', width: '150px', align: 'center' },
    { title: 'HÀNH ĐỘNG', key: 'actions', width: '150px', align: 'center' },
  ]
})
</script>
