<template>
  <div class="">
    <div class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">

      <!-- Header -->
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-xl font-bold text-gray-800 m-0">Điều chỉnh Loại điểm</h2>
        <a-button @click="handleBack" class="flex items-center gap-2 !bg-[#ebedf0]">
          <template #icon><LeftOutlined /></template>
          Quay Lại
        </a-button>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm px-6 pt-6 pb-8">
        <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">

          <!-- Tên loại điểm -->
          <a-form-item name="tenLoaiDiem" class="floating-field">
            <div class="field-wrapper">
              <label class="field-label">Tên loại điểm</label>
              <a-input
                v-model:value="formState.tenLoaiDiem"
                class="field-input"
                :style="{ borderWidth: '0px' }"
                size="large"
              />
            </div>
          </a-form-item>

          <!-- Trọng số tính điểm -->
          <a-form-item name="trongSo" class="floating-field">
            <div class="field-wrapper">
              <label class="field-label">Trọng số tính điểm (%)</label>
              <a-input-number
                v-model:value="formState.trongSo"
                :min="0"
                :max="100"
                :controls="false"
                class="field-input !w-full"
                size="large"
              />
            </div>
          </a-form-item>

          <!-- Trạng thái -->
          <a-form-item name="trangThai" class="floating-field">
            <div class="field-wrapper">
              <label class="field-label">Trạng thái</label>
              <a-select
                v-model:value="formState.trangThai"
                class="field-select"
                size="large"
              >
                <a-select-option value="Đang áp dụng">Đang áp dụng</a-select-option>
                <a-select-option value="Không áp dụng">Không áp dụng</a-select-option>
              </a-select>
            </div>
          </a-form-item>

          <!-- Actions -->
          <div class="flex justify-center gap-3 mt-6">
            <a-button
              type="primary"
              size="large"
              class="!bg-red-500 !border-red-500 hover:!bg-red-600 hover:!border-red-600 !font-semibold !px-6 !rounded-lg"
              @click="handleSubmit"
            >
              Thêm Mới
            </a-button>
            <a-button
              size="large"
              class="!bg-amber-400 !border-amber-400 hover:!bg-amber-500 hover:!border-amber-500 !text-white !font-semibold !px-6 !rounded-lg flex items-center gap-2"
              @click="handleReset"
            >
              Đặt Lại
            </a-button>
          </div>

        </a-form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import type { ScoreTypeRecord } from '../pages/ScoreTypesPage.vue'

interface FormState {
  tenLoaiDiem: string
  trongSo: number | null
  trangThai: string
}

const formRef = ref<FormInstance>()

const formState = reactive<FormState>({
  tenLoaiDiem: 'Điểm đánh giá kỹ năng',
  trongSo: 30,
  trangThai: 'Đang áp dụng',
})

const rules = {
  tenLoaiDiem: [{ required: true, message: 'Vui lòng nhập tên loại điểm', trigger: 'blur' }],
  trongSo: [{ required: true, message: 'Vui lòng nhập trọng số tính điểm', trigger: 'blur' }],
  trangThai: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'change' }],
}

const emit = defineEmits<{
  back: []
  submit: [data: FormState]
}>()

const handleBack = () => emit('back')

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    emit('submit', { ...formState })
  } catch {
    // validation failed
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<style scoped>
/* Remove bottom margin on form items */
.floating-field {
  margin-bottom: 16px !important;
}

/* Wrapper: relative so the label can sit on the border */
.field-wrapper {
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 8px 12px 6px;
  transition: border-color 0.2s;
}

.field-wrapper:focus-within {
  border-color: #4096ff;
}

/* Floating label sitting on top of the border */
.field-label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #fff;
  padding: 0 4px;
  font-size: 12px;
  color: #888;
  line-height: 1;
  pointer-events: none;
}

/* Strip Ant Design's own border/background from inputs inside wrapper */
.field-input :deep(.ant-input),
.field-input :deep(.ant-input-number-input) {
  border: none !important;
  border-width: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  background: transparent !important;
  font-size: 14px;
  color: #1a1a1a;
}

/* Also strip the outer ant-input wrapper border (this causes the double border) */
.field-input :deep(.ant-input-affix-wrapper),
.field-input :deep(.ant-input-outlined) {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  padding: 0 !important;
}

.field-input :deep(.ant-input-affix-wrapper:focus),
.field-input :deep(.ant-input-affix-wrapper-focused),
.field-input :deep(.ant-input-outlined:focus) {
  box-shadow: none !important;
  border: none !important;
}

.field-input :deep(.ant-input:focus),
.field-input :deep(.ant-input-number-input:focus) {
  outline: none !important;
  box-shadow: none !important;
}

:deep(.ant-input-number) {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  width: 100%;
}

:deep(.ant-input-number-focused) {
  box-shadow: none !important;
}

/* Select: strip Ant Design border */
.field-select :deep(.ant-select-selector) {
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  background: transparent !important;
  font-size: 14px;
  color: #1a1a1a;
}

.field-select :deep(.ant-select-focused .ant-select-selector) {
  box-shadow: none !important;
}

.field-select :deep(.ant-select-arrow) {
  right: 0;
}
</style>