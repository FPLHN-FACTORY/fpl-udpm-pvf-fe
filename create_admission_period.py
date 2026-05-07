import os

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\recruitment\admission-period"
os.makedirs(base_dir, exist_ok=True)

# 1. List Page
list_page_content = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Kỳ tuyển sinh</span>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số kỳ tuyển sinh</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Số kỳ đang mở</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxCheck" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng hồ sơ (tất cả kỳ)</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng học viên trúng tuyển</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Action Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Kỳ tuyển sinh</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="$router.push('/recruitment/admission-periods/deleted')" />
          <ButtonAdd text="Thêm Mới" @click="$router.push('/recruitment/admission-periods/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-date-picker 
              v-model:value="dateFilter" 
              placeholder="Chọn thời gian" 
              class="w-full !h-[38px]"
              format="YYYY-MM-DD"
            />
          </div>
          <div class="w-[200px]">
            <a-select 
              v-model:value="statusFilter" 
              placeholder="Chọn trạng thái" 
              class="w-full !h-[38px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="template-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/recruitment/admission-periods/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/recruitment/admission-periods/edit/${record.key}`)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxCopy" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end">
        <BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="(page) => currentPage = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const dateFilter = ref()
const currentPage = ref(3)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  dateFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const getStatusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Ngừng hoạt động': return 'warning'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'CƠ SỞ ĐÀO TẠO', dataIndex: 'facility', key: 'facility' },
  { title: 'TÊN KỲ TUYỂN SINH', dataIndex: 'name', key: 'name' },
  { title: 'NGÀY TUYỂN', dataIndex: 'startDate', key: 'startDate' },
  { title: 'NGÀY KẾT THÚC', dataIndex: 'endDate', key: 'endDate' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 140, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '2',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '3',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Đang hoạt động',
  },
  {
    key: '7',
    facility: 'Cơ sở đào tạo FPT Hà Nội',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'Ngừng hoạt động',
  },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
.template-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
"""

# 2. Deleted List Page
deleted_list_page_content = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Kỳ tuyển sinh đã xoá</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/recruitment/admission-periods')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-date-picker placeholder="Chọn thời gian" class="w-full !h-[38px]" />
          </div>
          <div class="w-[200px]">
            <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
              <a-select-option value="all">Tất cả</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="() => {}" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [] }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxShow" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxRevision" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f]"><NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" /></button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="p-6 flex justify-end">
        <BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="(page) => currentPage = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BasePagination from '../../../atoms/display/BasePagination.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: 60, align: 'center' },
  { title: 'CƠ SỞ ĐÀO TẠO', dataIndex: 'facility', key: 'facility' },
  { title: 'TÊN KỲ TUYỂN SINH', dataIndex: 'name', key: 'name' },
  { title: 'NGÀY TUYỂN', dataIndex: 'startDate', key: 'startDate' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  { key: '1', facility: 'Cơ sở đào tạo FPT Hà Nội', name: 'Kỳ tuyển sinh Xuân 2025', startDate: '2025-01-15', deletedAt: '2025-03-31 8:30' },
  { key: '2', facility: 'Cơ sở đào tạo FPT TP.HCM', name: 'Kỳ tuyển sinh Xuân 2025', startDate: '2025-01-15', deletedAt: '2025-03-31 8:30' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
</style>
"""

# 3. Create Page
create_page_content = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm mới Kỳ tuyển sinh</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/recruitment/admission-periods')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-8">
        <div class="flex flex-col gap-6">
          <InputForm label="Cơ sở đào tạo" :required="false">
            <a-select 
              v-model:value="formData.facility" 
              placeholder="Cơ sở đào tạo" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="hn">Cơ sở đào tạo FPT Hà Nội</a-select-option>
              <a-select-option value="hcm">Cơ sở đào tạo FPT TP.HCM</a-select-option>
            </a-select>
          </InputForm>

          <InputForm label="Tên kỳ tuyển sinh" :required="false">
            <a-input 
              v-model:value="formData.name" 
              placeholder="Tên kỳ tuyển sinh" 
              class="!h-[42px] !rounded-md"
            />
          </InputForm>

          <div class="grid grid-cols-2 gap-6">
            <InputForm label="Ngày bắt đầu kỳ tuyển sinh" :required="false">
              <a-date-picker 
                v-model:value="formData.startDate" 
                placeholder="Ngày bắt đầu kỳ tuyển sinh" 
                class="w-full !h-[42px]"
              />
            </InputForm>
            <InputForm label="Ngày kết thúc kỳ tuyển sinh" :required="false">
              <a-date-picker 
                v-model:value="formData.endDate" 
                placeholder="Ngày kết thúc kỳ tuyển sinh" 
                class="w-full !h-[42px]"
              />
            </InputForm>
          </div>

          <InputForm label="Trạng thái" :required="false">
            <a-select 
              v-model:value="formData.status" 
              placeholder="Trạng thái" 
              class="w-full !h-[42px]"
            >
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </InputForm>

          <div class="flex justify-center gap-3 mt-6">
            <ButtonSave text="Thêm Mới" @click="handleSubmit" />
            <ButtonReset @click="resetForm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputForm from '../../../atoms/inputs/InputForm.vue'
import ButtonSave from '../../../atoms/buttons/ButtonSave.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'

const router = useRouter()

interface FormData {
  facility: string | undefined
  name: string
  startDate: any
  endDate: any
  status: string | undefined
}

const formData = ref<FormData>({
  facility: undefined,
  name: '',
  startDate: undefined,
  endDate: undefined,
  status: undefined
})

const handleSubmit = () => {
  console.log('Submit', formData.value)
  router.push('/recruitment/admission-periods')
}

const resetForm = () => {
  formData.value = {
    facility: undefined,
    name: '',
    startDate: undefined,
    endDate: undefined,
    status: undefined
  }
}
</script>

<style scoped>
:deep(.ant-select-selector), :deep(.ant-picker) {
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
</style>
"""

# 4. Edit Page
edit_page_content = create_page_content.replace('Thêm mới Kỳ tuyển sinh', 'Điều chỉnh Kỳ tuyển sinh')
edit_page_content = edit_page_content.replace('Thêm Mới', 'Cập Nhật')
edit_page_content = edit_page_content.replace("facility: undefined,", "facility: 'hn',")
edit_page_content = edit_page_content.replace("name: '',", "name: 'Kỳ tuyển sinh Xuân 2025',")
edit_page_content = edit_page_content.replace("status: undefined", "status: 'active'")

# 5. Detail Page
detail_page_content = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <!-- Detail Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Kỳ tuyển sinh</h2>
        <div class="flex gap-2">
          <a-button 
            class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
            @click="$router.push('/recruitment/admission-periods')"
          >
            <template #icon>←</template>
            Quay Lại
          </a-button>
          <a-button 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !border-none !text-white !text-[13px] !px-6 !h-[38px] font-medium rounded-md"
            @click="$router.push('/recruitment/admission-periods/edit/1')"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex flex-col border border-gray-100 rounded-lg overflow-hidden">
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Cơ sở đào tạo</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">Cơ sở đào tạo FPT Hà Nội</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Tên kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">Kỳ tuyển sinh Xuân 2025</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Ngày bắt đầu kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-15</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Ngày kết thúc kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-03-31</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Thời gian tạo kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-20 10:15:45</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Thời gian cập nhật kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-20 10:15:45</div>
          </div>
          <div class="flex">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Trạng thái</div>
            <div class="w-2/3 p-4">
              <BaseTag type="success">Đang hoạt động</BaseTag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats & Chart -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="flex flex-col gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p class="text-sm text-gray-500 mb-1">Tổng hồ sơ đăng ký</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
              <span class="text-[#71dd37] text-sm">(95%)</span>
            </div>
          </div>
          <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
            <NavIcon name="BxCalendarCheck" class-name="w-6 h-6" />
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p class="text-sm text-gray-500 mb-1">Số học viên trúng tuyển</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
              <span class="text-[#71dd37] text-sm">(5%)</span>
            </div>
          </div>
          <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
            <NavIcon name="BxLayer" class-name="w-6 h-6" />
          </div>
        </div>
      </div>
      
      <div class="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-[#566a7f]">Thống kê hồ sơ</h3>
          <span class="text-sm text-gray-400">Quý ∨</span>
        </div>
        <!-- Mockup Chart -->
        <div class="flex items-end gap-2 h-40">
           <div v-for="i in 12" :key="i" class="flex-1 flex flex-col gap-1 items-center justify-end">
             <div class="w-full bg-[#f4bdf8]" :style="{ height: `${Math.random() * 40 + 10}px` }"></div>
             <div class="w-full bg-[#716bff]" :style="{ height: `${Math.random() * 60 + 20}px` }"></div>
           </div>
        </div>
        <div class="flex gap-4 mt-4 text-sm justify-center">
          <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#716bff]"></div>Hồ sơ hợp lệ</div>
          <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#f4bdf8]"></div>Hồ sơ bị loại</div>
        </div>
      </div>
    </div>

    <!-- Rounds List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="() => {}" />
          <ButtonAdd text="Thêm Mới" />
        </div>
      </div>
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-date-picker placeholder="Chọn thời gian" class="w-full !h-[38px]" />
          </div>
          <div class="w-[200px]">
            <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
              <a-select-option value="all">Tất cả</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="() => {}" />
        </div>
      </div>
      
      <!-- Subtable mockup -->
      <div class="p-10 text-center text-gray-400">
        Chưa có dữ liệu vòng tuyển sinh
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'

const searchQuery = ref('')
</script>

<style scoped>
:deep(.ant-select-selector), :deep(.ant-picker) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
</style>
"""

with open(os.path.join(base_dir, "AdmissionPeriodListPage.vue"), "w", encoding="utf-8") as f:
    f.write(list_page_content)

with open(os.path.join(base_dir, "AdmissionPeriodDeletedListPage.vue"), "w", encoding="utf-8") as f:
    f.write(deleted_list_page_content)

with open(os.path.join(base_dir, "AdmissionPeriodCreatePage.vue"), "w", encoding="utf-8") as f:
    f.write(create_page_content)

with open(os.path.join(base_dir, "AdmissionPeriodEditPage.vue"), "w", encoding="utf-8") as f:
    f.write(edit_page_content)

with open(os.path.join(base_dir, "AdmissionPeriodDetailPage.vue"), "w", encoding="utf-8") as f:
    f.write(detail_page_content)

print("Created 5 Vue files for Admission Period module.")
