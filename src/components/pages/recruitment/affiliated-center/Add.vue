<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý tuyển sinh</a-breadcrumb-item>
      <a-breadcrumb-item>Trung tâm liên kết</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Add Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Thêm mới Trung tâm liên kết</h2>
        <ButtonBack @click="$router.back()" />
      </div>

      <!-- Form Section -->
      <div class="space-y-7 pb-10">
        <InputForm v-model="form.name" label="Tên trung tâm liên kết" placeholder="Nhập tên trung tâm" />
        
        <SelectForm v-model:value="form.facilityId" label="Cơ sở đào tạo">
          <a-select-option value="1">Cơ sở đào tạo FPT Hà Nội</a-select-option>
        </SelectForm>

        <InputForm v-model="form.address" label="Địa chỉ trung tâm" placeholder="Nhập địa chỉ" />
        
        <InputForm v-model="form.contact" label="Thông tin liên hệ" placeholder="Nhập số điện thoại" />

        <SelectForm v-model:value="form.status" label="Trạng thái">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>

        <!-- Submit Buttons -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <ButtonAddNoIcon />
          <ButtonResetYellow @click="Object.assign(form, { name: '', facilityId: undefined, address: '', contact: '', status: undefined })" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'

// Form State
const form = reactive({
  name: '',
  facilityId: undefined,
  address: '',
  contact: '',
  status: undefined
})
</script>
