<template>
  <AdminPage>
    <AdminCard title="Chi tiết Nhóm quyền người dùng" padded title-size="xl">
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
          @click="$router.push(`/system/security/roles/edit/${$route.params.id}`)"
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
  { label: 'Tên nhóm quyền', value: 'SUPER_ADMIN' },
  { label: 'Mô tả nhóm quyền', value: 'Toàn quyền quản lý hệ thống, người dùng và cấu hình' },
  { label: 'Thời gian tạo nhóm quyền', value: '2026-01-01 08:00:00' },
  { label: 'Thời gian cập nhật nhóm quyền', value: '2026-01-01 08:00:00' }
])

onMounted(() => {
  console.log('Loading details for id:', route.params.id)
})
</script>
