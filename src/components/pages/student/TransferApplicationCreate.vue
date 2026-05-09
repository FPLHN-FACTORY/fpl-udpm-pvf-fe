<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Thêm mới Đơn xin chuyển trường" 
    >
      <template #actions>
        <ButtonBack @click="handleBack" />
      </template>

      <div class="px-6 pb-8 pt-4">
        <!-- Form Container -->
        <div class="flex flex-col gap-6">
          
          <!-- Row 1: Học viên Select -->
          <div class="w-full">
            <SelectForm
              v-model:value="studentId"
              label="Học viên"
              placeholder="Input"
            >
              <a-select-option value="HV001">HV001 - Nguyễn Văn An</a-select-option>
              <a-select-option value="HV002">HV002 - Trần Thị Bích</a-select-option>
            </SelectForm>
          </div>

          <!-- Upload Fields Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <!-- Upload Item 1 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Đơn xin chuyển trường</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 2 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Học bạ tiểu học</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 3 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Học bạ THCS</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 4 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Giấy xác nhận hoàn thành chương trình tiểu học</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 5 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Giấy tiếp nhận chuyển trường</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 6 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Giấy giới thiệu chuyển trường</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 7 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Giấy chứng nhận tốt nghiệp THCS</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 8 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Bằng tốt nghiệp THPT</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>

            <!-- Upload Item 9 -->
            <a-upload :show-upload-list="false" :before-upload="() => false">
              <div class="upload-field group">
                <label class="floating-label">Mẫu 01</label>
                <span class="truncate pr-2">Input</span>
                <upload-outlined class="icon" />
              </div>
            </a-upload>
          </div>

          <!-- Bottom Actions -->
          <div class="flex justify-center items-center gap-4 mt-6">
            <ButtonAddNoIcon @click="handleSubmit" />
            <ButtonResetYellow text="Đặt Lại" @click="handleReset" />
          </div>

        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'

const router = useRouter()
const studentId = ref<string | undefined>(undefined)

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Đơn xin chuyển trường', path: '/student/transfer-request' }
]

const handleBack = () => {
  router.push('/student/transfer-request')
}

const handleSubmit = () => {
  if (!studentId.value) {
    message.warning('Vui lòng chọn học viên')
    return
  }
  message.success('Thêm mới thành công!')
  router.push('/student/transfer-request')
}

const handleReset = () => {
  studentId.value = undefined
  message.info('Đã đặt lại form')
}
</script>

<style scoped>
:deep(.ant-upload-wrapper), :deep(.ant-upload) {
  width: 100%;
  display: block;
}

.upload-field {
  @apply relative flex items-center justify-between w-full border border-[#d9dee3] rounded-md px-4 h-[42px] cursor-pointer transition-colors bg-white;
}
.upload-field:hover {
  @apply border-[#696cff];
}
.floating-label {
  @apply absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium cursor-pointer;
}
.upload-field span {
  @apply text-[14px] text-gray-400;
}
.upload-field .icon {
  @apply text-[#697a8d] text-[16px];
}
.upload-field:hover .icon {
  @apply text-[#696cff];
}
</style>
