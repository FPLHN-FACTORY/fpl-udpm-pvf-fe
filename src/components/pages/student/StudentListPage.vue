<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard 
      title="Danh sách học viên" 
      :badge="`${total} Học viên x ${filteredCount} Học viên`"
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

      <div class="px-6 pb-6">
        <StudentTable
          :data-source="students"
          :loading="loading"
          :total="filteredCount"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @edit="handleEdit"
          @delete="handleDelete"
          @view="handleViewDetail"
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
}

interface StudentFilter {
  search: string
  date: any
  status: string
}

const router = useRouter()

const loading = ref(false)
const students = ref<Student[]>([])
const total = ref(138) // Tổng số học viên như trong ảnh
const isDeletedView = ref(false)

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Danh sách học viên', path: '/students' }
]

const filters = reactive<StudentFilter>({
  search: '',
  date: null,
  status: ''
})

const pagination = reactive({
  current: 3, // Trang hiện tại như trong ảnh
  pageSize: 10
})

// Mock data giống như trong ảnh
const mockStudents: Student[] = Array.from({ length: 22 }, (_, index) => ({
  id: `student-${index + 1}`,
  studentCode: 'HVT2345',
  name: 'Nguyễn Văn An',
  createdAt: '2025-01-10',
  status: 'active',
  isDeleted: false
}))

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
    await new Promise(resolve => setTimeout(resolve, 500))
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
  router.push('/student/info/add')
}

const handleEdit = (record: Student) => {
  router.push(`/student/info/edit/${record.id}`)
}

const handleViewDetail = (record: Student) => {
  router.push(`/student/info/detail/${record.id}`)
}

const handleDelete = (_id: string) => {
  const isPermanent = isDeletedView.value
  Modal.confirm({
    title: isPermanent ? 'Xác nhận xóa vĩnh viễn' : 'Xác nhận xóa',
    content: isPermanent ? 'Hành động này không thể hoàn tác!' : 'Bạn có chắc chắn muốn xóa học viên này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        // Simulate API call
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