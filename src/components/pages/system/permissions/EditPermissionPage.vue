<template>
  <AdminPage>
    <AdminCard title="Cập nhật Quyền người dùng" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <InputForm v-model="formData.code" label="Mã quyền" placeholder="Mã quyền" />
        <InputForm v-model="formData.name" label="Tên quyền" placeholder="Tên quyền" />
        <TextareaForm v-model="formData.description" label="Mô tả quyền" placeholder="Mô tả quyền" :rows="6" />

        <div class="mt-4 flex items-center justify-center gap-4">
          <ButtonSaveNoIcon text="Lưu Thay Đổi" @click="handleUpdate" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import TextareaForm from '../../../atoms/inputs/TextareaForm.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '../../../atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const router = useRouter()

const formData = ref({
  code: '',
  name: '',
  description: ''
})

onMounted(() => {
  formData.value = {
    code: 'USER_VIEW',
    name: 'Xem người dùng',
    description: 'Cho phép xem danh sách và thông tin người dùng'
  }
})

const handleUpdate = () => {
  console.log('Update:', formData.value)
  router.push('/system/security/permissions')
}

const resetForm = () => {
  formData.value = {
    code: 'USER_VIEW',
    name: 'Xem người dùng',
    description: 'Cho phép xem danh sách và thông tin người dùng'
  }
}
</script>
