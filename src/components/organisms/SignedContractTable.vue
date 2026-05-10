<template>
  <div class="pvf-table-container">
    <AppTable 
      :columns="columns" 
      :data-source="data" 
      :pagination="false"
      :row-selection="rowSelection"
      class="pvf-standard-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="font-medium text-[#696cff] cursor-pointer hover:underline">{{ record.id }}</span>
        </template>

        <template v-if="column.key === 'student'">
          <span class="font-bold text-[#566a7f]">{{ record.student }}</span>
        </template>

        <template v-if="column.key === 'actions'">
          <TableActions :actions="getActions(record)" />
        </template>
      </template>
    </AppTable>

    <!-- Pagination -->
    <div class="flex justify-end p-6 bg-white border-t border-gray-100">
      <BasePagination 
        v-model:current="currentPage"
        :total="total"
        :page-size="pageSize"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'

const router = useRouter()

const props = defineProps({
  data: { type: Array, default: () => [] }
})

const emit = defineEmits(['delete-item'])

const columns = [
  { title: 'ID HỢP ĐỒNG', key: 'id', dataIndex: 'id', width: 140 },
  { title: 'HỌC VIÊN', key: 'student', dataIndex: 'student' },
  { title: 'NGÀY ÁP DỤNG', key: 'startDate', dataIndex: 'startDate', width: 180 },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate', width: 180 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

// Pagination
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(props.data.length || 5)

const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Checkbox selection
const selectedRowKeys = ref<string[]>([])
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (keys: string[]) => {
    selectedRowKeys.value = keys
  }
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/student/signed-contract/detail/${record.key}`) },
  { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => router.push(`/student/signed-contract/edit/${record.key}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => handleGoToDelete(record) },
]

const handleGoToDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: `Bạn có muốn xóa hợp đồng ${record.id} không?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      emit('delete-item', record)
      message.success('Xóa thành công!')
    },
  })
}
</script>

<style scoped>
:deep(.pvf-standard-table .ant-table-thead > tr > th) {
  background-color: white !important;
  color: #566a7f !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 13px !important;
  padding: 16px 24px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-tbody > tr > td) {
  padding: 16px 24px !important;
  color: #566a7f !important;
  font-size: 13px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-row:hover > td) {
  background-color: #f8faff !important;
}

:deep(.ant-table-thead > tr > th:not(:last-child)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #d9dee3;
}
</style>
