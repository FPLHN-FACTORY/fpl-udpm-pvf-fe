<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Mẫu biên bản</span>
    </div>

    <!-- Page Header Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-lg font-bold text-[#566a7f]">Chi tiết <span class="bg-[#fcf3d7] px-1 rounded">Mẫu biên bản</span></h1>
        <div class="flex items-center gap-3">
          <BaseButton 
            variant="default" 
            size="small" 
            class="!bg-[#eceef1] hover:!bg-[#daddf1] !border-none !text-[#8592a3] !text-[13px] !px-4 flex items-center gap-1"
            @click="$router.back()"
          >
            <span class="text-lg">←</span> Quay Lại
          </BaseButton>
          <BaseButton 
            variant="primary" 
            size="small" 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !border-none !text-white !text-[13px] !px-4 flex items-center gap-1"
            @click="$router.push(`/discipline/templates/edit/${$route.params.id}`)"
          >
            Chỉnh Sửa
          </BaseButton>
        </div>
      </div>

      <!-- Detail Info Table -->
      <div class="border border-gray-100 rounded-lg overflow-hidden">
        <div v-for="(item, index) in templateDetails" :key="index" 
          class="flex border-b border-gray-100 last:border-0 min-h-[50px]"
        >
          <div class="w-1/3 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100 flex items-center">
            {{ item.label }}
          </div>
          <div class="w-2/3 p-4 text-[13px] text-[#697a8d] flex items-center">
            <template v-if="item.label === 'Tên mẫu biên bản'">
              <span class="bg-[#fcf3d7] px-1 rounded">{{ item.value }}</span>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested List Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách trường mẫu</h2>
        <BaseButton 
          variant="primary" 
          icon="BxPlus" 
          class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !text-white !text-[13px] !px-4"
        >
          Thêm Mới
        </BaseButton>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
            class="!h-[38px] !border-[#d9dee3]"
            icon="BxSearch"
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang sử dụng</a-select-option>
            <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton 
            variant="primary" 
            icon="BxSearch" 
            class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-[38px]"
          >
            Tìm Kiếm
          </BaseButton>
          <BaseButton 
            icon="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-[38px] !h-[38px] !p-0 !min-w-0 flex items-center justify-center rounded-lg" 
            icon-class-name="w-6 h-6 text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="template-detail-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'Đang sử dụng' ? 'success' : 'default'">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
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
import BaseButton from '../../atoms/BaseButton.vue'
import BaseInput from '../../atoms/BaseInput.vue'
import BaseTag from '../../atoms/BaseTag.vue'
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)

const templateDetails = ref([
  { label: 'ID', value: 'HS001' },
  { label: 'Tên mẫu biên bản', value: 'BB Kỷ luật nhẹ' },
  { label: 'Tên mức', value: 'Khiển trách' },
  { label: 'Cấp độ', value: '1' },
  { label: 'Thời gian tạo', value: '10/01/2025 09:00' },
  { label: 'Thời gian cập nhật', value: '12/01/2025 14:30' }
])

const columns = [
  { title: 'STT', key: 'stt', width: 60 },
  { title: 'KEY', dataIndex: 'key', key: 'key' },
  { title: 'NỘI DUNG', dataIndex: 'content', key: 'content' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: 'hoc_vien',
    content: 'Thông tin học viên',
    status: 'Đang sử dụng',
  },
  {
    key: 'ly_do',
    content: 'Lý do vi phạm',
    status: 'Đang sử dụng',
  },
])

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}
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

:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
