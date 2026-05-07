<template>
  <div class="flex flex-col h-full bg-[#f5f5f9] p-6">
    <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] flex-1 flex flex-col overflow-hidden">
      <!-- Header Table -->
      <div class="p-5 flex justify-between items-center border-b border-[#f0f2f4]">
        <h3 class="text-lg font-bold text-[#566a7f]">Danh sách Hợp đồng đã ký đã xóa</h3>
        <button 
          @click="router.push('/student/signed-contract')" 
          class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm hover:bg-[#7a8593] transition flex items-center gap-2 shadow-sm font-medium"
        >
          <i class='bx bx-left-arrow-alt text-lg'></i> Quay Lại
        </button>
      </div>

      <!-- Search & Filter Bar -->
      <div class="p-5 flex justify-between items-center">
        <div class="flex gap-3">
          <a-input placeholder="Tìm kiếm" class="w-[260px] h-9 rounded-md border-[#d9dee3]" />
          <a-date-picker placeholder="Chọn thời gian" class="w-[240px] h-9 rounded-md border-[#d9dee3]" />
        </div>
        <div class="flex gap-2">
          <button class="h-9 px-4 bg-[#696cff] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#5f61e6] shadow-[0_2px_4px_0_rgba(105,108,255,0.4)] transition-all">
            <i class='bx bx-search text-base'></i> Tìm Kiếm
          </button>
          <button class="h-9 w-9 flex items-center justify-center border border-[#d9dee3] text-[#8592a3] rounded-md hover:bg-[#f5f5f9] transition-all">
            <i class='bx bx-refresh text-xl'></i>
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="flex-1 overflow-auto px-5">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ type: 'checkbox' }"
          class="custom-table"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'id'">
              <span class="text-[#696cff] font-medium hover:underline cursor-pointer">{{ record.id }}</span>
            </template>
            <template v-if="column.key === 'actions'">
              <div class="flex items-center justify-end gap-3">
                <i @click="router.push(`/student/signed-contract/detail/${record.key}`)"
                   class='bx bx-show text-xl text-[#a1acb8] cursor-pointer hover:text-[#696cff]' title="Xem chi tiết"></i>
                <i @click="confirmRestore(record)"
                   class='bx bx-reset text-xl text-[#a1acb8] cursor-pointer hover:text-[#71dd37]' title="Khôi phục"></i>
                <i @click="confirmDelete(record)"
                   class='bx bx-trash text-xl text-[#a1acb8] cursor-pointer hover:text-[#ff3e1d]' title="Xóa vĩnh viễn"></i>
              </div>
            </template>
          </template>
        </a-table>

        <!-- Pagination chuẩn Figma -->
        <div class="py-8 flex justify-end items-center">
          <div class="flex gap-1.5">
            <button class="p-page-nav" @click="currentPage = 1"><i class='bx bx-chevrons-left'></i></button>
            <button class="p-page-nav" @click="currentPage > 1 ? currentPage-- : null"><i class='bx bx-chevron-left'></i></button>
            
            <!-- Hiển thị từ 1 đến 6 theo Figma -->
            <button 
              v-for="p in [1, 2, 3, 4, 5, 6]" 
              :key="p" 
              :class="['p-page', { active: p === currentPage }]"
              @click="currentPage = p"
            >
              {{ p }}
            </button>
            
            <button class="p-page-nav" @click="currentPage < 6 ? currentPage++ : null"><i class='bx bx-chevron-right'></i></button>
            <button class="p-page-nav" @click="currentPage = 6"><i class='bx bx-chevrons-right'></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'

const router = useRouter()
const currentPage = ref(1) // Mặc định bắt đầu từ 1 theo yêu cầu[cite: 4]

const columns = [
  { title: 'ID HỢP ĐỒNG', key: 'id', dataIndex: 'id' },
  { title: 'HỌC VIÊN', key: 'student', dataIndex: 'student' },
  { title: 'NGÀY ÁP DỤNG', key: 'startDate', dataIndex: 'startDate' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate' },
  { title: 'BALANCE', key: 'balance', dataIndex: 'balance' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'right' },
]

const dataSource = ref<any[]>([])

onMounted(() => {
  const savedData = localStorage.getItem('deletedContracts')
  if (savedData) {
    dataSource.value = JSON.parse(savedData)
  }
})

const confirmRestore = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận khôi phục?',
    content: `Bạn có muốn khôi phục hợp đồng ${record.id} không?`,
    okText: 'Khôi phục',
    onOk() {
      const currentList = JSON.parse(localStorage.getItem('deletedContracts') || '[]')
      const newList = currentList.filter((item: any) => item.key !== record.key)
      localStorage.setItem('deletedContracts', JSON.stringify(newList))
      dataSource.value = newList
      message.success(`Đã khôi phục hợp đồng ${record.id}`)
    }
  })
}

const confirmDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa vĩnh viễn?',
    content: `Hợp đồng ${record.id} sẽ bị xóa vĩnh viễn và không thể khôi phục.`,
    okText: 'Xóa ngay',
    okType: 'danger',
    onOk() {
      dataSource.value = dataSource.value.filter(item => item.key !== record.key)
      localStorage.setItem('deletedContracts', JSON.stringify(dataSource.value))
      message.success(`Đã xóa vĩnh viễn hợp đồng ${record.id}`)
    }
  })
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: transparent !important;
  color: #a1acb8 !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  border-bottom: 1px solid #d9dee3 !important;
  text-transform: uppercase;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f0f2f4 !important;
  color: #566a7f !important;
  font-size: 14px;
  padding: 12px 16px !important;
}

/* Style nút số trang giống Figma */
.p-page {
  @apply w-8 h-8 flex items-center justify-center rounded bg-[#f0f2f4] text-[#566a7f] text-xs font-medium transition-all hover:bg-[#e1e4e8] border-none cursor-pointer;
}

.p-page.active {
  /* Màu đỏ theo brand PVF trong ảnh Figma */
  @apply bg-[#ff3e1d] text-white shadow-[0_2px_4px_0_rgba(255,62,29,0.4)];
}

/* Style nút điều hướng (icon) */
.p-page-nav {
  @apply w-8 h-8 flex items-center justify-center rounded bg-[#f0f2f4] text-[#8592a3] hover:bg-[#e1e4e8] border-none cursor-pointer transition-all;
}
</style>
