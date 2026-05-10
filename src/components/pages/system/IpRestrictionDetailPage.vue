<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thông tin chi tiết địa chỉ IP" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon text="Chỉnh Sửa" @click="$router.push(`/system/security/ip-restriction/edit/1`)" />
      </template>

      <DetailList :items="detailItems">
        <template #value-status="{ item }">
          <BaseTag :type="item.value === 'Cho phép' ? 'success' : 'default'">
            {{ item.value }}
          </BaseTag>
        </template>
      </DetailList>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import DetailList from '@/components/molecules/DetailList.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'

const breadcrumbs = [
  { title: 'Bảo mật & Phân quyền', path: '#' },
  { title: 'Giới hạn địa chỉ IP', path: '/system/security/ip-restriction' },
  { title: 'Chi tiết', path: '#' }
]

const detailItems = computed(() => [
  { key: 'ip', label: 'Địa chỉ IP', value: '192.168.1.10' },
  { key: 'description', label: 'Mô tả', value: 'IP nội bộ văn phòng Hà Nội' },
  { key: 'status', label: 'Trạng thái', value: 'Cho phép' }
])
</script>

<style scoped>
</style>
