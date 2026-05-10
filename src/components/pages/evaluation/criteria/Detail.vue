<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Đánh giá học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Tiêu chí đánh giá</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Basic Info Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Chi tiết Tiêu chí đánh giá</h2>
        <div class="flex gap-2">
          <ButtonBack @click="$router.push('/evaluation/criteria')" />
          <ButtonEditNoIcon @click="$router.push(`/evaluation/criteria/edit/${$route.params.id}`)" />
        </div>
      </div>

      <DetailList :items="detailItems">
        <template #value-status="{ item }">
          <BaseTag :type="item.value === 'active' ? 'success' : 'default'">
            {{ item.value === 'active' ? 'Đang Hoạt động' : 'Ngừng sử dụng' }}
          </BaseTag>
        </template>
      </DetailList>
      

    </a-card>
  </div>
</template>

<script setup lang="ts">
import BaseTag from '../../../atoms/display/BaseTag.vue'
import ButtonEditNoIcon from '../../../atoms/buttons/ButtonEditNoIcon.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import DetailList from '../../../molecules/DetailList.vue'


const detailItems = [
  { label: 'ID', value: 'HS001' },
  { label: 'Tên tiêu chí', value: 'Thể lực' },
  { label: 'Mô tả', value: 'Đánh giá sức bền, tốc độ và thể trạng' },
  { label: 'Điểm tối đa', value: '10' },
  { label: 'Trọng số', value: '25%' },
  { label: 'Thứ tự hiển thị', value: '1' },
  { label: 'Thời gian tạo', value: '10/01/2025 09:00' },
  { label: 'Thời gian cập nhật', value: '12/01/2025 14:30' },
  { key: 'status', label: 'Thời gian cập nhật', value: 'active' } // Using 'status' slot, wait, the text says "Thời gian cập nhật" but the image shows Trạng thái
]
// Correct the last item label to "Trạng thái"
detailItems[8].label = 'Trạng thái'
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
