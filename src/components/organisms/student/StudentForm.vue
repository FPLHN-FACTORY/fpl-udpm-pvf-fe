<template>
  <div class="bg-white rounded-md shadow-md border border-none p-8">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-gray-800 m-0">
        {{ isEdit ? 'Chỉnh sửa học viên' : 'Thêm mới Học viên' }}
      </h3>
      <a-button type="default" @click="$emit('back')" class="flex items-center custom-back-btn">
        <ArrowLeftOutlined /> Quay Lại
      </a-button>
    </div>

    <div class="w-full mt-4">
      <!-- Row 1 -->
      <div class="mb-6">
        <div class="floating-wrapper" :class="{ 'has-value': formData.studentId }">
          <a-select 
            v-model:value="formData.studentId" 
            size="large"
            class="custom-input w-full"
            :show-arrow="true"
            show-search
            optionFilterProp="children"
            :placeholder="''"
          >
            <a-select-option value="HD001">TH12345 - Nguyễn Văn An</a-select-option>
            <a-select-option value="HD002">TH12346 - Nguyễn Văn Bình</a-select-option>
            <a-select-option value="HD003">TH12347 - Nguyễn Văn Cường</a-select-option>
          </a-select>
          <label class="floating-label">Học viên</label>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="mb-6">
        <div class="floating-wrapper" :class="{ 'has-value': formData.contractVersion }">
          <a-select 
            v-model:value="formData.contractVersion" 
            size="large"
            class="custom-input w-full"
            show-search
            optionFilterProp="children"
            :placeholder="''"
          >
            <a-select-option value="v2023">Phiên bản hợp đồng 2023</a-select-option>
            <a-select-option value="v2024">Phiên bản hợp đồng 2024</a-select-option>
            <a-select-option value="v2025">Phiên bản hợp đồng 2025</a-select-option>
          </a-select>
          <label class="floating-label">Phiên bản hợp đồng</label>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="floating-wrapper" :class="{ 'has-value': formData.startDate }">
          <a-date-picker 
            v-model:value="formData.startDate" 
            format="DD/MM/YYYY" 
            size="large"
            class="custom-input w-full"
            :placeholder="''"
          />
          <label class="floating-label">Ngày bắt đầu</label>
        </div>
        <div class="floating-wrapper" :class="{ 'has-value': formData.endDate }">
          <a-date-picker 
            v-model:value="formData.endDate" 
            format="DD/MM/YYYY" 
            size="large"
            class="custom-input w-full"
            :placeholder="''"
          />
          <label class="floating-label">Ngày kết thúc</label>
        </div>
      </div>

      <!-- Row 4 -->
      <div class="mb-8">
        <div class="floating-wrapper" :class="{ 'has-value': formData.years !== null && formData.years !== undefined && formData.years !== '' }">
          <a-input-number 
            v-model:value="formData.years" 
            :min="1" 
            :max="10"
            size="large"
            class="custom-input w-full"
            :placeholder="''"
          />
          <label class="floating-label">Số năm</label>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <a-button 
          type="primary" 
          size="large" 
          class="px-8 font-medium custom-submit-btn"
          @click="handleSubmit"
        >
          {{ isEdit ? 'Cập Nhật' : 'Thêm Mới' }}
        </a-button>
        <a-button 
          type="primary" 
          size="large" 
          class="px-8 font-medium custom-reset-btn"
          @click="handleReset"
        >
          Đặt Lại
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import type { Student } from '../../../types/student';

const props = defineProps<{
  mode: 'add' | 'edit';
  initialData?: Student | null;
}>();

const emit = defineEmits(['back', 'submit']);

const isEdit = computed(() => props.mode === 'edit');

const defaultForm = {
  studentId: undefined,
  contractVersion: undefined,
  startDate: null as any,
  endDate: null as any,
  years: null as any
};

const formData = reactive({ ...defaultForm });

const initForm = () => {
  if (isEdit.value && props.initialData) {
    formData.studentId = props.initialData.studentId as any;
    formData.contractVersion = props.initialData.contractVersion as any;
    formData.startDate = props.initialData.startDate ? dayjs(props.initialData.startDate, 'DD/MM/YYYY') : null;
    formData.endDate = props.initialData.endDate ? dayjs(props.initialData.endDate, 'DD/MM/YYYY') : null;
    formData.years = props.initialData.years || null as any;
  } else {
    Object.assign(formData, defaultForm);
  }
};

watch(() => props.initialData, initForm, { immediate: true });

const handleReset = () => {
  initForm();
};

const handleSubmit = () => {
  // Parse back to string format if needed before emitting
  const submitData = {
    ...formData,
    startDate: formData.startDate ? formData.startDate.format('DD/MM/YYYY') : undefined,
    endDate: formData.endDate ? formData.endDate.format('DD/MM/YYYY') : undefined,
  };
  emit('submit', submitData);
};
</script>

<style scoped>
/* Nút Quay Lại */
.custom-back-btn {
  background-color: #EBEDF0 !important;
  color: #8592A3 !important;
  border: none !important;
  border-radius: 4px;
}
.custom-back-btn:hover {
  opacity: 0.8;
}

/* Nút Submit & Reset */
.custom-submit-btn {
  background-color: #E81919 !important;
  border-color: #E81919 !important;
  border-radius: 4px;
}

.custom-reset-btn {
  background-color: #E69A00 !important;
  border-color: #E69A00 !important;
  border-radius: 4px;
}

/* Custom Input Styling (border, text color, radius) */
:deep(.custom-input .ant-select-selector),
:deep(.custom-input.ant-picker),
:deep(.custom-input.ant-input-number) {
  border-color: #CED2D5 !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  height: 48px !important; /* Make inputs a bit taller for floating label */
}

/* Cho phép Select item căn giữa theo chiều cao mới */
:deep(.custom-input .ant-select-selector) {
  align-items: center;
}
:deep(.custom-input .ant-select-selection-item),
:deep(.custom-input .ant-picker-input > input),
:deep(.custom-input .ant-input-number-input) {
  color: #394552 !important;
  line-height: 46px !important;
}

:deep(.custom-input.ant-input-number .ant-input-number-input-wrap) {
  height: 100%;
}
:deep(.custom-input.ant-input-number .ant-input-number-input) {
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
}

/* Floating Label Logic */
.floating-wrapper {
  position: relative;
  width: 100%;
}

.floating-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: #394552;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
  padding: 0 4px;
  font-size: 14px;
}

/* Trạng thái focus hoặc có giá trị */
.floating-wrapper.has-value .floating-label,
.floating-wrapper:focus-within .floating-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  background-color: white;
  color: #656F78;
}

/* Đổi màu icon lịch và icon mũi tên xổ xuống */
:deep(.custom-input.ant-picker .ant-picker-suffix),
:deep(.custom-input .ant-select-arrow) {
  color: #394552;
}

/* Hiển thị luôn nút tăng/giảm của Số năm và đổi màu giống thiết kế */
:deep(.custom-input.ant-input-number .ant-input-number-handler-wrap) {
  opacity: 1 !important;
  background: transparent !important;
  border-left: none !important;
}
:deep(.custom-input.ant-input-number .ant-input-number-handler) {
  border: none !important;
}
:deep(.custom-input.ant-input-number .ant-input-number-handler-up-inner),
:deep(.custom-input.ant-input-number .ant-input-number-handler-down-inner) {
  color: #394552 !important;
}
</style>
