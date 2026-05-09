<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 mb-4 text-[13px]">
      <span class="text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[#A1ACB8]">/</span>
      <span class="text-[#566a7f] font-medium">Yêu cầu rút sinh hoạt phí</span>
    </div>

    <!-- Create Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Card Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-[20px] font-bold text-[#566a7f]">Thêm mới Yêu cầu rút sinh hoạt phí</h1>
        <button
          @click="goBack"
          class="flex items-center gap-1 px-3 py-1.5 bg-[#f1f3f5] text-[#748293] rounded-md text-[13px] font-medium hover:bg-[#e9ecef] transition-all"
        >
          <i class="bx bx-left-arrow-alt text-[16px]"></i>
          Quay Lại
        </button>
      </div>

      <!-- Form Fields -->
      <div class="flex flex-col gap-5">
        <!-- Học viên -->
        <div class="floating-field">
          <label class="floating-label">Học viên</label>
          <a-select
            v-model:value="form.studentId"
            class="w-full field-select"
            placeholder="Chọn học viên"
            show-search
            :filter-option="filterOption"
          >
            <a-select-option value="HV001">HV001 - Nguyễn Văn An</a-select-option>
            <a-select-option value="HV002">HV002 - Trần Thị Bích</a-select-option>
            <a-select-option value="HV003">HV003 - Lê Văn Cường</a-select-option>
          </a-select>
        </div>

        <!-- Số tiền rút -->
        <div class="floating-field">
          <label class="floating-label">Số tiền rút (VNĐ)</label>
          <input
            v-model="form.amount"
            type="number"
            class="field-input"
            placeholder="Nhập số tiền"
          />
        </div>

        <!-- Trạng thái xử lý đơn -->
        <div class="floating-field">
          <label class="floating-label">Trạng thái xử lý đơn</label>
          <a-select
            v-model:value="form.status"
            class="w-full field-select"
          >
            <a-select-option value="processing">Đang xử lý</a-select-option>
            <a-select-option value="approved">Đã duyệt</a-select-option>
            <a-select-option value="rejected">Từ chối</a-select-option>
          </a-select>
        </div>

        <!-- Ghi chú -->
        <div class="floating-field">
          <label class="floating-label">Ghi chú</label>
          <textarea
            v-model="form.note"
            class="field-textarea"
            rows="5"
            placeholder="Nhập ghi chú"
          ></textarea>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-center gap-3 mt-8">
        <button
          class="px-6 py-2 bg-[#ff3e1d] text-white rounded-md text-[14px] font-semibold hover:bg-[#e63617] transition-all shadow-sm"
          @click="handleCreate"
        >
          Thêm Mới
        </button>
        <button
          class="px-6 py-2 bg-[#ffab00] text-white rounded-md text-[14px] font-semibold hover:bg-[#e69a00] transition-all shadow-sm"
          @click="handleReset"
        >
          Đặt Lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const form = reactive({
  studentId: undefined,
  amount: undefined,
  status: 'processing',
  note: ''
})

const goBack = () => {
  router.push({ name: 'expenses-list' })
}

const filterOption = (input: string, option: any) => {
  return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const handleCreate = () => {
  if (!form.studentId) {
    message.warning('Vui lòng chọn học viên')
    return
  }
  if (!form.amount) {
    message.warning('Vui lòng nhập số tiền rút')
    return
  }
  
  console.log('Create form:', form)
  message.success('Thêm mới thành công')
  router.push({ name: 'expenses-list' })
}

const handleReset = () => {
  form.studentId = undefined
  form.amount = undefined
  form.status = 'processing'
  form.note = ''
}
</script>

<style scoped>
/* Floating label wrapper */
.floating-field {
  position: relative;
  border: 1px solid #d9dee3;
  border-radius: 6px;
  padding: 4px 12px 8px;
}

.floating-field:focus-within {
  border-color: #696cff;
}

.floating-label {
  position: absolute;
  top: -9px;
  left: 10px;
  background: white;
  padding: 0 4px;
  font-size: 12px;
  color: #8592a3;
  line-height: 1;
  pointer-events: none;
}

.floating-field:focus-within .floating-label {
  color: #696cff;
}

/* Input inside floating field */
.field-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: #566a7f;
  background: transparent;
  padding: 6px 0;
  height: 36px;
}

.field-input::placeholder {
  color: #a1acb8;
}

/* Select inside floating field */
.field-select :deep(.ant-select-selector) {
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  height: 36px !important;
  background: transparent !important;
}

.field-select :deep(.ant-select-selection-item),
.field-select :deep(.ant-select-selection-placeholder) {
  line-height: 36px !important;
  font-size: 14px !important;
  color: #566a7f !important;
  padding: 0 !important;
}

.field-select :deep(.ant-select-selection-placeholder) {
  color: #a1acb8 !important;
}

.field-select :deep(.ant-select-arrow) {
  color: #8592a3;
}

/* Textarea inside floating field */
.field-textarea {
  width: 100%;
  min-height: 120px;
  border: none;
  outline: none;
  resize: vertical;
  font-size: 14px;
  color: #566a7f;
  background: transparent;
  padding-top: 6px;
  font-family: inherit;
}

.field-textarea::placeholder {
  color: #a1acb8;
}
</style>
