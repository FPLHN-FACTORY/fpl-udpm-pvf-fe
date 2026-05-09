<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới Mẫu biên bản" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <!-- Form -->
      <div class="flex flex-col gap-6 max-w-full">
        <div>
          <InputForm 
            v-model="formData.name"
            label="Tên mẫu biên bản"
            placeholder="Tên mẫu biên bản"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectForm v-model:value="formData.type" label="Loại" placeholder="Loại">
            <a-select-option value="khien-trach">Khiển trách</a-select-option>
            <a-select-option value="canh-cao">Cảnh cáo</a-select-option>
          </SelectForm>
          <SelectForm v-model:value="formData.level" label="Mức độ" placeholder="Mức độ">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
          </SelectForm>
        </div>

        <SelectForm v-model:value="formData.status" label="Trạng thái" placeholder="Trạng thái">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectForm>

        <!-- Dynamic Fields Section -->
        <div class="mt-4 border-t border-gray-100 pt-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-[#566a7f]">
              Trường (key) của <span class="bg-[#fcf3d7] px-1 rounded">mẫu biên bản</span>
            </h3>
            <ButtonAddNoIcon text="Thêm Trường" @click="addField" />
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
          <ButtonSaveNoIcon text="Thêm Mới" @click="handleSubmit" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonSaveNoIcon from '@/components/atoms/buttons/ButtonSaveNoIcon.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Kỷ luật khen thưởng', path: '#' },
  { title: 'Mẫu biên bản', path: '/discipline/templates' },
  { title: 'Thêm mới Mẫu biên bản', path: '#' }
]

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

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
