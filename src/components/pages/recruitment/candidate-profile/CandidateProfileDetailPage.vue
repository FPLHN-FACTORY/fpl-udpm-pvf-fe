<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="space-y-5">

        <!-- ── BLOCK 1: Chi tiết hồ sơ ──────────────────────────────────────── -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800">Chi tiết Thông tin hồ sơ</h1>
                <div class="flex gap-3">
                    <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                        <template #icon><arrow-left-outlined /></template>
                        Quay Lại
                    </a-button>
                    <a-button class="!bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 font-semibold">
                        Chỉnh Sửa
                    </a-button>
                </div>
            </div>
            <div class="divide-y divide-gray-100">
                <div v-for="field in hoSoFields" :key="field.label" class="flex items-center px-6 py-4">
                    <span class="w-64 text-sm font-semibold text-gray-700 shrink-0">{{ field.label }}</span>
                    <span class="text-sm text-gray-600">{{ field.value }}</span>
                </div>
            </div>
        </div>

        <!-- ── BLOCK 2: Tabs ──────────────────────────────────────────────────── -->
        <div v-if="!showScoreDetail" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Tab buttons -->
            <div class="flex gap-3 px-6 py-4 border-b border-gray-100">
                <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key as TabKey"
                    class="px-5 py-2 rounded-full text-sm font-semibold transition-colors" :class="activeTab === tab.key
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
                    {{ tab.label }}
                </button>
            </div>

            <!-- Tab: Thông tin cá nhân -->
            <template v-if="activeTab === 'thongtin'">
                <h2 class="px-6 pt-5 pb-3 text-lg font-bold text-gray-800">Thông tin cá nhân thí sinh</h2>
                <div class="mx-6 mb-6 border border-gray-200 rounded-xl overflow-hidden">
                    <div v-for="field in thongTinFields" :key="field.label"
                        class="flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0">
                        <span class="w-64 text-sm font-semibold text-gray-700 shrink-0">{{ field.label }}</span>
                        <span class="text-sm text-gray-600">{{ field.value }}</span>
                    </div>
                </div>
            </template>

            <!-- Tab: Hồ sơ giấy tờ -->
            <template v-else-if="activeTab === 'hoso'">
                <h2 class="px-6 pt-5 pb-3 text-lg font-bold text-gray-800">Hồ sơ giấy tờ</h2>
                <div class="mx-6 mb-6 border border-gray-200 rounded-xl overflow-hidden">
                    <div v-for="field in hoSoGiayToFields" :key="field.label"
                        class="flex items-center px-5 py-3.5 border-b border-gray-100 last:border-0">
                        <span class="w-64 text-sm font-semibold text-gray-700 shrink-0">{{ field.label }}</span>
                        <template v-if="field.type === 'badge'">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">{{
                                field.value }}</span>
                        </template>
                        <template v-else-if="field.type === 'file'">
                            <a class="text-sm text-blue-500 hover:underline cursor-pointer">{{ field.value }}</a>
                        </template>
                        <template v-else>
                            <span class="text-sm text-gray-600">{{ field.value }}</span>
                        </template>
                    </div>
                </div>
            </template>

            <!-- Tab: Lịch sử đánh giá -->
            <template v-else-if="activeTab === 'lichsu'">
                <h2 class="px-6 pt-5 pb-3 text-lg font-bold text-gray-800">Lịch sử đánh giá</h2>
                <a-table :columns="lichSuColumns" :data-source="lichSuData" :pagination="false" row-key="id"
                    class="lichsu-table mx-0">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'stt'">
                            <span class="text-blue-500 font-medium">{{ record.stt }}</span>
                        </template>
                        <template v-else-if="column.key === 'hanhDong'">
                            <a-tooltip title="Xem chi tiết điểm">
                                <eye-outlined
                                    class="text-gray-500 hover:text-blue-500 cursor-pointer text-base transition-colors"
                                    @click="openScoreDetail(record)" />
                            </a-tooltip>
                        </template>
                    </template>
                </a-table>
            </template>
        </div>

        <!-- ── BLOCK 3: Chi tiết điểm vòng đánh giá ─────────────────────────── -->
        <div v-if="showScoreDetail" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-800">Chi tiết điểm vòng đánh giá</h2>
                <div class="flex gap-3">
                    <a-button @click="showScoreDetail = false"
                        class="flex items-center gap-1 !text-gray-500 !border-gray-300">
                        <template #icon><arrow-left-outlined /></template>
                        Quay Lại
                    </a-button>
                    <a-button class="!bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 font-semibold">
                        Chỉnh Sửa
                    </a-button>
                </div>
            </div>

            <!-- Score table -->
            <a-table :columns="scoreColumns" :data-source="scoreData" :pagination="false" row-key="id"
                class="score-table" :summary="renderSummary">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'stt'">
                        <span class="text-blue-500 font-medium">{{ record.stt }}</span>
                    </template>
                    <template v-else-if="column.key === 'diemQuyDoi'">
                        <span class="text-gray-700">{{ record.diemQuyDoi.toFixed(2) }}</span>
                    </template>
                </template>

                <template #summary>
                    <!-- Tổng điểm -->
                    <a-table-summary-row class="border-t border-gray-200">
                        <a-table-summary-cell :col-span="1" />
                        <a-table-summary-cell :col-span="1">
                            <span class="text-sm font-bold text-gray-800">Tổng điểm</span>
                        </a-table-summary-cell>
                        <a-table-summary-cell :col-span="2" />
                        <a-table-summary-cell>
                            <span class="text-sm font-bold text-gray-800">{{ tongDiem }}</span>
                        </a-table-summary-cell>
                    </a-table-summary-row>
                    <!-- Kết luận -->
                    <a-table-summary-row>
                        <a-table-summary-cell :col-span="1" />
                        <a-table-summary-cell :col-span="1">
                            <span class="text-sm font-bold text-gray-800">Kết luận</span>
                        </a-table-summary-cell>
                        <a-table-summary-cell :col-span="3">
                            <span class="text-sm text-gray-600">Kết quả: Qua</span>
                        </a-table-summary-cell>
                    </a-table-summary-row>
                    <!-- Nhận xét -->
                    <a-table-summary-row>
                        <a-table-summary-cell :col-span="1" />
                        <a-table-summary-cell :col-span="1">
                            <span class="text-sm font-semibold text-gray-700">Nhận xét</span>
                        </a-table-summary-cell>
                        <a-table-summary-cell :col-span="3">
                            <span class="text-sm text-gray-600">Thể lực tốt, kỹ thuật ổn, cần cải thiện chiến
                                thuật</span>
                        </a-table-summary-cell>
                    </a-table-summary-row>
                </template>
            </a-table>
        </div>

    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Hồ sơ thí sinh', path: '#' },
  { title: 'Danh sách hồ sơ', path: '/recruitment/candidate-profile/list' },
]

