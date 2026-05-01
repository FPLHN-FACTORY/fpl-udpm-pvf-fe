<template>
  <AdminPage>
    <AdminCard title="Thêm mới Nhóm quyền người dùng" padded title-size="xl">
      <template #actions>
        <BaseButton
          variant="default"
          size="small"
          icon="ChevronLeftIcon"
          class="!border-none !bg-[#eceef1] !px-3 !text-[13px] !text-[#8592a3] hover:!bg-[#daddf1]"
          @click="$router.back()"
        >
          Quay Lại
        </BaseButton>
      </template>

      <div class="flex max-w-full flex-col gap-6">
        <BaseInput v-model="formData.name" placeholder="Tên nhóm quyền" class="!h-[42px] rounded-md !border-[#d9dee3]" />
        <BaseTextarea v-model="formData.description" placeholder="Mô tả nhóm quyền" :rows="6" />

        <div class="mt-4 flex items-center justify-center gap-4">
          <BaseButton
            variant="primary"
            class="!h-[42px] !border-none !bg-[#ff3e1d] !px-8 shadow-md shadow-red-200 hover:!bg-[#e6381a]"
            @click="handleSubmit"
          >
            Thêm Mới
          </BaseButton>
          <BaseButton
            variant="default"
            class="!h-[42px] !border-none !bg-[#ffab00] !px-8 !text-white shadow-md shadow-orange-200 hover:!bg-[#e69a00]"
            @click="resetForm"
          >
            Đặt Lại
          </BaseButton>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../atoms/BaseInput.vue'
import BaseTextarea from '../atoms/BaseTextarea.vue'
import BaseButton from '../atoms/BaseButton.vue'
import AdminCard from '../molecules/AdminCard.vue'
import AdminPage from '../templates/AdminPage.vue'

const router = useRouter()

const formData = ref({
  name: '',
  description: ''
})

const handleSubmit = () => {
  console.log('Submit:', formData.value)
  router.push('/system/security/roles')
}

const resetForm = () => {
  formData.value = {
    name: '',
    description: ''
  }
}
</script>
