<template>
  <div class="p-6 bg-[#F8FAFC] min-h-screen">
    <!-- 2. Main Content Card -->
    <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9]">
      <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
        <h2 class="text-[15px] font-bold text-[#475569] uppercase tracking-wide">Danh sách Hợp đồng đã ký đã xóa</h2>
        <!-- Nút Quay Lại -->
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
        <div class="flex items-center gap-[16px] flex-none h-[40px] w-[700px]"> 
          <input
            v-model="filters.keyword"
            type="text"
            placeholder="Tìm kiếm"
            class="filter-control flex-1 h-full"
          />
          <a-date-picker placeholder="Chọn thời gian" class="flex-1 !h-full border-[#d9dee3]" />
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
              <th class="px-[24px] py-[16px] text-left w-[50px]">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="isSelectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th class="px-[24px] py-[16px] text-left tracking-wider">ID HỢP ĐỒNG</th>
              <th class="px-[24px] py-[16px] text-left tracking-wider">HỌC VIÊN</th>
              <th class="px-[24px] py-[16px] text-left tracking-wider">NGÀY ÁP DỤNG</th>
              <th class="px-[24px] py-[16px] text-left tracking-wider">NGÀY KẾT THÚC</th>
              <th class="px-[24px] py-[16px] text-left tracking-wider">BALANCE</th>
              <th class="px-[24px] py-[16px] text-center uppercase tracking-wider">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in dataSource" 
              :key="item.key" 
              class="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
              :class="{ 'row-selected': selectedIds.includes(item.key) }"
            >
              <td class="px-[24px] py-[18px]">
                <label class="custom-checkbox">
                  <input type="checkbox" :value="item.key" v-model="selectedIds" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="px-[24px] py-[18px] text-[#696CFF] font-semibold cursor-pointer hover:underline">
                {{ item.id }}
              </td>
              <td class="px-[24px] py-[18px] text-[#475569] font-medium">{{ item.student }}</td>
              <td class="px-[24px] py-[18px] text-[#475569]">{{ item.startDate }}</td>
              <td class="px-[24px] py-[18px] text-[#475569]">{{ item.endDate }}</td>
              <td class="px-[24px] py-[18px] text-[#475569]">{{ item.balance }}</td>
              <td class="px-[24px] py-[18px]">
                <div class="flex justify-center gap-[16px] text-[#64748B]">
                    <i @click="handleView(item.key)" 
                      class="bx bx-show hover:text-[#696CFF] cursor-pointer text-[20px] transition-all" 
                      title="Xem chi tiết">
                    </i>
                    <i @click="handleRestore(item)" class="bx bx-reset hover:text-[#71DD37] cursor-pointer text-[22px]" title="Khôi phục"></i>
                    <i @click="handleDelete(item)" class="bx bx-trash hover:text-[#EF4444] cursor-pointer text-[20px]" title="Xóa vĩnh viễn"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
    <div class="px-[24px] py-[24px] flex justify-end border-t border-[#f0f2f4]">
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

<script setup lang="ts">
import { ref, reactive, computed, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const filters = reactive({ keyword: '', user: undefined, status: undefined })
const selectedIds = ref<string[]>([])

// Dữ liệu cứng đồng bộ với hình ảnh thiết kế
const dataSource = ref([
  { key: '1', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10', balance: '2025-02-10 14:25' },
  { key: '2', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10', balance: '2025-02-10 14:25' },
  { key: '3', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10', balance: '2025-02-10 14:25' },
  { key: '4', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10', balance: '2025-02-10 14:25' },
  { key: '5', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10', balance: '2025-02-10 14:25' },
])

const handleView = (key: string) => {
  router.push(`/student/signed-contract/detail/${key}`);
};

const handleRestore = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận khôi phục?',
    icon: createVNode(QuestionCircleOutlined, { style: 'color: #71DD37' }),
    content: `Bạn có muốn khôi phục hợp đồng ${record.id} không?`,
    okText: 'Khôi phục',
    cancelText: 'Hủy',
    centered: true,
    onOk() {
      dataSource.value = dataSource.value.filter(item => item.key !== record.key)
      message.success(`Đã khôi phục thành công hợp đồng ${record.id}`);
    }
  });
}

const handleDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn?',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color: #ff3e1d' }),
    content: `Bạn có chắc chắn muốn xóa vĩnh viễn hợp đồng ${record.id} không?`,
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    centered: true,
    onOk() {
      dataSource.value = dataSource.value.filter(item => item.key !== record.key)
      message.error(`Đã xóa vĩnh viễn hợp đồng ${record.id}`);
    }
  });
}

const isSelectAll = computed({
  get: () => dataSource.value.length > 0 && selectedIds.value.length === dataSource.value.length,
  set: (value: boolean) => {
    selectedIds.value = value ? dataSource.value.map(item => item.key) : []
  }
})

const handleSearch = () => { console.log('Searching...') }
const handleReset = () => { filters.keyword = '' }

const currentPage = ref(1); // Trang hiện tại
const totalPages = ref(6);  // Tổng số trang (giả định theo thiết kế)

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Tại đây bạn có thể gọi API hoặc filter dữ liệu theo trang
    console.log("Chuyển sang trang:", page);
  }
};
</script>

<style scoped>
/* Đồng bộ CSS với thiết kế PVF */
.row-selected { background-color: #F0F2FF !important; }

.custom-checkbox {
  display: block; position: relative; width: 18px; height: 18px; cursor: pointer;
}
.custom-checkbox input { position: absolute; opacity: 0; width: 0; height: 0; }
.checkmark {
  position: absolute; top: 0; left: 0; height: 18px; width: 18px;
  background-color: #fff; border: 1.5px solid #d9dee3; border-radius: 4px;
}
.custom-checkbox input:checked ~ .checkmark {
  background-color: #696cff; border-color: #696cff;
}
.checkmark:after {
  content: ""; position: absolute; display: none;
  left: 5px; top: 1px; width: 5px; height: 10px;
  border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
}
.custom-checkbox input:checked ~ .checkmark:after { display: block; }

.filter-control {
  padding: 0 16px; border: 1px solid #d9dee3; border-radius: 6px;
  outline: none; transition: border-color 0.2s;
}
.filter-control:focus { border-color: #696cff; }

.btn-search-primary {
  height: 40px; padding: 0 24px; background-color: #696CFF; color: white;
  border-radius: 6px; font-weight: 600; display: flex; align-items: center; border: none;
  box-shadow: 0 2px 4px rgba(105, 108, 255, 0.4);
}

.btn-reset-gray {
  width: 40px; height: 40px; background-color: #8592a3; color: white;
  border-radius: 6px; display: flex; align-items: center; justify-content: center; border: none;
}

.pagin-btn {
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  border-radius: 4px; background-color: #f0f2f4; color: #475569; border: none; font-weight: 500;
}
.pagin-btn.active { background-color: #fff; border: 1px solid #d9dee3; }
.pagin-btn.active-red { background-color: #EE2D24; color: white; }
.pagin-btn.active-pink { background-color: #ffcccb; color: #EE2D24; }
/* Style phân trang đồng bộ từ Discipline[cite: 8] */
.pagin-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background-color: #F2F2F2; color: #475569; font-weight: 500; border: none; cursor: pointer; }
.pagin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.pagin-btn.active { background-color: #EE2D24; color: white; box-shadow: 0 4px 10px rgba(238, 45, 36, 0.25); }
.pagin-btn.active i { color: white; }
.pagin-btn i { font-size: 18px; color: #A1ACB8; }
</style>