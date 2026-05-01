<template>
  <AdminPage>
    <AdminCard title="Chi tiết Quyền người dùng" padded title-size="xl">
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
        <BaseButton
          variant="default"
          size="small"
          class="!border-none !bg-[#ffab00] !px-4 !text-[13px] !text-white hover:!bg-[#e69a00]"
          @click="$router.push(`/system/security/permissions/edit/${$route.params.id}`)"
        >
          Chỉnh Sửa
        </BaseButton>
      </template>

      <DetailList :items="details" />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../atoms/BaseButton.vue'
import AdminCard from '../molecules/AdminCard.vue'
import DetailList from '../molecules/DetailList.vue'
import AdminPage from '../templates/AdminPage.vue'

const route = useRoute()

const details = ref([
  { label: 'Mã quyền', value: 'USER_VIEW' },
  { label: 'Tên quyền', value: 'Xem người dùng' },
  { label: 'Mô tả quyền', value: 'Cho phép xem danh sách và thông tin người dùng' },
  { label: 'Thời gian tạo quyền', value: '2026-01-01 08:00:00' },
  { label: 'Thời gian cập nhật quyền', value: '2026-01-01 08:00:00' }
])

onMounted(() => {
  console.log('Loading details for id:', route.params.id)
})
</script>
