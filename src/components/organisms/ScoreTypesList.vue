<template>
  <div class="score-types-list">
    <!-- Filters -->
    <div class="flex items-center justify-between mb-4 gap-4">
      <div class="flex items-center gap-3">
        <a-input v-model:value="searchText" placeholder="Tìm kiếm" allow-clear class="w-64">
          <template #prefix>
            <NavIcon name="BxSearch" class="text-gray-400" />
          </template>
        </a-input>

        <a-select v-model:value="statusFilter" placeholder="Trạng thái" class="w-44" allow-clear>
          <a-select-option value="">Tất cả trạng thái</a-select-option>
          <a-select-option value="active">Đang áp dụng</a-select-option>
          <a-select-option value="inactive">Ngừng áp dụng</a-select-option>
        </a-select>
      </div>

      <div class="flex items-center gap-2">
        <ButtonSearch @click="handleSearch" />
        <ButtonReset @click="handleReset" />
      </div>
    </div>

    <!-- Table -->
    <AppTable
      :columns="columns"
      :data-source="filteredData"
      :pagination="false"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record, index }">
        <!-- STT column -->
        <template v-if="column.key === 'stt'">
          <TableIndex :index="(currentPage - 1) * pageSize + index + 1" />
        </template>

        <!-- Status column -->
        <template v-else-if="column.key === 'status'">
          <BaseTag :type="record.status === 'active' ? 'success' : 'default'">
            {{ record.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng' }}
          </BaseTag>
        </template>

        <!-- Actions column -->
        <template v-else-if="column.key === 'action'">
          <TableActions :actions="getActions(record)" />
        </template>
      </template>

      <template #pagination>
        <div class="flex justify-end p-4">
          <BasePagination
            v-model:current="currentPage"
            :total="filteredData.length"
            :page-size="pageSize"
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Modal, message } from 'ant-design-vue'
import NavIcon from '../atoms/icons/NavIcon.vue'
import BaseTag from '../atoms/display/BaseTag.vue'
import TableIndex from '../atoms/display/TableIndex.vue'
import BasePagination from '../atoms/display/BasePagination.vue'
import TableActions from '../molecules/TableActions.vue'
import AppTable from './AppTable.vue'
import ButtonSearch from '../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../atoms/buttons/ButtonReset.vue'
import type { ScoreTypeRecord } from '../pages/ScoreTypesPage.vue'

// ───── Emits ─────
const emit = defineEmits<{
  view: [record: ScoreTypeRecord]
  edit: [record: ScoreTypeRecord]
}>()

// ───── State ─────
const searchText = ref<string>('')
const statusFilter = ref<string>('')
const currentPage = ref(1)
const pageSize = ref(10)

const dataSource = ref<ScoreTypeRecord[]>(
  Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Điểm thành phần ${index + 1}`,
    weight: Math.floor(Math.random() * 30) + 10,
    status: Math.random() > 0.2 ? 'active' : 'inactive',
  }))
)

// ───── Computed ─────
const filteredData = computed(() =>
  dataSource.value.filter((item) => {
    const matchName = item.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = !statusFilter.value || item.status === statusFilter.value
    return matchName && matchStatus
  })
)

// ───── Table config ─────
const columns = [
  { title: '#', key: 'stt', width: 70, align: 'center' },
  { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'name', key: 'name' },
  { title: 'TRỌNG SỐ TÍNH ĐIỂM (%)', dataIndex: 'weight', key: 'weight', align: 'center' },
  { title: 'TRẠNG THÁI', key: 'status', width: 160, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 140, align: 'center' },
]

const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[]) => {
    console.log('selectedRowKeys:', selectedRowKeys)
  },
}

const getActions = (record: ScoreTypeRecord) => [
  { 
    label: 'Xem chi tiết', 
    icon: 'BxShow', 
    onClick: () => emit('view', record) 
  },
  { 
    label: 'Chỉnh sửa', 
    icon: 'BxEdit', 
    onClick: () => emit('edit', record) 
  },
  { 
    label: 'Xóa', 
    icon: 'BxTrash', 
    danger: true, 
    onClick: () => handleDelete(record) 
  },
]

// ───── Handlers ─────
function handleSearch() {
  currentPage.value = 1
}

function handleReset() {
  searchText.value = ''
  statusFilter.value = ''
  currentPage.value = 1
}

function handleDelete(record: ScoreTypeRecord) {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: `Bạn có chắc chắn muốn xóa loại điểm "${record.name}"?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
      message.success(`Đã xóa thành công loại điểm: ${record.name}`)
    }
  })
}
</script>

<style scoped>
.score-types-list :deep(.ant-input-affix-wrapper),
.score-types-list :deep(.ant-select-selector) {
  border-radius: 8px !important;
}
</style>
