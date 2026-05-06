<template>
  <div>
    <div class="p-6 bg-white rounded-xl mb-6 border border-gray-200 shadow-sm">
      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-gray-800 m-0">Chi tiết Môn học ngoại khoá</h2>
        <div class="flex items-center gap-2">
          <a-button @click="handleBack" class="flex items-center">
            <template #icon>
              <LeftOutlined />
            </template>
            Quay Lại
          </a-button>
          <a-button type="primary"
            class="!bg-amber-400 !border-amber-400 hover:!bg-amber-500 hover:!border-amber-500 font-semibold flex items-center"
            @click="handleEdit">
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <!-- Detail Card -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div v-for="(item, index) in detailFields" :key="index"
          class="flex items-center px-6 py-[18px] border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
          <div class="w-72 shrink-0 text-sm font-semibold text-gray-700">
            {{ item.label }}
          </div>
          <div class="flex-1 text-sm text-gray-500">
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LeftOutlined, EditOutlined } from '@ant-design/icons-vue'

interface Props {
  data?: {
    tenLoaiDiem?: string
    trongSo?: number
    thoiGianTao?: string
    thoiGianCapNhat?: string
    trangThai?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    tenLoaiDiem: 'Điểm đánh giá kỹ năng',
    trongSo: 30,
    thoiGianTao: '2025-01-05 08:30:00',
    thoiGianCapNhat: '2026-01-20 10:15:45',
    trangThai: 'Đang áp dụng',
  }),
})

const emit = defineEmits<{
  back: []
  edit: []
}>()

const detailFields = computed(() => [
  {
    label: 'Tên loại điểm',
    value: props.data?.tenLoaiDiem ?? 'Điểm đánh giá kỹ năng',
    isStatus: false,
  },
  {
    label: 'Trọng số tính điểm (%)',
    value: props.data?.trongSo ?? 30,
    isStatus: false,
  },
  {
    label: 'Thời gian tạo',
    value: props.data?.thoiGianTao ?? '2025-01-05 08:30:00',
    isStatus: false,
  },
  {
    label: 'Thời gian cập nhật',
    value: props.data?.thoiGianCapNhat ?? '2026-01-20 10:15:45',
    isStatus: false,
  },
  {
    label: 'Trạng thái',
    value: props.data?.trangThai ?? 'Đang áp dụng',
    isStatus: true,
    statusColor: 'green',
  },
])

const handleBack = () => emit('back')
const handleEdit = () => emit('edit')
</script>