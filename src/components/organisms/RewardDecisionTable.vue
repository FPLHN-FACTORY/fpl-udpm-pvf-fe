<template>
  <div class="bg-white">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="false"
      :row-selection="rowSelection"
      row-key="id"
      class="student-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'recordId'">
          <span class="text-[#696cff] font-medium cursor-pointer">{{ record.recordId }}</span>
        </template>
        
        <template v-else-if="column.key === 'studentName'">
          <span class="text-[#566a7f]">{{ record.studentName }}</span>
        </template>

        <template v-else-if="column.key === 'templateName'">
          <span class="text-[#566a7f]">{{ record.templateName }}</span>
        </template>
        
        <template v-else-if="column.key === 'decisionDate'">
          <span class="text-[#697a8d]">{{ record.decisionDate }}</span>
        </template>

        <template v-else-if="column.key === 'decider'">
          <span class="text-[#697a8d]">{{ record.decider }}</span>
        </template>
        
        <template v-else-if="column.key === 'status'">
          <BaseTag :type="getStatusType(record.status)">
            {{ getStatusText(record.status) }}
          </BaseTag>
        </template>

        <template v-else-if="column.key === 'deletedAt'">
          <span class="text-[#697a8d]">{{ record.deletedAt }}</span>
        </template>
        
        <template v-else-if="column.key === 'actions'">
          <div class="flex items-center justify-center gap-2">
            <button 
              @click="$emit('view', record)"
              class="text-[#697a8d] hover:text-blue-500 transition-colors"
              title="Xem chi tiết"
            >
              <NavIcon name="BxShow" size="18" />
            </button>
            <button 
              v-if="!isDeletedView"
              @click="$emit('edit', record)"
              class="text-[#697a8d] hover:text-green-500 transition-colors"
              title="Chỉnh sửa"
            >
              <NavIcon name="BxEdit" size="18" />
            </button>
            <button 
              v-else
              @click="$emit('restore', record.id)"
              class="text-[#697a8d] hover:text-green-500 transition-colors"
              title="Khôi phục"
            >
              <NavIcon name="BxReset" size="18" />
            </button>
            <button 
              @click="$emit('delete', record.id)"
              class="text-[#697a8d] hover:text-red-500 transition-colors"
              :title="isDeletedView ? 'Xóa vĩnh viễn' : 'Xóa'"
            >
              <NavIcon name="BxTrash" size="18" />
            </button>
          </div>
        </template>
      </template>
    </a-table>

    <!-- Custom Pagination -->
    <div class="flex justify-end mt-4">
      <BasePagination 
        :total="total" 
        :current="current" 
        :page-size="pageSize" 
        @change="(p) => $emit('page-change', p)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTag from '../atoms/display/BaseTag.vue'
import BasePagination from '../atoms/display/BasePagination.vue'
import NavIcon from '../atoms/icons/NavIcon.vue'

interface RewardDecision {
  id: string
  recordId: string
  studentName: string
  templateName: string
  decisionDate: string
  decider: string
  status: string
  deletedAt?: string
}

const props = defineProps<{
  dataSource: RewardDecision[]
  loading?: boolean
  total: number
  current: number
  pageSize: number
  isDeletedView?: boolean
}>()

const emit = defineEmits(['view', 'edit', 'delete', 'restore', 'page-change'])

const columns = computed(() => {
  const baseColumns: any[] = [
    {
      title: 'ID BIÊN BẢN',
      key: 'recordId',
      dataIndex: 'recordId'
    },
    {
      title: 'HỌC VIÊN',
      key: 'studentName',
      dataIndex: 'studentName'
    },
    {
      title: 'MẪU BIÊN BẢN',
      key: 'templateName',
      dataIndex: 'templateName'
    },
    {
      title: 'NGÀY QUYẾT ĐỊNH',
      key: 'decisionDate',
      dataIndex: 'decisionDate',
      align: 'center'
    },
    {
      title: 'NGƯỜI QUYẾT ĐỊNH',
      key: 'decider',
      dataIndex: 'decider'
    }
  ]

  if (props.isDeletedView) {
    baseColumns.push({
      title: 'NGÀY XÓA',
      key: 'deletedAt',
      dataIndex: 'deletedAt',
      align: 'center'
    })
  } else {
    baseColumns.push({
      title: 'TRẠNG THÁI',
      key: 'status',
      dataIndex: 'status',
      align: 'center'
    })
  }

  baseColumns.push({
    title: 'HÀNH ĐỘNG',
    key: 'actions',
    width: 120,
    align: 'center'
  })

  return baseColumns
})

const rowSelection = {
  type: 'checkbox',
  onChange: (selectedRowKeys: string[]) => {
    console.log('Selected:', selectedRowKeys)
  }
}

const getStatusType = (status: string) => {
  switch (status) {
    case 'published': return 'success'
    case 'draft': return 'warning'
    case 'cancelled': return 'error'
    default: return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'published': return 'Đã ban hành'
    case 'draft': return 'Nháp'
    case 'cancelled': return 'Đã hủy'
    default: return 'Không xác định'
  }
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd !important;
  border-bottom: 1px solid #f0f2f5 !important;
  color: #566a7f !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  padding: 12px 16px !important;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f0f2f5 !important;
  color: #697a8d;
  font-size: 13px;
  padding: 12px 16px !important;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f8fafc !important;
}

:deep(.ant-checkbox-wrapper) {
  margin-right: 0 !important;
}
</style>
