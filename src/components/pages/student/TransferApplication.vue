<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      :title="isDeletedView ? 'Danh sách Đơn xin chuyển trường đã xóa' : 'Danh sách Đơn xin chuyển trường'" 
    >
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

      <StudentFilter 
        v-model:filters="filters"
        @search="handleSearch" 
        @reset="handleReset" 
      />

      <div class="px-6 pb-6 pt-4">
        <StudentTable
          :data-source="students"
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
import StudentFilter from '@/components/molecules/StudentFilter.vue'
import StudentTable from '@/components/organisms/StudentTable.vue'

interface Student {
  id: string
  studentCode: string
  name: string
  createdAt: string
  status: string
  isDeleted?: boolean
  deletedAt?: string
}

interface StudentFilterState {
  search: string
  date: any
  status: string
}

const router = useRouter()

const loading = ref(false)
const students = ref<Student[]>([])
const isDeletedView = ref(false)

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Đơn xin chuyển trường', path: '/student/transfer-request' }
]

const filters = reactive<StudentFilterState>({
  search: '',
  date: null,
  status: ''
})

const pagination = reactive({
  current: 3, 
  pageSize: 10
})

// Mock data matching the screenshot
const mockStudents: Student[] = [
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `transfer-${index + 1}`,
    studentCode: 'HV12345',
    name: 'Nguyễn Văn An',
    createdAt: '2025-01-10T00:00:00',
    status: 'active',
    isDeleted: false
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `transfer-del-${index + 1}`,
    studentCode: 'HV12345',
    name: 'Nguyễn Văn An',
    createdAt: '2025-01-10T00:00:00',
    deletedAt: '2025-01-12T06:00:00',
    status: 'active',
    isDeleted: true
  }))
]

const filteredStudents = computed(() => {
  let result = mockStudents.filter(item => !!item.isDeleted === isDeletedView.value)
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.studentCode.toLowerCase().includes(searchLower)
    )
  }
  
  if (filters.status) {
    result = result.filter(item => item.status === filters.status)
  }
  
  return result
})

const filteredCount = computed(() => filteredStudents.value.length)

const fetchData = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    students.value = filteredStudents.value
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
  filters.date = null
  filters.status = ''
  pagination.current = 1
  fetchData()
}

const handleCreate = () => {
  router.push('/student/transfer-request/create')
}

const handleEdit = (record: Student) => {
  router.push(`/student/transfer-request/edit/${record.id}`)
}

const handleViewDetail = (record: Student) => {
  router.push(`/student/transfer-request/detail/${record.id}`)
}

const handleDelete = (id: string) => {
  const isPermanent = isDeletedView.value
  Modal.confirm({
    title: isPermanent ? 'Xác nhận xóa vĩnh viễn' : 'Xác nhận xóa',
    content: isPermanent ? 'Hành động này không thể hoàn tác!' : 'Bạn có chắc chắn muốn xóa đơn này?',
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

const handleRestore = (id: string) => {
  Modal.confirm({
    title: 'Xác nhận khôi phục',
    content: 'Bạn có chắc chắn muốn khôi phục đơn này?',
    okText: 'Khôi phục',
    cancelText: 'Hủy',
    async onOk() {
      try {
        message.success('Khôi phục thành công')
        fetchData()
      } catch (error) {
        message.error('Khôi phục thất bại')
      }
    }
  })
}

const handlePageChange = (page: number) => {
  pagination.current = page
  fetchData()
}
</script>
