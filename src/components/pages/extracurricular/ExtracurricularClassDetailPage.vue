<template>
  <div class="space-y-6 pb-8">
    <!-- Breadcrumbs -->
    <a-breadcrumb class="text-sm">
      <a-breadcrumb-item>Quản lý học tập ngoại khóa</a-breadcrumb-item>
      <a-breadcrumb-item>Lớp học ngoại khóa</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- Main Detail Card -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Chi tiết Lớp học ngoại khóa</h2>
        <div class="flex items-center gap-3">
          <ButtonBack @click="handleBack" />
          <ButtonEditNoIcon @click="$router.push(`/extracurricular/classes/edit/1`)" />
        </div>
      </div>

      <!-- Detail Info -->
      <div class="pb-10">
        <DetailList :items="classDetails">
          <template #value-status="{ item }">
            <BaseTag type="processing">{{ item.value }}</BaseTag>
          </template>
        </DetailList>
      </div>
    </a-card>

    <div class="mt-6"></div>

    <!-- Bottom Section: Students Table with Tabs -->
    <a-card :bordered="false" class="shadow-sm rounded-xl">
      <!-- Card Header -->
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">Học viên tham gia lớp học</h2>
        <div class="flex items-center gap-2">
          <ButtonAdd text="Thêm Học Viên" />
          <ButtonExport text="Xuất Danh Sách" />
          <ButtonImport text="Nhập Danh Sách" />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 -mx-6 mb-0"></div>

      <!-- Tabs Navigation -->
      <div class="px-6 pt-4 flex gap-4 border-b border-gray-100 bg-[#fcfcfd] -mx-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            activeTab === tab.key 
              ? 'bg-[#696cff] text-white' 
              : 'bg-[#e7e7ff] text-[#696cff] hover:bg-[#dbdbff]'
          ]"
          class="px-6 py-2 rounded-md text-xs font-medium transition-colors mb-4 ml-6 first:ml-6"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content: Danh Sách -->
      <div v-if="activeTab === 'list'" class="-mx-6">
        <AppTable 
          :columns="studentColumns" 
          :data-source="studentData" 
          :pagination="false"
          :row-selection="{}"
          class="custom-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag type="success" class="!rounded-md !px-3">Học đi</BaseTag>
            </template>
            <template v-else-if="column.key === 'action'">
              <TableActions :actions="getStudentActions(record)" />
            </template>
          </template>
        </AppTable>
      </div>

      <!-- Tab Content: Điểm Danh -->
      <div v-if="activeTab === 'attendance'" class="p-6 space-y-6">
        <div class="w-[200px]">
          <a-select defaultValue="buoi1" class="w-full !h-10 custom-select">
            <a-select-option value="buoi1">Chọn Buổi</a-select-option>
            <a-select-option value="buoi2">Buổi 2</a-select-option>
          </a-select>
        </div>
        <div class="-mx-6 border-t border-gray-100">
          <AppTable 
            :columns="attendanceColumns" 
            :data-source="studentData" 
            :pagination="false"
            :row-selection="{}"
            class="custom-table"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'stt'">
                <TableIndex :index="index + 1" />
              </template>
              <template v-else-if="column.key === 'attendance'">
                <a-switch v-model:checked="record.isPresent" />
              </template>
              <template v-else-if="column.key === 'note'">
                <a-input v-model:value="record.note" placeholder="..." class="!h-8" />
              </template>
            </template>
          </AppTable>
        </div>
      </div>

      <!-- Tab Content: Bảng Điểm -->
      <div v-if="activeTab === 'grades'" class="-mx-6">
        <AppTable 
          :columns="gradeColumns" 
          :data-source="studentData" 
          :pagination="false"
          :row-selection="{}"
          class="custom-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key.startsWith('score')">
              <a-input v-model:value="record[column.key]" placeholder="..." class="!h-8 w-20 mx-auto block text-center" />
            </template>
          </template>
        </AppTable>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import AppTable from '@/components/organisms/AppTable.vue'
import DetailList from '@/components/molecules/DetailList.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonExport from '@/components/atoms/buttons/ButtonExport.vue'
import ButtonImport from '@/components/atoms/buttons/ButtonImport.vue'

const router = useRouter()
const activeTab = ref(router.currentRoute.value.query.tab as string || 'list')

const tabs = [
  { key: 'list', label: 'Danh Sách' },
  { key: 'attendance', label: 'Điểm Danh' },
  { key: 'grades', label: 'Bảng Điểm' },
]

const classDetails = computed(() => [
  { label: 'Tên lớp', value: 'UT1301', key: 'name' },
  { label: 'Môn', value: 'Kỹ năng làm việc nhóm', key: 'subject' },
  { label: 'Địa điểm', value: 'Phòng học chiến thuật PVF', key: 'location' },
  { label: 'Giáo viên phụ trách', value: 'Nguyễn Văn Hùng - Hungnv12', key: 'teacher' },
  { label: 'Sỹ số lớp tối đa', value: '20', key: 'maxSize' },
  { label: 'Thời gian tạo', value: '2025-01-05 08:30:00', key: 'createdAt' },
  { label: 'Thời gian cập nhật', value: '2026-01-20 10:15:45', key: 'updatedAt' },
  { label: 'Trạng thái', value: 'Đang mở', key: 'status' },
])

const studentColumns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'EMAIL', dataIndex: 'email', key: 'email' },
  { title: 'NGÀY VÀO LỚP', dataIndex: 'joinDate', key: 'joinDate' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 120 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const attendanceColumns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐIỂM DANH', key: 'attendance', width: 120, align: 'center' },
  { title: 'GHI CHÚ', key: 'note' }
]

const gradeColumns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐẦU ĐIỂM SỐ 1', key: 'score1', width: 150, align: 'center' },
  { title: 'ĐẦU ĐIỂM SỐ 2', key: 'score2', width: 150, align: 'center' },
  { title: 'ĐẦU ĐIỂM SỐ 3', key: 'score3', width: 150, align: 'center' }
]

const studentData = ref([
  { id: 1, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: true, note: '', score1: '', score2: '', score3: '' },
  { id: 2, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: false, note: '', score1: '', score2: '', score3: '' },
  { id: 3, code: '18A121212', name: 'Nguyễn Xuân An', email: 'Annx121212@gmail.com', joinDate: '2025-02-10', status: 'active', isPresent: true, note: '', score1: '', score2: '', score3: '' },
])

const getStudentActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => console.log('View', record.id) },
  { label: 'Chỉnh sửa', icon: 'BxEditAlt', onClick: () => console.log('Edit', record.id) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => console.log('Delete', record.id) }
]

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: transparent;
  color: #22303E;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.custom-table .ant-table-tbody > tr > td) {
  padding: 16px;
  color: #22303E;
  opacity: 0.9;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.custom-select .ant-select-selector) {
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}
</style>
