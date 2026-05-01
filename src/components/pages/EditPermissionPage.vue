<template>
  <AdminPage>
    <AdminCard title="Cập nhật Quyền người dùng" padded title-size="xl">
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
        <BaseInput v-model="formData.code" label="Mã quyền" placeholder="Mã quyền" class="!h-[42px] rounded-md !border-[#d9dee3]" />
        <BaseInput v-model="formData.name" label="Tên quyền" placeholder="Tên quyền" class="!h-[42px] rounded-md !border-[#d9dee3]" />
        <BaseTextarea v-model="formData.description" label="Mô tả quyền" placeholder="Mô tả quyền" :rows="6" />

        <div class="mt-4 flex items-center justify-center gap-4">
          <BaseButton
            variant="primary"
            class="!h-[42px] !border-none !bg-[#ff3e1d] !px-8 shadow-md shadow-red-200 hover:!bg-[#e6381a]"
            @click="handleUpdate"
          >
            Lưu Thay Đổi
          </BaseButton>
          <BaseButton
            variant="default"
            class="!h-[42px] !border-none !bg-[#ffab00] !px-8 !text-white shadow-md shadow-orange-200 hover:!bg-[#e69a00]"
            @click="$router.back()"
          >
            Hủy Bỏ
          </BaseButton>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../atoms/BaseInput.vue'
import BaseTextarea from '../atoms/BaseTextarea.vue'
import BaseButton from '../atoms/BaseButton.vue'
import AdminCard from '../molecules/AdminCard.vue'
import AdminPage from '../templates/AdminPage.vue'

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
</script>
