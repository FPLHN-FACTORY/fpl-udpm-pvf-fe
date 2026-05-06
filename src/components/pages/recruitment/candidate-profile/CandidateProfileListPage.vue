<template>
    <AdminPage :breadcrumbs="breadcrumbs">
        <div class="space-y-5">
            <!-- ── STAT CARDS ROW 1 ───────────────────────────────────────────────── -->
            <div class="grid grid-cols-4 gap-4">
                <div v-for="card in statsRow1" :key="card.label"
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-start justify-between">
                    <div>
                        <p class="text-sm text-gray-500 mb-2">{{ card.label }}</p>
                        <p class="text-2xl font-bold text-gray-800">
                            {{ card.value }}
                            <span v-if="card.percent" class="text-sm font-semibold text-green-500 ml-1">{{ card.percent
                            }}</span>
                        </p>
                    </div>
                    <div class="rounded-xl p-2.5 mt-1" :class="card.iconBg">
                        <component :is="card.icon" class="text-xl" :class="card.iconColor" />
                    </div>
                </div>
            </div>

            <!-- ── STAT CARDS ROW 2 ───────────────────────────────────────────────── -->
            <div class="grid grid-cols-3 gap-4">
                <div v-for="card in statsRow2" :key="card.label"
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-start justify-between">
                    <div>
                        <p class="text-sm text-gray-500 mb-2">{{ card.label }}</p>
                        <p class="text-2xl font-bold text-gray-800">
                            {{ card.value }}
                            <span v-if="card.percent" class="text-sm font-semibold ml-1" :class="card.percentColor">{{
                                card.percent }}</span>
                        </p>
                    </div>
                    <div class="rounded-xl p-2.5 mt-1" :class="card.iconBg">
                        <component :is="card.icon" class="text-xl" :class="card.iconColor" />
                    </div>
                </div>
            </div>

            <!-- ── TABLE BLOCK ────────────────────────────────────────────────────── -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h1 class="text-xl font-bold text-gray-800 tracking-tight">Danh sách Hồ sơ thí sinh</h1>
                    <div class="flex gap-3">
                        <a-button @click="handleClickDeleted"
                            class="flex items-center gap-1 !text-white !border-gray-300 bg-[#8592a3]/90 hover:!bg-[#8592a3]">
                            <template #icon><delete-outlined /></template>
                            Danh Sách Đã Xóa
                        </a-button>
                        <a-button @click="handleClickAdd" type="primary" danger
                            class="flex items-center gap-1 font-semibold">
                            <template #icon><plus-outlined /></template>
                            Thêm Mới
                        </a-button>
                        <a-button
                            class="flex items-center gap-1 !bg-green-500 !border-green-500 !text-white hover:!bg-green-600 font-semibold">
                            <template #icon><upload-outlined /></template>
                            Nhập Bảng Excel
                        </a-button>
                    </div>
                </div>

                <!-- Filters -->
                <div class="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                    <a-input v-model:value="searchText" placeholder="Tìm kiếm" class="!w-56" allow-clear />
                    <a-select v-model:value="selectedKy" placeholder="Chọn kỳ tuyển sinh" class="!w-52" allow-clear>
                        <a-select-option value="2025">Tuyển sinh PVF 2025</a-select-option>
                        <a-select-option value="2024">Tuyển sinh PVF 2024</a-select-option>
                    </a-select>
                    <a-select v-model:value="selectedStatus" placeholder="Chọn trạng thái" class="!w-48" allow-clear>
                        <a-select-option value="day-du">Đầy đủ</a-select-option>
                        <a-select-option value="khong-hop-le">Không hợp lệ</a-select-option>
                        <a-select-option value="cho-xu-ly">Chờ xử lý</a-select-option>
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
                    row-key="id" class="candidate-table">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'idHoSo'">
                            <a class="text-blue-500 hover:text-blue-700 font-medium">{{ record.idHoSo }}</a>
                        </template>

                        <template v-else-if="column.key === 'trangThaiHoSo'">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold"
                                :class="statusClass(record.trangThaiHoSo)">
                                {{ record.trangThaiHoSo }}
                            </span>
                        </template>

                        <template v-else-if="column.key === 'hanhDong'">
                            <div class="flex items-center gap-3">
                                <a-tooltip title="Xem bảng điểm">
                                    <table-outlined
                                        class="text-gray-500 hover:text-purple-500 cursor-pointer text-base transition-colors"
                                        @click="handleScore(record)" />
                                </a-tooltip>
                                <a-tooltip title="Xem chi tiết">
                                    <eye-outlined
                                        class="text-gray-500 hover:text-blue-500 cursor-pointer text-base transition-colors"
                                        @click="handleView(record)" />
                                </a-tooltip>
                                <a-tooltip title="Chỉnh sửa">
                                    <edit-outlined
                                        class="text-gray-500 hover:text-green-500 cursor-pointer text-base transition-colors"
                                        @click="handleEdit(record)" />
                                </a-tooltip>
                                <a-tooltip title="Xóa">
                                    <a-popconfirm title="Bạn có chắc muốn xóa hồ sơ này?" ok-text="Xóa"
                                        cancel-text="Hủy" @confirm="handleDelete(record)">
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
                        show-less-items :item-render="itemRender" :show-size-changer="false" />
                </div>
            </div>
        </div>
        </ AdminPage>
