<template>
  <AdminPage>
    <AdminCard title="Chi tiết Nhóm quyền người dùng" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon @click="$router.push(`/system/security/roles/edit/${$route.params.id}`)" />
      </template>

      <DetailList :items="details" />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '../../../atoms/buttons/ButtonEditNoIcon.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import DetailList from '../../../molecules/DetailList.vue'
import AdminPage from '../../../templates/AdminPage.vue'

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
