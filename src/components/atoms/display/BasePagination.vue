<template>
  <div class="custom-pagination flex items-center gap-2">
    <!-- First Page -->
    <button 
      class="pagination-btn" 
      :disabled="current <= 1"
      @click="$emit('change', 1)"
    >
      <NavIcon name="BxChevronsLeft" size="16" />
    </button>
    
    <!-- Ant Design Pagination -->
    <a-pagination
      :current="current"
      :total="total"
      :page-size="pageSize"
      :show-less-items="true"
      @change="$emit('change', $event)"
      :item-render="itemRender"
    />
    
    <!-- Last Page -->
    <button 
      class="pagination-btn" 
      :disabled="current >= Math.ceil(total / (pageSize || 10))"
      @click="$emit('change', Math.ceil(total / (pageSize || 10)))"
    >
      <NavIcon name="BxChevronsRight" size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import NavIcon from '../icons/NavIcon.vue'

defineProps<{
  current: number
  total: number
  pageSize: number
}>()

defineEmits(['change'])

const itemRender = ({ type, originalElement }: any) => {
  if (type === 'prev') {
    return h('a', { class: 'flex items-center justify-center h-full w-full' }, [
      h(NavIcon, { name: 'BxChevronLeft', size: '16' })
    ])
  }
  if (type === 'next') {
    return h('a', { class: 'flex items-center justify-center h-full w-full' }, [
      h(NavIcon, { name: 'BxChevronRight', size: '16' })
    ])
  }
  return originalElement
}
</script>

<style scoped>
.custom-pagination :deep(.ant-pagination) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-pagination :deep(.ant-pagination-prev),
.custom-pagination :deep(.ant-pagination-next),
.custom-pagination :deep(.ant-pagination-item),
.custom-pagination :deep(.ant-pagination-jump-prev),
.custom-pagination :deep(.ant-pagination-jump-next) {
  margin: 0;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f9;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f9;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #566a7f;
  transition: all 0.3s;
}

.pagination-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover,
.custom-pagination :deep(.ant-pagination-item:not(.ant-pagination-item-active):hover),
.custom-pagination :deep(.ant-pagination-prev:hover),
.custom-pagination :deep(.ant-pagination-next:hover) {
  background-color: #eceef5 !important;
}

:deep(.ant-pagination-item-active) {
  background-color: #ff1f1f !important;
  border-color: #ff1f1f !important;
  box-shadow: 0 6px 12px rgba(255, 31, 31, 0.22);
}

:deep(.ant-pagination-item-active a) {
  color: white !important;
}

:deep(.ant-pagination-item a),
:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link) {
  color: #566a7f !important;
}

:deep(.ant-pagination-disabled) {
  opacity: 0.45;
}

:deep(.ant-pagination-item-link) {
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  border: none !important;
}
</style>