type TabKey = 'thongtin' | 'hoso' | 'lichsu'

// ─── State ────────────────────────────────────────────────────────────────────
const activeTab = ref<TabKey>('thongtin')
const showScoreDetail = ref(false)

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const tabs = [
    { key: 'thongtin', label: 'Thông Tin Cá Nhân Thí Sinh' },
    { key: 'hoso', label: 'Hồ Sơ Giấy Tờ' },
    { key: 'lichsu', label: 'Lịch Sử Đánh Giá' },
]

// ─── Hồ sơ chính ──────────────────────────────────────────────────────────────
const hoSoFields = [
    { label: 'ID hồ sơ', value: 'HS001' },
    { label: 'Thí sinh', value: 'HV001 - Nguyễn Xuân An' },
    { label: 'Kỳ tuyển sinh', value: 'Tuyển sinh PVF 2025' },
    { label: 'Thời gian tạo hồ sơ', value: '10/01/2025 09:00' },
    { label: 'Thời gian cập nhật', value: '12/01/2025 14:30' },
]

// ─── Tab 1: Thông tin cá nhân ─────────────────────────────────────────────────
const thongTinFields = [
    { label: 'Mã thí sinh', value: 'HV001' },
    { label: 'Mã hồ sơ tuyển sinh', value: 'HS2025_001' },
    { label: 'Họ và tên', value: 'Nguyễn Văn An' },
    { label: 'Ngày sinh', value: '15/06/2010' },
    { label: 'Nơi sinh', value: 'Hà Nội' },
    { label: 'Email', value: 'an.nguyen@example.com' },
    { label: 'SĐT thí sinh', value: '0903 123 456' },
    { label: 'SĐT phụ huynh', value: '0903 123 456' },
    { label: 'Người giám hộ', value: 'Nguyễn Văn Bình' },
]

// ─── Tab 2: Hồ sơ giấy tờ ────────────────────────────────────────────────────
const hoSoGiayToFields = [
    { label: 'Giấy khai sinh bản sao', value: 'giay_khai_sinh_hv001.pdf', type: 'file' },
    { label: 'Giấy cam kết tập trung', value: 'cam_ket_tap_trung_hv001.pdf', type: 'file' },
    { label: 'Biên bản thanh lý HĐ cũ', value: 'thanh_ly_hd_cu_hv001.pdf', type: 'file' },
    { label: 'Giấy tờ bổ sung', value: 'giay_to_bo_sung_hv001.pdf', type: 'file' },
    { label: 'Trạng thái hồ sơ', value: 'Đầy đủ', type: 'badge' },
    { label: 'Ghi chú', value: 'Hồ sơ hợp lệ, đủ điều kiện tham gia vòng thi', type: 'text' },
]

