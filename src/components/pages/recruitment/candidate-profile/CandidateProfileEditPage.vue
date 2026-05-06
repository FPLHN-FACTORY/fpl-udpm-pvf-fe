<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800 tracking-tight">Điều chỉnh Hồ sơ thí sinh</h1>
                <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                    <template #icon><arrow-left-outlined /></template>
                    Quay Lại
                </a-button>
            </div>

            <!-- Form -->
            <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="px-6 py-5 space-y-4">

                <!-- Row 1: Họ, Tên, Ngày sinh -->
                <div class="grid grid-cols-3 gap-4">
                    <a-form-item name="ho" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ho" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Họ của thí sinh</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="ten" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ten" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Tên của thí sinh</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="ngaySinh" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ngaySinh" placeholder=" " size="large"
                                class="!rounded-lg float-input pr-10" />
                            <label class="float-label">Ngày sinh của thí sinh</label>
                            <calendar-outlined
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 2: Email, SĐT, Nơi sinh -->
                <div class="grid grid-cols-3 gap-4">
                    <a-form-item name="email" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.email" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Địa chỉ email của thí sinh</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="soDienThoai" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.soDienThoai" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Số điện thoại của thí sinh</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="noiSinh" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.noiSinh" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Nơi sinh của thí sinh</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 3: CCCD thí sinh -->
                <div class="grid grid-cols-3 gap-4">
                    <a-form-item name="soCCCD" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.soCCCD" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Số CCCD của thí sinh</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="ngayCapCCCD" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ngayCapCCCD" placeholder=" " size="large"
                                class="!rounded-lg float-input pr-10" />
                            <label class="float-label">Ngày cấp CCCD của thí sinh</label>
                            <calendar-outlined
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </a-form-item>
                    <a-form-item name="noiCapCCCD" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.noiCapCCCD" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Nơi cấp CCCD của thí sinh</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 4: Người giám hộ -->
                <div class="grid grid-cols-2 gap-4">
                    <a-form-item name="hoTenGiamHo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.hoTenGiamHo" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Họ tên người giám hộ</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="sdtGiamHo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.sdtGiamHo" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Số điện thoại người giám hộ</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 5: Bố -->
                <div class="grid grid-cols-4 gap-4">
                    <a-form-item name="hoTenBo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.hoTenBo" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Họ tên của bố</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="soCCCDBo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.soCCCDBo" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Số CCCD của bố</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="ngayCapCCCDBo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ngayCapCCCDBo" placeholder=" " size="large"
                                class="!rounded-lg float-input pr-10" />
                            <label class="float-label">Ngày cấp CCCD của bố</label>
                            <calendar-outlined
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </a-form-item>
                    <a-form-item name="noiCapCCCDBo" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.noiCapCCCDBo" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Nơi cấp CCCD của bố</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 6: Mẹ -->
                <div class="grid grid-cols-4 gap-4">
                    <a-form-item name="hoTenMe" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.hoTenMe" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Họ tên của mẹ</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="soCCCDMe" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.soCCCDMe" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Số CCCD của mẹ</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="ngayCapCCCDMe" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.ngayCapCCCDMe" placeholder=" " size="large"
                                class="!rounded-lg float-input pr-10" />
                            <label class="float-label">Ngày cấp CCCD của mẹ</label>
                            <calendar-outlined
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </a-form-item>
                    <a-form-item name="noiCapCCCDMe" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.noiCapCCCDMe" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Nơi cấp CCCD của mẹ</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 7: Địa chỉ -->
                <div class="grid grid-cols-2 gap-4">
                    <a-form-item name="diaChiThuongTru" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.diaChiThuongTru" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Địa chỉ thường trú</label>
                        </div>
                    </a-form-item>
                    <a-form-item name="diaChiTamTru" class="!mb-0">
                        <div class="float-wrap">
                            <a-input v-model:value="formState.diaChiTamTru" placeholder=" " size="large"
                                class="!rounded-lg float-input" />
                            <label class="float-label">Địa chỉ tạm trú</label>
                        </div>
                    </a-form-item>
                </div>

                <!-- Row 8: Upload files -->
                <div class="grid grid-cols-4 gap-4">
                    <a-form-item v-for="file in uploadFields" :key="file.key" :name="file.key" class="!mb-0">
                        <a-upload :max-count="1" :before-upload="() => false" class="w-full upload-field">
                            <a-button size="large" class="!w-full !rounded-lg upload-btn">
                                <span class="text-gray-500 text-sm truncate flex-1 text-left">{{ file.label }}</span>
                                <upload-outlined class="text-gray-400 shrink-0" />
                            </a-button>
                        </a-upload>
                    </a-form-item>
                </div>

            </a-form>

            <!-- Footer -->
            <div class="flex justify-center gap-4 py-6 border-t border-gray-100">
                <a-button type="primary" danger size="large" class="!px-10 !font-semibold !rounded-lg"
                    :loading="submitting" @click="handleSubmit">
                    Cập Nhật
                </a-button>
                <a-button size="large"
                    class="!px-10 !font-semibold !rounded-lg !bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 hover:!border-yellow-500"
                    @click="handleReset">
                    Đặt Lại
                </a-button>
            </div>
        </div>
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowLeftOutlined, CalendarOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Hồ sơ thí sinh', path: '#' },
  { title: 'Danh sách hồ sơ', path: '/recruitment/candidate-profile/list' },
]

