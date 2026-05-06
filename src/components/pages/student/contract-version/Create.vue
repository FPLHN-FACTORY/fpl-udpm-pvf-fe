<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Phiên bản hợp đồng</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mb-10">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Thêm mới Phiên bản hợp đồng</h2>
        <ButtonBack @click="$router.push('/student/contract-version')" />
      </div>

      <div class="max-w-4xl space-y-6">
        <!-- Basic Info -->
        <div class="space-y-4">
          <InputForm v-model="form.name" placeholder="Tên phiên bản hợp đồng" />
          
          <SelectForm v-model="form.type" placeholder="Loại hợp đồng" :options="typeOptions" />
          
          <div class="grid grid-cols-2 gap-4">
            <div class="relative">
              <a-date-picker 
                v-model:value="form.startDate" 
                placeholder="Ngày bắt đầu áp dụng phiên bản" 
                class="!w-full !h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
              />
            </div>
            <div class="relative">
              <a-date-picker 
                v-model:value="form.endDate" 
                placeholder="Ngày kết thúc áp dụng phiên bản" 
                class="!w-full !h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
              />
            </div>
          </div>

          <SelectForm v-model="form.status" placeholder="Trạng thái" :options="statusOptions" />
        </div>

        <!-- Terms Section -->
        <div class="pt-6 mt-8 border-t border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[17px] font-bold text-gray-700 m-0">Các điều khoản, quyền lợi, nghĩa vụ, ...</h3>
            <a-button type="primary" class="!bg-[#71DD37] hover:!bg-[#65c731] !border-none !rounded-md font-medium px-4" @click="addTerm">
              Thêm Điều Khoản
            </a-button>
          </div>
          <div class="space-y-3">
            <div v-for="(term, index) in form.terms" :key="index" class="flex gap-4 items-start">
              <div class="flex-1">
                <InputForm v-model="term.name" placeholder="Tên điều khoản, quyền lợi, nghĩa vụ, ..." />
              </div>
              <div class="flex-1">
                <InputForm v-model="term.desc" placeholder="Nội dung chi tiết" />
              </div>
              <button @click="removeTerm(index)" class="text-gray-400 hover:text-red-500 mt-2 transition-colors">
                <NavIcon name="BxTrash" size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Allowance Section -->
        <div class="pt-6 mt-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[17px] font-bold text-gray-700 m-0">Trợ cấp</h3>
            <a-button type="primary" class="!bg-[#71DD37] hover:!bg-[#65c731] !border-none !rounded-md font-medium px-4" @click="addAllowance">
              Thêm Trợ Cấp
            </a-button>
          </div>
          <div class="space-y-3">
            <div v-for="(allowance, index) in form.allowances" :key="index" class="flex gap-4 items-start">
              <div class="flex-1 relative">
                <a-date-picker 
                  v-model:value="allowance.year" 
                  picker="year"
                  placeholder="Năm áp dụng trợ cấp" 
                  class="!w-full !h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
                />
              </div>
              <div class="flex-1">
                <InputForm v-model="allowance.amount" placeholder="Số tiền trợ cấp" />
              </div>
              <button @click="removeAllowance(index)" class="text-gray-400 hover:text-red-500 mt-2 transition-colors">
                <NavIcon name="BxTrash" size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Equipment Section -->
        <div class="pt-6 mt-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[17px] font-bold text-gray-700 m-0">Dụng cụ của phiên bản hợp đồng</h3>
            <a-button type="primary" class="!bg-[#71DD37] hover:!bg-[#65c731] !border-none !rounded-md font-medium px-4" @click="addEquipment">
              Thêm Dụng Cụ
            </a-button>
          </div>
          <div class="space-y-3">
            <div v-for="(equipment, index) in form.equipments" :key="index" class="flex gap-4 items-start">
              <div class="flex-1">
                <SelectForm v-model="equipment.type" placeholder="Chọn Dụng cụ" :options="equipmentOptions" />
              </div>
              <div class="flex-1 relative">
                <a-date-picker 
                  v-model:value="equipment.year" 
                  picker="year"
                  placeholder="Năm áp dụng dụng cụ" 
                  class="!w-full !h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
                />
              </div>
              <div class="flex-1 relative">
                <div class="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    v-model="equipment.qty"
                    placeholder="Số lượng dụng cụ"
                    class="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-[#d9dee3] focus:ring-2 focus:ring-inset focus:ring-[#696cff] sm:text-sm sm:leading-6 placeholder:text-gray-400"
                  />
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span class="text-gray-500 sm:text-sm flex flex-col items-center leading-none">
                      <NavIcon name="BxChevronRight" class="transform -rotate-90 text-xs" />
                      <NavIcon name="BxChevronRight" class="transform rotate-90 text-xs -mt-1" />
                    </span>
                  </div>
                </div>
              </div>
              <button @click="removeEquipment(index)" class="text-gray-400 hover:text-red-500 mt-2 transition-colors">
                <NavIcon name="BxTrash" size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 pt-10">
          <ButtonAddNoIcon @click="handleSubmit" text="Thêm Mới" />
          <ButtonResetYellow @click="handleReset" text="Đặt Lại" />
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-between mt-12 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAddNoIcon from '../../../atoms/buttons/ButtonAddNoIcon.vue'
import ButtonResetYellow from '../../../atoms/buttons/ButtonResetYellow.vue'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import SelectForm from '../../../atoms/inputs/SelectForm.vue'

const router = useRouter()

const form = reactive({
  name: '',
  type: undefined,
  startDate: null,
  endDate: null,
  status: undefined,
  terms: [{ name: '', desc: '' }],
  allowances: [{ year: null, amount: '' }],
  equipments: [{ type: undefined, year: null, qty: '' }]
})

const typeOptions = [
  { value: '1', label: 'Đào tạo cầu thủ trẻ' },
  { value: '2', label: 'Hợp đồng lao động' }
]

const statusOptions = [
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'inactive', label: 'Ngừng sử dụng' }
]

const equipmentOptions = [
  { value: '1', label: 'Giày thể thao' },
  { value: '2', label: 'Áo tập' },
  { value: '3', label: 'Quần tập' }
]

const addTerm = () => form.terms.push({ name: '', desc: '' })
const removeTerm = (index: number) => form.terms.splice(index, 1)

const addAllowance = () => form.allowances.push({ year: null, amount: '' })
const removeAllowance = (index: number) => form.allowances.splice(index, 1)

const addEquipment = () => form.equipments.push({ type: undefined, year: null, qty: '' })
const removeEquipment = (index: number) => form.equipments.splice(index, 1)

const handleSubmit = () => {
  console.log('Submit form:', form)
  router.push('/student/contract-version')
}

const handleReset = () => {
  form.name = ''
  form.type = undefined
  form.startDate = null
  form.endDate = null
  form.status = undefined
  form.terms = [{ name: '', desc: '' }]
  form.allowances = [{ year: null, amount: '' }]
  form.equipments = [{ type: undefined, year: null, qty: '' }]
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}
</style>
