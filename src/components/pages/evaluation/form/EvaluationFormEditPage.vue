<template>
    <div class="">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800 tracking-tight">Chỉnh sửa Form đánh giá</h1>
                <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                    <template #icon><arrow-left-outlined /></template>
                    Quay Lại
                </a-button>
            </div>

            <!-- Form body -->
            <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="px-6 py-5">
                <!-- Tên Form -->
                <a-form-item name="tenForm" class="!mb-4 floating-item">
                    <div class="floating-wrapper">
                        <a-input v-model:value="formState.tenForm" size="large" class="floating-input !rounded-lg"
                            placeholder=" " />
                        <label class="floating-label">Tên Form</label>
                    </div>
                </a-form-item>

                <!-- Phiên bản -->
                <a-form-item name="phienBan" class="!mb-4 floating-item">
                    <div class="floating-wrapper">
                        <a-input v-model:value="formState.phienBan" size="large" class="floating-input !rounded-lg"
                            placeholder=" " />
                        <label class="floating-label">Phiên bản</label>
                    </div>
                </a-form-item>

                <!-- Độ tuổi -->
                <a-form-item name="doTuoi" class="!mb-4 floating-item">
                    <div class="floating-wrapper">
                        <a-input v-model:value="formState.doTuoi" size="large" class="floating-input !rounded-lg"
                            placeholder=" " />
                        <label class="floating-label">Độ tuổi</label>
                    </div>
                </a-form-item>

                <!-- Tổng điểm -->
                <a-form-item name="tongDiem" class="!mb-4 floating-item">
                    <div class="floating-wrapper">
                        <a-input v-model:value="formState.tongDiem" size="large" class="floating-input !rounded-lg"
                            placeholder=" " />
                        <label class="floating-label">Tổng điểm</label>
                    </div>
                </a-form-item>

                <!-- Tiêu chí (select with floating label) -->
                <a-form-item name="tieuChi" class="!mb-4 floating-item">
                    <div class="floating-wrapper">
                        <a-select v-model:value="formState.tieuChi" mode="multiple" size="large" allow-clear
                            class="floating-select !w-full" :max-tag-count="'responsive'" :options="tieuChiOptions"
                            placeholder=" " />
                        <label class="floating-label floating-label--select"
                            :class="{ 'is-filled': formState.tieuChi.length > 0 }">
                            Tiêu chí
                        </label>
                    </div>
                </a-form-item>

                <!-- Trạng thái -->
                <a-form-item name="trangThai" class="!mb-6 floating-item">
                    <div class="floating-wrapper">
                        <a-select v-model:value="formState.trangThai" size="large" allow-clear
                            class="floating-select !w-full" placeholder=" ">
                            <a-select-option value="active">Đang Hoạt động</a-select-option>
                            <a-select-option value="inactive">Không Hoạt động</a-select-option>
                            <a-select-option value="draft">Nháp</a-select-option>
                        </a-select>
                        <label class="floating-label floating-label--select"
                            :class="{ 'is-filled': !!formState.trangThai }">
                            Trạng thái
                        </label>
                    </div>
                </a-form-item>
            </a-form>

            <!-- Footer actions -->
            <div class="flex justify-center gap-4 py-6 border-t border-gray-100">
                <a-button type="primary" danger size="large" class="!px-7 !font-semibold !rounded-lg"
                    :loading="submitting" @click="handleSubmit">
                    Cập Nhật
                </a-button>
                <a-button size="large"
                    class="!px-7 !font-semibold !rounded-lg !bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 hover:!border-yellow-500"
                    @click="handleReset">
                    Đặt Lại
                </a-button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
    tenForm: string
    phienBan: string
    doTuoi: string
    tongDiem: string
    tieuChi: string[]
    trangThai: string | undefined
}

// ─── State ────────────────────────────────────────────────────────────────────
const formRef = ref<FormInstance>()
const submitting = ref(false)

