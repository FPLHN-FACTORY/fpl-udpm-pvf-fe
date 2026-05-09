// fpl-udpm-pvf-fe/src/components/pages/extracurricular/ActivityDeletedPage.vue
<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Danh sách Hoạt động ngoại khoá đã xóa">
      <template #actions>
        <ButtonBack @click="$router.back()" />
      </template>

      <!-- Bộ lọc (Filters) - Đã thêm trạng thái & Ép trên 1 dòng -->
      <div class="p-6 flex flex-nowrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100 overflow-x-auto">
        <div class="flex-1 min-w-[150px]">
          <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
        </div>
        <a-date-picker v-model:value="filters.date" placeholder="Chọn thời gian" class="w-[160px] flex-shrink-0 !h-[38px] !border-[#d9dee3] rounded-md" />
        <div class="w-[150px] flex-shrink-0">
          <SelectFilter v-model:value="filters.teacher" placeholder="Người phụ trách">
            <a-select-option value="1">Trần Minh Tuấn</a-select-option>
          </SelectFilter>
        </div>
        <div class="w-[150px] flex-shrink-0">
          <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
            <a-select-option value="active">Đang diễn ra</a-select-option>
            <a-select-option value="pending">Sắp diễn ra</a-select-option>
          </SelectFilter>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
          <ButtonSearch @click="handleSearch" />
          <ButtonReset @click="handleReset" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <AppTable :columns="columns" :data-source="dataSource" :pagination="false" :loading="loading" :row-selection="{ selectedRowKeys: [], onChange: () => {} }">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">{{ (pagination.current - 1) * pagination.pageSize + index + 1 }}</template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center justify-center gap-2">
                <button title="Xem" @click="$router.push(`/extracurricular/activities/detail/${record.id}`)" class="text-gray-400 hover:text-[#696cff] p-1"><NavIcon name="BxShow" size="18" /></button>
                <button title="Khôi phục" @click="handleRestore(record.id)" class="text-gray-400 hover:text-green-500 p-1"><NavIcon name="BxReset" size="18" /></button>
                <button title="Xóa vĩnh viễn" @click="handleHardDelete(record.id)" class="text-gray-400 hover:text-red-500 p-1"><NavIcon name="BxTrash" size="18" /></button>
              </div>
            </template>
          </template>
        </AppTable>
      </div>
      
      <div class="p-6 flex justify-end">
        <BasePagination 
          :total="pagination.total" 
          :current="pagination.current" 
          :page-size="pagination.pageSize" 
          @change="(page) => { pagination.current = page; fetchList() }" 
        />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { activityService, type ActivityRecord } from '@/services/extracurricular/activity'

const breadcrumbs = [
  { title: 'Quản lý hoạt động ngoại khoá', path: '#' },
  { title: 'Hoạt động ngoại khoá', path: '/extracurricular/activities/list' },
  { title: 'Thùng rác', path: '#' }
]

const loading = ref(false)
const dataSource = ref<ActivityRecord[]>([])

const filters = reactive({
  keyword: '',
  date: null,
  teacher: undefined,
  status: undefined
})

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

const columns = [
  { title: '#', key: 'index', width: 60, align: 'center' },
  { title: 'TÊN HOẠT ĐỘNG', dataIndex: 'name', key: 'name' },
  { title: 'ĐỊA ĐIỂM', dataIndex: 'location', key: 'location' },
  { title: 'GIÁO VIÊN PHỤ TRÁCH', dataIndex: 'teacher', key: 'teacher' },
  { title: 'THỜI GIAN BẮT ĐẦU', dataIndex: 'start', key: 'start' },
  { title: 'THỜI GIAN KẾT THÚC', dataIndex: 'end', key: 'end' },
  { title: 'NGÀY XÓA', dataIndex: 'deletedAt', key: 'deletedAt' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

const fetchList = async () => {
  loading.value = true
  try {
    const res = await activityService.getDeletedList(filters, pagination.current, pagination.pageSize)
    dataSource.value = res.data
    pagination.total = res.meta.total
  } catch (error) {
    message.error('Lỗi khi tải dữ liệu đã xóa!')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  fetchList()
}

const handleReset = () => {
  filters.keyword = ''
  filters.date = null
  filters.teacher = undefined
  filters.status = undefined
  handleSearch()
}

const handleRestore = async (id: string) => {
  await activityService.restore(id)
  message.success('Khôi phục thành công')
  fetchList()
}

const handleHardDelete = (id: string) => {
  Modal.confirm({
    title: 'Xóa vĩnh viễn',
    content: 'Bạn không thể hoàn tác thao tác này. Có chắc chắn xóa?',
    okText: 'Xóa vĩnh viễn',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      await activityService.hardDelete(id)
      message.success('Đã xóa vĩnh viễn')
      fetchList()
    }
  })
}

onMounted(() => {
  fetchList()
})
</script>