<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới Thông tin cơ sở" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm 
          v-model="createForm.name" 
          label="Tên cơ sở đào tạo"
          placeholder="Nhập tên cơ sở đào tạo" 
        />
        <InputForm 
          v-model="createForm.address" 
          label="Địa chỉ cơ sở"
          placeholder="Nhập địa chỉ cơ sở" 
        />
        <InputForm 
          v-model="createForm.contact" 
          label="Thông tin liên hệ"
          placeholder="Nhập số điện thoại / email" 
        />
        <SelectForm 
          v-model:value="createForm.status" 
          label="Trạng thái"
          placeholder="Chọn trạng thái"
        >
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>
        
        <div class="flex items-center justify-center gap-4 mt-4">
          <ButtonAddNoIcon text="Thêm Mới" @click="handleCreate" />
          <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Thông tin cơ sở', path: '/recruitment/facility/list' },
  { title: 'Thêm mới', path: '#' }
]

const createForm = ref({
  name: '',
  address: '',
  contact: '',
  status: 'active'
})

const handleCreate = () => {
  // Logic to add new facility
  console.log('Creating facility:', createForm.value)
  router.push('/recruitment/facility/list')
}

const handleReset = () => {
  createForm.value = {
    name: '',
    address: '',
    contact: '',
    status: 'active'
  }
}
</script>

<style scoped>
</style>
