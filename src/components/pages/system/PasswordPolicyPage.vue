<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Chính sách bảo mật</span>
    </div>

    <!-- Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
      <h2 class="text-xl font-bold text-[#566a7f] mb-4">Chính sách mật khẩu</h2>
      <p class="text-[#697a8d] mb-8 leading-relaxed">
        Chính sách mật khẩu là một tập hợp các quy tắc được định nghĩa để tăng cường bảo mật tài khoản và khuyến khích người dùng đặt mật khẩu mạnh.
        Quản lý thiết lập thời gian đổi mật khẩu định kỳ của các tài khoản trên hệ thống.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Độ dài mật khẩu tối thiểu</label>
          <a-input-number v-model:value="policy.minLength" class="w-full !h-10 flex items-center" placeholder="8">
            <template #suffix>
              <NavIcon name="BxShow" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input-number>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lượng ký tự đặc biệt tối thiểu</label>
          <a-input-number v-model:value="policy.minSpecialChars" class="w-full !h-10 flex items-center" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lượng chữ cái hoa tối thiểu</label>
          <a-input-number v-model:value="policy.minUppercase" class="w-full !h-10 flex items-center" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lượng chữ cái thường tối thiểu</label>
          <a-input-number v-model:value="policy.minLowercase" class="w-full !h-10 flex items-center" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lượng số tối thiểu</label>
          <a-input-number v-model:value="policy.minNumbers" class="w-full !h-10 flex items-center" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lần sai liên tiếp tối đa trước khi khóa tài khoản</label>
          <a-input-number v-model:value="policy.maxFailedAttempts" class="w-full !h-10 flex items-center" />
        </div>
      </div>

      <div class="flex flex-col gap-2 mb-6">
        <label class="text-sm text-[#566a7f]">Thời gian hiệu lực của mật khẩu (Từ 1 đến 1000 ngày)</label>
        <a-input-number v-model:value="policy.expiryDays" class="w-full !h-10 flex items-center" />
      </div>

      <div class="mb-8">
        <BaseCheckbox v-model="policy.notifyExpiry">
          <span class="text-[#697a8d]">Gửi thông báo hết hạn mật khẩu tới người dùng</span>
        </BaseCheckbox>
      </div>

      <div class="flex justify-center gap-4">
        <BaseButton 
          variant="primary" 
          class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !px-8 !h-10"
          @click="handleUpdate"
        >
          Cập Nhật
        </BaseButton>
        <BaseButton 
          class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !px-8 !h-10"
          @click="handleReset"
        >
          Đặt Lại
        </BaseButton>
        <BaseButton 
          class="!bg-[#696cff] hover:!bg-[#5f61e6] !text-white !border-none !px-8 !h-10"
          @click="handleResetDefault"
        >
          Đặt Lại Mặc Định
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../atoms/BaseButton.vue'
import BaseCheckbox from '../../atoms/BaseCheckbox.vue'
import NavIcon from '../../atoms/NavIcon.vue'
import { message } from 'ant-design-vue'

const policy = ref({
  minLength: 8,
  minSpecialChars: 1,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  maxFailedAttempts: 5,
  expiryDays: 90,
  notifyExpiry: true
})

const handleUpdate = () => {
  message.success('Cập nhật chính sách mật khẩu thành công')
}

const handleReset = () => {
  // Logic to reset to current saved values
}

const handleResetDefault = () => {
  policy.value = {
    minLength: 8,
    minSpecialChars: 1,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    maxFailedAttempts: 5,
    expiryDays: 90,
    notifyExpiry: true
  }
  message.info('Đã đặt lại về mặc định')
}
</script>

<style scoped>
:deep(.ant-input-number) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
:deep(.ant-input-number-focused) {
  border-color: #696cff !important;
  box-shadow: 0 0 0 2px rgba(105, 108, 255, 0.1) !important;
}
:deep(.ant-input-number-handler-wrap) {
  opacity: 1;
}
</style>
