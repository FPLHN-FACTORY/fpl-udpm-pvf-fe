import os
import re

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\discipline\level"
os.makedirs(base_dir, exist_ok=True)

# 1. LevelListPage.vue
list_page = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">21</h3>
        </div>
        <div class="w-10 h-10 bg-[#e7e7ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Tổng số biên bản</p>
          <h3 class="text-2xl font-bold text-[#566a7f]">50</h3>
        </div>
        <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxCalendar" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Đang sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
            <span class="text-[#71dd37] text-sm">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
          <NavIcon name="BxLayers" class-name="w-6 h-6" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-500 mb-1">Ngừng sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">11</h3>
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
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Mức độ khen thưởng/kỷ luật</h2>
        <div class="flex gap-3">
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !text-white !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
            @click="$router.push('/discipline/levels/deleted')"
          >
            <template #icon><NavIcon name="BxTrash" size="18" /></template>
            Danh Sách Đã Xóa
          </a-button>
          <ButtonAdd text="Thêm Mới" @click="$router.push('/discipline/levels/create')" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
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
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="getStatusType(record.status)">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/levels/detail/${record.key}`)"
                >
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button 
                  class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors"
                  @click="$router.push(`/discipline/levels/edit/${record.key}`)"
                >
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
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
        <a-pagination 
          v-model:current="currentPage" 
          :total="50" 
          :show-size-changer="false"
          class="custom-pagination"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../atoms/buttons/ButtonAdd.vue'
import ButtonSearch from '../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../atoms/display/BaseTag.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const currentPage = ref(3)

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}

const getStatusType = (status: string) => {
  switch (status) {
    case 'Đang hoạt động': return 'success'
    case 'Ngừng hoạt động': return 'default'
    default: return 'default'
  }
}

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN MỨC', dataIndex: 'name', key: 'name' },
  { title: 'KHIỂN TRÁCH', dataIndex: 'type', key: 'type' },
  { title: 'CẤP ĐỘ', dataIndex: 'level', key: 'level' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: '1',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '2',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
  },
  {
    key: '3',
    name: 'Khiển trách',
    type: 'Kỷ luật',
    level: '1',
    status: 'Đang hoạt động',
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

:deep(.custom-pagination .ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white !important;
}

.template-table :deep(.ant-table-selection-column) {
  width: 50px;
}
</style>
"""

with open(os.path.join(base_dir, "LevelListPage.vue"), "w", encoding="utf-8") as f:
    f.write(list_page)

# 2. LevelCreatePage.vue
create_page = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm mới Mức độ khen thưởng/ kỷ luật</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/discipline/levels')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-6">
        <div class="space-y-4 max-w-4xl">
          <div>
            <a-input v-model:value="form.name" placeholder="Tên mức" class="h-[38px] rounded-md" />
          </div>
          <div>
            <a-input v-model:value="form.level" placeholder="Cấp độ" class="h-[38px] rounded-md" />
          </div>
          <div>
            <a-textarea v-model:value="form.description" placeholder="Mô tả" :rows="4" class="rounded-md" />
          </div>
          <div>
            <a-select v-model:value="form.status" placeholder="Trạng thái" class="w-full !h-[38px]">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </div>
        </div>

        <div class="flex gap-3 justify-center mt-6">
          <a-button type="primary" class="!bg-[#ff3e1d] !border-none !h-[38px] !px-8" @click="save">
            Thêm Mới
          </a-button>
          <a-button class="!bg-[#fdac41] !text-white !border-none !h-[38px] !px-8">
            Đặt Lại
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  level: '',
  description: '',
  status: undefined
})

const save = () => {
  console.log('Saved', form.value)
}
</script>
"""

with open(os.path.join(base_dir, "LevelCreatePage.vue"), "w", encoding="utf-8") as f:
    f.write(create_page)

# 3. LevelEditPage.vue
edit_page = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Điều chỉnh Mức độ khen thưởng/ kỷ luật</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/discipline/levels')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-6">
        <div class="space-y-4 max-w-4xl">
          <div>
            <div class="text-xs text-gray-500 mb-1">Tên mức</div>
            <a-input v-model:value="form.name" placeholder="Input" class="h-[38px] rounded-md" />
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">Cấp độ</div>
            <a-input v-model:value="form.level" placeholder="Input" class="h-[38px] rounded-md" />
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">Mô tả</div>
            <a-textarea v-model:value="form.description" placeholder="Mô tả" :rows="4" class="rounded-md" />
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">Trạng thái</div>
            <a-select v-model:value="form.status" placeholder="Input" class="w-full !h-[38px]">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
            </a-select>
          </div>
        </div>

        <div class="flex gap-3 justify-center mt-6">
          <a-button type="primary" class="!bg-[#ff3e1d] !border-none !h-[38px] !px-8" @click="save">
            Cập Nhật
          </a-button>
          <a-button class="!bg-[#fdac41] !text-white !border-none !h-[38px] !px-8">
            Đặt Lại
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: 'Khiển trách',
  level: '1',
  description: 'Mô tả',
  status: 'active'
})

const save = () => {
  console.log('Saved', form.value)
}
</script>
"""

with open(os.path.join(base_dir, "LevelEditPage.vue"), "w", encoding="utf-8") as f:
    f.write(edit_page)

# 4. LevelDetailPage.vue
detail_page = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Detail Info -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Mức độ khen thưởng/ kỷ luật</h2>
        <div class="flex gap-3">
          <a-button 
            class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
            @click="$router.push('/discipline/levels')"
          >
            <template #icon>←</template>
            Quay Lại
          </a-button>
          <a-button class="!bg-[#fdac41] !text-white !border-none !h-[38px] !px-4" @click="$router.push('/discipline/levels/edit/1')">
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <div class="p-0">
        <table class="w-full">
          <tbody class="divide-y divide-gray-100">
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f] w-1/4">ID</td>
              <td class="px-6 py-4 text-gray-500">HS001</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Tên mức</td>
              <td class="px-6 py-4 text-gray-500">Khiển trách</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Cấp độ</td>
              <td class="px-6 py-4 text-gray-500">1</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Mô tả</td>
              <td class="px-6 py-4 text-gray-500">Mô tả</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Thời gian tạo</td>
              <td class="px-6 py-4 text-gray-500">10/01/2025 09:00</td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-[#566a7f]">Thời gian cập nhật</td>
              <td class="px-6 py-4 text-gray-500">12/01/2025 14:30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Related List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Biên bản</h2>
        <ButtonAdd text="Thêm Mới" />
      </div>

      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <a-date-picker placeholder="Chọn thời gian" class="w-full !h-[38px]" />
        </div>
        <div class="w-[200px]">
          <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
            <a-select-option value="active">Đang hoạt động</a-select-option>
          </a-select>
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
            <template v-if="column.key === 'stt'">{{ index + 1 }}</template>
            <template v-else-if="column.key === 'status'">
              <BaseTag type="success">Đang hoạt động</BaseTag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxShow" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" /></button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="p-6 flex justify-end">
        <a-pagination v-model:current="currentPage" :total="50" :show-size-changer="false" class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAdd from '../../atoms/buttons/ButtonAdd.vue'
import ButtonSearch from '../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../atoms/inputs/InputSearch.vue'
import BaseTag from '../../atoms/display/BaseTag.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN MẪU BIÊN BẢN', dataIndex: 'name', key: 'name' },
  { title: 'SỐ TRƯỜNG', dataIndex: 'fields', key: 'fields' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  { key: '1', name: 'BB Kỷ luật nhẹ', fields: '2' },
  { key: '2', name: 'BB Khen thưởng', fields: '4' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
:deep(.custom-pagination .ant-pagination-item-active) { background-color: #ff3e1d !important; border-color: #ff3e1d !important; }
:deep(.custom-pagination .ant-pagination-item-active a) { color: white !important; }
</style>
"""

with open(os.path.join(base_dir, "LevelDetailPage.vue"), "w", encoding="utf-8") as f:
    f.write(detail_page)

# 5. LevelDeletedListPage.vue
deleted_page = """<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Mức độ khen thưởng/kỷ luật đã xóa</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
          @click="$router.push('/discipline/levels')"
        >
          <template #icon>←</template>
          Quay Lại
        </a-button>
      </div>

      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
            <a-select-option value="all">Tất cả</a-select-option>
          </a-select>
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
            <template v-if="column.key === 'stt'">{{ index + 1 }}</template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxShow" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxRevision" class-name="w-[18px] h-[18px]" /></button>
                <button class="p-1 text-[#a1acb8]"><NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" /></button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="p-6 flex justify-end">
        <a-pagination v-model:current="currentPage" :total="50" :show-size-changer="false" class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonSearch from '../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../atoms/buttons/ButtonReset.vue'
import InputSearch from '../../atoms/inputs/InputSearch.vue'
import NavIcon from '../../atoms/icons/NavIcon.vue'

const searchQuery = ref('')
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN MỨC', dataIndex: 'name', key: 'name' },
  { title: 'KHIỂN TRÁCH', dataIndex: 'type', key: 'type' },
  { title: 'CẤP ĐỘ', dataIndex: 'level', key: 'level' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  { key: '1', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
  { key: '2', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
  { key: '3', name: 'Khiển trách', type: 'Kỷ luật', level: '1', deletedAt: '2025-01-01 6:20' },
])
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) { background-color: #fcfcfd; color: #566a7f; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #f0f2f5; }
:deep(.ant-table-tbody > tr > td) { padding: 16px; color: #697a8d; font-size: 13px; }
:deep(.ant-select-selector), :deep(.ant-picker) { height: 38px !important; border-radius: 6px !important; border-color: #d9dee3 !important; }
:deep(.custom-pagination .ant-pagination-item-active) { background-color: #ff3e1d !important; border-color: #ff3e1d !important; }
:deep(.custom-pagination .ant-pagination-item-active a) { color: white !important; }
</style>
"""

with open(os.path.join(base_dir, "LevelDeletedListPage.vue"), "w", encoding="utf-8") as f:
    f.write(deleted_page)

# Write routes to router
router_file = r"d:\fve\fpl-udpm-pvf-fe\src\router\routes\discipline\levels.ts"
router_content = """import type { RouteRecordRaw } from 'vue-router'

export const levelsRoute: RouteRecordRaw = {
  path: 'levels',
  name: 'discipline-levels',
  component: () => import('../../../components/pages/discipline/level/LevelListPage.vue'),
  meta: { title: 'Mức độ khen thưởng/kỷ luật', icon: 'BxInfoCircle' }
}

export const levelsHiddenRoute: RouteRecordRaw = {
  path: 'levels',
  children: [
    {
      path: 'create',
      name: 'discipline-level-create',
      component: () => import('../../../components/pages/discipline/level/LevelCreatePage.vue'),
    },
    {
      path: 'edit/:id',
      name: 'discipline-level-edit',
      component: () => import('../../../components/pages/discipline/level/LevelEditPage.vue'),
    },
    {
      path: 'detail/:id',
      name: 'discipline-level-detail',
      component: () => import('../../../components/pages/discipline/level/LevelDetailPage.vue'),
    },
    {
      path: 'deleted',
      name: 'discipline-level-deleted',
      component: () => import('../../../components/pages/discipline/level/LevelDeletedListPage.vue'),
    }
  ]
}
"""
with open(router_file, "w", encoding="utf-8") as f:
    f.write(router_content)

print("Done generating levels")