interface FormState {
    ho: string; ten: string; ngaySinh: string
    email: string; soDienThoai: string; noiSinh: string
    soCCCD: string; ngayCapCCCD: string; noiCapCCCD: string
    hoTenGiamHo: string; sdtGiamHo: string
    hoTenBo: string; soCCCDBo: string; ngayCapCCCDBo: string; noiCapCCCDBo: string
    hoTenMe: string; soCCCDMe: string; ngayCapCCCDMe: string; noiCapCCCDMe: string
    diaChiThuongTru: string; diaChiTamTru: string
}

const formRef = ref<FormInstance>()
const submitting = ref(false)

// Pre-filled with existing data
const originalData: FormState = {
    ho: 'Input', ten: 'Input', ngaySinh: 'Input',
    email: 'Input', soDienThoai: 'Input', noiSinh: 'Input',
    soCCCD: 'Input', ngayCapCCCD: 'Input', noiCapCCCD: 'Input',
    hoTenGiamHo: 'Input', sdtGiamHo: 'Input',
    hoTenBo: 'Input', soCCCDBo: 'Input', ngayCapCCCDBo: 'Input', noiCapCCCDBo: 'Input',
    hoTenMe: 'Input', soCCCDMe: 'Input', ngayCapCCCDMe: 'Input', noiCapCCCDMe: 'Input',
    diaChiThuongTru: 'Input', diaChiTamTru: 'Input',
}

const formState = reactive<FormState>({ ...originalData })

const uploadFields = [
    { key: 'giayKhaiSinh', label: 'Giấy khai sinh bản sao' },
    { key: 'giayKetTapTrung', label: 'Giấy cam kết tập trung' },
    { key: 'bienBanThanhLy', label: 'Biên bản thanh lý hợp đồng cũ' },
    { key: 'giayToBoSung', label: 'Giấy tờ bổ sung' },
]

const rules = {
    ho: [{ required: true, message: 'Vui lòng nhập họ', trigger: 'blur' }],
    ten: [{ required: true, message: 'Vui lòng nhập tên', trigger: 'blur' }],
    email: [{ required: true, message: 'Vui lòng nhập email', trigger: 'blur' }],
    soDienThoai: [{ required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' }],
}

const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        submitting.value = true
        await new Promise(r => setTimeout(r, 800))
        message.success('Cập nhật hồ sơ thành công!')
    } catch {
        message.error('Vui lòng kiểm tra lại thông tin.')
    } finally {
        submitting.value = false
    }
}

const handleReset = () => {
    Object.assign(formState, originalData)
    formRef.value?.clearValidate()
    message.info('Đã đặt lại về dữ liệu ban đầu.')
}

const handleBack = () => router.push({ name: "candidate-list" })
</script>

<style scoped>
/* ── Floating label ─────────────────────────────────────────────────────────── */
.float-wrap {
    position: relative;
}

.float-label {
    position: absolute;
    top: -9px;
    left: 11px;
    padding: 0 4px;
    font-size: 11px;
    color: #6b7280;
    background: #fff;
    pointer-events: none;
    z-index: 10;
    line-height: 1;
    white-space: nowrap;
}

/* When input is empty (placeholder shown), label sits inside */
.float-input:placeholder-shown~.float-label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: #9ca3af;
}

/* When input has value or is focused, label floats up */
.float-input:not(:placeholder-shown)~.float-label,
.float-input:focus~.float-label {
    top: -9px;
    transform: none;
    font-size: 11px;
    color: #6b7280;
}

/* ── Upload button ───────────────────────────────────────────────────────────── */
:deep(.upload-field .ant-upload) {
    @apply block w-full;
}

:deep(.upload-btn.ant-btn) {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

:deep(.ant-upload-list) {
    display: none;
}

/* ── Ant overrides ───────────────────────────────────────────────────────────── */
:deep(.ant-form-item) {
    margin-bottom: 0;
}

:deep(.ant-input-lg) {
    padding-top: 14px;
    padding-bottom: 6px;
    min-height: 48px;
}

:deep(.float-input .ant-input) {
    padding-top: 14px;
    padding-bottom: 6px;
}
</style>