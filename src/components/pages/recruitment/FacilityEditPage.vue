<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Điều chỉnh Thông tin cơ sở" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm 
          v-model="editForm.name" 
          label="Tên cơ sở đào tạo"
          placeholder="Nhập tên cơ sở đào tạo" 
        />
        <InputForm 
          v-model="editForm.address" 
          label="Địa chỉ cơ sở"
          placeholder="Nhập địa chỉ cơ sở" 
        />
        <InputForm 
          v-model="editForm.contact" 
          label="Thông tin liên hệ"
          placeholder="Nhập số điện thoại / email" 
        />
        <SelectForm 
          v-model:value="editForm.status" 
          label="Trạng thái"
          placeholder="Chọn trạng thái"
        >
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>
        
        <div class="flex items-center justify-center gap-4 mt-4">
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleUpdate" />
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
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Thông tin cơ sở', path: '/recruitment/facility/list' },
  { title: 'Điều chỉnh', path: '#' }
]

const editForm = ref({
  name: 'Cơ sở đào tạo FPT Hà Nội',
  address: 'Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
  contact: '024-7300-1955',
  status: 'active'
})

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
</style>
