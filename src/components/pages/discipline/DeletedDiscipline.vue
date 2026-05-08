<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8]">Kỳ luật khen thưởng</span>
      <span class="text-[13px] text-[#A1ACB8]">/</span>
      <span class="text-[13px] text-[#475569] font-medium">Quyết định kỷ luật</span>
    </div>

    <!-- 2. Main Content Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[15px] font-bold text-[#475569] uppercase tracking-wide">DANH SÁCH QUYẾT ĐỊNH KỶ LUẬT ĐÃ XÓA</h2>
        <button 
            @click="router.back()" 
            class="group flex items-center gap-2 px-4 py-2 bg-[#f1f3f5] text-[#748293] rounded-md font-medium hover:bg-[#e9ecef] transition-all duration-200"
            >
                <i class="bx bx-left-arrow-alt text-[20px] transform group-hover:-translate-x-1 transition-transform"></i>
                <span class="text-[14px]">Quay Lại</span>
        </button>
      </div>
      
      <!-- Filter Bar -->
      <div class="px-[24px] py-[20px] flex items-center justify-between border-b border-[#F1F5F9]">
        <div class="flex items-center gap-[16px] flex-none h-[40px] w-[750px]"> 
          <input
            v-model="filters.keyword"
            type="text"
            placeholder="Tìm kiếm..."
            class="filter-control flex-1 h-full"
          />
          <a-select v-model:value="filters.user" placeholder="Chọn người quyết định" class="flex-1 !h-full border-none" />
          <a-select v-model:value="filters.status" placeholder="Chọn trạng thái" class="flex-1 !h-full border-none" />
        </div>
        
        <div class="flex items-center gap-[10px]">
          <button class="btn-search-primary" @click="handleSearch">
            <i class="bx bx-search text-[18px] mr-2"></i> Tìm Kiếm
          </button>
          <button class="btn-reset-gray" @click="handleReset">
            <i class="bx bx-rotate-left text-[20px]"></i>
          </button>
        </div>
      </div>

      <!-- 3. Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-[13px] border-collapse">
          <thead class="bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <tr class="text-[#64748B] uppercase font-bold">
              <th class="px-[24px] py-[16px] text-left w-[50px] border-r border-[#F1F5F9] last:border-r-0">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="isSelectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">ID BIÊN BẢN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">HỌC VIÊN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">MẪU BIÊN BẢN</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">NGÀY QUYẾT ĐỊNH</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">NGƯỜI QUYẾT ĐỊNH</th>
              <th class="px-[24px] py-[16px] text-left border-r border-[#F1F5F9] last:border-r-0 tracking-wider">NGÀY XÓA</th>
              <th class="px-[24px] py-[16px] text-center uppercase tracking-wider">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in deletedDecisions" 
              :key="item.id" 
              class="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
              :class="{ 'row-selected': selectedIds.includes(item.id) }"
            >
              <td class="px-[24px] py-[18px] border-r border-[#F1F5F9] last:border-r-0">
                <label class="custom-checkbox">
                  <input type="checkbox" :value="item.id" v-model="selectedIds" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td 
                @click="handleView(item.id)" 
                class="px-[24px] py-[18px] text-[#696CFF] font-semibold border-r border-[#F1F5F9] last:border-r-0 cursor-pointer hover:underline"
              >
                {{ item.id }}
              </td>
              <td class="px-[24px] py-[18px] text-[#475569] font-medium border-r border-[#F1F5F9] last:border-r-0">{{ item.student }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.template }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.decisionDate }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.creator }}</td>
              <td class="px-[24px] py-[18px] text-[#475569] border-r border-[#F1F5F9] last:border-r-0">{{ item.deletedDate }}</td>
              <td class="px-[24px] py-[18px]">
                <div class="flex justify-center gap-[16px] text-[#64748B]">
                    <i @click="handleView(item.id)" class="bx bx-show hover:text-[#696CFF] cursor-pointer text-[20px] transition-all" title="Xem chi tiết"></i>
                    <i @click="handleRestore(item.id)" class="bx bx-reset hover:text-[#71DD37] cursor-pointer text-[22px] transition-all" title="Khôi phục"></i>
                    <i @click="handleDelete(item.id)" class="bx bx-trash hover:text-[#EF4444] cursor-pointer text-[20px] transition-all" title="Xóa vĩnh viễn"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 4. Pagination -->
      <div class="px-[24px] py-[24px] flex justify-end">
        <div class="flex items-center gap-[10px]">
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
.row-selected {
  background-color: #F0F2FF !important;
}

/* Custom Checkbox đồng bộ */
.custom-checkbox {
  display: block;
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
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
  border: 1.5px solid #d9dee3;
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
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.filter-control {
  padding: 0 16px;
  border: 1px solid #d9dee3;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-control:focus {
  border-color: #696cff;
}

:deep(.ant-select-selector) {
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
}

.btn-search-primary {
  height: 40px;
  padding: 0 24px;
  background-color: #696CFF;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(105, 108, 255, 0.4);
}

.btn-reset-gray {
  width: 40px;
  height: 40px;
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
  border-radius: 6px;
  background-color: #f0f2f4;
  color: #475569;
  font-weight: 600;
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
  box-shadow: 0 3px 8px rgba(238, 45, 36, 0.3);
}

.pagin-btn i {
  font-size: 20px;
  color: #A1ACB8;
}

.pagin-btn.active i {
  color: white;
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const filters = reactive({ keyword: '', user: undefined, status: undefined })

const deletedDecisions = ref([
  { id: 'HS001', student: 'Nguyễn Văn An', template: 'BB Khiển trách', decisionDate: '10/01/2025', creator: 'Nguyễn Minh Quân', deletedDate: '20/01/2025 9:00' },
  { id: 'HS002', student: 'Trần Thị Bình', template: 'BB Cảnh cáo', decisionDate: '11/01/2025', creator: 'Lê Văn C', deletedDate: '21/01/2025 10:30' },
  { id: 'HS003', student: 'Lê Hoàng Nam', template: 'BB Khiển trách', decisionDate: '12/01/2025', creator: 'Nguyễn Minh Quân', deletedDate: '22/01/2025 14:00' }
])

const handleView = (id: string) => {
  router.push(`/discipline/discipline-decisions/detail/${id}`)
}

const handleRestore = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận khôi phục?',
    icon: createVNode(QuestionCircleOutlined, { style: 'color: #71DD37' }),
    content: `Bạn có chắc chắn muốn khôi phục biên bản ${id} không?`,
    okText: 'Khôi phục',
    cancelText: 'Hủy',
    centered: true,
    onOk() {
      deletedDecisions.value = deletedDecisions.value.filter(item => item.id !== id);
      message.success(`Đã khôi phục thành công biên bản ${id}`);
    }
  });
}

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn?',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color: #ff3e1d' }),
    content: `Bạn có chắc chắn muốn xóa vĩnh viễn biên bản ${id} không?`,
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    centered: true,
    onOk() {
      deletedDecisions.value = deletedDecisions.value.filter(item => item.id !== id);
      message.error(`Đã xóa vĩnh viễn biên bản ${id}`);
    }
  });
}

const selectedIds = ref<string[]>([])
const isSelectAll = computed({
  get: () => deletedDecisions.value.length > 0 && selectedIds.value.length === deletedDecisions.value.length,
  set: (value: boolean) => {
    selectedIds.value = value ? deletedDecisions.value.map(item => item.id) : []
  }
})

const currentPage = ref(3)
const totalPages = ref(6)

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleSearch = () => { console.log('Searching...') }
const handleReset = () => { filters.keyword = ''; filters.user = undefined; filters.status = undefined }
</script>