<template>
  <AdminPage>
    <AdminCard title="Chi tiết Nhật ký hệ thống" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <DetailList :items="details" />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import AdminCard from '../../../molecules/AdminCard.vue'
import DetailList from '../../../molecules/DetailList.vue'
import AdminPage from '../../../templates/AdminPage.vue'

const details = ref([
  { label: '#', value: '6979' },
  { label: 'Người dùng', value: 'Cristine Easom - ceasomw@theguardian.com' },
  { label: 'Hành động thực hiện', value: 'VIEW' },
  { label: 'Loại đối tượng tác động', value: 'USER' },
  { label: 'Đối tượng tác động', value: 'U001_NguyenVanA' },
  { label: 'Mô tả hành động', value: 'Người dùng xem thông tin chi tiết tài khoản Nguyễn Văn A' },
  { label: 'Thời gian ghi log', value: '2026-01-01 08:00:00' }
])
</script>
