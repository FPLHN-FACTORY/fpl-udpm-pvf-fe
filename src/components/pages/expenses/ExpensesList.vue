<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Sinh hoạt phí</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Yêu cầu rút sinh hoạt phí</span>
    </div>

    <!-- 2. Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white p-4 rounded-[8px] shadow-sm border border-[#F1F5F9] flex justify-between items-center">
        <div>
          <p class="text-[12px] text-[#64748B] mb-1 font-medium">{{ stat.title }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-[20px] font-bold text-[#475569]">{{ stat.value }}</h3>
            <span v-if="stat.percent" class="text-[11px] text-[#16A34A] font-medium">({{ stat.percent }})</span>
          </div>
        </div>
        <div :class="stat.iconBg" class="w-[42px] h-[42px] rounded-[6px] flex items-center justify-center">
          <i :class="['bx', stat.icon, stat.iconColor, 'text-[22px]']"></i>
        </div>
      </div>
    </div>

    <!-- 3. Main Content Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[14px] font-bold text-[#475569] uppercase">DANH SÁCH YÊU CẦU RÚT SINH HOẠT PHÍ</h2>
        <div class="flex gap-2">
            <button 
              class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#7a8593]" 
              @click="goToDeleted"
             >
              <i class="bx bx-trash mr-1"></i> Danh Sách Đã Xóa
            </button>
           <button class="px-4 py-2 bg-[#ff3e1d] text-white rounded-md text-sm font-medium hover:bg-[#e6381a] shadow-sm" @click="goToCreate">
             <i class="bx bx-plus mr-1"></i> Thêm Mới
           </button>
        </div>
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
        
        <div class="flex items-center gap-[8px]">
          <button class="btn-search-primary" @click="handleSearch">
            <i class="bx bx-search text-[18px] mr-2"></i> Tìm Kiếm
          </button>
          <button class="btn-reset-gray" @click="handleReset">
            <i class="bx bx-rotate-left text-[20px]"></i>
          </button>
        </div>
      </div>

      <!-- 4. Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-[13px] border-collapse">
          <thead class="bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <tr class="text-[#64748B] uppercase font-bold">
              <th class="px-[24px] py-[16px] text-left w-[40px] border-r border-[#F1F5F9] last:border-r-0">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="isSelectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">#</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">HỌC VIÊN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">HỢP ĐỒNG</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">MỤC ĐÍCH</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">NGÀY TẠO</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">NGƯỜI XỬ LÝ</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0">TRẠNG THÁI</th>
              <th class="px-[24px] py-[16px] text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in decisions" 
              :key="item.id" 
              class="border-b border-[#F1F5F9] hover:bg-gray-50 transition-colors"
              :class="{ 'row-selected': selectedIds.includes(item.id) }"
            >
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9] last:border-r-0">
                <label class="custom-checkbox">
                  <input type="checkbox" :value="item.id" v-model="selectedIds" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="px-[24px] py-[18px] text-[#696CFF] font-medium border-r border-[#F1F5F9] last:border-r-0">{{ item.id }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] font-medium border-r border-[#F1F5F9] last:border-r-0">{{ item.student }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.contract }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.purpose }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.date }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.handler }}</td>
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9] last:border-r-0">
                <span class="px-2 py-1 rounded-[6px] bg-[#E8FADF] text-[#71DD37] text-[12px] font-normal">
                  Đã ban hành
                </span>
              </td>
              <td class="px-[24px] py-[18px]">
                <div class="flex justify-center gap-[12px] text-[#64748B]">
                    <i 
                      class="bx bx-show hover:text-[#696CFF] cursor-pointer text-[18px]"
                      @click="goToDetail(item.id)"
                      title="Xem chi tiết"
                    ></i>
      
                    <i 
                      class="bx bx-edit hover:text-[#FFAB00] cursor-pointer text-[18px]"
                      @click="goToEdit(item.id)"
                      title="Chỉnh sửa"
                    ></i>

                    <i 
                      class="bx bx-trash hover:text-[#EF4444] cursor-pointer text-[18px]" 
                      @click="goToDelete(item.id)"
                      title="Xóa vào danh sách đã xóa"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5. Pagination -->
      <div class="px-[24px] py-[24px] flex justify-end">
        <div class="flex items-center gap-[8px]">
          <button class="pagin-btn" @click="changePage(1)" :disabled="currentPage === 1">
            <i class="bx bx-chevrons-left"></i>
          </button>
          <button class="pagin-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            <i class="bx bx-chevron-left"></i>
          </button>
          
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="pagin-btn"
            :class="{ 'active': currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button class="pagin-btn" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            <i class="bx bx-chevron-right"></i>
          </button>
          <button class="pagin-btn" @click="changePage(totalPages)" :disabled="currentPage === totalPages">
            <i class="bx bx-chevrons-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Màu nền khi hàng được chọn */
.row-selected {
  background-color: #F0F2FF !important;
}

/* Custom Checkbox Style */
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

/* TRẢ LẠI MÀU ĐỎ GỐC CỦA BẠN[cite: 6] */
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

<script setup lang="ts">
import { Modal } from 'ant-design-vue';
import { ref, reactive, computed, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const router = useRouter()

const stats = [
  { title: 'Tổng số yêu cầu', value: '21', icon: 'bx-layout', iconBg: 'bg-[#E7E7FF]', iconColor: 'text-[#696CFF]' },
  { title: 'Số yêu cầu chờ duyệt', value: '20', percent: '95%', icon: 'bx-calendar-check', iconBg: 'bg-[#FFE5E5]', iconColor: 'text-[#EF4444]' },
  { title: 'Số yêu cầu đã duyệt', value: '1', percent: '5%', icon: 'bx-layer-minus', iconBg: 'bg-[#FFF2D6]', iconColor: 'text-[#FFAB00]' },
  { title: 'Tổng số tiền yêu cầu rút', value: '21', percent: '5%', icon: 'bx-layer-plus', iconBg: 'bg-[#FFF2D6]', iconColor: 'text-[#FFAB00]' }
]

const filters = reactive({ keyword: '', user: undefined, status: undefined })

const decisions = ref([
  { id: '1', student: 'Nguyễn Văn An', contract: 'HDDT-PVF-20', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 8:00', handler: 'Trần Minh Quân' },
  { id: '2', student: 'Trần Thị Bình', contract: 'HDDT-PVF-21', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 8:00', handler: 'Trần Minh Quân' },
  { id: '3', student: 'Lê Hoàng Nam', contract: 'HDDT-PVF-22', purpose: 'Mua dụng cụ học tập', date: '15/03/2025 8:00', handler: 'Trần Minh Quân' }
])

// Checkbox logic[cite: 6]
const selectedIds = ref<string[]>([])
const isSelectAll = computed({
  get: () => decisions.value.length > 0 && selectedIds.value.length === decisions.value.length,
  set: (value: boolean) => {
    selectedIds.value = value ? decisions.value.map(item => item.id) : []
  }
})

// Pagination logic[cite: 6]
const currentPage = ref(1)
const totalPages = ref(6)

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    console.log('Page changed to:', page)
  }
}

const goToDetail = (id: string) => {
  router.push({ name: 'expenses-detail', params: { id: id } })
}

const goToEdit = (id: string) => {
  router.push({ name: 'expenses-edit', params: { id: id } })
}

const goToDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa?',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color: #ffab00' }),
    content: `Bạn có muốn xóa học viên ${id} không?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Cancel',
    centered: true,
    onOk() {
      decisions.value = decisions.value.filter(item => item.id !== id);
      console.log('Đã xóa:', id);
    },
  });
};

const handleSearch = () => { console.log('Searching...') }
const handleReset = () => { filters.keyword = ''; filters.user = undefined; filters.status = undefined }
const goToCreate = () => { router.push({ name: '' }) }
const goToDeleted = () => {
  router.push({ name: 'expenses-delete' })
}
</script>
