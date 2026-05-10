<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Chính sách đăng nhập</span>
    </div>

    <!-- Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
      <h2 class="text-xl font-bold text-[#566a7f] mb-4">Chính sách đăng nhập</h2>
      <p class="text-[#697a8d] mb-8 leading-relaxed">
        Chính sách đăng nhập cài đặt chặn người dùng đăng nhập khi có quá nhiều lần đăng nhập không thành công.
      </p>

      <div class="flex flex-col gap-6 mb-8">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Số lần đăng nhập thất bại sẽ chặn người dùng</label>
          <a-input-number v-model:value="policy.maxFailedAttempts" class="w-full !h-10 flex items-center" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-[#566a7f]">Thời gian chặn người dùng đăng nhập</label>
          <a-input-number v-model:value="policy.blockDuration" class="w-full !h-10 flex items-center" />
        </div>
      </div>

      <div class="mb-10">
        <h3 class="text-md font-semibold text-[#566a7f] mb-4">Tùy chọn</h3>
        <a-radio-group v-model:value="policy.notificationOption" class="flex flex-col gap-4">
          <a-radio value="email">
            <span class="text-[#697a8d]">Nhập email khi thành viên bị chặn</span>
          </a-radio>
          <a-radio value="none">
            <span class="text-[#697a8d]">Đừng thông báo cho tôi</span>
          </a-radio>
        </a-radio-group>
      </div>

      <div class="flex justify-center gap-4">
        <ButtonSaveNoIcon text="Cập Nhật" @click="handleUpdate" />
        <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        <ButtonResetDefault text="Đặt Lại Mặc Định" @click="handleResetDefault" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import ButtonResetDefault from '@/components/atoms/buttons/ButtonResetDefault.vue'

const policy = ref({
  maxFailedAttempts: 5,
  blockDuration: 30,
  notificationOption: 'email'
})

const handleUpdate = () => {
  message.success('Cập nhật chính sách đăng nhập thành công')
}

const handleReset = () => {
  // Logic to reset
}

const handleResetDefault = () => {
  policy.value = {
    maxFailedAttempts: 5,
    blockDuration: 30,
    notificationOption: 'email'
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
:deep(.ant-radio-inner) {
  border-color: #d9dee3 !important;
}
:deep(.ant-radio-checked .ant-radio-inner) {
  border-color: #696cff !important;
  background-color: #696cff !important;
}
</style>
