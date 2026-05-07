<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800 tracking-tight">Danh sách Hồ sơ thí sinh đã xóa</h1>
                <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                    <template #icon><arrow-left-outlined /></template>
                    Quay Lại
                </a-button>
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                <a-input v-model:value="searchText" placeholder="Tìm kiếm" class="!w-64" allow-clear />
                <a-select v-model:value="selectedKy" placeholder="Chọn kỳ tuyển sinh" class="!w-52" allow-clear>
                    <a-select-option value="2025">Tuyển sinh PVF 2025</a-select-option>
                    <a-select-option value="2024">Tuyển sinh PVF 2024</a-select-option>
                    <a-select-option value="2023">Tuyển sinh PVF 2023</a-select-option>
                </a-select>
                <div class="flex-1" />
                <a-button type="primary" class="!bg-blue-600 hover:!bg-blue-700 flex items-center gap-1"
                    @click="handleSearch">
                    <template #icon><search-outlined /></template>
                    Tìm Kiếm
                </a-button>
                <a-button class="!border-gray-300 !text-gray-500" @click="handleResetFilter">
                    <template #icon><reload-outlined /></template>
                </a-button>
            </div>

            <!-- Table -->
            <a-table :columns="columns" :data-source="pagedData" :pagination="false" :row-selection="rowSelection"
                row-key="id" class="deleted-hs-table">
                <template #bodyCell="{ column, record }">
                    <!-- ID HỒ SƠ -->
                    <template v-if="column.key === 'idHoSo'">
                        <a class="text-blue-500 hover:text-blue-700 font-medium">{{ record.idHoSo }}</a>
                    </template>

                    <!-- NGÀY XÓA -->
                    <template v-else-if="column.key === 'ngayXoa'">
                        <span class="text-gray-600">{{ record.ngayXoa }}</span>
                    </template>

                    <!-- HÀNH ĐỘNG -->
                    <template v-else-if="column.key === 'hanhDong'">
                        <div class="flex items-center gap-3">
                            <a-tooltip title="Xem chi tiết">
                                <eye-outlined
                                    class="text-gray-500 hover:text-blue-500 cursor-pointer text-base transition-colors"
                                    @click="handleView(record)" />
                            </a-tooltip>
                            <a-tooltip title="Khôi phục">
                                <a-popconfirm title="Bạn có muốn khôi phục hồ sơ này?" ok-text="Khôi phục"
                                    cancel-text="Hủy" @confirm="handleRestore(record)">
                                    <undo-outlined
                                        class="text-gray-500 hover:text-green-500 cursor-pointer text-base transition-colors" />
                                </a-popconfirm>
                            </a-tooltip>
                            <a-tooltip title="Xóa vĩnh viễn">
                                <a-popconfirm title="Xóa vĩnh viễn? Hành động này không thể hoàn tác." ok-text="Xóa"
                                    cancel-text="Hủy" ok-type="danger" @confirm="handleDeletePermanent(record)">
                                    <delete-outlined
                                        class="text-gray-500 hover:text-red-500 cursor-pointer text-base transition-colors" />
                                </a-popconfirm>
                            </a-tooltip>
                        </div>
                    </template>
                </template>
            </a-table>

            <!-- Pagination -->
            <div class="flex justify-end py-5 border-t border-gray-100">
                <a-pagination v-model:current="currentPage" :total="totalItems" :page-size="pageSize" show-less-items
                    :item-render="itemRender" :show-size-changer="false" />
            </div>

        </div>
    </div>
    </AdminPage>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
    ArrowLeftOutlined,
    SearchOutlined,
    ReloadOutlined,
    EyeOutlined,
    UndoOutlined,
    DeleteOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()
const breadcrumbs = [
    { title: 'Quản lý tuyển sinh', path: '#' },
    { title: 'Hồ sơ thí sinh', path: '#' },
    { title: 'Danh sách hồ sơ', path: '/recruitment/candidate-profile/list' },
]
// ─── Types ────────────────────────────────────────────────────────────────────
interface DeletedHoSoRecord {
    id: number
    idHoSo: string
    thiSinh: string
    ngaySinh: string
    soDienThoai: string
    kyTuyenSinh: string
    ngayXoa: string
}

