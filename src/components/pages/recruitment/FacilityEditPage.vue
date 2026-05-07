<template>
  <div class="space-y-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumb -->
    <div class="flex items-center text-[13px] text-gray-500 space-x-2 px-1">
      <span>Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span>Cơ sở đào tạo</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-800">Điều chỉnh</span>
    </div>

    <!-- Header Section -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-800">
        Điều chỉnh Cơ sở đào tạo
      </h2>
      <div class="flex items-center space-x-3">
        <a-button @click="handleBack" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md h-9 text-xs font-medium">
          <NavIcon name="BxArrowBack" size="14" />
          <span>Quay Lại</span>
        </a-button>
      </div>
    </div>

    <!-- Edit Form Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8 max-w-4xl mx-auto">
        <a-form layout="vertical" :model="editForm" class="space-y-4">
          <a-form-item label="Tên cơ sở đào tạo">
            <a-input v-model:value="editForm.name" placeholder="Nhập tên cơ sở đào tạo" />
          </a-form-item>
          <a-form-item label="Địa chỉ cơ sở">
            <a-input v-model:value="editForm.address" placeholder="Nhập địa chỉ cơ sở" />
          </a-form-item>
          <a-form-item label="Thông tin liên hệ">
            <a-input v-model:value="editForm.contact" placeholder="Nhập số điện thoại / email" />
          </a-form-item>
          <a-form-item label="Trạng thái">
            <a-select v-model:value="editForm.status" placeholder="Chọn trạng thái">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </a-form-item>
          
          <div class="flex items-center justify-center space-x-3 mt-8">
            <a-button type="primary" danger size="large" class="px-10 rounded-lg bg-[#e31a1a] border-[#e31a1a] h-11 flex items-center" @click="handleUpdate">
              <span class="text-sm font-bold uppercase">Cập Nhật</span>
            </a-button>
            <a-button size="large" class="px-10 rounded-lg bg-[#ffab00] text-white border-[#ffab00] hover:bg-[#e69a00] h-11 flex items-center" @click="handleReset">
              <span class="text-sm font-bold uppercase">Đặt Lại</span>
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../atoms/NavIcon.vue'

const router = useRouter()

const editForm = ref({
  name: 'Cơ sở đào tạo FPT Hà Nội',
  address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
  contact: '024-7300-1955',
  status: 'active'
})

const handleBack = () => {
  router.back()
}

const handleUpdate = () => {
  console.log('Updating facility:', editForm.value)
  router.push('/recruitment/facility/list')
}

const handleReset = () => {
  editForm.value = {
    name: 'Cơ sở đào tạo FPT Hà Nội',
    address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
    contact: '024-7300-1955',
    status: 'active'
  }
}
</script>

<style scoped>
:deep(.ant-btn-primary) {
  box-shadow: none;
}
:deep(.ant-form-item-label label) {
  font-weight: 500;
  color: #4b5563;
}
</style>
