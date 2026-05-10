<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm địa chỉ IP được cấp phép" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex flex-col gap-6 max-w-full mt-4">
        <InputForm 
          v-model="form.ip" 
          label="Địa chỉ IP"
          placeholder="Địa chỉ IP"
        />
        
        <TextareaForm 
          v-model="form.description" 
          label="Mô tả"
          placeholder="Mô tả"
          :rows="4"
        />

        <SelectForm v-model:value="form.status" label="Trạng thái" placeholder="Trạng thái">
          <a-select-option value="active">Cho phép</a-select-option>
          <a-select-option value="locked">Tạm khoá</a-select-option>
          <a-select-option value="inactive">Chưa kích hoạt</a-select-option>
        </SelectForm>

        <div class="flex justify-center gap-4 mt-4">
          <ButtonAddNoIcon text="Thêm Mới" @click="handleSubmit" />
          <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Bảo mật & Phân quyền', path: '#' },
  { title: 'Giới hạn địa chỉ IP', path: '/system/security/ip-restriction' },
  { title: 'Thêm mới', path: '#' }
]

const form = ref({
  ip: '',
  description: '',
  status: undefined
})

const handleSubmit = () => {
  if (!form.value.ip) {
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
</style>
