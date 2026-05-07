<template>
  <AdminPage>
    <AdminCard title="Cập nhật Nhóm quyền người dùng" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <InputForm v-model="formData.name" label="Tên nhóm quyền" placeholder="Nhập tên nhóm quyền" />
        <TextareaForm v-model="formData.description" label="Mô tả nhóm quyền" placeholder="Nhập mô tả nhóm quyền" :rows="6" />

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
import { useRouter, useRoute } from 'vue-router'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import TextareaForm from '../../../atoms/inputs/TextareaForm.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '../../../atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const router = useRouter()
const route = useRoute()

const formData = ref({
  name: '',
  description: ''
})

onMounted(() => {
  if (route.params.id) {
    formData.value = {
      name: 'Administrator',
      description: 'Nhóm quyền có toàn quyền quản trị hệ thống PVF.'
    }
  }
})

const handleUpdate = () => {
  console.log('Update:', formData.value)
  router.push('/system/security/roles')
}

const resetForm = () => {
  formData.value = {
    name: 'Administrator',
    description: 'Nhóm quyền có toàn quyền quản trị hệ thống PVF.'
  }
}
</script>
