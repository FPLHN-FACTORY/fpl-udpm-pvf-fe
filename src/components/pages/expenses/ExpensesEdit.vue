<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Yêu cầu rút sinh hoạt phí</span>
    </div>

    <!-- 2. Edit Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[14px] font-bold text-[#475569] uppercase">CHỈNH SỬA YÊU CẦU RÚT SINH HOẠT PHÍ</h2>
        <button 
          class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-[13px] flex items-center gap-2 hover:bg-[#7a8593] transition-colors shadow-sm" 
          @click="goBack"
        >
          <i class="bx bx-left-arrow-alt text-lg"></i> Quay Lại
        </button>
      </div>

      <div class="p-[24px]">
        <div class="max-w-[1200px]">
          <!-- Form Group: Status -->
          <div class="mb-6">
            <label class="block text-[13px] text-[#475569] mb-2">Trạng thái xử lý đơn</label>
            <a-select
              v-model:value="form.status"
              placeholder="Chọn trạng thái"
              class="w-full !h-[42px]"
            >
              <a-select-option value="processing">Đang xử lý</a-select-option>
              <a-select-option value="approved">Đã duyệt</a-select-option>
              <a-select-option value="rejected">Từ chối</a-select-option>
            </a-select>
          </div>

          <!-- Form Group: Note -->
          <div class="mb-8">
            <label class="block text-[13px] text-[#475569] mb-2">Ghi chú</label>
            <textarea
              v-model="form.note"
              placeholder="Nhập ghi chú"
              class="w-full h-[120px] p-3 text-[13px] border border-[#d9dee3] rounded-md outline-none focus:border-[#696CFF] transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-center gap-4">
            <button 
              class="px-8 py-2.5 bg-[#ff3e1d] text-white rounded-md text-[14px] font-bold hover:bg-[#e6381a] shadow-sm transition-all"
              @click="handleUpdate"
            >
              Cập Nhật
            </button>
            <button 
              class="px-8 py-2.5 bg-[#ffab00] text-white rounded-md text-[14px] font-bold hover:bg-[#e69a00] shadow-sm transition-all"
              @click="handleReset"
            >
              Đặt Lại
            </button>
          </div>
        </div>
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
  status: 'processing',
  note: 'Ghi chú nội bộ'
})

const goBack = () => {
  router.push({ name: 'expenses-list' })
}

const handleUpdate = () => {
  console.log('Update form:', form)
  message.success('Cập nhật thành công')
  router.push({ name: 'expenses-list' })
}

const handleReset = () => {
  form.status = 'processing'
  form.note = 'Ghi chú nội bộ'
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 42px !important;
  display: flex !important;
  align-items: center !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}

:deep(.ant-select-selection-item) {
  line-height: 40px !important;
  font-size: 13px !important;
  color: #475569 !important;
}
</style>