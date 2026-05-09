// fpl-udpm-pvf-fe/src/components/pages/extracurricular/ActivityListPage.vue
<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-6">
      <div v-for="card in summaryCards" :key="card.label" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-gray-400 mb-2">{{ card.label }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-[22px] font-bold text-[#566a7f]">{{ card.value }}</span>
            <span v-if="card.hint" :class="card.hintClass" class="text-[12px] font-medium">{{ card.hint }}</span>
          </div>
        </div>
        <div :class="card.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <NavIcon :name="card.icon" :size="20" :class-name="card.iconColor" />
        </div>
      </div>
    </div>

    <AdminCard title="Danh sách hoạt động ngoại khóa">
      <template #actions>
        <ButtonDeleteList @click="$router.push('/extracurricular/activities/deleted')" />
        <ButtonAdd @click="$router.push('/extracurricular/activities/create')" />
        
        <button class="inline-flex items-center gap-2 rounded-md bg-lime-500 px-4 py-[9px] text-[13px] font-bold text-white transition hover:bg-lime-600 shadow-sm">
          <NavIcon name="BxDownload" class-name="w-4 h-4 text-white" />
          Xuất Danh Sách
        </button>
        
        <button class="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-4 py-[9px] text-[13px] font-bold text-white transition hover:bg-cyan-600 shadow-sm">
          <NavIcon name="BxUpload" class-name="w-4 h-4 text-white" />
          Nhập Danh Sách
        </button>
      </template>

      <!-- Bộ lọc (Filters) - Đã dùng flex-nowrap để đảm bảo luôn trên 1 dòng -->
      <div class="p-6 flex flex-nowrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100 overflow-x-auto">
        <div class="flex-1 min-w-[180px]">
          <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
        </div>
        <a-date-picker v-model:value="filters.date" placeholder="Chọn thời gian" class="w-[160px] flex-shrink-0 !h-[38px] !border-[#d9dee3] rounded-md" />
        <div class="w-[150px] flex-shrink-0">
          <SelectFilter v-model:value="filters.teacher" placeholder="Người phụ trách">
            <a-select-option value="1">Trần Minh Tuấn</a-select-option>
            <a-select-option value="2">Nguyễn Văn Hùng</a-select-option>
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
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'Đang diễn ra' ? 'success' : 'warning'">{{ record.status }}</BaseTag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <TableActions :actions="getActions(record)" />
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
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import TableActions from '@/components/molecules/TableActions.vue'
import { useRouter } from 'vue-router'
import { activityService, type ActivityRecord } from '@/services/extracurricular/activity'

const router = useRouter()

const getActions = (record: ActivityRecord) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => router.push(`/extracurricular/activities/detail/${record.id}`) },
  { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => router.push(`/extracurricular/activities/edit/${record.id}`) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => handleDelete(record.id) },
]

const breadcrumbs = [
  { title: 'Quản lý hoạt động ngoại khoá', path: '#' },
  { title: 'Hoạt động ngoại khoá', path: '/extracurricular/activities/list' }
]

const loading = ref(false)
const dataSource = ref<ActivityRecord[]>([])
const summaryData = ref<any>({})

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
  { title: 'TRẠNG THÁI', key: 'status', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center', width: 120 }
]

const summaryCards = computed(() => [
  { label: 'Tổng số hoạt động', value: summaryData.value.total || 0, icon: 'BxBookAlt', iconBg: 'bg-[#e7e7ff]', iconColor: 'text-[#696cff]' },
  { label: 'Số hoạt động đang diễn ra', value: summaryData.value.active || 0, hint: '(Đang chạy)', hintClass: 'text-green-500', icon: 'BxCheckShield', iconBg: 'bg-[#e8fadf]', iconColor: 'text-[#71dd37]' },
  { label: 'Tổng học viên tham gia', value: summaryData.value.totalStudents || 0, icon: 'BxUser', iconBg: 'bg-[#e7e7ff]', iconColor: 'text-[#696cff]' },
  { label: 'Số hoạt động đã hoàn thành', value: summaryData.value.completed || 0, hint: '(Đã xong)', hintClass: 'text-red-500', icon: 'BxCheckShield', iconBg: 'bg-[#ffe5e5]', iconColor: 'text-[#ff3e1d]' }
])

const fetchList = async () => {
  loading.value = true
  try {
    const res = await activityService.getList(filters, pagination.current, pagination.pageSize)
    dataSource.value = res.data
    pagination.total = res.meta.total
    summaryData.value = res.summary
  } catch (error) {
    message.error('Lỗi khi tải dữ liệu!')
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

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có chắc chắn muốn xóa hoạt động này không?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      await activityService.softDelete(id)
      message.success('Đã chuyển vào thùng rác')
      fetchList()
    }
  })
}

onMounted(() => {
  fetchList()
})
</script>