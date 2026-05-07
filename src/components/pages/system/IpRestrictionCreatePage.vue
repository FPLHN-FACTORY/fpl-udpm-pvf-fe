<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Giới hạn địa chỉ IP</span>
    </div>

    <!-- Create Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm địa chỉ IP được cấp phép</h2>
        <BaseButton 
          class="!bg-[#e7e7ff] !text-[#696cff] !border-none !h-9"
          icon="BxChevronLeft"
          @click="$router.back()"
        >
          Quay Lại
        </BaseButton>
      </div>

      <div class="p-8 flex flex-col gap-6">
        <BaseInput 
          v-model="form.ip" 
          label="Địa chỉ IP" 
          placeholder="Địa chỉ IP"
          class="!h-10"
        />
        
        <BaseTextarea 
          v-model="form.description" 
          label="Mô tả" 
          placeholder="Mô tả"
          :rows="4"
        />

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-[#566a7f]">Trạng thái</label>
          <a-select v-model:value="form.status" placeholder="Trạng thái" class="w-full !h-10">
            <a-select-option value="active">Cho phép</a-select-option>
            <a-select-option value="locked">Tạm khoá</a-select-option>
            <a-select-option value="inactive">Chưa kích hoạt</a-select-option>
          </a-select>
        </div>

        <div class="flex justify-center gap-4 mt-4">
          <BaseButton 
            variant="primary" 
            class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !px-10 !h-10"
            @click="handleSubmit"
          >
            Thêm Mới
          </BaseButton>
          <BaseButton 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !px-10 !h-10"
            @click="handleReset"
          >
            Đặt Lại
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../atoms/BaseButton.vue'
import BaseInput from '../../atoms/BaseInput.vue'
import BaseTextarea from '../../atoms/BaseTextarea.vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  ip: '',
  description: '',
  status: undefined
})

const handleSubmit = () => {
  if (!form.ip.value) {
    message.error('Vui lòng nhập địa chỉ IP')
    return
  }
  message.success('Thêm địa chỉ IP thành công')
  router.push('/system/security/ip-restriction')
}

const handleReset = () => {
  form.value = {
    ip: '',
    description: '',
    status: undefined
  }
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
