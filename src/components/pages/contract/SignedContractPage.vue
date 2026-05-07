<template>
  <div class="flex flex-col h-full bg-[#f8fafc] p-6">
    <!-- 1. Breadcrumb -->
    <nav class="flex items-center gap-2 mb-4">
      <span class="text-[13px] text-[#A1ACB8] cursor-pointer hover:text-[#696cff]" @click="router.push('/student/signed-contract')">
        Quản lý học viên
      </span> 
      <span class="text-[13px] text-[#A1ACB8]">/</span> 
      <span class="text-[13px] text-[#475569] font-medium">Hợp đồng đã ký</span>
    </nav>

    <template v-if="isMainPage">
      <!-- 2. Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white p-4 rounded-[8px] shadow-sm border border-[#F1F5F9] flex justify-between items-center">
          <div>
            <p class="text-[12px] text-[#64748B] mb-1 font-medium">Tổng số hợp đồng đã ký</p>
            <h3 class="text-[20px] font-bold text-[#475569]">{{ totalContracts }}</h3>
            <p class="text-[11px] text-[#A1ACB8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-[42px] h-[42px] rounded-[6px] bg-[#E7E7FF] flex items-center justify-center">
            <i class='bx bx-file text-[#696CFF] text-[22px]'></i>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px] shadow-sm border border-[#F1F5F9] flex justify-between items-center">
          <div>
            <p class="text-[12px] text-[#64748B] mb-1 font-medium">Số hợp đồng còn thời hạn</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-[20px] font-bold text-[#475569]">{{ activeContracts }}</h3>
              <span class="text-[11px] text-[#16A34A] font-medium">({{ activePercentage }}%)</span>
            </div>
            <p class="text-[11px] text-[#A1ACB8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-[42px] h-[42px] rounded-[6px] bg-[#FFE5E5] flex items-center justify-center">
            <i class='bx bx-layer-plus text-[#EF4444] text-[22px]'></i>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px] shadow-sm border border-[#F1F5F9] flex justify-between items-center">
          <div>
            <p class="text-[12px] text-[#64748B] mb-1 font-medium">Số hợp đồng đã hết hạn</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-[20px] font-bold text-[#475569]">{{ expiredContracts }}</h3>
              <span class="text-[11px] text-[#FFAB00] font-medium">({{ 100 - activePercentage }}%)</span>
            </div>
            <p class="text-[11px] text-[#A1ACB8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-[42px] h-[42px] rounded-[6px] bg-[#FFF2D6] flex items-center justify-center">
            <i class='bx bx-layer text-[#FFAB00] text-[22px]'></i>
          </div>
        </div>
      </div>

      <!-- 3. Main Content Card -->
      <div class="bg-white rounded-[8px] shadow-sm border border-[#F1F5F9] overflow-hidden flex flex-col">
        <div class="px-[24px] py-[20px] border-b border-[#F1F5F9] flex justify-between items-center">
          <h2 class="text-[14px] font-bold text-[#475569] uppercase">DANH SÁCH HỢP ĐỒNG ĐÃ KÝ</h2>
          <div class="flex gap-2">
            <button @click="router.push('/student/signed-contract/deleted')" class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#7a8593]">
              <i class='bx bx-trash mr-1'></i> Danh Sách Đã Xóa
            </button>
            <button @click="handleCreate" class="px-4 py-2 bg-[#ff3e1d] text-white rounded-md text-sm font-medium hover:bg-[#e6381a] shadow-sm">
              <i class='bx bx-plus mr-1'></i> Thêm Mới
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="px-[24px] py-[20px] flex items-center justify-between border-b border-[#F1F5F9]">
          <div class="flex items-center gap-[12px] flex-none h-[38px] w-[600px]"> 
            <input type="text" placeholder="Tìm kiếm..." class="filter-control flex-1 h-full px-3 border border-[#d9dee3] rounded-md text-[13px] outline-none" />
            <a-date-picker placeholder="Chọn thời gian" class="flex-1 !h-full rounded-md" />
          </div>
          
          <div class="flex items-center gap-[8px]">
            <button class="btn-search-primary">
              <i class="bx bx-search text-[18px] mr-2"></i> Tìm Kiếm
            </button>
            <button class="btn-reset-gray">
              <i class="bx bx-rotate-left text-[20px]"></i>
            </button>
          </div>
        </div>

        <!-- 4. Table: Thay thế table HTML tĩnh bằng component đã sửa[cite: 18] -->
        <div class="overflow-x-auto">
          <signed-contract-table 
            :data="dataSource" 
            @delete-item="handleDeleteContract" 
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex-1">
        <router-view />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SignedContractTable from "../../organisms/SignedContractTable.vue"; 

const route = useRoute()
const router = useRouter()

const dataSource = ref([
  { key: '1', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '2', id: 'HD002', student: 'TH12346 - Trần Thị B', startDate: '2025-02-05', endDate: '2025-02-15' },
  { key: '3', id: 'HD003', student: 'TH12347 - Lê Văn C', startDate: '2025-02-10', endDate: '2025-02-20' }
])

const handleDeleteContract = (record: any) => {
  // 1. Xóa khỏi danh sách hiện tại
  dataSource.value = dataSource.value.filter(item => item.id !== record.id);

  // 2. Cập nhật localStorage với key 'deletedContracts'
  const deletedList = JSON.parse(localStorage.getItem('deletedContracts') || '[]');
  
  // Kiểm tra tránh trùng lặp trước khi push
  if (!deletedList.some((item: any) => item.id === record.id)) {
    deletedList.push(record);
    localStorage.setItem('deletedContracts', JSON.stringify(deletedList));
  }
  
  console.log('Đã đẩy vào danh sách đã xóa:', record.id);
}

const totalContracts = computed(() => dataSource.value.length)
const activeContracts = computed(() => dataSource.value.length)
const activePercentage = computed(() => 100) 
const expiredContracts = computed(() => 0)

const isMainPage = computed(() => route.path === '/student/signed-contract')
const handleCreate = () => router.push('/student/signed-contract/create')
</script>

<style scoped>
.btn-search-primary {
  height: 38px; padding: 0 20px; background-color: #696CFF; color: white;
  border-radius: 6px; font-weight: 500; font-size: 13px; display: flex; align-items: center; border: none;
}
.btn-reset-gray {
  width: 38px; height: 38px; background-color: #8592a3; color: white;
  border-radius: 6px; display: flex; align-items: center; justify-content: center; border: none;
}
.filter-control {
  border: 1px solid #d9dee3;
  transition: border-color 0.2s;
}
.filter-control:focus {
  border-color: #696cff;
}
</style>