// ─── Tab 3: Lịch sử đánh giá ──────────────────────────────────────────────────
interface LichSuRecord { id: number; stt: number; vong: string; tongDiem: number; ketQua: number; nhanXet: string; thoiGian: string }

const lichSuColumns: TableColumnsType = [
    { title: '#', dataIndex: 'stt', key: 'stt', width: 60 },
    { title: 'VÒNG', dataIndex: 'vong', key: 'vong' },
    { title: 'TỔNG ĐIỂM', dataIndex: 'tongDiem', key: 'tongDiem', width: 130 },
    { title: 'KẾT QUẢ', dataIndex: 'ketQua', key: 'ketQua', width: 110 },
    { title: 'NHẬN XÉT', dataIndex: 'nhanXet', key: 'nhanXet' },
    { title: 'THỜI GIAN', dataIndex: 'thoiGian', key: 'thoiGian', width: 130 },
    { title: 'HÀNH ĐỘNG', key: 'hanhDong', width: 110, align: 'center' },
]

const lichSuData = ref<LichSuRecord[]>([
    { id: 1, stt: 1, vong: 'Sơ tuyển', tongDiem: 7.65, ketQua: 8, nhanXet: 'Thể lực tốt, kỹ thuật ổn, cần cải thiện chiến thuật', thoiGian: '22/3/2025' },
])

// ─── Chi tiết điểm vòng ───────────────────────────────────────────────────────
interface ScoreRow { id: number; stt: number; tieuChi: string; trongSo: string; diem: number; diemQuyDoi: number }

const scoreColumns: TableColumnsType = [
    { title: '#', dataIndex: 'stt', key: 'stt', width: 60 },
    { title: 'TIÊU CHÍ', dataIndex: 'tieuChi', key: 'tieuChi' },
    { title: 'TRỌNG SỐ', dataIndex: 'trongSo', key: 'trongSo', width: 130 },
    { title: 'ĐIỂM', dataIndex: 'diem', key: 'diem', width: 130 },
    { title: 'ĐIỂM QUY ĐỔI', dataIndex: 'diemQuyDoi', key: 'diemQuyDoi', width: 160 },
]

const scoreData = ref<ScoreRow[]>([
    { id: 1, stt: 1, tieuChi: 'Thể lực', trongSo: '25%', diem: 8, diemQuyDoi: 2.0 },
    { id: 2, stt: 2, tieuChi: 'Kỹ thuật', trongSo: '30%', diem: 7, diemQuyDoi: 2.1 },
    { id: 3, stt: 3, tieuChi: 'Chiến thuật', trongSo: '15%', diem: 7, diemQuyDoi: 1.05 },
    { id: 4, stt: 4, tieuChi: 'Tâm lý', trongSo: '10%', diem: 8, diemQuyDoi: 0.8 },
    { id: 5, stt: 5, tieuChi: 'Thái độ', trongSo: '10%', diem: 9, diemQuyDoi: 0.9 },
    { id: 6, stt: 6, tieuChi: 'Tiềm năng', trongSo: '10%', diem: 8, diemQuyDoi: 0.8 },
])

const tongDiem = computed(() =>
    scoreData.value.reduce((s, r) => s + r.diemQuyDoi, 0).toFixed(2)
)

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleBack = () => router.push({ name: "candidate-list" })
const openScoreDetail = (_record: LichSuRecord) => { showScoreDetail.value = true }
const renderSummary = () => null // handled via #summary slot
</script>

<style scoped>
/* ── Lịch sử table ─────────────────────────────────────────────────────────── */
:deep(.lichsu-table .ant-table-thead > tr > th),
:deep(.score-table .ant-table-thead > tr > th) {
    @apply bg-gray-50 text-gray-500 text-xs font-semibold tracking-wider border-b border-gray-200;
}

:deep(.lichsu-table .ant-table-tbody > tr > td),
:deep(.score-table .ant-table-tbody > tr > td) {
    @apply border-b border-gray-100 text-gray-700;
}

:deep(.lichsu-table .ant-table-tbody > tr:hover > td),
:deep(.score-table .ant-table-tbody > tr:hover > td) {
    @apply bg-blue-50/40;
}

/* Summary rows */
:deep(.score-table .ant-table-summary > tr > td) {
    @apply border-b border-gray-100 py-3.5;
}
</style>