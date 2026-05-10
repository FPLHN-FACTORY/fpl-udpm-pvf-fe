<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Vòng tuyển sinh</span>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(metric, index) in metrics" :key="index" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-[#566a7f] mb-2 font-medium">{{ metric.label }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ metric.value }}</h3>
            <span v-if="metric.change" class="text-[13px] font-semibold text-[#71dd37]">{{ metric.change }}</span>
          </div>
        </div>
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', metric.iconBackground, metric.iconColor]">
          <NavIcon :name="metric.icon" size="20" />
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh</h2>
        <div class="flex items-center gap-2">
          <a-button 
            @click="$router.push({ name: 'admission-rounds-deleted' })"
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !text-white !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
          >
            <NavIcon name="BxTrash" size="14" />
            Danh Sách Đã Xóa
          </a-button>
          <a-button 
            type="primary" 
            class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
            @click="$router.push({ name: 'admission-rounds-create' })"
          >
            <NavIcon name="BxPlus" size="14" />
            Thêm Mới
          </a-button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-white border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm kiếm" class="!h-10 !border-[#d9dee3] rounded-md">
          </a-input>
        </div>
        <div class="w-[200px]">
          <a-date-picker placeholder="Chọn thời gian" class="w-full !h-10" />
        </div>
        <div class="w-[200px]">
          <a-select v-model:value="statusFilter" placeholder="Chọn trạng thái" class="w-full !h-10">
            <a-select-option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <a-button type="primary" class="!bg-[#696cff] hover:!bg-[#5f61e6] !border-none !h-10 px-6 rounded-md flex items-center gap-2" @click="fetchData">
            <NavIcon name="BxSearch" size="16" />
            Tìm Kiếm
          </a-button>
          <a-button 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !border-none !w-10 !h-10 !p-0 !min-w-0 flex items-center justify-center rounded-md shadow-sm" 
            @click="resetFilters"
          >
            <NavIcon name="BxReset" class-name="w-6 h-6 text-white" />
          </a-button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="tableData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#696cff]">{{ index + 1 }}</span>
            </template>
            <template v-if="column.key === 'sessionName'">
              <span class="font-bold text-[#566a7f]">{{ record.sessionName }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <div class="flex items-center">
                <span :class="getStatusClass(record.statusTone)" class="px-3 py-1 rounded-md text-[11px] font-bold uppercase whitespace-nowrap">
                  {{ record.statusLabel }}
                </span>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                  @click="$router.push({ name: 'admission-rounds-detail', params: { id: record.key } })"
                />
                <NavIcon 
                  name="BxEditAlt" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" 
                  @click="$router.push({ name: 'admission-rounds-edit', params: { id: record.key } })"
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                  @click="handleDelete(record.key)"
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Custom Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="3" :total="60" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { apiVongTuyenSinh } from '@/services/VongTuyenSinh/apiVongTuyenSinh'

const searchQuery = ref('')
const statusFilter = ref(undefined)
const tableData = ref<any[]>([])
const metrics = ref<any[]>([])
const statusOptions = ref<any[]>([])

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'KỲ TUYỂN SINH', dataIndex: 'sessionName', key: 'sessionName', width: 220 },
  { title: 'TÊN VÒNG THI', dataIndex: 'roundName', key: 'roundName', width: 200 },
  { title: 'NGÀY BẮT ĐẦU THI', dataIndex: 'startDate', key: 'startDate', width: 150 },
  { title: 'NGÀY KẾT THÚC THI', dataIndex: 'endDate', key: 'endDate', width: 150 },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const getStatusClass = (tone: string) => {
  if (tone === 'active') return 'bg-[#e7f5e9] text-[#71dd37]'
  if (tone === 'warning') return 'bg-[#fff2e1] text-[#ffab00]'
  if (tone === 'info') return 'bg-[#e8f2ff] text-[#696cff]'
  return 'bg-[#f4f4f4] text-[#8592a3]'
}

const fetchData = async () => {
  try {
    const res = await apiVongTuyenSinh.getAdmissionRounds({
      keyword: searchQuery.value,
      status: statusFilter.value as any
    })
    tableData.value = res.rounds.items
    metrics.value = res.metrics
    statusOptions.value = res.statusOptions
  } catch (error) {
    console.error(error)
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  fetchData()
}

const handleDelete = async (id: string) => {
  try {
    const success = await apiVongTuyenSinh.softDeleteAdmissionRound(id)
    if (success) {
      message.success('Đã xoá vòng tuyển sinh')
      fetchData()
    } else {
      message.error('Lỗi khi xoá')
    }
  } catch (error) {
    message.error('Lỗi khi xoá')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
:deep(.ant-picker) {
  height: 40px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}
:deep(.pvf-table .ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  border-bottom: 1px solid #d9dee3;
}
:deep(.pvf-table .ant-table-tbody > tr > td) {
  color: #566a7f;
  font-size: 13px;
  padding: 12px 16px;
}
:deep(.ant-pagination-item-active) {
  background-color: #e31a1a !important;
  border-color: #e31a1a !important;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}
:deep(.ant-pagination-item) {
  border-radius: 4px;
}
:deep(.ant-pagination-prev), :deep(.ant-pagination-next) {
  border-radius: 4px;
}
</style>
