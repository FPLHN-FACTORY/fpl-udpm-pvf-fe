<template>
  <div class="flex flex-col h-full bg-[#f5f5f9] p-6">
    <nav class="text-xs text-[#a1acb8] mb-4">
      <span class="cursor-pointer hover:text-[#696cff]" @click="router.push('/student/signed-contract')">
        Quản lý học viên
      </span> 
      <span class="mx-2">/</span> 
      <span class="text-[#566a7f] font-medium">Hợp đồng đã ký</span>
    </nav>

    <template v-if="isMainPage">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Card 1: TỔNG SỐ -->
        <div class="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center border border-[#d9dee3]">
          <div>
            <p class="text-[13px] text-[#566a7f] mb-1">Tổng số hợp đồng đã ký</p>
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ totalContracts }}</h3>
            <p class="text-[11px] text-[#a1acb8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-10 h-10 flex items-center justify-center bg-[#e7e7ff] text-[#696cff] rounded-lg">
            <i class='bx bx-file text-2xl'></i>
          </div>
        </div>

        <!-- Card 2: CÒN THỜI HẠN -->
        <div class="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center border border-[#d9dee3]">
          <div>
            <p class="text-[13px] text-[#566a7f] mb-1">Số hợp đồng còn thời hạn</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">{{ activeContracts }}</h3>
              <span class="text-xs font-medium text-[#71dd37]">({{ activePercentage }}%)</span>
            </div>
            <p class="text-[11px] text-[#a1acb8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-10 h-10 flex items-center justify-center bg-[#ffeae6] text-[#ff3e1d] rounded-lg">
            <i class='bx bx-layer-plus text-2xl'></i>
          </div>
        </div>

        <!-- Card 3: HẾT HẠN -->
        <div class="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center border border-[#d9dee3]">
          <div>
            <p class="text-[13px] text-[#566a7f] mb-1">Số hợp đồng đã hết hạn</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">{{ expiredContracts }}</h3>
              <span class="text-xs font-medium text-[#ffab00]">({{ 100 - activePercentage }}%)</span>
            </div>
            <p class="text-[11px] text-[#a1acb8] mt-1 uppercase font-semibold">Hợp đồng</p>
          </div>
          <div class="w-10 h-10 flex items-center justify-center bg-[#fff2d6] text-[#ffab00] rounded-lg">
            <i class='bx bx-layer text-2xl'></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] flex-1 flex flex-col overflow-hidden">
        <div class="p-5 flex justify-between items-center border-b border-[#f0f2f4]">
          <h3 class="text-lg font-bold text-[#566a7f]">Danh sách Hợp đồng đã ký</h3>
          <div class="flex gap-2">
            <button @click="router.push('/student/signed-contract/deleted')" class="px-4 py-2 bg-[#8592a3] text-white rounded-md text-sm flex items-center gap-2 hover:bg-[#7a8593]">
              <i class='bx bx-trash text-base'></i> Danh Sách Đã Xóa
            </button>
            <button @click="handleCreate" class="px-4 py-2 bg-[#ff3e1d] text-white rounded-md text-sm font-medium hover:bg-[#e6381a] shadow-sm">
              + Thêm Mới
            </button>
          </div>
        </div>

        <div class="p-5 flex justify-between items-center">
          <div class="flex gap-3">
            <a-input placeholder="Tìm kiếm" class="w-[260px] h-9 rounded-md" />
            <a-date-picker placeholder="Chọn thời gian" class="w-[240px] h-9 rounded-md" />
          </div>
          <div class="flex gap-2">
            <button class="h-9 px-4 bg-[#696cff] text-white rounded-md text-sm flex items-center gap-2 shadow-sm">
              <i class='bx bx-search text-base'></i> Tìm Kiếm
            </button>
            <button class="h-9 w-9 flex items-center justify-center border border-[#d9dee3] text-[#8592a3] rounded-md hover:bg-[#f5f5f9]">
              <i class='bx bx-refresh text-xl'></i>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-auto px-5 pb-5">
          <!-- Truyền dữ liệu và nhận sự kiện cập nhật từ Table[cite: 7] -->
          <SignedContractTable 
            :data="dataSource" 
            @update-data="newData => dataSource = newData" 
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
import SignedContractTable from '../../organisms/SignedContractTable.vue'

const route = useRoute()
const router = useRouter()

const handleCreate = () => {
  router.push('/student/signed-contract/create')
}

// Dữ liệu mẫu ban đầu[cite: 6, 7]
const dataSource = ref([
  { key: '1', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '2', id: 'HD002', student: 'TH12346 - Trần Thị B', startDate: '2025-02-05', endDate: '2025-02-15' },
  { key: '3', id: 'HD003', student: 'TH12347 - Lê Văn C', startDate: '2025-02-10', endDate: '2025-02-20' }
])

// Các logic tính toán tự động dựa trên dataSource[cite: 7]
const totalContracts = computed(() => dataSource.value.length)
const activeContracts = computed(() => {
  const today = new Date()
  return dataSource.value.filter(item => new Date(item.endDate) >= today).length
})
const expiredContracts = computed(() => totalContracts.value - activeContracts.value)
const activePercentage = computed(() => totalContracts.value > 0 ? Math.round((activeContracts.value / totalContracts.value) * 100) : 0)

const isMainPage = computed(() => {
  return route.path === '/student/signed-contract' || route.path === '/student/signed-contract/'
})
</script>
