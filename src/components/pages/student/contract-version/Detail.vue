<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học viên</a-breadcrumb-item>
      <a-breadcrumb-item>Phiên bản hợp đồng</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Basic Info Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <h2 class="text-[20px] font-bold text-gray-700 m-0">Chi tiết Phiên bản hợp đồng</h2>
        <div class="flex gap-2">
          <ButtonBack @click="$router.push('/student/contract-version')" />
          <ButtonEdit @click="$router.push(`/student/contract-version/edit/${$route.params.id}`)" />
        </div>
      </div>

      <DetailList :items="detailItems">
        <template #value-status="{ item }">
          <BaseTag :type="item.value === 'active' ? 'success' : 'default'">
            {{ item.value === 'active' ? 'Đang hoạt động' : 'Ngừng sử dụng' }}
          </BaseTag>
        </template>
      </DetailList>
    </a-card>

    <!-- Terms Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mt-6">
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[18px] font-bold text-gray-700 m-0">Các điều khoản, quyền lợi, nghĩa vụ, ...</h2>
        <ButtonAdd @click="handleAddTerm" />
      </div>

      <a-table 
        :columns="termColumns" 
        :data-source="termData" 
        :pagination="false"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button class="text-gray-400 hover:text-green-500 transition-colors">
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button class="text-gray-400 hover:text-red-500 transition-colors">
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- Allowance Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mt-6">
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[18px] font-bold text-gray-700 m-0">Trợ cấp</h2>
        <ButtonAdd @click="handleAddAllowance" />
      </div>

      <a-table 
        :columns="allowanceColumns" 
        :data-source="allowanceData" 
        :pagination="false"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button class="text-gray-400 hover:text-green-500 transition-colors">
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button class="text-gray-400 hover:text-red-500 transition-colors">
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- Equipment Table Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl mt-6 mb-10">
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[18px] font-bold text-gray-700 m-0">Dụng cụ của phiên bản hợp đồng</h2>
        <ButtonAdd @click="handleAddEquipment" />
      </div>

      <a-table 
        :columns="equipmentColumns" 
        :data-source="equipmentData" 
        :pagination="false"
        class="custom-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span class="font-medium text-[#696cff]">{{ index + 1 }}</span>
          </template>
          <template v-if="column.key === 'actions'">
            <div class="flex items-center space-x-3">
              <button class="text-gray-400 hover:text-green-500 transition-colors">
                <NavIcon name="BxEdit" size="18" />
              </button>
              <button class="text-gray-400 hover:text-red-500 transition-colors">
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </template>
        </template>
      </a-table>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-8 border-t pt-4 border-gray-100">
        <span class="text-sm text-gray-500">2025 © PVF VN</span>
        <span class="text-sm text-gray-500">Design & Develop by FPT POLYTECHNIC</span>
      </div>
    </a-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import ButtonEdit from '../../../atoms/buttons/ButtonEdit.vue'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import DetailList from '../../../molecules/DetailList.vue'

const router = useRouter()

const detailItems = [
  { label: 'Tên phiên bản hợp đồng', value: 'Phiên bản chuẩn PVF v1.0' },
  { label: 'Tên loại hợp đồng', value: 'Đào tạo cầu thủ trẻ' },
  { label: 'Ngày bắt đầu áp dụng phiên bản', value: '2025-01-15 08:30:00' },
  { label: 'Ngày kết thúc áp dụng phiên bản', value: '2025-01-25 08:30:00' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45' },
  { key: 'status', label: 'Trạng thái', value: 'active' }
]

const handleAddTerm = () => console.log('Add term')
const handleAddAllowance = () => console.log('Add allowance')
const handleAddEquipment = () => console.log('Add equipment')

// Terms
const termColumns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'TÊN ĐIỀU KHOẢN', dataIndex: 'name', key: 'name' },
  { title: 'MÔ TẢ', dataIndex: 'desc', key: 'desc' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]
const termData = ref([
  { key: '1', name: 'Điều khoản 1', desc: 'Mô tả Điều khoản 1' },
  { key: '2', name: 'Điều khoản 2', desc: 'Mô tả Điều khoản 2' }
])

// Allowance
const allowanceColumns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'NĂM ÁP DỤNG TRỢ CẤP', dataIndex: 'year', key: 'year' },
  { title: 'SỐ TIỀN TRỢ CẤP', dataIndex: 'amount', key: 'amount' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]
const allowanceData = ref([
  { key: '1', year: '2025', amount: '2.000.000 VNĐ' }
])

// Equipment
const equipmentColumns = [
  { title: '#', key: 'index', width: 60 },
  { title: 'TÊN DỤNG CỤ', dataIndex: 'name', key: 'name' },
  { title: 'NĂM ÁP DỤNG DỤNG CỤ', dataIndex: 'year', key: 'year' },
  { title: 'SỐ LƯỢNG DỤNG CỤ', dataIndex: 'qty', key: 'qty' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]
const equipmentData = ref([
  { key: '1', name: 'Giày thể thao', year: '2025', qty: '2' },
  { key: '2', name: 'Áo tập', year: '2025', qty: '5' }
])
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: transparent;
  color: #22303E;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  border-bottom: 1px solid #f0f2f5;
  padding: 16px;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #22303E;
  opacity: 0.9;
  border-bottom: 1px solid #f0f2f5;
  font-size: 14px;
}

:deep(.ant-table-row:hover > td) {
  background-color: #f8faff !important;
}
</style>
