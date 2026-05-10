<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Yêu cầu rút sinh hoạt phí</span>
    </div>

    <!-- 2. Main Content Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[14px] font-bold text-[#475569] uppercase">Danh sách Yêu cầu rút sinh hoạt phí đã xóa</h2>
        <button 
          class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#7a8593]" 
          @click="goBack"
        >
          <i class="bx bx-left-arrow-alt mr-1"></i> Quay Lại
        </button>
      </div>
      
      <!-- Filter Bar -->
      <div class="px-[24px] py-[20px] flex items-center justify-between border-b border-[#F1F5F9]">
        <div class="flex items-center gap-[12px] flex-none h-[38px] w-[720px]"> 
          <input
            v-model="filters.keyword"
            type="text"
            placeholder="Tìm kiếm..."
            class="filter-control flex-1 h-full"
          />
          <a-date-picker placeholder="Chọn thời gian" class="flex-1 !h-full rounded-md" />
          <a-select v-model:value="filters.user" placeholder="Chọn người phụ trách" class="flex-1 !h-full border-none" />
          <a-select v-model:value="filters.status" placeholder="Chọn trạng thái" class="flex-1 !h-full border-none" />
        </div>
        
        <div class="flex items-center gap-2">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleReset" />
        </div>
      </div>

      <!-- 3. Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-[13px] border-collapse">
          <thead class="bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <tr class="text-[#64748B] uppercase font-bold">
              <th class="px-[24px] py-[16px] text-left w-[40px] border-r border-[#F1F5F9]">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="isSelectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">#</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">HỌC VIÊN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">HỢP ĐỒNG</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">MỤC ĐÍCH</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">NGÀY TẠO</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">NGƯỜI XỬ LÝ</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9]">NGÀY XÓA</th>
              <th class="px-[24px] py-[16px] text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in deletedItems" 
              :key="item.id" 
              class="border-b border-[#F1F5F9] hover:bg-gray-50 transition-colors"
            >
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9]">
                <label class="custom-checkbox">
                  <input type="checkbox" :value="item.id" v-model="selectedIds" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="px-[24px] py-[18px] text-[#696CFF] font-medium border-r border-[#F1F5F9]">{{ item.id }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] font-medium border-r border-[#F1F5F9]">{{ item.student }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9]">{{ item.contract }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9]">{{ item.purpose }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9]">{{ item.date }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9]">{{ item.handler }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9]">{{ item.deletedDate }}</td>
              <td class="px-[24px] py-[18px]">
                <TableActions :actions="getActions(item)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 4. Pagination -->
      <div class="px-[24px] py-[24px] flex justify-end">
        <BasePagination 
          :total="totalPages * 10" 
          :current="currentPage" 
          :page-size="10" 
          @change="changePage" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'

const router = useRouter()

const filters = reactive({ keyword: '', user: undefined, status: undefined })

const deletedItems = ref([
  { id: '1', student: 'Nguyễn Văn An', contract: 'HDDT-PVF-20', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 08:00', handler: 'Trần Minh Quân', deletedDate: '25/02/2025 09:00' },
  { id: '2', student: 'Nguyễn Văn An', contract: 'HDDT-PVF-20', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 08:00', handler: 'Trần Minh Quân', deletedDate: '25/02/2025 09:00' },
  { id: '3', student: 'Nguyễn Văn An', contract: 'HDDT-PVF-20', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 08:00', handler: 'Trần Minh Quân', deletedDate: '25/02/2025 09:00' }
])

const selectedIds = ref<string[]>([])
const isSelectAll = computed({
  get: () => deletedItems.value.length > 0 && selectedIds.value.length === deletedItems.value.length,
  set: (value: boolean) => {
    selectedIds.value = value ? deletedItems.value.map(item => item.id) : []
  }
})

const currentPage = ref(3)
const totalPages = ref(9)

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goBack = () => {
  router.push({ name: 'expenses-list' })
}

const goToDetail = (id: string) => {
  router.push({ name: 'expenses-detail', params: { id: id } })
}

const getActions = (record: any) => {
  return [
    { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => goToDetail(record.id) },
    { label: 'Khôi phục', icon: 'BxReset', onClick: () => handleRestore(record.id) },
    { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => handlePermanentDelete(record.id) },
  ]
}

const handleRestore = (id: string) => {
  message.success(`Đã khôi phục yêu cầu ${id}`)
  deletedItems.value = deletedItems.value.filter(item => item.id !== id)
}

const handlePermanentDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn?',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color: #ff3e1d' }),
    content: `Bạn có chắc chắn muốn xóa vĩnh viễn yêu cầu ${id} không? Hành động này không thể hoàn tác.`,
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    centered: true,
    onOk() {
      deletedItems.value = deletedItems.value.filter(item => item.id !== id)
      message.success(`Đã xóa vĩnh viễn yêu cầu ${id}`)
    },
  })
}

const handleSearch = () => { console.log('Searching deleted items...') }
const handleReset = () => { filters.keyword = ''; filters.user = undefined; filters.status = undefined }
</script>

<style scoped>
/* Reuse styles from ExpensesList.vue */
.custom-checkbox {
  display: block;
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 1px solid #d9dee3;
  border-radius: 4px;
}

.custom-checkbox:hover input ~ .checkmark {
  border-color: #696cff;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #696cff;
  border-color: #696cff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.filter-control {
  padding: 0 12px;
  border: 1px solid #d9dee3;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
}

:deep(.ant-select-selector) {
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}

.btn-search-primary {
  height: 38px;
  padding: 0 20px;
  background-color: #696CFF;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
}

.btn-reset-gray {
  width: 38px;
  height: 38px;
  background-color: #8592a3;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.pagin-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #F2F2F2;
  color: #475569;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.pagin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagin-btn.active {
  background-color: #EE2D24; 
  color: white;
  box-shadow: 0 4px 10px rgba(105, 108, 255, 0.25);
}

.pagin-btn.active i {
  color: white;
}

.pagin-btn i {
  font-size: 18px;
  color: #A1ACB8;
}
</style>