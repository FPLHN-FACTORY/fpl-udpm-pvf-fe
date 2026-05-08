<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Kỷ luật khen thưởng</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#A1ACB8]">Quyết định kỷ luật</span>
    </div>

    <!-- Form Card - Đã bỏ max-w-5xl để khung to ra hết cỡ giống ảnh 3 và 4 -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9] w-full overflow-hidden">
      <div class="px-[22px] py-[16px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[16px] font-bold text-[#475569]">
          {{ isEdit ? 'Chỉnh sửa Quyết định kỷ luật' : 'Thêm mới Quyết định kỷ luật' }}
        </h2>
        <button 
            @click="$router.back()" 
            class="group flex items-center gap-2 px-4 py-2 bg-[#f1f3f5] text-[#748293] rounded-lg font-medium hover:bg-[#e9ecef] transition-all duration-200"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
  
                <span class="text-[15px]">Quay Lại</span>
        </button>
      </div>

      <div class="p-[22px]">
        <!-- Container chính -->
        <div class="flex flex-col gap-[18px]">
          
          <!-- Học viên -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label">Học viên</label>
            <a-select 
              v-model:value="formData.studentId" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Học viên' : 'Input'" 
              :options="studentOptions" 
            />
          </div>

          <!-- Mẫu biên bản -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label">Mẫu biên bản</label>
            <a-select 
              v-model:value="formData.templateId" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Mẫu biên bản' : 'Input'" 
              :options="templateOptions" 
            />
          </div>

          <!-- Ngày quyết định -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label">Ngày quyết định</label>
            <a-date-picker 
              v-model:value="formData.decisionDate" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Ngày quyết định' : 'Input'" 
              format="DD/MM/YYYY" 
            />
          </div>

          <!-- Người quyết định -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label">Người quyết định</label>
            <a-select 
              v-model:value="formData.createdBy" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Người quyết định' : 'Input'" 
              :options="userOptions" 
            />
          </div>

          <!-- Lý do kỷ luật -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label label-textarea">Lý do kỷ luật</label>
            <a-textarea 
              v-model:value="formData.reason" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Lý do kỷ luật' : 'Lý do kỷ luật'" 
              :rows="4" 
            />
          </div>

          <!-- Trạng thái -->
          <div class="form-group">
            <label v-if="isEdit" class="edit-label">Trạng thái</label>
            <a-select 
              v-model:value="formData.status" 
              class="w-full custom-input" 
              :placeholder="!isEdit ? 'Trạng thái' : 'Input'"
            >
              <a-select-option value="active">Đã ban hành</a-select-option>
              <a-select-option value="pending">Chờ duyệt</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-center gap-3 mt-10">
          <button class="btn-submit" @click="handleSubmit">
            {{ isEdit ? 'Cập Nhật' : 'Thêm Mới' }}
          </button>
          <button class="btn-reset" @click="handleReset">Đặt Lại</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface DisciplineFormData {
  studentId: number | undefined;
  templateId: number | undefined;
  decisionDate: any;
  createdBy: number | undefined;
  reason: string;
  status: string;
}

const router = useRouter()
const route = useRoute()
const isEdit = computed(() => !!route.params.id)

const formData = reactive<DisciplineFormData>({
  studentId: undefined,
  templateId: undefined,
  decisionDate: null,
  createdBy: undefined,
  reason: '',
  status: 'active'
})

const studentOptions = [{ value: 1, label: 'Nguyễn Văn An' }]
const templateOptions = [{ value: 1, label: 'BB Khiển trách' }]
const userOptions = [{ value: 1, label: 'Nguyễn Minh Quân' }]

onMounted(() => {
  if (isEdit.value) {
    formData.studentId = 1
    formData.reason = 'Lý do kỷ luật'
  }
})

const handleReset = () => { 
  Object.assign(formData, { 
    studentId: undefined, 
    templateId: undefined, 
    decisionDate: null, 
    createdBy: undefined, 
    reason: '', 
    status: 'active' 
  }) 
}

const handleSubmit = () => { console.log('Submit:', formData) }
</script>

<style scoped>
.form-group {
  position: relative;
  width: 100%;
}

.edit-label {
  position: absolute;
  top: -9px;
  left: 10px;
  z-index: 2;
  background-color: white;
  padding: 0 6px;
  font-size: 12px;
  color: #a1acb8;
  pointer-events: none;
}

.custom-input :deep(.ant-select-selector),
.custom-input:deep(.ant-input),
.custom-input:deep(.ant-picker) {
  height: 44px !important; /* Tăng chiều cao giống ảnh mẫu */
  border-radius: 6px !important;
  border: 1px solid #d9dee3 !important;
  box-shadow: none !important;
  transition: all 0.2s;
  display: flex !important;
  align-items: center !important;
}

.custom-input:deep(textarea.ant-input) {
  height: auto !important;
  padding: 8px 12px !important;
}

:deep(.ant-select-selection-placeholder),
:deep(.ant-input::placeholder),
:deep(.ant-picker-input > input::placeholder) {
  color: #566a7f !important;
  opacity: 1;
}

.custom-input:deep(.ant-select-selector:hover),
.custom-input:deep(.ant-input:hover),
.custom-input:deep(.ant-picker:hover) {
  border-color: #696cff !important;
}

.btn-submit {
  padding: 10px 32px;
  background: #ff3e1d;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.btn-reset {
  padding: 10px 32px;
  background: #ffab00;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
</style>