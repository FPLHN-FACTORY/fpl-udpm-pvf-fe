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

    <AdminCard :title="isDeletedView ? 'Danh sách Năm học đã xóa' : 'Danh sách năm học'">
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

      <SchoolYearFilter 
        v-model:filters="filters"
        :initial-filters="filters" 
        @search="handleSearch" 
        @reset="handleReset" 
      />

      <div class="overflow-x-auto">
        <SchoolYearTable
          :data-source="schoolYears"
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
import SchoolYearFilter from '@/components/molecules/cultural/SchoolYearFilter.vue'
import SchoolYearTable from '@/components/organisms/cultural/SchoolYearTable.vue'
import { schoolYearService } from '@/services/cultural/school-year'
import type { SchoolYear, SchoolYearFilter as ISchoolYearFilter } from '@/types/school-year'

const router = useRouter()

const loading = ref(false)
const schoolYears = ref<SchoolYear[]>([])
const total = ref(0)
const isDeletedView = ref(false)

const stats = [
  { label: 'Tổng học viên trong năm', value: '250', icon: 'BxUser', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Số lớp', value: '20', subValue: '(95%)', subValueClass: 'text-green-500 text-[12px]', icon: 'BxCheckShield', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  { label: 'Tỷ lệ đang học / tốt nghiệp', value: '1', subValue: '(5%)', subValueClass: 'text-green-500 text-[12px]', icon: 'BxTime', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { label: 'Điểm trung bình toàn năm', value: '1', subValue: '(5%)', subValueClass: 'text-green-500 text-[12px]', icon: 'BxBarChartAlt2', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500' }
]

const breadcrumbs = [
  { title: 'Quản lý học tập văn hóa', path: '#' },
  { title: 'Năm học', path: '/cultural/school-year' }
]

const filters = reactive<ISchoolYearFilter>({
  search: '',
  status: undefined
})

const pagination = reactive({
  current: 1,
  pageSize: 10
})

const fetchData = async () => {
  loading.value = true
  try {
    const data = await schoolYearService.getAll()
    let filteredData = data

    filteredData = filteredData.filter(item => !!item.isDeleted === isDeletedView.value)

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(searchLower)
      )
    }
    if (filters.status) {
      filteredData = filteredData.filter(item => item.status === filters.status)
    }

    schoolYears.value = filteredData
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
  filters.status = undefined
  pagination.current = 1
  fetchData()
}

const handleCreate = () => {
  router.push('/cultural/school-year/add')
}

const handleEdit = (record: SchoolYear) => {
  router.push(`/cultural/school-year/edit/${record.id}`)
}

const handleViewDetail = (record: SchoolYear) => {
  router.push(`/cultural/school-year/detail/${record.id}`)
}

const handleRestore = async (_id: string) => {
  try {
    message.success('Khôi phục năm học thành công')
    fetchData()
  } catch (error) {
    message.error('Khôi phục thất bại')
  }
}

const handleDelete = (id: string) => {
  const isPermanent = isDeletedView.value
  Modal.confirm({
    title: isPermanent ? 'Xác nhận xóa vĩnh viễn' : 'Xác nhận xóa',
    content: isPermanent ? 'Hành động này không thể hoàn tác!' : 'Bạn có chắc chắn muốn xóa năm học này?',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    async onOk() {
      try {
        await schoolYearService.delete(id)
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
