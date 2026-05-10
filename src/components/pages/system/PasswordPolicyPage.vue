<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chính sách mật khẩu" padded>
      <p class="text-[#697a8d] mb-8 leading-relaxed">
        Chính sách mật khẩu là một tập hợp các quy tắc được định nghĩa để tăng cường bảo mật tài khoản và khuyến khích người dùng đặt mật khẩu mạnh.
        Quản lý thiết lập thời gian đổi mật khẩu định kỳ của các tài khoản trên hệ thống.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputForm v-model="policy.minLength" type="number" label="Độ dài mật khẩu tối thiểu" placeholder="8" />
        <InputForm v-model="policy.minSpecialChars" type="number" label="Số lượng ký tự đặc biệt tối thiểu" />
        <InputForm v-model="policy.minUppercase" type="number" label="Số lượng chữ cái hoa tối thiểu" />
        <InputForm v-model="policy.minLowercase" type="number" label="Số lượng chữ cái thường tối thiểu" />
        <InputForm v-model="policy.minNumbers" type="number" label="Số lượng số tối thiểu" />
        <InputForm v-model="policy.maxFailedAttempts" type="number" label="Số lần sai liên tiếp tối đa trước khi khóa tài khoản" />
      </div>

      <div class="mb-6">
        <InputForm v-model="policy.expiryDays" type="number" label="Thời gian hiệu lực của mật khẩu (Từ 1 đến 1000 ngày)" />
      </div>

      <div class="mb-8">
        <a-checkbox v-model:checked="policy.notifyExpiry">
          <span class="text-[#697a8d]">Gửi thông báo hết hạn mật khẩu tới người dùng</span>
        </a-checkbox>
      </div>

      <div class="flex justify-center gap-4">
        <ButtonSaveNoIcon text="Cập Nhật" @click="handleUpdate" />
        <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        <ButtonReset text="Đặt Lại Mặc Định" @click="handleResetDefault" />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const breadcrumbs = [
  { title: 'Bảo mật & Phân quyền', path: '#' },
  { title: 'Chính sách bảo mật', path: '/system/security/password-policy' }
]

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
</style>
