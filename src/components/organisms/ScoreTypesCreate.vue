<template>
    <div class="">
        <div class="bg-white rounded-2xl shadow-md w-full p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-xl font-bold text-gray-800">Thêm Loại điểm</h2>
                <a-button @click="handleBack" class="flex items-center gap-1 text-gray-500 border-gray-300 rounded-lg">
                    <ArrowLeftOutlined />
                    Quay Lại
                </a-button>
            </div>

            <!-- Form -->
            <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical" class="space-y-5">
                <!-- Tên loại điểm -->
                <a-form-item name="tenLoaiDiem">
                    <a-input v-model:value="formState.tenLoaiDiem" placeholder="Tên loại điểm" size="large"
                        class="rounded-lg border-gray-300" />
                </a-form-item>

                <!-- Trọng số tính điểm -->
                <a-form-item name="trongSo">
                    <a-input v-model:value="formState.trongSo" placeholder="Trọng số tính điểm (%)" size="large"
                        class="rounded-lg border-gray-300" type="number" :min="0" :max="100" />
                </a-form-item>

                <!-- Trạng thái -->
                <a-form-item name="trangThai">
                    <a-select v-model:value="formState.trangThai" placeholder="Trạng thái" size="large"
                        class="w-full rounded-lg" :options="trangThaiOptions" />
                </a-form-item>

                <!-- Buttons -->
                <div class="flex justify-center gap-4 pt-2">
                    <a-button type="primary" size="large" :loading="isSubmitting" @click="handleSubmit"
                        class="px-8 rounded-lg font-semibold" style="background-color: #e53e3e; border-color: #e53e3e;">
                        Thêm Mới
                    </a-button>

                    <a-button size="large" @click="handleReset"
                        class="px-8 rounded-lg font-semibold text-white border-0" style="background-color: #d97706;">
                        Đặt Lại
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

interface FormState {
    tenLoaiDiem: string
    trongSo: string | number
    trangThai: string | undefined
}

const emit = defineEmits<{
    (e: 'back'): void
    (e: 'created', record?: any): void
}>()

const formRef = ref<FormInstance>()
const isSubmitting = ref(false)

const formState = reactive<FormState>({
    tenLoaiDiem: '',
    trongSo: '',
    trangThai: undefined,
})

const trangThaiOptions = [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'inactive' },
]

const rules = {
    tenLoaiDiem: [
        { required: true, message: 'Vui lòng nhập tên loại điểm', trigger: 'blur' },
    ],
    trongSo: [
        { required: true, message: 'Vui lòng nhập trọng số tính điểm', trigger: 'blur' },
    ],
    trangThai: [
        { required: true, message: 'Vui lòng chọn trạng thái', trigger: 'change' },
    ],
}

const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        isSubmitting.value = true
        // TODO: call API here
        console.log('Form data:', { ...formState })
        message.success('Thêm loại điểm thành công!')
        handleReset()
    } catch {
        // validation failed
    } finally {
        isSubmitting.value = false
    }
}

const handleReset = () => {
    formRef.value?.resetFields()
}

const handleBack = () => {
    emit('back')
}
</script>

<style scoped>
:deep(.ant-input),
:deep(.ant-select-selector) {
    border-radius: 0.5rem !important;
    border-color: #d1d5db !important;
    font-size: 0.95rem;
}

:deep(.ant-input:focus),
:deep(.ant-select-focused .ant-select-selector) {
    border-color: #e53e3e !important;
    box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.15) !important;
}

:deep(.ant-btn-primary:hover) {
    background-color: #c53030 !important;
    border-color: #c53030 !important;
}

:deep(.ant-form-item) {
    margin-bottom: 0;
}
</style>