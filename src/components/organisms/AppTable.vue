<template>
  <div class="app-table bg-white">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-selection="rowSelection"
      :row-class-name="rowClassName"
    >
      <template #bodyCell="slotProps">
        <slot name="bodyCell" v-bind="slotProps" />
      </template>
    </a-table>

    <div v-if="$slots.pagination" class="border-t border-gray-100 bg-white p-4">
      <slot name="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  columns: unknown[]
  dataSource: unknown[]
  pagination?: false | Record<string, unknown>
  rowSelection?: Record<string, unknown>
  rowClassName?: string | ((record: unknown, index: number) => string)
}>(), {
  pagination: false,
  rowSelection: undefined,
  rowClassName: 'hover:bg-gray-50 transition-colors'
})
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd !important;
  border-bottom: 1px solid #f0f2f5 !important;
  color: #566a7f !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f0f2f5 !important;
  color: #697a8d;
  font-size: 13px;
  padding: 12px 16px !important;
}

:deep(.ant-pagination-item-active) {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
}

:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
