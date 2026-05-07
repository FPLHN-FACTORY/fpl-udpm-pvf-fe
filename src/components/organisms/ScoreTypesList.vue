<template>
    <div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Danh sách loại điểm</h2>
                <div class="flex items-center gap-2">
                    <a-button type="primary" dashed @click="handleDeletedList" class="flex items-center gap-2 bg-[#8592a3] hover:!bg-[#7a8798]/70 text-white">
                        <template #icon>
                            <DeleteOutlined />
                        </template>
                        Danh sách đã xóa
                    </a-button>
                    <a-button type="primary" danger @click="handleAdd" class="flex items-center gap-2">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        Thêm Mới
                    </a-button>
                </div>
            </div>

            <!-- Filters -->
            <div class="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <div class="flex items-center gap-3">
                    <a-input v-model:value="searchText" placeholder="Tìm kiếm" allow-clear class="w-52">
                        <template #prefix>
                            <SearchOutlined class="text-gray-400" />
                        </template>
                    </a-input>

                    <a-select v-model:value="statusFilter" placeholder="Trạng thái" class="w-40" allow-clear>
                        <a-select-option value="">Tất cả</a-select-option>
                        <a-select-option value="active">Đang áp dụng</a-select-option>
                        <a-select-option value="inactive">Ngừng áp dụng</a-select-option>
                    </a-select>
                </div>

                <div class="flex items-center gap-2">
                    <a-button type="primary" @click="handleSearch" class="flex items-center gap-2">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Tìm Kiếm
                    </a-button>
                    <a-button @click="handleReset" class=" flex items-center justify-center bg-[#8592a3] hover:!bg-[#7a8798]/70 text-white">
                        <template #icon>
                            <ReloadOutlined />
                        </template>
                    </a-button>
                </div>
            </div>

            <!-- Table -->
            <a-table
                :columns="columns"
                :data-source="filteredData"
                :pagination="paginationConfig"
                :row-selection="rowSelection"
                row-key="id"
                class="score-table"
                :scroll="{ x: 700 }"
            >
                <template #bodyCell="{ column, record, index }">
                    <!-- STT column -->
                    <template v-if="column.key === 'stt'">
                        <span class="text-gray-600">{{ index + 1 }}</span>
                    </template>

                    <!-- Status column -->
                    <template v-else-if="column.key === 'status'">
                        <a-tag
                            :color="record.status === 'active' ? 'green' : 'default'"
                        >
                            {{ record.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng' }}
                        </a-tag>
                    </template>

                    <!-- Actions column -->
                    <template v-else-if="column.key === 'action'">
                        <div class="flex items-center gap-2">
                            <a-tooltip title="Xem chi tiết">
                                <a-button
                                    type="text"
                                    size="small"
                                    class="text-[#22303EB2] hover:text-gray-600 hover:bg-gray-50"
                                    @click="handleView(record)"
                                >
                                    <template #icon><EyeOutlined /></template>
                                </a-button>
                            </a-tooltip>

                            <a-tooltip title="Chỉnh sửa">
                                <a-button
                                    type="text"
                                    size="small"
                                    class="text-[#22303EB2] hover:text-gray-600 hover:bg-gray-50"
                                    @click="handleEdit(record)"
                                >
                                    <template #icon><EditOutlined /></template>
                                </a-button>
                            </a-tooltip>

                            <a-tooltip title="Xóa">
                                <a-popconfirm
                                    title="Bạn có chắc muốn xóa?"
                                    ok-text="Xóa"
                                    cancel-text="Hủy"
                                    @confirm="handleDelete(record)"
                                >
                                    <a-button
                                        type="text"
                                        size="small"
                                        class="text-[#22303EB2] hover:text-gray-600 hover:bg-gray-50"
                                    >
                                        <template #icon><DeleteOutlined /></template>
                                    </a-button>
                                </a-popconfirm>
                            </a-tooltip>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    PlusOutlined,
    SearchOutlined,
    ReloadOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons-vue'
import type { TableColumnsType, TableProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import type { ScoreTypeRecord } from '../pages/ScoreTypesPage.vue';

// ───── Types ─────

// ───── Emits — khớp với currentListeners trong ScoreTypesPage ─────
const emit = defineEmits<{
    add:  []                   // handleAdd   → navigateTo('create')
    view: [record: ScoreTypeRecord]  // handleView  → handleView(record) → navigateTo('detail')
    edit: [record: ScoreTypeRecord]  // handleEdit  → handleEditFromList(record) → navigateTo('edit')
    deleted: []                      // handleDeletedList → navigateTo('deleted')
}>()

// ───── State ─────
const searchText   = ref<string>('')
const statusFilter = ref<string>('')

const dataSource = ref<ScoreTypeRecord[]>(
    Array.from({ length: 5 }, (_, index) => ({
        id:     index + 1,
        name:   `Điểm thành phần ${index + 1}`,
        weight: Math.floor(Math.random() * 30) + 10,
        status: 'active',
    }))
)

// ───── Computed ─────
const filteredData = computed(() =>
    dataSource.value.filter((item) => {
        const matchName   = item.name.toLowerCase().includes(searchText.value.toLowerCase())
        const matchStatus = !statusFilter.value || item.status === statusFilter.value
        return matchName && matchStatus
    })
)

// ───── Table config ─────
const columns: TableColumnsType<ScoreTypeRecord> = [
    { title: 'STT',                    key: 'stt',    width: 70,  align: 'center' },
    { title: 'TÊN LOẠI ĐIỂM',         dataIndex: 'name',   key: 'name',   width: 250 },
    { title: 'TRỌNG SỐ TÍNH ĐIỂM (%)', dataIndex: 'weight', key: 'weight', ellipsis: true, align: 'left' },
    { title: 'TRẠNG THÁI',            key: 'status', width: 160, align: 'center' },
    { title: 'HÀNH ĐỘNG',             key: 'action', width: 140, align: 'center', fixed: 'right' },
]

const paginationConfig: TableProps['pagination'] = {
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
}

const rowSelection: TableProps['rowSelection'] = {
    type: 'checkbox',
    onChange: (selectedRowKeys: (string | number)[]) => {
        console.log('selectedRowKeys:', selectedRowKeys)
    },
}

// ───── Handlers ─────
function handleSearch() {
    message.success('Đã tìm kiếm')
}

function handleReset() {
    searchText.value   = ''
    statusFilter.value = ''
}

// ── Emit lên ScoreTypesPage ──
function handleAdd() {
    emit('add')                  // → navigateTo('create')
}

function handleView(record: ScoreTypeRecord) {
    emit('view', record)         // → handleView(record) → navigateTo('detail')
}

function handleEdit(record: ScoreTypeRecord) {
    emit('edit', record)         // → handleEditFromList(record) → navigateTo('edit')
}

function handleDeletedList() {
    emit('deleted')              // → navigateTo('deleted')
}

// ── Xử lý nội bộ (không cần emit lên cha) ──
function handleDelete(record: ScoreTypeRecord) {
    dataSource.value = dataSource.value.filter((item) => item.id !== record.id)
    message.success(`Đã xóa: ${record.name}`)
}

</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
    @apply bg-gray-50 text-xs font-semibold text-gray-500 tracking-wide uppercase;
}
:deep(.ant-table-tbody > tr > td) {
    @apply text-sm text-gray-700;
}
:deep(.ant-table-tbody > tr:hover > td) {
    @apply bg-blue-50/40;
}
:deep(.ant-pagination-item-active) {
    @apply border-red-500 bg-red-500;
}
:deep(.ant-pagination-item-active a) {
    @apply text-white;
}
:deep(.ant-pagination-item-active:hover) {
    @apply border-red-400;
}
:deep(.ant-input-affix-wrapper) {
    @apply rounded-lg;
}
:deep(.ant-select-selector) {
    @apply rounded-lg !important;
}
:deep(.ant-tag-success) {
    @apply bg-green-100 text-green-700 border-green-200 text-xs font-medium px-3 py-0.5 rounded-full;
}
</style>