// ─── State ────────────────────────────────────────────────────────────────────
const searchText = ref('')
const selectedKy = ref<string | undefined>(undefined)
const currentPage = ref(3)
const pageSize = ref(10)

// ─── Mock data ────────────────────────────────────────────────────────────────
const allData = ref<DeletedHoSoRecord[]>(
    Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        idHoSo: 'HS001',
        thiSinh: 'Nguyễn Văn An',
        ngaySinh: '15/06/2010',
        soDienThoai: '0903 123 456',
        kyTuyenSinh: 'Tuyển sinh PVF 2025',
        ngayXoa: '25-02-01 8:30',
    }))
)

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredData = computed(() =>
    allData.value.filter((item) => {
        const matchSearch =
            !searchText.value ||
            item.thiSinh.toLowerCase().includes(searchText.value.toLowerCase()) ||
            item.idHoSo.toLowerCase().includes(searchText.value.toLowerCase())
        const matchKy =
            !selectedKy.value ||
            item.kyTuyenSinh.includes(selectedKy.value)
        return matchSearch && matchKy
    })
)

const totalItems = computed(() => filteredData.value.length)

const pagedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredData.value.slice(start, start + pageSize.value)
})

// ─── Table columns ─────────────────────────────────────────────────────────────
const columns: TableColumnsType = [
    { title: 'ID HỒ SƠ', dataIndex: 'idHoSo', key: 'idHoSo', width: 120 },
    { title: 'THÍ SINH', dataIndex: 'thiSinh', key: 'thiSinh' },
    { title: 'NGÀY SINH', dataIndex: 'ngaySinh', key: 'ngaySinh', width: 130 },
    { title: 'SỐ ĐIỆN THOẠI', dataIndex: 'soDienThoai', key: 'soDienThoai', width: 150 },
    { title: 'KỲ TUYỂN SINH', dataIndex: 'kyTuyenSinh', key: 'kyTuyenSinh' },
    { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 160 },
    { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 140, align: 'center' },
]

// ─── Row selection ─────────────────────────────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => { selectedRowKeys.value = keys },
}

// ─── Pagination item render ────────────────────────────────────────────────────
const itemRender = ({ page, type, originalElement }: any) => {
    if (type === 'page' && page === 5)
        return h('span', { class: 'text-pink-400 font-medium cursor-not-allowed' }, page)
    return originalElement
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }

const handleResetFilter = () => {
    searchText.value = ''
    selectedKy.value = undefined
    currentPage.value = 1
}

const handleBack = () => router.push({ name: "candidate-list" })

const handleView = (record: DeletedHoSoRecord) =>
    message.info(`Xem hồ sơ: ${record.thiSinh}`)

const handleRestore = (record: DeletedHoSoRecord) => {
    allData.value = allData.value.filter((i) => i.id !== record.id)
    message.success(`Đã khôi phục hồ sơ: ${record.thiSinh}`)
}

const handleDeletePermanent = (record: DeletedHoSoRecord) => {
    allData.value = allData.value.filter((i) => i.id !== record.id)
    message.warning(`Đã xóa vĩnh viễn hồ sơ: ${record.thiSinh}`)
}
</script>

<style scoped>
:deep(.deleted-hs-table .ant-table-thead > tr > th) {
    @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.deleted-hs-table .ant-table-tbody > tr > td) {
    @apply border-b border-gray-100 text-gray-700;
}

:deep(.deleted-hs-table .ant-table-tbody > tr:hover > td) {
    @apply bg-blue-50/40;
}

:deep(.ant-pagination-item-active) {
    @apply !bg-red-500 !border-red-500;
}

:deep(.ant-pagination-item-active a) {
    @apply !text-white;
}

:deep(.ant-pagination-item:not(.ant-pagination-item-active):hover a) {
    @apply !text-blue-500;
}
</style>