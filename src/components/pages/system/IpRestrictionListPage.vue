<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Giới hạn địa chỉ IP</span>
    </div>

    <!-- IP Restriction Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Add Button -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Giới hạn địa chỉ IP</h2>
        <BaseButton 
          variant="primary" 
          icon="BxPlus" 
          icon-class-name="w-4 h-4"
          class="!bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none"
          @click="$router.push('/system/security/ip-restriction/add')"
        >
          Thêm Mới
        </BaseButton>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm IP/ mô tả" class="!h-10 !border-[#d9dee3]">
            <template #prefix>
              <NavIcon name="BxSearch" class-name="w-4 h-4 text-gray-400" />
            </template>
          </a-input>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="rangeFilter" placeholder="Phạm vi" class="w-full !h-10">
            <a-select-option value="all">Tất cả</a-select-option>
            <a-select-option value="internal">Nội bộ</a-select-option>
            <a-select-option value="external">Bên ngoài</a-select-option>
          </a-select>
        </div>
        <div class="w-[180px]">
          <a-select v-model:value="statusFilter" placeholder="Trạng thái" class="w-full !h-10">
            <a-select-option value="active">Cho phép</a-select-option>
            <a-select-option value="locked">Tạm khoá</a-select-option>
            <a-select-option value="inactive">Chưa kích hoạt</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton 
            variant="primary" 
            icon="BxSearch" 
            class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-10"
          >
            Tìm Kiếm
          </BaseButton>
          <BaseButton 
            icon="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-10 !h-10 !p-0 !min-w-0 flex items-center justify-center rounded-lg shadow-sm" 
            icon-class-name="w-6 h-6 text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="ipData" 
          :pagination="{ 
            current: 3, 
            pageSize: 5, 
            total: 25, 
            showSizeChanger: false,
            itemRender: customItemRender
          }"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'status'">
              <BaseTag :color="getTagColor(record.status)">
                {{ getStatusText(record.status) }}
              </BaseTag>
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                  @click="$router.push(`/system/security/ip-restriction/${record.id}`)"
                />
                <NavIcon 
                  name="BxEditAlt" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" 
                  @click="$router.push(`/system/security/ip-restriction/edit/${record.id}`)"
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import BaseButton from '../../atoms/BaseButton.vue'
import BaseTag from '../../atoms/BaseTag.vue'
import NavIcon from '../../atoms/NavIcon.vue'

const searchQuery = ref('')
const rangeFilter = ref(undefined)
const statusFilter = ref(undefined)

const columns = [
  { title: 'STT', key: 'stt', width: 70 },
  { title: 'ĐỊA CHỈ IP ĐƯỢC PHÉP', dataIndex: 'ip', key: 'ip' },
  { title: 'MÔ TẢ CHÍNH SÁCH', dataIndex: 'description', key: 'description' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150 }
]

const ipData = ref([
  { id: 1, ip: '192.168.1.10', description: 'IP nội bộ văn phòng Hà Nội', status: 'active' },
  { id: 2, ip: '192.168.1.11', description: 'IP nội bộ phòng kỹ thuật', status: 'active' },
  { id: 3, ip: '10.0.0.5', description: 'IP truy cập hệ thống test', status: 'locked' },
  { id: 4, ip: '118.70.52.100', description: 'IP truy cập từ chi nhánh TP.HCM', status: 'inactive' }
])

const resetFilters = () => {
  searchQuery.value = ''
  rangeFilter.value = undefined
  statusFilter.value = undefined
}

const getTagColor = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'locked': return 'default'
    case 'inactive': return 'warning'
    default: return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Cho phép'
    case 'locked': return 'Tạm khoá'
    case 'inactive': return 'Chưa kích hoạt'
    default: return status
  }
}

const customItemRender = ({ type, originalElement }: any) => {
  if (type === 'prev') {
    return h('span', { class: 'px-2' }, '«')
  }
  if (type === 'next') {
    return h('span', { class: 'px-2' }, '»')
  }
  return originalElement
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
:deep(.pvf-table .ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
}
:deep(.ant-pagination-item-active) {
  background-color: #ff3e1d !important;
  border-color: #ff3e1d !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
</style>
