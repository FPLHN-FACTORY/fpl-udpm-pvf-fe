<template>
  <div class="score-types-deleted">
    <!-- Filters -->
    <div class="flex items-center justify-between mb-4 gap-4">
      <div class="flex items-center gap-3">
        <a-input v-model:value="searchText" placeholder="Tìm kiếm" allow-clear class="w-64">
          <template #prefix>
            <NavIcon name="BxSearch" class="text-gray-400" />
          </template>
        </a-input>

        <a-select v-model:value="selectedTrangThai" placeholder="Trạng thái" class="w-44" allow-clear>
          <a-select-option value="">Tất cả trạng thái</a-select-option>
          <a-select-option value="active">Hoạt động</a-select-option>
          <a-select-option value="inactive">Không hoạt động</a-select-option>
        </a-select>
      </div>

      <div class="flex items-center gap-2">
        <ButtonSearch @click="handleSearch" />
        <ButtonReset @click="handleResetSearch" />
      </div>
    </div>

    <!-- Table -->
    <AppTable
      :columns="columns"
      :data-source="pagedData"
      :pagination="false"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record, index }">
        <!-- STT -->
        <template v-if="column.key === 'stt'">
          <TableIndex :index="(currentPage - 1) * pageSize + index + 1" />
        </template>

        <!-- Hành động -->
        <template v-else-if="column.key === 'hanhDong'">
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
import TableIndex from '../atoms/display/TableIndex.vue'
import BasePagination from '../atoms/display/BasePagination.vue'
import TableActions from '../molecules/TableActions.vue'
import AppTable from './AppTable.vue'
import ButtonSearch from '../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../atoms/buttons/ButtonReset.vue'

interface LoaiDiem {
  id: number
  tenLoaiDiem: string
  trongSo: number
  ngayXoa: string
  trangThai: 'active' | 'inactive'
}

const emit = defineEmits(['restored', 'view'])

// ── State ──────────────────────────────────────────────
const searchText = ref('')
const selectedTrangThai = ref<string | undefined>(undefined)
const currentPage = ref(1)
const pageSize = ref(10)

// ── Mock data ──────────────────────────────────────────
const allData = ref<LoaiDiem[]>([
  { id: 1, tenLoaiDiem: 'Điểm chuyên cần', trongSo: 20, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
  { id: 2, tenLoaiDiem: 'Điểm tham gia hoạt động', trongSo: 15, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
  { id: 3, tenLoaiDiem: 'Điểm bài tập thực hành', trongSo: 25, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
  { id: 4, tenLoaiDiem: 'Điểm đánh giá kỹ năng', trongSo: 30, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
  { id: 5, tenLoaiDiem: 'Điểm kiểm tra cuối khoá', trongSo: 10, ngayXoa: '2025-03-02 7:20', trangThai: 'inactive' },
])

// ── Computed ───────────────────────────────────────────
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchText = searchText.value
      ? item.tenLoaiDiem.toLowerCase().includes(searchText.value.toLowerCase())
      : true
    const matchStatus = selectedTrangThai.value
      ? item.trangThai === selectedTrangThai.value
      : true
    return matchText && matchStatus
  })
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

// ── Columns ────────────────────────────────────────────
const columns = [
  { title: '#', key: 'stt', width: 70, align: 'center' },
  { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'tenLoaiDiem', key: 'tenLoaiDiem' },
  { title: 'TRỌNG SỐ TÍNH ĐIỂM (%)', dataIndex: 'trongSo', key: 'trongSo', align: 'center' },
  { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 200 },
  { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 130, align: 'center' },
]

// ── Row selection ──────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
  selectedRowKeys,
  onChange: (keys: number[]) => { selectedRowKeys.value = keys },
}

// ── Actions ────────────────────────────────────────────
const getActions = (record: LoaiDiem) => [
  { 
    label: 'Xem chi tiết', 
    icon: 'BxShow', 
    onClick: () => emit('view', record) 
  },
  { 
    label: 'Khôi phục', 
    icon: 'BxReset', 
    onClick: () => handleRestore(record) 
  },
  { 
    label: 'Xóa vĩnh viễn', 
    icon: 'BxTrash', 
    danger: true, 
    onClick: () => handleDeletePermanent(record) 
  },
]

const handleSearch = () => { currentPage.value = 1 }
const handleResetSearch = () => {
  searchText.value = ''
  selectedTrangThai.value = undefined
  currentPage.value = 1
}

const handleRestore = (record: LoaiDiem) => {
  Modal.confirm({
    title: 'Xác nhận khôi phục',
    content: `Bạn có chắc muốn khôi phục "${record.tenLoaiDiem}" về danh sách?`,
    okText: 'Khôi phục',
    onOk() {
      allData.value = allData.value.filter((i) => i.id !== record.id)
      emit('restored', record)
      message.success('Khôi phục thành công!')
    },
  })
}

const handleDeletePermanent = (record: LoaiDiem) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn',
    content: `Hành động này không thể hoàn tác. Bạn có chắc muốn xóa vĩnh viễn "${record.tenLoaiDiem}"?`,
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      allData.value = allData.value.filter((i) => i.id !== record.id)
      message.success('Đã xóa vĩnh viễn thành công!')
    },
  })
}
</script>

<style scoped>
.score-types-deleted :deep(.ant-input-affix-wrapper),
.score-types-deleted :deep(.ant-select-selector) {
  border-radius: 8px !important;
}
</style>
