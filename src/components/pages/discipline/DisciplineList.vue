<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="space-y-6">
      <!-- Statistic Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a-card v-for="(stat, index) in stats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all h-[110px]">
          <div class="flex justify-between h-full p-5">
            <div class="flex flex-col justify-between">
              <span class="text-[#566a7f] text-[13px] font-medium leading-tight opacity-80">{{ stat.title }}</span>
              <div class="flex items-baseline space-x-2">
                <span class="text-[22px] font-bold text-[#566a7f] leading-none">{{ stat.value }}</span>
                <span v-if="stat.percent" class="text-[13px] font-medium text-[#71dd37]">
                  ({{ stat.percent }})
                </span>
              </div>
            </div>
            <div class="flex items-start">
              <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
                 <NavIcon :name="stat.icon" :class-name="stat.iconColor" :size="22" />
              </div>
            </div>
          </div>
        </a-card>
      </div>

      <!-- Main Table Card -->
      <a-card :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
        <!-- Card Header: Title and Buttons -->
        <div class="flex items-center justify-between p-6 pb-4 bg-white">
          <h2 class="text-[18px] font-bold text-gray-700 m-0 uppercase tracking-tight">Danh sách quyết định kỷ luật</h2>
          <div class="flex items-center gap-3">
            <ButtonDeleteList @click="goToDeleted" />
            <ButtonAdd label="Thêm Mới" @click="goToCreate" />
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="flex flex-nowrap items-center gap-3 p-6 bg-[#fcfcfd] border-b border-gray-100">
          <div class="w-[300px]">
            <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="filters.user" placeholder="Chọn người quyết định">
              <a-select-option v-for="user in userOptions" :key="user.value" :value="user.value">
                {{ user.label }}
              </a-select-option>
            </SelectFilter>
          </div>
          <div class="w-[220px]">
            <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
              <a-select-option value="published">Đã ban hành</a-select-option>
              <a-select-option value="draft">Bản nháp</a-select-option>
            </SelectFilter>
          </div>

          <div class="flex items-center gap-2 ml-auto">
            <ButtonSearch @click="handleSearch" />
            <ButtonReset @click="handleReset" />
          </div>
        </div>

        <!-- Data Table -->
        <div class="px-0">
          <AppTable 
            :columns="columns" 
            :data-source="decisions" 
            :pagination="false"
            :row-selection="rowSelection"
            class="pvf-standard-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'id'">
                <span class="font-medium text-[#696cff] cursor-pointer hover:underline">{{ record.id }}</span>
              </template>

              <template v-if="column.key === 'student'">
                <span class="font-bold text-[#566a7f]">{{ record.student }}</span>
              </template>

              <template v-if="column.key === 'status'">
                <BaseTag type="success" class="!rounded-md !px-3 !bg-[#e8fadf] !text-[#71dd37] border-none font-medium">
                  Đã ban hành
                </BaseTag>
              </template>

              <template v-if="column.key === 'actions'">
                <TableActions :actions="getActions(record)" />
              </template>
            </template>
          </AppTable>
        </div>

        <!-- Pagination -->
        <div class="flex justify-end p-6 bg-white border-t border-gray-100">
          <BasePagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="pageSize"
            @change="handlePageChange"
          />
        </div>
      </a-card>
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import TableActions from '@/components/molecules/TableActions.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Kỷ luật khen thưởng', href: '#' },
  { title: 'Quyết định kỷ luật', href: '#' }
]

const stats = [
  { title: 'Tổng số quyết định', value: '21', icon: 'BxStatsTile', iconBg: 'bg-[#e7e7ff]', iconColor: 'text-[#696cff]' },
  { title: 'Số đang hiệu lực', value: '20', percent: '95%', icon: 'BxCalendarCheck', iconBg: 'bg-[#ffe5e5]', iconColor: 'text-[#ff3e1d]' },
  { title: 'Số đã kết thúc', value: '1', percent: '5%', icon: 'BxLayersMinus', iconBg: 'bg-[#fff2d6]', iconColor: 'text-[#ffab00]' },
  { title: 'Số học viên bị kỷ luật', value: '21', percent: '5%', icon: 'BxLayersPlus', iconBg: 'bg-[#fff2d6]', iconColor: 'text-[#ffab00]' }
]

