<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Lớp học ngoại khóa đã xóa" padded>
      <template #actions>
        <ButtonBack @click="$router.push('/extracurricular/classes/list')" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" class="flex-1 min-w-[200px]" />
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="timeFilter" placeholder="Chọn thời gian">
            <a-select-option value="all">Tất cả</a-select-option>
          </SelectFilter>
        </div>
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái">
            <a-select-option value="all">Tất cả</a-select-option>
          </SelectFilter>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch text="Tìm Kiếm" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <AppTable 
          :columns="columns" 
          :data-source="deletedData" 
          :pagination="false"
          :row-selection="{}"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'action'">
              <TableActions :actions="getActions(record)" />
            </template>
          </template>
          <template #pagination>
            <div class="flex justify-end p-4">
              <BasePagination 
                :total="60" 
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
import { useRouter } from 'vue-router'

import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý học tập ngoại khóa', path: '#' },
  { title: 'Lớp học ngoại khóa', path: '/extracurricular/classes/list' },
  { title: 'Danh sách đã xóa', path: '#' }
]

const searchQuery = ref('')
const timeFilter = ref(undefined)
const statusFilter = ref(undefined)
const currentPage = ref(1)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÔN', dataIndex: 'subject', key: 'subject' },
  { title: 'TÊN LỚP', dataIndex: 'name', key: 'name' },
  { title: 'GIÁO VIÊN PHỤ TRÁCH', dataIndex: 'teacher', key: 'teacher' },
  { title: 'ĐỊA ĐIỂM', dataIndex: 'location', key: 'location' },
  { title: 'SỸ SỐ TỐI ĐA', dataIndex: 'maxSize', key: 'maxSize', align: 'center' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt', width: 180 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const deletedData = ref([
  { id: 1, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Trần Minh Tuấn', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 2, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 3, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 4, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 5, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 6, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 7, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
  { id: 8, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, deletedAt: '2025-02-01 12:12' },
])

const resetFilters = () => {
  searchQuery.value = ''
  timeFilter.value = undefined
  statusFilter.value = undefined
}

const handleRestore = (record: any) => {
  console.log('Restoring class:', record.name)
}

const handlePermanentDelete = (record: any) => {
  console.log('Permanently deleting class:', record.name)
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/extracurricular/classes/detail/${record.id}`) },
  { label: 'Khôi phục', icon: 'BxReset', onClick: () => handleRestore(record) },
  { label: 'Xóa vĩnh viễn', icon: 'BxTrash', danger: true, onClick: () => handlePermanentDelete(record) }
]

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
