<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Lớp học ngoại khóa" padded>
      <template #actions>
        <ButtonDeleteList text="Danh Sách Đã Xóa" @click="$router.push('/extracurricular/classes/deleted')" />
        <ButtonAdd text="Thêm Mới" @click="$router.push('/extracurricular/classes/create')" />
        <ButtonExport text="Xuất Danh Sách" />
        <ButtonImport text="Nhập Danh Sách" />
      </template>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" class="flex-1 min-w-[200px]" />
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="subjectFilter" placeholder="Chọn môn">
            <a-select-option value="tamly">Tâm lý thi đấu</a-select-option>
          </SelectFilter>
        </div>
        
        <div class="w-[180px]">
          <SelectFilter v-model:value="statusFilter" placeholder="Chọn trạng thái">
            <a-select-option value="active">Đang giảng dạy</a-select-option>
            <a-select-option value="inactive">Ngừng hợp tác</a-select-option>
          </SelectFilter>
        </div>

        <div class="flex items-center gap-2">
          <ButtonSearch text="Tìm Kiếm" />
          <IconButton 
            name="BxReset" 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] text-white" 
            @click="resetFilters" 
          />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <AppTable 
          :columns="columns" 
          :data-source="classData" 
          :pagination="false"
          :row-selection="{}"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'active' ? 'success' : 'warning'" class="!rounded-md !px-3">
                {{ record.status === 'active' ? 'Đang giảng dạy' : 'Ngừng hợp tác' }}
              </BaseTag>
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
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonExport from '@/components/atoms/buttons/ButtonExport.vue'
import ButtonImport from '@/components/atoms/buttons/ButtonImport.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import IconButton from '@/components/atoms/buttons/IconButton.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý học tập ngoại khóa', path: '#' },
  { title: 'Lớp học ngoại khóa', path: '/extracurricular/classes/list' }
]

const searchQuery = ref('')
const subjectFilter = ref(undefined)
const statusFilter = ref(undefined)
const currentPage = ref(3)

const columns = [
  { title: '#', key: 'stt', width: '60px', align: 'center' },
  { title: 'MÔN', dataIndex: 'subject', key: 'subject' },
  { title: 'TÊN LỚP', dataIndex: 'name', key: 'name' },
  { title: 'GIÁO VIÊN PHỤ TRÁCH', dataIndex: 'teacher', key: 'teacher' },
  { title: 'ĐỊA ĐIỂM', dataIndex: 'location', key: 'location' },
  { title: 'SỸ SỐ TỐI ĐA', dataIndex: 'maxSize', key: 'maxSize', align: 'center' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 150, align: 'center' }
]

const classData = ref([
  { id: 1, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Trần Minh Tuấn', location: 'Phòng thể lực PVF', maxSize: 32, status: 'active' },
  { id: 2, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'active' },
  { id: 3, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'active' },
  { id: 4, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'active' },
  { id: 5, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'active' },
  { id: 6, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'inactive' },
  { id: 7, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'inactive' },
  { id: 8, subject: 'Tâm lý thi đấu', name: 'UT1301', teacher: 'Lê Hoàng Nam', location: 'Phòng thể lực PVF', maxSize: 32, status: 'inactive' },
])

const resetFilters = () => {
  searchQuery.value = ''
  subjectFilter.value = undefined
  statusFilter.value = undefined
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/extracurricular/classes/detail/${record.id}`) },
  { label: 'Chỉnh sửa', icon: 'BxEditAlt', onClick: () => router.push(`/extracurricular/classes/edit/${record.id}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => console.log('Delete', record.id) }
]

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
</style>
