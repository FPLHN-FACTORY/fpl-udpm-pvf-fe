<template>
    <div class="">
        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-800">Danh sách loại điểm</h2>
                <a-button type="primary" size="large" @click="handleThemMoi"
                    class="flex items-center gap-1 rounded-lg font-semibold"
                    style="background-color: #e53e3e; border-color: #e53e3e;">
                    <PlusOutlined />
                    Thêm Mới
                </a-button>
            </div>

            <!-- Search Bar -->
            <div class="flex items-center gap-3 px-6 py-4">
                <a-input v-model:value="searchText" placeholder="Tìm kiếm" class="rounded-lg" style="max-width: 260px;"
                    allow-clear>
                    <template #prefix>
                        <SearchOutlined class="text-gray-400" />
                    </template>
                </a-input>

                <a-select v-model:value="selectedTrangThai" placeholder="Trạng thái" style="width: 160px;"
                    class="rounded-lg" allow-clear :options="trangThaiOptions" />

                <div class="ml-auto flex items-center gap-2">
                    <a-button type="primary" @click="handleSearch"
                        class="flex items-center gap-1 rounded-lg font-semibold"
                        style="background-color: #6366f1; border-color: #6366f1;">
                        <SearchOutlined />
                        Tìm Kiếm
                    </a-button>
                    <a-button @click="handleResetSearch"
                        class="rounded-lg border-gray-300 text-gray-500 flex items-center">
                        <ReloadOutlined />
                    </a-button>
                </div>
            </div>

            <!-- Table -->
            <a-table :columns="columns" :data-source="pagedData" :pagination="false" :row-selection="rowSelection"
                row-key="id" class="custom-table" :scroll="{ x: 'max-content' }">
                <!-- STT -->
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'stt'">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </template>

                    <!-- Hành động -->
                    <template v-else-if="column.key === 'hanhDong'">
                        <div class="flex items-center gap-3">
                            <a-tooltip title="Xem">
                                <EyeOutlined
                                    class="text-lg text-gray-500 hover:gray-blue-500 cursor-pointer transition-colors"
                                    @click="handleView(record)" />
                            </a-tooltip>
                            <a-tooltip title="Sửa">
                                <EditOutlined
                                    class="text-lg text-gray-500 hover:text-gray-500 cursor-pointer transition-colors"
                                    @click="handleEdit(record)" />
                            </a-tooltip>
                            <a-tooltip title="Xoá">
                                <DeleteOutlined
                                    class="text-lg text-gray-500 hover:text-gray-500 cursor-pointer transition-colors"
                                    @click="handleDelete(record)" />
                            </a-tooltip>
                        </div>
                    </template>
                </template>
            </a-table>

            <!-- Pagination -->
            <div class="flex justify-end px-6 py-4">
                <a-pagination v-model:current="currentPage" :total="filteredData.length" :page-size="pageSize"
                    show-less-items :item-render="paginationRender" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
    PlusOutlined,
    SearchOutlined,
    ReloadOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'

interface LoaiDiem {
    id: number
    tenLoaiDiem: string
    trongSo: number
    ngayXoa: string
    trangThai: 'active' | 'inactive'
}

// ── State ──────────────────────────────────────────────
const searchText = ref('')
const selectedTrangThai = ref<string | undefined>(undefined)
const currentPage = ref(1)
const pageSize = ref(10)

const trangThaiOptions = [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'inactive' },
]

