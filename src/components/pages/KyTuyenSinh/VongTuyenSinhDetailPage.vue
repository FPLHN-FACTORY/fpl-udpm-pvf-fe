<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium cursor-pointer hover:underline" @click="$router.push({ name: 'admission-rounds' })">Vòng tuyển sinh</span>
    </div>

    <!-- General Info Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Vòng tuyển sinh</h2>
        <div class="flex items-center gap-2">
          <a-button 
            @click="$router.push({ name: 'admission-rounds' })"
            class="!bg-[#f1f1f2] hover:!bg-[#e1e1e2] !text-[#566a7f] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
          >
            <NavIcon name="BxArrowBack" size="14" />
            Quay Lại
          </a-button>
          <a-button 
            v-if="detail"
            type="primary" 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
            @click="$router.push({ name: 'admission-rounds-edit', params: { id: detail.key } })"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>
      <div class="p-6" v-if="detail">
        <table class="w-full text-sm text-[#566a7f] info-table">
          <tbody>
            <tr>
              <td class="font-bold w-1/3 p-4 border-b border-r border-gray-100">Kỳ tuyển sinh</td>
              <td class="p-4 border-b border-gray-100">{{ detail.sessionName }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Tên vòng thi</td>
              <td class="p-4 border-b border-gray-100">{{ detail.roundName }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Bộ tiêu chí snap</td>
              <td class="p-4 border-b border-gray-100">{{ detail.criteriaName }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Ngày bắt đầu vòng thi</td>
              <td class="p-4 border-b border-gray-100">{{ detail.startDate }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Ngày kết thúc vòng thi</td>
              <td class="p-4 border-b border-gray-100">{{ detail.endDate }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Thời gian tạo trung tâm</td>
              <td class="p-4 border-b border-gray-100">{{ detail.centerDeadline }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-b border-r border-gray-100">Thời gian cập nhật trung tâm</td>
              <td class="p-4 border-b border-gray-100">{{ detail.updatedAt }}</td>
            </tr>
            <tr>
              <td class="font-bold p-4 border-r border-gray-100">Trạng thái</td>
              <td class="p-4">
                <span :class="getStatusClass(detail.statusTone)" class="px-3 py-1 rounded-md text-[11px] font-bold uppercase">
                  {{ detail.statusLabel }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

    <!-- Table Section: Criteria -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Bộ tiêu chí gốc</h2>
        <a-button 
          type="primary" 
          class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
        >
          <NavIcon name="BxPlus" size="14" />
          Thêm Mới
        </a-button>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-white border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <a-input v-model:value="searchQuery" placeholder="Tìm kiếm" class="!h-10 !border-[#d9dee3] rounded-md">
          </a-input>
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
          :data-source="criteriaData" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#696cff]">{{ index + 1 }}</span>
            </template>
            <template v-if="column.key === 'name'">
              <span class="font-bold text-[#566a7f]">{{ record.name }}</span>
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
                />
                <NavIcon 
                  name="BxEditAlt" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" 
                />
                <NavIcon 
                  name="BxPrinter" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Custom Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="1" :total="1" :pageSize="10" show-less-items class="custom-pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { apiVongTuyenSinh } from '@/services/VongTuyenSinh/apiVongTuyenSinh'

const route = useRoute()
const id = route.params.id as string

const detail = ref<any>(null)
const metrics = ref<any[]>([])
const criteriaData = ref<any[]>([])
const searchQuery = ref('')
const statusFilter = ref(undefined)
const statusOptions = ref<any[]>([])

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'TÊN BỘ TIÊU CHÍ', dataIndex: 'name', key: 'name', width: 250 },
  { title: 'MÔ TẢ BỘ TIÊU CHÍ', dataIndex: 'description', key: 'description' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 180 },
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
    const res = await apiVongTuyenSinh.getAdmissionRoundDetailPage(id, {
      keyword: searchQuery.value,
      status: statusFilter.value as any
    })
    detail.value = res.detail
    metrics.value = res.metrics
    criteriaData.value = res.criteriaRecords
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
.info-table {
  border: 1px solid #d9dee3;
  border-radius: 6px;
  border-collapse: separate;
  overflow: hidden;
}
.info-table td {
  border-bottom: 1px solid #d9dee3;
  padding: 16px;
}
.info-table tr:last-child td {
  border-bottom: none;
}
.info-table td:first-child {
  background-color: #fcfcfd;
  width: 300px;
  border-right: 1px solid #d9dee3;
}
</style>
