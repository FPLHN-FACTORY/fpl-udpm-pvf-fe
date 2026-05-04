<template>
    <AdminPage :breadcrumbs="breadcrumbs">
        <div class="">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h1 class="text-xl font-bold text-gray-800 tracking-tight">Danh sách Form đánh giá</h1>
                    <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                        <template #icon><arrow-left-outlined /></template>
                        Quay Lại
                    </a-button>
                </div>

                <!-- Filters -->
                <div class="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                    <a-input v-model:value="searchText" placeholder="Tìm kiếm" class="!w-64" allow-clear />
                    <a-select v-model:value="selectedStatus" placeholder="Chọn trạng thái" class="!w-52" allow-clear>
                        <a-select-option value="active">Đang Hoạt động</a-select-option>
                        <a-select-option value="inactive">Không Hoạt động</a-select-option>
                    </a-select>
                    <div class="flex-1" />
                    <a-button type="primary" class="!bg-blue-600 hover:!bg-blue-700 flex items-center gap-2"
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
                    row-key="id" class="deleted-table">
                    <template #bodyCell="{ column, record }">
                        <!-- ID FORM -->
                        <template v-if="column.key === 'idForm'">
                            <a class="text-blue-500 hover:text-blue-700 font-medium">{{ record.idForm }}</a>
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
                                    <a-popconfirm title="Bạn có muốn khôi phục form này?" ok-text="Khôi phục"
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
                    <a-pagination v-model:current="currentPage" :total="totalItems" :page-size="pageSize"
                        :item-render="itemRender" show-less-items :show-size-changer="false" />
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

const router = useRouter();
const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Form đánh giá', path: '#' },
]
// ─── Types ────────────────────────────────────────────────────────────────────
interface DeletedFormRecord {
    id: number
    idForm: string
    tenForm: string
    phienBan: string
    doTuoi: string
    tongDiem: number
    ngayXoa: string
}

// ─── State ────────────────────────────────────────────────────────────────────
const searchText = ref('')
const selectedStatus = ref<string | undefined>(undefined)
const currentPage = ref(3)
const pageSize = ref(10)

// ─── Mock data ────────────────────────────────────────────────────────────────
const allData = ref<DeletedFormRecord[]>(
    Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        idForm: 'HS001',
        tenForm: 'Form đánh giá PVF U13',
        phienBan: 'v1.0',
        doTuoi: 'U13',
        tongDiem: 10,
        ngayXoa: '2025/12/12 7:00',
    }))
)

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredData = computed(() =>
    allData.value.filter((item) => {
        const matchSearch =
            !searchText.value ||
            item.tenForm.toLowerCase().includes(searchText.value.toLowerCase()) ||
            item.idForm.toLowerCase().includes(searchText.value.toLowerCase())
        return matchSearch
    })
)

const totalItems = computed(() => filteredData.value.length)

const pagedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredData.value.slice(start, start + pageSize.value)
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns: TableColumnsType = [
    { title: 'ID FORM', dataIndex: 'idForm', key: 'idForm', width: 120 },
    { title: 'TÊN FORM', dataIndex: 'tenForm', key: 'tenForm' },
    { title: 'PHIÊN BẢN', dataIndex: 'phienBan', key: 'phienBan', width: 120 },
    { title: 'ĐỘ TUỔI', dataIndex: 'doTuoi', key: 'doTuoi', width: 100 },
    { title: 'TỔNG ĐIỂM', dataIndex: 'tongDiem', key: 'tongDiem', width: 130 },
    { title: 'NGÀY XÓA', dataIndex: 'ngayXoa', key: 'ngayXoa', width: 180 },
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
    if (type === 'page' && page === 5) {
        return h('span', { class: 'text-pink-400 font-medium cursor-not-allowed' }, page)
    }
    return originalElement
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }
const handleResetFilter = () => {
    searchText.value = ''
    selectedStatus.value = undefined
    currentPage.value = 1
}
const handleBack = () => router.push({ name: "evaluation-forms" })
const handleView = (record: DeletedFormRecord) => message.info(`Xem form: ${record.tenForm}`)
const handleRestore = (record: DeletedFormRecord) => {
    allData.value = allData.value.filter((item) => item.id !== record.id)
    message.success(`Đã khôi phục form: ${record.tenForm}`)
}
const handleDeletePermanent = (record: DeletedFormRecord) => {
    allData.value = allData.value.filter((item) => item.id !== record.id)
    message.warning(`Đã xóa vĩnh viễn form: ${record.tenForm}`)
}
</script>

<style scoped>
:deep(.deleted-table .ant-table-thead > tr > th) {
    @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.deleted-table .ant-table-tbody > tr > td) {
    @apply border-b border-gray-100 text-gray-700;
}

:deep(.deleted-table .ant-table-tbody > tr:hover > td) {
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