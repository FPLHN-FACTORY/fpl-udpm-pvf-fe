<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium cursor-pointer hover:underline" @click="$router.push('/admission/rounds')">Vòng tuyển sinh</span>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh đã xóa</h2>
        <a-button 
          @click="$router.push('/admission/rounds')"
          class="!bg-[#8592a3] hover:!bg-[#717d8c] !text-white !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
        >
          Quay Lại
        </a-button>
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
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                  @click="$router.push(`/admission/rounds/detail/${record.key}`)"
                />
                <NavIcon 
                  name="BxUndo" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#71dd37]" 
                  @click="handleRestore(record.key)"
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                  @click="handleHardDelete(record.key)"
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Custom Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <a-pagination :current="3" :total="40" :pageSize="10" show-less-items class="custom-pagination" />
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
const statusOptions = ref<any[]>([])

const columns = [
  { title: '#', key: 'stt', width: 60 },
  { title: 'KỲ TUYỂN SINH', dataIndex: 'sessionName', key: 'sessionName', width: 220 },
  { title: 'TÊN VÒNG THI', dataIndex: 'roundName', key: 'roundName', width: 200 },
  { title: 'NGÀY BẮT ĐẦU THI', dataIndex: 'startDate', key: 'startDate', width: 150 },
  { title: 'NGÀY KẾT THÚC THI', dataIndex: 'endDate', key: 'endDate', width: 150 },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const fetchData = async () => {
  try {
    const res = await apiVongTuyenSinh.getDeletedAdmissionRounds({
      keyword: searchQuery.value,
      status: statusFilter.value as any
    })
    tableData.value = res.rounds.items
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

const handleRestore = async (id: string) => {
  try {
    const success = await apiVongTuyenSinh.restoreAdmissionRound(id)
    if (success) {
      message.success('Đã khôi phục vòng tuyển sinh')
      fetchData()
    } else {
      message.error('Lỗi khi khôi phục')
    }
  } catch (error) {
    message.error('Lỗi hệ thống')
  }
}

const handleHardDelete = async (id: string) => {
  try {
    const success = await apiVongTuyenSinh.removeDeletedAdmissionRound(id)
    if (success) {
      message.success('Đã xóa vĩnh viễn vòng tuyển sinh')
      fetchData()
    } else {
      message.error('Lỗi khi xóa')
    }
  } catch (error) {
    message.error('Lỗi hệ thống')
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
