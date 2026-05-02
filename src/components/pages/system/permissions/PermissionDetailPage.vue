<template>
  <AdminPage>
    <AdminCard title="Chi tiết Quyền người dùng" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon @click="$router.push(`/system/security/permissions/edit/${$route.params.id}`)" />
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
