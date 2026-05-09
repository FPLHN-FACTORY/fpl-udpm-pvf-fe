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
              v-if="isDeletedView"
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

const emit = defineEmits(['view', 'edit', 'delete', 'restore', 'page-change'])

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

:deep(.ant-checkbox-wrapper) {
  margin-right: 0 !important;
}
</style>