<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800 tracking-tight">Thêm mới Form đánh giá</h1>
                <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
                    <template #icon><arrow-left-outlined /></template>
                    Quay Lại
                </a-button>
            </div>

            <!-- Form body -->
            <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="px-6 py-5 space-y-1">
                <!-- Tên Form -->
                <a-form-item name="tenForm" class="!mb-4">
                    <a-input v-model:value="formState.tenForm" placeholder="Tên Form" size="large"
                        class="!rounded-lg" />
                </a-form-item>

                <!-- Phiên bản -->
                <a-form-item name="phienBan" class="!mb-4">
                    <a-input v-model:value="formState.phienBan" placeholder="Phiên bản" size="large"
                        class="!rounded-lg" />
                </a-form-item>

                <!-- Độ tuổi -->
                <a-form-item name="doTuoi" class="!mb-4">
                    <a-input v-model:value="formState.doTuoi" placeholder="Độ tuổi" size="large" class="!rounded-lg" />
                </a-form-item>

                <!-- Tổng điểm -->
                <a-form-item name="tongDiem" class="!mb-4">
                    <a-input-number v-model:value="formState.tongDiem" placeholder="Tổng điểm" size="large"
                        class="!w-full !rounded-lg" :min="0" />
                </a-form-item>

                <!-- Chọn Tiêu chí -->
                <a-form-item name="tieuChi" class="!mb-4">
                    <a-select v-model:value="formState.tieuChi" placeholder="Chọn Tiêu chí" size="large" mode="multiple"
                        allow-clear class="!w-full !rounded-lg">
                        <a-select-option value="the-luc">Thể lực</a-select-option>
                        <a-select-option value="ky-thuat">Kỹ thuật</a-select-option>
                        <a-select-option value="chien-thuat">Chiến thuật</a-select-option>
                        <a-select-option value="tam-ly">Tâm lý</a-select-option>
                        <a-select-option value="toc-do">Tốc độ</a-select-option>
                    </a-select>
                </a-form-item>

                <!-- Trạng thái -->
                <a-form-item name="trangThai" class="!mb-4">
                    <a-select v-model:value="formState.trangThai" placeholder="Trạng thái" size="large" allow-clear
                        class="!w-full !rounded-lg">
                        <a-select-option value="active">Đang Hoạt động</a-select-option>
                        <a-select-option value="inactive">Không Hoạt động</a-select-option>
                        <a-select-option value="draft">Nháp</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>

            <!-- Footer actions -->
            <div class="flex justify-center gap-4 py-6 border-t border-gray-100">
                <a-button type="primary" danger size="large" class="!px-7 !font-semibold !rounded-lg"
                    :loading="submitting" @click="handleSubmit">
                    Thêm Mới
                </a-button>
                <a-button size="large"
                    class="!px-7 !font-semibold !rounded-lg !bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 hover:!border-yellow-500"
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
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Form đánh giá', path: '#' },
]
// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
    tenForm: string
    phienBan: string
    doTuoi: string
    tongDiem: number | undefined
    tieuChi: string[]
    trangThai: string | undefined
}

// ─── State ────────────────────────────────────────────────────────────────────
const formRef = ref<FormInstance>()
const submitting = ref(false)

const formState = reactive<FormState>({
    tenForm: '',
    phienBan: '',
    doTuoi: '',
    tongDiem: undefined,
    tieuChi: [],
    trangThai: undefined,
})

// ─── Validation rules ─────────────────────────────────────────────────────────
const rules = {
    tenForm: [{ required: true, message: 'Vui lòng nhập Tên Form', trigger: 'blur' }],
    phienBan: [{ required: true, message: 'Vui lòng nhập Phiên bản', trigger: 'blur' }],
    doTuoi: [{ required: true, message: 'Vui lòng nhập Độ tuổi', trigger: 'blur' }],
    tongDiem: [{ required: true, message: 'Vui lòng nhập Tổng điểm', trigger: 'blur' }],
    tieuChi: [{ required: true, type: 'array', min: 1, message: 'Vui lòng chọn ít nhất một Tiêu chí', trigger: 'change' }],
    trangThai: [{ required: true, message: 'Vui lòng chọn Trạng thái', trigger: 'change' }],
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        submitting.value = true
        // Simulate API call
        await new Promise(r => setTimeout(r, 800))
        message.success('Thêm mới Form đánh giá thành công!')
        handleReset()
    } catch {
        message.error('Vui lòng kiểm tra lại thông tin.')
    } finally {
        submitting.value = false
    }
}

const handleReset = () => {
    formRef.value?.resetFields()
    message.info('Đã đặt lại form.')
}

const handleBack = () => router.push({ name: "evaluation-forms" })
</script>

<style scoped>
/* Input sizing */
:deep(.ant-input-lg),
:deep(.ant-input-number-lg),
:deep(.ant-select-lg .ant-select-selector) {
    @apply !rounded-lg;
}

:deep(.ant-input-number) {
    @apply !w-full;
}

/* Remove default form item margin-bottom override */
:deep(.ant-form-item) {
    margin-bottom: 16px;
}

/* Select dropdown */
:deep(.ant-select-selector) {
    @apply !rounded-lg;
}
</style>