</template>

<script setup lang="ts">
import {
    ApiOutlined,
    AppstoreOutlined, CalendarOutlined,
    CheckOutlined, CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PieChartOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    TableOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { computed, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()

const breadcrumbs = [
    { title: 'Quản lý tuyển sinh', path: '#' },
    { title: 'Hồ sơ thí sinh', path: '#' },
    { title: 'Danh sách hồ sơ', path: '/recruitment/candidate-profile/list' },
]

// ─── Types ────────────────────────────────────────────────────────────────────
interface CandidateRecord {
    id: number
    idHoSo: string
    thiSinh: string
    ngaySinh: string
    soDienThoai: string
    kyTuyenSinh: string
    trangThaiHoSo: string
}

// ─── Stat cards ───────────────────────────────────────────────────────────────
const statsRow1 = [
    { label: 'Tổng số thí sinh', value: '21', percent: '', icon: AppstoreOutlined, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-500' },
    { label: 'Trạng thái đầy đủ', value: '20', percent: '(95%)', icon: CalendarOutlined, iconBg: 'bg-red-100', iconColor: 'text-red-400' },
    { label: 'Trạng thái không hợp lệ', value: '1', percent: '(5%)', icon: ApiOutlined, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
    { label: 'Trạng thái Chờ xử lý', value: '21', percent: '(5%)', icon: ApiOutlined, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
]

const statsRow2 = [
    { label: 'Số hồ sơ pass', value: '20', percent: '(95%)', percentColor: 'text-green-500', icon: CheckOutlined, iconBg: 'bg-red-100', iconColor: 'text-red-400' },
    { label: 'Số hồ sơ fail', value: '1', percent: '(5%)', percentColor: 'text-green-500', icon: CloseOutlined, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
    { label: 'Tỷ lệ pass/fail', value: '21', percent: '(5%)', percentColor: 'text-green-500', icon: PieChartOutlined, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const searchText = ref('')
const selectedKy = ref<string | undefined>(undefined)
const selectedStatus = ref<string | undefined>(undefined)
const currentPage = ref(3)
const pageSize = ref(10)

// ─── Mock data ────────────────────────────────────────────────────────────────
const allData = ref<CandidateRecord[]>(
    Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        idHoSo: 'HS001',
        thiSinh: 'Nguyễn Văn An',
        ngaySinh: '15/06/2010',
        soDienThoai: '0903 123 456',
        kyTuyenSinh: 'Tuyển sinh PVF 2025',
        trangThaiHoSo: i % 5 === 3 ? 'Không hợp lệ' : 'Đầy đủ',
    }))
)

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredData = computed(() =>
    allData.value.filter((item) => {
        const matchSearch = !searchText.value ||
            item.thiSinh.toLowerCase().includes(searchText.value.toLowerCase()) ||
            item.idHoSo.toLowerCase().includes(searchText.value.toLowerCase())
        const matchStatus = !selectedStatus.value ||
            (selectedStatus.value === 'day-du' && item.trangThaiHoSo === 'Đầy đủ') ||
            (selectedStatus.value === 'khong-hop-le' && item.trangThaiHoSo === 'Không hợp lệ')
        return matchSearch && matchStatus
    })
)

const totalItems = computed(() => filteredData.value.length)
const pagedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredData.value.slice(start, start + pageSize.value)
})

// ─── Table columns ─────────────────────────────────────────────────────────────
const columns: TableColumnsType = [
    { title: 'ID HỒ SƠ', dataIndex: 'idHoSo', key: 'idHoSo', width: 110 },
    { title: 'THÍ SINH', dataIndex: 'thiSinh', key: 'thiSinh' },
    { title: 'NGÀY SINH', dataIndex: 'ngaySinh', key: 'ngaySinh', width: 130 },
    { title: 'SỐ ĐIỆN THOẠI', dataIndex: 'soDienThoai', key: 'soDienThoai', width: 150 },
    { title: 'KỲ TUYỂN SINH', dataIndex: 'kyTuyenSinh', key: 'kyTuyenSinh' },
    { title: 'TRẠNG THÁI HỒ SƠ', dataIndex: 'trangThaiHoSo', key: 'trangThaiHoSo', width: 160 },
    { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 160, align: 'center' },
]

// ─── Row selection ─────────────────────────────────────────────────────────────
const selectedRowKeys = ref<number[]>([])
const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => { selectedRowKeys.value = keys },
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const statusClass = (status: string) => {
    switch (status) {
        case 'Đầy đủ': return 'bg-green-100 text-green-700'
        case 'Không hợp lệ': return 'bg-red-100 text-red-500'
        case 'Chờ xử lý': return 'bg-yellow-100 text-yellow-600'
        default: return 'bg-gray-100 text-gray-500'
    }
}

const itemRender = ({ page, type, originalElement }: any) => {
    if (type === 'page' && page === 5)
        return h('span', { class: 'text-pink-400 font-medium cursor-not-allowed' }, page)
    return originalElement
}

// ─── Actions ───────────────────────────────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }
const handleResetFilter = () => {
    searchText.value = ''
    selectedKy.value = undefined
    selectedStatus.value = undefined
    currentPage.value = 1
}
const handleScore = (r: CandidateRecord) => message.info(`Bảng điểm: ${r.thiSinh}`)
const handleView = (r: CandidateRecord) => router.push({ name: "candidate-detail", params: { id: r.id } })
const handleEdit = (r: CandidateRecord) => router.push({ name: "candidate-edit", params: { id: r.id } })
const handleDelete = (r: CandidateRecord) => {
    allData.value = allData.value.filter(i => i.id !== r.id)
    message.warning(`Đã xóa hồ sơ: ${r.thiSinh}`)
}

const handleClickAdd = () => router.push({ name: "candidate-add" })

const handleClickDeleted = () => router.push({ name: "candidate-deleted" })
</script>

<style scoped>
:deep(.candidate-table .ant-table-thead > tr > th) {
    @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.candidate-table .ant-table-tbody > tr > td) {
    @apply border-b border-gray-100 text-gray-700;
}

:deep(.candidate-table .ant-table-tbody > tr:hover > td) {
    @apply bg-blue-50/40;
}

:deep(.ant-pagination-item-active) {
    @apply !bg-red-500 !border-red-500;
}

:deep(.ant-pagination-item-active a) {
    @apply !text-white;
}
</style>