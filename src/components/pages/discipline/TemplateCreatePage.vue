<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mẫu biên bản</span>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <!-- Card Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-xl font-bold text-[#566a7f]">Thêm mới <span class="bg-[#fcf3d7] px-1 rounded">Mẫu biên bản</span></h1>
        <ButtonBack @click="$router.back()" />
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-6 max-w-full">
        <div>
          <InputForm 
            v-model="formData.name"
            placeholder="Tên mẫu biên bản"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <a-select 
              v-model:value="formData.type" 
              placeholder="Loại" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="khien-trach">Khiển trách</a-select-option>
              <a-select-option value="canh-cao">Cảnh cáo</a-select-option>
            </a-select>
          </div>
          <div>
            <a-select 
              v-model:value="formData.level" 
              placeholder="Mức độ" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
            </a-select>
          </div>
        </div>

        <div>
          <a-select 
            v-model:value="formData.status" 
            placeholder="Trạng thái" 
            class="w-full !h-[42px]"
          >
            <a-select-option value="active">Đang hoạt động</a-select-option>
            <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
          </a-select>
        </div>

        <!-- Dynamic Fields Section -->
        <div class="mt-4 border-t border-gray-100 pt-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-[#566a7f]">
              Trường (key) của <span class="bg-[#fcf3d7] px-1 rounded">mẫu biên bản</span>
            </h3>
            <ButtonAdd text="Thêm Trường" @click="addField" />
          </div>
          
          <div class="flex flex-col gap-4">
            <div v-for="(field, index) in templateFields" :key="index" class="flex gap-4 items-center animate-fadeIn">
              <div class="flex-1">
                <InputForm 
                  v-model="field.key" 
                  placeholder="Tên trường (key) của mẫu biên bản" 
                />
              </div>
              <div class="flex-[1.5]">
                <InputForm 
                  v-model="field.content" 
                  placeholder="Nội dung trường (plain text)" 
                />
              </div>
              <button 
                @click="removeField(index)" 
                class="p-2 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors"
                title="Xóa trường"
              >
                <NavIcon name="BxTrash" class-name="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <ButtonSave text="Thêm Mới" @click="handleSubmit" />
          <ButtonReset @click="resetForm" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '../../atoms/inputs/InputForm.vue'
import ButtonAdd from '../../atoms/buttons/ButtonAdd.vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'
import ButtonSave from '../../atoms/buttons/ButtonSave.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const router = useRouter()

interface FormData {
  name: string
  type: string | undefined
  level: string | undefined
  status: string | undefined
}

const formData = ref<FormData>({
  name: '',
  type: undefined,
  level: undefined,
  status: undefined
})

const templateFields = ref([
  { key: '', content: '' }
])

const addField = () => {
  templateFields.value.push({ key: '', content: '' })
}

const removeField = (index: number) => {
  if (templateFields.value.length > 1) {
    templateFields.value.splice(index, 1)
  }
}

const handleSubmit = () => {
  console.log('Submit:', { ...formData.value, fields: templateFields.value })
  router.push('/discipline/templates')
}



const resetForm = () => {
  formData.value = {
    name: '',
    type: undefined,
    level: undefined,
    status: undefined
  }
  templateFields.value = [{ key: '', content: '' }]
}
</script>

<style scoped>
:deep(.ant-input:focus), 
:deep(.ant-input-focused),
:deep(.ant-input:hover) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selector) {
  height: 42px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
