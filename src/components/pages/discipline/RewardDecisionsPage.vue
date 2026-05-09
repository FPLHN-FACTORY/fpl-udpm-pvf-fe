<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <!-- Stat Cards -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm">
        <div>
          <div class="text-[13px] text-[#566a7f] font-medium mb-1">Tổng số quyết định</div>
          <div class="text-[22px] font-bold text-[#566a7f]">21</div>
        </div>
        <div class="w-[42px] h-[42px] rounded-lg bg-[#e7e7ff] text-[#696cff] flex items-center justify-center">
          <NavIcon name="BxFile" size="24" />
        </div>
      </div>
      <div class="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm">
        <div>
          <div class="text-[13px] text-[#566a7f] font-medium mb-1">Số đang hiệu lực</div>
          <div class="flex items-baseline gap-2">
            <div class="text-[22px] font-bold text-[#566a7f]">20</div>
            <div class="text-[13px] text-[#71dd37]">(95%)</div>
          </div>
        </div>
        <div class="w-[42px] h-[42px] rounded-lg bg-[#ffe0db] text-[#ff3e1d] flex items-center justify-center">
          <NavIcon name="BxCalendarCheck" size="24" />
        </div>
      </div>
      <div class="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm">
        <div>
          <div class="text-[13px] text-[#566a7f] font-medium mb-1">Số đã kết thúc</div>
          <div class="flex items-baseline gap-2">
            <div class="text-[22px] font-bold text-[#566a7f]">1</div>
            <div class="text-[13px] text-[#71dd37]">(5%)</div>
          </div>
        </div>
        <div class="w-[42px] h-[42px] rounded-lg bg-[#fff2d6] text-[#ffab00] flex items-center justify-center">
          <NavIcon name="BxCheckShield" size="24" />
        </div>
      </div>
      <div class="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm">
        <div>
          <div class="text-[13px] text-[#566a7f] font-medium mb-1">Số học viên được khen</div>
          <div class="flex items-baseline gap-2">
            <div class="text-[22px] font-bold text-[#566a7f]">21</div>
            <div class="text-[13px] text-[#71dd37]">(5%)</div>
          </div>
        </div>
        <div class="w-[42px] h-[42px] rounded-lg bg-[#fff2d6] text-[#ffab00] flex items-center justify-center">
          <NavIcon name="BxBadgeCheck" size="24" />
        </div>
      </div>
    </div>

    <AdminCard 
      :title="isDeletedView ? 'Danh sách Quyết định khen thưởng đã xóa' : 'Danh sách Quyết định khen thưởng'" 
    >
      <template #actions>
        <ButtonDeleteList 
          v-if="!isDeletedView"
          @click="handleViewDeleted"
        />
        <ButtonBack 
          v-if="isDeletedView"
          @click="handleViewDeleted"
        />
        <ButtonAdd 
          v-if="!isDeletedView"
          @click="handleCreate"
        />
      </template>

      <RewardDecisionFilter 
        v-model:filters="filters"
        @search="handleSearch" 
        @reset="handleReset" 
      />

      <div class="px-6 pb-6 pt-4">
        <RewardDecisionTable
          :data-source="decisions"
          :loading="loading"
          :total="filteredCount"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          :is-deleted-view="isDeletedView"
          @edit="handleEdit"
          @delete="handleDelete"
          @view="handleViewDetail"
          @restore="handleRestore"
          @page-change="handlePageChange"
        />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import RewardDecisionFilter from '@/components/molecules/discipline/RewardDecisionFilter.vue'
import RewardDecisionTable from '@/components/organisms/RewardDecisionTable.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'

interface RewardDecision {
  id: string
  recordId: string
  studentName: string
  templateName: string
  decisionDate: string
  decider: string
  status: string
  isDeleted?: boolean
  deletedAt?: string
}

interface FilterState {
  search: string
  decider: string
  status: string
}

const router = useRouter()

const loading = ref(false)
const isDeletedView = ref(false)
const decisions = ref<RewardDecision[]>([])

const breadcrumbs = [
  { title: 'Kỷ luật Khen thưởng', path: '#' },
  { title: 'Quyết định khen thưởng', path: '/discipline/reward-decisions' }
]

const filters = reactive<FilterState>({
  search: '',
  decider: '',
  status: ''
})

const pagination = reactive({
  current: 3, 
  pageSize: 10
})

// Mock data matching the screenshot
const mockDecisions: RewardDecision[] = [
  ...Array.from({ length: 4 }, (_, index) => ({
    id: `decision-${index + 1}`,
    recordId: 'HS001',
    studentName: 'Nguyễn Văn An',
    templateName: 'BB Khen thưởng',
    decisionDate: '10/01/2025',
    decider: 'Nguyễn Minh Quân',
    status: 'published',
    isDeleted: false
  })),
  ...Array.from({ length: 3 }, (_, index) => ({
    id: `decision-del-${index + 1}`,
    recordId: 'HS001',
    studentName: 'Nguyễn Văn An',
    templateName: 'BB Khen thưởng',
    decisionDate: '10/01/2025',
    decider: 'Nguyễn Minh Quân',
    status: 'published',
    deletedAt: '20/01/2025 9:00',
    isDeleted: true
  }))
]

const filteredDecisions = computed(() => {
  let result = mockDecisions.filter(item => !!item.isDeleted === isDeletedView.value)
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(item => 
      item.studentName.toLowerCase().includes(searchLower) ||
      item.recordId.toLowerCase().includes(searchLower)
    )
  }
  
  if (filters.decider) {
    result = result.filter(item => item.decider === filters.decider)
  }

  if (filters.status) {
    result = result.filter(item => item.status === filters.status)
  }
  
  return result
})

const filteredCount = computed(() => filteredDecisions.value.length)

const fetchData = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    decisions.value = filteredDecisions.value
  } catch (error) {
    message.error('Không thể tải dữ liệu')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const handleSearch = () => {
  pagination.current = 1
  fetchData()
}

const handleReset = () => {
  filters.search = ''
  filters.decider = ''
  filters.status = ''
  pagination.current = 1
  fetchData()
}

const handleCreate = () => {
  router.push('/discipline/reward-decisions/create')
}

const handleViewDeleted = () => {
  isDeletedView.value = !isDeletedView.value
  fetchData()
}

const handleEdit = (record: RewardDecision) => {
  router.push(`/discipline/reward-decisions/edit/${record.id}`)
}

const handleViewDetail = (record: RewardDecision) => {
  router.push(`/discipline/reward-decisions/detail/${record.id}`)
}

const handleRestore = (_id: string) => {
  message.success('Khôi phục thành công')
  fetchData()
}

const handleDelete = (_id: string) => {
  const isPermanent = isDeletedView.value
  Modal.confirm({
    title: isPermanent ? 'Xác nhận xóa vĩnh viễn' : 'Xác nhận xóa',
    content: isPermanent ? 'Hành động này không thể hoàn tác!' : 'Bạn có chắc chắn muốn xóa quyết định này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        message.success('Thao tác thành công')
        fetchData()
      } catch (error) {
        message.error('Thao tác thất bại')
      }
    }
  })
}

const handlePageChange = (page: number) => {
  pagination.current = page
  fetchData()
}
</script>
