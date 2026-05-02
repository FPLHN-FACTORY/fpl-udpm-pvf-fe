<template>
  <AdminPage>
    <AdminCard title="Thêm mới Quyền người dùng" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <InputForm v-model="formData.code" label="Mã quyền" placeholder="Mã quyền" />
        <InputForm v-model="formData.name" label="Tên quyền" placeholder="Tên quyền" />
        <TextareaForm v-model="formData.description" label="Mô tả quyền" placeholder="Mô tả quyền" :rows="6" />

        <div class="mt-4 flex items-center justify-center gap-4">
          <ButtonAddNoIcon @click="handleSubmit" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import TextareaForm from '../../../atoms/inputs/TextareaForm.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const router = useRouter()

const formData = ref({
  code: '',
  name: '',
  description: ''
})

const handleSubmit = () => {
  console.log('Submit:', formData.value)
  router.push('/system/security/permissions')
}

const resetForm = () => {
  formData.value = {
    code: '',
    name: '',
    description: ''
  }
}
</script>
