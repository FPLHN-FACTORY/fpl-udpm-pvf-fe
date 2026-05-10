<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Điều chỉnh Địa chỉ IP được cấp phép truy cập" padded title-size="xl">
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
          <ButtonSaveNoIcon text="Cập Nhật" @click="handleSubmit" />
          <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Bảo mật & Phân quyền', path: '#' },
  { title: 'Giới hạn địa chỉ IP', path: '/system/security/ip-restriction' },
  { title: 'Chỉnh sửa', path: '#' }
]

const form = ref({
  ip: '',
  description: '',
  status: undefined as string | undefined
})

onMounted(() => {
  // Giả lập lấy dữ liệu từ API dựa trên route.params.id
  // Trong thực tế, bạn sẽ gọi API ở đây
  form.value = {
    ip: '192.168.1.10',
    description: 'IP nội bộ văn phòng Hà Nội',
    status: 'active'
  }
})

const handleSubmit = () => {
  if (!form.value.ip) {
    message.error('Vui lòng nhập địa chỉ IP')
    return
  }
  message.success('Cập nhật địa chỉ IP thành công')
  router.push('/system/security/ip-restriction')
}

const handleReset = () => {
  // Khôi phục về dữ liệu ban đầu
  form.value = {
    ip: '192.168.1.10',
    description: 'IP nội bộ văn phòng Hà Nội',
    status: 'active'
  }
}
</script>

<style scoped>
</style>
