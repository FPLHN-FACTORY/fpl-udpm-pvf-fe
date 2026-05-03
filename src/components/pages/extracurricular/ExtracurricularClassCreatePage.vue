<template>
  <div class="space-y-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumb -->
    <div class="flex items-center text-[13px] text-gray-500 space-x-2 px-1">
      <span>Quản lý học tập ngoại khóa</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Lớp học ngoại khóa</span>
    </div>

    <!-- Header Section -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <h2 class="text-lg font-bold text-[#566a7f]">
        Thêm mới Lớp học ngoại khóa
      </h2>
      <div class="flex items-center space-x-3">
        <a-button @click="handleBack" class="flex items-center space-x-2 border-gray-300 text-gray-600 rounded-md h-9 text-xs font-medium">
          <NavIcon name="BxArrowBack" size="14" />
          <span>Quay Lại</span>
        </a-button>
      </div>
    </div>

    <!-- Create Form Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8 max-w-5xl mx-auto">
        <a-form layout="vertical" :model="createForm" class="space-y-6">
          <a-form-item label="Tên lớp">
            <a-input v-model:value="createForm.name" placeholder="UT1301" class="!h-10 rounded-md" />
          </a-form-item>
          
          <a-form-item label="Môn">
            <a-select v-model:value="createForm.subject" placeholder="Chọn môn" class="w-full !h-10">
              <a-select-option value="tamly">Tâm lý thi đấu</a-select-option>
              <a-select-option value="kynang">Kỹ năng mềm</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Địa điểm">
            <a-select v-model:value="createForm.location" placeholder="Chọn địa điểm" class="w-full !h-10">
              <a-select-option value="p1">Phòng học 1</a-select-option>
              <a-select-option value="p2">Phòng học 2</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Giáo viên phụ trách">
            <a-select v-model:value="createForm.teacher" placeholder="Chọn giáo viên" class="w-full !h-10">
              <a-select-option value="t1">Nguyễn Văn Hùng</a-select-option>
              <a-select-option value="t2">Trần Minh Tuấn</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Sỹ số tối đa">
            <a-input-number v-model:value="createForm.maxSize" class="w-full !h-10 flex items-center" :min="1" />
          </a-form-item>

          <a-form-item label="Trạng thái">
            <a-select v-model:value="createForm.status" placeholder="Chọn trạng thái" class="w-full !h-10">
              <a-select-option value="open">Đang mở</a-select-option>
              <a-select-option value="closed">Đã đóng</a-select-option>
            </a-select>
          </a-form-item>
          
          <div class="flex items-center justify-center space-x-3 mt-8">
            <a-button type="primary" danger size="large" class="px-10 rounded-md bg-[#e31a1a] border-[#e31a1a] h-11 flex items-center" @click="handleCreate">
              <span class="text-sm font-bold uppercase">Thêm Mới</span>
            </a-button>
            <a-button size="large" class="px-10 rounded-md bg-[#ffab00] text-white border-[#ffab00] hover:bg-[#e69a00] h-11 flex items-center" @click="handleReset">
              <span class="text-sm font-bold uppercase">Đặt Lại</span>
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../atoms/NavIcon.vue'

const router = useRouter()

const createForm = ref({
  name: '',
  subject: undefined,
  location: undefined,
  teacher: undefined,
  maxSize: 32,
  status: 'open'
})

const handleBack = () => {
  router.back()
}

const handleCreate = () => {
  console.log('Creating class:', createForm.value)
  router.push('/extracurricular/classes/list')
}

const handleReset = () => {
  createForm.value = {
    name: '',
    subject: undefined,
    location: undefined,
    teacher: undefined,
    maxSize: 32,
    status: 'open'
  }
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
:deep(.ant-input-number-handler-wrap) {
  border-radius: 0 6px 6px 0;
}
:deep(.ant-form-item-label label) {
  font-weight: 500;
  color: #566a7f;
}
</style>