// ── Mock data ──────────────────────────────────────────
const allData = ref<LoaiDiem[]>([
    { id: 1, tenLoaiDiem: 'Điểm chuyên cần', trongSo: 20, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 2, tenLoaiDiem: 'Điểm tham gia hoạt động', trongSo: 15, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 3, tenLoaiDiem: 'Điểm bài tập thực hành', trongSo: 25, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 4, tenLoaiDiem: 'Điểm đánh giá kỹ năng', trongSo: 30, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 5, tenLoaiDiem: 'Điểm kiểm tra cuối khoá', trongSo: 10, ngayXoa: '2025-03-02 7:20', trangThai: 'inactive' },
    { id: 6, tenLoaiDiem: 'Điểm rèn luyện', trongSo: 20, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 7, tenLoaiDiem: 'Điểm thi học kỳ', trongSo: 40, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 8, tenLoaiDiem: 'Điểm thực tập', trongSo: 35, ngayXoa: '2025-03-02 7:20', trangThai: 'inactive' },
    { id: 9, tenLoaiDiem: 'Điểm đồ án', trongSo: 50, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 10, tenLoaiDiem: 'Điểm tiểu luận', trongSo: 25, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 11, tenLoaiDiem: 'Điểm seminar', trongSo: 15, ngayXoa: '2025-03-02 7:20', trangThai: 'active' },
    { id: 12, tenLoaiDiem: 'Điểm kiểm tra giữa kỳ', trongSo: 30, ngayXoa: '2025-03-02 7:20', trangThai: 'inactive' },
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
const columns: TableColumnsType = [
    { title: 'STT', key: 'stt', width: 70 },
    { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'tenLoaiDiem', key: 'tenLoaiDiem', width: 260 },
    { title: 'TRỌNG SỐ TÍNH ĐIỂM (%)', dataIndex: 'trongSo', key: 'trongSo', width: 220 },
    { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 200 },
    { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 130 },
]

// ── Row selection ──────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => { selectedRowKeys.value = keys },
}

// ── Pagination custom render ───────────────────────────
const paginationRender = ({ type, originalElement }: { type: string; originalElement: any }) => {
    if (type === 'prev') return h(LeftOutlined)
    if (type === 'next') return h(RightOutlined)
    if (type === 'jump-prev') return h(DoubleLeftOutlined)
    if (type === 'jump-next') return h(DoubleRightOutlined)
    return originalElement
}

// ── Actions ────────────────────────────────────────────
const handleThemMoi = () => { message.info('Chuyển đến trang Thêm Mới') }
const handleSearch = () => { currentPage.value = 1 }
const handleResetSearch = () => {
    searchText.value = ''
    selectedTrangThai.value = undefined
    currentPage.value = 1
}

const handleView = (record: LoaiDiem) => message.info(`Xem: ${record.tenLoaiDiem}`)
const handleEdit = (record: LoaiDiem) => message.info(`Sửa: ${record.tenLoaiDiem}`)
const handleDelete = (record: LoaiDiem) => {
    Modal.confirm({
        title: 'Xác nhận xoá',
        content: `Bạn có chắc muốn xoá "${record.tenLoaiDiem}"?`,
        okText: 'Xoá',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk() {
            allData.value = allData.value.filter((i) => i.id !== record.id)
            message.success('Đã xoá thành công!')
        },
    })
}
</script>

<style scoped>
/* Table header uppercase & gray bg */
:deep(.ant-table-thead > tr > th) {
    background-color: #f9fafb !important;
    color: #6b7280 !important;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb !important;
}

:deep(.ant-table-tbody > tr > td) {
    border-bottom: 1px solid #f3f4f6 !important;
    color: #374151;
    font-size: 0.9rem;
}

:deep(.ant-table-tbody > tr:hover > td) {
    background-color: #fef2f2 !important;
}

/* Pagination active page = red */
:deep(.ant-pagination-item-active) {
    background-color: #e53e3e !important;
    border-color: #e53e3e !important;
}

:deep(.ant-pagination-item-active a) {
    color: #fff !important;
}

/* Disabled page (faded) */
:deep(.ant-pagination-item:not(.ant-pagination-item-active) a) {
    color: #6b7280;
}

/* Search input */
:deep(.ant-input-affix-wrapper) {
    border-radius: 0.5rem !important;
    border-color: #d1d5db !important;
}

/* Select */
:deep(.ant-select-selector) {
    border-radius: 0.5rem !important;
    border-color: #d1d5db !important;
}
</style>