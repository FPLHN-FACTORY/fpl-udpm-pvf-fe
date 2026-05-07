<template>
  <div class="flex flex-col h-full bg-[#f5f5f9] p-6">
    <!-- Header & Breadcrumb -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-xl font-semibold text-[#566a7f]">Chi tiết Hợp đồng đã ký</h2>
      </div>
      <div class="flex gap-2">
        <button @click="router.back()" class="px-4 py-2 bg-[#8592a3] text-white rounded-md hover:bg-[#717d8c] transition flex items-center gap-2 shadow-sm">
          <i class='bx bx-left-arrow-alt'></i> Quay Lại
        </button>
        <button @click="router.push(`/student/signed-contract/edit/${contractId}`)" class="px-4 py-2 bg-[#ffab00] text-white rounded-md hover:bg-[#e69a00] transition shadow-sm font-medium">
          Chỉnh Sửa
        </button>
      </div>
    </div>

    <!-- Thông tin chính -->
    <div v-if="contractDetail" class="bg-white rounded-xl shadow-sm border border-[#d9dee3] overflow-hidden mb-6">
      <table class="w-full text-left border-collapse">
        <tbody class="text-[#566a7f]">
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] w-1/4 border-r border-[#d9dee3]">ID hợp đồng</td>
            <td class="px-6 py-4">{{ contractDetail.id }}</td>
          </tr>
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] border-r border-[#d9dee3]">Học viên</td>
            <td class="px-6 py-4">{{ contractDetail.student }}</td>
          </tr>
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] border-r border-[#d9dee3]">Phiên bản hợp đồng</td>
            <td class="px-6 py-4 text-[#696cff]">{{ contractDetail.version }}</td>
          </tr>
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] border-r border-[#d9dee3]">Ngày bắt đầu</td>
            <td class="px-6 py-4">{{ contractDetail.startDate }}</td>
          </tr>
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] border-r border-[#d9dee3]">Ngày kết thúc</td>
            <td class="px-6 py-4">{{ contractDetail.endDate }}</td>
          </tr>
          <tr class="border-b border-[#d9dee3]">
            <td class="px-6 py-4 font-semibold bg-[#f9fafb] border-r border-[#d9dee3]">Số năm</td>
            <td class="px-6 py-4">{{ contractDetail.years }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section: Các điều khoản -->
    <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-[#566a7f]">Các điều khoản, quyền lợi, nghĩa vụ, ...</h3>
        <button @click="addNewClause" class="px-3 py-1.5 bg-[#ff3e1d] text-white text-sm rounded-md hover:bg-[#e6381a] shadow-sm flex items-center gap-1">
          <i class='bx bx-plus'></i> Thêm Mới
        </button>
      </div>
      <table class="w-full text-sm border-t border-[#d9dee3]">
        <thead class="bg-[#f5f5f9]">
          <tr class="text-[#a1acb8] uppercase text-[11px] tracking-wider">
            <th class="p-3 border-b w-12 text-center">#</th>
            <th class="p-3 border-b text-left">Tên điều khoản</th>
            <th class="p-3 border-b text-left">Mô tả</th>
            <th class="p-3 border-b text-right w-24">Hành động</th>
          </tr>
        </thead>
        <tbody class="text-[#566a7f]">
          <tr v-for="(item, index) in clauses" :key="index" class="border-b border-[#f0f2f4] hover:bg-[#f5f5f9]">
            <td class="p-3 text-center text-[#696cff]">{{ index + 1 }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.description }}</td>
            <td class="p-3 text-right">
               <i class='bx bx-edit-alt text-[#a1acb8] hover:text-[#ffab00] cursor-pointer mr-2'></i>
               <i @click="clauses.splice(index, 1)" class='bx bx-trash text-[#a1acb8] hover:text-[#ff3e1d] cursor-pointer'></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section: Trợ cấp -->
    <div class="bg-white rounded-xl shadow-sm border border-[#d9dee3] p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-[#566a7f]">Trợ cấp</h3>
        <button @click="addNewAllowance" class="px-3 py-1.5 bg-[#ff3e1d] text-white text-sm rounded-md hover:bg-[#e6381a] shadow-sm flex items-center gap-1">
          <i class='bx bx-plus'></i> Thêm Mới
        </button>
      </div>
      <table class="w-full text-sm border-t border-[#d9dee3]">
        <thead class="bg-[#f5f5f9]">
          <tr class="text-[#a1acb8] uppercase text-[11px] tracking-wider">
            <th class="p-3 border-b w-12 text-center">#</th>
            <th class="p-3 border-b text-left">Tên trợ cấp</th>
            <th class="p-3 border-b text-left">Số tiền (VNĐ)</th>
            <th class="p-3 border-b text-right w-24">Hành động</th>
          </tr>
        </thead>
        <tbody class="text-[#566a7f]">
          <tr v-for="(item, index) in allowances" :key="index" class="border-b border-[#f0f2f4] hover:bg-[#f5f5f9]">
            <td class="p-3 text-center text-[#696cff]">{{ index + 1 }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.amount.toLocaleString() }}</td>
            <td class="p-3 text-right">
               <i class='bx bx-edit-alt text-[#a1acb8] hover:text-[#ffab00] cursor-pointer mr-2'></i>
               <i @click="allowances.splice(index, 1)" class='bx bx-trash text-[#a1acb8] hover:text-[#ff3e1d] cursor-pointer'></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const contractId = route.params.id
const contractDetail = ref<any>(null)

// Danh sách Điều khoản
const clauses = ref([
  { name: 'Điều khoản 1', description: 'Mô tả Điều khoản 1' }
])

// Danh sách Trợ cấp
const allowances = ref([
  { name: 'Trợ cấp ăn trưa', amount: 500000 }
])

// Hàm thêm điều khoản mới
const addNewClause = () => {
  const nextNumber = clauses.value.length + 1
  clauses.value.push({
    name: `Điều khoản ${nextNumber}`,
    description: `Mô tả Điều khoản ${nextNumber}`
  })
}

// Hàm thêm trợ cấp mới
const addNewAllowance = () => {
  const nextNumber = allowances.value.length + 1
  allowances.value.push({
    name: `Trợ cấp mới ${nextNumber}`,
    amount: 0
  })
}

const dataSource = [
  { 
    key: '1', 
    id: 'HD001', 
    student: 'TH12345 - Nguyễn Văn An', 
    version: 'HĐĐT-CTT-PVF-2025-v1.0', 
    startDate: '2025-02-01', 
    endDate: '2025-02-10', 
    years: 3 
  },
  { 
    key: '2', 
    id: 'HD002', 
    student: 'TH12346 - Trần Văn Bình', 
    version: 'HĐĐT-CTT-PVF-2025-v1.1', 
    startDate: '2025-03-01', 
    endDate: '2025-03-10', 
    years: 1 
  },
  { 
    key: '3', 
    id: 'HD003', 
    student: 'TH12347 - Lê Thị Cẩm', 
    version: 'HĐĐT-CTT-PVF-2025-v1.2', 
    startDate: '2025-04-15', 
    endDate: '2026-04-15', 
    years: 2 
  }
]

onMounted(() => {
  // 1. Tìm đúng người theo ID trên URL
  const found = dataSource.find(item => item.key === contractId || item.id === contractId)
  
  if (found) {
    contractDetail.value = found
  } else {
    // 2. Nếu ID lạ (như cái 17777... kia), lấy tạm người đầu tiên để hiển thị layout
    console.warn("Không tìm thấy ID khớp, đang hiển thị dữ liệu mặc định")
    contractDetail.value = dataSource[0] 
  }
})
</script>
