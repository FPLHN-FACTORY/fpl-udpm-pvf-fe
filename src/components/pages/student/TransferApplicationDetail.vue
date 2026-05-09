<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Chi tiết Đơn xin chuyển trường" 
    >
      <template #actions>
        <ButtonBack @click="handleBack" />
        <ButtonEditNoIcon @click="handleEdit" />
      </template>

      <div class="px-6 pb-6 pt-4">
        <div class="overflow-hidden rounded-lg border border-gray-100">
          <div
            v-for="(item, index) in details"
            :key="index"
            class="flex min-h-[50px] border-b border-gray-100 last:border-0"
          >
            <!-- Label (Key) -->
            <div class="flex w-1/3 items-center border-r border-gray-100 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f]">
              {{ item.label }}
            </div>
            
            <!-- Value -->
            <div class="flex w-2/3 items-center justify-between p-4 text-[13px] text-[#697a8d]">
              <span>{{ item.value }}</span>
              <a-button 
                v-if="item.hasFile"
                class="!bg-[#eceef1] hover:!bg-[#daddf1] !text-[#8592a3] !border-none !rounded-md !h-[32px] !px-4 font-medium text-[13px] transition-colors"
                @click="handleViewFile(item.value)"
              >
                Xem File
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import { message } from 'ant-design-vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Đơn xin chuyển trường', path: '/student/transfer-request' }
]

// Mock data matching the screenshot
const details = [
  { label: 'ID hồ sơ học tập văn hóa', value: '1', hasFile: false },
  { label: 'Mã học viên', value: 'HV001', hasFile: false },
  { label: 'Họ và tên', value: 'Nguyễn Văn An', hasFile: false },
  { label: 'Đơn xin chuyển trường', value: 'file.pdf', hasFile: true },
  { label: 'Học bạ tiểu học', value: 'file.pdf', hasFile: true },
  { label: 'Giấy xác nhận hoàn thành chương trình tiểu học', value: 'file.pdf', hasFile: true },
  { label: 'Giấy tiếp nhận chuyển trường', value: 'file.pdf', hasFile: true },
  { label: 'Giấy giới thiệu chuyển trường', value: 'file.pdf', hasFile: true },
  { label: 'Mẫu 01', value: 'file.pdf', hasFile: true },
  { label: 'Giấy chứng nhận tốt nghiệp THCS', value: 'file.pdf', hasFile: true },
  { label: 'Bằng tốt nghiệp THPT', value: 'file.pdf', hasFile: true },
  { label: 'Thời gian tạo hồ sơ', value: '10/01/2025 8:00', hasFile: false },
  { label: 'Thời gian cập nhật hồ sơ', value: '10/01/2025 8:00', hasFile: false },
  { label: 'Trạng thái', value: 'Đã duyệt', hasFile: false },
]

const handleBack = () => {
  router.push('/student/transfer-request')
}

const handleEdit = () => {
  message.info('Chỉnh sửa đơn xin chuyển trường')
}

const handleViewFile = (fileName: string) => {
  message.info(`Đang mở file: ${fileName}`)
}
</script>