// Pre-filled data (as if loaded from API)
const originalData: FormState = {
    tenForm: 'Tên form',
    phienBan: 'Phiên bản',
    doTuoi: 'Độ tuổi',
    tongDiem: 'Tổng điểm',
    tieuChi: ['tieu-chi-1', 'tieu-chi-2', 'tieu-chi-3', 'tieu-chi-4'],
    trangThai: 'active',
}

const formState = reactive<FormState>({ ...originalData })

const tieuChiOptions = [
    { value: 'tieu-chi-1', label: 'Tiêu chí 1' },
    { value: 'tieu-chi-2', label: 'Tiêu chí 2' },
    { value: 'tieu-chi-3', label: 'Tiêu chí 3' },
    { value: 'tieu-chi-4', label: 'Tiêu chí 4' },
    { value: 'tieu-chi-5', label: 'Tiêu chí 5' },
]

// ─── Validation rules ─────────────────────────────────────────────────────────
const rules = {
    tenForm: [{ required: true, message: 'Vui lòng nhập Tên Form', trigger: 'blur' }],
    phienBan: [{ required: true, message: 'Vui lòng nhập Phiên bản', trigger: 'blur' }],
    doTuoi: [{ required: true, message: 'Vui lòng nhập Độ tuổi', trigger: 'blur' }],
    tongDiem: [{ required: true, message: 'Vui lòng nhập Tổng điểm', trigger: 'blur' }],
    tieuChi: [{ required: true, type: 'array', min: 1, message: 'Vui lòng chọn Tiêu chí', trigger: 'change' }],
    trangThai: [{ required: true, message: 'Vui lòng chọn Trạng thái', trigger: 'change' }],
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        submitting.value = true
        await new Promise(r => setTimeout(r, 800))
        message.success('Cập nhật Form đánh giá thành công!')
    } catch {
        message.error('Vui lòng kiểm tra lại thông tin.')
    } finally {
        submitting.value = false
    }
}

const handleReset = () => {
    Object.assign(formState, originalData)
    formRef.value?.clearValidate()
    message.info('Đã đặt lại form về dữ liệu ban đầu.')
}

const handleBack = () => {
    router.push({ name: "evaluation-forms" })
}
</script>

<style scoped>
/* ── Floating label wrapper ───────────────────────────────────────────────── */
.floating-wrapper {
    position: relative;
}

/* The floating label */
.floating-label {
    position: absolute;
    top: -10px;
    left: 12px;
    padding: 0 4px;
    font-size: 12px;
    color: #6b7280;
    background: #fff;
    pointer-events: none;
    z-index: 10;
    line-height: 1;
}

/* For native input: float when input has value (placeholder hidden trick) */
.floating-input:placeholder-shown+.floating-label {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #9ca3af;
}

.floating-input:not(:placeholder-shown)+.floating-label,
.floating-input:focus+.floating-label {
    top: -10px;
    transform: none;
    font-size: 12px;
    color: #6b7280;
}

/* Select floating label — controlled via :class binding */
.floating-label--select {
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #9ca3af;
    transition: all 0.15s ease;
}

.floating-label--select.is-filled {
    top: -10px;
    transform: none;
    font-size: 12px;
    color: #6b7280;
}

/* ── Ant Design overrides ────────────────────────────────────────────────── */
:deep(.floating-input .ant-input) {
    padding-top: 12px;
    padding-bottom: 12px;
}

:deep(.floating-select .ant-select-selector) {
    @apply !rounded-lg;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    min-height: 46px !important;
}

:deep(.ant-form-item-label) {
    display: none;
}

:deep(.ant-input-number) {
    @apply !w-full;
}

:deep(.ant-select-selection-placeholder) {
    color: transparent !important;
}

/* Remove inner shadow on focus */
:deep(.ant-input:focus),
:deep(.ant-input-focused) {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}
</style>