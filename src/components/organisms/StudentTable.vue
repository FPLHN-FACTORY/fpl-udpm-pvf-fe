<template>
  <div class="bg-white">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="paginationConfig"
      :row-selection="rowSelection"
      row-key="id"
      class="student-table"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <span class="text-[#697a8d] font-medium">{{ index + 1 }}</span>
        </template>
        
        <template v-else-if="column.key === 'studentCode'">
          <span class="text-[#566a7f] font-medium">{{ record.studentCode }}</span>
        </template>
        
        <template v-else-if="column.key === 'name'">
          <span class="text-[#566a7f]">{{ record.name }}</span>
        </template>
        
        <template v-else-if="column.key === 'createdAt'">
          <span class="text-[#697a8d]">{{ formatDate(record.createdAt) }}</span>
        </template>
        
        <template v-else-if="column.key === 'deletedAt'">
          <span class="text-[#697a8d]">{{ formatDateTime(record.deletedAt) }}</span>
        </template>
        
        <template v-else-if="column.key === 'status'">
          <BaseTag :type="getStatusType(record.status)">
            {{ getStatusText(record.status) }}
          </BaseTag>
        </template>
        
        <template v-else-if="column.key === 'actions'">
          <div class="flex items-center gap-2">
            <button 
              @click="$emit('view', record)"
              class="text-[#697a8d] hover:text-[#566a7f] transition-colors"
              title="Xem chi tiết"
            >
              <NavIcon name="BxShow" size="18" />
            </button>
            <button 
              @click="$emit('edit', record)"
              class="text-[#697a8d] hover:text-[#566a7f] transition-colors"
              title="Chỉnh sửa"
            >
              <NavIcon name="BxEdit" size="18" />
            </button>
            <button 
              @click="$emit('delete', record.id)"
              class="text-[#697a8d] hover:text-red-500 transition-colors"
              title="Xóa"
            >
              <NavIcon name="BxTrash" size="18" />
            </button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTag from '../atoms/display/BaseTag.vue'
import NavIcon from '../atoms/icons/NavIcon.vue'

interface Student {
  id: string
  studentCode: string
  name: string
  createdAt: string
  status: string
  deletedAt?: string
}

const props = defineProps<{
  dataSource: Student[]
  loading?: boolean
  total: number
  current: number
  pageSize: number
  isDeletedView?: boolean
}>()

const emit = defineEmits(['view', 'edit', 'delete', 'page-change'])

const columns = computed(() => {
  const baseColumns: any[] = [
    {
      title: '#',
      key: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: 'MÃ HỌC VIÊN',
      key: 'studentCode',
      dataIndex: 'studentCode'
    },
    {
      title: 'TÊN HỌC VIÊN',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'NGÀY TẠO',
      key: 'createdAt',
      dataIndex: 'createdAt'
    }
  ]

  if (props.isDeletedView) {
    baseColumns.push({
      title: 'NGÀY XÓA',
      key: 'deletedAt',
      dataIndex: 'deletedAt'
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

const paginationConfig = computed(() => ({
  current: props.current,
  pageSize: props.pageSize,
  total: props.total,
  showSizeChanger: false,
  showQuickJumper: false,
  showTotal: (total: number, range: number[]) => 
    `${range[0]}-${range[1]} của ${total} mục`,
  onChange: (page: number) => emit('page-change', page)
}))

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const formatDateTime = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const getStatusType = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'pending': return 'warning'
    case 'rejected': return 'error'
    default: return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Đã duyệt'
    case 'pending': return 'Chờ duyệt'
    case 'rejected': return 'Từ chối'
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

:deep(.ant-pagination) {
  margin: 16px 0 0 0 !important;
  text-align: center !important;
}

:deep(.ant-pagination-item-active) {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
}

:deep(.ant-pagination-item-active a) {
  color: white !important;
}

:deep(.ant-checkbox-wrapper) {
  margin-right: 0 !important;
}
</style>