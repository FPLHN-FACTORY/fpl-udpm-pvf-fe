<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Lớp học ngoại khóa - Bảng điểm" padded>
      <!-- Table Container -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <AppTable 
          :columns="columns" 
          :data-source="classData" 
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'active' ? 'success' : 'warning'">
                {{ record.status === 'active' ? 'Đang mở' : 'Đã đóng' }}
              </BaseTag>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-button 
                type="primary" 
                class="!bg-[#71dd37] border-none rounded-md h-8 text-[11px] font-bold uppercase px-4"
                @click="$router.push({ name: 'extracurricular-classes-detail', params: { id: record.id }, query: { tab: 'grades' } })"
              >
                Vào Bảng Điểm
              </a-button>
            </template>
          </template>
          <template #pagination>
            <div class="flex justify-end p-4">
              <BasePagination 
                :total="classData.length" 
                :current="currentPage" 
                :page-size="10" 
                @change="handlePageChange" 
              />
            </div>
          </template>
        </AppTable>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'

const breadcrumbs = [
  { title: 'Quản lý học tập ngoại khóa', path: '#' },
  { title: 'Lớp học ngoại khóa', path: '/extracurricular/classes/list' },
  { title: 'Bảng điểm', path: '#' }
]

const currentPage = ref(1)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÔN', dataIndex: 'subject', key: 'subject' },
  { title: 'TÊN LỚP', dataIndex: 'name', key: 'name' },
  { title: 'GIÁO VIÊN', dataIndex: 'teacher', key: 'teacher' },
  { title: 'SỸ SỐ', dataIndex: 'size', key: 'size', align: 'center' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 120 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const classData = ref([
  { id: 1, subject: 'Kỹ năng làm việc nhóm', name: 'UT1301', teacher: 'Nguyễn Văn Hùng', size: '20/20', status: 'active' },
  { id: 2, subject: 'Kỹ năng mềm', name: 'UT1302', teacher: 'Trần Minh Tuấn', size: '15/20', status: 'active' },
])

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
