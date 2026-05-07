<template>
  <div class="flex flex-col h-full bg-white rounded-b-xl">
    <a-table 
      :columns="columns" 
      :data-source="data" 
      :pagination="false"
      :row-selection="{ type: 'checkbox' }"
      class="custom-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="text-[#696cff] font-medium hover:underline cursor-pointer transition-all">{{ record.id }}</span>
        </template>

        <template v-if="column.key === 'actions'">
          <div class="flex justify-center items-center gap-4 text-[#64748B]">
            <i class="bx bx-show cursor-pointer text-xl hover:text-[#696CFF]" @click="router.push(`/student/signed-contract/detail/${record.key}`)"></i>
            <i class="bx bx-edit cursor-pointer text-xl hover:text-[#696CFF]" @click="router.push(`/student/signed-contract/edit/${record.key}`)"></i>
            <!-- Sửa: Truyền cả record vào để lấy đủ thông tin đẩy sang danh sách xóa -->
            <i class="bx bx-trash cursor-pointer text-xl hover:text-[#696CFF]" @click="goToDelete(record)"></i>
          </div>
        </template>
      </template>
    </a-table>

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
</template>

<script setup lang="ts">
import { ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()

// Logic phân trang
const currentPage = ref(1)
const totalPages = ref(6) 

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const props = defineProps({
  data: { type: Array, default: () => [] }
})

// Sửa: Thêm emit để gửi dữ liệu cần xóa về component cha
const emit = defineEmits(['delete-item'])

const columns = ref([
  { title: 'ID HỢP ĐỒNG', key: 'id', dataIndex: 'id', width: '15%' },
  { title: 'HỌC VIÊN', key: 'student', dataIndex: 'student', width: '30%' },
  { title: 'NGÀY ÁP DỤNG', key: 'startDate', dataIndex: 'startDate', width: '18%' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate', width: '18%' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: '15%' }
])

const goToDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa?',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color: #ffab00' }),
    content: `Bạn có muốn xóa biên bản ${record.id} không?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Cancel',
    centered: true,
    onOk() {
      // Gửi toàn bộ record lên cha để xử lý lưu trữ và xóa[cite: 2]
      emit('delete-item', record);
      message.success(`Đã xóa biên bản ${record.id}`);
    },
  });
};
</script>

<style scoped>
/* Giữ nguyên CSS cũ của bạn */
:deep(.ant-table-thead > tr > th) {
  background-color: #F8FAFC !important;
  color: #64748B !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  border-bottom: 1px solid #F1F5F9 !important;
  border-right: 1px solid #F1F5F9 !important;
}
:deep(.ant-table-thead > tr > th:last-child) { border-right: none !important; }
.pagin-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background-color: #F2F2F2; color: #475569; font-weight: 500; border: none; cursor: pointer; }
.pagin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.pagin-btn.active { background-color: #EE2D24; color: white; box-shadow: 0 4px 10px rgba(238, 45, 36, 0.25); }
.pagin-btn.active i { color: white; }
.pagin-btn i { font-size: 18px; color: #A1ACB8; }
</style>