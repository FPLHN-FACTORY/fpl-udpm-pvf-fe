<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chi tiết Mẫu biên bản" padded title-size="xl">
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon @click="$router.push(`/discipline/templates/edit/${$route.params.id}`)" />
      </template>

      <!-- Detail Info Table -->
      <div class="border border-gray-100 rounded-lg overflow-hidden mb-8">
        <div v-for="(item, index) in templateDetails" :key="index" 
          class="grid grid-cols-[200px_1fr] border-b border-gray-100 last:border-0 min-h-[50px]"
        >
          <div class="bg-gray-50/50 p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100 flex items-center">
            {{ item.label }}
          </div>
          <div class="p-4 text-[13px] text-[#697a8d] flex items-center">
            <template v-if="item.label === 'Tên mẫu biên bản'">
              <span class="bg-[#fcf3d7] px-1 rounded">{{ item.value }}</span>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </AdminCard>

    <!-- Nested List Section -->
    <AdminCard title="Danh sách trường mẫu" class="mt-6">
      <template #actions>
        <ButtonAddNoIcon text="Thêm Mới" @click="() => {}" />
      </template>

      <!-- Filter Bar -->
      <div class="p-4 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch 
            v-model="searchQuery" 
            placeholder="Tìm kiếm" 
          />
        </div>
        <div class="w-[200px]">
          <a-select 
            v-model:value="statusFilter" 
            placeholder="Trạng thái" 
            class="w-full !h-[38px]"
          >
            <a-select-option value="active">Đang sử dụng</a-select-option>
            <a-select-option value="inactive">Ngừng sử dụng</a-select-option>
          </a-select>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="columns" 
          :data-source="dataSource" 
          :pagination="false"
          :row-selection="{ selectedRowKeys: [], onChange: onSelectChange }"
          class="template-detail-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <TableIndex :index="index + 1" />
            </template>

            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'Đang sử dụng' ? 'success' : 'default'">
                {{ record.status }}
              </BaseTag>
            </template>

            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2 justify-center">
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxEdit" class-name="w-[18px] h-[18px]" />
                </button>
                <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors">
                  <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                </button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonAddNoIcon from '@/components/atoms/buttons/ButtonAddNoIcon.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'

const searchQuery = ref('')
const statusFilter = ref(undefined)

const breadcrumbs = [
  { title: 'Kỷ luật khen thưởng', path: '#' },
  { title: 'Mẫu biên bản', path: '/discipline/templates' },
  { title: 'Chi tiết Mẫu biên bản', path: '#' }
]

const templateDetails = ref([
  { label: 'ID', value: 'HS001' },
  { label: 'Tên mẫu biên bản', value: 'BB Kỷ luật nhẹ' },
  { label: 'Tên mức', value: 'Khiển trách' },
  { label: 'Cấp độ', value: '1' },
  { label: 'Thời gian tạo', value: '10/01/2025 09:00' },
  { label: 'Thời gian cập nhật', value: '12/01/2025 14:30' }
])

const columns = [
  { title: 'STT', key: 'stt', width: 60, align: 'center' },
  { title: 'KEY', dataIndex: 'key', key: 'key' },
  { title: 'NỘI DUNG', dataIndex: 'content', key: 'content' },
  { title: 'TRẠNG THÁI', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'actions', width: 120, align: 'center' },
]

const dataSource = ref([
  {
    key: 'hoc_vien',
    content: 'Thông tin học viên',
    status: 'Đang sử dụng',
  },
  {
    key: 'ly_do',
    content: 'Lý do vi phạm',
    status: 'Đang sử dụng',
  },
])

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
}

const onSelectChange = (selectedRowKeys: any) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
