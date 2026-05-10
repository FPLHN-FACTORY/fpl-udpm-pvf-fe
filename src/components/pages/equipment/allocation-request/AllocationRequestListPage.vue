<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-gray-400 mb-2">{{ stat.label }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-[22px] font-bold text-[#566a7f]">{{ stat.value }}</span>
            <span v-if="stat.subValue" :class="stat.subValueClass">{{ stat.subValue }}</span>
          </div>
        </div>
        <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <NavIcon :name="stat.icon" :size="20" :class="stat.iconColor" />
        </div>
      </div>
    </div>

    <AdminCard :title="isDeletedView ? 'Danh sách Yêu cầu cấp phát đã xóa' : 'Danh sách Yêu cầu cấp phát'">
      <template #actions>
        <ButtonDeleteList 
          v-if="!isDeletedView"
          @click="toggleDeletedView"
        />
        <ButtonBack 
          v-if="isDeletedView"
          @click="toggleDeletedView"
        />
        <ButtonAdd 
          v-if="!isDeletedView"
          @click="handleCreate"
        />
      </template>

      <AllocationRequestFilter 
        v-model:filters="filters"
        :initial-filters="filters" 
        @search="handleSearch" 
        @reset="handleReset" 
      />

      <div class="overflow-x-auto">
        <AllocationRequestTable
          :data-source="requests"
          :loading="loading"
          :total="total"
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import AllocationRequestFilter from '@/components/molecules/equipment/AllocationRequestFilter.vue'
import AllocationRequestTable from '@/components/organisms/equipment/AllocationRequestTable.vue'

const router = useRouter()

const loading = ref(false)
const requests = ref<any[]>([])
const total = ref(0)
const isDeletedView = ref(false)

const stats = [
  { label: 'Tổng số yêu cầu', value: '21', icon: 'BxFile', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Số yêu cầu chờ duyệt', value: '20', subValue: '(95%)', subValueClass: 'text-green-500 text-[12px]', icon: 'BxCheckShield', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  { label: 'Số yêu cầu đã duyệt', value: '21', icon: 'BxTime', iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Tổng số lượng yêu cầu cư/c', value: '20', subValue: '(95%)', subValueClass: 'text-green-500 text-[12px]', icon: 'BxBarChartAlt2', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' }
]

const breadcrumbs = [
  { title: 'Quản lý công cụ -dụng cụ thi đấu', path: '#' },
  { title: 'Yêu cầu cấp phát', path: '/equipment/allocation-request' }
]

const filters = reactive({
  search: '',
  equipmentType: undefined,
  status: undefined
})

const pagination = reactive({
  current: 1,
  pageSize: 10
})

const fetchData = async () => {
  loading.value = true
  try {
    // Mock data
    const mockData = [
      {
        id: '1',
        studentCode: '18A121212',
        studentName: 'Nguyễn Xuân An',
        requestDate: '2025-02-10',
        equipmentType: 'Dây khăng lực',
        quantity: 1,
        status: 'approved',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-11',
        deletedAt: '2/2/2025 8:00',
        isDeleted: false
      },
      {
        id: '2',
        studentCode: '18A121213',
        studentName: 'Trần Thị Bình',
        requestDate: '2025-02-10',
        equipmentType: 'Bóng đá',
        quantity: 2,
        status: 'approved',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-11',
        deletedAt: '2/2/2025 8:00',
        isDeleted: false
      },
      {
        id: '3',
        studentCode: '18A121214',
        studentName: 'Lê Văn Cường',
        requestDate: '2025-02-10',
        equipmentType: 'Giày thể thao',
        quantity: 1,
        status: 'pending',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-11',
        deletedAt: '2/2/2025 8:00',
        isDeleted: false
      },
      {
        id: '4',
        studentCode: '18A121215',
        studentName: 'Phạm Thị Dung',
        requestDate: '2025-02-09',
        equipmentType: 'Dây khăng lực',
        quantity: 1,
        status: 'approved',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-10',
        deletedAt: '2/2/2025 8:00',
        isDeleted: false
      },
      {
        id: '5',
        studentCode: '18A121216',
        studentName: 'Hoàng Văn Em',
        requestDate: '2025-02-08',
        equipmentType: 'Bóng đá',
        quantity: 3,
        status: 'rejected',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-09',
        deletedAt: '2/2/2025 8:00',
        isDeleted: false
      },
      {
        id: '6',
        studentCode: '18A121217',
        studentName: 'Ngô Thị Phương',
        requestDate: '2025-02-07',
        equipmentType: 'Giày thể thao',
        quantity: 1,
        status: 'approved',
        approver: 'Phạm Văn Hải',
        approvalDate: '2025-02-08',
        deletedAt: '2/2/2025 8:00',
        isDeleted: true
      }
    ]

    let filteredData = mockData.filter(item => !!item.isDeleted === isDeletedView.value)

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredData = filteredData.filter(item => 
        item.studentCode.toLowerCase().includes(searchLower) ||
        item.studentName.toLowerCase().includes(searchLower)
      )
    }
    if (filters.equipmentType) {
      filteredData = filteredData.filter(item => item.equipmentType === filters.equipmentType)
    }
    if (filters.status) {
      filteredData = filteredData.filter(item => item.status === filters.status)
    }

    requests.value = filteredData
    total.value = filteredData.length
  } catch (error) {
    message.error('Không thể tải dữ liệu')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const toggleDeletedView = () => {
  isDeletedView.value = !isDeletedView.value
  fetchData()
}

const handleSearch = () => {
  pagination.current = 1
  fetchData()
}

const handleReset = () => {
  filters.search = ''
  filters.equipmentType = undefined
  filters.status = undefined
  pagination.current = 1
  fetchData()
}

const handleCreate = () => {
  router.push('/equipment/allocation-request/add')
}

const handleEdit = (record: any) => {
  router.push(`/equipment/allocation-request/edit/${record.id}`)
}

const handleViewDetail = (record: any) => {
  router.push(`/equipment/allocation-request/detail/${record.id}`)
}

const handleRestore = async (_id: string) => {
  try {
    message.success('Khôi phục yêu cầu cấp phát thành công')
    fetchData()
  } catch (error) {
    message.error('Khôi phục thất bại')
  }
}

const handleDelete = (_id: string) => {
  const isPermanent = isDeletedView.value
  Modal.confirm({
    title: isPermanent ? 'Xác nhận xóa vĩnh viễn' : 'Xác nhận xóa',
    content: isPermanent ? 'Hành động này không thể hoàn tác!' : 'Bạn có chắc chắn muốn xóa yêu cầu này?',
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
}
</script>