const filters = reactive({ keyword: '', user: undefined, status: undefined })
const userOptions = [
  { label: 'Nguyễn Minh Quân', value: 'Quân' },
  { label: 'Lê Văn C', value: 'C' }
]

const decisions = ref([
  { id: 'HS001', student: 'Nguyễn Văn An', template: 'BB Khiển trách', date: '10/01/2025', creator: 'Nguyễn Minh Quân' },
  { id: 'HS001', student: 'Nguyễn Văn An', template: 'BB Khiển trách', date: '10/01/2025', creator: 'Nguyễn Minh Quân' },
  { id: 'HS001', student: 'Nguyễn Văn An', template: 'BB Khiển trách', date: '10/01/2025', creator: 'Nguyễn Minh Quân' },
  { id: 'HS001', student: 'Nguyễn Văn An', template: 'BB Khiển trách', date: '10/01/2025', creator: 'Nguyễn Minh Quân' }
])

const columns = [
  { title: 'ID BIÊN BẢN', key: 'id', dataIndex: 'id', width: 140 },
  { title: 'HỌC VIÊN', key: 'student', dataIndex: 'student', width: 180 },
  { title: 'MẪU BIÊN BẢN', key: 'template', dataIndex: 'template' },
  { title: 'NGÀY QUYẾT ĐỊNH', key: 'date', dataIndex: 'date', width: 200 },
  { title: 'NGƯỜI QUYẾT ĐỊNH', key: 'creator', dataIndex: 'creator', width: 180 },
  { title: 'TRẠNG THÁI', key: 'status', width: 160, align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

// Pagination
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Checkbox selection
const selectedRowKeys = ref<string[]>([])
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (keys: string[]) => {
    selectedRowKeys.value = keys
  }
}

const getActions = (record: any) => [
  { label: 'Xem chi tiết', icon: 'BxShow', onClick: () => goToDetail(record.id) },
  { label: 'Chỉnh sửa', icon: 'BxEdit', onClick: () => goToEdit(record.id) },
  { label: 'Xóa', icon: 'BxTrash', danger: true, onClick: () => handleGoToDelete(record) },
]

const goToDetail = (id: string) => {
  router.push({ name: 'discipline-decisions-detail', params: { id: id } })
}

const goToEdit = (id: string) => {
  router.push({ name: 'discipline-decisions-edit', params: { id: id } })
}

const handleGoToDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: `Bạn có muốn xóa biên bản ${record.id} không?`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      decisions.value = decisions.value.filter(item => item.id !== record.id)
      message.success('Xóa thành công!')
    },
  })
}

const handleSearch = () => { console.log('Searching...') }
const handleReset = () => { 
  filters.keyword = ''
  filters.user = undefined
  filters.status = undefined 
}

const goToCreate = () => { router.push({ name: 'discipline-decisions-create' }) }
const goToDeleted = () => {
  router.push({ name: 'discipline-decisions-deleted' })
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 0;
}

:deep(.pvf-standard-table .ant-table-thead > tr > th) {
  background-color: white !important;
  color: #566a7f !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 13px !important;
  padding: 16px 24px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-tbody > tr > td) {
  padding: 16px 24px !important;
  color: #566a7f !important;
  font-size: 13px !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

:deep(.pvf-standard-table .ant-table-row:hover > td) {
  background-color: #f8faff !important;
}

:deep(.ant-input-affix-wrapper),
:deep(.ant-select-selector) {
  border-radius: 8px !important;
  border-color: #d9dee3 !important;
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.ant-input-affix-wrapper):focus,
:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  border-color: #d9dee3 !important;
  box-shadow: none !important;
}

:deep(.ant-input-affix-wrapper:hover),
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: #696cff !important;
}

:deep(.ant-table-thead > tr > th:not(:last-child)::after) {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background-color: #d9dee3;
}
</style>